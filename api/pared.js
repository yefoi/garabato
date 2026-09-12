export default async function handler(req) {
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  const json = (datos, estado) =>
    new Response(JSON.stringify(datos), {
      status: estado,
      headers: { ...cors, "Content-Type": "application/json" }
    });

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors });
  }

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return json({ ok: false, error: "pared común sin configurar" }, 503);
  }

  const upstash = async (metodo, ruta, cuerpo) => {
    const respuesta = await fetch(url + ruta, {
      method: metodo,
      headers: {
        Authorization: "Bearer " + token,
        ...(cuerpo !== undefined ? { "Content-Type": "application/json" } : {})
      },
      body: cuerpo !== undefined ? JSON.stringify(cuerpo) : undefined
    });
    if (!respuesta.ok) {
      throw new Error("upstash " + respuesta.status);
    }
    return respuesta.json();
  };

  const parsear = (texto) => {
    try {
      return JSON.parse(texto);
    } catch (error) {
      return null;
    }
  };

  try {
    if (req.method === "GET") {
      const datos = await upstash("GET", "/lrange/pared/0/199");
      const dibujos = (datos.result || [])
        .map(parsear)
        .filter((item) => item && item.p && item.img);
      return json({ ok: true, dibujos: dibujos }, 200);
    }

    if (req.method === "POST") {
      const cuerpo = await req.json().catch(() => null);
      if (!cuerpo || typeof cuerpo.p !== "string" || typeof cuerpo.s !== "string" || typeof cuerpo.img !== "string") {
        return json({ ok: false, error: "datos inválidos" }, 400);
      }
      if (cuerpo.img.length > 150000) {
        return json({ ok: false, error: "imagen demasiado grande" }, 400);
      }
      const ip = (req.headers.get("x-forwarded-for") || "anonimo").split(",")[0].trim();
      const claveLimite = "limite:" + ip;
      const intento = await upstash("GET", "/get/" + claveLimite);
      if (intento.result) {
        return json({ ok: false, error: "ya publicaste hoy. vuelve mañana." }, 429);
      }
      await upstash("POST", "/setex/" + claveLimite + "/86400", "1");
      const registro = {
        p: cuerpo.p.slice(0, 60),
        s: cuerpo.s.slice(0, 120),
        m: cuerpo.m === "a" ? "a" : "n",
        img: cuerpo.img,
        f: new Date().toISOString()
      };
      await upstash("POST", "/rpush/pared", registro);
      return json({ ok: true }, 200);
    }

    return json({ ok: false, error: "método no soportado" }, 405);
  } catch (error) {
    return json({ ok: false, error: "servicio temporalmente caído" }, 502);
  }
}
