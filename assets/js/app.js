/* =========================================================
   app.js — navegação, modo mestre/jogador, relógio, ações
   ========================================================= */
(function () {
  'use strict';

  var esc = UI.esc;

  /* ---------------- mapa de navegação ---------------- */
  var NAV = [
    { section: 'Painel', roles: ['gm'] },
    { route: 'home', label: 'Painel do mestre', icon: 'grid', roles: ['gm'] },

    { section: 'Preparar', roles: ['gm'] },
    { route: 'truth', label: 'A verdade', icon: 'book', roles: ['gm'] },
    { route: 'prep', label: 'Preparo e equilíbrio', icon: 'shield', roles: ['gm'] },
    { route: 'timeline', label: 'Cronograma', icon: 'clock', roles: ['gm'] },
    { route: 'npcs', label: 'NPCs', icon: 'user', roles: ['gm'] },
    { route: 'clues', label: 'Pistas', icon: 'search', roles: ['gm'] },

    { section: 'Conduzir', roles: ['gm'] },
    { route: 'map', label: 'Mapa', icon: 'map', roles: ['gm'] },
    { route: 'puzzles', label: 'Puzzles', icon: 'key', roles: ['gm'] },
    { route: 'places', label: 'Locais', icon: 'pin', roles: ['gm'] },
    { route: 'bestiary', label: 'Fichas e vilões', icon: 'sword', roles: ['gm'] },
    { route: 'seal', label: 'Relógio do selo', icon: 'seal', roles: ['gm'] },
    { route: 'tables', label: 'Improviso', icon: 'spark', roles: ['gm'] },
    { route: 'handouts', label: 'Documentos', icon: 'scroll', roles: ['gm'] },
    { route: 'tools', label: 'Iniciativa e dados', icon: 'dice', roles: ['gm'] },

    { section: 'Fechar', roles: ['gm'] },
    { route: 'endings', label: 'Finais', icon: 'flag', roles: ['gm'] },
    { route: 'guide', label: 'Guia rápido', icon: 'check', roles: ['gm'] },
    { route: 'notes', label: 'Diário', icon: 'feather', roles: ['gm'] },

    /* jogador */
    { section: 'Aventura', roles: ['player'] },
    { route: 'home', label: 'Início', icon: 'grid', roles: ['player'] },
    { route: 'map', label: 'Mapa', icon: 'map', roles: ['player'] },
    { route: 'places', label: 'Lugares', icon: 'pin', roles: ['player'] },
    { route: 'rules', label: 'Como jogar', icon: 'book', roles: ['player'] },
    { route: 'tools', label: 'Dados', icon: 'dice', roles: ['player'] }
  ];

  /* o mesmo item aparece em duas seções (mapa etc.) — deduplicar por rota+role */
  function navFor(role) {
    var seen = {}, out = [];
    NAV.forEach(function (item) {
      if (item.roles.indexOf(role) < 0) return;
      if (item.section) { out.push({ section: item.section }); return; }
      var key = item.route + '|' + role;
      if (seen[key]) return;
      seen[key] = true;
      out.push(item);
    });
    return out;
  }

  var ICONS = {
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.2"/><rect x="14" y="3" width="7" height="7" rx="1.2"/><rect x="14" y="14" width="7" height="7" rx="1.2"/><rect x="3" y="14" width="7" height="7" rx="1.2"/>',
    book: '<path d="M4 4h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4z"/><path d="M20 4h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6z"/>',
    shield: '<path d="M12 3l8 3v6c0 5-4 7.5-8 9-4-1.5-8-4-8-9V6z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    map: '<path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v14M15 6v14"/>',
    key: '<circle cx="8" cy="14" r="4"/><path d="M11 11l9-9M17 4l3 3"/>',
    pin: '<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    sword: '<path d="M14 4h6v6L10 20l-3-3z"/><path d="M4 20l3-3"/>',
    scroll: '<path d="M8 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5"/><path d="M8 8h8M8 12h8M8 16h5"/>',
    dice: '<rect x="3.5" y="3.5" width="17" height="17" rx="3.5"/><circle cx="9" cy="9" r="1.2" fill="currentColor" stroke="none"/><circle cx="15" cy="15" r="1.2" fill="currentColor" stroke="none"/>',
    flag: '<path d="M5 21V4h9l-1 4 6 1-2 5H5"/>',
    check: '<path d="M4 12l5 5L20 6"/>',
    feather: '<path d="M20 3c-6.5 0-12 5.5-12 12v4h4c6.5 0 12-5.5 12-12V3z"/><path d="M4 21 15 10"/>',
    seal: '<circle cx="12" cy="10" r="6"/><path d="M8 15l-1 6 5-2.5 5 2.5-1-6"/>',
    spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M18 16l.9 2.1L21 19l-2.1.9L18 22l-.9-2.1L15 19l2.1-.9z"/>'
  };

  var ROUTES = ['home', 'map', 'truth', 'prep', 'timeline', 'npcs', 'clues', 'puzzles', 'places', 'bestiary', 'handouts', 'tools', 'endings', 'guide', 'notes', 'rules', 'seal', 'tables'];
  var GM_ONLY = { truth: 1, prep: 1, timeline: 1, bestiary: 1, endings: 1, guide: 1, notes: 1, seal: 1, tables: 1, puzzles: 1, clues: 1, npcs: 1, handouts: 1 };
  var TITLES = {
    home: 'Início', map: 'Mapa', truth: 'A verdade', prep: 'Preparo', timeline: 'Cronograma',
    npcs: 'NPCs', clues: 'Pistas', puzzles: 'Puzzles', places: 'Locais', bestiary: 'Fichas e vilões',
    handouts: 'Documentos', tools: 'Mesa', endings: 'Finais', guide: 'Guia rápido', notes: 'Diário',
    rules: 'Como jogar', seal: 'Relógio do selo', tables: 'Improviso'
  };

  var App = {
    route: 'home',
    selectedPlace: null,

    renderNav: function () {
      var role = Store.isGM() ? 'gm' : 'player';
      var nav = document.getElementById('nav');
      nav.innerHTML = navFor(role).map(function (item) {
        if (item.section) return '<div class="nav-section">' + esc(item.section) + '</div>';
        var active = item.route === App.route ? ' active' : '';
        return '<a class="nav-item' + active + '" href="#' + item.route + '" data-route="' + item.route + '">' +
          '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[item.icon] || '') + '</svg>' +
          '<span>' + esc(item.label) + '</span></a>';
      }).join('');
    },

    go: function (route) {
      if (location.hash !== '#' + route) { location.hash = '#' + route; return; }
      App.route = route;
      App.render();
    },

    render: function () {
      var role = Store.isGM() ? 'gm' : 'player';
      document.body.dataset.role = role;

      var route = App.route;
      if (GM_ONLY[route] && role !== 'gm') route = 'home';

      var host = document.getElementById('view');
      var html;
      try {
        if (route === 'home') html = Views.home();
        else if (Views[route]) html = Views[route]();
        else html = '<div class="empty">Tela não encontrada.</div>';
      } catch (err) {
        console.error(err);
        html = '<div class="empty">Erro ao desenhar a tela: ' + esc(err.message) + '</div>';
      }
      host.innerHTML = html;

      App.renderNav();

      var title = document.getElementById('top-title');
      var eye = document.getElementById('top-eyebrow');
      if (title) title.textContent = TITLES[route] || 'Mesa';
      if (eye) eye.textContent = (role === 'gm' ? 'Modo mestre' : 'Modo jogador') + ' · ' + ADV.meta.title;
      document.title = TITLES[route] + ' — ' + ADV.meta.title;

      var badge = document.getElementById('role-badge');
      if (badge) {
        badge.textContent = role === 'gm' ? 'MESTRE' : 'JOGADORES';
        badge.className = 'role-badge ' + role;
      }

      var saved = document.getElementById('pin-hint');
      if (saved) saved.hidden = role !== 'gm';

      try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) {}
    }
  };

  window.App = App;

  /* ---------------- eventos globais ---------------- */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-action]');
    if (!el) return;
    if (el.tagName === 'INPUT' || el.tagName === 'SELECT') return; // tratados no evento change
    var act = el.dataset.action;
    if (!act || !Actions[act]) return;
    e.preventDefault();
    try { Actions[act](el.dataset.id, el.dataset, el, e); }
    catch (err) { console.error(err); UI.toast('Erro: ' + err.message); }
  });

  document.addEventListener('change', function (e) {
    var el = e.target.closest('input[data-action], select[data-action]');
    if (!el) return;
    var act = el.dataset.action;
    if (!act || !Actions[act]) return;
    try { Actions[act](el.dataset.id, el.dataset, el, e); }
    catch (err) { console.error(err); UI.toast('Erro: ' + err.message); }
  });

  function syncRoute() {
    var r = (location.hash || '#home').replace('#', '');
    if (ROUTES.indexOf(r) < 0) r = 'home';
    App.route = r;
    App.render();
  }

  window.addEventListener('hashchange', syncRoute);

  /* ---------------- modo mestre / jogador ---------------- */
  Actions['role-player'] = function () {
    Store.setRole('player');
    App.selectedPlace = null;
    if (GM_ONLY[App.route]) App.route = 'home';
    App.render();
    UI.toast('Modo jogador — segredos ocultos');
  };

  Actions['role-gm'] = function () {
    if (Store.isGM()) { UI.toast('Você já está no Modo Mestre'); return; }
    UI.openForm({
      title: 'Entrar no Modo Mestre',
      hint: 'Digite a senha do mestre para ver segredos, fichas e finais.',
      fields: [{ name: 'pin', label: 'Senha', type: 'password', value: '', wide: true }],
      submitLabel: 'Entrar',
      onSubmit: function (v) {
        if (Store.setRole('gm', v.pin)) {
          App.render();
          UI.toast('Modo mestre ativo');
        } else {
          UI.toast('Senha incorreta');
          return false;
        }
      }
    });
  };

  /* ---------------- ações de conteúdo ---------------- */
  Actions['go'] = function (id, d) { if (d.route) App.go(d.route); };

  Actions['map-select'] = function (id) {
    var place = ADV.places.filter(function (p) { return p.id === id; })[0];
    if (!place) return;
    if (!Store.isGM() && !Store.isRevealed('places', id)) { UI.toast('Vocês ainda não conhecem este lugar'); return; }
    App.selectedPlace = id;
    if (App.route !== 'map') { location.hash = '#map'; return; }
    App.render();
  };

  Actions['reveal-clue'] = function (id) {
    var on = Store.reveal('clues', id);
    App.render();
    UI.toast(on ? 'Pista entregue aos jogadores' : 'Pista oculta');
  };

  Actions['reveal-place'] = function (id) {
    var on = Store.reveal('places', id);
    App.render();
    UI.toast(on ? 'Local revelado no mapa dos jogadores' : 'Local oculto');
  };

  Actions['reveal-all'] = function () {
    ADV.clueGroups.forEach(function (g) { g.items.forEach(function (i) { Store.reveal('clues', i.id, true); }); });
    App.render(); UI.toast('Todas as pistas reveladas');
  };

  Actions['reveal-none'] = function () {
    ADV.clueGroups.forEach(function (g) { g.items.forEach(function (i) { Store.reveal('clues', i.id, false); }); });
    App.render(); UI.toast('Todas as pistas ocultas');
  };

  Actions['puzzle-solved'] = function (id) {
    var st = Store.get();
    st.solves[id] = !st.solves[id];
    Store.save(); App.render();
  };

  Actions['check'] = function (id) {
    Store.toggleCheck(id);
    App.render();
  };

  Actions['handout-open'] = function (id) {
    if (!Store.isGM()) return;
    var h = ADV.handouts.filter(function (x) { return x.id === id; })[0];
    if (!h) return;
    var bd = document.createElement('div');
    bd.className = 'modal-backdrop';
    bd.innerHTML = '<div class="modal modal-handout"><article class="handout big">' +
      '<div class="handout-kind">' + esc(h.kind) + '</div>' +
      '<h4>' + esc(h.title) + '</h4>' +
      '<div class="handout-body">' + UI.nl2br(h.body) + '</div>' +
      '<div class="handout-foot">— entregue este papel aos jogadores —</div>' +
      '</article><div class="modal-actions"><button class="btn btn-ghost" data-close>Fechar</button></div></div>';
    document.getElementById('modal-root').appendChild(bd);
    bd.addEventListener('click', function (e) {
      if (e.target === bd || e.target.closest('[data-close]')) bd.remove();
    });
    document.addEventListener('keydown', function esc2(ev) {
      if (ev.key === 'Escape') { bd.remove(); document.removeEventListener('keydown', esc2); }
    });
  };

  /* ---------------- grupo ---------------- */
  function pcFields(p) {
    p = p || {};
    return [
      { name: 'name', label: 'Nome do personagem', value: p.name || '', required: true },
      { name: 'player', label: 'Jogador(a)', value: p.player || '' },
      { name: 'klass', label: 'Classe e nível', value: p.klass || '' },
      { name: 'level', label: 'Nível', type: 'number', value: p.level || 5, min: 1 },
      { name: 'ac', label: 'CA', type: 'number', value: p.ac || 15 },
      { name: 'hp', label: 'PV atuais', type: 'number', value: p.hp || 30 },
      { name: 'maxHp', label: 'PV máximos', type: 'number', value: p.maxHp || 30 },
      { name: 'init', label: 'Mod. de iniciativa', type: 'number', value: p.init || 0 }
    ];
  }

  Actions['party-add'] = function () {
    UI.openForm({
      title: 'Novo personagem', fields: pcFields(), submitLabel: 'Adicionar',
      onSubmit: function (v) {
        v.id = Store.uid('pc');
        Store.get().party.push(v);
        Store.save(); App.render(); UI.toast(v.name + ' entrou no grupo');
      }
    });
  };

  Actions['party-edit'] = function (id) {
    var p = Store.get().party.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    UI.openForm({
      title: 'Editar ' + p.name, fields: pcFields(p),
      onSubmit: function (v) {
        Object.assign(p, v);
        if (p.hp > p.maxHp) p.hp = p.maxHp;
        Store.save(); App.render();
      }
    });
  };

  Actions['party-hp'] = function (id) {
    var p = Store.get().party.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    UI.openForm({
      title: 'PV — ' + p.name,
      hint: 'Atual: ' + p.hp + '/' + p.maxHp + '. Negativo para dano, positivo para cura.',
      fields: [{ name: 'amount', label: 'Alteração', type: 'number', value: 0, wide: true }],
      onSubmit: function (v) {
        p.hp = Math.max(0, Math.min(p.maxHp, p.hp + (Number(v.amount) || 0)));
        Store.save(); App.render(); UI.toast(p.name + ': ' + p.hp + '/' + p.maxHp);
      }
    });
  };

  Actions['party-del'] = function (id) {
    var st = Store.get();
    var p = st.party.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    UI.confirm({
      title: 'Remover personagem', message: 'Remover ' + p.name + ' do grupo?',
      onOk: function () {
        st.party = st.party.filter(function (x) { return x.id !== id; });
        st.combat.combatants = st.combat.combatants.filter(function (x) { return x.linkId !== id; });
        Store.save(); App.render();
      }
    });
  };

  Actions['party-to-combat'] = function (id) {
    var st = Store.get();
    var p = st.party.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    if (st.combat.combatants.some(function (x) { return x.linkId === id; })) { UI.toast(p.name + ' já está no combate'); return; }
    Tools.add({ name: p.name, init: 10 + (Number(p.init) || 0), hp: p.hp, maxHp: p.maxHp, ac: p.ac, pc: true, linkId: p.id });
    UI.toast(p.name + ' entrou no combate');
    App.go('tools');
  };

  /* ---------------- relógio do selo ---------------- */
  Actions['seal-inc'] = function () {
    var st = Store.get();
    st.seal = Math.min(6, (Number(st.seal) || 0) + 1);
    Store.save();
    App.render();
    UI.toast('Selo: etapa ' + st.seal + ' — ' + ADV.seal.stages[st.seal].title);
  };

  Actions['seal-dec'] = function () {
    var st = Store.get();
    st.seal = Math.max(0, (Number(st.seal) || 0) - 1);
    Store.save();
    App.render();
    UI.toast('Selo: etapa ' + st.seal + ' — ' + ADV.seal.stages[st.seal].title);
  };

  Actions['seal-reset'] = function () {
    var st = Store.get();
    st.seal = 0;
    Store.save();
    App.render();
    UI.toast('Selo íntegro');
  };

  /* ---------------- tabelas de improviso ---------------- */
  Actions['table-roll'] = function (id) {
    var t = ADV.tables.filter(function (x) { return x.id === id; })[0];
    if (!t) return;
    var roll = Math.floor(Math.random() * t.die) + 1;
    var st = Store.get();
    st.tables = st.tables || {};
    st.tables[id] = { roll: roll, text: t.rows[roll - 1] };
    Store.save();
    App.render();
    UI.toast('d' + t.die + ' → ' + roll);
  };

  Actions['name-roll'] = function () {
    var n = ADV.names;
    var pick = function (arr) { return arr[Math.floor(Math.random() * arr.length)]; };
    var st = Store.get();
    st.lastName = {
      name: pick(n.first) + ' ' + pick(n.last),
      trait: pick(n.trait)
    };
    Store.save();
    App.render();
    UI.toast('Aldeão sorteado: ' + st.lastName.name);
  };

  /* ---------------- mapa ampliado ---------------- */
  Actions['map-zoom'] = function () {
    var bd = document.createElement('div');
    bd.className = 'modal-backdrop map-zoom-backdrop';
    bd.innerHTML = '<div class="map-zoom-box"><img src="assets/img/mapa-valebruma.jpg" alt="Mapa de Valebruma em tamanho grande">' +
      '<button class="btn btn-ghost map-zoom-close" data-close>Fechar</button></div>';
    document.getElementById('modal-root').appendChild(bd);
    bd.addEventListener('click', function (e) {
      if (e.target === bd || e.target.closest('[data-close]')) bd.remove();
    });
    document.addEventListener('keydown', function close(ev) {
      if (ev.key === 'Escape') { bd.remove(); document.removeEventListener('keydown', close); }
    });
  };

  /* ---------------- criaturas -> combate ---------------- */
  Actions['cbt-add-from'] = function (id) {
    var cr = ADV.creatures.filter(function (c) { return c.id === id; })[0];
    if (!cr) return;
    var hp = 20, ac = 14, init = 0;
    var mhp = /\((\d+)\s*PV\)/.exec(cr.stat.dv || '');
    if (mhp) hp = Number(mhp[1]);
    var mac = /(\d+)/.exec(cr.stat.ca || '');
    if (mac) ac = Number(mac[1]);
    var minit = /([+-]?\d+)/.exec(cr.stat.init || '');
    if (minit) init = Number(minit[1]);

    var existing = Store.get().combat.combatants.filter(function (x) { return x.name.indexOf(cr.name.split(',')[0]) === 0; }).length;
    var name = existing ? cr.name.split(',')[0] + ' ' + (existing + 1) : cr.name.split(',')[0];
    Tools.add({ name: name, init: 10 + init, hp: hp, maxHp: hp, ac: ac, notes: 'ND ' + cr.nd });
    UI.toast(name + ' no combate');
    App.go('tools');
  };

  /* ---------------- diário ---------------- */
  Actions['note-add'] = function () {
    UI.openForm({
      title: 'Anotação da sessão',
      fields: [
        { name: 'title', label: 'Título', value: 'Sessão — ' + new Date().toLocaleDateString('pt-BR'), wide: true },
        { name: 'text', label: 'Texto', type: 'textarea', rows: 6, wide: true }
      ],
      onSubmit: function (v) {
        Store.get().notes.unshift({ id: Store.uid('n'), ts: new Date().toLocaleString('pt-BR'), title: v.title, text: v.text });
        Store.save(); App.render(); UI.toast('Anotação salva');
      }
    });
  };

  Actions['note-del'] = function (id) {
    var st = Store.get();
    UI.confirm({
      title: 'Remover anotação', message: 'Apagar esta anotação?',
      onOk: function () { st.notes = st.notes.filter(function (x) { return x.id !== id; }); Store.save(); App.render(); }
    });
  };

  /* ---------------- backup ---------------- */
  Actions['print'] = function () { window.print(); };

  Actions['export'] = function () {
    var blob = new Blob([Store.exportData()], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'capela-duas-prisoes-' + new Date().toISOString().slice(0, 10) + '.json';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1500);
    UI.toast('Backup exportado');
  };

  Actions['import'] = function () { var i = document.getElementById('import-file'); if (i) i.click(); };

  Actions['pin-change'] = function () {
    UI.openForm({
      title: 'Senha do mestre',
      hint: 'Os jogadores precisam dela para abrir o Modo Mestre.',
      fields: [{ name: 'pin', label: 'Nova senha', value: Store.get().pin, wide: true, required: true }],
      onSubmit: function (v) {
        Store.setPin(v.pin);
        App.render();
        UI.toast('Senha atualizada');
      }
    });
  };

  Actions['reset'] = function () {
    UI.confirm({
      title: 'Zerar tudo', message: 'Apaga pistas reveladas, anotações, grupo e combate. Exporte um backup antes.',
      okLabel: 'Zerar', onOk: function () {
        Store.reset();
        App.route = 'home';
        App.render();
        UI.toast('Tudo zerado');
      }
    });
  };

  var fileInput = document.getElementById('import-file');
  if (fileInput) {
    fileInput.addEventListener('change', function () {
      var f = fileInput.files && fileInput.files[0];
      if (!f) return;
      var r = new FileReader();
      r.onload = function () {
        try { Store.importData(String(r.result)); App.render(); UI.toast('Backup restaurado'); }
        catch (err) { UI.toast('Arquivo inválido'); }
        fileInput.value = '';
      };
      r.readAsText(f);
    });
  }

  /* ---------------- relógio ---------------- */
  function fmt(t) {
    t = Math.max(0, Math.floor(t));
    var h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), sec = t % 60;
    function p(n) { return String(n).padStart(2, '0'); }
    return h ? p(h) + ':' + p(m) + ':' + p(sec) : p(m) + ':' + p(sec);
  }

  function paintClock() {
    var st = Store.get();
    var txt = document.getElementById('clock-text');
    if (txt) txt.textContent = fmt(st.clock.seconds);
    var box = document.getElementById('session-clock');
    if (box) box.classList.toggle('running', !!st.clock.running);
    var tl = document.getElementById('tl-clock');
    if (tl) tl.textContent = fmt(st.clock.seconds);
  }

  Actions['clock-toggle'] = function () {
    var st = Store.get();
    st.clock.running = !st.clock.running;
    Store.save(); paintClock();
    UI.toast(st.clock.running ? 'Relógio rodando' : 'Relógio pausado em ' + fmt(st.clock.seconds));
  };

  document.addEventListener('dblclick', function (e) {
    if (!e.target.closest('#session-clock')) return;
    var st = Store.get();
    st.clock.seconds = 0; st.clock.running = false;
    Store.save(); paintClock(); UI.toast('Relógio zerado');
  });

  setInterval(function () {
    var st = Store.get();
    if (!st.clock.running) return;
    st.clock.seconds++;
    paintClock();
    if (st.clock.seconds % 30 === 0) Store.save();
  }, 1000);

  /* ---------------- boot ---------------- */
  function boot() {
    syncRoute();
    paintClock();
  }

  document.addEventListener('DOMContentLoaded', boot);
  if (document.readyState === 'complete' || document.readyState === 'interactive') boot();
})();
