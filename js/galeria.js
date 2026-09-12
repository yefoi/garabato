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

  var hash = function (texto) {
    var h = 2166136261;
    for (var i = 0; i < texto.length; i++) {
      h ^= texto.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  };

  var sorteador = function (semilla) {
    var s = semilla >>> 0;
    return function () {
      s = (s + 0x6D2B79F5) | 0;
      var t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t = (t ^ (t + Math.imul(t ^ (t >>> 7), t | 61))) | 0;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };

  var normalizar = function (texto) {
    return String(texto)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  var L = 96;
  var A = 120;

  var C = {
    negro: "#1a1a22",
    rojo: "#ff4d4d",
    naranja: "#ff9f1c",
    amarillo: "#ffd93d",
    verde: "#6bcb77",
    azul: "#4d96ff",
    morado: "#b983ff",
    rosa: "#ff8fab",
    marron: "#a06a3a",
    blanco: "#faf6ea",
    gris: "#9aa0b4",
    celeste: "#7fd4ff",
    nube: "#e8f2ff"
  };

  var PAPELES = ["#f6f0e0", "#fdf3f7", "#eef6ff", "#f2ffe9", "#fff9e6", "#f3eefb"];

  var papel = function (ctx, azar) {
    var tipo = Math.floor(azar() * 7);
    if (tipo === 1) {
      var cartulina = ["#9bd4ff", "#a8e6a1", "#ffb3c8", "#ffe28a", "#c9b6ff"][Math.floor(azar() * 5)];
      ctx.fillStyle = cartulina;
      ctx.fillRect(0, 0, L, A);
      for (var c = 0; c < 10; c++) {
        ctx.fillStyle = azar() < 0.5 ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.04)";
        ctx.fillRect(Math.floor(azar() * L), Math.floor(azar() * A), 3 + Math.floor(azar() * 5), 1);
      }
      return;
    }
    if (tipo === 2) {
      ctx.fillStyle = "#f4f2ea";
      ctx.fillRect(0, 0, L, A);
      for (var a1 = 0; a1 < 7; a1++) {
        ctx.strokeStyle = "rgba(0,0,0,0.05)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        var x1 = azar() * L;
        var y1 = azar() * A;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1 + (azar() - 0.5) * L, y1 + (azar() - 0.5) * A);
        ctx.stroke();
      }
      for (var m1 = 0; m1 < 3; m1++) {
        ctx.fillStyle = "rgba(0,0,0,0.04)";
        ctx.beginPath();
        ctx.ellipse(azar() * L, azar() * A, 10 + azar() * 20, 6 + azar() * 14, azar() * 3, 0, Math.PI * 2);
        ctx.fill();
      }
      return;
    }
    if (tipo === 3) {
      ctx.fillStyle = "#fdfcf5";
      ctx.fillRect(0, 0, L, A);
      ctx.strokeStyle = "rgba(60,60,90,0.5)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(8, 22);
      ctx.lineTo(L - 8, 22);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(8, 30);
      ctx.lineTo(L * 0.55, 30);
      ctx.stroke();
      ctx.strokeStyle = "rgba(200,90,90,0.6)";
      ctx.beginPath();
      ctx.moveTo(10, 0);
      ctx.lineTo(10, A);
      ctx.stroke();
      ctx.fillStyle = "rgba(60,60,90,0.35)";
      ctx.fillRect(8, 8, 3, 8);
      ctx.fillRect(14, 8, 3, 8);
      ctx.fillRect(20, 8, 3, 8);
      for (var l3 = 36; l3 < A - 8; l3 += 14) {
        ctx.strokeStyle = "rgba(120,140,180,0.25)";
        ctx.beginPath();
        ctx.moveTo(12, l3);
        ctx.lineTo(L - 8, l3);
        ctx.stroke();
      }
      return;
    }
    if (tipo === 4) {
      ctx.fillStyle = "#f7f4ea";
      ctx.fillRect(0, 0, L, A);
      for (var dx4 = 6; dx4 < L; dx4 += 10) {
        for (var dy4 = 6; dy4 < A; dy4 += 10) {
          ctx.fillStyle = "rgba(0,0,0,0.035)";
          ctx.fillRect(dx4, dy4, 2, 2);
        }
      }
      ctx.strokeStyle = "rgba(0,0,0,0.08)";
      ctx.lineWidth = 2;
      ctx.strokeRect(4, 4, L - 8, A - 8);
      ctx.setLineDash([3, 4]);
      ctx.strokeRect(8, 8, L - 16, A - 16);
      ctx.setLineDash([]);
      return;
    }
    if (tipo === 5) {
      ctx.fillStyle = "#fdf8ec";
      ctx.fillRect(0, 0, L, A);
      ctx.strokeStyle = "#1a1a22";
      ctx.lineWidth = 3;
      ctx.strokeRect(3, 3, L - 6, A - 6);
      ctx.beginPath();
      ctx.moveTo(3, Math.round(A / 3));
      ctx.lineTo(L - 3, Math.round(A / 3));
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(L / 2, Math.round(A / 3));
      ctx.lineTo(L / 2, A - 3);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(3, Math.round((A * 2) / 3));
      ctx.lineTo(L / 2, Math.round((A * 2) / 3));
      ctx.stroke();
      return;
    }
    ctx.fillStyle = PAPELES[Math.floor(azar() * PAPELES.length)];
    ctx.fillRect(0, 0, L, A);
    for (var i = 0; i < 12; i++) {
      ctx.fillStyle = azar() < 0.5 ? "rgba(140,110,60,0.05)" : "rgba(0,0,0,0.03)";
      ctx.fillRect(Math.floor(azar() * L), Math.floor(azar() * A), 2 + Math.floor(azar() * 4), 1);
    }
    if (azar() < 0.6) {
      var cx = 10 + azar() * (L - 22);
      var cy = 12 + azar() * (A - 26);
      ctx.globalAlpha = 0.14;
      ctx.strokeStyle = "#8a6a3a";
      ctx.lineWidth = 2 + azar() * 2;
      ctx.beginPath();
      ctx.arc(cx, cy, 6 + azar() * 10, azar() * 5, azar() * 5 + 2.2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
    if (azar() < 0.55) {
      ctx.fillStyle = "rgba(120,80,40,0.10)";
      ctx.beginPath();
      ctx.ellipse(azar() * (L - 18), azar() * (A - 16), 4 + azar() * 8, 3 + azar() * 6, azar(), 0, Math.PI * 2);
      ctx.fill();
    }
    if (azar() < 0.45) {
      var esq = Math.floor(azar() * 4);
      var ex = esq % 2 === 0 ? 0 : L;
      var ey = esq < 2 ? 0 : A;
      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.beginPath();
      ctx.moveTo(ex, ey);
      ctx.lineTo(ex + (ex === 0 ? 14 : -14), ey);
      ctx.lineTo(ex, ey + (ey === 0 ? 14 : -14));
      ctx.closePath();
      ctx.fill();
    }
    if (azar() < 0.35) {
      var gy = 6 + azar() * (A - 12);
      ctx.fillStyle = "#9aa0b4";
      ctx.fillRect(2, gy, 5, 2);
      ctx.fillStyle = "#d8d8ea";
      ctx.fillRect(2, gy, 2, 1);
    }
    if (azar() < 0.4) {
      ctx.fillStyle = "rgba(232,226,200,0.55)";
      if (azar() < 0.5) {
        ctx.fillRect(0, azar() * (A - 8), 10, 6);
      } else {
        ctx.fillRect(L - 10, azar() * (A - 8), 10, 6);
      }
    }
  };

  var PERFILES = [
    { jitter: 3.4, ancho: 2.6, relleno: 0.8, densidad: 0.75 },
    { jitter: 0.7, ancho: 1.2, relleno: 0.55, densidad: 0.5 },
    { jitter: 2.1, ancho: 1.6, relleno: 0.28, densidad: 1.35 },
    { jitter: 3.8, ancho: 1.4, relleno: 0.65, densidad: 0.7 },
    { jitter: 2.3, ancho: 2.1, relleno: 0.6, densidad: 0.9 },
    { jitter: 0.3, ancho: 1.1, relleno: 0.4, densidad: 0.45 },
    { jitter: 1.7, ancho: 2.3, relleno: 0.98, densidad: 0.6 },
    { jitter: 1.5, ancho: 1.3, relleno: 0.1, densidad: 1.7 }
  ];
  var perfilActual = { jitter: 1, ancho: 1, relleno: 0.55, densidad: 1 };

  var trazo = function (ctx, puntos, color, ancho, azar) {
    ctx.strokeStyle = color;
    ctx.lineWidth = (ancho || 1.5) * perfilActual.ancho;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    var primero = true;
    for (var i = 0; i < puntos.length - 1; i++) {
      var a = puntos[i];
      var b = puntos[i + 1];
      var dx = b[0] - a[0];
      var dy = b[1] - a[1];
      var largo = Math.sqrt(dx * dx + dy * dy);
      var pasos = Math.max(1, Math.round(largo / 5));
      for (var p = 0; p <= pasos; p++) {
        var t = p / pasos;
        var desvio = p > 0 && p < pasos ? 1.6 * perfilActual.jitter : 0;
        var x = a[0] + dx * t + (azar() - 0.5) * desvio;
        var y = a[1] + dy * t + (azar() - 0.5) * desvio;
        if (primero) {
          ctx.moveTo(x, y);
          primero = false;
        } else {
          ctx.lineTo(x, y);
        }
      }
    }
    ctx.stroke();
  };

  var poligono = function (ctx, puntos) {
    ctx.beginPath();
    ctx.moveTo(puntos[0][0], puntos[0][1]);
    for (var i = 1; i < puntos.length; i++) {
      ctx.lineTo(puntos[i][0], puntos[i][1]);
    }
    ctx.closePath();
  };

  var relleno = function (ctx, puntos, color, azar) {
    ctx.fillStyle = color;
    poligono(ctx, puntos);
    ctx.fill();
    if (azar && azar() < 0.15 + perfilActual.relleno * 0.6) {
      ctx.save();
      poligono(ctx, puntos);
      ctx.clip();
      ctx.globalAlpha = 0.45;
      for (var x = -A; x < L + A; x += (5 + azar() * 4) * perfilActual.densidad) {
        trazo(ctx, [[x, 0], [x + 10, A]], color, 1.1, azar);
      }
      ctx.restore();
      ctx.globalAlpha = 1;
    }
  };

  var circulo = function (ctx, x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  };

  var aro = function (ctx, x, y, r, color, ancho, azar) {
    ctx.strokeStyle = color;
    ctx.lineWidth = ancho || 1.5;
    ctx.beginPath();
    ctx.arc(x, y, r + (azar ? (azar() - 0.5) * 1.4 : 0), 0, Math.PI * 2);
    ctx.stroke();
  };

  var punto = function (ctx, x, y, color, tam) {
    ctx.fillStyle = color;
    ctx.fillRect(Math.round(x), Math.round(y), tam || 2, tam || 2);
  };

  var cara = function (ctx, x, y, azar, color) {
    var tinta = color || C.negro;
    punto(ctx, x - 4, y - 2, tinta, 2);
    punto(ctx, x + 3, y - 3, tinta, 2);
    trazo(ctx, [[x - 4, y + 4], [x, y + 6], [x + 4, y + 4]], tinta, 1.4, azar);
  };

  var nube = function (ctx, x, y) {
    circulo(ctx, x, y, 6, C.nube);
    circulo(ctx, x + 9, y - 3, 8, C.nube);
    circulo(ctx, x + 19, y, 6, C.nube);
    ctx.fillStyle = C.nube;
    ctx.fillRect(x, y - 1, 19, 7);
  };

  var estrellitas = function (ctx, azar, n) {
    for (var i = 0; i < n; i++) {
      var x = 6 + azar() * 84;
      var y = 8 + azar() * 100;
      var col = azar() < 0.5 ? C.amarillo : C.celeste;
      trazo(ctx, [[x - 3, y], [x + 3, y]], col, 1.3, azar);
      trazo(ctx, [[x, y - 3], [x, y + 3]], col, 1.3, azar);
    }
  };

  var dCasa = function (ctx, azar) {
    trazo(ctx, [[4, 106], [92, 106]], C.verde, 3, azar);
    for (var g = 0; g < 8; g++) {
      var gx = 6 + g * 11 + azar() * 4;
      trazo(ctx, [[gx, 106], [gx + 2, 100]], C.verde, 1.6, azar);
    }
    relleno(ctx, [[24, 58], [72, 58], [72, 106], [24, 106]], C.amarillo, azar);
    trazo(ctx, [[24, 58], [72, 58], [72, 106], [24, 106], [24, 58]], C.negro, 2, azar);
    relleno(ctx, [[16, 58], [48, 32], [80, 58]], C.rojo, azar);
    trazo(ctx, [[16, 58], [48, 32], [80, 58]], C.negro, 2, azar);
    relleno(ctx, [[42, 82], [56, 82], [56, 106], [42, 106]], C.marron);
    trazo(ctx, [[42, 82], [56, 82], [56, 106], [42, 106], [42, 82]], C.negro, 1.6, azar);
    punto(ctx, 53, 94, C.amarillo, 2);
    relleno(ctx, [[28, 68], [40, 68], [40, 78], [28, 78]], C.celeste);
    trazo(ctx, [[28, 68], [40, 68], [40, 78], [28, 78], [28, 68]], C.negro, 1.4, azar);
    trazo(ctx, [[34, 68], [34, 78]], C.negro, 1.2, azar);
    trazo(ctx, [[64, 34], [60, 26], [66, 20], [60, 14]], C.gris, 2, azar);
    circulo(ctx, 14, 18, 7, C.amarillo);
    for (var r = 0; r < 8; r++) {
      var an = (r / 8) * Math.PI * 2;
      trazo(ctx, [[14 + Math.cos(an) * 9, 18 + Math.sin(an) * 9], [14 + Math.cos(an) * 13, 18 + Math.sin(an) * 13]], C.naranja, 1.6, azar);
    }
    trazo(ctx, [[58, 16], [62, 13], [66, 16]], C.negro, 1.4, azar);
    trazo(ctx, [[70, 22], [74, 19], [78, 22]], C.negro, 1.4, azar);
  };

  var dGato = function (ctx, azar) {
    relleno(ctx, [[30, 74], [66, 74], [70, 102], [26, 102]], C.gris, azar);
    trazo(ctx, [[30, 74], [66, 74], [70, 102], [26, 102], [30, 74]], C.negro, 2, azar);
    relleno(ctx, [[26, 38], [70, 38], [70, 76], [26, 76]], C.gris, azar);
    trazo(ctx, [[26, 38], [70, 38], [70, 76], [26, 76], [26, 38]], C.negro, 2, azar);
    relleno(ctx, [[27, 39], [34, 20], [43, 39]], C.gris);
    trazo(ctx, [[27, 39], [34, 20], [43, 39]], C.negro, 2, azar);
    relleno(ctx, [[53, 39], [62, 20], [69, 39]], C.gris);
    trazo(ctx, [[53, 39], [62, 20], [69, 39]], C.negro, 2, azar);
    relleno(ctx, [[31, 36], [35, 26], [39, 36]], C.rosa);
    relleno(ctx, [[57, 36], [61, 26], [65, 36]], C.rosa);
    punto(ctx, 39, 52, C.negro, 3);
    punto(ctx, 56, 52, C.negro, 3);
    punto(ctx, 40, 51, C.blanco, 1);
    punto(ctx, 57, 51, C.blanco, 1);
    relleno(ctx, [[46, 58], [50, 58], [48, 61]], C.rosa);
    trazo(ctx, [[48, 61], [44, 65]], C.negro, 1.3, azar);
    trazo(ctx, [[48, 61], [52, 65]], C.negro, 1.3, azar);
    trazo(ctx, [[30, 58], [18, 56]], C.negro, 1, azar);
    trazo(ctx, [[30, 62], [18, 62]], C.negro, 1, azar);
    trazo(ctx, [[66, 58], [78, 56]], C.negro, 1, azar);
    trazo(ctx, [[66, 62], [78, 62]], C.negro, 1, azar);
    trazo(ctx, [[36, 102], [36, 110]], C.negro, 2, azar);
    trazo(ctx, [[58, 102], [58, 110]], C.negro, 2, azar);
    trazo(ctx, [[70, 92], [80, 86], [82, 76]], C.negro, 2, azar);
    circulo(ctx, 80, 22, 4, C.rojo);
    circulo(ctx, 87, 22, 4, C.rojo);
    relleno(ctx, [[76, 23], [83, 34], [91, 23]], C.rojo);
  };

  var dPerro = function (ctx, azar) {
    trazo(ctx, [[6, 108], [90, 108]], C.verde, 3, azar);
    relleno(ctx, [[26, 64], [70, 64], [74, 102], [22, 102]], C.marron, azar);
    trazo(ctx, [[26, 64], [70, 64], [74, 102], [22, 102], [26, 64]], C.negro, 2, azar);
    trazo(ctx, [[34, 102], [34, 110]], C.negro, 2, azar);
    trazo(ctx, [[62, 102], [62, 110]], C.negro, 2, azar);
    relleno(ctx, [[28, 30], [68, 30], [68, 66], [28, 66]], C.marron, azar);
    trazo(ctx, [[28, 30], [68, 30], [68, 66], [28, 66], [28, 30]], C.negro, 2, azar);
    relleno(ctx, [[24, 32], [36, 36], [26, 54]], C.marron);
    relleno(ctx, [[72, 32], [60, 36], [70, 54]], C.marron);
    punto(ctx, 38, 42, C.negro, 3);
    punto(ctx, 58, 42, C.negro, 3);
    circulo(ctx, 48, 56, 8, C.blanco);
    circulo(ctx, 48, 52, 3, C.negro);
    trazo(ctx, [[48, 55], [48, 60]], C.negro, 1.2, azar);
    trazo(ctx, [[43, 62], [48, 60], [53, 62]], C.negro, 1.2, azar);
    relleno(ctx, [[45, 64], [51, 64], [48, 74]], C.rojo);
    trazo(ctx, [[72, 74], [82, 64], [80, 52]], C.negro, 2, azar);
  };

  var dPulpo = function (ctx, azar) {
    ctx.fillStyle = C.morado;
    ctx.beginPath();
    ctx.arc(48, 52, 26, Math.PI, 0);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(22, 52, 52, 20);
    aro(ctx, 48, 52, 26, C.negro, 2, azar);
    trazo(ctx, [[22, 72], [74, 72]], C.negro, 1.6, azar);
    circulo(ctx, 39, 46, 5, C.blanco);
    circulo(ctx, 57, 46, 5, C.blanco);
    punto(ctx, 40, 46, C.negro, 3);
    punto(ctx, 58, 46, C.negro, 3);
    trazo(ctx, [[44, 60], [48, 63], [52, 60]], C.negro, 1.4, azar);
    for (var t = 0; t < 6; t++) {
      var x0 = 26 + t * 10;
      trazo(ctx, [[x0, 74], [x0 - 4 + (t % 2) * 8, 86], [x0, 98], [x0 - 3 + (t % 2) * 6, 110]], C.morado, 3, azar);
      punto(ctx, x0 - 1 + (t % 2) * 5, 90, C.rosa, 2);
    }
    circulo(ctx, 78, 32, 3, C.celeste);
    circulo(ctx, 84, 24, 2, C.celeste);
    circulo(ctx, 80, 16, 2, C.celeste);
  };

  var dSeta = function (ctx, azar) {
    trazo(ctx, [[6, 104], [90, 104]], C.verde, 3, azar);
    relleno(ctx, [[40, 66], [56, 66], [56, 104], [40, 104]], C.blanco, azar);
    trazo(ctx, [[40, 66], [56, 66], [56, 104], [40, 104], [40, 66]], C.negro, 2, azar);
    ctx.fillStyle = C.rojo;
    ctx.beginPath();
    ctx.arc(48, 66, 30, Math.PI, 0);
    ctx.closePath();
    ctx.fill();
    trazo(ctx, [[18, 66], [48, 36], [78, 66]], C.negro, 2, azar);
    circulo(ctx, 36, 56, 4, C.blanco);
    circulo(ctx, 58, 52, 5, C.blanco);
    circulo(ctx, 48, 62, 3, C.blanco);
    punto(ctx, 45, 78, C.negro, 2);
    punto(ctx, 51, 78, C.negro, 2);
    trazo(ctx, [[45, 84], [48, 86], [51, 84]], C.negro, 1.3, azar);
    circulo(ctx, 14, 16, 6, C.amarillo);
  };

  var dTorre = function (ctx, azar) {
    nube(ctx, 8, 22);
    nube(ctx, 62, 84);
    circulo(ctx, 74, 26, 8, C.rosa);
    trazo(ctx, [[74, 34], [66, 48], [60, 62]], C.negro, 1, azar);
    trazo(ctx, [[34, 108], [43, 66], [48, 26], [53, 66], [62, 108]], C.negro, 2, azar);
    trazo(ctx, [[36, 96], [60, 96]], C.negro, 1.6, azar);
    trazo(ctx, [[40, 72], [56, 72]], C.negro, 1.6, azar);
    trazo(ctx, [[36, 96], [60, 72]], C.negro, 1.2, azar);
    trazo(ctx, [[60, 96], [36, 72]], C.negro, 1.2, azar);
    trazo(ctx, [[48, 26], [48, 16]], C.negro, 1.6, azar);
    punto(ctx, 47, 13, C.rojo, 3);
    trazo(ctx, [[10, 108], [86, 108]], C.marron, 2, azar);
  };

  var dCastillo = function (ctx, azar) {
    trazo(ctx, [[4, 106], [30, 94], [58, 106], [92, 100]], C.verde, 2, azar);
    relleno(ctx, [[14, 44], [34, 44], [34, 104], [14, 104]], C.gris, azar);
    for (var i = 0; i < 3; i++) {
      relleno(ctx, [[14 + i * 8, 36], [20 + i * 8, 36], [20 + i * 8, 44], [14 + i * 8, 44]], C.gris);
    }
    relleno(ctx, [[62, 44], [82, 44], [82, 104], [62, 104]], C.gris, azar);
    for (var j = 0; j < 3; j++) {
      relleno(ctx, [[62 + j * 8, 36], [68 + j * 8, 36], [68 + j * 8, 44], [62 + j * 8, 44]], C.gris);
    }
    relleno(ctx, [[34, 66], [62, 66], [62, 104], [34, 104]], C.gris, azar);
    trazo(ctx, [[14, 44], [34, 44], [34, 104]], C.negro, 1.6, azar);
    trazo(ctx, [[62, 44], [82, 44], [82, 104]], C.negro, 1.6, azar);
    ctx.fillStyle = C.marron;
    ctx.beginPath();
    ctx.arc(48, 104, 10, Math.PI, 0);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(38, 88, 20, 16);
    punto(ctx, 24, 54, C.negro, 3);
    punto(ctx, 72, 54, C.negro, 3);
    punto(ctx, 24, 70, C.negro, 3);
    punto(ctx, 72, 70, C.negro, 3);
    trazo(ctx, [[24, 36], [24, 24]], C.negro, 1.4, azar);
    relleno(ctx, [[24, 24], [36, 27], [24, 30]], C.rojo);
    trazo(ctx, [[72, 36], [72, 24]], C.negro, 1.4, azar);
    relleno(ctx, [[72, 24], [84, 27], [72, 30]], C.rojo);
    circulo(ctx, 12, 16, 6, C.amarillo);
  };

  var dFlor = function (ctx, azar) {
    var color = azar() < 0.5 ? C.rojo : C.morado;
    trazo(ctx, [[48, 60], [50, 106]], C.verde, 2, azar);
    relleno(ctx, [[49, 84], [34, 76], [48, 92]], C.verde);
    relleno(ctx, [[50, 92], [66, 82], [52, 98]], C.verde);
    for (var p = 0; p < 6; p++) {
      var an = (p / 6) * Math.PI * 2;
      circulo(ctx, 48 + Math.cos(an) * 11, 48 + Math.sin(an) * 11, 9, color);
    }
    circulo(ctx, 48, 48, 9, C.amarillo);
    cara(ctx, 48, 48, azar);
    circulo(ctx, 14, 16, 6, C.amarillo);
    trazo(ctx, [[76, 70], [74, 76], [76, 82]], C.negro, 1.4, azar);
    relleno(ctx, [[75, 72], [66, 66], [70, 78]], C.celeste);
    relleno(ctx, [[77, 72], [86, 66], [82, 78]], C.celeste);
    trazo(ctx, [[8, 108], [88, 108]], C.verde, 3, azar);
  };

  var dCohete = function (ctx, azar) {
    circulo(ctx, 80, 22, 9, C.amarillo);
    punto(ctx, 77, 20, C.naranja, 2);
    punto(ctx, 83, 26, C.naranja, 2);
    estrellitas(ctx, azar, 4);
    relleno(ctx, [[38, 34], [58, 34], [58, 86], [38, 86]], C.blanco, azar);
    trazo(ctx, [[38, 34], [58, 34], [58, 86], [38, 86], [38, 34]], C.negro, 2, azar);
    relleno(ctx, [[38, 34], [48, 18], [58, 34]], C.rojo, azar);
    trazo(ctx, [[38, 34], [48, 18], [58, 34]], C.negro, 2, azar);
    circulo(ctx, 48, 48, 7, C.celeste);
    aro(ctx, 48, 48, 7, C.negro, 1.6, azar);
    relleno(ctx, [[38, 70], [28, 88], [38, 84]], C.rojo);
    relleno(ctx, [[58, 70], [68, 88], [58, 84]], C.rojo);
    relleno(ctx, [[42, 86], [54, 86], [48, 104]], C.naranja);
    relleno(ctx, [[45, 86], [51, 86], [48, 97]], C.amarillo);
  };

  var dPez = function (ctx, azar) {
    trazo(ctx, [[6, 26], [28, 22]], C.celeste, 2, azar);
    trazo(ctx, [[62, 20], [90, 24]], C.celeste, 2, azar);
    circulo(ctx, 70, 40, 2.5, C.celeste);
    circulo(ctx, 76, 32, 2, C.celeste);
    circulo(ctx, 80, 24, 1.8, C.celeste);
    ctx.fillStyle = C.naranja;
    ctx.beginPath();
    ctx.ellipse(46, 62, 26, 18, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = C.negro;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(46, 62, 26, 18, 0, 0, Math.PI * 2);
    ctx.stroke();
    relleno(ctx, [[70, 62], [86, 48], [86, 76]], C.rojo);
    relleno(ctx, [[40, 46], [52, 38], [54, 50]], C.rojo);
    circulo(ctx, 36, 58, 4, C.blanco);
    punto(ctx, 35, 58, C.negro, 2);
    trazo(ctx, [[24, 66], [28, 70]], C.negro, 1.4, azar);
    trazo(ctx, [[10, 100], [20, 96], [30, 100], [40, 96]], C.azul, 1.6, azar);
  };

  var dBallena = function (ctx, azar) {
    trazo(ctx, [[6, 30], [90, 26]], C.celeste, 2, azar);
    ctx.fillStyle = C.azul;
    ctx.beginPath();
    ctx.ellipse(44, 72, 30, 20, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = C.negro;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(44, 72, 30, 20, 0, 0, Math.PI * 2);
    ctx.stroke();
    relleno(ctx, [[70, 72], [88, 56], [88, 88]], C.azul, azar);
    ctx.fillStyle = C.blanco;
    ctx.beginPath();
    ctx.ellipse(42, 82, 22, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    circulo(ctx, 26, 66, 4, C.blanco);
    punto(ctx, 25, 66, C.negro, 2);
    trazo(ctx, [[16, 76], [22, 80], [28, 76]], C.negro, 1.4, azar);
    trazo(ctx, [[38, 52], [36, 34], [44, 26]], C.celeste, 2, azar);
    circulo(ctx, 44, 24, 2, C.celeste);
    circulo(ctx, 50, 30, 2, C.celeste);
    circulo(ctx, 78, 38, 2.5, C.celeste);
  };

  var dMariposa = function (ctx, azar) {
    var cA = azar() < 0.5 ? C.morado : C.azul;
    var cB = azar() < 0.5 ? C.rosa : C.amarillo;
    relleno(ctx, [[46, 56], [22, 34], [20, 62]], cA);
    relleno(ctx, [[50, 56], [74, 34], [76, 62]], cA);
    relleno(ctx, [[46, 60], [26, 74], [24, 94]], cB, azar);
    relleno(ctx, [[50, 60], [70, 74], [72, 94]], cB, azar);
    circulo(ctx, 34, 48, 4, C.blanco);
    circulo(ctx, 62, 48, 4, C.blanco);
    circulo(ctx, 36, 82, 3, C.blanco);
    circulo(ctx, 60, 82, 3, C.blanco);
    trazo(ctx, [[48, 52], [48, 96]], C.negro, 2.5, azar);
    trazo(ctx, [[48, 52], [40, 38]], C.negro, 1.4, azar);
    trazo(ctx, [[48, 52], [56, 38]], C.negro, 1.4, azar);
    punto(ctx, 40, 38, C.negro, 2);
    punto(ctx, 56, 38, C.negro, 2);
    cara(ctx, 48, 66, azar);
    circulo(ctx, 12, 14, 5, C.amarillo);
  };

  var dTierra = function (ctx, azar) {
    estrellitas(ctx, azar, 6);
    circulo(ctx, 48, 60, 30, C.azul);
    ctx.fillStyle = C.verde;
    ctx.beginPath();
    ctx.ellipse(38, 50, 10, 6, 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(60, 70, 12, 8, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(52, 44, 6, 4, 0.2, 0, Math.PI * 2);
    ctx.fill();
    aro(ctx, 48, 60, 30, C.negro, 2, azar);
    cara(ctx, 48, 62, azar);
    aro(ctx, 16, 96, 8, C.negro, 1.6, azar);
    trazo(ctx, [[16, 88], [16, 104]], C.negro, 1.6, azar);
    trazo(ctx, [[16, 96], [10, 102]], C.negro, 1.4, azar);
    trazo(ctx, [[16, 96], [22, 102]], C.negro, 1.4, azar);
  };

  var dRobot = function (ctx, azar) {
    estrellitas(ctx, azar, 4);
    trazo(ctx, [[48, 26], [48, 14]], C.negro, 2, azar);
    circulo(ctx, 48, 12, 3, C.rojo);
    relleno(ctx, [[28, 26], [68, 26], [68, 50], [28, 50]], C.gris, azar);
    trazo(ctx, [[28, 26], [68, 26], [68, 50], [28, 50], [28, 26]], C.negro, 2, azar);
    punto(ctx, 38, 34, C.amarillo, 4);
    punto(ctx, 58, 34, C.amarillo, 4);
    trazo(ctx, [[36, 45], [42, 45], [46, 42], [50, 45], [56, 45], [60, 42]], C.negro, 1.4, azar);
    relleno(ctx, [[32, 54], [64, 54], [64, 86], [32, 86]], C.gris, azar);
    trazo(ctx, [[32, 54], [64, 54], [64, 86], [32, 86], [32, 54]], C.negro, 2, azar);
    circulo(ctx, 44, 66, 4, C.rojo);
    circulo(ctx, 51, 66, 4, C.rojo);
    relleno(ctx, [[40, 67], [48, 78], [55, 67]], C.rojo);
    trazo(ctx, [[32, 60], [20, 74]], C.negro, 2, azar);
    trazo(ctx, [[64, 60], [76, 74]], C.negro, 2, azar);
    trazo(ctx, [[40, 86], [40, 102]], C.negro, 2, azar);
    trazo(ctx, [[56, 86], [56, 102]], C.negro, 2, azar);
    punto(ctx, 37, 102, C.negro, 6);
    punto(ctx, 53, 102, C.negro, 6);
    trazo(ctx, [[14, 108], [82, 108]], C.negro, 1.4, azar);
  };

  var dMonstruo = function (ctx, azar) {
    var color = azar() < 0.5 ? C.verde : C.morado;
    estrellitas(ctx, azar, 3);
    relleno(ctx, [[20, 50], [76, 50], [80, 106], [16, 106]], color, azar);
    trazo(ctx, [[20, 50], [76, 50], [80, 106], [16, 106], [20, 50]], C.negro, 2, azar);
    for (var p = 0; p < 11; p++) {
      var x = 22 + p * 5;
      trazo(ctx, [[x, 50], [x + 1, 42]], C.negro, 1.4, azar);
      relleno(ctx, [[x - 2, 48], [x + 1, 40], [x + 4, 48]], color);
    }
    relleno(ctx, [[28, 52], [34, 34], [42, 50]], color, azar);
    trazo(ctx, [[28, 52], [34, 34], [42, 50]], C.negro, 1.6, azar);
    relleno(ctx, [[54, 50], [62, 34], [68, 52]], color, azar);
    trazo(ctx, [[54, 50], [62, 34], [68, 52]], C.negro, 1.6, azar);
    circulo(ctx, 36, 66, 8, C.blanco);
    circulo(ctx, 62, 66, 8, C.blanco);
    punto(ctx, 36, 66, C.negro, 4);
    punto(ctx, 62, 66, C.negro, 4);
    relleno(ctx, [[30, 84], [66, 84], [62, 97], [34, 97]], C.negro);
    for (var d = 0; d < 4; d++) {
      relleno(ctx, [[33 + d * 8, 84], [37 + d * 8, 84], [35 + d * 8, 90]], C.blanco);
    }
    trazo(ctx, [[22, 100], [22, 110]], C.negro, 3, azar);
    trazo(ctx, [[74, 100], [74, 110]], C.negro, 3, azar);
  };

  var dDino = function (ctx, azar) {
    var color = azar() < 0.5 ? C.verde : "#7ecb5f";
    trazo(ctx, [[4, 106], [92, 106]], C.verde, 3, azar);
    relleno(ctx, [[18, 96], [30, 62], [58, 58], [76, 68], [80, 102], [20, 102]], color, azar);
    relleno(ctx, [[30, 66], [26, 42], [44, 30], [56, 42], [50, 58]], color, azar);
    circulo(ctx, 42, 38, 3, C.blanco);
    punto(ctx, 41, 38, C.negro, 2);
    trazo(ctx, [[52, 48], [58, 50]], C.negro, 1.2, azar);
    for (var e = 0; e < 4; e++) {
      relleno(ctx, [[28 + e * 13, 62 - e], [34 + e * 13, 50 - e], [40 + e * 13, 64 - e]], C.amarillo);
    }
    trazo(ctx, [[34, 102], [32, 112]], C.negro, 3, azar);
    trazo(ctx, [[64, 102], [66, 112]], C.negro, 3, azar);
    trazo(ctx, [[78, 84], [90, 74], [92, 60]], color, 4, azar);
    punto(ctx, 46, 78, C.amarillo, 3);
    punto(ctx, 38, 84, C.amarillo, 3);
    circulo(ctx, 14, 18, 6, C.amarillo);
  };

  var dUnicornio = function (ctx, azar) {
    var colores = [C.rojo, C.naranja, C.amarillo, C.verde, C.azul, C.morado];
    estrellitas(ctx, azar, 5);
    relleno(ctx, [[20, 70], [66, 70], [72, 104], [14, 104]], C.blanco, azar);
    trazo(ctx, [[20, 70], [66, 70], [72, 104], [14, 104], [20, 70]], C.negro, 2, azar);
    trazo(ctx, [[28, 104], [28, 112]], C.negro, 2.4, azar);
    trazo(ctx, [[58, 104], [58, 112]], C.negro, 2.4, azar);
    relleno(ctx, [[62, 72], [78, 44], [90, 52], [78, 74]], C.blanco, azar);
    trazo(ctx, [[80, 48], [88, 34], [92, 50]], C.amarillo, 3, azar);
    for (var m = 0; m < 6; m++) {
      trazo(ctx, [[64 - m * 2, 50 + m * 6], [78 - m * 4, 56 + m * 6], [66 - m * 2, 66 + m * 6]], colores[m], 2.4, azar);
    }
    punto(ctx, 82, 50, C.negro, 2);
    punto(ctx, 88, 58, C.rosa, 2);
    trazo(ctx, [[74, 80], [82, 84], [88, 78]], C.negro, 1.3, azar);
    circulo(ctx, 12, 16, 5, C.amarillo);
  };

  var dTortuga = function (ctx, azar) {
    trazo(ctx, [[4, 108], [92, 108]], C.verde, 3, azar);
    ctx.fillStyle = C.verde;
    ctx.beginPath();
    ctx.arc(44, 74, 26, Math.PI, 0);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(18, 74, 52, 12);
    aro(ctx, 44, 74, 26, C.negro, 2, azar);
    trazo(ctx, [[18, 86], [70, 86]], C.negro, 1.8, azar);
    trazo(ctx, [[44, 48], [44, 86]], C.negro, 1.4, azar);
    trazo(ctx, [[22, 66], [66, 66]], C.negro, 1.4, azar);
    punto(ctx, 33, 60, C.amarillo, 3);
    punto(ctx, 55, 60, C.amarillo, 3);
    circulo(ctx, 80, 84, 7, C.verde);
    punto(ctx, 80, 82, C.negro, 2);
    trazo(ctx, [[84, 88], [88, 90]], C.negro, 1.2, azar);
    relleno(ctx, [[18, 90], [28, 90], [30, 100], [20, 100]], C.verde);
    relleno(ctx, [[60, 90], [70, 90], [72, 100], [62, 100]], C.verde);
    trazo(ctx, [[14, 92], [8, 88]], C.negro, 1.6, azar);
  };

  var dCaracol = function (ctx, azar) {
    trazo(ctx, [[4, 104], [92, 104]], C.verde, 3, azar);
    relleno(ctx, [[16, 100], [58, 100], [66, 88], [56, 84], [40, 84], [20, 90]], C.naranja, azar);
    trazo(ctx, [[16, 100], [58, 100], [66, 88], [56, 84], [40, 84], [20, 90], [16, 100]], C.negro, 1.8, azar);
    trazo(ctx, [[58, 86], [70, 72]], C.negro, 1.6, azar);
    circulo(ctx, 71, 70, 3, C.blanco);
    punto(ctx, 71, 70, C.negro, 2);
    trazo(ctx, [[62, 88], [76, 80]], C.negro, 1.6, azar);
    circulo(ctx, 77, 79, 2.5, C.blanco);
    punto(ctx, 77, 79, C.negro, 2);
    trazo(ctx, [[62, 94], [66, 96]], C.negro, 1.2, azar);
    circulo(ctx, 40, 72, 18, C.marron);
    aro(ctx, 40, 72, 18, C.negro, 1.8, azar);
    trazo(ctx, [[40, 72], [48, 64]], C.negro, 1.4, azar);
    trazo(ctx, [[48, 64], [52, 74], [44, 80]], C.negro, 1.4, azar);
    trazo(ctx, [[44, 80], [34, 76], [34, 64]], C.negro, 1.4, azar);
    trazo(ctx, [[34, 64], [46, 56], [58, 62]], C.negro, 1.4, azar);
    trazo(ctx, [[10, 98], [14, 100]], C.celeste, 2, azar);
    circulo(ctx, 14, 20, 5, C.amarillo);
  };

  var dHelado = function (ctx, azar) {
    relleno(ctx, [[36, 70], [60, 70], [48, 108]], C.marron, azar);
    trazo(ctx, [[36, 70], [60, 70], [48, 108], [36, 70]], C.negro, 2, azar);
    trazo(ctx, [[41, 78], [52, 84]], C.negro, 1.1, azar);
    trazo(ctx, [[44, 88], [54, 94]], C.negro, 1.1, azar);
    circulo(ctx, 48, 60, 13, C.rosa);
    circulo(ctx, 36, 46, 10, C.celeste);
    circulo(ctx, 60, 44, 10, C.amarillo);
    circulo(ctx, 48, 46, 9, C.verde);
    circulo(ctx, 48, 30, 4, C.rojo);
    trazo(ctx, [[48, 26], [52, 20]], C.negro, 1.4, azar);
    punto(ctx, 34, 42, C.rojo, 2);
    punto(ctx, 62, 40, C.rojo, 2);
    punto(ctx, 48, 56, C.rojo, 2);
    circulo(ctx, 14, 18, 6, C.amarillo);
    estrellitas(ctx, azar, 3);
  };

  var dPanda = function (ctx, azar) {
    circulo(ctx, 30, 34, 9, C.negro);
    circulo(ctx, 66, 34, 9, C.negro);
    circulo(ctx, 48, 52, 26, C.blanco);
    aro(ctx, 48, 52, 26, C.negro, 2, azar);
    ctx.fillStyle = C.negro;
    ctx.beginPath();
    ctx.ellipse(38, 48, 8, 10, 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(58, 48, 8, 10, -0.4, 0, Math.PI * 2);
    ctx.fill();
    circulo(ctx, 38, 48, 3, C.blanco);
    circulo(ctx, 58, 48, 3, C.blanco);
    punto(ctx, 38, 48, C.negro, 2);
    punto(ctx, 58, 48, C.negro, 2);
    relleno(ctx, [[45, 62], [51, 62], [48, 65]], C.negro);
    trazo(ctx, [[48, 65], [48, 68]], C.negro, 1.2, azar);
    trazo(ctx, [[44, 70], [48, 68], [52, 70]], C.negro, 1.2, azar);
    trazo(ctx, [[76, 40], [80, 106]], C.verde, 3, azar);
    trazo(ctx, [[74, 58], [84, 54]], C.verde, 2, azar);
    trazo(ctx, [[75, 78], [85, 74]], C.verde, 2, azar);
    circulo(ctx, 12, 14, 5, C.amarillo);
  };

  var dOvni = function (ctx, azar) {
    estrellitas(ctx, azar, 7);
    trazo(ctx, [[4, 106], [30, 92], [56, 106]], C.verde, 2, azar);
    trazo(ctx, [[40, 106], [66, 94], [92, 106]], C.verde, 2, azar);
    relleno(ctx, [[40, 64], [58, 64], [70, 104], [28, 104]], "rgba(255,217,61,0.3)");
    ctx.fillStyle = C.gris;
    ctx.beginPath();
    ctx.ellipse(48, 56, 26, 9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = C.negro;
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.ellipse(48, 56, 26, 9, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = C.celeste;
    ctx.beginPath();
    ctx.arc(48, 52, 11, Math.PI, 0);
    ctx.closePath();
    ctx.fill();
    punto(ctx, 30, 56, C.amarillo, 3);
    punto(ctx, 42, 58, C.rojo, 3);
    punto(ctx, 54, 58, C.amarillo, 3);
    punto(ctx, 66, 56, C.verde, 3);
  };

  var dCorazon = function (ctx, azar) {
    estrellitas(ctx, azar, 5);
    ctx.fillStyle = C.blanco;
    ctx.beginPath();
    ctx.ellipse(20, 58, 14, 7, -0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(76, 58, 14, 7, 0.4, 0, Math.PI * 2);
    ctx.fill();
    trazo(ctx, [[10, 52], [6, 58], [10, 64]], C.negro, 1.2, azar);
    trazo(ctx, [[86, 52], [90, 58], [86, 64]], C.negro, 1.2, azar);
    circulo(ctx, 38, 56, 15, C.rojo);
    circulo(ctx, 58, 56, 15, C.rojo);
    relleno(ctx, [[24, 58], [48, 100], [72, 58]], C.rojo, azar);
    trazo(ctx, [[20, 96], [76, 40]], C.marron, 2, azar);
    relleno(ctx, [[78, 38], [68, 42], [73, 50]], C.marron);
    trazo(ctx, [[30, 14], [42, 14]], C.negro, 2.4, azar);
    trazo(ctx, [[36, 14], [36, 26]], C.negro, 2.4, azar);
    trazo(ctx, [[52, 14], [52, 26]], C.negro, 2.4, azar);
    trazo(ctx, [[52, 20], [60, 14]], C.negro, 2.2, azar);
    trazo(ctx, [[52, 20], [60, 26]], C.negro, 2.2, azar);
    trazo(ctx, [[66, 26], [66, 14], [72, 20], [78, 14], [78, 26]], C.negro, 2.2, azar);
  };

  var dSol = function (ctx, azar) {
    circulo(ctx, 48, 50, 24, C.amarillo);
    for (var r = 0; r < 12; r++) {
      var an = (r / 12) * Math.PI * 2;
      trazo(ctx, [[48 + Math.cos(an) * 28, 50 + Math.sin(an) * 28], [48 + Math.cos(an) * 38, 50 + Math.sin(an) * 38]], C.naranja, 2.4, azar);
    }
    cara(ctx, 48, 48, azar);
    nube(ctx, 6, 96);
    nube(ctx, 68, 100);
    for (var f = 0; f < 3; f++) {
      var fx = 20 + f * 26;
      trazo(ctx, [[fx, 114], [fx, 108]], C.verde, 1.6, azar);
      circulo(ctx, fx, 106, 3.5, C.rojo);
    }
    trazo(ctx, [[14, 22], [18, 19], [22, 22]], C.negro, 1.3, azar);
    trazo(ctx, [[74, 20], [78, 17], [82, 20]], C.negro, 1.3, azar);
  };

  var dArbol = function (ctx, azar) {
    trazo(ctx, [[6, 108], [90, 108]], C.verde, 3, azar);
    trazo(ctx, [[48, 108], [46, 84], [42, 66]], C.marron, 4, azar);
    trazo(ctx, [[45, 88], [30, 74]], C.marron, 3, azar);
    trazo(ctx, [[46, 92], [62, 78]], C.marron, 3, azar);
    trazo(ctx, [[44, 78], [36, 60]], C.marron, 2.5, azar);
    circulo(ctx, 40, 50, 14, C.verde);
    circulo(ctx, 58, 48, 13, C.verde);
    circulo(ctx, 50, 38, 12, C.verde);
    punto(ctx, 38, 46, C.rojo, 3);
    punto(ctx, 56, 52, C.rojo, 3);
    punto(ctx, 62, 42, C.rojo, 3);
    punto(ctx, 48, 34, C.rojo, 3);
    trazo(ctx, [[30, 74], [30, 98]], C.negro, 1.2, azar);
    trazo(ctx, [[40, 78], [40, 98]], C.negro, 1.2, azar);
    trazo(ctx, [[29, 98], [41, 98]], C.marron, 2.5, azar);
    circulo(ctx, 14, 16, 6, C.amarillo);
  };

  var fEspacio = function (ctx, azar) {
    estrellitas(ctx, azar, 10);
    circulo(ctx, 78, 24, 8, C.amarillo);
    punto(ctx, 76, 22, C.naranja, 2);
    punto(ctx, 81, 27, C.naranja, 2);
    circulo(ctx, 28, 42, 5, C.morado);
    aro(ctx, 28, 42, 9, C.celeste, 1.2, azar);
    trazo(ctx, [[28, 32], [28, 27]], C.celeste, 1, azar);
  };

  var fPradera = function (ctx, azar) {
    circulo(ctx, 14, 16, 7, C.amarillo);
    nube(ctx, 56, 16);
    trazo(ctx, [[4, 104], [92, 104]], C.verde, 3, azar);
    for (var i = 0; i < 5; i++) {
      var x = 8 + i * 18 + azar() * 6;
      trazo(ctx, [[x, 104], [x, 98]], C.verde, 1.4, azar);
      circulo(ctx, x, 96, 3, azar() < 0.5 ? C.rojo : C.amarillo);
    }
    trazo(ctx, [[60, 22], [64, 18], [68, 22]], C.negro, 1.2, azar);
  };

  var fMar = function (ctx, azar) {
    circulo(ctx, 80, 18, 8, C.amarillo);
    for (var y = 36; y < A; y += 12) {
      trazo(ctx, [[6, y], [26, y - 3], [44, y], [64, y - 3], [88, y]], C.celeste, 1.4, azar);
    }
    circulo(ctx, 20, 52, 2.5, C.celeste);
    circulo(ctx, 26, 44, 2, C.celeste);
  };

  var fCiudad = function (ctx, azar) {
    circulo(ctx, 16, 18, 7, C.amarillo);
    var alts = [40, 56, 34, 58, 46];
    for (var i = 0; i < 5; i++) {
      var x = 4 + i * 18;
      var h = alts[i] + azar() * 8;
      ctx.fillStyle = i % 2 === 0 ? "#3a3a5c" : "#2e2e4a";
      ctx.fillRect(x, A - h, 15, h);
      ctx.fillStyle = C.amarillo;
      for (var wy = A - h + 6; wy < A - 6; wy += 10) {
        for (var wx = x + 3; wx < x + 13; wx += 6) {
          if (azar() < 0.6) {
            ctx.fillRect(wx, wy, 2, 2);
          }
        }
      }
    }
    trazo(ctx, [[0, A - 2], [L, A - 2]], C.negro, 2, azar);
  };

  var fLluvia = function (ctx, azar) {
    nube(ctx, 8, 16);
    nube(ctx, 52, 12);
    for (var i = 0; i < 22; i++) {
      var x = azar() * L;
      var y = 26 + azar() * 70;
      trazo(ctx, [[x, y], [x - 2, y + 7]], C.celeste, 1, azar);
    }
    trazo(ctx, [[10, 106], [86, 106]], C.celeste, 2, azar);
    ctx.strokeStyle = C.celeste;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.ellipse(48, 108, 18, 4, 0, 0, Math.PI * 2);
    ctx.stroke();
  };

  var fNoche = function (ctx, azar) {
    estrellitas(ctx, azar, 8);
    circulo(ctx, 72, 22, 9, C.amarillo);
    punto(ctx, 69, 20, C.naranja, 2);
    punto(ctx, 75, 25, C.naranja, 2);
    relleno(ctx, [[0, A], [0, 100], [26, 88], [56, 102], [96, 92], [96, A]], "#241a3a");
  };

  var cGato = function (ctx, azar) {
    relleno(ctx, [[26, 38], [70, 38], [70, 76], [26, 76]], C.gris, azar);
    trazo(ctx, [[26, 38], [70, 38], [70, 76], [26, 76], [26, 38]], C.negro, 2, azar);
    relleno(ctx, [[27, 39], [34, 20], [43, 39]], C.gris);
    trazo(ctx, [[27, 39], [34, 20], [43, 39]], C.negro, 2, azar);
    relleno(ctx, [[53, 39], [62, 20], [69, 39]], C.gris);
    trazo(ctx, [[53, 39], [62, 20], [69, 39]], C.negro, 2, azar);
    relleno(ctx, [[31, 36], [35, 26], [39, 36]], C.rosa);
    relleno(ctx, [[57, 36], [61, 26], [65, 36]], C.rosa);
    punto(ctx, 39, 52, C.negro, 3);
    punto(ctx, 56, 52, C.negro, 3);
    relleno(ctx, [[46, 58], [50, 58], [48, 61]], C.rosa);
    trazo(ctx, [[48, 61], [44, 65]], C.negro, 1.3, azar);
    trazo(ctx, [[48, 61], [52, 65]], C.negro, 1.3, azar);
    trazo(ctx, [[30, 58], [18, 56]], C.negro, 1, azar);
    trazo(ctx, [[30, 62], [18, 62]], C.negro, 1, azar);
    trazo(ctx, [[66, 58], [78, 56]], C.negro, 1, azar);
    trazo(ctx, [[66, 62], [78, 62]], C.negro, 1, azar);
  };

  var cPerro = function (ctx, azar) {
    relleno(ctx, [[28, 30], [68, 30], [68, 66], [28, 66]], C.marron, azar);
    trazo(ctx, [[28, 30], [68, 30], [68, 66], [28, 66], [28, 30]], C.negro, 2, azar);
    relleno(ctx, [[24, 32], [36, 36], [26, 54]], C.marron);
    relleno(ctx, [[72, 32], [60, 36], [70, 54]], C.marron);
    punto(ctx, 38, 42, C.negro, 3);
    punto(ctx, 58, 42, C.negro, 3);
    circulo(ctx, 48, 56, 8, C.blanco);
    circulo(ctx, 48, 52, 3, C.negro);
    trazo(ctx, [[43, 62], [48, 60], [53, 62]], C.negro, 1.2, azar);
    relleno(ctx, [[45, 64], [51, 64], [48, 74]], C.rojo);
  };

  var cRobot = function (ctx, azar) {
    trazo(ctx, [[48, 26], [48, 14]], C.negro, 2, azar);
    circulo(ctx, 48, 12, 3, C.rojo);
    relleno(ctx, [[28, 26], [68, 26], [68, 54], [28, 54]], C.gris, azar);
    trazo(ctx, [[28, 26], [68, 26], [68, 54], [28, 54], [28, 26]], C.negro, 2, azar);
    punto(ctx, 38, 36, C.amarillo, 4);
    punto(ctx, 58, 36, C.amarillo, 4);
    trazo(ctx, [[36, 47], [42, 47], [46, 44], [50, 47], [56, 47], [60, 44]], C.negro, 1.4, azar);
  };

  var cDino = function (ctx, azar) {
    relleno(ctx, [[22, 64], [22, 40], [36, 26], [60, 26], [74, 40], [74, 64]], C.verde, azar);
    trazo(ctx, [[22, 64], [22, 40], [36, 26], [60, 26], [74, 40], [74, 64]], C.negro, 2, azar);
    for (var e = 0; e < 3; e++) {
      relleno(ctx, [[30 + e * 12, 30], [36 + e * 12, 18], [42 + e * 12, 30]], C.amarillo);
    }
    circulo(ctx, 38, 44, 4, C.blanco);
    punto(ctx, 37, 44, C.negro, 2);
    circulo(ctx, 58, 44, 4, C.blanco);
    punto(ctx, 59, 44, C.negro, 2);
    trazo(ctx, [[40, 56], [48, 60], [56, 56]], C.negro, 1.4, azar);
    punto(ctx, 44, 52, C.negro, 2);
    punto(ctx, 52, 52, C.negro, 2);
  };

  var cUnicornio = function (ctx, azar) {
    var colores = [C.rojo, C.naranja, C.amarillo, C.verde, C.azul, C.morado];
    relleno(ctx, [[26, 64], [26, 44], [40, 30], [62, 32], [70, 48], [70, 64]], C.blanco, azar);
    trazo(ctx, [[26, 64], [26, 44], [40, 30], [62, 32], [70, 48], [70, 64]], C.negro, 2, azar);
    relleno(ctx, [[64, 36], [70, 12], [80, 34]], C.amarillo);
    trazo(ctx, [[64, 36], [70, 12], [80, 34]], C.negro, 1.6, azar);
    for (var m = 0; m < 5; m++) {
      trazo(ctx, [[30, 38 + m * 6], [15 - m, 36 + m * 6], [24, 46 + m * 6]], colores[m], 2.2, azar);
    }
    punto(ctx, 42, 44, C.negro, 3);
    trazo(ctx, [[60, 52], [66, 54]], C.negro, 1.2, azar);
    punto(ctx, 64, 59, C.rosa, 2);
  };

  var cPanda = function (ctx, azar) {
    circulo(ctx, 30, 34, 9, C.negro);
    circulo(ctx, 66, 34, 9, C.negro);
    circulo(ctx, 48, 52, 26, C.blanco);
    aro(ctx, 48, 52, 26, C.negro, 2, azar);
    ctx.fillStyle = C.negro;
    ctx.beginPath();
    ctx.ellipse(38, 48, 8, 10, 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(58, 48, 8, 10, -0.4, 0, Math.PI * 2);
    ctx.fill();
    circulo(ctx, 38, 48, 3, C.blanco);
    circulo(ctx, 58, 48, 3, C.blanco);
    punto(ctx, 38, 48, C.negro, 2);
    punto(ctx, 58, 48, C.negro, 2);
    relleno(ctx, [[45, 64], [51, 64], [48, 67]], C.negro);
    trazo(ctx, [[48, 67], [48, 70]], C.negro, 1.2, azar);
    trazo(ctx, [[44, 72], [48, 70], [52, 72]], C.negro, 1.2, azar);
  };

  var cAlien = function (ctx, azar) {
    relleno(ctx, [[24, 62], [22, 34], [36, 18], [60, 18], [74, 34], [72, 62]], "#9bff6b", azar);
    trazo(ctx, [[24, 62], [22, 34], [36, 18], [60, 18], [74, 34], [72, 62]], C.negro, 2, azar);
    ctx.fillStyle = C.negro;
    ctx.beginPath();
    ctx.ellipse(38, 42, 9, 12, 0.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(58, 42, 9, 12, -0.15, 0, Math.PI * 2);
    ctx.fill();
    punto(ctx, 36, 38, C.blanco, 2);
    punto(ctx, 56, 38, C.blanco, 2);
    trazo(ctx, [[42, 58], [48, 60], [54, 58]], C.negro, 1.2, azar);
    trazo(ctx, [[36, 18], [32, 8]], C.negro, 1.4, azar);
    circulo(ctx, 31, 7, 2.5, C.rojo);
    trazo(ctx, [[60, 18], [64, 8]], C.negro, 1.4, azar);
    circulo(ctx, 65, 7, 2.5, C.rojo);
  };

  var cMonstruo = function (ctx, azar) {
    var color = azar() < 0.5 ? C.morado : "#7ecb5f";
    relleno(ctx, [[22, 64], [22, 34], [48, 18], [74, 34], [74, 64]], color, azar);
    trazo(ctx, [[22, 64], [22, 34], [48, 18], [74, 34], [74, 64]], C.negro, 2, azar);
    for (var p = 0; p < 9; p++) {
      var x = 24 + p * 6;
      trazo(ctx, [[x, 38 - Math.abs(p - 4) * 3], [x + 1, 28 - Math.abs(p - 4) * 3]], C.negro, 1.3, azar);
    }
    relleno(ctx, [[26, 36], [18, 18], [36, 28]], color);
    trazo(ctx, [[26, 36], [18, 18], [36, 28]], C.negro, 1.6, azar);
    relleno(ctx, [[70, 36], [78, 18], [60, 28]], color);
    trazo(ctx, [[70, 36], [78, 18], [60, 28]], C.negro, 1.6, azar);
    circulo(ctx, 38, 44, 8, C.blanco);
    circulo(ctx, 38, 44, 3, C.negro);
    circulo(ctx, 60, 46, 5, C.blanco);
    circulo(ctx, 60, 46, 2, C.negro);
    relleno(ctx, [[34, 56], [62, 56], [58, 66], [38, 66]], C.negro);
    relleno(ctx, [[36, 56], [40, 56], [38, 62]], C.blanco);
    relleno(ctx, [[44, 56], [48, 56], [46, 62]], C.blanco);
    relleno(ctx, [[52, 56], [56, 56], [54, 62]], C.blanco);
  };

  var cSol = function (ctx, azar) {
    circulo(ctx, 48, 46, 24, C.amarillo);
    for (var r = 0; r < 10; r++) {
      var an = (r / 10) * Math.PI * 2;
      trazo(ctx, [[48 + Math.cos(an) * 28, 46 + Math.sin(an) * 28], [48 + Math.cos(an) * 38, 46 + Math.sin(an) * 38]], C.naranja, 2.4, azar);
    }
    cara(ctx, 48, 44, azar);
  };

  var cuerpoPatas = function (ctx, azar) {
    var color = azar() < 0.5 ? C.gris : C.marron;
    relleno(ctx, [[28, 62], [68, 62], [72, 96], [24, 96]], color, azar);
    trazo(ctx, [[28, 62], [68, 62], [72, 96], [24, 96], [28, 62]], C.negro, 2, azar);
    trazo(ctx, [[32, 96], [32, 112]], C.negro, 3, azar);
    trazo(ctx, [[44, 98], [44, 112]], C.negro, 3, azar);
    trazo(ctx, [[56, 96], [56, 112]], C.negro, 3, azar);
    trazo(ctx, [[66, 98], [66, 112]], C.negro, 3, azar);
    trazo(ctx, [[72, 76], [86, 66], [88, 54]], C.negro, 2, azar);
    circulo(ctx, 88, 52, 3, color);
  };

  var cuerpoTentaculos = function (ctx, azar) {
    relleno(ctx, [[20, 58], [76, 58], [76, 74], [20, 74]], C.morado, azar);
    trazo(ctx, [[20, 58], [76, 58], [76, 74], [20, 74], [20, 58]], C.negro, 2, azar);
    for (var t = 0; t < 6; t++) {
      var x0 = 24 + t * 10;
      trazo(ctx, [[x0, 74], [x0 - 4 + (t % 2) * 8, 86], [x0, 98], [x0 - 3 + (t % 2) * 6, 112]], C.morado, 4, azar);
      punto(ctx, x0 - 1 + (t % 2) * 5, 90, C.rosa, 2);
    }
  };

  var cuerpoCohete = function (ctx, azar) {
    relleno(ctx, [[30, 60], [66, 60], [66, 92], [30, 92]], C.blanco, azar);
    trazo(ctx, [[30, 60], [66, 60], [66, 92], [30, 92], [30, 60]], C.negro, 2, azar);
    relleno(ctx, [[30, 84], [22, 100], [30, 96]], C.rojo);
    relleno(ctx, [[66, 84], [74, 100], [66, 96]], C.rojo);
    relleno(ctx, [[38, 92], [58, 92], [48, 112]], C.naranja);
    relleno(ctx, [[42, 92], [54, 92], [48, 104]], C.amarillo);
    punto(ctx, 34, 66, C.gris, 2);
    punto(ctx, 62, 66, C.gris, 2);
  };

  var cuerpoCaparazon = function (ctx, azar) {
    ctx.fillStyle = C.verde;
    ctx.beginPath();
    ctx.arc(48, 74, 26, Math.PI, 0);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(22, 74, 52, 10);
    aro(ctx, 48, 74, 26, C.negro, 2, azar);
    trazo(ctx, [[22, 84], [74, 84]], C.negro, 1.8, azar);
    trazo(ctx, [[48, 50], [48, 84]], C.negro, 1.4, azar);
    trazo(ctx, [[26, 66], [70, 66]], C.negro, 1.4, azar);
    punto(ctx, 34, 60, C.amarillo, 3);
    punto(ctx, 60, 60, C.amarillo, 3);
    relleno(ctx, [[18, 84], [28, 84], [30, 100], [20, 100]], C.verde);
    relleno(ctx, [[62, 84], [72, 84], [74, 100], [64, 100]], C.verde);
  };

  var cuerpoVestido = function (ctx, azar) {
    var color = azar() < 0.5 ? C.rosa : C.morado;
    relleno(ctx, [[34, 62], [62, 62], [78, 108], [18, 108]], color, azar);
    trazo(ctx, [[34, 62], [62, 62], [78, 108], [18, 108], [34, 62]], C.negro, 2, azar);
    punto(ctx, 36, 78, C.blanco, 3);
    punto(ctx, 56, 84, C.blanco, 3);
    punto(ctx, 46, 96, C.blanco, 3);
    trazo(ctx, [[34, 68], [20, 80]], C.negro, 2, azar);
    trazo(ctx, [[62, 68], [76, 80]], C.negro, 2, azar);
  };

  var cuerpoRuedas = function (ctx, azar) {
    relleno(ctx, [[26, 62], [70, 62], [70, 92], [26, 92]], C.gris, azar);
    trazo(ctx, [[26, 62], [70, 62], [70, 92], [26, 92], [26, 62]], C.negro, 2, azar);
    circulo(ctx, 34, 98, 9, C.negro);
    circulo(ctx, 34, 98, 4, C.gris);
    circulo(ctx, 62, 98, 9, C.negro);
    circulo(ctx, 62, 98, 4, C.gris);
    for (var i = 0; i < 4; i++) {
      punto(ctx, 32 + i * 10, 68, C.amarillo, 2);
    }
  };

  var fNieve = function (ctx, azar) {
    relleno(ctx, [[0, A], [0, 96], [28, 84], [60, 98], [96, 88], [96, A]], "#eef6ff");
    circulo(ctx, 78, 20, 7, C.amarillo);
    for (var i = 0; i < 26; i++) {
      circulo(ctx, azar() * L, azar() * 70, 1 + azar(), "#ffffff");
    }
    trazo(ctx, [[10, 102], [86, 102]], "#c9d8e8", 1.4, azar);
  };

  var fDesierto = function (ctx, azar) {
    circulo(ctx, 18, 18, 8, C.amarillo);
    relleno(ctx, [[0, A], [0, 92], [30, 82], [58, 94], [96, 86], [96, A]], "#f2d59a");
    trazo(ctx, [[6, 100], [90, 100]], "#d9b26e", 1.6, azar);
    trazo(ctx, [[70, 100], [70, 78]], C.verde, 4, azar);
    trazo(ctx, [[70, 88], [64, 84]], C.verde, 3, azar);
    trazo(ctx, [[70, 84], [76, 78]], C.verde, 3, azar);
    punto(ctx, 70, 74, C.rojo, 3);
  };

  var fSelva = function (ctx, azar) {
    circulo(ctx, 82, 16, 6, C.amarillo);
    for (var i = 0; i < 6; i++) {
      var x = 4 + i * 16;
      trazo(ctx, [[x, A], [x + 2, 78]], C.verde, 3, azar);
      circulo(ctx, x + 2, 74, 8, i % 2 === 0 ? "#3fa34d" : C.verde);
    }
    trazo(ctx, [[0, 60], [20, 50], [40, 62], [60, 48], [80, 60], [96, 52]], "#2f7a3a", 2, azar);
    circulo(ctx, 18, 40, 2.5, C.rojo);
    circulo(ctx, 62, 38, 2.5, C.rosa);
  };

  var fCirco = function (ctx, azar) {
    relleno(ctx, [[10, 104], [10, 60], [48, 24], [86, 60], [86, 104]], "#ff4d4d", azar);
    trazo(ctx, [[10, 104], [10, 60], [48, 24], [86, 60], [86, 104]], C.negro, 2, azar);
    trazo(ctx, [[48, 24], [48, 8]], C.negro, 2, azar);
    relleno(ctx, [[48, 8], [64, 12], [48, 16]], C.amarillo);
    for (var i = 0; i < 3; i++) {
      trazo(ctx, [[27 + i * 21, 44 + i * 4], [27 + i * 21, 104]], C.amarillo, 2, azar);
    }
    ctx.fillStyle = C.negro;
    ctx.beginPath();
    ctx.arc(48, 104, 12, Math.PI, 0);
    ctx.closePath();
    ctx.fill();
  };

  var cElefante = function (ctx, azar) {
    circulo(ctx, 26, 40, 9, C.gris);
    circulo(ctx, 70, 40, 9, C.gris);
    relleno(ctx, [[20, 62], [20, 34], [48, 22], [76, 34], [76, 62]], C.gris, azar);
    trazo(ctx, [[20, 62], [20, 34], [48, 22], [76, 34], [76, 62]], C.negro, 2, azar);
    trazo(ctx, [[48, 54], [46, 66], [52, 76], [46, 84]], C.gris, 5, azar);
    punto(ctx, 38, 42, C.negro, 3);
    punto(ctx, 58, 42, C.negro, 3);
    trazo(ctx, [[40, 52], [44, 54]], C.negro, 1.2, azar);
    trazo(ctx, [[56, 52], [52, 54]], C.negro, 1.2, azar);
  };

  var cRana = function (ctx, azar) {
    circulo(ctx, 32, 30, 10, C.verde);
    circulo(ctx, 64, 30, 10, C.verde);
    aro(ctx, 32, 30, 10, C.negro, 2, azar);
    aro(ctx, 64, 30, 10, C.negro, 2, azar);
    circulo(ctx, 32, 30, 4, C.blanco);
    circulo(ctx, 64, 30, 4, C.blanco);
    punto(ctx, 32, 30, C.negro, 3);
    punto(ctx, 64, 30, C.negro, 3);
    relleno(ctx, [[20, 62], [20, 44], [48, 36], [76, 44], [76, 62]], C.verde, azar);
    trazo(ctx, [[20, 62], [20, 44], [48, 36], [76, 44], [76, 62]], C.negro, 2, azar);
    trazo(ctx, [[36, 54], [48, 60], [60, 54]], C.negro, 1.6, azar);
    punto(ctx, 42, 48, C.negro, 2);
    punto(ctx, 54, 48, C.negro, 2);
  };

  var cLeon = function (ctx, azar) {
    for (var i = 0; i < 10; i++) {
      var an = (i / 10) * Math.PI * 2;
      circulo(ctx, 48 + Math.cos(an) * 22, 44 + Math.sin(an) * 22, 7, "#c98a3a");
    }
    circulo(ctx, 48, 44, 20, C.amarillo);
    aro(ctx, 48, 44, 20, C.negro, 1.6, azar);
    punto(ctx, 40, 40, C.negro, 3);
    punto(ctx, 56, 40, C.negro, 3);
    relleno(ctx, [[44, 50], [52, 50], [48, 54]], C.negro);
    trazo(ctx, [[48, 54], [48, 58]], C.negro, 1.2, azar);
    trazo(ctx, [[42, 60], [48, 58], [54, 60]], C.negro, 1.2, azar);
  };

  var cBuho = function (ctx, azar) {
    relleno(ctx, [[22, 64], [22, 34], [48, 16], [74, 34], [74, 64]], C.marron, azar);
    trazo(ctx, [[22, 64], [22, 34], [48, 16], [74, 34], [74, 64]], C.negro, 2, azar);
    circulo(ctx, 36, 42, 10, C.blanco);
    circulo(ctx, 60, 42, 10, C.blanco);
    aro(ctx, 36, 42, 10, C.negro, 1.4, azar);
    aro(ctx, 60, 42, 10, C.negro, 1.4, azar);
    punto(ctx, 36, 42, C.negro, 4);
    punto(ctx, 60, 42, C.negro, 4);
    relleno(ctx, [[44, 48], [52, 48], [48, 56]], C.naranja);
    relleno(ctx, [[22, 30], [16, 18], [30, 24]], C.marron);
    relleno(ctx, [[74, 30], [80, 18], [66, 24]], C.marron);
  };

  var cConejo = function (ctx, azar) {
    relleno(ctx, [[30, 22], [26, 2], [38, 14]], C.gris);
    trazo(ctx, [[30, 22], [26, 2], [38, 14]], C.negro, 1.6, azar);
    relleno(ctx, [[66, 22], [70, 2], [58, 14]], C.gris);
    trazo(ctx, [[66, 22], [70, 2], [58, 14]], C.negro, 1.6, azar);
    relleno(ctx, [[33, 20], [30, 8], [37, 15]], C.rosa);
    relleno(ctx, [[63, 20], [66, 8], [59, 15]], C.rosa);
    circulo(ctx, 48, 48, 24, C.gris);
    aro(ctx, 48, 48, 24, C.negro, 2, azar);
    punto(ctx, 40, 44, C.negro, 3);
    punto(ctx, 56, 44, C.negro, 3);
    relleno(ctx, [[45, 52], [51, 52], [48, 55]], C.rosa);
    trazo(ctx, [[48, 55], [48, 58]], C.negro, 1.2, azar);
    trazo(ctx, [[43, 60], [48, 58], [53, 60]], C.negro, 1.2, azar);
    trazo(ctx, [[30, 50], [20, 48]], C.negro, 1, azar);
    trazo(ctx, [[66, 50], [76, 48]], C.negro, 1, azar);
  };

  var cPinguino = function (ctx, azar) {
    circulo(ctx, 48, 44, 24, C.negro);
    relleno(ctx, [[32, 44], [64, 44], [60, 66], [36, 66]], C.blanco);
    circulo(ctx, 40, 38, 4, C.blanco);
    circulo(ctx, 56, 38, 4, C.blanco);
    punto(ctx, 40, 38, C.negro, 2);
    punto(ctx, 56, 38, C.negro, 2);
    relleno(ctx, [[44, 46], [52, 46], [48, 54]], C.naranja);
    trazo(ctx, [[48, 54], [44, 60], [52, 60], [48, 54]], C.negro, 1.2, azar);
    relleno(ctx, [[22, 42], [16, 62], [26, 58]], C.negro);
    relleno(ctx, [[74, 42], [80, 62], [70, 58]], C.negro);
  };

  var cuerpoGlobo = function (ctx, azar) {
    var color = azar() < 0.5 ? C.rojo : C.morado;
    circulo(ctx, 48, 56, 20, color);
    trazo(ctx, [[48, 76], [48, 86]], C.negro, 1.4, azar);
    relleno(ctx, [[38, 92], [58, 92], [64, 108], [32, 108]], C.marron, azar);
    trazo(ctx, [[38, 92], [58, 92], [64, 108], [32, 108], [38, 92]], C.negro, 2, azar);
    trazo(ctx, [[38, 92], [48, 86], [58, 92]], C.negro, 1.4, azar);
    trazo(ctx, [[40, 100], [56, 100]], C.negro, 1.2, azar);
  };

  var cuerpoAraña = function (ctx, azar) {
    for (var i = 0; i < 4; i++) {
      var off = i * 5;
      trazo(ctx, [[34 - off * 0.3, 70 + i * 4], [10 + i * 4, 60 + i * 8], [4 + i * 5, 80 + i * 6]], C.negro, 2.4, azar);
      trazo(ctx, [[62 + off * 0.3, 70 + i * 4], [86 - i * 4, 60 + i * 8], [92 - i * 5, 80 + i * 6]], C.negro, 2.4, azar);
    }
    circulo(ctx, 48, 76, 16, C.negro);
    circulo(ctx, 42, 72, 3, C.rojo);
    circulo(ctx, 54, 72, 3, C.rojo);
    trazo(ctx, [[42, 82], [48, 86], [54, 82]], C.rojo, 1.6, azar);
  };

  var cuerpoNube = function (ctx, azar) {
    nube(ctx, 16, 66);
    nube(ctx, 46, 72);
    nube(ctx, 30, 58);
    relleno(ctx, [[14, 66], [78, 66], [78, 84], [14, 84]], C.nube);
  };

  var cuerpoCapa = function (ctx, azar) {
    var color = azar() < 0.5 ? C.rojo : C.azul;
    relleno(ctx, [[30, 62], [66, 62], [82, 104], [14, 104]], color, azar);
    trazo(ctx, [[30, 62], [66, 62], [82, 104], [14, 104], [30, 62]], C.negro, 2, azar);
    trazo(ctx, [[36, 70], [20, 86]], C.negro, 2, azar);
    trazo(ctx, [[60, 70], [76, 86]], C.negro, 2, azar);
    relleno(ctx, [[36, 62], [60, 62], [56, 74], [40, 74]], C.amarillo);
  };

  var dEstrella = function (ctx, azar) {
    estrellitas(ctx, azar, 6);
    relleno(ctx, [[48, 24], [56, 46], [80, 46], [61, 61], [68, 84], [48, 70], [28, 84], [35, 61], [16, 46], [40, 46]], C.amarillo, azar);
    trazo(ctx, [[48, 24], [56, 46], [80, 46], [61, 61], [68, 84], [48, 70], [28, 84], [35, 61], [16, 46], [40, 46], [48, 24]], C.negro, 2, azar);
    cara(ctx, 48, 54, azar);
  };

  var dLuna = function (ctx, azar) {
    estrellitas(ctx, azar, 7);
    circulo(ctx, 44, 50, 28, C.amarillo);
    punto(ctx, 36, 40, C.naranja, 3);
    punto(ctx, 52, 56, C.naranja, 4);
    punto(ctx, 44, 68, C.naranja, 3);
    cara(ctx, 44, 50, azar);
    nube(ctx, 4, 92);
  };

  var dArcoiris = function (ctx, azar) {
    var colores = [C.rojo, C.naranja, C.amarillo, C.verde, C.azul, C.morado];
    for (var i = 0; i < 6; i++) {
      ctx.strokeStyle = colores[i];
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(48, 104, 48 - i * 5, Math.PI, Math.PI * 2);
      ctx.stroke();
    }
    nube(ctx, 6, 98);
    nube(ctx, 66, 100);
    estrellitas(ctx, azar, 3);
    trazo(ctx, [[24, 30], [28, 27], [32, 30]], C.negro, 1.2, azar);
    trazo(ctx, [[58, 24], [62, 21], [66, 24]], C.negro, 1.2, azar);
  };

  var dTarta = function (ctx, azar) {
    estrellitas(ctx, azar, 3);
    relleno(ctx, [[20, 70], [76, 70], [76, 104], [20, 104]], C.rosa, azar);
    trazo(ctx, [[20, 70], [76, 70], [76, 104], [20, 104], [20, 70]], C.negro, 2, azar);
    trazo(ctx, [[20, 84], [76, 84]], C.negro, 1.6, azar);
    for (var i = 0; i < 3; i++) {
      var x = 32 + i * 16;
      trazo(ctx, [[x, 70], [x, 52]], C.celeste, 3, azar);
      trazo(ctx, [[x - 2, 52], [x + 2, 52]], C.negro, 1.6, azar);
      circulo(ctx, x, 48, 2.5, C.amarillo);
    }
    circulo(ctx, 48, 64, 4, C.rojo);
    circulo(ctx, 38, 66, 3, C.rojo);
  };

  var dBarco = function (ctx, azar) {
    circulo(ctx, 76, 16, 7, C.amarillo);
    for (var y = 88; y < A; y += 10) {
      trazo(ctx, [[4, y], [24, y - 2], [48, y], [72, y - 2], [92, y]], C.celeste, 1.4, azar);
    }
    relleno(ctx, [[20, 78], [76, 78], [66, 96], [30, 96]], C.rojo, azar);
    trazo(ctx, [[20, 78], [76, 78], [66, 96], [30, 96], [20, 78]], C.negro, 2, azar);
    trazo(ctx, [[48, 78], [48, 40]], C.marron, 3, azar);
    relleno(ctx, [[48, 42], [48, 64], [28, 58]], C.blanco);
    trazo(ctx, [[48, 42], [48, 64], [28, 58], [48, 42]], C.negro, 1.4, azar);
    relleno(ctx, [[48, 46], [48, 62], [66, 56]], C.azul);
    trazo(ctx, [[48, 46], [48, 62], [66, 56], [48, 46]], C.negro, 1.4, azar);
  };

  var dMolino = function (ctx, azar) {
    trazo(ctx, [[6, 106], [90, 106]], C.verde, 3, azar);
    relleno(ctx, [[34, 58], [62, 58], [66, 106], [30, 106]], C.blanco, azar);
    trazo(ctx, [[34, 58], [62, 58], [66, 106], [30, 106], [34, 58]], C.negro, 2, azar);
    relleno(ctx, [[28, 58], [48, 34], [68, 58]], C.rojo, azar);
    trazo(ctx, [[28, 58], [48, 34], [68, 58]], C.negro, 2, azar);
    for (var i = 0; i < 4; i++) {
      var an = (i / 4) * Math.PI * 2 + 0.4;
      var bx = 48 + Math.cos(an) * 20;
      var by = 46 + Math.sin(an) * 20;
      trazo(ctx, [[48, 46], [bx, by]], C.marron, 3, azar);
      relleno(ctx, [[bx - 5, by - 5], [bx + 5, by - 5], [bx + 5, by + 5], [bx - 5, by + 5]], C.amarillo);
    }
    circulo(ctx, 48, 46, 4, C.negro);
    circulo(ctx, 14, 16, 6, C.amarillo);
  };

  var fPlaya = function (ctx, azar) {
    circulo(ctx, 80, 16, 7, C.amarillo);
    relleno(ctx, [[0, 86], [96, 86], [96, A], [0, A]], "#7fd4ff");
    for (var y = 90; y < A; y += 9) {
      trazo(ctx, [[6, y], [28, y - 2], [52, y], [76, y - 2], [92, y]], "#e8f2ff", 1.2, azar);
    }
    relleno(ctx, [[0, 86], [40, 82], [96, 86], [96, 92], [0, 92]], "#f2d59a");
    trazo(ctx, [[12, 84], [12, 62]], C.marron, 4, azar);
    for (var h = 0; h < 5; h++) {
      var an = -Math.PI / 2 + (h - 2) * 0.5;
      trazo(ctx, [[12, 62], [12 + Math.cos(an) * 16, 62 + Math.sin(an) * 16]], C.verde, 3, azar);
    }
    trazo(ctx, [[22, 30], [26, 27], [30, 30]], C.negro, 1.2, azar);
  };

  var fParque = function (ctx, azar) {
    circulo(ctx, 14, 16, 6, C.amarillo);
    trazo(ctx, [[4, 104], [92, 104]], C.verde, 3, azar);
    trazo(ctx, [[18, 104], [18, 76]], C.marron, 4, azar);
    circulo(ctx, 18, 68, 12, C.verde);
    trazo(ctx, [[56, 104], [60, 62]], C.gris, 3, azar);
    trazo(ctx, [[86, 104], [82, 62]], C.gris, 3, azar);
    trazo(ctx, [[58, 64], [84, 64]], C.gris, 3, azar);
    trazo(ctx, [[64, 64], [64, 84]], C.negro, 1.2, azar);
    trazo(ctx, [[72, 64], [72, 84]], C.negro, 1.2, azar);
    relleno(ctx, [[62, 84], [74, 84], [74, 88], [62, 88]], C.marron);
    for (var i = 0; i < 4; i++) {
      var x = 10 + i * 22 + azar() * 5;
      trazo(ctx, [[x, 104], [x, 99]], C.verde, 1.4, azar);
      circulo(ctx, x, 97, 3, azar() < 0.5 ? C.rojo : C.amarillo);
    }
  };

  var fCole = function (ctx, azar) {
    relleno(ctx, [[6, 14], [90, 14], [90, 84], [6, 84]], "#2f4f3f", azar);
    trazo(ctx, [[6, 14], [90, 14], [90, 84], [6, 84], [6, 14]], C.marron, 4, azar);
    trazo(ctx, [[14, 30], [40, 30]], "#e8f2ff", 1.6, azar);
    trazo(ctx, [[14, 42], [58, 42]], "#e8f2ff", 1.6, azar);
    trazo(ctx, [[14, 54], [34, 54]], "#e8f2ff", 1.6, azar);
    circulo(ctx, 74, 36, 6, "#e8f2ff");
    trazo(ctx, [[68, 62], [80, 68]], "#e8f2ff", 1.4, azar);
    trazo(ctx, [[6, 88], [90, 88]], C.marron, 4, azar);
    punto(ctx, 30, 86, C.rojo, 3);
    punto(ctx, 38, 86, C.amarillo, 3);
    punto(ctx, 46, 86, "#e8f2ff", 3);
  };

  var fCueva = function (ctx, azar) {
    relleno(ctx, [[0, A], [0, 20], [96, 20], [96, A]], "#241a2e");
    for (var i = 0; i < 6; i++) {
      var x = 6 + i * 16 + azar() * 6;
      relleno(ctx, [[x, 20], [x + 4, 20], [x + 2, 20 + 8 + azar() * 10]], "#3a2a44");
    }
    relleno(ctx, [[0, A], [0, 96], [30, 88], [60, 100], [96, 90], [96, A]], "#4a3752");
    circulo(ctx, 70, 60, 3, C.amarillo);
    circulo(ctx, 30, 70, 2, C.celeste);
    circulo(ctx, 50, 50, 2, C.celeste);
  };

  var cLobo = function (ctx, azar) {
    relleno(ctx, [[26, 24], [18, 6], [40, 18]], C.gris);
    relleno(ctx, [[70, 24], [78, 6], [56, 18]], C.gris);
    circulo(ctx, 48, 44, 22, C.gris);
    aro(ctx, 48, 44, 22, C.negro, 2, azar);
    relleno(ctx, [[36, 50], [60, 50], [56, 64], [40, 64]], "#d9d9e8");
    trazo(ctx, [[36, 50], [60, 50], [56, 64], [40, 64], [36, 50]], C.negro, 1.4, azar);
    punto(ctx, 40, 42, C.negro, 3);
    punto(ctx, 56, 42, C.negro, 3);
    circulo(ctx, 48, 56, 3.5, C.negro);
    for (var d = 0; d < 3; d++) {
      relleno(ctx, [[42 + d * 5, 64], [45 + d * 5, 64], [43 + d * 5, 68]], C.blanco);
    }
  };

  var cOso = function (ctx, azar) {
    circulo(ctx, 28, 28, 9, C.marron);
    circulo(ctx, 68, 28, 9, C.marron);
    circulo(ctx, 48, 46, 23, C.marron);
    aro(ctx, 48, 46, 23, C.negro, 2, azar);
    circulo(ctx, 28, 28, 4, "#8a5a2b");
    circulo(ctx, 68, 28, 4, "#8a5a2b");
    relleno(ctx, [[38, 52], [58, 52], [56, 64], [40, 64]], "#e8c9a0");
    trazo(ctx, [[38, 52], [58, 52], [56, 64], [40, 64], [38, 52]], C.negro, 1.4, azar);
    punto(ctx, 40, 42, C.negro, 3);
    punto(ctx, 56, 42, C.negro, 3);
    circulo(ctx, 48, 56, 3.5, C.negro);
    trazo(ctx, [[44, 61], [48, 64], [52, 61]], C.negro, 1.2, azar);
  };

  var cCerdo = function (ctx, azar) {
    relleno(ctx, [[24, 30], [36, 20], [40, 30]], C.rosa);
    relleno(ctx, [[56, 30], [60, 20], [72, 30]], C.rosa);
    circulo(ctx, 48, 46, 23, C.rosa);
    aro(ctx, 48, 46, 23, C.negro, 2, azar);
    ctx.fillStyle = "#e88aa5";
    ctx.beginPath();
    ctx.ellipse(48, 58, 10, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    aro(ctx, 48, 58, 10, C.negro, 1.4, azar);
    punto(ctx, 44, 58, C.negro, 3);
    punto(ctx, 52, 58, C.negro, 3);
    punto(ctx, 40, 40, C.negro, 3);
    punto(ctx, 56, 40, C.negro, 3);
  };

  var cGallina = function (ctx, azar) {
    circulo(ctx, 48, 46, 21, C.blanco);
    aro(ctx, 48, 46, 21, C.negro, 2, azar);
    relleno(ctx, [[40, 28], [44, 18], [48, 28]], C.rojo);
    relleno(ctx, [[48, 28], [52, 18], [56, 28]], C.rojo);
    relleno(ctx, [[58, 52], [66, 56], [58, 60]], C.naranja);
    punto(ctx, 40, 44, C.negro, 3);
    punto(ctx, 56, 44, C.negro, 3);
    relleno(ctx, [[44, 66], [52, 66], [48, 74]], C.rojo);
    trazo(ctx, [[30, 30], [26, 22]], C.negro, 1.4, azar);
  };

  var cPato = function (ctx, azar) {
    circulo(ctx, 48, 46, 21, C.amarillo);
    aro(ctx, 48, 46, 21, C.negro, 2, azar);
    ctx.fillStyle = C.naranja;
    ctx.beginPath();
    ctx.ellipse(48, 60, 12, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    trazo(ctx, [[36, 60], [60, 60]], C.negro, 1.3, azar);
    punto(ctx, 40, 40, C.negro, 3);
    punto(ctx, 56, 40, C.negro, 3);
  };

  var cRaton = function (ctx, azar) {
    circulo(ctx, 26, 26, 11, C.gris);
    circulo(ctx, 70, 26, 11, C.gris);
    aro(ctx, 26, 26, 11, C.negro, 1.6, azar);
    aro(ctx, 70, 26, 11, C.negro, 1.6, azar);
    circulo(ctx, 26, 26, 5, C.rosa);
    circulo(ctx, 70, 26, 5, C.rosa);
    circulo(ctx, 48, 50, 20, C.gris);
    aro(ctx, 48, 50, 20, C.negro, 2, azar);
    punto(ctx, 40, 46, C.negro, 3);
    punto(ctx, 56, 46, C.negro, 3);
    circulo(ctx, 48, 58, 3, C.rosa);
    trazo(ctx, [[28, 54], [16, 52]], C.negro, 1, azar);
    trazo(ctx, [[28, 58], [16, 60]], C.negro, 1, azar);
    trazo(ctx, [[68, 54], [80, 52]], C.negro, 1, azar);
    trazo(ctx, [[68, 58], [80, 60]], C.negro, 1, azar);
  };

  var cErizo = function (ctx, azar) {
    for (var i = 0; i < 14; i++) {
      var a = Math.PI + (i / 13) * Math.PI;
      var x = 48 + Math.cos(a) * 22;
      var y = 52 + Math.sin(a) * 20;
      trazo(ctx, [[x, y], [x + Math.cos(a) * 8, y + Math.sin(a) * 8]], "#6a4a2a", 2, azar);
    }
    circulo(ctx, 48, 54, 20, "#b98a5a");
    aro(ctx, 48, 54, 20, C.negro, 2, azar);
    punto(ctx, 42, 50, C.negro, 3);
    punto(ctx, 54, 50, C.negro, 3);
    circulo(ctx, 48, 60, 3, C.negro);
  };

  var cSerpiente = function (ctx, azar) {
    relleno(ctx, [[30, 40], [30, 26], [42, 20], [58, 22], [70, 32], [72, 46], [64, 56], [52, 60], [40, 56], [34, 48]], C.verde);
    trazo(ctx, [[30, 40], [30, 26], [42, 20], [58, 22], [70, 32], [72, 46], [64, 56], [52, 60], [40, 56], [34, 48], [30, 40]], C.negro, 2, azar);
    circulo(ctx, 42, 34, 4, C.blanco);
    circulo(ctx, 58, 34, 4, C.blanco);
    punto(ctx, 42, 34, C.negro, 3);
    punto(ctx, 58, 34, C.negro, 3);
    trazo(ctx, [[48, 58], [48, 68], [42, 72]], C.rojo, 2, azar);
  };

  var cTiburon = function (ctx, azar) {
    relleno(ctx, [[22, 62], [30, 34], [50, 26], [70, 34], [76, 54], [64, 70], [36, 72]], "#7fa8c9");
    trazo(ctx, [[22, 62], [30, 34], [50, 26], [70, 34], [76, 54], [64, 70], [36, 72], [22, 62]], C.negro, 2, azar);
    relleno(ctx, [[58, 40], [76, 46], [60, 50]], "#7fa8c9");
    circulo(ctx, 40, 44, 3.5, C.blanco);
    punto(ctx, 40, 44, C.negro, 3);
    for (var d = 0; d < 4; d++) {
      relleno(ctx, [[34 + d * 8, 66], [38 + d * 8, 66], [36 + d * 8, 71]], C.blanco);
    }
    for (var g = 0; g < 3; g++) {
      trazo(ctx, [[52 + g * 4, 56], [52 + g * 4, 62]], C.negro, 1, azar);
    }
  };

  var cMedusa = function (ctx, azar) {
    ctx.fillStyle = C.morado;
    ctx.beginPath();
    ctx.arc(48, 48, 22, Math.PI, 0);
    ctx.closePath();
    ctx.fill();
    aro(ctx, 48, 48, 22, C.negro, 2, azar);
    trazo(ctx, [[26, 48], [70, 48]], C.negro, 1.6, azar);
    circulo(ctx, 40, 42, 4, C.blanco);
    circulo(ctx, 56, 42, 4, C.blanco);
    punto(ctx, 40, 42, C.negro, 3);
    punto(ctx, 56, 42, C.negro, 3);
    for (var t = 0; t < 5; t++) {
      trazo(ctx, [[30 + t * 9, 64], [28 + t * 9, 74], [32 + t * 9, 82]], C.morado, 2.4, azar);
    }
  };

  var cuerpoPez = function (ctx, azar) {
    ctx.fillStyle = C.naranja;
    ctx.beginPath();
    ctx.ellipse(48, 78, 24, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    aro(ctx, 48, 78, 24, C.negro, 2, azar);
    relleno(ctx, [[70, 78], [86, 64], [86, 92]], C.rojo);
    for (var i = 0; i < 3; i++) {
      trazo(ctx, [[34 + i * 10, 68], [38 + i * 10, 78], [34 + i * 10, 88]], C.negro, 1, azar);
    }
  };

  var cuerpoSerpiente = function (ctx, azar) {
    trazo(ctx, [[24, 108], [34, 92], [50, 104], [66, 90], [74, 104], [62, 112]], C.verde, 7, azar);
    circulo(ctx, 24, 108, 5, C.verde);
  };

  var cuerpoTren = function (ctx, azar) {
    relleno(ctx, [[22, 64], [74, 64], [74, 92], [22, 92]], C.azul, azar);
    trazo(ctx, [[22, 64], [74, 64], [74, 92], [22, 92], [22, 64]], C.negro, 2, azar);
    relleno(ctx, [[58, 50], [70, 50], [70, 64], [58, 64]], C.negro);
    circulo(ctx, 32, 96, 8, C.negro);
    circulo(ctx, 32, 96, 3.5, C.gris);
    circulo(ctx, 62, 96, 8, C.negro);
    circulo(ctx, 62, 96, 3.5, C.gris);
    trazo(ctx, [[40, 72], [56, 72]], C.celeste, 2, azar);
  };

  var cuerpoBarco = function (ctx, azar) {
    relleno(ctx, [[18, 80], [78, 80], [66, 104], [30, 104]], C.marron, azar);
    trazo(ctx, [[18, 80], [78, 80], [66, 104], [30, 104], [18, 80]], C.negro, 2, azar);
    trazo(ctx, [[48, 80], [48, 46]], C.marron, 3, azar);
    relleno(ctx, [[48, 48], [48, 72], [26, 66]], C.blanco);
    trazo(ctx, [[48, 48], [48, 72], [26, 66], [48, 48]], C.negro, 1.4, azar);
  };

  var cuerpoOlla = function (ctx, azar) {
    relleno(ctx, [[20, 68], [76, 68], [72, 104], [24, 104]], C.gris, azar);
    trazo(ctx, [[20, 68], [76, 68], [72, 104], [24, 104], [20, 68]], C.negro, 2, azar);
    trazo(ctx, [[20, 74], [12, 74]], C.negro, 3, azar);
    trazo(ctx, [[76, 74], [84, 74]], C.negro, 3, azar);
    relleno(ctx, [[42, 62], [54, 62], [56, 70], [40, 70]], C.gris);
    circulo(ctx, 48, 58, 4, C.negro);
  };

  var cuerpoCactus = function (ctx, azar) {
    relleno(ctx, [[34, 92], [62, 92], [58, 108], [38, 108]], C.marron, azar);
    trazo(ctx, [[34, 92], [62, 92]], C.negro, 2, azar);
    relleno(ctx, [[42, 48], [54, 48], [54, 94], [42, 94]], C.verde, azar);
    relleno(ctx, [[28, 58], [42, 58], [42, 66], [28, 66]], C.verde);
    relleno(ctx, [[54, 50], [68, 50], [68, 58], [54, 58]], C.verde);
    trazo(ctx, [[42, 48], [54, 48], [54, 94], [42, 94], [42, 48]], C.negro, 1.6, azar);
    for (var e = 0; e < 5; e++) {
      punto(ctx, 44 + (e % 2) * 8, 54 + e * 8, C.amarillo, 2);
    }
  };

  var FONDOS = [fEspacio, fPradera, fMar, fCiudad, fLluvia, fNoche, fNieve, fDesierto, fSelva, fCirco, fPlaya, fParque, fCole, fCueva];

  var FONDOS_CLAVES = [
    { f: fEspacio, claves: ["espacio", "galaxia"] },
    { f: fPradera, claves: ["pradera", "campo"] },
    { f: fMar, claves: ["mar", "olas"] },
    { f: fCiudad, claves: ["ciudad", "edificios"] },
    { f: fLluvia, claves: ["lluvia", "tormenta"] },
    { f: fNoche, claves: ["noche", "nocturno"] },
    { f: fNieve, claves: ["nieve", "invierno"] },
    { f: fDesierto, claves: ["desierto"] },
    { f: fSelva, claves: ["selva", "jungla", "bosque"] },
    { f: fCirco, claves: ["circo"] },
    { f: fPlaya, claves: ["playa", "isla"] },
    { f: fParque, claves: ["parque"] },
    { f: fCole, claves: ["cole", "colegio", "pizarra", "clase"] },
    { f: fCueva, claves: ["cueva", "caverna"] }
  ];
  var cNiña = function (ctx, azar) {
    var pelo = azar() < 0.5 ? "#f2b134" : "#8b5a2b";
    circulo(ctx, 48, 44, 22, "#ffd9b3");
    relleno(ctx, [[26, 44], [26, 20], [48, 12], [70, 20], [70, 44]], pelo, azar);
    trazo(ctx, [[26, 34], [20, 66], [26, 78]], pelo, 4, azar);
    trazo(ctx, [[70, 34], [76, 66], [70, 78]], pelo, 4, azar);
    aro(ctx, 48, 44, 22, C.negro, 2, azar);
    punto(ctx, 40, 44, C.negro, 3);
    punto(ctx, 56, 44, C.negro, 3);
    trazo(ctx, [[42, 54], [48, 57], [54, 54]], C.negro, 1.4, azar);
    circulo(ctx, 28, 24, 3, C.rojo);
    circulo(ctx, 68, 24, 3, C.rojo);
    punto(ctx, 44, 51, C.rosa, 2);
    punto(ctx, 52, 51, C.rosa, 2);
  };

  var cNiño = function (ctx, azar) {
    var pelo = azar() < 0.5 ? "#5a3921" : "#2e2e2e";
    circulo(ctx, 48, 44, 22, "#ffd9b3");
    aro(ctx, 48, 44, 22, C.negro, 2, azar);
    for (var i = 0; i < 7; i++) {
      trazo(ctx, [[30 + i * 6, 28 - (i % 2) * 4], [32 + i * 6, 18 - (i % 2) * 3]], pelo, 3, azar);
    }
    punto(ctx, 40, 44, C.negro, 3);
    punto(ctx, 56, 44, C.negro, 3);
    trazo(ctx, [[42, 54], [48, 57], [54, 54]], C.negro, 1.4, azar);
  };

  var cPrincesa = function (ctx, azar) {
    circulo(ctx, 48, 46, 22, "#ffd9b3");
    relleno(ctx, [[24, 48], [22, 16], [48, 8], [74, 16], [72, 48]], "#f2b134", azar);
    trazo(ctx, [[24, 34], [14, 70], [22, 86]], "#f2b134", 5, azar);
    trazo(ctx, [[72, 34], [82, 70], [74, 86]], "#f2b134", 5, azar);
    aro(ctx, 48, 46, 22, C.negro, 2, azar);
    punto(ctx, 40, 46, C.negro, 3);
    punto(ctx, 56, 46, C.negro, 3);
    trazo(ctx, [[42, 56], [48, 59], [54, 56]], C.negro, 1.4, azar);
    circulo(ctx, 30, 30, 2.5, C.rojo);
    circulo(ctx, 66, 30, 2.5, C.rojo);
    relleno(ctx, [[38, 14], [58, 14], [54, 4], [48, 10], [42, 4]], C.amarillo);
    punto(ctx, 48, 8, C.rojo, 2);
  };

  var cPirata = function (ctx, azar) {
    circulo(ctx, 48, 46, 22, "#e8b98a");
    aro(ctx, 48, 46, 22, C.negro, 2, azar);
    relleno(ctx, [[26, 32], [70, 32], [70, 20], [26, 20]], C.rojo, azar);
    trazo(ctx, [[26, 20], [70, 20]], C.negro, 1.6, azar);
    punto(ctx, 48, 26, C.blanco, 3);
    punto(ctx, 55, 27, C.blanco, 3);
    ctx.fillStyle = C.negro;
    ctx.fillRect(33, 42, 10, 8);
    trazo(ctx, [[28, 38], [70, 34]], C.negro, 1.2, azar);
    punto(ctx, 58, 44, C.negro, 3);
    trazo(ctx, [[40, 54], [48, 56], [56, 54]], C.negro, 2, azar);
    for (var i = 0; i < 4; i++) {
      trazo(ctx, [[38 + i * 7, 60], [38 + i * 7, 66]], C.negro, 1.6, azar);
    }
  };

  var cBruja = function (ctx, azar) {
    circulo(ctx, 48, 48, 20, "#9bff6b");
    aro(ctx, 48, 48, 20, C.negro, 2, azar);
    relleno(ctx, [[36, 30], [60, 30], [58, 4], [40, 4]], C.morado, azar);
    trazo(ctx, [[20, 30], [76, 30]], C.negro, 3, azar);
    trazo(ctx, [[32, 30], [64, 30]], C.negro, 1.6, azar);
    relleno(ctx, [[48, 48], [60, 52], [48, 58]], "#9bff6b");
    trazo(ctx, [[48, 48], [60, 52], [48, 58]], C.negro, 1.4, azar);
    punto(ctx, 40, 44, C.negro, 3);
    punto(ctx, 56, 44, C.negro, 3);
    punto(ctx, 62, 40, C.negro, 3);
    trazo(ctx, [[42, 62], [48, 64], [54, 62]], C.negro, 1.4, azar);
  };

  var cFantasma = function (ctx, azar) {
    relleno(ctx, [[24, 66], [24, 30], [48, 12], [72, 30], [72, 66]], "#f0f0f8", azar);
    trazo(ctx, [[24, 66], [24, 30], [48, 12], [72, 30], [72, 66]], C.negro, 2, azar);
    trazo(ctx, [[24, 66], [30, 74], [36, 66], [42, 74], [48, 66], [54, 74], [60, 66], [66, 74], [72, 66]], C.negro, 1.6, azar);
    circulo(ctx, 40, 42, 5, C.negro);
    circulo(ctx, 56, 42, 5, C.negro);
    ctx.fillStyle = C.negro;
    ctx.beginPath();
    ctx.ellipse(48, 54, 5, 6, 0, 0, Math.PI * 2);
    ctx.fill();
  };

  var cDragon = function (ctx, azar) {
    var color = azar() < 0.5 ? C.verde : C.morado;
    relleno(ctx, [[22, 60], [24, 30], [46, 16], [70, 28], [74, 60]], color, azar);
    trazo(ctx, [[22, 60], [24, 30], [46, 16], [70, 28], [74, 60]], C.negro, 2, azar);
    relleno(ctx, [[28, 24], [22, 6], [38, 18]], C.amarillo);
    relleno(ctx, [[66, 22], [76, 6], [60, 16]], C.amarillo);
    relleno(ctx, [[30, 50], [66, 50], [62, 62], [34, 62]], color);
    trazo(ctx, [[30, 50], [66, 50], [62, 62], [34, 62]], C.negro, 1.6, azar);
    for (var d = 0; d < 3; d++) {
      relleno(ctx, [[36 + d * 9, 62], [40 + d * 9, 62], [38 + d * 9, 68]], C.blanco);
    }
    circulo(ctx, 38, 38, 4, C.blanco);
    circulo(ctx, 58, 38, 4, C.blanco);
    punto(ctx, 38, 38, C.negro, 3);
    punto(ctx, 58, 38, C.negro, 3);
    punto(ctx, 44, 56, C.negro, 2);
    punto(ctx, 52, 56, C.negro, 2);
  };

  var cVaca = function (ctx, azar) {
    circulo(ctx, 24, 36, 8, "#d9d9e8");
    circulo(ctx, 72, 36, 8, "#d9d9e8");
    relleno(ctx, [[24, 62], [24, 34], [48, 22], [72, 34], [72, 62]], "#f0f0f8", azar);
    trazo(ctx, [[24, 62], [24, 34], [48, 22], [72, 34], [72, 62]], C.negro, 2, azar);
    circulo(ctx, 36, 36, 6, C.negro);
    relleno(ctx, [[36, 48], [60, 48], [60, 60], [36, 60]], C.rosa);
    trazo(ctx, [[36, 48], [60, 48], [60, 60], [36, 60]], C.negro, 1.4, azar);
    punto(ctx, 42, 53, C.negro, 3);
    punto(ctx, 54, 53, C.negro, 3);
    relleno(ctx, [[26, 28], [20, 16], [34, 24]], C.amarillo);
    relleno(ctx, [[70, 28], [76, 16], [62, 24]], C.amarillo);
  };

  var cZorro = function (ctx, azar) {
    relleno(ctx, [[26, 24], [18, 6], [38, 18]], C.naranja);
    trazo(ctx, [[26, 24], [18, 6], [38, 18]], C.negro, 1.6, azar);
    relleno(ctx, [[70, 24], [78, 6], [58, 18]], C.naranja);
    trazo(ctx, [[70, 24], [78, 6], [58, 18]], C.negro, 1.6, azar);
    circulo(ctx, 48, 44, 22, C.naranja);
    aro(ctx, 48, 44, 22, C.negro, 2, azar);
    relleno(ctx, [[36, 50], [60, 50], [56, 62], [40, 62]], C.blanco);
    trazo(ctx, [[36, 50], [60, 50], [56, 62], [40, 62]], C.negro, 1.4, azar);
    punto(ctx, 40, 42, C.negro, 3);
    punto(ctx, 56, 42, C.negro, 3);
    circulo(ctx, 48, 56, 3.5, C.negro);
  };

  var cSuper = function (ctx, azar) {
    var color = azar() < 0.5 ? C.azul : C.rojo;
    circulo(ctx, 48, 44, 22, "#ffd9b3");
    relleno(ctx, [[26, 34], [48, 12], [70, 34]], "#4a3728", azar);
    ctx.fillStyle = color;
    ctx.fillRect(26, 38, 44, 9);
    trazo(ctx, [[26, 38], [70, 38], [70, 47], [26, 47], [26, 38]], C.negro, 1.6, azar);
    circulo(ctx, 38, 42, 4, C.blanco);
    circulo(ctx, 58, 42, 4, C.blanco);
    punto(ctx, 38, 42, C.negro, 2);
    punto(ctx, 58, 42, C.negro, 2);
    trazo(ctx, [[42, 56], [48, 59], [54, 56]], C.negro, 1.4, azar);
  };

  var CABEZAS = [cGato, cPerro, cRobot, cDino, cUnicornio, cPanda, cAlien, cMonstruo, cSol, cElefante, cRana, cLeon, cBuho, cConejo, cPinguino, cNiña, cNiño, cPrincesa, cPirata, cBruja, cFantasma, cDragon, cVaca, cZorro, cSuper, cLobo, cOso, cCerdo, cGallina, cPato, cRaton, cErizo, cSerpiente, cTiburon, cMedusa];
  var cuerpoCasa = function (ctx, azar) {
    relleno(ctx, [[24, 64], [72, 64], [72, 106], [24, 106]], C.amarillo, azar);
    trazo(ctx, [[24, 64], [72, 64], [72, 106], [24, 106], [24, 64]], C.negro, 2, azar);
    relleno(ctx, [[42, 84], [56, 84], [56, 106], [42, 106]], C.marron);
    punto(ctx, 53, 94, C.amarillo, 2);
    relleno(ctx, [[30, 74], [40, 74], [40, 82], [30, 82]], C.celeste);
    relleno(ctx, [[56, 74], [66, 74], [66, 82], [56, 82]], C.celeste);
  };

  var cuerpoArbol = function (ctx, azar) {
    trazo(ctx, [[48, 112], [46, 84]], C.marron, 5, azar);
    trazo(ctx, [[46, 92], [30, 82]], C.marron, 3, azar);
    trazo(ctx, [[47, 96], [64, 86]], C.marron, 3, azar);
    circulo(ctx, 34, 66, 14, C.verde);
    circulo(ctx, 62, 66, 14, C.verde);
    circulo(ctx, 48, 58, 16, C.verde);
    punto(ctx, 36, 62, C.rojo, 3);
    punto(ctx, 60, 70, C.rojo, 3);
    punto(ctx, 50, 54, C.rojo, 3);
  };

  var cuerpoCoche = function (ctx, azar) {
    var color = azar() < 0.5 ? C.rojo : C.azul;
    relleno(ctx, [[18, 78], [78, 78], [74, 100], [22, 100]], color, azar);
    relleno(ctx, [[30, 64], [66, 64], [72, 80], [24, 80]], color, azar);
    trazo(ctx, [[18, 78], [78, 78], [74, 100], [22, 100], [18, 78]], C.negro, 2, azar);
    trazo(ctx, [[30, 64], [66, 64], [72, 80], [24, 80], [30, 64]], C.negro, 2, azar);
    relleno(ctx, [[34, 68], [46, 68], [44, 78], [31, 78]], C.celeste);
    relleno(ctx, [[52, 68], [63, 68], [68, 78], [50, 78]], C.celeste);
    circulo(ctx, 32, 100, 9, C.negro);
    circulo(ctx, 32, 100, 4, C.gris);
    circulo(ctx, 64, 100, 9, C.negro);
    circulo(ctx, 64, 100, 4, C.gris);
  };

  var cuerpoTarta = function (ctx, azar) {
    relleno(ctx, [[22, 72], [74, 72], [74, 106], [22, 106]], C.rosa, azar);
    trazo(ctx, [[22, 72], [74, 72], [74, 106], [22, 106], [22, 72]], C.negro, 2, azar);
    trazo(ctx, [[22, 88], [74, 88]], C.negro, 1.6, azar);
    for (var i = 0; i < 3; i++) {
      var x = 34 + i * 14;
      trazo(ctx, [[x, 72], [x, 60]], C.celeste, 3, azar);
      circulo(ctx, x, 57, 2.5, C.amarillo);
    }
  };

  var CUERPOS = [cuerpoPatas, cuerpoTentaculos, cuerpoCohete, cuerpoCaparazon, cuerpoVestido, cuerpoRuedas, cuerpoGlobo, cuerpoAraña, cuerpoNube, cuerpoCapa, cuerpoCasa, cuerpoArbol, cuerpoCoche, cuerpoTarta, cuerpoPez, cuerpoSerpiente, cuerpoTren, cuerpoBarco, cuerpoOlla, cuerpoCactus];

  var dCoche = function (ctx, azar) {
    circulo(ctx, 14, 16, 6, C.amarillo);
    relleno(ctx, [[10, 72], [86, 72], [82, 96], [14, 96]], C.rojo, azar);
    relleno(ctx, [[26, 56], [70, 56], [80, 74], [16, 74]], C.rojo, azar);
    trazo(ctx, [[10, 72], [86, 72], [82, 96], [14, 96], [10, 72]], C.negro, 2, azar);
    trazo(ctx, [[26, 56], [70, 56], [80, 74], [16, 74], [26, 56]], C.negro, 2, azar);
    relleno(ctx, [[30, 60], [46, 60], [44, 72], [27, 72]], C.celeste);
    relleno(ctx, [[52, 60], [68, 60], [74, 72], [50, 72]], C.celeste);
    circulo(ctx, 28, 96, 10, C.negro);
    circulo(ctx, 28, 96, 4, C.gris);
    circulo(ctx, 68, 96, 10, C.negro);
    circulo(ctx, 68, 96, 4, C.gris);
    trazo(ctx, [[2, 100], [94, 100]], C.gris, 2, azar);
  };

  var dTren = function (ctx, azar) {
    relleno(ctx, [[14, 60], [58, 60], [58, 90], [14, 90]], C.azul, azar);
    trazo(ctx, [[14, 60], [58, 60], [58, 90], [14, 90], [14, 60]], C.negro, 2, azar);
    relleno(ctx, [[18, 48], [34, 48], [34, 62], [18, 62]], C.negro, azar);
    trazo(ctx, [[18, 48], [34, 48], [34, 62], [18, 62], [18, 48]], C.negro, 1.6, azar);
    relleno(ctx, [[58, 68], [86, 68], [86, 90], [58, 90]], C.verde, azar);
    trazo(ctx, [[58, 68], [86, 68], [86, 90], [58, 90], [58, 68]], C.negro, 2, azar);
    circulo(ctx, 26, 92, 7, C.negro);
    circulo(ctx, 26, 92, 3, C.gris);
    circulo(ctx, 48, 92, 7, C.negro);
    circulo(ctx, 48, 92, 3, C.gris);
    circulo(ctx, 72, 92, 7, C.negro);
    circulo(ctx, 72, 92, 3, C.gris);
    trazo(ctx, [[4, 98], [92, 98]], C.marron, 3, azar);
    trazo(ctx, [[10, 98], [10, 106]], C.marron, 2, azar);
    trazo(ctx, [[86, 98], [86, 106]], C.marron, 2, azar);
    trazo(ctx, [[26, 48], [22, 38], [28, 30]], C.gris, 2, azar);
  };

  var dAvion = function (ctx, azar) {
    circulo(ctx, 80, 18, 6, C.amarillo);
    nube(ctx, 6, 26);
    relleno(ctx, [[16, 62], [72, 62], [80, 70], [16, 70]], C.blanco, azar);
    relleno(ctx, [[30, 46], [52, 46], [58, 64], [24, 64]], C.blanco, azar);
    trazo(ctx, [[16, 62], [72, 62], [80, 70], [16, 70], [16, 62]], C.negro, 2, azar);
    trazo(ctx, [[30, 46], [52, 46], [58, 64], [24, 64], [30, 46]], C.negro, 2, azar);
    relleno(ctx, [[34, 52], [46, 52], [48, 62], [32, 62]], C.celeste);
    relleno(ctx, [[14, 62], [4, 48], [18, 54]], C.rojo);
    relleno(ctx, [[74, 64], [88, 76], [70, 70]], C.rojo);
    relleno(ctx, [[74, 60], [86, 48], [68, 58]], C.rojo);
    circulo(ctx, 40, 56, 2, C.negro);
    circulo(ctx, 52, 56, 2, C.negro);
    circulo(ctx, 60, 56, 2, C.negro);
    estrellitas(ctx, azar, 3);
  };

  var dCometa = function (ctx, azar) {
    var color = azar() < 0.5 ? C.rojo : C.morado;
    circulo(ctx, 14, 16, 6, C.amarillo);
    trazo(ctx, [[48, 40], [72, 76], [46, 62]], color, 1.5, azar);
    trazo(ctx, [[72, 76], [64, 62], [46, 84]], color, 1.5, azar);
    trazo(ctx, [[64, 62], [36, 88], [58, 96]], color, 1.5, azar);
    trazo(ctx, [[36, 88], [28, 78], [20, 100]], C.rojo, 1.2, azar);
    trazo(ctx, [[48, 40], [58, 24], [70, 30], [82, 18]], C.celeste, 1.4, azar);
    relleno(ctx, [[58, 24], [64, 20], [62, 28]], C.amarillo);
    relleno(ctx, [[70, 30], [78, 26], [76, 34]], C.rosa);
    estrellitas(ctx, azar, 3);
  };

  var dGloboA = function (ctx, azar) {
    var color = azar() < 0.5 ? C.rojo : C.morado;
    nube(ctx, 6, 20);
    nube(ctx, 60, 34);
    circulo(ctx, 48, 40, 22, color);
    for (var i = 0; i < 3; i++) {
      trazo(ctx, [[48 - 14 + i * 14, 60], [48 - 8 + i * 8, 74]], C.negro, 1, azar);
    }
    relleno(ctx, [[36, 74], [60, 74], [64, 90], [32, 90]], C.marron, azar);
    trazo(ctx, [[36, 74], [60, 74], [64, 90], [32, 90], [36, 74]], C.negro, 2, azar);
    circulo(ctx, 42, 82, 3, C.amarillo);
    circulo(ctx, 54, 82, 3, C.amarillo);
    trazo(ctx, [[48, 90], [48, 96]], C.negro, 1.2, azar);
    estrellitas(ctx, azar, 3);
  };

  var dVolcan = function (ctx, azar) {
    trazo(ctx, [[4, 106], [92, 106]], C.verde, 3, azar);
    relleno(ctx, [[14, 104], [36, 44], [60, 44], [84, 104]], "#5a4a3a", azar);
    trazo(ctx, [[14, 104], [36, 44], [60, 44], [84, 104]], C.negro, 2, azar);
    relleno(ctx, [[30, 82], [66, 82], [60, 66], [36, 66]], "#8a7a6a");
    relleno(ctx, [[34, 46], [62, 46], [58, 38], [38, 38]], C.naranja);
    trazo(ctx, [[40, 44], [34, 60], [24, 76], [14, 88]], C.naranja, 3, azar);
    trazo(ctx, [[56, 44], [62, 58], [72, 74], [82, 86]], C.naranja, 3, azar);
    trazo(ctx, [[48, 38], [46, 28], [52, 20]], C.gris, 2, azar);
    circulo(ctx, 48, 14, 5, C.gris);
    punto(ctx, 36, 34, C.rojo, 2);
    punto(ctx, 60, 30, C.rojo, 2);
  };

  var doodles = function (ctx, azar) {
    var n = Math.floor(azar() * 5);
    for (var i = 0; i < n; i++) {
      var x = 6 + azar() * 84;
      var y = 6 + azar() * 108;
      var tipo = Math.floor(azar() * 8);
      var col = [C.negro, C.rojo, C.azul, C.verde, C.morado][Math.floor(azar() * 5)];
      if (tipo === 0) {
        circulo(ctx, x, y, 2.5, col);
      } else if (tipo === 1) {
        trazo(ctx, [[x - 3, y], [x + 3, y]], col, 1, azar);
        trazo(ctx, [[x, y - 3], [x, y + 3]], col, 1, azar);
      } else if (tipo === 2) {
        trazo(ctx, [[x - 4, y + 2], [x, y - 4], [x + 4, y + 2], [x - 4, y + 2]], col, 1.2, azar);
      } else if (tipo === 3) {
        trazo(ctx, [[x - 4, y], [x - 2, y - 3], [x, y], [x + 2, y - 3], [x + 4, y]], col, 1, azar);
      } else if (tipo === 4) {
        circulo(ctx, x, y, 2, col);
        circulo(ctx, x + 4, y - 2, 2, col);
        circulo(ctx, x + 8, y, 2, col);
      } else if (tipo === 5) {
        trazo(ctx, [[x, y - 4], [x, y + 4]], col, 1.4, azar);
        trazo(ctx, [[x - 3, y - 1], [x - 3, y + 4]], col, 1, azar);
        trazo(ctx, [[x + 3, y - 1], [x + 3, y + 4]], col, 1, azar);
      } else if (tipo === 6) {
        trazo(ctx, [[x - 3, y], [x + 3, y], [x + 2, y + 3], [x - 2, y + 3], [x - 3, y]], col, 1, azar);
      } else {
        circulo(ctx, x, y, 2, col);
        trazo(ctx, [[x, y + 2], [x, y + 5]], col, 1, azar);
      }
    }
  };

  var rotular = function (ctx, texto, azar) {
    if (azar() > 0.4) {
      return;
    }
    var arriba = azar() < 0.5;
    var y = arriba ? 16 : A - 8;
    ctx.save();
    ctx.translate(48, y);
    ctx.rotate((azar() - 0.5) * 0.12);
    ctx.font = "16px Schoolbell, cursive";
    ctx.textAlign = "center";
    ctx.fillStyle = [C.rojo, C.azul, C.morado, C.negro][Math.floor(azar() * 4)];
    var etiqueta = corromper(texto.toUpperCase(), azar);
    if (etiqueta.length > 18) {
      etiqueta = etiqueta.slice(0, 17) + "…";
    }
    ctx.fillText(etiqueta, 0, 0);
    if (azar() < 0.5) {
      ctx.beginPath();
      ctx.moveTo(-ctx.measureText(etiqueta).width / 2 - 2, 4);
      ctx.lineTo(ctx.measureText(etiqueta).width / 2 + 2, 4);
      ctx.strokeStyle = ctx.fillStyle;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
    ctx.restore();
  };

  var modos = function (lienzo, azar) {
    var modo = Math.floor(azar() * 6);
    if (!modo) {
      return;
    }
    var ctx = lienzo.getContext("2d");
    var img = ctx.getImageData(0, 0, lienzo.width, lienzo.height);
    var d = img.data;
    for (var i = 0; i < d.length; i += 4) {
      var r = d[i];
      var g = d[i + 1];
      var b = d[i + 2];
      var max = Math.max(r, g, b);
      var min = Math.min(r, g, b);
      if (max - min < 45) {
        continue;
      }
      if (modo === 1) {
        r = r * 0.7 + 255 * 0.3;
        g = g * 0.7 + 255 * 0.3;
        b = b * 0.7 + 255 * 0.3;
      } else if (modo === 2) {
        r *= 0.72;
        g *= 0.72;
        b *= 0.72;
      } else if (modo === 3) {
        var lum = (r + g + b) / 3;
        r = lum * 0.5 + r * 0.5;
        g = g * 0.85;
        b = b * 0.65;
      } else if (modo === 4) {
        var gris = (r + g + b) / 3;
        r = gris * 0.85 + r * 0.15;
        g = gris * 0.85 + g * 0.15;
        b = gris * 0.85 + b * 0.15;
      } else {
        r = Math.min(255, r * 1.25 + 20);
        g = Math.min(255, g * 1.15);
        b = Math.min(255, b * 1.05);
      }
      d[i] = r;
      d[i + 1] = g;
      d[i + 2] = b;
    }
    ctx.putImageData(img, 0, 0);
  };

  var enmarcar = function (lienzo, azar) {
    var tipo = Math.floor(azar() * 4);
    var ctx = lienzo.getContext("2d");
    if (tipo === 1) {
      ctx.fillStyle = "#faf6ea";
      ctx.fillRect(0, 0, L, 4);
      ctx.fillRect(0, A - 12, L, 12);
      ctx.fillRect(0, 0, 4, A);
      ctx.fillRect(L - 4, 0, 4, A);
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.fillRect(0, A - 12, L, 1);
    } else if (tipo === 2) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, L, 2);
      ctx.fillRect(0, A - 2, L, 2);
      ctx.fillRect(0, 0, 2, A);
      ctx.fillRect(L - 2, 0, 2, A);
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fillRect(1, 1, L - 2, 1);
    } else if (tipo === 3) {
      ctx.fillStyle = "rgba(232,226,200,0.65)";
      ctx.fillRect(24, A - 8, 48, 6);
    }
  };

  var conCabeza = function (cabeza) {
    return function (ctx, azar) {
      FONDOS[Math.floor(azar() * FONDOS.length)](ctx, azar);
      CUERPOS[Math.floor(azar() * CUERPOS.length)](ctx, azar);
      cabeza(ctx, azar);
    };
  };

  var conCuerpo = function (cuerpo) {
    return function (ctx, azar) {
      FONDOS[Math.floor(azar() * FONDOS.length)](ctx, azar);
      cuerpo(ctx, azar);
      CABEZAS[Math.floor(azar() * CABEZAS.length)](ctx, azar);
    };
  };

  var clima = function (ctx, azar) {
    var tipo = Math.floor(azar() * 7);
    var i;
    var x;
    var y;
    if (tipo === 0) {
      return;
    }
    if (tipo === 1) {
      for (i = 0; i < 24; i++) {
        circulo(ctx, azar() * L, azar() * A * 0.9, 1 + azar(), "#ffffff");
      }
    } else if (tipo === 2) {
      for (i = 0; i < 16; i++) {
        x = azar() * L;
        y = azar() * 90;
        trazo(ctx, [[x, y], [x - 2, y + 8]], C.celeste, 1, azar);
      }
    } else if (tipo === 3) {
      for (i = 0; i < 7; i++) {
        x = azar() * 90;
        y = azar() * 100;
        relleno(ctx, [[x, y], [x + 5, y + 3], [x + 2, y + 7]], azar() < 0.5 ? C.naranja : "#d9a13b");
      }
    } else if (tipo === 4) {
      for (i = 0; i < 6; i++) {
        x = 6 + i * 15 + azar() * 5;
        trazo(ctx, [[x, 108], [x, 102]], C.verde, 1.4, azar);
        for (var p = 0; p < 5; p++) {
          var an = (p / 5) * Math.PI * 2;
          circulo(ctx, x + Math.cos(an) * 3, 100 + Math.sin(an) * 3, 2, azar() < 0.5 ? C.rojo : C.rosa);
        }
      }
    } else if (tipo === 5) {
      for (i = 0; i < 3; i++) {
        x = 10 + azar() * 70;
        y = 10 + azar() * 80;
        trazo(ctx, [[x, y], [x - 1, y + 4]], C.negro, 1, azar);
        relleno(ctx, [[x - 4, y - 2], [x + 1, y - 8], [x + 4, y - 2]], azar() < 0.5 ? C.amarillo : C.celeste);
        relleno(ctx, [[x - 4, y - 2], [x + 1, y + 4], [x + 4, y - 2]], azar() < 0.5 ? C.rojo : C.morado);
      }
    } else {
      var confeti = [C.rojo, C.amarillo, C.verde, C.azul, C.morado, C.rosa];
      for (i = 0; i < 20; i++) {
        ctx.fillStyle = confeti[Math.floor(azar() * 6)];
        ctx.fillRect(azar() * L, azar() * A, 2, 2);
      }
    }
  };

  var recolorear = function (lienzo, azar) {
    var tinte = Math.floor(azar() * 6);
    if (!tinte) {
      return;
    }
    var ctx = lienzo.getContext("2d");
    var img = ctx.getImageData(0, 0, lienzo.width, lienzo.height);
    var d = img.data;
    for (var i = 0; i < d.length; i += 4) {
      var r = d[i];
      var g = d[i + 1];
      var b = d[i + 2];
      var max = Math.max(r, g, b);
      var min = Math.min(r, g, b);
      if (max - min < 45) {
        continue;
      }
      var nr;
      var ng;
      var nb;
      if (tinte === 1) {
        nr = b;
        ng = r;
        nb = g;
      } else if (tinte === 2) {
        nr = g;
        ng = b;
        nb = r;
      } else if (tinte === 3) {
        nr = b;
        ng = g;
        nb = r;
      } else if (tinte === 4) {
        nr = r;
        ng = b;
        nb = g;
      } else {
        nr = (r + g + b) / 3;
        ng = b;
        nb = r;
      }
      d[i] = nr;
      d[i + 1] = ng;
      d[i + 2] = nb;
    }
    ctx.putImageData(img, 0, 0);
  };

  var quimera = function (ctx, azar, partes) {
    var fondo = partes && partes.fondo ? partes.fondo : FONDOS[Math.floor(azar() * FONDOS.length)];
    var cuerpo = partes && partes.cuerpo ? partes.cuerpo : CUERPOS[Math.floor(azar() * CUERPOS.length)];
    var cabeza = partes && partes.cabeza ? partes.cabeza : CABEZAS[Math.floor(azar() * CABEZAS.length)];
    fondo(ctx, azar);
    cuerpo(ctx, azar);
    cabeza(ctx, azar);
  };

  var TINTA = "#2b3f8f";
  var ROJO_BOLI = "#c23b3b";

  var trazoBoli = function (ctx, puntos, azar, ancho) {
    ctx.strokeStyle = TINTA;
    ctx.lineWidth = (ancho || 1.3) * perfilActual.ancho;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalAlpha = 0.92;
    ctx.beginPath();
    var primero = true;
    for (var i = 0; i < puntos.length - 1; i++) {
      var a = puntos[i];
      var b = puntos[i + 1];
      var dx = b[0] - a[0];
      var dy = b[1] - a[1];
      var largo = Math.sqrt(dx * dx + dy * dy);
      var pasos = Math.max(1, Math.round(largo / 4));
      for (var p = 0; p <= pasos; p++) {
        var t = p / pasos;
        var desvio = p > 0 && p < pasos ? 1.1 * perfilActual.jitter : 0;
        var x = a[0] + dx * t + (azar() - 0.5) * desvio;
        var y = a[1] + dy * t + (azar() - 0.5) * desvio;
        if (primero) {
          ctx.moveTo(x, y);
          primero = false;
        } else {
          ctx.lineTo(x, y);
        }
      }
    }
    ctx.stroke();
    ctx.globalAlpha = 1;
  };

  var rayado = function (ctx, x, y, w, h, azar, densidad) {
    ctx.strokeStyle = TINTA;
    ctx.globalAlpha = 0.45;
    ctx.lineWidth = 0.9;
    var paso = densidad || 3;
    for (var i = -h; i < w; i += paso + azar() * 2) {
      ctx.beginPath();
      ctx.moveTo(x + i, y + h);
      ctx.lineTo(x + i + h, y);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  };

  var garabatoTexto = function (ctx, x, y, ancho, azar) {
    var puntos = [];
    var pasos = Math.max(6, Math.round(ancho / 5));
    var alto = 4 + azar() * 3;
    var subiendo = azar() < 0.5;
    for (var i = 0; i <= pasos; i++) {
      var px = x + (ancho * i) / pasos;
      var py = y + (azar() - 0.5) * alto;
      if (i % 3 === 0) {
        py += subiendo ? -3 : 3;
      }
      puntos.push([px, py]);
    }
    trazoBoli(ctx, puntos, azar, 1.1);
    for (var d = 0; d < 3; d++) {
      if (azar() < 0.5) {
        ctx.fillStyle = TINTA;
        ctx.fillRect(x + azar() * ancho, y - 4, 1.4, 1.4);
      }
    }
  };

  var espiralDibujo = function (ctx, cx, cy, radio, azar) {
    ctx.strokeStyle = TINTA;
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    var vueltas = 3 + azar() * 2;
    for (var a = 0; a < vueltas * Math.PI * 2; a += 0.25) {
      var r = (a / (vueltas * Math.PI * 2)) * radio;
      var x = cx + Math.cos(a) * r;
      var y = cy + Math.sin(a) * r + (azar() - 0.5) * 0.8;
      if (a === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
  };

  var bEspiral = function (ctx, azar) {
    espiralDibujo(ctx, 0, 0, 24, azar);
  };

  var bCubo = function (ctx, azar) {
    var s = 16;
    trazoBoli(ctx, [[-s, -s + 6], [s - 6, -s + 6], [s - 6, s - 6], [-s, s - 6], [-s, -s + 6]], azar, 1.3);
    trazoBoli(ctx, [[-s + 6, -s], [s, -s], [s, s], [-s + 6, s], [-s + 6, -s]], azar, 1.3);
    trazoBoli(ctx, [[-s, -s + 6], [-s + 6, -s]], azar, 1);
    trazoBoli(ctx, [[s - 6, -s + 6], [s, -s]], azar, 1);
    trazoBoli(ctx, [[s - 6, s - 6], [s, s]], azar, 1);
    trazoBoli(ctx, [[-s, s - 6], [-s + 6, s]], azar, 1);
  };

  var bOjo = function (ctx, azar) {
    trazoBoli(ctx, [[-22, 0], [-14, -10], [0, -13], [14, -10], [22, 0], [14, 10], [0, 13], [-14, 10], [-22, 0]], azar, 1.2);
    trazoBoli(ctx, [[-7, 0], [0, -7], [7, 0], [0, 7], [-7, 0]], azar, 1.4);
    circulo(ctx, 0, 0, 2.5, TINTA);
    for (var p = 0; p < 6; p++) {
      var x = -20 + p * 8;
      trazoBoli(ctx, [[x, -12 - Math.abs(p - 2.5)], [x + (p % 2 ? 2 : -2), -18 - Math.abs(p - 2.5)]], azar, 1);
    }
  };

  var bEstrella = function (ctx, azar) {
    var puntos = [];
    for (var i = 0; i <= 10; i++) {
      var r = i % 2 === 0 ? 22 : 9;
      var a = -Math.PI / 2 + (i * Math.PI) / 5;
      puntos.push([Math.cos(a) * r, Math.sin(a) * r]);
    }
    trazoBoli(ctx, puntos, azar, 1.2);
  };

  var bCorazon = function (ctx, azar) {
    trazoBoli(ctx, [[0, 20], [-18, 2], [-16, -10], [-8, -16], [0, -10], [8, -16], [16, -10], [18, 2], [0, 20]], azar, 1.3);
    trazoBoli(ctx, [[-8, -2], [0, 6], [8, -2]], azar, 1);
  };

  var bCara = function (ctx, azar) {
    trazoBoli(ctx, [[-18, -6], [-16, -16], [-6, -20], [6, -20], [16, -16], [18, -6], [18, 6], [10, 16], [-10, 16], [-18, 6], [-18, -6]], azar, 1.3);
    circulo(ctx, -6, -4, 1.8, TINTA);
    circulo(ctx, 6, -4, 1.8, TINTA);
    trazoBoli(ctx, [[-8, 6], [0, 10], [8, 6]], azar, 1.2);
    for (var p = 0; p < 5; p++) {
      trazoBoli(ctx, [[-14 + p * 7, -18], [-12 + p * 7, -24 - (p % 3) * 2]], azar, 1);
    }
  };

  var bFlor = function (ctx, azar) {
    for (var p = 0; p < 6; p++) {
      var a = (p / 6) * Math.PI * 2;
      trazoBoli(ctx, [[0, 0], [Math.cos(a) * 12, Math.sin(a) * 12]], azar, 1);
    }
    circulo(ctx, 0, 0, 5, TINTA);
    trazoBoli(ctx, [[0, 12], [0, 32]], azar, 1.2);
    trazoBoli(ctx, [[0, 22], [-8, 16], [-10, 22]], azar, 1);
    trazoBoli(ctx, [[0, 26], [8, 20], [10, 26]], azar, 1);
  };

  var bGato = function (ctx, azar) {
    trazoBoli(ctx, [[-14, -6], [-16, -16], [-8, -14], [0, -18], [8, -14], [16, -16], [14, -6], [12, 4], [0, 8], [-12, 4], [-14, -6]], azar, 1.2);
    circulo(ctx, -4, -6, 1.5, TINTA);
    circulo(ctx, 4, -6, 1.5, TINTA);
    trazoBoli(ctx, [[0, -2], [-3, 1], [3, 1]], azar, 1);
    trazoBoli(ctx, [[-16, -4], [-26, -6]], azar, 0.9);
    trazoBoli(ctx, [[-16, 0], [-26, 1]], azar, 0.9);
    trazoBoli(ctx, [[16, -4], [26, -6]], azar, 0.9);
    trazoBoli(ctx, [[16, 0], [26, 1]], azar, 0.9);
    trazoBoli(ctx, [[-8, 8], [-10, 24], [-2, 28]], azar, 1.1);
    trazoBoli(ctx, [[8, 8], [10, 24], [2, 28]], azar, 1.1);
    espiralDibujo(ctx, 18, 26, 8, azar);
  };

  var bPerro = function (ctx, azar) {
    trazoBoli(ctx, [[-14, -8], [-12, -18], [-2, -14], [2, -14], [12, -18], [14, -8], [12, 4], [4, 8], [-4, 8], [-12, 4], [-14, -8]], azar, 1.2);
    trazoBoli(ctx, [[-12, -18], [-16, -8]], azar, 1);
    trazoBoli(ctx, [[12, -18], [16, -8]], azar, 1);
    circulo(ctx, -4, -8, 1.5, TINTA);
    circulo(ctx, 4, -8, 1.5, TINTA);
    circulo(ctx, 0, -1, 2.5, TINTA);
    trazoBoli(ctx, [[-3, 3], [0, 6], [3, 3]], azar, 1);
    trazoBoli(ctx, [[0, 6], [0, 12], [4, 16]], azar, 1);
  };

  var bCasa = function (ctx, azar) {
    trazoBoli(ctx, [[-16, 22], [-16, -4], [0, -20], [16, -4], [16, 22], [-16, 22]], azar, 1.3);
    trazoBoli(ctx, [[-6, 22], [-6, 10], [4, 10], [4, 22]], azar, 1.1);
    trazoBoli(ctx, [[6, 2], [12, 2], [12, 8], [6, 8], [6, 2]], azar, 1);
    trazoBoli(ctx, [[8, -12], [8, -18]], azar, 1);
    espiralDibujo(ctx, 12, -22, 5, azar);
  };

  var bArbol = function (ctx, azar) {
    trazoBoli(ctx, [[-2, 30], [-4, 4], [-10, -2]], azar, 1.4);
    trazoBoli(ctx, [[-4, 8], [6, 2]], azar, 1.2);
    for (var i = 0; i < 5; i++) {
      var a = (i / 5) * Math.PI * 2;
      trazoBoli(ctx, [[Math.cos(a) * 14, -10 + Math.sin(a) * 10], [Math.cos(a) * 6, -10 + Math.sin(a) * 5]], azar, 1);
    }
    rayado(ctx, -10, -18, 20, 12, azar, 4);
  };

  var bMontana = function (ctx, azar) {
    trazoBoli(ctx, [[-26, 20], [-6, -16], [0, -6], [8, -20], [26, 20]], azar, 1.3);
    trazoBoli(ctx, [[-12, -6], [-8, -2], [-4, -6], [0, -2]], azar, 1);
    trazoBoli(ctx, [[4, -14], [8, -10], [12, -14]], azar, 1);
    trazoBoli(ctx, [[-22, 26], [22, 26]], azar, 1);
  };

  var bSol = function (ctx, azar) {
    aro(ctx, 0, 0, 12, TINTA, 1.3, azar);
    for (var i = 0; i < 10; i++) {
      var a = (i / 10) * Math.PI * 2;
      trazoBoli(ctx, [[Math.cos(a) * 16, Math.sin(a) * 16], [Math.cos(a) * 24, Math.sin(a) * 24]], azar, 1);
    }
    circulo(ctx, -4, -2, 1.3, TINTA);
    circulo(ctx, 4, -2, 1.3, TINTA);
    trazoBoli(ctx, [[-5, 5], [0, 8], [5, 5]], azar, 1);
  };

  var bLuna = function (ctx, azar) {
    trazoBoli(ctx, [[4, -20], [-8, -14], [-14, 0], [-8, 14], [4, 20], [-2, 8], [-4, 0], [-2, -8], [4, -20]], azar, 1.2);
    circulo(ctx, -4, -4, 1.4, TINTA);
    circulo(ctx, -7, 6, 1.8, TINTA);
    trazoBoli(ctx, [[16, -16], [18, -12], [16, -8], [18, -4]], azar, 1);
  };

  var bNube = function (ctx, azar) {
    aro(ctx, -10, 0, 9, TINTA, 1.2, azar);
    aro(ctx, 4, -4, 11, TINTA, 1.2, azar);
    aro(ctx, 14, 2, 8, TINTA, 1.2, azar);
    trazoBoli(ctx, [[-18, 6], [22, 6]], azar, 1);
    for (var i = 0; i < 5; i++) {
      var x = -14 + i * 9;
      trazoBoli(ctx, [[x, 10], [x - 2, 20 + azar() * 8]], azar, 1);
    }
  };

  var bRayo = function (ctx, azar) {
    trazoBoli(ctx, [[2, -22], [-6, -4], [0, -2], [-4, 16], [4, 6], [-2, 4], [4, 24]], azar, 1.6);
  };

  var bFlecha = function (ctx, azar) {
    trazoBoli(ctx, [[-24, 16], [20, -18]], azar, 1.3);
    trazoBoli(ctx, [[20, -18], [8, -16]], azar, 1.1);
    trazoBoli(ctx, [[20, -18], [18, -6]], azar, 1.1);
    trazoBoli(ctx, [[-24, 16], [-18, 10]], azar, 1);
    trazoBoli(ctx, [[-24, 16], [-20, 4]], azar, 1);
    rayado(ctx, -6, -8, 10, 10, azar, 3);
  };

  var bEspada = function (ctx, azar) {
    trazoBoli(ctx, [[-2, -26], [0, 10]], azar, 1.6);
    trazoBoli(ctx, [[-12, 10], [12, 10]], azar, 1.4);
    trazoBoli(ctx, [[0, 10], [0, 22]], azar, 1.4);
    circulo(ctx, 0, 24, 2.5, TINTA);
    trazoBoli(ctx, [[-2, -26], [0, -20], [0, -4]], azar, 1);
  };

  var bDiana = function (ctx, azar) {
    aro(ctx, 0, 0, 20, TINTA, 1.2, azar);
    aro(ctx, 0, 0, 13, TINTA, 1.1, azar);
    aro(ctx, 0, 0, 6, TINTA, 1.1, azar);
    circulo(ctx, 0, 0, 1.5, TINTA);
    trazoBoli(ctx, [[18, -18], [0, 0]], azar, 1.2);
  };

  var bReloj = function (ctx, azar) {
    aro(ctx, 0, 0, 20, TINTA, 1.3, azar);
    for (var i = 0; i < 12; i++) {
      var a = (i / 12) * Math.PI * 2;
      trazoBoli(ctx, [[Math.cos(a) * 16, Math.sin(a) * 16], [Math.cos(a) * 18, Math.sin(a) * 18]], azar, 1);
    }
    trazoBoli(ctx, [[0, 0], [0, -12]], azar, 1.4);
    trazoBoli(ctx, [[0, 0], [9, 4]], azar, 1.4);
  };

  var bLaberinto = function (ctx, azar) {
    trazoBoli(ctx, [[-22, -20], [22, -20], [22, 20], [-22, 20], [-22, -20]], azar, 1.2);
    trazoBoli(ctx, [[-22, -10], [10, -10], [10, 2], [-10, 2], [-10, 12], [22, 12]], azar, 1.1);
  };

  var bBarco = function (ctx, azar) {
    trazoBoli(ctx, [[-20, 6], [20, 6], [12, 18], [-12, 18], [-20, 6]], azar, 1.3);
    trazoBoli(ctx, [[-2, 6], [-2, -22]], azar, 1.2);
    trazoBoli(ctx, [[-2, -20], [12, -8], [-2, -6]], azar, 1.1);
    trazoBoli(ctx, [[20, 14], [24, 10], [28, 14]], azar, 1);
  };

  var bAvion = function (ctx, azar) {
    trazoBoli(ctx, [[-22, 10], [4, -6], [12, -18], [10, -2], [22, 0], [4, 6], [-2, 16], [-6, 4], [-22, 10]], azar, 1.2);
    trazoBoli(ctx, [[-22, 10], [-6, 4]], azar, 1);
  };

  var bPez = function (ctx, azar) {
    trazoBoli(ctx, [[-20, 0], [-10, -12], [8, -12], [20, -4], [20, 4], [8, 12], [-10, 12], [-20, 0]], azar, 1.2);
    trazoBoli(ctx, [[20, -4], [28, -12], [28, 12], [20, 4]], azar, 1.1);
    circulo(ctx, -10, -2, 1.6, TINTA);
    for (var i = 0; i < 3; i++) {
      trazoBoli(ctx, [[-4 + i * 7, -8], [-1 + i * 7, 0], [-4 + i * 7, 8]], azar, 0.9);
    }
  };

  var bPajaro = function (ctx, azar) {
    trazoBoli(ctx, [[-20, -6], [-10, -12], [0, -4], [10, -12], [20, -6]], azar, 1.3);
    trazoBoli(ctx, [[0, -4], [2, 6]], azar, 1.1);
    trazoBoli(ctx, [[0, 2], [-6, 8], [0, 8], [6, 8], [0, 2]], azar, 1);
    trazoBoli(ctx, [[6, 8], [8, 14]], azar, 0.9);
  };

  var bMano = function (ctx, azar) {
    trazoBoli(ctx, [[-14, 18], [-16, 0], [-12, -10], [-10, 0], [-8, -18], [-5, -8], [-3, -22], [0, -10], [3, -20], [5, -8], [8, -14], [10, -2], [12, 6], [6, 16], [-14, 18]], azar, 1.2);
    rayado(ctx, -8, 4, 14, 10, azar, 4);
  };

  var bMovil = function (ctx, azar) {
    trazoBoli(ctx, [[-10, -20], [10, -20], [10, 20], [-10, 20], [-10, -20]], azar, 1.3);
    trazoBoli(ctx, [[-6, -16], [6, -16]], azar, 1);
    circulo(ctx, 0, 14, 1.8, TINTA);
    trazoBoli(ctx, [[-5, -10], [5, -10]], azar, 0.9);
  };

  var bLista = function (ctx, azar) {
    trazoBoli(ctx, [[-14, -22], [14, -22], [14, 22], [-14, 22], [-14, -22]], azar, 1.2);
    for (var i = 0; i < 4; i++) {
      var y = -14 + i * 9;
      trazoBoli(ctx, [[-10, y], [-6, y], [-6, y + 4], [-10, y + 4], [-10, y]], azar, 0.9);
      garabatoTexto(ctx, -2, y + 2, 14, azar);
      if (i === 2) {
        trazoBoli(ctx, [[-2, y + 2], [12, y - 2]], azar, 1.2);
      }
    }
  };

  var bFormula = function (ctx, azar) {
    garabatoTexto(ctx, -20, -6, 18, azar);
    trazoBoli(ctx, [[0, -14], [0, 6]], azar, 1.1);
    trazoBoli(ctx, [[-4, -10], [4, -10]], azar, 0.9);
    trazoBoli(ctx, [[-4, 2], [4, 2]], azar, 0.9);
    garabatoTexto(ctx, 6, -6, 16, azar);
    trazoBoli(ctx, [[0, 14], [16, 14]], azar, 1.2);
    garabatoTexto(ctx, 2, 20, 12, azar);
  };

  var bTresEnRaya = function (ctx, azar) {
    trazoBoli(ctx, [[-20, -20], [-20, 20]], azar, 1.2);
    trazoBoli(ctx, [[0, -20], [0, 20]], azar, 1.2);
    trazoBoli(ctx, [[20, -20], [20, 20]], azar, 1.2);
    trazoBoli(ctx, [[-20, -6], [20, -6]], azar, 1.2);
    trazoBoli(ctx, [[-20, 8], [20, 8]], azar, 1.2);
    trazoBoli(ctx, [[-14, -16], [-2, -8]], azar, 1);
    trazoBoli(ctx, [[-2, -16], [-14, -8]], azar, 1);
    aro(ctx, 10, -16, 4, TINTA, 1, azar);
    trazoBoli(ctx, [[-14, 12], [-2, 18]], azar, 1);
    trazoBoli(ctx, [[-2, 12], [-14, 18]], azar, 1);
  };

  var bNombre = function (ctx, azar) {
    garabatoTexto(ctx, -22, 0, 30, azar);
    trazoBoli(ctx, [[-22, 8], [10, 8]], azar, 1.2);
    trazoBoli(ctx, [[4, -14], [22, -14], [4, -6], [22, -6]], azar, 1);
  };

  var bSignos = function (ctx, azar) {
    trazoBoli(ctx, [[-14, -14], [0, 2], [-4, 10]], azar, 1.5);
    circulo(ctx, -4, 18, 1.6, TINTA);
    trazoBoli(ctx, [[6, -16], [10, -10], [6, -4], [10, 2]], azar, 1.3);
    trazoBoli(ctx, [[16, -14], [22, 2]], azar, 1.2);
  };

  var bCaos = function (ctx, azar) {
    for (var i = 0; i < 14; i++) {
      var a = azar() * Math.PI * 2;
      var r = 6 + azar() * 20;
      espiralDibujo(ctx, Math.cos(a) * r, Math.sin(a) * r, 3 + azar() * 5, azar);
    }
  };

  var CATALOGO_BOLI = [
    { f: bEspiral, titulo: "espiral de teléfono", claves: ["espiral", "remolino"] },
    { f: bCubo, titulo: "cubo imposible", claves: ["cubo", "dado", "3d"] },
    { f: bOjo, titulo: "ojo que mira", claves: ["ojo", "mirada"] },
    { f: bEstrella, titulo: "estrella de margen", claves: ["estrella"] },
    { f: bCorazon, titulo: "corazón con inicial", claves: ["corazon", "amor"] },
    { f: bCara, titulo: "carita", claves: ["cara", "sonrisa", "emoji"] },
    { f: bFlor, titulo: "flor de esquina", claves: ["flor", "margarita"] },
    { f: bGato, titulo: "gato a boli", claves: ["gato", "gatito", "miau"] },
    { f: bPerro, titulo: "perro a boli", claves: ["perro", "perrito", "guau"] },
    { f: bCasa, titulo: "casa con humo", claves: ["casa", "hogar"] },
    { f: bArbol, titulo: "árbol rayado", claves: ["arbol", "manzano"] },
    { f: bMontana, titulo: "montañas", claves: ["montana", "picos"] },
    { f: bSol, titulo: "sol de margen", claves: ["sol"] },
    { f: bLuna, titulo: "luna", claves: ["luna"] },
    { f: bNube, titulo: "nube con lluvia", claves: ["nube", "lluvia"] },
    { f: bRayo, titulo: "rayo", claves: ["rayo", "tormenta"] },
    { f: bFlecha, titulo: "flecha", claves: ["flecha"] },
    { f: bEspada, titulo: "espada", claves: ["espada", "daga"] },
    { f: bDiana, titulo: "diana con flecha", claves: ["diana", "blanco"] },
    { f: bReloj, titulo: "reloj de clase", claves: ["reloj", "hora"] },
    { f: bLaberinto, titulo: "laberinto", claves: ["laberinto"] },
    { f: bBarco, titulo: "barco", claves: ["barco", "velero"] },
    { f: bAvion, titulo: "avión de papel", claves: ["avion", "avioneta"] },
    { f: bPez, titulo: "pez", claves: ["pez", "peces"] },
    { f: bPajaro, titulo: "pájaro", claves: ["pajaro", "gorrion"] },
    { f: bMano, titulo: "contorno de mano", claves: ["mano", "palma"] },
    { f: bMovil, titulo: "móvil", claves: ["movil", "telefono", "celular"] },
    { f: bLista, titulo: "lista de deberes", claves: ["lista", "deberes", "tareas", "checklist"] },
    { f: bFormula, titulo: "fórmula ilegible", claves: ["formula", "mates", "ecuacion", "matematicas"] },
    { f: bTresEnRaya, titulo: "tres en raya", claves: ["tresenraya", "equis", "círculos"] },
    { f: bNombre, titulo: "nombre y rúbrica", claves: ["nombre", "firma", "apellido"] },
    { f: bSignos, titulo: "signos de examen", claves: ["signos", "preguntas", "examen"] },
    { f: bCaos, titulo: "aburrimiento puro", claves: ["caos", "aburrimiento", "garabato"] }
  ];

  var conPluma = function (ctx, cx, cy, escala, fn, azar) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(escala, escala);
    fn(ctx, azar);
    ctx.restore();
  };

  var papelBoli = function (ctx, azar) {
    var tipo = Math.floor(azar() * 3);
    ctx.fillStyle = tipo === 2 ? "#fdfbf0" : "#f8f8f4";
    ctx.fillRect(0, 0, L, A);
    if (tipo === 0) {
      ctx.strokeStyle = "rgba(120,150,210,0.55)";
      ctx.lineWidth = 0.8;
      for (var y = 10; y < A; y += 8) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(L, y);
        ctx.stroke();
      }
      ctx.strokeStyle = "rgba(200,90,90,0.7)";
      ctx.beginPath();
      ctx.moveTo(12, 0);
      ctx.lineTo(12, A);
      ctx.stroke();
      ctx.fillStyle = "rgba(0,0,0,0.10)";
      for (var h = 0; h < 3; h++) {
        ctx.beginPath();
        ctx.arc(5, 25 + h * 35, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (tipo === 1) {
      ctx.strokeStyle = "rgba(150,170,215,0.4)";
      ctx.lineWidth = 0.6;
      for (var gx = 0; gx < L; gx += 8) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, A);
        ctx.stroke();
      }
      for (var gy = 0; gy < A; gy += 8) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(L, gy);
        ctx.stroke();
      }
    } else {
      ctx.globalAlpha = 0.12;
      ctx.strokeStyle = "#8a5a2a";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(20 + azar() * 50, 20 + azar() * 70, 10 + azar() * 8, azar() * 4, azar() * 4 + 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.fillStyle = "rgba(0,0,0,0.06)";
      ctx.beginPath();
      ctx.moveTo(L, 0);
      ctx.lineTo(L - 12, 0);
      ctx.lineTo(L, 12);
      ctx.closePath();
      ctx.fill();
    }
  };

  var dibujarCuadroX = function (ctx, x, y, azar) {
    var s = 6 + azar() * 6;
    trazoBoli(ctx, [[x, y], [x + s, y], [x + s, y + s], [x, y + s], [x, y]], azar, 1);
    trazoBoli(ctx, [[x, y], [x + s, y + s]], azar, 1);
    trazoBoli(ctx, [[x + s, y], [x, y + s]], azar, 1);
  };

  var dibujarAdulto = function (ctx, azar, registro) {
    var sujetos = buscarCoincidencias(registro.p, CATALOGO_BOLI);
    if (sujetos.length > 1) {
      conPluma(ctx, 68, 22, 0.55, sujetos[1].f, azar);
      conPluma(ctx, 45, 64, 1, sujetos[0].f, azar);
    } else if (sujetos.length === 1) {
      conPluma(ctx, 48, 62, 1, sujetos[0].f, azar);
    } else {
      var a1 = CATALOGO_BOLI[Math.floor(azar() * CATALOGO_BOLI.length)];
      var a2 = CATALOGO_BOLI[Math.floor(azar() * CATALOGO_BOLI.length)];
      conPluma(ctx, 44, 64, 1, a1.f, azar);
      conPluma(ctx, 72, 24, 0.5, a2.f, azar);
    }
    var extras = Math.floor(azar() * 3);
    for (var e = 0; e < extras; e++) {
      var x = 8 + azar() * 78;
      var y = 8 + azar() * 100;
      var tipo = Math.floor(azar() * 5);
      if (tipo === 0) {
        dibujarCuadroX(ctx, x, y, azar);
      } else if (tipo === 1) {
        garabatoTexto(ctx, x, y, 14 + azar() * 18, azar);
      } else if (tipo === 2) {
        trazoBoli(ctx, [[x, y], [x + 6, y - 5], [x + 12, y + 2]], azar, 1);
      } else if (tipo === 3) {
        espiralDibujo(ctx, x, y, 4 + azar() * 5, azar);
      } else {
        conPluma(ctx, x, y, 0.28, CATALOGO_BOLI[Math.floor(azar() * CATALOGO_BOLI.length)].f, azar);
      }
    }
    garabatoTexto(ctx, 14, 12 + azar() * 8, 30 + azar() * 40, azar);
    if (azar() < 0.5) {
      garabatoTexto(ctx, 14, 96 + azar() * 12, 30 + azar() * 50, azar);
    }
  };

  var pintarBoli = function (registro, azar, lienzo, ctx, secreto) {
    var CW = lienzo.width;
    var CH = lienzo.height;
    L = CW;
    A = CH;
    papelBoli(ctx, azar);
    var perdido = azar() < 0.05;
    if (perdido) {
      for (var s = 0; s < 900; s++) {
        var dado = azar();
        ctx.fillStyle = dado < 0.45 ? "#0b0b12" : (dado < 0.72 ? "#00ffe1" : "#ff2bd1");
        ctx.fillRect(Math.floor(azar() * L), Math.floor(azar() * A), 1, 1);
      }
      return { lienzo: lienzo, perdido: true, secreto: null };
    }
    var esc = Math.min(CW / 96, CH / 120);
    var dx = (CW - 96 * esc) / 2;
    var dy = (CH - 120 * esc) / 2;
    L = 96;
    A = 120;
    ctx.save();
    ctx.translate(dx, dy);
    ctx.scale(esc, esc);
    dibujarAdulto(ctx, azar, registro);
    if (secreto) {
      secreto.sello(ctx);
    }
    ctx.restore();
    L = CW;
    A = CH;
    var nivel = Math.min(2, (registro.n || 0) + (azar() < 0.25 ? 1 : 0));
    if (secreto) {
      nivel = 2;
    }
    glitch(lienzo, azar, nivel);
    if (registro.t && registro.t.length) {
      registro.t.forEach(function (capa) {
        if (!capa || !capa.p) {
          return;
        }
        ctx.fillStyle = capa.c || "#ff2bd1";
        for (var i = 0; i < capa.p.length; i += 2) {
          ctx.fillRect(capa.p[i], capa.p[i + 1], 1, 1);
        }
      });
    }
    return { lienzo: lienzo, perdido: false, secreto: secreto };
  };

  var CATALOGO = [
    { f: dCasa, titulo: "mi casa", claves: ["casa", "hogar", "chalet"] },
    { f: dGato, titulo: "mi gat0", claves: ["gato", "gata", "gatito", "miau"], parte: { cabeza: cGato } },
    { f: dPerro, titulo: "mi perro", claves: ["perro", "perra", "perrito", "guau"], parte: { cabeza: cPerro } },
    { f: dPulpo, titulo: "el pulpo de 8 patas y media", claves: ["pulpo"], parte: { cuerpo: cuerpoTentaculos } },
    { f: dSeta, titulo: "una seta gigante", claves: ["seta", "hongo", "champinon"] },
    { f: dTorre, titulo: "la torre con un globo", claves: ["torre", "eiffel", "paris"] },
    { f: dCastillo, titulo: "mi castillo", claves: ["castillo", "fortaleza"] },
    { f: dFlor, titulo: "mi flor", claves: ["flor", "margarita", "planta"] },
    { f: dCohete, titulo: "c0hete a la luna", claves: ["cohete", "espacio", "nave", "astronauta"], parte: { cuerpo: cuerpoCohete } },
    { f: dPez, titulo: "pez globo", claves: ["pez", "peces", "pescado"] },
    { f: dBallena, titulo: "ballena feliz", claves: ["ballena", "whale"] },
    { f: dMariposa, titulo: "mariposa", claves: ["mariposa"] },
    { f: dTierra, titulo: "la tierra y la paz", claves: ["tierra", "mundo", "planeta"] },
    { f: dRobot, titulo: "r0b0t que te quiere", claves: ["robot", "bot", "androide"], parte: { cabeza: cRobot, cuerpo: cuerpoRuedas } },
    { f: dMonstruo, titulo: "monstruo bajito", claves: ["monstruo", "bicho", "ogro"], parte: { cabeza: cMonstruo } },
    { f: dDino, titulo: "dino con púas", claves: ["dino", "dinosaurio", "rex"], parte: { cabeza: cDino } },
    { f: dUnicornio, titulo: "unicornio", claves: ["unicornio", "cuerno"], parte: { cabeza: cUnicornio } },
    { f: dTortuga, titulo: "tortuga lenta", claves: ["tortuga"], parte: { cuerpo: cuerpoCaparazon } },
    { f: dCaracol, titulo: "caracol con baba", claves: ["caracol", "baba"] },
    { f: dHelado, titulo: "helado de 4 bolas", claves: ["helado", "cucurucho", "polo"] },
    { f: dPanda, titulo: "panda comiend0", claves: ["panda"], parte: { cabeza: cPanda } },
    { f: dOvni, titulo: "platillo volante", claves: ["ovni", "platillo", "alien", "extraterrestre"], parte: { cabeza: cAlien } },
    { f: dCorazon, titulo: "te kiero TKM", claves: ["corazon", "amor", "kiero"] },
    { f: dSol, titulo: "el sol tiene cara", claves: ["sol"], parte: { cabeza: cSol } },
    { f: dArbol, titulo: "árbol con manzanas", claves: ["arbol", "manzano"] },
    { f: dEstrella, titulo: "estrella fugaz", claves: ["estrella", "estrellita"] },
    { f: dLuna, titulo: "la luna llena", claves: ["luna", "noche"] },
    { f: dArcoiris, titulo: "arcoíris", claves: ["arcoiris", "arco"] },
    { f: dTarta, titulo: "tarta de cumple", claves: ["tarta", "pastel"] },
    { f: dBarco, titulo: "barco pirata", claves: ["barco", "velero"] },
    { f: dMolino, titulo: "molino de viento", claves: ["molino", "quijote"] },
    { f: conCabeza(cElefante), titulo: "elefante trompudo", claves: ["elefante"], parte: { cabeza: cElefante } },
    { f: conCabeza(cRana), titulo: "rana saltarina", claves: ["rana", "sapo"], parte: { cabeza: cRana } },
    { f: conCabeza(cLeon), titulo: "león con melena", claves: ["leon"], parte: { cabeza: cLeon } },
    { f: conCabeza(cBuho), titulo: "búho despierto", claves: ["buho", "lechuza"], parte: { cabeza: cBuho } },
    { f: conCabeza(cConejo), titulo: "conejo orejón", claves: ["conejo", "liebre"], parte: { cabeza: cConejo } },
    { f: conCabeza(cPinguino), titulo: "pingüino en el hielo", claves: ["pinguino"], parte: { cabeza: cPinguino } },
    { f: conCabeza(cNiña), titulo: "niña con lazos", claves: ["nina", "chica"], parte: { cabeza: cNiña } },
    { f: conCabeza(cNiño), titulo: "niño peludo", claves: ["nino", "chico"], parte: { cabeza: cNiño } },
    { f: conCabeza(cPrincesa), titulo: "princesa", claves: ["princesa"], parte: { cabeza: cPrincesa } },
    { f: conCabeza(cPirata), titulo: "pirata", claves: ["pirata", "corsario"], parte: { cabeza: cPirata } },
    { f: conCabeza(cBruja), titulo: "bruja", claves: ["bruja", "hechicera"], parte: { cabeza: cBruja } },
    { f: conCabeza(cFantasma), titulo: "fantasma", claves: ["fantasma", "espectro"], parte: { cabeza: cFantasma } },
    { f: conCabeza(cDragon), titulo: "dragón", claves: ["dragon"], parte: { cabeza: cDragon } },
    { f: conCabeza(cVaca), titulo: "vaca", claves: ["vaca", "ternero"], parte: { cabeza: cVaca } },
    { f: conCabeza(cZorro), titulo: "zorro", claves: ["zorro"], parte: { cabeza: cZorro } },
    { f: conCabeza(cSuper), titulo: "superhéroe", claves: ["heroe", "superheroe", "super"], parte: { cabeza: cSuper } },
    { f: dCoche, titulo: "coche", claves: ["coche", "auto", "carro"] },
    { f: dTren, titulo: "tren", claves: ["tren", "locomotora"] },
    { f: dAvion, titulo: "avión", claves: ["avion", "avioneta"] },
    { f: dCometa, titulo: "cometa", claves: ["cometa", "papalote", "barrilete"] },
    { f: dGloboA, titulo: "globo aerostático", claves: ["aerostatico", "aerostato"] },
    { f: dVolcan, titulo: "volcán", claves: ["volcan"] },
    { f: conCabeza(cLobo), titulo: "lobo", claves: ["lobo"], parte: { cabeza: cLobo } },
    { f: conCabeza(cOso), titulo: "oso", claves: ["oso"], parte: { cabeza: cOso } },
    { f: conCabeza(cCerdo), titulo: "cerdito", claves: ["cerdo", "cerdito", "cochino"], parte: { cabeza: cCerdo } },
    { f: conCabeza(cGallina), titulo: "gallina", claves: ["gallina", "pollo"], parte: { cabeza: cGallina } },
    { f: conCabeza(cPato), titulo: "pato", claves: ["pato", "pata"], parte: { cabeza: cPato } },
    { f: conCabeza(cRaton), titulo: "ratón", claves: ["raton", "ratoncito"], parte: { cabeza: cRaton } },
    { f: conCabeza(cErizo), titulo: "erizo", claves: ["erizo"], parte: { cabeza: cErizo } },
    { f: conCabeza(cSerpiente), titulo: "serpiente", claves: ["serpiente", "culebra"], parte: { cabeza: cSerpiente } },
    { f: conCabeza(cTiburon), titulo: "tiburón", claves: ["tiburon"], parte: { cabeza: cTiburon } },
    { f: conCabeza(cMedusa), titulo: "medusa", claves: ["medusa"], parte: { cabeza: cMedusa } }
  ];

  var aGlobo = function (ctx, azar) {
    var x = 16 + azar() * 58;
    circulo(ctx, x, 24, 9, azar() < 0.5 ? C.rojo : C.morado);
    trazo(ctx, [[x, 33], [x, 58]], C.negro, 1, azar);
  };

  var aFiesta = function (ctx, azar) {
    relleno(ctx, [[38, 30], [58, 30], [48, 6]], C.naranja);
    trazo(ctx, [[38, 30], [58, 30]], C.negro, 1.2, azar);
    circulo(ctx, 48, 5, 2.5, C.rojo);
    trazo(ctx, [[42, 24], [46, 26]], C.amarillo, 1.4, azar);
    trazo(ctx, [[46, 18], [50, 20]], C.amarillo, 1.4, azar);
  };

  var aCorona = function (ctx, azar) {
    relleno(ctx, [[32, 26], [64, 26], [58, 8], [52, 18], [48, 6], [44, 18], [38, 8]], C.amarillo);
    trazo(ctx, [[32, 26], [64, 26]], C.negro, 1.4, azar);
    punto(ctx, 48, 12, C.rojo, 2);
    punto(ctx, 38, 12, C.celeste, 2);
    punto(ctx, 58, 12, C.celeste, 2);
  };

  var aLazo = function (ctx, azar) {
    circulo(ctx, 16, 18, 5, C.rojo);
    circulo(ctx, 27, 18, 5, C.rojo);
    punto(ctx, 21, 17, C.rojo, 4);
    trazo(ctx, [[21, 20], [18, 28]], C.rojo, 1.6, azar);
    trazo(ctx, [[21, 20], [24, 28]], C.rojo, 1.6, azar);
  };

  var aGafas = function (ctx, azar) {
    ctx.fillStyle = C.negro;
    ctx.fillRect(28, 46, 14, 8);
    ctx.fillRect(54, 46, 14, 8);
    ctx.fillRect(42, 49, 12, 2);
    ctx.fillStyle = C.celeste;
    ctx.fillRect(30, 48, 5, 4);
    ctx.fillRect(56, 48, 5, 4);
  };

  var aBigote = function (ctx, azar) {
    ctx.fillStyle = C.negro;
    ctx.beginPath();
    ctx.ellipse(40, 60, 8, 3.5, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(56, 60, 8, 3.5, -0.3, 0, Math.PI * 2);
    ctx.fill();
  };

  var aGorra = function (ctx, azar) {
    var color = azar() < 0.5 ? C.rojo : C.azul;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(48, 30, 16, Math.PI, 0);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(32, 28, 32, 4);
    ctx.fillStyle = C.negro;
    ctx.fillRect(32, 32, 36, 4);
    circulo(ctx, 48, 14, 3, C.amarillo);
  };

  var aBufanda = function (ctx, azar) {
    var color = azar() < 0.5 ? C.rojo : C.morado;
    ctx.fillStyle = color;
    ctx.fillRect(26, 64, 44, 7);
    ctx.fillRect(58, 70, 8, 18);
    for (var i = 0; i < 5; i++) {
      ctx.fillStyle = C.blanco;
      ctx.fillRect(30 + i * 9, 66, 3, 3);
    }
  };

  var aVarita = function (ctx, azar) {
    trazo(ctx, [[20, 100], [40, 64]], C.marron, 2.4, azar);
    relleno(ctx, [[40, 64], [46, 52], [52, 64], [46, 60]], C.amarillo);
    punto(ctx, 46, 50, C.blanco, 2);
  };

  var aParche = function (ctx, azar) {
    ctx.fillStyle = C.negro;
    ctx.fillRect(33, 42, 11, 9);
    trazo(ctx, [[30, 38], [74, 34]], C.negro, 1.4, azar);
  };

  var aBalon = function (ctx, azar) {
    circulo(ctx, 76, 92, 10, C.blanco);
    aro(ctx, 76, 92, 10, C.negro, 1.6, azar);
    circulo(ctx, 76, 92, 3, C.negro);
    punto(ctx, 70, 86, C.negro, 2);
    punto(ctx, 83, 88, C.negro, 2);
    punto(ctx, 76, 100, C.negro, 2);
  };

  var aAuriculares = function (ctx, azar) {
    var color = azar() < 0.5 ? C.rojo : C.celeste;
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(48, 44, 26, Math.PI, 0);
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fillRect(18, 42, 8, 14);
    ctx.fillRect(70, 42, 8, 14);
  };

  var aCopa = function (ctx, azar) {
    ctx.fillStyle = C.negro;
    ctx.fillRect(38, 6, 20, 20);
    ctx.fillRect(30, 24, 36, 4);
    ctx.fillStyle = C.morado;
    ctx.fillRect(38, 12, 20, 5);
    ctx.fillStyle = C.amarillo;
    ctx.fillRect(39, 12, 20, 2);
    circulo(ctx, 48, 18, 2, C.rojo);
  };

  var aGorro = function (ctx, azar) {
    var color = azar() < 0.5 ? C.rojo : C.morado;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(48, 30, 16, Math.PI, 0);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(32, 26, 32, 6);
    ctx.fillStyle = C.blanco;
    ctx.fillRect(32, 30, 32, 4);
    circulo(ctx, 48, 10, 4, C.blanco);
  };

  var aFlores = function (ctx, azar) {
    for (var i = 0; i < 5; i++) {
      var x = 30 + i * 9;
      var col = [C.rojo, C.rosa, C.amarillo, C.morado][Math.floor(azar() * 4)];
      circulo(ctx, x, 22 - (i === 2 ? 3 : 0), 3.5, col);
      circulo(ctx, x, 22 - (i === 2 ? 3 : 0), 1.5, C.amarillo);
    }
  };

  var aMochila = function (ctx, azar) {
    var color = azar() < 0.5 ? C.azul : C.verde;
    ctx.fillStyle = color;
    ctx.fillRect(24, 62, 10, 30);
    ctx.fillRect(62, 62, 10, 30);
    ctx.fillStyle = C.negro;
    ctx.fillRect(26, 66, 6, 20);
    ctx.fillRect(64, 66, 6, 20);
  };

  var aEspada = function (ctx, azar) {
    trazo(ctx, [[70, 100], [88, 44]], C.gris, 3, azar);
    relleno(ctx, [[88, 44], [84, 50], [92, 50]], C.gris);
    trazo(ctx, [[66, 96], [76, 88]], C.marron, 3, azar);
    trazo(ctx, [[68, 88], [82, 96]], C.marron, 3, azar);
    punto(ctx, 79, 92, C.amarillo, 3);
  };

  var aParaguas = function (ctx, azar) {
    var color = azar() < 0.5 ? C.rojo : C.celeste;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(20, 34, 14, Math.PI, 0);
    ctx.closePath();
    ctx.fill();
    trazo(ctx, [[6, 34], [20, 26], [34, 34]], C.negro, 1.4, azar);
    trazo(ctx, [[20, 34], [20, 60], [24, 64]], C.negro, 1.6, azar);
  };

  var ACCESORIOS = [
    { f: aGlobo, claves: ["globo", "globos"] },
    { f: aFiesta, claves: ["fiesta", "cumple", "cumpleanos", "gorro"] },
    { f: aCorona, claves: ["corona", "reina", "rey"] },
    { f: aLazo, claves: ["lazo", "pajarita", "regalo"] },
    { f: aGafas, claves: ["gafas", "lentes", "solgafas"] },
    { f: aBigote, claves: ["bigote", "mostacho"] },
    { f: aGorra, claves: ["gorra", "beisbol"] },
    { f: aBufanda, claves: ["bufanda", "invierno"] },
    { f: aVarita, claves: ["varita", "magia", "mago", "hada"] },
    { f: aParche, claves: ["parche", "pirata"] },
    { f: aBalon, claves: ["balon", "futbol", "pelota"] },
    { f: aAuriculares, claves: ["auriculares", "musica", "cascos"] },
    { f: aCopa, claves: ["copa", "elegante", "caballero"] },
    { f: aGorro, claves: ["gorro", "invierno"] },
    { f: aFlores, claves: ["flores", "primavera"] },
    { f: aMochila, claves: ["mochila", "excursion", "viaje"] },
    { f: aEspada, claves: ["espada", "caballero", "guerrero"] },
    { f: aParaguas, claves: ["paraguas", "lluvia"] }
  ];

  var selloOjo = function (ctx) {
    ctx.fillStyle = "#e8e8f0";
    ctx.fillRect(76, 8, 14, 14);
    ctx.fillStyle = "#07070d";
    ctx.fillRect(78, 10, 10, 10);
    ctx.fillStyle = "#00ffe1";
    ctx.fillRect(80, 12, 6, 6);
    ctx.fillStyle = "#ff2bd1";
    ctx.fillRect(82, 13, 3, 3);
    ctx.fillStyle = "#07070d";
    ctx.fillRect(83, 14, 2, 2);
  };

  var selloEspiral = function (ctx) {
    ctx.strokeStyle = "#07070d";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(83, 15, 5, 0, Math.PI * 1.5);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(83, 15, 2, Math.PI, Math.PI * 2.5);
    ctx.stroke();
    ctx.fillStyle = "#ff2bd1";
    ctx.fillRect(82, 14, 2, 2);
  };

  var selloLlave = function (ctx) {
    ctx.strokeStyle = "#07070d";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(79, 13, 3.5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(82, 16);
    ctx.lineTo(88, 22);
    ctx.stroke();
    ctx.fillStyle = "#07070d";
    ctx.fillRect(85, 18, 2, 2);
    ctx.fillRect(87, 20, 2, 2);
    ctx.fillStyle = "#b6ff3b";
    ctx.fillRect(77, 11, 2, 2);
  };

  var selloDiskette = function (ctx) {
    ctx.fillStyle = "#e8e8f0";
    ctx.fillRect(76, 8, 14, 14);
    ctx.fillStyle = "#07070d";
    ctx.fillRect(78, 10, 10, 4);
    ctx.fillRect(80, 16, 6, 6);
    ctx.fillStyle = "#ff2bd1";
    ctx.fillRect(81, 17, 4, 4);
    ctx.fillStyle = "#07070d";
    ctx.fillRect(79, 11, 2, 2);
  };

  var selloEstrella = function (ctx) {
    ctx.fillStyle = "#ffd93d";
    poligono(ctx, [[83, 7], [85, 13], [91, 13], [86, 17], [88, 23], [83, 19], [78, 23], [80, 17], [75, 13], [81, 13]]);
    ctx.fill();
    ctx.fillStyle = "#ff2bd1";
    ctx.fillRect(82, 13, 2, 2);
  };

  var SECRETOS = [
    { clave: "nosce", sello: selloOjo, marca: "◉" },
    { clave: "kaos", sello: selloEspiral, marca: "◌" },
    { clave: "42", sello: selloEstrella, marca: "✦" },
    { clave: "disquette", sello: selloDiskette, marca: "▣" },
    { clave: "b612", sello: selloLlave, marca: "✚" }
  ];

  var buscarSecreto = function (texto) {
    var t = normalizar(texto);
    for (var i = 0; i < SECRETOS.length; i++) {
      if (t.indexOf(SECRETOS[i].clave) !== -1) {
        return SECRETOS[i];
      }
    }
    return null;
  };

  var CONSEJOS = [
    "todo se guarda en este navegador.",
    "sin cookies ni servidor.",
    "exporta la pared desde MÁS OPCIONES.",
    "pulsa Z en un dibujo para verlo en grande.",
    "arrastra los dibujos para ordenarlos.",
    "cada dibujo tiene una semilla única.",
    "el modo se guarda por dibujo.",
    "clic en un dibujo para corromperlo.",
    "el botón M crea una variación.",
    "el botón de pintar te deja dibujar encima."
  ];

  var corromper = function (texto, azar) {
    var mapa = { a: "4", e: "3", i: "1", o: "0", s: "5", t: "7" };
    return texto.split("").map(function (letra) {
      if (azar() < 0.12 && mapa[letra]) {
        return mapa[letra];
      }
      return letra;
    }).join("");
  };

  var desplazarCanal = function (img, d) {
    var w = img.width;
    var h = img.height;
    var datos = img.data;
    var copia = new Uint8ClampedArray(w);
    var x;
    var y;
    var base;
    for (y = 0; y < h; y++) {
      base = y * w * 4;
      for (x = 0; x < w; x++) {
        copia[x] = datos[base + x * 4];
      }
      for (x = 0; x < w; x++) {
        var origen = x + d;
        if (origen >= 0 && origen < w) {
          datos[base + x * 4] = copia[origen];
        }
      }
    }
    for (y = 0; y < h; y++) {
      base = y * w * 4;
      for (x = 0; x < w; x++) {
        copia[x] = datos[base + x * 4 + 2];
      }
      for (x = 0; x < w; x++) {
        var origenB = x - d;
        if (origenB >= 0 && origenB < w) {
          datos[base + x * 4 + 2] = copia[origenB];
        }
      }
    }
  };

  var desplazarFilas = function (img, y0, alto, dx) {
    var w = img.width;
    var datos = img.data;
    for (var y = y0; y < y0 + alto && y < img.height; y++) {
      var base = y * w * 4;
      var fila = new Uint8ClampedArray(w * 4);
      fila.set(datos.subarray(base, base + w * 4));
      for (var x = 0; x < w; x++) {
        var origen = x - dx;
        if (origen >= 0 && origen < w) {
          datos[base + x * 4] = fila[origen * 4];
          datos[base + x * 4 + 1] = fila[origen * 4 + 1];
          datos[base + x * 4 + 2] = fila[origen * 4 + 2];
          datos[base + x * 4 + 3] = fila[origen * 4 + 3];
        }
      }
    }
  };

  var ordenarPixel = function (lienzo, azar) {
    var ctx = lienzo.getContext("2d");
    var w = lienzo.width;
    var h = lienzo.height;
    var img = ctx.getImageData(0, 0, w, h);
    var d = img.data;
    var y0 = Math.floor(azar() * h);
    var alto = 2 + Math.floor(azar() * 6);
    for (var y = y0; y < y0 + alto && y < h; y++) {
      var base = y * w * 4;
      var fila = [];
      for (var x = 0; x < w; x++) {
        fila.push([d[base + x * 4], d[base + x * 4 + 1], d[base + x * 4 + 2], d[base + x * 4 + 3]]);
      }
      fila.sort(function (a, b) {
        return (a[0] + a[1] + a[2]) - (b[0] + b[1] + b[2]);
      });
      for (x = 0; x < w; x++) {
        d[base + x * 4] = fila[x][0];
        d[base + x * 4 + 1] = fila[x][1];
        d[base + x * 4 + 2] = fila[x][2];
        d[base + x * 4 + 3] = fila[x][3];
      }
    }
    ctx.putImageData(img, 0, 0);
  };

  var bloqueSwap = function (lienzo, azar) {
    var ctx = lienzo.getContext("2d");
    var w = lienzo.width;
    var h = lienzo.height;
    var bloqueW = 8 + Math.floor(azar() * 20);
    var bloqueH = 8 + Math.floor(azar() * 20);
    var x1 = Math.floor(azar() * Math.max(1, w - bloqueW));
    var y1 = Math.floor(azar() * Math.max(1, h - bloqueH));
    var x2 = Math.floor(azar() * Math.max(1, w - bloqueW));
    var y2 = Math.floor(azar() * Math.max(1, h - bloqueH));
    var copia = ctx.getImageData(x1, y1, bloqueW, bloqueH);
    var destino = ctx.getImageData(x2, y2, bloqueW, bloqueH);
    ctx.putImageData(copia, x2, y2);
    ctx.putImageData(destino, x1, y1);
  };

  var glitch = function (lienzo, azar, nivel) {
    var ctx = lienzo.getContext("2d");
    var w = lienzo.width;
    var h = lienzo.height;
    var img = ctx.getImageData(0, 0, w, h);
    if (nivel >= 1) {
      desplazarCanal(img, 1 + Math.floor(azar() * 2));
    }
    var bandas = 2 + Math.floor(azar() * (nivel ? 9 : 4));
    for (var b = 0; b < bandas; b++) {
      var y = Math.floor(azar() * h);
      var alto = 1 + Math.floor(azar() * (nivel ? 7 : 3));
      var dx = Math.floor(azar() * 11) - 5;
      if (nivel === 0) {
        dx = dx > 0 ? 2 : -2;
      }
      if (dx) {
        desplazarFilas(img, y, alto, dx);
      }
    }
    ctx.putImageData(img, 0, 0);
    if (nivel >= 1 && azar() < 0.45) {
      if (azar() < 0.5) {
        ordenarPixel(lienzo, azar);
      } else {
        bloqueSwap(lienzo, azar);
      }
    }
    var puntos = Math.floor(w * h * (nivel ? 0.02 : 0.006));
    for (var p = 0; p < puntos; p++) {
      ctx.fillStyle = azar() < 0.5 ? "#ff2bd1" : "#00ffe1";
      ctx.fillRect(Math.floor(azar() * w), Math.floor(azar() * h), 1, 1);
    }
    if (nivel === 2) {
      if (azar() < 0.6) {
        ctx.globalAlpha = 0.3;
        ctx.drawImage(lienzo, Math.floor(azar() * 7) - 3, Math.floor(azar() * 7) - 3);
        ctx.globalAlpha = 1;
      }
      if (azar() < 0.3) {
        ctx.fillStyle = "rgba(255,43,209,0.22)";
        ctx.fillRect(0, 0, w, Math.floor(azar() * h));
      }
    }
  };

  var buscarCoincidencias = function (texto, lista) {
    var t = normalizar(texto);
    var hallados = [];
    lista.forEach(function (entrada) {
      for (var i = 0; i < entrada.claves.length; i++) {
        if (t.indexOf(normalizar(entrada.claves[i])) !== -1) {
          hallados.push(entrada);
          return;
        }
      }
    });
    return hallados;
  };

  var medidasDe = function (registro) {
    var f = hash((registro.s || "") + "|formato") % 10;
    if (f >= 9) {
      return { w: 96, h: 96 };
    }
    if (f >= 7) {
      return { w: 120, h: 96 };
    }
    return { w: 96, h: 120 };
  };

  var temporadaActual = function () {
    var hoy = new Date();
    var mes = hoy.getMonth() + 1;
    var dia = hoy.getDate();
    if ((mes === 10 && dia >= 20) || (mes === 11 && dia <= 2)) {
      return "halloween";
    }
    if ((mes === 12 && dia >= 10) || (mes === 1 && dia <= 6)) {
      return "navidad";
    }
    if (mes === 9) {
      return "cole";
    }
    if (mes >= 6 && mes <= 8) {
      return "playa";
    }
    return null;
  };

  var escenaCumple = function (ctx, azar) {
    var colores = [C.rojo, C.amarillo, C.verde, C.azul, C.morado];
    for (var i = 0; i < 18; i++) {
      ctx.fillStyle = colores[Math.floor(azar() * colores.length)];
      ctx.fillRect(azar() * 96, azar() * 84, 2, 2);
    }
    aGlobo(ctx, azar);
    aGlobo(ctx, azar);
    dTarta(ctx, azar);
    circulo(ctx, 16, 20, 5, C.rojo);
    circulo(ctx, 82, 30, 4, C.azul);
  };

  var escenaPlaya = function (ctx, azar) {
    fPlaya(ctx, azar);
    relleno(ctx, [[36, 104], [36, 86], [44, 86], [44, 78], [54, 78], [54, 86], [62, 86], [62, 104]], "#e0c37a", azar);
    trazo(ctx, [[32, 104], [66, 104]], C.negro, 1.6, azar);
    trazo(ctx, [[40, 86], [40, 78], [48, 74], [56, 78], [56, 86]], C.negro, 1.3, azar);
    circulo(ctx, 80, 100, 5, C.rojo);
    trazo(ctx, [[75, 97], [85, 103]], C.negro, 1, azar);
  };

  var escenaEspacio = function (ctx, azar) {
    fEspacio(ctx, azar);
    ctx.save();
    ctx.translate(62, 72);
    ctx.scale(0.55, 0.55);
    ctx.translate(-48, -60);
    dCohete(ctx, azar);
    ctx.restore();
    ctx.save();
    ctx.translate(26, 92);
    ctx.scale(0.5, 0.5);
    ctx.translate(-48, -60);
    dOvni(ctx, azar);
    ctx.restore();
  };

  var escenaCole = function (ctx, azar) {
    fCole(ctx, azar);
    relleno(ctx, [[28, 96], [70, 96], [70, 100], [28, 100]], C.marron, azar);
    trazo(ctx, [[32, 96], [32, 82]], C.marron, 2, azar);
    trazo(ctx, [[66, 96], [66, 82]], C.marron, 2, azar);
    relleno(ctx, [[42, 84], [58, 84], [58, 94], [42, 94]], C.amarillo, azar);
    trazo(ctx, [[42, 84], [58, 84], [58, 94], [42, 94], [42, 84]], C.negro, 1.4, azar);
    var lapices = [C.rojo, C.azul, C.verde, C.amarillo];
    for (var i = 0; i < 4; i++) {
      var x = 22 + i * 7;
      trazo(ctx, [[x, 114], [x + 2, 106]], lapices[i], 2, azar);
    }
  };

  var escenaHalloween = function (ctx, azar) {
    estrellitas(ctx, azar, 7);
    aro(ctx, 78, 22, 9, C.amarillo, 1.6, azar);
    ctx.fillStyle = C.naranja;
    ctx.beginPath();
    ctx.ellipse(44, 78, 20, 17, 0, 0, Math.PI * 2);
    ctx.fill();
    trazo(ctx, [[44, 61], [40, 52]], C.verde, 2.4, azar);
    aro(ctx, 44, 78, 20, C.negro, 1.8, azar);
    trazo(ctx, [[28, 78], [34, 78]], C.negro, 2, azar);
    trazo(ctx, [[54, 78], [60, 78]], C.negro, 2, azar);
    relleno(ctx, [[36, 86], [52, 86], [48, 92], [40, 92]], C.negro);
    ctx.save();
    ctx.translate(78, 94);
    ctx.scale(0.45, 0.45);
    ctx.translate(-48, -40);
    cFantasma(ctx, azar);
    ctx.restore();
  };

  var escenaNavidad = function (ctx, azar) {
    for (var i = 0; i < 22; i++) {
      circulo(ctx, azar() * 96, azar() * 120, 1 + azar(), "#ffffff");
    }
    relleno(ctx, [[48, 22], [30, 52], [66, 52]], C.verde);
    relleno(ctx, [[48, 40], [24, 76], [72, 76]], C.verde);
    relleno(ctx, [[48, 58], [18, 98], [78, 98]], C.verde);
    trazo(ctx, [[44, 98], [44, 108], [52, 108], [52, 98]], C.marron, 2, azar);
    var bolas = [C.rojo, C.amarillo, C.azul];
    for (var d = 0; d < 8; d++) {
      circulo(ctx, 28 + azar() * 40, 34 + azar() * 58, 2, bolas[Math.floor(azar() * 3)]);
    }
    circulo(ctx, 48, 18, 4, C.amarillo);
    relleno(ctx, [[8, 100], [30, 100], [30, 116], [8, 116]], C.rojo);
    trazo(ctx, [[19, 100], [19, 116]], C.amarillo, 1.6, azar);
    trazo(ctx, [[8, 108], [30, 108]], C.amarillo, 1.6, azar);
    relleno(ctx, [[64, 104], [84, 104], [84, 116], [64, 116]], C.azul);
    trazo(ctx, [[74, 104], [74, 116]], C.blanco, 1.6, azar);
  };

  var ESCENAS = [
    { clave: "cumple", f: escenaCumple, claves: ["cumple", "cumpleanos", "tarta de cumple"] },
    { clave: "playa", f: escenaPlaya, claves: ["playa", "verano", "vacaciones"] },
    { clave: "espacio", f: escenaEspacio, claves: ["espacio", "galaxia", "cosmos"] },
    { clave: "cole", f: escenaCole, claves: ["colegio", "cole", "clase", "pizarra"] },
    { clave: "halloween", f: escenaHalloween, claves: ["halloween", "calabaza", "terror"] },
    { clave: "navidad", f: escenaNavidad, claves: ["navidad", "papa noel", "arbol de navidad", "regalos"] }
  ];

  var buscarEscena = function (texto) {
    var t = normalizar(texto);
    for (var i = 0; i < ESCENAS.length; i++) {
      for (var c = 0; c < ESCENAS[i].claves.length; c++) {
        if (t.indexOf(normalizar(ESCENAS[i].claves[c])) !== -1) {
          return ESCENAS[i];
        }
      }
    }
    return null;
  };

  var escenaDe = function (clave) {
    for (var i = 0; i < ESCENAS.length; i++) {
      if (ESCENAS[i].clave === clave) {
        return ESCENAS[i];
      }
    }
    return null;
  };

  var dibujarMezcla = function (ctx, azar, registro) {
    var mitad = 48;
    ctx.save();
    poligono(ctx, [[mitad, 0], [96, 0], [96, 120], [mitad, 120]]);
    ctx.clip();
    ctx.fillStyle = "#f8f8f4";
    ctx.fillRect(mitad, 0, 96 - mitad, 120);
    ctx.strokeStyle = "rgba(120,150,210,0.55)";
    ctx.lineWidth = 0.8;
    for (var y = 10; y < 120; y += 8) {
      ctx.beginPath();
      ctx.moveTo(mitad, y);
      ctx.lineTo(96, y);
      ctx.stroke();
    }
    ctx.restore();
    var onda = [];
    for (var oy = 0; oy <= 120; oy += 8) {
      onda.push([mitad + Math.sin(oy / 14) * 3, oy]);
    }
    trazoBoli(ctx, onda, azar, 1.2);
    var nino = buscarCoincidencias(registro.p, CATALOGO)[0] || CATALOGO[Math.floor(azar() * CATALOGO.length)];
    ctx.save();
    ctx.translate(24, 60);
    ctx.scale(0.66, 0.66);
    ctx.translate(-48, -60);
    nino.f(ctx, azar);
    ctx.restore();
    var boli = buscarCoincidencias(registro.p, CATALOGO_BOLI)[0] || CATALOGO_BOLI[Math.floor(azar() * CATALOGO_BOLI.length)];
    ctx.save();
    ctx.translate(72, 60);
    ctx.scale(0.66, 0.66);
    ctx.translate(-48, -60);
    boli.f(ctx, azar);
    ctx.restore();
  };

  var pintarDibujo = function (registro) {
    var med = medidasDe(registro);
    L = med.w;
    A = med.h;
    var azar = sorteador(hash(registro.s));
    perfilActual = PERFILES[Math.floor(azar() * PERFILES.length)];
    var lienzo = document.createElement("canvas");
    lienzo.width = L;
    lienzo.height = A;
    var ctx = lienzo.getContext("2d");
    var secreto = buscarSecreto(registro.p);
    if (registro.m === "a") {
      return pintarBoli(registro, azar, lienzo, ctx, secreto);
    }
    papel(ctx, azar);
    doodles(ctx, azar);
    var perdido = azar() < 0.06;
    if (perdido) {
      for (var s = 0; s < 900; s++) {
        var dado = azar();
        ctx.fillStyle = dado < 0.45 ? "#0b0b12" : (dado < 0.72 ? "#00ffe1" : "#ff2bd1");
        ctx.fillRect(Math.floor(azar() * L), Math.floor(azar() * A), 1, 1);
      }
      return { lienzo: lienzo, perdido: true, secreto: null };
    }
    var fondoForzado = buscarCoincidencias(registro.p, FONDOS_CLAVES)[0];
    var sujetos = buscarCoincidencias(registro.p, CATALOGO);
    var texto = normalizar(registro.p);
    var esMezcla = texto.indexOf("mezcla") !== -1;
    var esQuimera = texto.indexOf("quimera") !== -1 || texto.indexOf("experimento") !== -1;
    var escena = buscarEscena(registro.p) || escenaDe(registro.e);
    var partes = {};
    sujetos.forEach(function (entrada) {
      if (entrada.parte) {
        if (entrada.parte.cabeza && !partes.cabeza) {
          partes.cabeza = entrada.parte.cabeza;
        }
        if (entrada.parte.cuerpo && !partes.cuerpo) {
          partes.cuerpo = entrada.parte.cuerpo;
        }
      }
    });
    var hacerQuimera = esQuimera || (sujetos.length > 1 && (partes.cabeza || partes.cuerpo)) || (!sujetos.length && azar() < 0.18);
    var CW = L;
    var CH = A;
    var esc = Math.min(CW / 96, CH / 120);
    var dx = (CW - 96 * esc) / 2;
    var dy = (CH - 120 * esc) / 2;
    L = 96;
    A = 120;
    ctx.save();
    ctx.translate(dx, dy);
    ctx.scale(esc, esc);
    if (esMezcla) {
      dibujarMezcla(ctx, azar, registro);
    } else if (escena) {
      escena.f(ctx, azar);
    } else if (hacerQuimera) {
      if (fondoForzado) {
        partes.fondo = fondoForzado.f;
      }
      quimera(ctx, azar, partes);
    } else {
      if (!sujetos.length) {
        sujetos = [CATALOGO[Math.floor(azar() * CATALOGO.length)]];
      }
      if (fondoForzado) {
        fondoForzado.f(ctx, azar);
      } else if (azar() < 0.35) {
        FONDOS[Math.floor(azar() * FONDOS.length)](ctx, azar);
      }
      sujetos[0].f(ctx, azar);
      if (sujetos.length > 1) {
        var mini = document.createElement("canvas");
        mini.width = 96;
        mini.height = 120;
        var ctxMini = mini.getContext("2d");
        papel(ctxMini, azar);
        sujetos[1].f(ctxMini, azar);
        ctx.fillStyle = "#0b0b12";
        ctx.fillRect(60, 76, 34, 40);
        ctx.drawImage(mini, 62, 78, 30, 36);
      }
    }
    if (!esMezcla && !escena) {
      var accesoriosEncontrados = buscarCoincidencias(registro.p, ACCESORIOS);
      if (!accesoriosEncontrados.length && azar() < 0.35) {
        accesoriosEncontrados = [ACCESORIOS[Math.floor(azar() * ACCESORIOS.length)]];
      }
      accesoriosEncontrados.forEach(function (accesorio) {
        accesorio.f(ctx, azar);
      });
    }
    if (secreto) {
      secreto.sello(ctx);
    }
    ctx.restore();
    L = CW;
    A = CH;
    rotular(ctx, registro.p, azar);
    if (!modoLimpio) {
      clima(ctx, azar);
    }
    var nivel = Math.min(2, (registro.n || 0) + (azar() < 0.25 ? 1 : 0));
    if (secreto) {
      nivel = 2;
    }
    if (!modoLimpio) {
      glitch(lienzo, azar, nivel);
      if (azar() < 0.22) {
        var espejo = document.createElement("canvas");
        espejo.width = L;
        espejo.height = A;
        var ctxEspejo = espejo.getContext("2d");
        ctxEspejo.translate(L, 0);
        ctxEspejo.scale(-1, 1);
        ctxEspejo.drawImage(lienzo, 0, 0);
        ctx.clearRect(0, 0, L, A);
        ctx.drawImage(espejo, 0, 0);
      }
      recolorear(lienzo, azar);
      modos(lienzo, azar);
    }
    enmarcar(lienzo, azar);
    firmarSellar(ctx, azar);
    if (registro.t && registro.t.length) {
      registro.t.forEach(function (capa) {
        if (!capa || !capa.p) {
          return;
        }
        ctx.fillStyle = capa.c || "#ff2bd1";
        for (var i = 0; i < capa.p.length; i += 2) {
          ctx.fillRect(capa.p[i], capa.p[i + 1], 1, 1);
        }
      });
    }
    return { lienzo: lienzo, perdido: false, secreto: secreto };
  };

  var pared = $("[data-pared]");
  if (!pared) {
    return;
  }

  var CLAVE = "zetetica-pared";
  var MAXIMO = 120;
  var registros = [];
  var nivelBase = 1;
  var NIVELES = ["POCO", "NORMAL", "BRUTAL"];
  var paredCompartida = false;
  var contadorGeneraciones = 0;
  var modoActual = "n";
  try {
    modoActual = localStorage.getItem("garabato-modo") === "a" ? "a" : "n";
  } catch (error) {
    modoActual = "n";
  }

  var leerRegistros = function () {
    try {
      var crudo = localStorage.getItem(CLAVE);
      var datos = crudo ? JSON.parse(crudo) : [];
      return Array.isArray(datos) ? datos : [];
    } catch (error) {
      return [];
    }
  };

  var guardarRegistros = function () {
    if (paredCompartida) {
      return;
    }
    try {
      localStorage.setItem(CLAVE, JSON.stringify(registros.slice(0, MAXIMO)));
    } catch (error) {
      return;
    }
  };

  var actualizarTotales = function () {
    var texto = ("000" + registros.length).slice(-3);
    $$("[data-total]").forEach(function (nodo) {
      nodo.textContent = texto;
    });
  };

  var melodias = [262, 294, 330, 392, 440, 523, 587, 659];
  var ultimoSonido = 0;

  var melodiaDe = function (registro) {
    if (!window.ZETETICA_SONIDO) {
      return;
    }
    var ahora = Date.now();
    if (ahora - ultimoSonido < 700) {
      return;
    }
    ultimoSonido = ahora;
    var azar = sorteador(hash(registro.s + "melodia"));
    var base = melodias[Math.floor(azar() * melodias.length)];
    var notas = [base, base * (azar() < 0.5 ? 1.25 : 1.2), base * 1.5];
    notas.forEach(function (nota, i) {
      window.setTimeout(function () {
        window.ZETETICA_SONIDO(Math.round(nota), 0.07);
      }, i * 90);
    });
  };

  var crearTile = function (registro) {
    var figura = document.createElement("figure");
    figura.className = "dibujo" + (registro.pin ? " pin" : "");
    figura.setAttribute("data-seg", registro.s);
    figura.title = registro.p + (registro.padre ? " // hijo de: " + registro.padre.p : "");
    figura.tabIndex = 0;
    figura.setAttribute("role", "group");
    var azarGiro = sorteador(hash(registro.s + "giro"));
    var giro = (azarGiro() - 0.5) * 5;
    if (azarGiro() < 0.06) {
      giro += 180;
    }
    figura.style.transform = "rotate(" + giro.toFixed(2) + "deg)";
    var lienzo = document.createElement("canvas");
    var med = medidasDe(registro);
    lienzo.width = med.w;
    lienzo.height = med.h;
    lienzo.setAttribute("aria-label", registro.p);
    figura.appendChild(lienzo);
    var acciones = document.createElement("div");
    acciones.className = "acciones-tile";
    var botones = [
      ["✎", "pintar encima", function () { abrirEditor(registro); }],
      ["M", "mutar // engendrar variación", function () { mutarRegistro(registro); }],
      ["P", "fijar arriba", function () { alternarPin(registro); }],
      ["Z", "ver en grande", function () { abrirZoom(registro); }],
      ["X", "tirar a la papelera", function () { tirarAPapelera(registro); }]
    ];
    botones.forEach(function (def) {
      var boton = document.createElement("button");
      boton.type = "button";
      boton.className = "mini";
      boton.textContent = def[0];
      boton.title = def[1];
      boton.addEventListener("click", function (evento) {
        evento.stopPropagation();
        def[2]();
      });
      acciones.appendChild(boton);
    });
    figura.appendChild(acciones);
    var secreto = buscarSecreto(registro.p);
    var pie = document.createElement("figcaption");
    var marcas = "";
    if (registro.g) {
      marcas += "g" + registro.g + " ";
    }
    if (secreto) {
      marcas += secreto.marca + " ";
    }
    pie.textContent = marcas + corromper(registro.p, sorteador(hash(registro.s + "pie")));
    figura.appendChild(pie);
    figura.addEventListener("click", function () {
      glitch(lienzo, sorteador(hash(registro.s + "clic" + Date.now())), 2);
      bleepMini();
    });
    figura.addEventListener("mouseenter", function () {
      melodiaDe(registro);
    });
    figura.addEventListener("keydown", function (evento) {
      if (evento.key === "Enter") {
        abrirZoom(registro);
      }
    });
    figura.setAttribute("draggable", "true");
    figura.addEventListener("dragstart", function (evento) {
      arrastrada = figura;
      figura.classList.add("arrastrando");
      if (evento.dataTransfer) {
        try {
          evento.dataTransfer.setData("text/plain", registro.s);
        } catch (error) {
          return;
        }
      }
    });
    figura.addEventListener("dragend", function () {
      figura.classList.remove("arrastrando");
      arrastrada = null;
    });
    figura.addEventListener("dragover", function (evento) {
      evento.preventDefault();
    });
    figura.addEventListener("drop", function (evento) {
      manejarSoltar(evento, figura);
    });
    programarRender(figura, registro);
    return figura;
  };

  var bleepMini = function () {
    if (window.ZETETICA_SONIDO) {
      window.ZETETICA_SONIDO(340, 0.05);
    }
  };

  var pintarTodo = function () {
    pared.textContent = "";
    colaRender = [];
    loteEnCurso = false;
    registros.forEach(function (registro) {
      pared.appendChild(crearTile(registro));
    });
    actualizarTotales();
  };

  var fechaISO = function () {
    var hoy = new Date();
    var mes = ("0" + (hoy.getMonth() + 1)).slice(-2);
    var dia = ("0" + hoy.getDate()).slice(-2);
    return hoy.getFullYear() + "-" + mes + "-" + dia;
  };

  var registrosDia = function () {
    var semilla = "garabato-global-" + fechaISO();
    var azar = sorteador(hash(semilla));
    var cantidad = 2 + Math.floor(azar() * 2);
    var lista = [];
    var temporada = temporadaActual();
    for (var i = 0; i < cantidad; i++) {
      var sujeto = CATALOGO[Math.floor(azar() * CATALOGO.length)];
      var frases = [sujeto.titulo];
      if (azar() < 0.35) {
        var accesorio = ACCESORIOS[Math.floor(azar() * ACCESORIOS.length)];
        frases.push("y " + accesorio.claves[0]);
      }
      var escenaDia = null;
      if (temporada && azar() < 0.3) {
        escenaDia = temporada;
      }
      lista.push({
        p: frases.join(" "),
        s: semilla + "#" + i,
        n: 1,
        m: "n",
        e: escenaDia
      });
    }
    return lista;
  };

  var crearTileDia = function (registro) {
    var med = medidasDe(registro);
    var resultado = pintarDibujo(registro);
    var figura = document.createElement("figure");
    figura.className = "dibujo dia";
    figura.setAttribute("data-seg", registro.s);
    figura.title = registro.p + " // dibujo del dia";
    var lienzo = document.createElement("canvas");
    lienzo.width = med.w;
    lienzo.height = med.h;
    lienzo.setAttribute("aria-label", registro.p);
    var ctx = lienzo.getContext("2d");
    ctx.drawImage(resultado.lienzo, 0, 0);
    figura.appendChild(lienzo);
    var azarGiro = sorteador(hash(registro.s + "giro"));
    var giro = (azarGiro() - 0.5) * 5;
    figura.style.transform = "rotate(" + giro.toFixed(2) + "deg)";
    var pie = document.createElement("figcaption");
    pie.textContent = "hoy :: " + corromper(registro.p, sorteador(hash(registro.s + "pie")));
    figura.appendChild(pie);
    figura.addEventListener("click", function () {
      glitch(lienzo, sorteador(hash(registro.s + "clic" + Date.now())), 2);
      bleepMini();
    });
    return figura;
  };

  var pintarDia = function () {
    var capa = $("[data-pared-dia]");
    if (!capa) {
      return;
    }
    capa.textContent = "";
    try {
      registrosDia().forEach(function (registro) {
        capa.appendChild(crearTileDia(registro));
      });
    } catch (error) {
      if (window.console && window.console.error) {
        window.console.error("fallo en dibujos del dia:", error);
      }
    }
  };

  var pintarComun = function () {
    var capa = $("[data-pared-comun]");
    var titulo = $("[data-comun-titulo]");
    if (!capa) {
      return;
    }
    var ocultar = function () {
      if (titulo) {
        titulo.style.display = "none";
      }
      capa.style.display = "none";
    };
    fetch("/api/pared")
      .then(function (respuesta) {
        if (!respuesta.ok) {
          throw new Error("sin pared común");
        }
        return respuesta.json();
      })
      .then(function (datos) {
        if (!datos || !datos.ok || !Array.isArray(datos.dibujos) || !datos.dibujos.length) {
          ocultar();
          return;
        }
        capa.textContent = "";
        try {
          datos.dibujos.reverse().forEach(function (item) {
            if (!item || !item.img) {
              return;
            }
            var figura = document.createElement("figure");
            figura.className = "dibujo comun";
            figura.title = item.p || "sin título";
            var lienzo = document.createElement("canvas");
            lienzo.width = 96;
            lienzo.height = 120;
            lienzo.setAttribute("aria-label", item.p || "");
            figura.appendChild(lienzo);
            var imagen = new window.Image();
            imagen.onload = function () {
              lienzo.width = imagen.naturalWidth;
              lienzo.height = imagen.naturalHeight;
              lienzo.getContext("2d").drawImage(imagen, 0, 0);
            };
            imagen.src = item.img;
            var pie = document.createElement("figcaption");
            var fechaCorta = (item.f || "").slice(5, 10).replace("-", "/");
            pie.textContent = (item.p || "sin título") + (fechaCorta ? " · " + fechaCorta : "");
            figura.appendChild(pie);
            capa.appendChild(figura);
          });
        } catch (error) {
          ocultar();
        }
      })
      .catch(ocultar);
  };

  var nuevaSemilla = function (prompt) {
    return prompt + "#" + Math.random().toString(36).slice(2, 10);
  };

  var agregarGeneracion = function (texto) {
    var prompt = String(texto || "").trim();
    if (!prompt) {
      prompt = promptAleatorio();
    }
    paredCompartida = false;
    var secreto = buscarSecreto(prompt);
    var temporada = temporadaActual();
    var escenaTemp = temporada && Math.random() < 0.35 ? temporada : null;
    registros.unshift({
      p: prompt.slice(0, 60),
      s: nuevaSemilla(prompt),
      n: secreto ? 2 : nivelBase,
      m: modoActual,
      e: escenaTemp,
      f: new Date().toLocaleString("es-ES")
    });
    contadorGeneraciones += 1;
    if (secreto) {
      marcarSello(secreto);
    } else if (contadorGeneraciones % 6 === 0) {
      mostrarVirus(CONSEJOS[Math.floor(Math.random() * CONSEJOS.length)]);
    }
    if (registros.length > MAXIMO) {
      registros = registros.slice(0, MAXIMO);
    }
    guardarRegistros();
    var tile = crearTile(registros[0]);
    if (pared.firstChild) {
      pared.insertBefore(tile, pared.firstChild);
    } else {
      pared.appendChild(tile);
    }
    if (registros.length >= MAXIMO && pared.lastChild) {
      pared.removeChild(pared.lastChild);
    }
    actualizarTotales();
    var ultima = $("[data-ultima]");
    if (ultima) {
      ultima.textContent = "\"" + prompt + "\"";
    }
    var campo = $("[data-prompt]");
    if (campo) {
      campo.value = "";
      campo.focus();
    }
  };

  var COLORES_PINTURA = ["#1a1a22", "#ff4d4d", "#ff9f1c", "#ffd93d", "#6bcb77", "#4d96ff", "#b983ff", "#ff8fab", "#faf6ea"];
  var editor = null;
  var botonAuto = null;

  var mutarRegistro = function (registro) {
    registros.unshift({
      p: registro.p,
      s: nuevaSemilla(registro.p),
      n: registro.n || nivelBase,
      g: (registro.g || 0) + 1,
      m: registro.m || "n",
      e: registro.e || null,
      padre: { p: registro.p, s: registro.s, g: registro.g || 0 },
      f: new Date().toLocaleString("es-ES")
    });
    if (registros.length > MAXIMO) {
      registros = registros.slice(0, MAXIMO);
    }
    guardarRegistros();
    var tile = crearTile(registros[0]);
    if (pared.firstChild) {
      pared.insertBefore(tile, pared.firstChild);
    } else {
      pared.appendChild(tile);
    }
    actualizarTotales();
    mostrarVirus("variación creada.");
  };

  var CLAVE_SELLOS = "zetetica-sellos";
  var sellosHallados = [];
  try {
    sellosHallados = JSON.parse(localStorage.getItem(CLAVE_SELLOS) || "[]") || [];
  } catch (error) {
    sellosHallados = [];
  }
  var cajaSellos = $("[data-sellos]");

  var pintarSellos = function () {
    if (!cajaSellos) {
      return;
    }
    cajaSellos.textContent = "";
    SECRETOS.forEach(function (secreto) {
      var puntoSello = document.createElement("span");
      if (sellosHallados.indexOf(secreto.clave) !== -1) {
        puntoSello.className = "hallado";
      }
      cajaSellos.appendChild(puntoSello);
    });
  };

  var tiempoVirus = null;
  var avisoVirus = null;

  var mostrarVirus = function (texto) {
    if (!avisoVirus) {
      avisoVirus = document.createElement("div");
      avisoVirus.className = "virus-dice";
      document.body.appendChild(avisoVirus);
    }
    avisoVirus.textContent = "> " + texto;
    avisoVirus.classList.add("visible");
    window.clearTimeout(tiempoVirus);
    tiempoVirus = window.setTimeout(function () {
      avisoVirus.classList.remove("visible");
    }, 6000);
  };

  var marcarSello = function (secreto) {
    if (!secreto || sellosHallados.indexOf(secreto.clave) !== -1) {
      return;
    }
    sellosHallados.push(secreto.clave);
    try {
      localStorage.setItem(CLAVE_SELLOS, JSON.stringify(sellosHallados));
    } catch (error) {
      return;
    }
    pintarSellos();
    mostrarVirus("has encontrado un sello. quedan " + (SECRETOS.length - sellosHallados.length) + ".");
  };

  var construirEditor = function () {
    var capa = document.createElement("div");
    capa.className = "editor";
    capa.setAttribute("aria-hidden", "true");
    capa.innerHTML = "<div class=\"editor-marco\"><div class=\"editor-barra\"><span>PINTAR ENCIMA :: <span data-editor-titulo></span></span><button class=\"t-salir\" type=\"button\" data-editor-cerrar>[ CERRAR ]</button></div><canvas width=\"384\" height=\"480\" data-editor-lienzo></canvas><div class=\"editor-pie\"><div class=\"editor-paleta\" data-editor-paleta></div><div class=\"controles\"><button class=\"boton claro\" type=\"button\" data-editor-deshacer>DESHACER</button><button class=\"boton\" type=\"button\" data-editor-guardar>GUARDAR</button></div></div></div>";
    document.body.appendChild(capa);
    var lienzoEditor = $("[data-editor-lienzo]", capa);
    var ctxEditor = lienzoEditor.getContext("2d");
    var paleta = $("[data-editor-paleta]", capa);
    var estado = {
      capa: capa,
      lienzo: lienzoEditor,
      ctx: ctxEditor,
      titulo: $("[data-editor-titulo]", capa),
      registro: null,
      trazos: [],
      color: COLORES_PINTURA[0],
      med: { w: 96, h: 120 }
    };

    COLORES_PINTURA.forEach(function (color) {
      var botonColor = document.createElement("button");
      botonColor.type = "button";
      botonColor.style.background = color;
      botonColor.setAttribute("aria-label", color);
      botonColor.addEventListener("click", function () {
        estado.color = color;
        Array.prototype.forEach.call(paleta.children, function (hijo) {
          hijo.setAttribute("aria-pressed", String(hijo === botonColor));
        });
      });
      paleta.appendChild(botonColor);
    });

    var pintarEditor = function () {
      ctxEditor.imageSmoothingEnabled = false;
      var base = pintarDibujo(estado.registro);
      ctxEditor.clearRect(0, 0, lienzoEditor.width, lienzoEditor.height);
      ctxEditor.drawImage(base.lienzo, 0, 0, lienzoEditor.width, lienzoEditor.height);
      estado.trazos.forEach(function (capaTrazo) {
        ctxEditor.fillStyle = capaTrazo.c;
        for (var i = 0; i < capaTrazo.p.length; i += 2) {
          ctxEditor.fillRect(capaTrazo.p[i] * 4, capaTrazo.p[i + 1] * 4, 4, 4);
        }
      });
    };
    estado.pintar = pintarEditor;

    var coordenadas = function (evento) {
      var caja = lienzoEditor.getBoundingClientRect();
      var anchoMed = estado.med.w;
      var altoMed = estado.med.h;
      var x = Math.floor(((evento.clientX - caja.left) / caja.width) * anchoMed);
      var y = Math.floor(((evento.clientY - caja.top) / caja.height) * altoMed);
      return [Math.max(0, Math.min(anchoMed - 1, x)), Math.max(0, Math.min(altoMed - 1, y))];
    };

    var trazoActual = null;
    var pintando = false;

    lienzoEditor.addEventListener("pointerdown", function (evento) {
      evento.preventDefault();
      pintando = true;
      trazoActual = { c: estado.color, p: [] };
      estado.trazos.push(trazoActual);
      var xy = coordenadas(evento);
      trazoActual.p.push(xy[0], xy[1]);
      ctxEditor.fillStyle = estado.color;
      ctxEditor.fillRect(xy[0] * 4, xy[1] * 4, 4, 4);
    });
    lienzoEditor.addEventListener("pointermove", function (evento) {
      if (!pintando || !trazoActual) {
        return;
      }
      var xy = coordenadas(evento);
      var n = trazoActual.p.length;
      if (n >= 2 && trazoActual.p[n - 2] === xy[0] && trazoActual.p[n - 1] === xy[1]) {
        return;
      }
      trazoActual.p.push(xy[0], xy[1]);
      ctxEditor.fillStyle = estado.color;
      ctxEditor.fillRect(xy[0] * 4, xy[1] * 4, 4, 4);
    });
    var soltar = function () {
      pintando = false;
      trazoActual = null;
    };
    lienzoEditor.addEventListener("pointerup", soltar);
    lienzoEditor.addEventListener("pointerleave", soltar);

    $("[data-editor-deshacer]", capa).addEventListener("click", function () {
      estado.trazos.pop();
      pintarEditor();
    });
    $("[data-editor-cerrar]", capa).addEventListener("click", function () {
      capa.classList.remove("abierto");
      capa.setAttribute("aria-hidden", "true");
    });
    $("[data-editor-guardar]", capa).addEventListener("click", function () {
      var registro = estado.registro;
      registro.t = estado.trazos.map(function (capaTrazo) {
        return { c: capaTrazo.c, p: capaTrazo.p.slice(0, 400) };
      }).slice(-12);
      guardarRegistros();
      actualizarTile(registro);
      capa.classList.remove("abierto");
      capa.setAttribute("aria-hidden", "true");
      mostrarVirus("pintura guardada.");
    });
    return estado;
  };

  var abrirEditor = function (registro) {
    if (!editor) {
      editor = construirEditor();
    }
    editor.registro = registro;
    editor.trazos = (registro.t || []).map(function (capaTrazo) {
      return { c: capaTrazo.c, p: capaTrazo.p.slice() };
    });
    editor.med = medidasDe(registro);
    editor.lienzo.width = editor.med.w * 4;
    editor.lienzo.height = editor.med.h * 4;
    editor.color = COLORES_PINTURA[0];
    editor.titulo.textContent = registro.p;
    editor.pintar();
    editor.capa.classList.add("abierto");
    editor.capa.setAttribute("aria-hidden", "false");
    bleepMini();
  };

  var temporizadorAuto = null;

  var alternarAuto = function () {
    var modoAuto = !temporizadorAuto;
    if (temporizadorAuto) {
      window.clearInterval(temporizadorAuto);
      temporizadorAuto = null;
    }
    if (modoAuto) {
      temporizadorAuto = window.setInterval(function () {
        if (document.hidden) {
          return;
        }
        agregarGeneracion(promptAleatorio());
        var ultima = pared.lastChild;
        if (ultima && ultima.querySelector) {
          var lienzoUltimo = ultima.querySelector("canvas");
          if (lienzoUltimo) {
            glitch(lienzoUltimo, sorteador(hash("AUTO" + Date.now())), 2);
          }
        }
      }, 9000);
      mostrarVirus("modo automático activado.");
    }
    if (botonAuto) {
      botonAuto.textContent = modoAuto ? "[ AUTO: ON ]" : "[ AUTO: OFF ]";
      botonAuto.setAttribute("aria-pressed", String(modoAuto));
    }
  };

  var codificarPared = function () {
    return registros.slice(0, 40).map(function (registro) {
      var item = [registro.p, (registro.s || "").split("#")[1] || "", registro.n || 0, registro.g || 0];
      if (registro.t && registro.t.length) {
        item.push(registro.t.slice(0, 12).map(function (capaTrazo) {
          return { c: capaTrazo.c, p: capaTrazo.p.slice(0, 240) };
        }));
      } else {
        item.push(null);
      }
      if (registro.padre) {
        item.push([registro.padre.p, (registro.padre.s || "").split("#")[1] || "", registro.padre.g || 0]);
      } else {
        item.push(null);
      }
      item.push(registro.m || "n");
      item.push(registro.e || null);
      return item;
    });
  };

  var decodificarPared = function (texto) {
    try {
      var datos = JSON.parse(decodeURIComponent(texto));
      if (!Array.isArray(datos)) {
        return null;
      }
      return datos.map(function (item) {
        if (!Array.isArray(item) || typeof item[0] !== "string") {
          return null;
        }
        var registro = {
          p: String(item[0]).slice(0, 60),
          s: String(item[0]) + "#" + String(item[1] || "x"),
          n: item[2] || 0,
          g: item[3] || 0,
          m: item[6] === "a" ? "a" : "n",
          e: typeof item[7] === "string" ? item[7] : null,
          f: ""
        };
        if (Array.isArray(item[4])) {
          registro.t = item[4].map(function (capaTrazo) {
            return {
              c: capaTrazo && capaTrazo.c ? capaTrazo.c : "#ff2bd1",
              p: capaTrazo && Array.isArray(capaTrazo.p) ? capaTrazo.p : []
            };
          });
        }
        if (Array.isArray(item[5])) {
          registro.padre = {
            p: String(item[5][0] || ""),
            s: String(item[5][0] || "") + "#" + String(item[5][1] || "x"),
            g: item[5][2] || 0
          };
        }
        return registro;
      }).filter(function (registro) {
        return registro;
      });
    } catch (error) {
      return null;
    }
  };

  var compartirPared = function () {
    var datos = codificarPared();
    var enlace = window.location.href.split("#")[0] + "#pared=" + encodeURIComponent(JSON.stringify(datos));
    if (window.navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(enlace).then(function () {
        mostrarVirus("enlace copiado.");
      }, function () {
        window.prompt("copia el enlace:", enlace);
      });
    } else {
      window.prompt("copia el enlace:", enlace);
    }
  };

  var grabarCorrupcion = function () {
    var figura = pared.firstChild;
    var lienzoGrabar = figura && figura.querySelector ? figura.querySelector("canvas") : null;
    if (!lienzoGrabar || !window.MediaRecorder || !lienzoGrabar.captureStream) {
      mostrarVirus("este navegador no puede grabar vídeo.");
      return;
    }
    try {
      var flujo = lienzoGrabar.captureStream(12);
      var trozos = [];
      var grabador = new window.MediaRecorder(flujo, { mimeType: "video/webm" });
      grabador.ondataavailable = function (evento) {
        if (evento.data && evento.data.size) {
          trozos.push(evento.data);
        }
      };
      grabador.onstop = function () {
        var blob = new Blob(trozos, { type: "video/webm" });
        var url = window.URL.createObjectURL(blob);
        var enlace = document.createElement("a");
        enlace.href = url;
        enlace.download = "corrupcion.webm";
        enlace.click();
        window.URL.revokeObjectURL(url);
      };
      grabador.start();
      var vueltas = 0;
      var id = window.setInterval(function () {
        glitch(lienzoGrabar, sorteador(hash("G" + Date.now() + vueltas)), 2);
        vueltas += 1;
        if (vueltas >= 16) {
          window.clearInterval(id);
          grabador.stop();
        }
      }, 120);
      mostrarVirus("grabando vídeo...");
    } catch (error) {
      mostrarVirus("este navegador no puede grabar vídeo.");
    }
  };

  var promptAleatorio = function () {
    var sujeto = CATALOGO[Math.floor(Math.random() * CATALOGO.length)];
    var frases = [sujeto.titulo];
    if (Math.random() < 0.4) {
      var dos = CATALOGO[Math.floor(Math.random() * CATALOGO.length)];
      if (dos !== sujeto) {
        frases.push("con " + dos.titulo);
      }
    }
    if (Math.random() < 0.3) {
      var accesorio = ACCESORIOS[Math.floor(Math.random() * ACCESORIOS.length)];
      frases.push("y " + accesorio.claves[0]);
    }
    return frases.join(" ");
  };

  var masGlitch = function () {
    $$("canvas", pared).forEach(function (lienzo, i) {
      var azar = sorteador(hash("REG-" + Date.now() + "-" + i));
      glitch(lienzo, azar, 2);
    });
  };

  var limpiarPared = function () {
    registros = [];
    paredCompartida = false;
    guardarRegistros();
    pintarTodo();
    var ultima = $("[data-ultima]");
    if (ultima) {
      ultima.textContent = "pared vacía. genera algo.";
    }
  };

  var bajarPared = function () {
    if (!registros.length) {
      return;
    }
    forzarRenderTodo();
    var esperar = function (hecho) {
      var intentos = 0;
      var comprobar = function () {
        var listo = true;
        $$("figure", pared).forEach(function (figura) {
          if (figura.getAttribute("data-render") !== "1") {
            listo = false;
          }
        });
        if (listo || intentos > 40) {
          hecho();
          return;
        }
        intentos += 1;
        window.setTimeout(comprobar, 120);
      };
      comprobar();
    };
    esperar(function () {
      var cols = 6;
      var hueco = 132;
      var separacion = 10;
      var alturaPie = 18;
      var filas = Math.ceil(registros.length / cols);
      var ancho = cols * (hueco + separacion) + separacion;
      var alto = filas * (hueco + alturaPie + separacion) + separacion + 26;
      var salida = document.createElement("canvas");
      salida.width = ancho;
      salida.height = alto;
      var ctxSalida = salida.getContext("2d");
      ctxSalida.fillStyle = "#07070d";
      ctxSalida.fillRect(0, 0, ancho, alto);
      ctxSalida.fillStyle = "#b6ff3b";
      ctxSalida.font = "13px \"Press Start 2P\", monospace";
      ctxSalida.fillText("GARABATO.EXE :: PARED DE DIBUJOS", 10, 20);
      var lienzos = $$("canvas", pared);
      lienzos.forEach(function (lienzo, i) {
        var cx = i % cols;
        var cy = Math.floor(i / cols);
        var x = separacion + cx * (hueco + separacion) + Math.round((hueco - lienzo.width) / 2);
        var y = 26 + separacion + cy * (hueco + alturaPie + separacion) + Math.round((hueco - lienzo.height) / 2);
        ctxSalida.drawImage(lienzo, x, y);
        ctxSalida.fillStyle = "#d8d8ea";
        ctxSalida.font = "12px \"Schoolbell\", cursive";
        var titulo = registros[i] ? registros[i].p : "";
        if (titulo.length > 16) {
          titulo = titulo.slice(0, 15) + "…";
        }
        ctxSalida.fillText(titulo, separacion + cx * (hueco + separacion), y + lienzo.height + 13);
      });
      var enlace = document.createElement("a");
      enlace.download = "pared-de-dibujos.png";
      enlace.href = salida.toDataURL("image/png");
      enlace.click();
    });
  };

  var cacheDibujos = {};
  var colaRender = [];
  var loteEnCurso = false;
  var modoLimpio = false;
  var baseDatos = null;

  var iniciarImagenes = function () {
    try {
      if (!window.indexedDB) {
        return;
      }
      var peticion = window.indexedDB.open("garabato-db", 1);
      peticion.onupgradeneeded = function () {
        if (!peticion.result.objectStoreNames.contains("dibujos")) {
          peticion.result.createObjectStore("dibujos", { keyPath: "s" });
        }
      };
      peticion.onsuccess = function () {
        baseDatos = peticion.result;
      };
      peticion.onerror = function () {
        baseDatos = null;
      };
    } catch (error) {
      baseDatos = null;
    }
  };

  var guardarImagen = function (registro, lienzo) {
    try {
      if (!baseDatos) {
        return;
      }
      var tx = baseDatos.transaction("dibujos", "readwrite");
      tx.objectStore("dibujos").put({ s: registro.s, d: lienzo.toDataURL("image/png") });
    } catch (error) {
      return;
    }
  };

  var imagenGuardada = function (registro, hecho) {
    if (!baseDatos) {
      hecho(null);
      return;
    }
    try {
      var tx = baseDatos.transaction("dibujos", "readonly");
      var consulta = tx.objectStore("dibujos").get(registro.s);
      consulta.onsuccess = function () {
        hecho(consulta.result ? consulta.result.d : null);
      };
      consulta.onerror = function () {
        hecho(null);
      };
    } catch (error) {
      hecho(null);
    }
  };

  var marcarFallida = function (tarea) {
    if (tarea.figura) {
      tarea.figura.setAttribute("data-render", "1");
      if (tarea.figura.className.indexOf("perdido") === -1) {
        tarea.figura.className += " perdido";
      }
    }
  };

  var renderProcedural = function (tarea) {
    var resultado = cacheDibujos[tarea.registro.s];
    if (!resultado) {
      resultado = pintarDibujo(tarea.registro);
      cacheDibujos[tarea.registro.s] = resultado;
    }
    aplicarResultado(tarea.figura, resultado);
    guardarImagen(tarea.registro, resultado.lienzo);
  };

  var renderTarea = function (tarea) {
    if (typeof document.body.contains === "function" && !document.body.contains(tarea.figura)) {
      return;
    }
    if (tarea.figura.getAttribute("data-render") === "1") {
      return;
    }
    var med = medidasDe(tarea.registro);
    imagenGuardada(tarea.registro, function (dataUrl) {
      var lienzo = tarea.figura.querySelector("canvas");
      if (!dataUrl || !lienzo) {
        try {
          renderProcedural(tarea);
        } catch (error) {
          marcarFallida(tarea);
        }
        return;
      }
      var imagen = new window.Image();
      imagen.onload = function () {
        if (imagen.naturalWidth === med.w && imagen.naturalHeight === med.h) {
          lienzo.getContext("2d").drawImage(imagen, 0, 0);
          var resultado = { lienzo: lienzo, perdido: false, secreto: buscarSecreto(tarea.registro.p) };
          cacheDibujos[tarea.registro.s] = resultado;
          tarea.figura.__resultado = resultado;
          tarea.figura.setAttribute("data-render", "1");
        } else {
          try {
            renderProcedural(tarea);
          } catch (error) {
            marcarFallida(tarea);
          }
        }
      };
      imagen.onerror = function () {
        try {
          renderProcedural(tarea);
        } catch (error) {
          marcarFallida(tarea);
        }
      };
      imagen.src = dataUrl;
    });
  };

  var programarRender = function (figura, registro) {
    figura.setAttribute("data-render", "0");
    colaRender.push({ figura: figura, registro: registro });
    if (!loteEnCurso) {
      loteEnCurso = true;
      window.setTimeout(procesoLotes, 30);
    }
  };

  var aplicarResultado = function (figura, resultado) {
    var lienzo = figura.querySelector("canvas");
    if (!lienzo) {
      return;
    }
    var ctx = lienzo.getContext("2d");
    ctx.clearRect(0, 0, lienzo.width, lienzo.height);
    ctx.drawImage(resultado.lienzo, 0, 0);
    figura.setAttribute("data-render", "1");
    figura.__resultado = resultado;
    if (resultado.perdido && figura.className.indexOf("perdido") === -1) {
      figura.className += " perdido";
      var pie = figura.querySelector("figcaption");
      if (pie) {
        pie.textContent = "se perdió en el disquette";
      }
    }
  };

  var procesoLotes = function () {
    if (!colaRender.length) {
      loteEnCurso = false;
      return;
    }
    var lote = colaRender.splice(0, 8);
    lote.forEach(function (tarea) {
      try {
        renderTarea(tarea);
      } catch (error) {
        if (window.console && window.console.error) {
          window.console.error("render fallido:", tarea.registro && tarea.registro.s, error);
        }
        marcarFallida(tarea);
      }
    });
    window.setTimeout(procesoLotes, 16);
  };

  var forzarRenderTodo = function () {
    colaRender = [];
    loteEnCurso = false;
    $$("figure", pared).forEach(function (figura) {
      if (figura.getAttribute("data-render") === "1") {
        return;
      }
      var semilla = figura.getAttribute("data-seg");
      var registro = null;
      for (var i = 0; i < registros.length; i++) {
        if (registros[i].s === semilla) {
          registro = registros[i];
        }
      }
      if (!registro) {
        return;
      }
      try {
        renderTarea({ figura: figura, registro: registro });
      } catch (error) {
        marcarFallida({ figura: figura, registro: registro });
      }
    });
  };

  var actualizarTile = function (registro) {
    delete cacheDibujos[registro.s];
    delete cacheDibujos[registro.s + "|limpio"];
    $$("figure", pared).forEach(function (figura) {
      if (figura.getAttribute("data-seg") === registro.s) {
        var resultado = pintarDibujo(registro);
        cacheDibujos[registro.s] = resultado;
        aplicarResultado(figura, resultado);
        guardarImagen(registro, resultado.lienzo);
      }
    });
  };

  var hervires = {};

  var empezarHervor = function (figura) {
    if (reducir || raiz.classList.contains("modo-ligero")) {
      return;
    }
    var clave = figura.getAttribute("data-seg");
    if (hervires[clave] || figura.getAttribute("data-render") !== "1") {
      return;
    }
    var base = cacheDibujos[clave];
    if (!base) {
      return;
    }
    var lienzo = figura.querySelector("canvas");
    if (!lienzo) {
      return;
    }
    var azar = sorteador(hash(clave + "hervor"));
    var anchoBase = base.lienzo.width;
    var altoBase = base.lienzo.height;
    var cuadros = [];
    for (var c = 0; c < 3; c++) {
      var cuadro = document.createElement("canvas");
      cuadro.width = anchoBase;
      cuadro.height = altoBase;
      var ctxCuadro = cuadro.getContext("2d");
      var bandas = 4 + Math.floor(azar() * 3);
      var corte = 0;
      for (var b = 0; b < bandas && corte < altoBase; b++) {
        var alto = 8 + Math.floor(azar() * 18);
        var desvio = Math.floor(azar() * 3) - 1;
        ctxCuadro.drawImage(base.lienzo, 0, corte, anchoBase, alto, desvio, corte, anchoBase, alto);
        corte += alto;
      }
      if (corte < altoBase) {
        ctxCuadro.drawImage(base.lienzo, 0, corte, anchoBase, altoBase - corte, 0, corte, anchoBase, altoBase - corte);
      }
      cuadros.push(cuadro);
    }
    var indice = 0;
    hervires[clave] = window.setInterval(function () {
      try {
        indice = (indice + 1) % cuadros.length;
        var ctx = lienzo.getContext("2d");
        ctx.clearRect(0, 0, lienzo.width, lienzo.height);
        ctx.drawImage(cuadros[indice], 0, 0);
      } catch (error) {
        return;
      }
    }, 260);
  };

  var pararHervor = function (figura) {
    if (!figura) {
      return;
    }
    var clave = figura.getAttribute("data-seg");
    if (!hervires[clave]) {
      return;
    }
    window.clearInterval(hervires[clave]);
    delete hervires[clave];
    var base = cacheDibujos[clave];
    var lienzo = figura.querySelector("canvas");
    if (base && lienzo) {
      var ctx = lienzo.getContext("2d");
      ctx.clearRect(0, 0, lienzo.width, lienzo.height);
      ctx.drawImage(base.lienzo, 0, 0);
    }
  };

  var NOMBRES_FIRMA = ["Lucía", "Martín", "Paula", "Hugo", "Emma", "Leo", "Vera", "Bruno", "Alba", "Teo", "Nina", "Ciro"];
  var TEXTOS_SELLO = ["MUY BIEN", "REPITE", "NO SE LO CREYÓ NADIE", "GENIAL", "FALTAN DEBERES", "SOBRESALIENTE"];

  var firmarSellar = function (ctx, azar) {
    if (azar() < 0.4) {
      ctx.save();
      ctx.translate(L - 5, A - 5);
      ctx.rotate((azar() - 0.5) * 0.16);
      ctx.font = "11px Schoolbell, cursive";
      ctx.textAlign = "right";
      ctx.fillStyle = "#243a8a";
      ctx.fillText("por " + NOMBRES_FIRMA[Math.floor(azar() * NOMBRES_FIRMA.length)] + ", " + (4 + Math.floor(azar() * 6)) + " años", 0, 0);
      ctx.restore();
    }
    if (azar() < 0.2) {
      var texto = TEXTOS_SELLO[Math.floor(azar() * TEXTOS_SELLO.length)];
      ctx.save();
      ctx.translate(20 + azar() * 46, 20 + azar() * 66);
      ctx.rotate((azar() - 0.5) * 0.5);
      ctx.globalAlpha = 0.8;
      ctx.strokeStyle = azar() < 0.5 ? "#c23030" : "#2a4a9a";
      ctx.lineWidth = 1.4;
      ctx.font = "7px \"Press Start 2P\", monospace";
      ctx.textAlign = "center";
      var ancho = ctx.measureText(texto).width + 8;
      ctx.strokeRect(-ancho / 2, -8, ancho, 16);
      ctx.strokeRect(-ancho / 2 + 1.5, -6.5, ancho - 3, 13);
      ctx.fillStyle = ctx.strokeStyle;
      ctx.fillText(texto, 0, 3);
      ctx.restore();
      ctx.globalAlpha = 1;
    }
  };

  var figuraDe = function (semilla) {
    var hallada = null;
    $$("figure", pared).forEach(function (figura) {
      if (figura.getAttribute("data-seg") === semilla) {
        hallada = figura;
      }
    });
    return hallada;
  };

  var indiceDeRegistro = function (semilla) {
    for (var i = 0; i < registros.length; i++) {
      if (registros[i].s === semilla) {
        return i;
      }
    }
    return -1;
  };

  var alternarPin = function (registro) {
    registro.pin = !registro.pin;
    if (registro.pin) {
      registros = registros.filter(function (r) {
        return r.s !== registro.s;
      });
      registros.unshift(registro);
      var figura = figuraDe(registro.s);
      if (figura && pared.firstChild) {
        pared.insertBefore(figura, pared.firstChild);
      }
    }
    guardarRegistros();
    var actual = figuraDe(registro.s);
    if (actual) {
      actual.classList.toggle("pin", !!registro.pin);
    }
  };

  var arrastrada = null;

  var manejarSoltar = function (evento, figuraDestino) {
    evento.preventDefault();
    if (!arrastrada || !figuraDestino || arrastrada === figuraDestino) {
      return;
    }
    var semilla = arrastrada.getAttribute("data-seg");
    var semillaDestino = figuraDestino.getAttribute("data-seg");
    var desde = indiceDeRegistro(semilla);
    var hasta = indiceDeRegistro(semillaDestino);
    if (desde < 0 || hasta < 0) {
      return;
    }
    var registro = registros.splice(desde, 1)[0];
    registros.splice(hasta, 0, registro);
    guardarRegistros();
    if (desde < hasta) {
      pared.insertBefore(arrastrada, figuraDestino.nextSibling);
    } else {
      pared.insertBefore(arrastrada, figuraDestino);
    }
  };

  var CLAVE_PAPELERA = "garabato-papelera";

  var leerPapelera = function () {
    try {
      var crudo = localStorage.getItem(CLAVE_PAPELERA);
      var datos = crudo ? JSON.parse(crudo) : [];
      return Array.isArray(datos) ? datos : [];
    } catch (error) {
      return [];
    }
  };

  var guardarPapelera = function (lista) {
    try {
      localStorage.setItem(CLAVE_PAPELERA, JSON.stringify(lista.slice(0, 40)));
    } catch (error) {
      return;
    }
  };

  var tirarAPapelera = function (registro) {
    var lista = leerPapelera();
    lista.unshift({
      p: registro.p,
      s: registro.s,
      n: registro.n || 0,
      g: registro.g || 0,
      m: registro.m || "n",
      e: registro.e || null,
      t: registro.t || null,
      padre: registro.padre || null,
      f: registro.f || ""
    });
    guardarPapelera(lista);
    registros = registros.filter(function (r) {
      return r.s !== registro.s;
    });
    guardarRegistros();
    var figura = figuraDe(registro.s);
    if (figura && figura.parentNode) {
      figura.parentNode.removeChild(figura);
    }
    if (hervires[registro.s]) {
      window.clearInterval(hervires[registro.s]);
      delete hervires[registro.s];
    }
    delete cacheDibujos[registro.s];
    actualizarTotales();
    mostrarVirus("dibujo movido a la papelera.");
  };

  var panelPapelera = null;

  var pintarPanelPapelera = function () {
    if (!panelPapelera) {
      return;
    }
    var lista = leerPapelera();
    panelPapelera.lista.textContent = "";
    if (!lista.length) {
      var vacia = document.createElement("li");
      var sinNada = document.createElement("span");
      sinNada.textContent = "vacía. nadie ha tirado nada todavía.";
      vacia.appendChild(sinNada);
      panelPapelera.lista.appendChild(vacia);
      return;
    }
    lista.forEach(function (registro, i) {
      var fila = document.createElement("li");
      var texto = document.createElement("span");
      texto.textContent = registro.p + " // " + (registro.f || "sin fecha");
      var boton = document.createElement("button");
      boton.type = "button";
      boton.className = "boton claro";
      boton.textContent = "RESCATAR";
      boton.addEventListener("click", function () {
        var actual = leerPapelera();
        var rescatado = actual.splice(i, 1)[0];
        if (!rescatado) {
          return;
        }
        guardarPapelera(actual);
        registros.unshift(rescatado);
        if (registros.length > MAXIMO) {
          registros = registros.slice(0, MAXIMO);
        }
        guardarRegistros();
        var tile = crearTile(rescatado);
        if (pared.firstChild) {
          pared.insertBefore(tile, pared.firstChild);
        } else {
          pared.appendChild(tile);
        }
        actualizarTotales();
        pintarPanelPapelera();
      });
      fila.appendChild(texto);
      fila.appendChild(boton);
      panelPapelera.lista.appendChild(fila);
    });
  };

  var abrirPapelera = function () {
    if (!panelPapelera) {
      var capa = document.createElement("div");
      capa.className = "modal";
      capa.setAttribute("aria-hidden", "true");
      capa.innerHTML = "<div class=\"modal-marco\"><div class=\"modal-barra\"><span>PAPELERA // rescatables</span><button class=\"t-salir\" type=\"button\" data-pap-cerrar>[ CERRAR ]</button></div><div class=\"modal-cuerpo\"><ul class=\"lista-papelera\" data-pap-lista></ul><div class=\"controles\"><button class=\"boton claro\" type=\"button\" data-pap-vaciar>VACIAR PAPELERA</button></div></div></div>";
      document.body.appendChild(capa);
      panelPapelera = {
        capa: capa,
        lista: capa.querySelector("[data-pap-lista]")
      };
      capa.querySelector("[data-pap-cerrar]").addEventListener("click", function () {
        capa.classList.remove("abierto");
        capa.setAttribute("aria-hidden", "true");
      });
      capa.querySelector("[data-pap-vaciar]").addEventListener("click", function () {
        guardarPapelera([]);
        pintarPanelPapelera();
        mostrarVirus("papelera vaciada.");
      });
    }
    pintarPanelPapelera();
    panelPapelera.capa.classList.add("abierto");
    panelPapelera.capa.setAttribute("aria-hidden", "false");
  };

  var mutador = null;

  var pintarVariantes = function (padre) {
    mutador.cuadricula.textContent = "";
    for (var i = 0; i < 4; i++) {
      var candidato = {
        p: padre.p,
        s: padre.s + "#mut" + i + Math.random().toString(36).slice(2, 7),
        n: padre.n || nivelBase,
        g: (padre.g || 0) + 1,
        m: padre.m || "n",
        e: padre.e || null,
        padre: { p: padre.p, s: padre.s, g: padre.g || 0 },
        f: new Date().toLocaleString("es-ES")
      };
      var resultado = pintarDibujo(candidato);
      var boton = document.createElement("button");
      boton.type = "button";
      boton.className = "mutador-opcion";
      boton.title = "elegir esta";
      boton.appendChild(resultado.lienzo);
      boton.addEventListener("click", (function (elegido) {
        return function () {
          registros.unshift(elegido);
          if (registros.length > MAXIMO) {
            registros = registros.slice(0, MAXIMO);
          }
          guardarRegistros();
          var tile = crearTile(elegido);
          if (pared.firstChild) {
            pared.insertBefore(tile, pared.firstChild);
          } else {
            pared.appendChild(tile);
          }
          actualizarTotales();
          mutador.capa.classList.remove("abierto");
          mutador.capa.setAttribute("aria-hidden", "true");
          mostrarVirus("variante añadida.");
        };
      })(candidato));
      mutador.cuadricula.appendChild(boton);
    }
  };

  var abrirMutador = function () {
    if (!registros.length) {
      mostrarVirus("no hay nada que mutar todavía.");
      return;
    }
    if (!mutador) {
      var capa = document.createElement("div");
      capa.className = "modal";
      capa.setAttribute("aria-hidden", "true");
      capa.innerHTML = "<div class=\"modal-marco\"><div class=\"modal-barra\"><span>4 VARIANTES DEL MISMO BICHO</span><button class=\"t-salir\" type=\"button\" data-mut-cerrar>[ CERRAR ]</button></div><div class=\"modal-cuerpo\"><div class=\"mutador-cuadricula\" data-mut-cuadricula></div><div class=\"controles\"><button class=\"boton claro\" type=\"button\" data-mut-otra>OTRA TANDA</button></div></div></div>";
      document.body.appendChild(capa);
      mutador = {
        capa: capa,
        cuadricula: capa.querySelector("[data-mut-cuadricula]")
      };
      capa.querySelector("[data-mut-cerrar]").addEventListener("click", function () {
        capa.classList.remove("abierto");
        capa.setAttribute("aria-hidden", "true");
      });
      capa.querySelector("[data-mut-otra]").addEventListener("click", function () {
        pintarVariantes(registros[0]);
      });
    }
    pintarVariantes(registros[0]);
    mutador.capa.classList.add("abierto");
    mutador.capa.setAttribute("aria-hidden", "false");
  };

  var zoom = null;

  var pintarZoom = function () {
    var registro = zoom.registro;
    var clave = registro.s + (zoom.limpio ? "|limpio" : "");
    var resultado = cacheDibujos[clave];
    if (!resultado) {
      if (zoom.limpio) {
        modoLimpio = true;
        resultado = pintarDibujo(registro);
        modoLimpio = false;
      } else {
        resultado = cacheDibujos[registro.s] || pintarDibujo(registro);
      }
      cacheDibujos[clave] = resultado;
    }
    var ctx = zoom.lienzo.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, zoom.lienzo.width, zoom.lienzo.height);
    ctx.drawImage(resultado.lienzo, 0, 0, zoom.lienzo.width, zoom.lienzo.height);
    zoom.titulo.textContent = registro.p.toUpperCase();
    var ficha = [
      "SEMILLA: <strong>" + (registro.s || "").split("#")[1] + "</strong>",
      "FECHA: " + (registro.f || "sin fecha")
    ];
    if (registro.g) {
      ficha.push("GENERACIÓN: g" + registro.g);
    }
    if (registro.padre) {
      ficha.push("HIJO DE: " + registro.padre.p);
    }
    if (registro.t && registro.t.length) {
      ficha.push("TIENE TINTA ENCIMA");
    }
    zoom.ficha.innerHTML = ficha.join("<br>");
    zoom.botonLimpio.textContent = zoom.limpio ? "[ VER CORROMPIDO ]" : "[ VER LIMPIO ]";
  };

  var abrirZoom = function (registro) {
    if (!zoom) {
      var capa = document.createElement("div");
      capa.className = "modal";
      capa.setAttribute("aria-hidden", "true");
      capa.innerHTML = "<div class=\"modal-marco\"><div class=\"modal-barra\"><span data-zoom-titulo>DIBUJO</span><button class=\"t-salir\" type=\"button\" data-zoom-cerrar>[ CERRAR ]</button></div><div class=\"modal-cuerpo\"><div class=\"zoom-escena\"><canvas width=\"384\" height=\"480\" data-zoom-lienzo></canvas></div><p class=\"ficha-zoom\" data-zoom-ficha></p><div class=\"controles\"><button class=\"boton claro\" type=\"button\" data-zoom-limpio>VER LIMPIO</button><button class=\"boton claro\" type=\"button\" data-zoom-publicar>PUBLICAR</button><button class=\"boton\" type=\"button\" data-zoom-png>GUARDAR PNG</button></div></div></div>";
      document.body.appendChild(capa);
      zoom = {
        capa: capa,
        lienzo: capa.querySelector("[data-zoom-lienzo]"),
        ficha: capa.querySelector("[data-zoom-ficha]"),
        titulo: capa.querySelector("[data-zoom-titulo]"),
        botonLimpio: capa.querySelector("[data-zoom-limpio]"),
        registro: null,
        limpio: false
      };
      capa.querySelector("[data-zoom-cerrar]").addEventListener("click", function () {
        capa.classList.remove("abierto");
        capa.setAttribute("aria-hidden", "true");
      });
      zoom.botonLimpio.addEventListener("click", function () {
        zoom.limpio = !zoom.limpio;
        pintarZoom();
      });
      capa.querySelector("[data-zoom-png]").addEventListener("click", function () {
        var enlace = document.createElement("a");
        enlace.download = "garabato-" + (zoom.registro.s || "").split("#")[1] + ".png";
        enlace.href = zoom.lienzo.toDataURL("image/png");
        enlace.click();
      });
      capa.querySelector("[data-zoom-publicar]").addEventListener("click", function () {
        var registro = zoom.registro;
        if (!registro) {
          return;
        }
        fetch("/api/pared", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            p: registro.p,
            s: registro.s,
            m: registro.m || "n",
            img: zoom.lienzo.toDataURL("image/png")
          })
        })
          .then(function (respuesta) {
            return respuesta.json();
          })
          .then(function (datos) {
            if (datos && datos.ok) {
              mostrarVirus("publicado en la pared común.");
              pintarComun();
            } else if (datos && datos.error) {
              mostrarVirus(datos.error);
            } else {
              mostrarVirus("no se pudo publicar.");
            }
          })
          .catch(function () {
            mostrarVirus("sin conexión con la pared común.");
          });
      });
    }
    zoom.registro = registro;
    zoom.limpio = false;
    var medZoom = medidasDe(registro);
    zoom.lienzo.width = medZoom.w * 4;
    zoom.lienzo.height = medZoom.h * 4;
    pintarZoom();
    zoom.capa.classList.add("abierto");
    zoom.capa.setAttribute("aria-hidden", "false");
    bleepMini();
  };

  var exportarColeccion = function () {
    var datos = {
      v: 1,
      f: new Date().toISOString(),
      sellos: sellosHallados,
      registros: registros
    };
    var blob = new Blob([JSON.stringify(datos)], { type: "application/json" });
    var url = window.URL.createObjectURL(blob);
    var enlace = document.createElement("a");
    enlace.href = url;
    enlace.download = "garabato-backup.json";
    enlace.click();
    window.URL.revokeObjectURL(url);
    mostrarVirus("colección exportada: " + registros.length + " dibujos.");
  };

  var importarColeccion = function () {
    var entrada = document.createElement("input");
    entrada.type = "file";
    entrada.accept = "application/json,.json";
    entrada.addEventListener("change", function () {
      var archivo = entrada.files && entrada.files[0];
      if (!archivo) {
        return;
      }
      var lector = new FileReader();
      lector.onload = function () {
        try {
          var datos = JSON.parse(String(lector.result));
          if (!datos || !Array.isArray(datos.registros)) {
            throw new Error("formato");
          }
          registros = datos.registros.filter(function (r) {
            return r && r.p && r.s;
          }).slice(0, MAXIMO);
          if (Array.isArray(datos.sellos)) {
            sellosHallados = datos.sellos;
            try {
              localStorage.setItem(CLAVE_SELLOS, JSON.stringify(sellosHallados));
            } catch (error) {
              return;
            }
            pintarSellos();
          }
          cacheDibujos = {};
          colaRender = [];
          loteEnCurso = false;
          guardarRegistros();
          pintarTodo();
          mostrarVirus("colección importada: " + registros.length + " dibujos.");
        } catch (error) {
          mostrarVirus("el archivo no era una colección.");
        }
      };
      lector.readAsText(archivo);
    });
    entrada.click();
  };

  var camara = null;
  var camaraAnim = null;
  var camaraReloj = null;

  var fuenteCamara = function () {
    var claves = Object.keys(cacheDibujos);
    var intentos = 0;
    while (claves.length && intentos < 8) {
      var elegido = cacheDibujos[claves[Math.floor(Math.random() * claves.length)]];
      if (elegido && !elegido.perdido) {
        return elegido.lienzo;
      }
      intentos += 1;
    }
    if (registros.length) {
      return pintarDibujo(registros[Math.floor(Math.random() * registros.length)]).lienzo;
    }
    return null;
  };

  var pasoCamara = function () {
    if (!camara || !camara.actual) {
      return;
    }
    camara.tiempo += 1;
    var ctx = camara.lienzo.getContext("2d");
    var w = camara.lienzo.width;
    var h = camara.lienzo.height;
    ctx.fillStyle = "#020204";
    ctx.fillRect(0, 0, w, h);
    camara.zoom = 1.1 + Math.sin(camara.tiempo / 45) * 0.08;
    camara.pan.x += (camara.destino.x - camara.pan.x) * 0.03;
    camara.pan.y += (camara.destino.y - camara.pan.y) * 0.03;
    var ancho = w * camara.zoom;
    var alto = h * camara.zoom;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(camara.actual, (w - ancho) * camara.pan.x, (h - alto) * camara.pan.y, ancho, alto);
    if (camara.tiempo % 70 === 0) {
      camara.destino = { x: Math.random(), y: Math.random() };
      camara.actual = fuenteCamara() || camara.actual;
      if (Math.random() < 0.5) {
        camara.capa.classList.add("sacudida");
        window.setTimeout(function () {
          camara.capa.classList.remove("sacudida");
        }, 220);
      }
    }
    if (Math.random() < 0.02) {
      ctx.fillStyle = "rgba(255,43,209,0.18)";
      ctx.fillRect(0, Math.random() * h, w, 2 + Math.random() * 8);
    }
  };

  var cerrarCamara = function () {
    if (!camara) {
      return;
    }
    camara.capa.classList.remove("abierta");
    camara.capa.setAttribute("aria-hidden", "true");
    if (camaraAnim) {
      window.clearInterval(camaraAnim);
      camaraAnim = null;
    }
    if (camaraReloj) {
      window.clearInterval(camaraReloj);
      camaraReloj = null;
    }
  };

  var abrirCamara = function () {
    if (!camara) {
      var capa = document.createElement("div");
      capa.id = "camara";
      capa.setAttribute("aria-hidden", "true");
      capa.innerHTML = "<canvas></canvas><div class=\"camara-hud arriba-izq\"><span class=\"camara-rec\"></span>REC</div><div class=\"camara-hud arriba-der\" data-cam-hora>--:--:--</div><div class=\"camara-hud abajo-izq\">CAM " + ("0" + (1 + Math.floor(Math.random() * 9))) + " :: SEÑAL OK</div><div class=\"camara-hud abajo-der\">GARABATO.EXE</div><button class=\"t-salir boton\" type=\"button\">[ SALIR ]</button>";
      document.body.appendChild(capa);
      capa.querySelector("canvas").width = window.innerWidth;
      capa.querySelector("canvas").height = window.innerHeight;
      window.addEventListener("resize", function () {
        var lienzo = capa.querySelector("canvas");
        if (lienzo && capa.classList.contains("abierta")) {
          lienzo.width = window.innerWidth;
          lienzo.height = window.innerHeight;
        }
      });
      capa.querySelector(".t-salir").addEventListener("click", cerrarCamara);
      capa.addEventListener("click", function (evento) {
        if (evento.target === capa) {
          cerrarCamara();
        }
      });
      camara = {
        capa: capa,
        lienzo: capa.querySelector("canvas"),
        hora: capa.querySelector("[data-cam-hora]"),
        actual: null,
        zoom: 1,
        pan: { x: 0.5, y: 0.5 },
        destino: { x: 0.5, y: 0.5 },
        tiempo: 0
      };
    }
    camara.capa.classList.add("abierta");
    camara.capa.setAttribute("aria-hidden", "false");
    camara.actual = fuenteCamara() || camara.actual;
    camara.tiempo = 0;
    if (camaraAnim) {
      window.clearInterval(camaraAnim);
    }
    camaraAnim = window.setInterval(pasoCamara, 110);
    if (camaraReloj) {
      window.clearInterval(camaraReloj);
    }
    camaraReloj = window.setInterval(function () {
      if (camara && camara.hora) {
        camara.hora.textContent = new Date().toLocaleTimeString("es-ES");
      }
    }, 1000);
    if (camara.hora) {
      camara.hora.textContent = new Date().toLocaleTimeString("es-ES");
    }
    bleepMini();
  };

  var crearInterruptor = function (clave, clase, selector, etiqueta) {
    var boton = $(selector);
    var activo = false;
    try {
      activo = localStorage.getItem(clave) === "on";
    } catch (error) {
      activo = false;
    }
    var pinta = function () {
      if (!boton) {
        return;
      }
      boton.textContent = "[" + etiqueta + ": " + (activo ? "ON" : "OFF") + "]";
      boton.setAttribute("aria-pressed", String(activo));
    };
    raiz.classList.toggle(clase, activo);
    pinta();
    if (boton) {
      boton.addEventListener("click", function () {
        activo = !activo;
        try {
          localStorage.setItem(clave, activo ? "on" : "off");
        } catch (error) {
          return;
        }
        raiz.classList.toggle(clase, activo);
        pinta();
      });
    }
  };

  document.addEventListener("keydown", function (evento) {
    if (evento.key !== "Escape") {
      return;
    }
    [zoom, mutador, panelPapelera].forEach(function (capa) {
      if (capa && capa.capa && capa.capa.classList.contains("abierto")) {
        capa.capa.classList.remove("abierto");
        capa.capa.setAttribute("aria-hidden", "true");
      }
    });
    if (camara && camara.capa.classList.contains("abierta")) {
      cerrarCamara();
    }
  });

  var campo = $("[data-prompt]");
  var botonGenerar = $("[data-accion='generar']");
  var botonSuerte = $("[data-accion='suerte']");
  var botonNivel = $("[data-accion='nivel']");
  var botonMas = $("[data-accion='mas-glitch']");
  var botonBajar = $("[data-accion='bajar']");
  var botonLimpiar = $("[data-accion='limpiar']");

  if (botonGenerar) {
    botonGenerar.addEventListener("click", function () {
      agregarGeneracion(campo ? campo.value : "");
    });
  }
  if (campo) {
    campo.addEventListener("keydown", function (evento) {
      if (evento.key === "Enter") {
        evento.preventDefault();
        agregarGeneracion(campo.value);
      }
    });
  }
  if (botonSuerte) {
    botonSuerte.addEventListener("click", function () {
      var prompt = promptAleatorio();
      if (campo) {
        campo.value = prompt;
      }
      agregarGeneracion(prompt);
    });
  }
  if (botonNivel) {
    botonNivel.addEventListener("click", function () {
      nivelBase = (nivelBase + 1) % 3;
      botonNivel.textContent = "[ GLITCH: " + NIVELES[nivelBase] + " ]";
      botonNivel.setAttribute("aria-pressed", String(nivelBase > 0));
    });
  }
  if (botonMas) {
    botonMas.addEventListener("click", masGlitch);
  }
  if (botonBajar) {
    botonBajar.addEventListener("click", bajarPared);
  }
  if (botonLimpiar) {
    botonLimpiar.addEventListener("click", limpiarPared);
  }

  botonAuto = $("[data-accion='auto']");
  var botonCompartir = $("[data-accion='compartir']");
  var botonGrabar = $("[data-accion='grabar']");
  if (botonAuto) {
    botonAuto.addEventListener("click", alternarAuto);
  }
  if (botonCompartir) {
    botonCompartir.addEventListener("click", compartirPared);
  }
  if (botonGrabar) {
    botonGrabar.addEventListener("click", grabarCorrupcion);
  }

  var botonVariantes = $("[data-accion='variantes']");
  var botonPapelera = $("[data-accion='papelera']");
  var botonExportar = $("[data-accion='exportar']");
  var botonImportar = $("[data-accion='importar']");
  var botonCamara = $("[data-accion='camara']");
  if (botonVariantes) {
    botonVariantes.addEventListener("click", abrirMutador);
  }
  if (botonPapelera) {
    botonPapelera.addEventListener("click", abrirPapelera);
  }
  if (botonExportar) {
    botonExportar.addEventListener("click", exportarColeccion);
  }
  if (botonImportar) {
    botonImportar.addEventListener("click", importarColeccion);
  }
  if (botonCamara) {
    botonCamara.addEventListener("click", abrirCamara);
  }
  crearInterruptor("garabato-tv", "modo-tv", "[data-accion='tv']", "TV");
  crearInterruptor("garabato-ligero", "modo-ligero", "[data-accion='ligero']", "LIGERO");
  crearInterruptor("garabato-contraste", "alto-contraste", "[data-accion='contraste']", "CONTRASTE");

  var botonMas = $("[data-accion='mas']");
  var cajaExtra = $("[data-extra]");
  if (botonMas && cajaExtra) {
    var extraAbierto = false;
    try {
      extraAbierto = localStorage.getItem("garabato-mas") === "on";
    } catch (error) {
      extraAbierto = false;
    }
    var pintarExtra = function () {
      cajaExtra.hidden = !extraAbierto;
      botonMas.textContent = extraAbierto ? "MENOS OPCIONES ▴" : "MÁS OPCIONES ▾";
      botonMas.setAttribute("aria-expanded", String(extraAbierto));
    };
    pintarExtra();
    botonMas.addEventListener("click", function () {
      extraAbierto = !extraAbierto;
      try {
        localStorage.setItem("garabato-mas", extraAbierto ? "on" : "off");
      } catch (error) {
        return;
      }
      pintarExtra();
    });
  }

  var botonSemillas = $("[data-accion='mas-semillas']");
  var cajaSemillas = $(".semillas");
  if (botonSemillas && cajaSemillas) {
    var semillasAbiertas = false;
    try {
      semillasAbiertas = localStorage.getItem("garabato-semillas") === "on";
    } catch (error) {
      semillasAbiertas = false;
    }
    var pintarSemillas = function () {
      cajaSemillas.classList.toggle("abiertas", semillasAbiertas);
      botonSemillas.textContent = semillasAbiertas ? "− MENOS SEMILLAS" : "+ MÁS SEMILLAS";
      botonSemillas.setAttribute("aria-expanded", String(semillasAbiertas));
    };
    pintarSemillas();
    botonSemillas.addEventListener("click", function () {
      semillasAbiertas = !semillasAbiertas;
      try {
        localStorage.setItem("garabato-semillas", semillasAbiertas ? "on" : "off");
      } catch (error) {
        return;
      }
      pintarSemillas();
    });
  }

  var botonModo = $("[data-accion='modo']");
  var pintarModo = function () {
    if (!botonModo) {
      return;
    }
    botonModo.textContent = modoActual === "a" ? "[ MODO: ADULTOS ]" : "[ MODO: NIÑOS ]";
    botonModo.setAttribute("aria-pressed", String(modoActual === "a"));
  };
  pintarModo();
  if (botonModo) {
    botonModo.addEventListener("click", function () {
      modoActual = modoActual === "a" ? "n" : "a";
      try {
        localStorage.setItem("garabato-modo", modoActual);
      } catch (error) {
        return;
      }
      pintarModo();
      mostrarVirus(modoActual === "a" ? "modo adultos activado." : "modo niños activado.");
    });
  }

  $$("[data-chip-prompt]").forEach(function (chip) {
    chip.addEventListener("click", function () {
      var texto = chip.getAttribute("data-chip-prompt") || "";
      if (campo) {
        campo.value = texto;
      }
      agregarGeneracion(texto);
    });
  });

  var recibida = null;
  if ((window.location.hash || "").indexOf("#pared=") === 0) {
    recibida = decodificarPared(window.location.hash.slice(7));
  }
  if (recibida && recibida.length) {
    registros = recibida;
    paredCompartida = true;
    mostrarVirus("pared compartida cargada: se guardará al generar.");
  } else {
    registros = leerRegistros();
    if (!registros.length) {
      ["mi casa", "gato", "dino con corona", "unicornio", "robot", "ballena", "tortuga", "helado de fiesta"].forEach(function (prompt) {
        registros.push({
          p: prompt,
          s: nuevaSemilla(prompt),
          n: 1,
          f: new Date().toLocaleString("es-ES")
        });
      });
      guardarRegistros();
    }
  }
  registros.sort(function (a, b) {
    return (b.pin ? 1 : 0) - (a.pin ? 1 : 0);
  });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      pintarTodo();
    });
  }
  iniciarImagenes();
  pintarSellos();
  pintarTodo();
  pintarDia();
  pintarComun();

  window.ZETETICA = {
    generar: agregarGeneracion,
    suerte: function () {
      agregarGeneracion(promptAleatorio());
    },
    glitch: masGlitch,
    limpiar: limpiarPared,
    bajar: bajarPared,
    compartir: compartirPared,
    grabar: grabarCorrupcion,
    auto: alternarAuto,
    variantes: abrirMutador,
    papelera: abrirPapelera,
    exportar: exportarColeccion,
    importar: importarColeccion,
    camara: abrirCamara,
    total: function () {
      return registros.length;
    }
  };
})();
