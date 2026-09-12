export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    res.status(503).json({ ok: false, error: "pared común sin configurar" });
    return;
  }

  const upstash = async (metodo, ruta, cuerpo) => {
    const controlador = new AbortController();
    const temporizador = setTimeout(function () {
      controlador.abort();
    }, 8000);
    const respuesta = await fetch(url + ruta, {
      method: metodo,
      headers: {
        Authorization: "Bearer " + token,
        ...(cuerpo !== undefined ? { "Content-Type": "application/json" } : {})
      },
      body: cuerpo !== undefined ? JSON.stringify(cuerpo) : undefined,
      signal: controlador.signal
    });
    clearTimeout(temporizador);
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
      if (req.query && req.query.test === "1") {
        res.status(200).json({ ok: true, url: "configurada", token: "configurado" });
        return;
      }
      const datos = await upstash("GET", "/lrange/pared/0/199");
      const dibujos = (datos.result || [])
        .map(parsear)
        .filter((item) => item && item.p && item.img);
      res.status(200).json({ ok: true, dibujos: dibujos });
      return;
    }

    if (req.method === "POST") {
      const cuerpo = req.body || {};
      if (typeof cuerpo.p !== "string" || typeof cuerpo.s !== "string" || typeof cuerpo.img !== "string") {
        res.status(400).json({ ok: false, error: "datos inválidos" });
        return;
      }
      if (cuerpo.img.length > 150000) {
        res.status(400).json({ ok: false, error: "imagen demasiado grande" });
        return;
      }
      const ip = String(req.headers["x-forwarded-for"] || "anonimo").split(",")[0].trim();
      const claveLimite = "limite:" + ip;
      const intento = await upstash("GET", "/get/" + claveLimite);
      if (intento.result) {
        res.status(429).json({ ok: false, error: "ya publicaste hoy. vuelve mañana." });
        return;
      }
      await upstash("POST", "/setex/" + claveLimite + "/86400", "1");
      await upstash("POST", "/rpush/pared", {
        p: cuerpo.p.slice(0, 60),
        s: cuerpo.s.slice(0, 120),
        m: cuerpo.m === "a" ? "a" : "n",
        img: cuerpo.img,
        f: new Date().toISOString()
      });
      res.status(200).json({ ok: true });
      return;
    }

    res.status(405).json({ ok: false, error: "método no soportado" });
  } catch (error) {
    res.status(502).json({
      ok: false,
      error: "servicio temporalmente caído",
      detalle: String((error && error.message) || error)
    });
  }
}
