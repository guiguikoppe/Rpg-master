/* =========================================================
   views.js — telas do site (mestre e jogador)
   ========================================================= */
(function () {
  'use strict';

  var esc = UI.esc;
  var A = window.ADV;

  function gm(html) { return Store.isGM() ? html : ''; }
  function pl(html) { return Store.isGM() ? '' : html; }
  function s() { return Store.get(); }

  function revealBtn(type, id, label) {
    var on = Store.isRevealed(type, id);
    var isClue = type === 'clues';
    var fallback = isClue ? (on ? 'entregue' : 'a entregar') : (on ? 'visível aos jogadores' : 'oculto');
    var tip = isClue ? (on ? 'Já entregue ao grupo' : 'Ainda não entregue') : (on ? 'Visível aos jogadores' : 'Oculto aos jogadores');
    return '<button class="reveal ' + (on ? 'on' : '') + '" data-action="' + (isClue ? 'reveal-clue' : 'reveal-place') + '" data-id="' + id + '" title="' + tip + '">' +
      (on ? '◉' : '○') + ' ' + esc(label || fallback) + '</button>';
  }

  function statRows(cr) {
    var st = cr.stat;
    var ab = st.abilities || {};
    var abHtml = Object.keys(ab).map(function (k) {
      return '<span class="pill">' + k + ' <b>' + esc(ab[k]) + '</b></span>';
    }).join('');
    return '<div class="statblock">' +
      '<div><span>DV / PV</span><b>' + esc(st.dv) + '</b></div>' +
      '<div><span>Iniciativa</span><b>' + esc(st.init) + '</b></div>' +
      '<div><span>Desloc.</span><b>' + esc(st.speed) + '</b></div>' +
      '<div><span>CA</span><b>' + esc(st.ca) + '</b></div>' +
      '<div><span>BBA</span><b>' + esc(st.bba) + '</b></div>' +
      '<div><span>Ataque</span><b>' + esc(st.atk) + '</b></div>' +
      '</div>' +
      '<div class="kv"><b>Testes de resistência</b><span>' + esc(st.saves) + '</span></div>' +
      (st.fullAtk ? '<div class="kv"><b>Ataque completo</b><span>' + esc(st.fullAtk) + '</span></div>' : '') +
      (st.space ? '<div class="kv"><b>Espaço / alcance</b><span>' + esc(st.space) + '</span></div>' : '') +
      (st.sa ? '<div class="kv"><b>Habilidades</b><span>' + esc(st.sa) + '</span></div>' : '') +
      '<div class="pill-row">' + abHtml + '</div>' +
      (st.skills ? '<div class="kv"><b>Perícias</b><span>' + esc(st.skills) + '</span></div>' : '') +
      (st.feats ? '<div class="kv"><b>Talentos</b><span>' + esc(st.feats) + '</span></div>' : '') +
      (st.env ? '<div class="kv"><b>Ambiente</b><span>' + esc(st.env) + '</span></div>' : '') +
      (st.org ? '<div class="kv"><b>Organização</b><span>' + esc(st.org) + '</span></div>' : '') +
      (st.treasure ? '<div class="kv"><b>Tesouro</b><span>' + esc(st.treasure) + '</span></div>' : '');
  }

  function statblockCard(cr, open) {
    return '<details class="creature" ' + (open ? 'open' : '') + '>' +
      '<summary>' +
        '<span class="creature-name">' + esc(cr.name) + '</span>' +
        '<span class="tag ' + (cr.tag.indexOf('VILÃO') === 0 ? 'blood' : cr.tag.indexOf('ANTAGONISTA') === 0 ? 'gold' : cr.tag.indexOf('ENTIDADE') === 0 ? 'azure' : 'muted') + '">' + esc(cr.tag) + '</span>' +
        '<span class="cr-badge">ND ' + esc(cr.nd) + '</span>' +
        '<span class="creature-type">' + esc(cr.type) + '</span>' +
      '</summary>' +
      '<div class="creature-body">' +
        '<p class="creature-intro">' + esc(cr.intro) + '</p>' +
        statRows(cr) +
        '<div class="abilities">' + (cr.abilities || []).map(function (a) {
          return '<div class="ability"><b>' + esc(a.name) + '.</b> ' + esc(a.text) + '</div>';
        }).join('') + '</div>' +
        '<div class="callout"><b>Táticas.</b> ' + esc(cr.tactics) + '</div>' +
        (cr.adjustments && cr.adjustments.length ? '<div class="adjust"><b>Ajustes por mesa</b><ul>' + cr.adjustments.map(function (a) {
          return '<li><b>' + esc(a.when) + ':</b> ' + esc(a.do) + '</li>';
        }).join('') + '</ul></div>' : '') +
        '<div class="row" style="margin-top:.6rem">' +
          '<button class="btn btn-sm btn-primary" data-action="cbt-add-from" data-id="' + cr.id + '">Enviar ao combate</button>' +
        '</div>' +
      '</div>' +
    '</details>';
  }

  var Views = {};

  /* =======================================================
     INÍCIO
     ======================================================= */
  Views.home = function () {
    var st = s();
    var revealed = Object.keys(st.revealed.clues).filter(function (k) { return st.revealed.clues[k]; }).length;
    var totalClues = A.clueGroups.reduce(function (n, g) { return n + g.items.length; }, 0);
    var sealLevel = Number(st.seal) || 0;

    if (!Store.isGM()) {
      return '<div class="hero-panel">' +
          '<div class="hero-eyebrow">' + esc(A.meta.system) + ' · ' + esc(A.meta.duration) + '</div>' +
          '<h1 class="hero-title">' + esc(A.meta.title) + '</h1>' +
          '<p class="hero-sub">' + esc(A.meta.pitch) + '</p>' +
          '<div class="hero-tags"><span class="tag">' + esc(A.meta.place) + '</span><span class="tag muted">' + esc(A.meta.tone) + '</span></div>' +
        '</div>' +
        '<div class="grid cols-3" style="margin:1rem 0">' +
          '<div class="stat"><div class="k">Lugares conhecidos</div><div class="v">' + Object.keys(st.revealed.places).filter(function (k) { return st.revealed.places[k]; }).length + '<small> / ' + A.places.filter(function (p) { return p.spot; }).length + '</small></div></div>' +
          '<div class="stat"><div class="k">Sessão</div><div class="v" style="font-size:1.1rem;padding-top:.4rem">' + esc(A.meta.duration) + '</div></div>' +
        '</div>' +
        '<div class="grid cols-2" style="align-items:start">' +
          '<div class="panel parchment"><div class="panel-head"><h3 class="panel-title">O que fazer na mesa<small>Sem decorar regra</small></h3></div>' +
            '<ul class="clean">' + A.rules.slice(0, 4).map(function (r) { return '<li><b>' + esc(r.title) + '.</b> ' + esc(r.text) + '</li>'; }).join('') + '</ul>' +
            '<div class="row" style="margin-top:.5rem"><button class="btn btn-sm btn-ghost" data-action="go" data-route="rules">Regras completas</button></div>' +
          '</div>' +
          '<div class="stack">' +
            '<div class="panel"><div class="panel-head"><h3 class="panel-title">O mapa</h3></div>' +
              '<p style="margin:0;font-size:.9rem;color:var(--parch-dim)">Valebruma, a capela, a Floresta Antiga e a casa abandonada de Elaria. Clique nos pontos dourados para ler o que vocês já viram.</p>' +
              '<div class="row" style="margin-top:.6rem"><button class="btn btn-sm btn-primary" data-action="go" data-route="map">Abrir o mapa</button>' +
              '<button class="btn btn-sm" data-action="go" data-route="places">Lugares</button></div>' +
            '</div>' +
          '</div>' +
        '</div>';
    }

    /* --- painel do mestre --- */
    var solved = Object.keys(st.solves).filter(function (k) { return st.solves[k]; }).length;
    var checkedCount = Object.keys(st.checks).filter(function (k) { return st.checks[k]; }).length;
    var checklistTotal = A.quickGuide.before.length + A.quickGuide.during.length;
    var stage = A.seal.stages[Math.min(sealLevel, A.seal.stages.length - 1)];
    var c = st.combat;

    return '<div class="hero-panel gm">' +
        '<div class="hero-eyebrow">PAINEL DO MESTRE · ' + esc(A.meta.duration) + ' · ' + esc(A.meta.group) + '</div>' +
        '<h1 class="hero-title">' + esc(A.meta.title) + '</h1>' +
        '<p class="hero-sub">' + esc(A.truth.pitch) + '</p>' +
        '<div class="hero-tags"><span class="tag gold">SEGREDO DO MESTRE</span><span class="tag muted">' + esc(A.meta.place) + '</span></div>' +
      '</div>' +

      '<div class="grid cols-4" style="margin:1rem 0">' +
        '<div class="stat"><div class="k">Relógio do selo</div><div class="v">' + Math.min(sealLevel, 6) + '<small> / 6</small></div></div>' +
        '<div class="stat"><div class="k">Puzzles resolvidos</div><div class="v">' + solved + '<small> / ' + A.puzzles.length + '</small></div></div>' +
        '<div class="stat"><div class="k">Pistas entregues</div><div class="v">' + revealed + '<small> / ' + totalClues + '</small></div></div>' +
        '<div class="stat"><div class="k">Checklist</div><div class="v">' + checkedCount + '<small> / ' + checklistTotal + '</small></div></div>' +
      '</div>' +

      '<div class="grid cols-2" style="align-items:start">' +
        '<div class="stack">' +
          '<div class="panel parchment"><div class="panel-head"><h3 class="panel-title">A verdade em uma frase<small>Só para você</small></h3></div>' +
            '<blockquote class="quote">' + esc(A.quickGuide.sentence) + '</blockquote>' +
            '<div class="row" style="margin-top:.6rem">' +
              '<button class="btn btn-sm btn-ghost" data-action="go" data-route="truth">A verdade completa</button>' +
              '<button class="btn btn-sm btn-ghost" data-action="go" data-route="timeline">Cronograma</button>' +
            '</div>' +
          '</div>' +
          '<div class="panel"><div class="panel-head"><h3 class="panel-title">Relógio do selo<small>' + esc(stage.title) + '</small></h3>' +
            '<button class="btn btn-sm btn-ghost" data-action="go" data-route="seal">Abrir</button></div>' +
            '<div class="seal-meter">' + A.seal.stages.map(function (sg) {
              return '<i class="' + (sg.level <= sealLevel ? 'on' : '') + '"></i>';
            }).join('') + '</div>' +
            '<p style="margin:.55rem 0 0;font-size:.9rem;color:var(--parch-dim)">' + esc(stage.text) + '</p>' +
            '<div class="row" style="margin-top:.55rem">' +
              '<button class="btn btn-sm" data-action="seal-inc">Avançar</button>' +
              '<button class="btn btn-sm btn-ghost" data-action="seal-dec">Recuar</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="stack">' +
          '<div class="panel"><div class="panel-head"><h3 class="panel-title">Próximos passos<small>Roteiro rápido</small></h3></div>' +
            '<ol class="steps">' + A.timeline.map(function (t) {
              return '<li><b>' + esc(t.time) + '</b> — ' + esc(t.key) + '<span>' + esc(t.text) + '</span></li>';
            }).join('') + '</ol>' +
          '</div>' +
          '<div class="panel"><div class="panel-head"><h3 class="panel-title">Atalhos de mesa</h3></div>' +
            '<div class="row">' +
              '<button class="btn btn-sm" data-action="go" data-route="map">Mapa</button>' +
              '<button class="btn btn-sm" data-action="go" data-route="puzzles">Puzzles</button>' +
              '<button class="btn btn-sm" data-action="go" data-route="bestiary">Fichas</button>' +
              '<button class="btn btn-sm" data-action="go" data-route="clues">Pistas</button>' +
              '<button class="btn btn-sm" data-action="go" data-route="tables">Improviso</button>' +
              '<button class="btn btn-sm" data-action="go" data-route="tools">Iniciativa e dados</button>' +
              '<button class="btn btn-sm" data-action="go" data-route="endings">Finais</button>' +
            '</div>' +
            '<p style="margin:.7rem 0 0;font-size:.85rem;color:var(--muted)">Troque para o <b>Modo Jogador</b> no topo antes de virar a tela — tudo que é segredo desaparece, inclusive as pistas ainda não entregues.</p>' +
          '</div>' +
        '</div>' +
      '</div>';
  };

  /* =======================================================
     MAPA
     ======================================================= */
  Views.map = function () {
    var isGM = Store.isGM();
    var sel = App.selectedPlace;
    var place = A.places.filter(function (p) { return p.id === sel; })[0];
    if (place && !isGM && !Store.isRevealed('places', place.id)) place = null;

    var detail;
    if (place) {
      detail = '<div class="panel parchment">' +
        '<div class="panel-head"><h3 class="panel-title">' + esc(place.name) + '<small>' + esc(place.type) + '</small></h3>' +
          gm(revealBtn('places', place.id)) + '</div>' +
        '<blockquote class="narration">' + esc(place.narration) + '</blockquote>' +
        (place.points && place.points.length ? '<div class="row" style="margin:.5rem 0">' + place.points.map(function (x) {
          return '<span class="tag muted">' + esc(x) + '</span>';
        }).join('') + '</div>' : '') +
        gm('<div class="callout"><b>Notas do mestre.</b> ' + esc(place.gm) + '</div>') +
        '</div>';
    } else {
      detail = '<div class="panel"><div class="empty">' +
        (isGM ? 'Clique em um ponto dourado do mapa (ou em um nome abaixo dele) para abrir a descrição do lugar.'
              : 'Clique em um ponto dourado para ver o que vocês conhecem deste lugar.') +
        '</div></div>';
    }

    var hidden = A.places.filter(function (p) { return !Store.isRevealed('places', p.id); }).length;

    return '<div class="map-layout">' +
      '<div class="panel map-panel">' +
        '<div class="panel-head"><h3 class="panel-title">Mapa de Valebruma<small>Arte da região · pontos clicáveis</small></h3>' +
          (isGM ? '<span class="tag muted">' + hidden + ' local(is) oculto(s) aos jogadores</span>' : '') +
        '</div>' +
        MapView.region(sel) +
      '</div>' +
      '<div class="stack map-side">' + detail +
        '<div class="panel"><div class="panel-head"><h3 class="panel-title">Planta da capela<small>Clique nos números</small></h3></div>' +
          MapView.chapel(sel) +
        '</div>' +
        gm('<div class="panel"><div class="panel-head"><h3 class="panel-title">Revelar aos jogadores</h3></div>' +
          '<p class="note-text" style="margin-top:0">Ponto ◉ = visível na tela deles. Ponto ○ = ainda escondido.</p>' +
          '<div class="row">' + A.places.map(function (p) {
            return revealBtn('places', p.id, p.name);
          }).join('') + '</div></div>') +
      '</div>' +
    '</div>';
  };

  /* =======================================================
     VERDADE (mestre)
     ======================================================= */
  Views.truth = function () {
    if (!Store.isGM()) return Views.home();
    var t = A.truth;
    return '<div class="alert danger"><b>SEGREDO DO MESTRE.</b> Não revele de uma vez. Entregue em pedaços, pelas pistas.</div>' +
      '<div class="panel parchment" style="margin-bottom:1rem">' +
        '<div class="panel-head"><h3 class="panel-title">A verdade da aventura</h3></div>' +
        UI.paras(t.paragraphs.join('\n\n')) +
      '</div>' +
      '<div class="panel" style="margin-bottom:1rem">' +
        '<div class="panel-head"><h3 class="panel-title">As três peças do selo<small>O que sustenta a prisão</small></h3></div>' +
        '<div class="grid cols-3">' + t.pieces.map(function (p) {
          return '<div class="piece"><h4>' + esc(p.name) + '</h4><p>' + esc(p.fn) + '</p>' +
            '<p class="piece-fail"><b>Se falhar:</b> ' + esc(p.fail) + '</p></div>';
        }).join('') + '</div>' +
      '</div>' +
      '<div class="grid cols-2" style="align-items:start">' +
        '<div class="panel"><div class="panel-head"><h3 class="panel-title">O que os jogadores devem poder descobrir</h3></div>' +
          '<ol class="steps">' + t.discover.map(function (d) { return '<li>' + esc(d) + '</li>'; }).join('') + '</ol>' +
          '<p class="note-text">' + esc(t.note) + '</p>' +
        '</div>' +
        '<div class="panel"><div class="panel-head"><h3 class="panel-title">Resumo em uma frase</h3></div>' +
          '<blockquote class="quote">' + esc(t.pitch) + '</blockquote>' +
          '<div class="callout"><b>Fios soltos para continuar:</b> o leilão de Darsen, o comprador que quer “um fragmento de deus”, a mão que emergiu no Final B.</div>' +
        '</div>' +
      '</div>';
  };

  /* =======================================================
     PREPARO (mestre)
     ======================================================= */
  Views.prep = function () {
    if (!Store.isGM()) return Views.home();
    var p = A.prep;
    return '<div class="panel parchment" style="margin-bottom:1rem">' +
        '<div class="panel-head"><h3 class="panel-title">Preparação e equilíbrio<small>' + esc(A.meta.group) + '</small></h3></div>' +
        '<p>' + esc(p.intro) + '</p>' +
      '</div>' +
      '<div class="grid cols-2" style="align-items:start">' +
        '<div class="panel"><div class="panel-head"><h3 class="panel-title">Princípios de equilíbrio</h3></div>' +
          '<ul class="clean">' + p.principles.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
        '</div>' +
        '<div class="panel"><div class="panel-head"><h3 class="panel-title">Ajustes rápidos</h3></div>' +
          '<table class="tbl"><tbody>' + p.adjustments.map(function (a) {
            return '<tr><td><b>' + esc(a.situation) + '</b></td><td>' + esc(a.fix) + '</td></tr>';
          }).join('') + '</tbody></table>' +
        '</div>' +
      '</div>' +
      '<div class="panel" style="margin-top:1rem"><div class="panel-head"><h3 class="panel-title">Segurança narrativa para a jogadora nova</h3></div>' +
        '<ul class="clean">' + p.newcomer.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
        '<div class="callout" style="margin-top:.6rem">Toda mesa tem um sinal de pausa. Combine antes de começar e use sem drama.</div>' +
      '</div>';
  };

  /* =======================================================
     CRONOGRAMA (mestre)
     ======================================================= */
  Views.timeline = function () {
    if (!Store.isGM()) return Views.home();
    return '<div class="panel parchment" style="margin-bottom:1rem">' +
        '<div class="panel-head"><h3 class="panel-title">Cronograma de 4h30<small>Ritmo sugerido</small></h3>' +
          '<span class="round-badge" id="tl-clock">00:00</span></div>' +
        '<div class="timeline">' + A.timeline.map(function (t, i) {
          return '<div class="tl-item"><div class="tl-time">' + esc(t.time) + '</div>' +
            '<div class="tl-dot"><i></i></div>' +
            '<div class="tl-body"><h4>' + (i + 1) + '. ' + esc(t.key) + '</h4><p>' + esc(t.text) + '</p></div></div>';
        }).join('') + '</div>' +
        '<div class="alert" style="margin-top:.8rem">' + esc(A.timelineNote) + '</div>' +
      '</div>';
  };

  /* =======================================================
     NPCs
     ======================================================= */
  Views.npcs = function () {
    var isGM = Store.isGM();
    var cards = A.npcs.map(function (n) {
      return '<div class="char-card">' +
        '<div class="char-head"><div class="avatar' + (n.id === 'oren-npc' || n.id === 'guardiao-npc' ? ' foe' : '') + '">' + esc(n.name.charAt(0)) + '</div>' +
          '<div><div class="char-name">' + esc(n.name) + '</div><div class="char-meta">' + esc(n.role) + ' · ' + esc(n.where) + '</div></div></div>' +
        '<p class="char-line">' + esc(isGM ? n.open : n.open) + '</p>' +
        '<div class="kv"><b>Quer</b><span>' + esc(n.wants) + '</span></div>' +
        '<div class="kv"><b>Como fala</b><span>' + esc(n.voice) + '</span></div>' +
        '<details class="mini"><summary>O que sabe</summary><ul class="clean">' +
          n.knows.map(function (k) { return '<li>' + esc(k) + '</li>'; }).join('') + '</ul></details>' +
        gm('<details class="mini secret"><summary>Segredo (mestre)</summary><p>' + esc(n.secret) + '</p></details>') +
      '</div>';
    }).join('');
    return '<div class="panel" style="margin-bottom:1rem"><div class="panel-head">' +
        '<h3 class="panel-title">Quem habita Valebruma<small>' + A.npcs.length + ' personagens</small></h3></div>' +
        '<p style="margin:0;font-size:.9rem;color:var(--muted)">' + (isGM ? 'Os blocos de segredo só aparecem no Modo Mestre.' : 'O que a vila conta a vocês. Nem tudo, provavelmente.') + '</p>' +
      '</div>' +
      '<div class="grid cols-3">' + cards + '</div>';
  };

  /* =======================================================
     PISTAS
     ======================================================= */
  Views.clues = function () {
    var isGM = Store.isGM();
    var blocks = A.clueGroups.map(function (g) {
      var items = g.items.filter(function (i) { return isGM || Store.isRevealed('clues', i.id); });
      if (!items.length && !isGM) return '';
      return '<div class="panel clue-panel">' +
        '<div class="panel-head"><h3 class="panel-title">' + esc(g.conclusion) + '<small>' + items.length + ' de ' + g.items.length + ' pistas</small></h3></div>' +
        '<ul class="clue-list">' + g.items.map(function (i) {
          var on = Store.isRevealed('clues', i.id);
          if (!isGM && !on) return '';
          return '<li class="' + (on ? 'revealed' : 'hidden-item') + '">' +
            gm('<button class="reveal ' + (on ? 'on' : '') + '" data-action="reveal-clue" data-id="' + i.id + '" title="' + (on ? 'Entregue' : 'A entregar') + '">' + (on ? '◉' : '○') + '</button>') +
            '<span>' + esc(i.text) + '</span><em>' + esc(i.source) + '</em></li>';
        }).join('') + '</ul>' +
        '</div>';
    }).join('');

    return '<div class="panel parchment" style="margin-bottom:1rem">' +
        '<div class="panel-head"><h3 class="panel-title">Rede de pistas<small>Marque o que já foi entregue ao grupo</small></h3>' +
          gm('<div class="row"><button class="btn btn-sm" data-action="reveal-all">Revelar todas</button>' +
             '<button class="btn btn-sm btn-ghost" data-action="reveal-none">Ocultar todas</button></div>') +
        '</div>' +
        '<p style="margin:0">' + esc(A.clueRule) + '</p>' +
      '</div>' +
      '<div class="grid cols-2" style="align-items:start">' + blocks + '</div>' +
      gm('<div class="alert" style="margin-top:1rem"><b>Pista de emergência.</b> ' + esc(A.emergencyClue) + '</div>');
  };

  /* =======================================================
     PUZZLES
     ======================================================= */
  Views.puzzles = function () {
    var isGM = Store.isGM();
    var cards = A.puzzles.map(function (p) {
      var solved = !!s().solves[p.id];
      return '<details class="puzzle" ' + (isGM ? '' : 'open') + '>' +
        '<summary>' +
          '<span class="puzzle-code">' + esc(p.code) + '</span>' +
          '<span class="puzzle-title">' + esc(p.title) + '</span>' +
          '<span class="tag muted">' + esc(p.kind) + '</span>' +
          '<span class="puzzle-place">' + esc(p.place) + '</span>' +
          (solved ? '<span class="tag emerald">resolvido</span>' : '') +
        '</summary>' +
        '<div class="puzzle-body">' +
          '<div class="kv"><b>Objetivo</b><span>' + esc(p.goal) + '</span></div>' +
          '<blockquote class="narration">' + esc(p.players) + '</blockquote>' +
          (isGM && p.handouts && p.handouts.length ? '<div class="row" style="margin:.4rem 0">' + p.handouts.map(function (h) {
            var ho = A.handouts.filter(function (x) { return x.id === h; })[0];
            return ho ? '<button class="btn btn-sm" data-action="handout-open" data-id="' + ho.id + '">📜 ' + esc(ho.title) + '</button>' : '';
          }).join('') + '</div>' : '') +
          gm('<details class="mini solution"><summary>Solução e testes (mestre)</summary>' +
            '<table class="tbl"><tbody>' + p.dcs.map(function (d) {
              return '<tr><td><b>' + esc(d.skill) + '</b></td><td>' + esc(d.result) + '</td></tr>';
            }).join('') + '</tbody></table>' +
            '<ol class="steps">' + p.solution.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ol>' +
            '<div class="callout"><b>Falha para frente.</b> ' + esc(p.fail) + '</div>' +
            '<div class="callout alt"><b>Complicação.</b> ' + esc(p.twist) + '</div>' +
            '<div class="callout gold"><b>Condução.</b> ' + esc(p.gm) + '</div>' +
            '<button class="btn btn-sm ' + (solved ? 'btn-ghost' : 'btn-primary') + '" data-action="puzzle-solved" data-id="' + p.id + '">' +
              (solved ? 'Marcar como não resolvido' : 'Marcar como resolvido') + '</button>' +
          '</details>') +
        '</div>' +
      '</details>';
    }).join('');

    return '<div class="panel parchment" style="margin-bottom:1rem">' +
        '<div class="panel-head"><h3 class="panel-title">Puzzles da capela<small>' + A.puzzles.length + ' desafios — nenhum bloqueia a história</small></h3></div>' +
        '<div class="grid cols-2">' + A.puzzleRules.map(function (r) {
          return '<div class="kv"><b>' + esc(r.title) + '</b><span>' + esc(r.text) + '</span></div>';
        }).join('') + '</div>' +
      '</div>' +
      '<div class="stack">' + cards + '</div>';
  };

  /* =======================================================
     LOCAIS
     ======================================================= */
  Views.places = function () {
    var isGM = Store.isGM();
    var list = A.places.filter(function (p) { return isGM || Store.isRevealed('places', p.id); });
    if (!list.length) return '<div class="empty">Nenhum lugar revelado ainda. O mapa está enevoado.</div>';
    return '<div class="grid cols-2">' + list.map(function (p) {
      return '<div class="place-card">' +
        '<div class="panel-head"><h4>' + esc(p.name) + ' <span class="tag azure">' + esc(p.type) + '</span></h4>' +
          gm(revealBtn('places', p.id)) + '</div>' +
        '<blockquote class="narration small">' + esc(p.narration) + '</blockquote>' +
        (p.points ? '<div class="row">' + p.points.map(function (x) { return '<span class="tag muted">' + esc(x) + '</span>'; }).join('') + '</div>' : '') +
        gm('<div class="callout"><b>Mestre.</b> ' + esc(p.gm) + '</div>') +
        '</div>';
    }).join('') + '</div>' +
    gm('<div class="alert" style="margin-top:1rem">Locais ocultos não aparecem no Modo Jogador. Revele conforme o grupo chega.</div>');
  };

  /* =======================================================
     FICHAS / BESTIÁRIO (mestre)
     ======================================================= */
  Views.bestiary = function () {
    if (!Store.isGM()) return Views.home();
    return '<div class="panel" style="margin-bottom:1rem"><div class="panel-head">' +
        '<h3 class="panel-title">Fichas de criaturas e vilões<small>D&D 3.5 · números simplificados, prontos para ajustar</small></h3></div>' +
        '<p style="margin:0;font-size:.9rem;color:var(--muted)">Escolha um vilão (Oren ou Cássio) e use o guardião como antagonista central. O ND é aproximado: os ajustes por mesa valem mais que o número.</p>' +
      '</div>' +
      '<div class="stack">' + A.creatures.map(function (c, i) { return statblockCard(c, i === 0); }).join('') + '</div>';
  };

  /* =======================================================
     FINAIS (mestre)
     ======================================================= */
  Views.endings = function () {
    if (!Store.isGM()) return Views.home();
    return '<div class="panel parchment" style="margin-bottom:1rem"><div class="panel-head">' +
        '<h3 class="panel-title">Finais e consequências<small>Não mostre esta tela aos jogadores</small></h3></div></div>' +
      '<div class="grid cols-2">' + A.endings.map(function (e) {
        return '<div class="ending"><div class="ending-code">' + esc(e.id) + '</div>' +
          '<h4>' + esc(e.title) + '</h4><p>' + esc(e.text) + '</p>' +
          '<blockquote class="narration small">' + esc(e.image) + '</blockquote></div>';
      }).join('') + '</div>';
  };

  /* =======================================================
     FERRAMENTAS
     ======================================================= */
  Views.tools = function () {
    return '<div class="stack">' +
      Tools.initiative() +
      '<div style="height:1rem"></div>' +
      Tools.dice() +
      '</div>';
  };

  /* =======================================================
     DOCUMENTOS
     ======================================================= */
  Views.handouts = function () {
    return '<div class="panel" style="margin-bottom:1rem"><div class="panel-head">' +
        '<h3 class="panel-title">Documentos para entregar<small>Clique para ler em tela cheia · use Imprimir</small></h3>' +
        '<button class="btn btn-sm btn-ghost" data-action="print">Imprimir</button></div>' +
        '<p style="margin:0;font-size:.9rem;color:var(--muted)">São estes os papéis que os jogadores podem ler. Nenhum deles revela o segredo inteiro.</p>' +
      '</div>' +
      '<div class="grid cols-2">' + A.handouts.map(function (h) {
        return '<article class="handout" data-action="handout-open" data-id="' + h.id + '">' +
          '<div class="handout-kind">' + esc(h.kind) + '</div>' +
          '<h4>' + esc(h.title) + '</h4>' +
          '<div class="handout-body">' + UI.nl2br(h.body) + '</div>' +
          '<div class="handout-foot">tocar para ampliar</div>' +
        '</article>';
      }).join('') + '</div>';
  };

  /* =======================================================
     REGRAS
     ======================================================= */
  Views.rules = function () {
    return '<div class="panel parchment" style="margin-bottom:1rem"><div class="panel-head">' +
        '<h3 class="panel-title">Regras de bolso<small>D&D 3.5 sem manual na mão</small></h3></div>' +
        '<p style="margin:0">Ninguém precisa decorar nada. Estas seis linhas resolvem 90% da mesa.</p></div>' +
      '<div class="grid cols-2">' + A.rules.map(function (r) {
        return '<div class="panel"><h4 class="rule-title">' + esc(r.title) + '</h4><p style="margin:0">' + esc(r.text) + '</p></div>';
      }).join('') + '</div>';
  };

  /* =======================================================
     DIÁRIO (mestre)
     ======================================================= */
  Views.notes = function () {
    if (!Store.isGM()) return Views.home();
    var st = s();
    return '<div class="panel parchment" style="margin-bottom:1rem"><div class="panel-head">' +
        '<h3 class="panel-title">Diário do mestre<small>O que ficou desta sessão</small></h3>' +
        '<button class="btn-primary btn btn-sm" data-action="note-add">+ Anotação</button></div>' +
        (st.notes.length ? '' : '<div class="empty">Nada anotado. Depois da sessão, escreva três linhas: o que mudou, quem morreu, o que ficou pendente.</div>') +
        '<div class="stack" style="margin-top:.6rem">' + st.notes.map(function (n) {
          return '<div class="note"><div class="note-head"><span class="note-title">' + esc(n.title) + '</span>' +
            '<span class="note-ts">' + esc(n.ts) + '</span></div>' +
            '<div class="note-body">' + UI.nl2br(n.text) + '</div>' +
            '<div class="row" style="justify-content:flex-end"><button class="btn btn-sm btn-danger" data-action="note-del" data-id="' + n.id + '">Remover</button></div></div>';
        }).join('') + '</div>' +
      '</div>';
  };

  /* =======================================================
     GUIA RÁPIDO (mestre)
     ======================================================= */
  Views.guide = function () {
    if (!Store.isGM()) return Views.home();
    var st = s();
    var q = A.quickGuide;
    function checks(list, prefix) {
      return list.map(function (x, i) {
        var id = prefix + i;
        var on = !!st.checks[id];
        return '<li><label class="check ' + (on ? 'on' : '') + '">' +
          '<input type="checkbox" data-action="check" data-id="' + id + '" ' + (on ? 'checked' : '') + '>' +
          '<span>' + esc(x) + '</span></label></li>';
      }).join('');
    }
    return '<div class="grid cols-2" style="align-items:start">' +
        '<div class="stack">' +
          '<div class="panel"><div class="panel-head"><h3 class="panel-title">Antes da sessão</h3></div>' +
            '<ul class="checks">' + checks(q.before, 'b') + '</ul></div>' +
          '<div class="panel"><div class="panel-head"><h3 class="panel-title">Durante a sessão</h3></div>' +
            '<ul class="checks">' + checks(q.during, 'd') + '</ul></div>' +
        '</div>' +
        '<div class="stack">' +
          '<div class="panel"><div class="panel-head"><h3 class="panel-title">Recompensas sugeridas</h3></div>' +
            '<ul class="clean">' + q.rewards.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ul>' +
            '<div class="callout gold"><b>Resumo secreto.</b> ' + esc(q.sentence) + '</div>' +
          '</div>' +
          '<div class="panel"><div class="panel-head"><h3 class="panel-title">Mesa e dados<small>Salvos neste navegador</small></h3></div>' +
            '<div class="row">' +
              '<button class="btn btn-sm" data-action="export">Exportar</button>' +
              '<button class="btn btn-sm" data-action="import">Importar</button>' +
              '<button class="btn btn-sm btn-ghost" data-action="pin-change">Trocar senha do mestre</button>' +
              '<button class="btn btn-sm btn-danger" data-action="reset">Zerar tudo</button>' +
            '</div>' +
            '<p class="note-text">Senha atual do Modo Mestre: <b>' + esc(st.pin) + '</b> — troque antes de deixar a tela sozinha com os jogadores.</p>' +
          '</div>' +
        '</div>' +
      '</div>';
  };

  /* =======================================================
     RELÓGIO DO SELO (mestre)
     ======================================================= */
  Views.seal = function () {
    if (!Store.isGM()) return Views.home();
    var level = Math.min(Number(s().seal) || 0, 6);
    var stages = A.seal.stages;
    var current = stages[level];

    return '<div class="panel parchment" style="margin-bottom:1rem">' +
        '<div class="panel-head"><h3 class="panel-title">Relógio do selo<small>Etapa ' + level + ' de 6</small></h3>' +
          '<div class="row">' +
            '<button class="btn btn-sm btn-primary" data-action="seal-inc">Avançar</button>' +
            '<button class="btn btn-sm btn-ghost" data-action="seal-dec">Recuar</button>' +
            '<button class="btn btn-sm btn-ghost" data-action="seal-reset">Zerar</button>' +
          '</div>' +
        '</div>' +
        '<div class="seal-meter big">' + stages.map(function (sg) {
          return '<i class="' + (sg.level <= level ? 'on' : '') + '"></i>';
        }).join('') + '</div>' +
        '<p style="margin:.7rem 0 0">' + esc(A.seal.intro) + '</p>' +
        '<div class="callout gold" style="margin-top:.6rem"><b>Agora: ' + esc(current.title) + '.</b> ' + esc(current.text) +
          '<br><span class="note-text">Quando avançar: ' + esc(current.hint) + '</span></div>' +
      '</div>' +
      '<div class="stack">' + stages.map(function (sg) {
        return '<div class="seal-stage ' + (sg.level === level ? 'now' : '') + ' ' + (sg.level < level ? 'past' : '') + '">' +
          '<div class="seal-num">' + sg.level + '</div>' +
          '<div><h4>' + esc(sg.title) + '</h4><p>' + esc(sg.text) + '</p>' +
          '<span class="note-text">' + esc(sg.hint) + '</span></div>' +
        '</div>';
      }).join('') + '</div>';
  };

  /* =======================================================
     IMPROVISO (mestre)
     ======================================================= */
  Views.tables = function () {
    if (!Store.isGM()) return Views.home();
    var st = s();
    var results = st.tables || {};

    var cards = A.tables.map(function (t) {
      var res = results[t.id];
      return '<div class="panel table-card">' +
        '<div class="panel-head"><h3 class="panel-title">' + esc(t.title) + '<small>' + esc(t.note) + '</small></h3>' +
          '<button class="btn btn-sm" data-action="table-roll" data-id="' + t.id + '">Rolar d' + t.die + '</button></div>' +
        (res ? '<div class="roll-result"><b>d' + t.die + ' → ' + res.roll + '</b><span>' + esc(res.text) + '</span></div>' : '') +
        '<ol class="roll-table">' + t.rows.map(function (row, i) {
          return '<li class="' + (res && res.roll === i + 1 ? 'hit' : '') + '"><b>' + (i + 1) + '</b><span>' + esc(row) + '</span></li>';
        }).join('') + '</ol>' +
      '</div>';
    }).join('');

    var names = A.names;
    var generated = st.lastName;
    var lastRoll = st.lastNameRoll;

    var scenes = A.scenes.map(function (sc) {
      return '<article class="scene"><div class="scene-when">' + esc(sc.when) + '</div>' +
        '<h4>' + esc(sc.title) + '</h4>' +
        '<div class="narration">' + UI.nl2br(sc.text) + '</div>' +
        '</article>';
    }).join('');

    return '<div class="panel parchment" style="margin-bottom:1rem">' +
        '<div class="panel-head"><h3 class="panel-title">Improviso<small>Tabelas roláveis e cenas prontas para ler em voz alta</small></h3>' +
          '<button class="btn btn-sm" data-action="print">Imprimir</button></div>' +
        '<p style="margin:0;font-size:.9rem;color:var(--parch-dim)">Clique em <b>Rolar</b> e o resultado aparece destacado no topo da tabela. Nada é salvo como verdade: use o que servir.</p>' +
      '</div>' +
      '<div class="panel" style="margin-bottom:1rem">' +
        '<div class="panel-head"><h3 class="panel-title">Nomes de Valebruma<small>Invenção de aldeão na hora</small></h3>' +
          '<button class="btn btn-sm btn-primary" data-action="name-roll">Sortear nome</button></div>' +
        (generated ? '<div class="roll-result"><b>' + esc(generated.name) + '</b><span>' + esc(generated.trait) + '</span></div>' : '') +
        '<div class="row" style="gap:.25rem">' + names.last.map(function (n) { return '<span class="tag muted">' + esc(n) + '</span>'; }).join('') + '</div>' +
      '</div>' +
      '<div class="grid cols-2" style="align-items:start">' + cards + '</div>' +
      '<div class="panel" style="margin-top:1rem"><div class="panel-head">' +
        '<h3 class="panel-title">Cenas de leitura<small>Leia e cale a boca por três segundos</small></h3></div>' +
        '<div class="stack">' + scenes + '</div>' +
      '</div>';
  };

  window.Views = Views;
})();
