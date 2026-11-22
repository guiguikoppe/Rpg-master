/* =========================================================
   map.js — mapas em SVG (região e planta da capela)
   ========================================================= */
(function () {
  'use strict';

  var esc = UI.esc;

  /* ---------- helpers ---------- */

  function glyphFor(type) {
    var t = String(type || '').toLowerCase();
    if (t.indexOf('capela') >= 0 || t.indexOf('templo') >= 0) return 'temple';
    if (t.indexOf('torre') >= 0) return 'tower';
    if (t.indexOf('subsolo') >= 0 || t.indexOf('prisão') >= 0 || t.indexOf('prisao') >= 0) return 'crypt';
    if (t.indexOf('biblioteca') >= 0) return 'book';
    if (t.indexOf('vila') >= 0) return 'village';
    if (t.indexOf('mata') >= 0 || t.indexOf('floresta') >= 0) return 'tree';
    if (t.indexOf('estrada') >= 0) return 'road';
    return 'dot';
  }

  var GLYPHS = {
    temple: 'M-5,4 L-5,-2 L0,-6 L5,-2 L5,4 Z M-1.4,4 L-1.4,0 L1.4,0 L1.4,4 Z',
    tower: 'M-4,5 L-4,-4 L-2,-6 L2,-6 L4,-4 L4,5 Z',
    crypt: 'M-5,5 L-5,-1 A5,5 0 0 1 5,-1 L5,5 Z M-1.6,5 L-1.6,0 L1.6,0 L1.6,5 Z',
    book: 'M-5,4 L-5,-4 L-0.6,-4 L-0.6,4 Z M0.6,4 L0.6,-4 L5,-4 L5,4 Z',
    village: 'M-6,4 L-6,-1 L-3,-3 L0,-1 L0,4 Z M1,4 L1,-2 L4,-4 L6,-2 L6,4 Z',
    tree: 'M0,-6 L4,1 L1.4,1 L4.4,5 L-4.4,5 L-1.4,1 L-4,1 Z',
    road: 'M-4,5 L0,-5 L4,5',
    dot: 'M0,0 m-3,0 a3,3 0 1,0 6,0 a3,3 0 1,0 -6,0'
  };

  function pin(place, revealed, role) {
    var x = place.map.x, y = place.map.y;
    var g = glyphFor(place.type);
    var hidden = role === 'player' && !revealed;
    var cls = 'pin' + (hidden ? ' fog' : '');
    var label = hidden ? '?' : place.name;
    return '' +
      '<g class="' + cls + '" data-place="' + esc(place.id) + '" transform="translate(' + x + ',' + y + ')">' +
        '<circle class="pin-halo" r="24"></circle>' +
        '<path class="pin-body" d="M0,-15 L11,-4 L0,15 L-11,-4 Z"></path>' +
        (hidden
          ? '<text class="pin-glyph" y="4.5" text-anchor="middle">?</text>'
          : '<path class="pin-glyph" transform="translate(0,0)" d="' + GLYPHS[g] + '"></path>') +
        '<text class="pin-label" y="32" text-anchor="middle">' + esc(label) + '</text>' +
      '</g>';
  }

  function tree(x, y, s) {
    return '<g transform="translate(' + x + ',' + y + ') scale(' + s + ')" class="map-tree">' +
      '<path d="M0,-14 L7,-2 L3,-2 L9,9 L-9,9 L-3,-2 L-7,-2 Z"></path>' +
      '<rect x="-1.2" y="9" width="2.4" height="5"></rect></g>';
  }

  var Map = {

    /* =============== mapa da região (arte) =============== */
    region: function (selectedId) {
      var role = Store.get().role;
      var isGM = Store.isGM();
      var spots = ADV.places.filter(function (p) { return p.spot; });

      var marks = spots.map(function (p) {
        var revealed = Store.isRevealed('places', p.id);
        if (role === 'player' && !revealed) return '';
        var cls = 'spot' +
          (selectedId === p.id ? ' on' : '') +
          (isGM && !revealed ? ' fog' : '') +
          (p.spot.side ? ' side-' + p.spot.side : '');
        var icon = glyphFor(p.type);
        return '<button class="' + cls + '" style="left:' + p.spot.x + '%;top:' + p.spot.y + '%" ' +
          'data-place="' + esc(p.id) + '" title="' + esc(p.name) + '">' +
          '<span class="spot-dot"></span>' +
          '<span class="spot-label">' + esc(p.name) + '</span>' +
        '</button>';
      }).join('');

      var legend = spots.map(function (p) {
        var revealed = Store.isRevealed('places', p.id);
        if (role === 'player' && !revealed) return '';
        return '<button class="legend-chip' + (selectedId === p.id ? ' on' : '') + (isGM && !revealed ? ' fog' : '') + '" data-place="' + esc(p.id) + '">' +
          (isGM ? '<i class="state">' + (revealed ? '◉' : '○') + '</i> ' : '') + esc(p.name) +
        '</button>';
      }).join('');

      var offmap = ADV.places.filter(function (p) { return p.offmap; }).map(function (p) {
        var revealed = Store.isRevealed('places', p.id);
        if (role === 'player' && !revealed) return '';
        return '<button class="legend-chip off" data-place="' + esc(p.id) + '">' +
          (isGM ? '<i class="state">' + (revealed ? '◉' : '○') + '</i> ' : '') + esc(p.name) + ' <em>fora do mapa</em></button>';
      }).join('');

      return '<div class="map-canvas" id="map-canvas">' +
          '<img src="assets/img/mapa-valebruma.jpg" alt="Mapa ilustrado de Valebruma, a capela, a Floresta Antiga e a casa abandonada de Elaria" class="map-art">' +
          marks +
          '<button class="map-zoom" data-action="map-zoom" title="Ampliar o mapa">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4M11 8v6M8 11h6"/></svg>' +
          '</button>' +
        '</div>' +
        '<div class="map-legend-row">' + legend + '</div>' +
        (offmap ? '<div class="map-legend-row offmap">' + offmap + '</div>' : '');
    },

    /* =============== planta da capela =============== */
    chapel: function (selectedId) {
      var role = Store.get().role;
      function roomCls(id) {
        var on = selectedId === id ? ' on' : '';
        var hidden = role === 'player' && !Store.isRevealed('places', id);
        return 'room' + on + (hidden ? ' fog' : '');
      }
      function num(x, y, n, id) {
        return '<g class="room-num ' + roomCls(id) + '" data-place="' + id + '" transform="translate(' + x + ',' + y + ')">' +
          '<circle r="14"></circle><text y="4.5" text-anchor="middle">' + n + '</text></g>';
      }

      return '' +
      '<svg class="map-svg plan-svg" viewBox="0 0 720 540" role="img" aria-label="Planta da capela">' +
        '<defs>' +
          '<pattern id="floor" width="24" height="24" patternUnits="userSpaceOnUse">' +
            '<rect width="24" height="24" fill="#221b12"/>' +
            '<path d="M0,24 L24,0" stroke="#2e2417" stroke-width="1"/>' +
          '</pattern>' +
        '</defs>' +
        '<rect x="0" y="0" width="720" height="540" fill="#171208"/>' +
        '<rect x="12" y="12" width="696" height="516" class="plan-frame"/>' +

        /* corredores */
        '<rect x="440" y="196" width="46" height="46" fill="url(#floor)" class="plan-floor"/>' +
        '<path d="M443,196 v46 M483,196 v46" class="plan-wall"/>' +
        '<rect x="116" y="258" width="46" height="86" fill="url(#floor)" class="plan-floor"/>' +
        '<path d="M118,258 v84 M160,258 v84" class="plan-wall"/>' +

        /* salão principal */
        '<g class="' + roomCls('capela') + '" data-place="capela">' +
          '<rect x="60" y="60" width="380" height="198" fill="url(#floor)" class="plan-floor"/>' +
          '<rect x="60" y="60" width="380" height="198" class="plan-wall"/>' +
          '<rect x="200" y="96" width="120" height="44" class="plan-altar"/>' +
          '<text x="260" y="124" text-anchor="middle" class="plan-altar-label">ALTAR</text>' +
          '<path d="M186,60 h32" class="plan-door"/>' +
        '</g>' +
        '<text class="plan-label" x="74" y="246">SALÃO PRINCIPAL</text>' +

        /* entrada subterrânea (alçapão sob o altar) */
        '<g class="' + roomCls('entrada') + '" data-place="entrada">' +
          '<rect x="198" y="166" width="88" height="64" class="plan-wall dashed"/>' +
          '<path d="M204,224 l0,-50 M216,224 l0,-50 M228,224 l0,-50 M240,224 l0,-50 M252,224 l0,-50 M264,224 l0,-50" class="plan-stairs"/>' +
        '</g>' +


        /* cripta */
        '<g class="' + roomCls('cripta') + '" data-place="cripta">' +
          '<rect x="486" y="196" width="204" height="240" fill="url(#floor)" class="plan-floor"/>' +
          '<rect x="486" y="196" width="204" height="240" class="plan-wall"/>' +
          '<rect x="512" y="232" width="44" height="44" class="plan-symbol"/>' +
          '<rect x="566" y="232" width="44" height="44" class="plan-symbol"/>' +
          '<rect x="620" y="232" width="44" height="44" class="plan-symbol"/>' +
          '<rect x="512" y="330" width="152" height="54" class="plan-slab"/>' +
          '<text x="588" y="362" text-anchor="middle" class="plan-altar-label">OS NOVE NOMES</text>' +
        '</g>' +
        '<text class="plan-label" x="500" y="462">CRIPTA E JURAMENTOS</text>' +

        /* torre */
        '<g class="' + roomCls('torre') + '" data-place="torre">' +
          '<circle cx="139" cy="404" r="70" fill="url(#floor)" class="plan-floor"/>' +
          '<circle cx="139" cy="404" r="70" class="plan-wall"/>' +
          '<circle cx="139" cy="404" r="28" class="plan-chain"/>' +
        '</g>' +
        '<text class="plan-label" x="104" y="500">TORRE DO SINO</text>' +

        num(86, 88, '1', 'capela') +
        num(139, 404, '2', 'torre') +
        num(660, 220, '3', 'cripta') +
        num(216, 186, '4', 'entrada') +

        '<text class="plan-note" x="60" y="38">PLANTA — CAPELA DAS DUAS PRISÕES · 1 quadrado = 1,5 m</text>' +
        '<text class="plan-note" x="60" y="524">1 salão · 2 torre · 3 cripta · 4 entrada subterrânea</text>' +
      '</svg>';
    }
  };

  window.MapView = Map;

  /* clique em sala/pin */
  document.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('[data-place]');
    if (!el) return;
    if (!el.closest('.map-canvas') && !el.closest('.map-legend-row')) return;
    var id = el.dataset.place;
    Actions['map-select'](id);
  });
})();
