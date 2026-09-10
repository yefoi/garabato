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

  var lluvia = document.createElement("canvas");
  lluvia.id = "lluvia";
  lluvia.setAttribute("aria-hidden", "true");
  document.body.appendChild(lluvia);
  var ctxLluvia = lluvia.getContext("2d");
  var glifos = "01<>[]{}=+*/#@$%&?ABCDEF";
  var celda = 16;
  var columnas = 0;
  var posiciones = [];

  var ajustarLluvia = function () {
    lluvia.width = window.innerWidth;
    lluvia.height = window.innerHeight;
    columnas = Math.ceil(lluvia.width / celda);
    posiciones = [];
    for (var i = 0; i < columnas; i++) {
      posiciones.push(Math.random() * (lluvia.height / celda));
    }
  };
  ajustarLluvia();
  window.addEventListener("resize", ajustarLluvia);

  var pasoLluvia = function () {
    if (document.hidden || raiz.classList.contains("modo-ligero")) {
      return;
    }
    if (raiz.getAttribute("data-tema") === "dia") {
      ctxLluvia.clearRect(0, 0, lluvia.width, lluvia.height);
      return;
    }
    ctxLluvia.fillStyle = "rgba(3, 3, 10, 0.14)";
    ctxLluvia.fillRect(0, 0, lluvia.width, lluvia.height);
    ctxLluvia.font = celda + "px monospace";
    for (var i = 0; i < columnas; i++) {
      var glifo = glifos.charAt(Math.floor(Math.random() * glifos.length));
      var y = posiciones[i] * celda;
      ctxLluvia.fillStyle = Math.random() < 0.08 ? "#ff2bd1" : "#00ffe1";
      ctxLluvia.fillText(glifo, i * celda, y);
      if (y > lluvia.height && Math.random() > 0.972) {
        posiciones[i] = 0;
      } else {
        posiciones[i] += 1;
      }
    }
  };
  if (!reducir) {
    setInterval(pasoLluvia, 90);
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
