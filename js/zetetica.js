(function () {
  "use strict";

  var $ = function (sel, ctx) {
    return (ctx || document).querySelector(sel);
  };
  var $$ = function (sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  };

  var raiz = document.documentElement;
  var reducir = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var leer = function (clave) {
    try {
      return localStorage.getItem(clave);
    } catch (error) {
      return null;
    }
  };
  var guardar = function (clave, valor) {
    try {
      localStorage.setItem(clave, valor);
    } catch (error) {
      return;
    }
  };

  var temaGuardado = leer("zetetica-crt");
  if (temaGuardado) {
    raiz.setAttribute("data-tema", temaGuardado);
  }

  $$("[data-accion='tema']").forEach(function (boton) {
    var pinta = function () {
      var crt = raiz.getAttribute("data-tema") !== "dia";
      boton.setAttribute("aria-pressed", String(crt));
      boton.textContent = crt ? "[ CRT: ON ]" : "[ CRT: OFF ]";
    };
    pinta();
    boton.addEventListener("click", function () {
      var crt = raiz.getAttribute("data-tema") !== "dia";
      raiz.setAttribute("data-tema", crt ? "dia" : "crt");
      guardar("zetetica-crt", raiz.getAttribute("data-tema"));
      pinta();
    });
  });

  $$("[data-anio]").forEach(function (nodo) {
    nodo.textContent = String(new Date().getFullYear());
  });

  var sonidoActivo = leer("zetetica-sonido") === "on";
  var audioCtx = null;

  var bleep = function (frecuencia, duracion, tipo) {
    if (!sonidoActivo) {
      return;
    }
    try {
      var Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) {
        return;
      }
      audioCtx = audioCtx || new Ctx();
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }
      var osc = audioCtx.createOscillator();
      var gan = audioCtx.createGain();
      osc.type = tipo || "square";
      osc.frequency.value = frecuencia;
      gan.gain.value = 0.03;
      osc.connect(gan);
      gan.connect(audioCtx.destination);
      osc.start();
      gan.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duracion);
      osc.stop(audioCtx.currentTime + duracion);
    } catch (error) {
      return;
    }
  };

  window.ZETETICA_SONIDO = function (frecuencia, duracion) {
    bleep(frecuencia, duracion);
  };

  document.addEventListener("click", function (evento) {
    var objetivo = evento.target;
    if (!objetivo || !objetivo.closest) {
      return;
    }
    var control = objetivo.closest(".boton, .chip, .menu a, .menu button");
    if (control) {
      bleep(control.classList.contains("tema") ? 760 : 480, 0.06);
    }
  });

  var botonCaos = null;
  var botonSonido = null;
  var botonConsola = null;
  var menu = $(".menu");

  if (menu) {
    botonCaos = document.createElement("button");
    botonCaos.type = "button";
    botonCaos.className = "tema control";
    botonCaos.setAttribute("data-accion", "caos");
    menu.appendChild(botonCaos);

    botonSonido = document.createElement("button");
    botonSonido.type = "button";
    botonSonido.className = "tema control";
    botonSonido.setAttribute("data-accion", "sonido");
    menu.appendChild(botonSonido);

    botonConsola = document.createElement("button");
    botonConsola.type = "button";
    botonConsola.className = "tema control";
    botonConsola.setAttribute("data-accion", "consola");
    menu.appendChild(botonConsola);
  }

  if (leer("zetetica-caos") === "on") {
    raiz.classList.add("modo-caos");
  }

  var pintaCaos = function () {
    if (!botonCaos) {
      return;
    }
    var activo = raiz.classList.contains("modo-caos");
    botonCaos.setAttribute("aria-pressed", String(activo));
    botonCaos.textContent = activo ? "[ CAOS: ON ]" : "[ CAOS: OFF ]";
  };

  if (botonCaos) {
    pintaCaos();
    botonCaos.addEventListener("click", function () {
      var activo = raiz.classList.toggle("modo-caos");
      guardar("zetetica-caos", activo ? "on" : "off");
      pintaCaos();
      bleep(activo ? 220 : 880, 0.12, "sawtooth");
    });
  }

  var pintaSonido = function () {
    if (!botonSonido) {
      return;
    }
    botonSonido.setAttribute("aria-pressed", String(sonidoActivo));
    botonSonido.textContent = sonidoActivo ? "[ SONIDO: ON ]" : "[ SONIDO: OFF ]";
  };

  if (botonSonido) {
    pintaSonido();
    botonSonido.addEventListener("click", function () {
      sonidoActivo = !sonidoActivo;
      guardar("zetetica-sonido", sonidoActivo ? "on" : "off");
      pintaSonido();
      bleep(660, 0.08);
    });
  }

  var lienzoGarabatos = document.createElement("canvas");
  lienzoGarabatos.id = "garabatos";
  lienzoGarabatos.setAttribute("aria-hidden", "true");
  document.body.appendChild(lienzoGarabatos);
  var ctxGarabatos = lienzoGarabatos.getContext("2d");
  var garabatosFondo = [];
  var tiposGarabato = ["espiral", "estrella", "cubo", "corazon", "flecha", "interrogacion", "rayo", "cara", "cuadro", "onda"];

  var ajustarGarabatos = function () {
    lienzoGarabatos.width = window.innerWidth;
    lienzoGarabatos.height = window.innerHeight;
    garabatosFondo = [];
    var cantidad = Math.min(22, Math.max(10, Math.round(window.innerWidth / 90)));
    for (var i = 0; i < cantidad; i++) {
      garabatosFondo.push({
        x: Math.random() * lienzoGarabatos.width,
        y: Math.random() * lienzoGarabatos.height,
        tipo: tiposGarabato[Math.floor(Math.random() * tiposGarabato.length)],
        tam: 8 + Math.random() * 14,
        vel: 0.12 + Math.random() * 0.3,
        fase: Math.random() * Math.PI * 2,
        giro: (Math.random() - 0.5) * 0.004,
        ang: Math.random() * Math.PI * 2,
        alfa: 0.15 + Math.random() * 0.2,
        tono: Math.random()
      });
    }
  };

  var tintaGarabato = function (tono) {
    if (tono < 0.6) {
      return "0, 255, 225";
    }
    if (tono < 0.85) {
      return "216, 216, 234";
    }
    return "255, 43, 209";
  };

  var pintarGarabato = function (g) {
    var ctx = ctxGarabatos;
    var t = g.tam;
    ctx.save();
    ctx.translate(g.x, g.y);
    ctx.rotate(g.ang);
    ctx.strokeStyle = "rgba(" + tintaGarabato(g.tono) + ", " + g.alfa + ")";
    ctx.lineWidth = 1.2;
    ctx.lineCap = "round";
    ctx.beginPath();
    var i;
    var a;
    if (g.tipo === "espiral") {
      for (a = 0; a < Math.PI * 5; a += 0.3) {
        var r = (a / (Math.PI * 5)) * t;
        if (a === 0) {
          ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r);
        } else {
          ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
        }
      }
    } else if (g.tipo === "estrella") {
      for (i = 0; i <= 10; i++) {
        var rr = i % 2 === 0 ? t : t * 0.42;
        var aa = -Math.PI / 2 + (i * Math.PI) / 5;
        if (i === 0) {
          ctx.moveTo(Math.cos(aa) * rr, Math.sin(aa) * rr);
        } else {
          ctx.lineTo(Math.cos(aa) * rr, Math.sin(aa) * rr);
        }
      }
    } else if (g.tipo === "cubo") {
      var s = t * 0.55;
      ctx.rect(-s, -s, s * 2, s * 2);
      ctx.moveTo(-s, -s);
      ctx.lineTo(-s + s * 0.5, -s - s * 0.5);
      ctx.lineTo(s * 1.5, -s - s * 0.5);
      ctx.lineTo(s, -s);
      ctx.moveTo(s, s);
      ctx.lineTo(s * 1.5, s * 0.5);
      ctx.lineTo(s * 1.5, -s - s * 0.5);
    } else if (g.tipo === "corazon") {
      ctx.moveTo(0, t * 0.7);
      ctx.bezierCurveTo(-t, -t * 0.2, -t * 0.5, -t * 0.9, 0, -t * 0.3);
      ctx.bezierCurveTo(t * 0.5, -t * 0.9, t, -t * 0.2, 0, t * 0.7);
    } else if (g.tipo === "flecha") {
      ctx.moveTo(-t, t * 0.6);
      ctx.lineTo(t, -t * 0.6);
      ctx.moveTo(t, -t * 0.6);
      ctx.lineTo(t * 0.3, -t * 0.45);
      ctx.moveTo(t, -t * 0.6);
      ctx.lineTo(t * 0.75, 0);
    } else if (g.tipo === "interrogacion") {
      ctx.arc(0, -t * 0.25, t * 0.35, Math.PI, Math.PI * 1.8);
      ctx.moveTo(t * 0.26, t * 0.05);
      ctx.lineTo(0, t * 0.32);
      ctx.moveTo(0, t * 0.75);
      ctx.lineTo(0.01, t * 0.78);
    } else if (g.tipo === "rayo") {
      ctx.moveTo(t * 0.1, -t);
      ctx.lineTo(-t * 0.25, -t * 0.1);
      ctx.lineTo(t * 0.05, -t * 0.05);
      ctx.lineTo(-t * 0.1, t);
    } else if (g.tipo === "cara") {
      ctx.arc(0, 0, t * 0.65, 0, Math.PI * 2);
      ctx.moveTo(-t * 0.22, -t * 0.12);
      ctx.lineTo(-t * 0.18, -t * 0.07);
      ctx.moveTo(t * 0.22, -t * 0.12);
      ctx.lineTo(t * 0.18, -t * 0.07);
      ctx.moveTo(-t * 0.28, t * 0.2);
      ctx.quadraticCurveTo(0, t * 0.45, t * 0.28, t * 0.2);
    } else if (g.tipo === "cuadro") {
      ctx.rect(-t * 0.55, -t * 0.55, t * 1.1, t * 1.1);
      ctx.moveTo(-t * 0.55, -t * 0.55);
      ctx.lineTo(t * 0.55, t * 0.55);
      ctx.moveTo(t * 0.55, -t * 0.55);
      ctx.lineTo(-t * 0.55, t * 0.55);
    } else {
      ctx.moveTo(-t, 0);
      ctx.quadraticCurveTo(-t * 0.5, -t * 0.5, 0, 0);
      ctx.quadraticCurveTo(t * 0.5, t * 0.5, t, 0);
    }
    ctx.stroke();
    ctx.restore();
  };

  var pasoGarabatos = function () {
    if (document.hidden || raiz.classList.contains("modo-ligero")) {
      return;
    }
    ctxGarabatos.clearRect(0, 0, lienzoGarabatos.width, lienzoGarabatos.height);
    var ahora = Date.now() / 1000;
    garabatosFondo.forEach(function (g) {
      g.y += g.vel;
      g.x += Math.sin(ahora * 0.6 + g.fase) * 0.15;
      g.ang += g.giro;
      if (g.y - g.tam > lienzoGarabatos.height) {
        g.y = -g.tam * 2;
        g.x = Math.random() * lienzoGarabatos.width;
      }
      if (g.x < -g.tam * 2) {
        g.x = lienzoGarabatos.width + g.tam;
      }
      if (g.x > lienzoGarabatos.width + g.tam * 2) {
        g.x = -g.tam;
      }
      pintarGarabato(g);
    });
  };

  ajustarGarabatos();
  window.addEventListener("resize", ajustarGarabatos);
  pasoGarabatos();
  if (!reducir) {
    setInterval(pasoGarabatos, 120);
  }

  var sprites = document.createElement("canvas");
  sprites.id = "sprites";
  sprites.setAttribute("aria-hidden", "true");
  document.body.appendChild(sprites);
  var ctxSprites = sprites.getContext("2d");
  var estrellas = [];
  var bichoX = -60;
  var naveX = -120;
  var naveY = 80;
  var disparo = null;

  var ajustarSprites = function () {
    sprites.width = window.innerWidth;
    sprites.height = window.innerHeight;
    estrellas = [];
    for (var i = 0; i < 70; i++) {
      estrellas.push({
        x: Math.floor(Math.random() * sprites.width),
        y: Math.floor(Math.random() * sprites.height * 0.85)
      });
    }
  };
  ajustarSprites();
  window.addEventListener("resize", ajustarSprites);

  var BICHO_SPRITE = [
    "..xx..xx..",
    ".xxxxxxxx.",
    "xx.xxxx.xx",
    "xxxxxxxxxx",
    ".xx.xx.xx.",
    "..x....x.."
  ];
  var NAVE_SPRITE = [
    "....xx....",
    "..xxxxxx..",
    "xxxxxxxxxx",
    ".x..xx..x.",
    "..x....x.."
  ];

  var pintaSprite = function (bitmap, x, y, escala, color) {
    ctxSprites.fillStyle = color;
    for (var fy = 0; fy < bitmap.length; fy++) {
      var fila = bitmap[fy];
      for (var fx = 0; fx < fila.length; fx++) {
        if (fila.charAt(fx) === "x") {
          ctxSprites.fillRect(x + fx * escala, y + fy * escala, escala, escala);
        }
      }
    }
  };

  var pasoSprites = function () {
    if (document.hidden || raiz.getAttribute("data-tema") === "dia" || raiz.classList.contains("modo-ligero")) {
      return;
    }
    ctxSprites.clearRect(0, 0, sprites.width, sprites.height);
    var ahora = Date.now();
    estrellas.forEach(function (estrella, i) {
      var pulso = (Math.sin(ahora / 650 + i) + 1) / 2;
      if (pulso > 0.35) {
        ctxSprites.fillStyle = i % 7 === 0 ? "#ff2bd1" : "#00ffe1";
        ctxSprites.fillRect(estrella.x, estrella.y, 2, 2);
      }
    });
    bichoX += 1.1;
    if (bichoX > sprites.width + 60) {
      bichoX = -60;
    }
    var brinco = Math.abs(Math.sin(bichoX / 40)) * 8;
    pintaSprite(BICHO_SPRITE, bichoX, sprites.height - 70 - brinco, 4, Math.floor(bichoX / 40) % 2 === 0 ? "#b6ff3b" : "#8bff4d");
    naveX += 0.55;
    if (naveX > sprites.width + 120) {
      naveX = -120;
      naveY = 40 + Math.random() * (sprites.height * 0.4);
    }
    pintaSprite(NAVE_SPRITE, naveX, naveY, 4, "#ff5edb");
    if (disparo) {
      ctxSprites.fillStyle = "#b6ff3b";
      ctxSprites.fillRect(disparo.x, disparo.y, 3, 14);
      disparo.y += 13;
      if (disparo.y > sprites.height) {
        disparo = null;
      }
    } else if (Math.random() < 0.02) {
      disparo = { x: naveX + 18, y: naveY + 26 };
    }
  };
  if (!reducir) {
    setInterval(pasoSprites, 120);
  }

  var banda = document.createElement("div");
  banda.id = "banda";
  banda.setAttribute("aria-hidden", "true");
  document.body.appendChild(banda);

  var rafagaGlitch = document.createElement("div");
  rafagaGlitch.id = "glitch-burst";
  rafagaGlitch.setAttribute("aria-hidden", "true");
  document.body.appendChild(rafagaGlitch);

  var chispazo = function () {
    if (raiz.getAttribute("data-tema") === "dia" || raiz.classList.contains("modo-ligero")) {
      return;
    }
    raiz.classList.add("agitado");
    rafagaGlitch.classList.add("activo");
    var invertido = Math.random() < 0.22;
    if (invertido) {
      raiz.classList.add("invertido");
    }
    window.setTimeout(function () {
      raiz.classList.remove("agitado");
      rafagaGlitch.classList.remove("activo");
      if (invertido) {
        raiz.classList.remove("invertido");
      }
    }, 300);
  };

  if (!reducir) {
    var bucleGlitch = function () {
      var caos = raiz.classList.contains("modo-caos");
      var espera = caos ? 1100 + Math.random() * 2200 : 3400 + Math.random() * 6200;
      window.setTimeout(function () {
        chispazo();
        bucleGlitch();
      }, espera);
    };
    bucleGlitch();
  }

  $$("[data-scramble]").forEach(function (elemento) {
    var original = elemento.textContent;
    if (reducir) {
      return;
    }
    var basura = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#@%&*<>/";
    var paso = 0;
    var animar = function () {
      paso += 1;
      elemento.textContent = original.split("").map(function (letra, i) {
        if (letra === " ") {
          return " ";
        }
        if (i < paso) {
          return original.charAt(i);
        }
        return basura.charAt(Math.floor(Math.random() * basura.length));
      }).join("");
      if (paso <= original.length) {
        window.requestAnimationFrame(animar);
      } else {
        elemento.textContent = original;
      }
    };
    window.setTimeout(animar, 500);
  });

  var terminal = document.createElement("section");
  terminal.id = "terminal";
  terminal.setAttribute("aria-hidden", "true");
  terminal.innerHTML = "<div class=\"t-barra\"><span>CONSOLA GARABATO.EXE // generador por comandos</span><button class=\"t-salir\" type=\"button\">[ CERRAR ]</button></div><div class=\"t-cuerpo\" data-t-cuerpo></div><div class=\"t-linea\"><span class=\"t-prompt\">C:\\&gt;</span><input type=\"text\" data-t-input autocomplete=\"off\" spellcheck=\"false\" aria-label=\"comando\"></div>";
  document.body.appendChild(terminal);

  var cuerpoTerminal = $("[data-t-cuerpo]", terminal);
  var entradaTerminal = $("[data-t-input]", terminal);
  var cerrarBoton = $(".t-salir", terminal);

  var salida = function (texto) {
    if (!cuerpoTerminal) {
      return;
    }
    cuerpoTerminal.textContent += texto + "\n";
    cuerpoTerminal.scrollTop = cuerpoTerminal.scrollHeight;
  };

  var ayuda = function () {
    salida("comandos:");
    salida("  generar <texto> ... dibuja lo que pidas");
    salida("  suerte ............ dibujo al azar");
    salida("  glitch ............ corrompe toda la pared");
    salida("  limpiar ........... vacía la pared");
    salida("  bajar ............. descarga la pared en PNG");
    salida("  caos | crt | sonido  interruptores");
    salida("  salir ............. cierra la consola");
  };

  var ejecutar = function (orden) {
    var partes = orden.trim().split(/\s+/);
    var comando = (partes[0] || "").toLowerCase();
    var argumento = partes.slice(1).join(" ");
    if (!comando) {
      return;
    }
    salida("C:\\> " + orden);
    var z = window.ZETETICA;
    if (comando === "ayuda" || comando === "help") {
      ayuda();
    } else if (comando === "generar" || comando === "dibujar" || comando === "gen") {
      if (z) {
        z.generar(argumento);
      }
    } else if (comando === "suerte" || comando === "random") {
      if (z) {
        z.suerte();
      }
    } else if (comando === "glitch") {
      if (z) {
        z.glitch();
      }
      salida("pared corrompida.");
    } else if (comando === "limpiar" || comando === "clear") {
      if (z) {
        z.limpiar();
      }
      salida("pared vacía.");
    } else if (comando === "bajar" || comando === "descargar") {
      if (z) {
        z.bajar();
      }
      salida("generando png ...");
    } else if (comando === "caos") {
      if (botonCaos) {
        botonCaos.click();
        salida("modo caos: " + (raiz.classList.contains("modo-caos") ? "ON" : "OFF"));
      }
    } else if (comando === "crt") {
      var botonCrt = $("[data-accion='tema']");
      if (botonCrt) {
        botonCrt.click();
      }
    } else if (comando === "sonido") {
      if (botonSonido) {
        botonSonido.click();
      }
    } else if (comando === "salir" || comando === "exit") {
      cerrarConsola();
    } else {
      salida("comando no reconocido: " + comando + " (prueba: ayuda)");
    }
  };

  var abrirConsola = function () {
    terminal.classList.add("abierta");
    terminal.setAttribute("aria-hidden", "false");
    if (!terminal.getAttribute("data-estrenada")) {
      terminal.setAttribute("data-estrenada", "1");
      salida("GARABATO.EXE :: escribe ayuda y pulsa INTRO");
      salida("también puedes generar sin ratón: generar dino con corona");
    }
    bleep(1200, 0.05);
    window.setTimeout(function () {
      if (entradaTerminal) {
        entradaTerminal.focus();
      }
    }, 60);
  };

  var cerrarConsola = function () {
    terminal.classList.remove("abierta");
    terminal.setAttribute("aria-hidden", "true");
    bleep(300, 0.05);
  };

  if (entradaTerminal) {
    entradaTerminal.addEventListener("keydown", function (evento) {
      if (evento.key === "Enter") {
        ejecutar(entradaTerminal.value);
        entradaTerminal.value = "";
      }
    });
  }

  if (cerrarBoton) {
    cerrarBoton.addEventListener("click", cerrarConsola);
  }

  if (botonConsola) {
    botonConsola.addEventListener("click", function () {
      if (terminal.classList.contains("abierta")) {
        cerrarConsola();
      } else {
        abrirConsola();
      }
    });
  }

  document.addEventListener("keydown", function (evento) {
    var etiqueta = (evento.target && evento.target.tagName) || "";
    var escribiendo = etiqueta === "INPUT" || etiqueta === "TEXTAREA";
    if (evento.key === "Escape" && terminal.classList.contains("abierta")) {
      cerrarConsola();
      return;
    }
    if ((evento.key === "`" || evento.key === "~") && !escribiendo) {
      evento.preventDefault();
      if (terminal.classList.contains("abierta")) {
        cerrarConsola();
      } else {
        abrirConsola();
      }
    }
  });

  if (window.console && window.console.log) {
    window.console.log("%cGARABATO.EXE", "font-family:monospace;font-size:26px;color:#ff2bd1;background:#07070d;padding:6px 12px;border:3px solid #00ffe1");
    window.console.log("%cEscribe una palabra y pulsa GENERAR. Pulsa ` para la consola.", "font-family:monospace;color:#b6ff3b");
  }
})();
