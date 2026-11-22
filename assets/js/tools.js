/* =========================================================
   tools.js — iniciativa e dados (ferramentas de mesa)
   ========================================================= */
(function () {
  'use strict';

  var esc = UI.esc;
  function S() { return Store.get(); }
  function C() { return S().combat; }

  var CONDITIONS = ['Atordoado', 'Caído', 'Cego', 'Enfeitiçado', 'Envenenado', 'Amedrontado',
    'Agarrado', 'Incapacitado', 'Invisível', 'Paralisado', 'Petrificado', 'Propenso',
    'Inconsciente', 'Concentração', 'Escudo da fé', 'Sobrenatural'];

  function log(text) {
    var c = C();
    c.log.unshift({ round: c.round, text: text, time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) });
    if (c.log.length > 60) c.log.length = 60;
  }

  function syncParty(c) {
    if (!c.linkId) return;
    var p = S().party.filter(function (x) { return x.id === c.linkId; })[0];
    if (p) { p.hp = c.hp; }
  }

  function sortList() {
    var c = C();
    var cur = c.active ? c.combatants[c.index] : null;
    c.combatants.sort(function (a, b) { return b.init - a.init || (a.pc ? -1 : 1); });
    if (cur) { var i = c.combatants.indexOf(cur); c.index = i >= 0 ? i : 0; } else c.index = 0;
  }

  var Tools = {
    CONDITIONS: CONDITIONS,

    add: function (d) {
      var c = C();
      var hp = d.hp == null ? 10 : Number(d.hp);
      var max = d.maxHp == null ? hp : Number(d.maxHp);
      var cbt = {
        id: Store.uid('cbt'), name: d.name || 'Sem nome', init: Number(d.init) || 0,
        hp: hp, maxHp: Math.max(max, hp), ac: Number(d.ac) || 10,
        pc: !!d.pc, linkId: d.linkId || null, conditions: [], notes: d.notes || ''
      };
      c.combatants.push(cbt);
      sortList();
      Store.save();
      return cbt;
    },

    next: function () {
      var c = C();
      if (!c.combatants.length) return null;
      c.active = true;
      c.index++;
      if (c.index >= c.combatants.length) { c.index = 0; c.round++; log('— Rodada ' + c.round + ' —'); }
      Store.save();
      return c.combatants[c.index];
    },

    reset: function () { var c = C(); c.round = 1; c.index = 0; c.active = false; log('Combate reiniciado'); Store.save(); },
    clear: function () { var c = C(); c.combatants = []; c.log = []; c.round = 1; c.index = 0; c.active = false; Store.save(); },

    hp: function (id, delta) {
      var c = C();
      var cbt = c.combatants.filter(function (x) { return x.id === id; })[0];
      if (!cbt) return;
      var before = cbt.hp;
      cbt.hp = Math.max(0, Math.min(cbt.maxHp, cbt.hp + delta));
      var diff = cbt.hp - before;
      if (diff) {
        log(cbt.name + (diff < 0 ? ' sofreu ' + Math.abs(diff) + ' de dano' : ' recuperou ' + diff + ' PV') + ' (' + cbt.hp + '/' + cbt.maxHp + ')');
        if (before > 0 && cbt.hp === 0) log(cbt.name + ' caiu!');
        if (cbt.name.indexOf('Guardião') === 0 && diff < 0) log('O chão vibra. Algo responde lá embaixo.');
      }
      syncParty(cbt);
      Store.save();
    },

    /* ---------------- render ---------------- */
    initiative: function () {
      var c = C();
      var rows = c.combatants.map(function (cbt, i) {
        var pct = cbt.maxHp ? Math.max(0, Math.min(100, (cbt.hp / cbt.maxHp) * 100)) : 0;
        var cur = c.active && i === c.index;
        var conds = cbt.conditions.map(function (x) {
          return '<span class="tag muted">' + esc(x) + '<button data-action="cbt-cond-del" data-id="' + cbt.id + '" data-cond="' + esc(x) + '">&times;</button></span>';
        }).join('');
        var opt = ['<option value="">+ condição…</option>'].concat(
          CONDITIONS.filter(function (x) { return cbt.conditions.indexOf(x) < 0; })
            .map(function (x) { return '<option value="' + esc(x) + '">' + esc(x) + '</option>'; })
        ).join('');

        return '<div class="combatant ' + (cbt.pc ? 'pc' : 'foe') + (cur ? ' current' : '') + (cbt.hp <= 0 ? ' down' : '') + '">' +
          '<div class="init-score">' + cbt.init + '</div>' +
          '<div><div class="cbt-name">' + (cur ? '▶ ' : '') + esc(cbt.name) + '</div>' +
            '<div class="cbt-sub"><span class="tag ' + (cbt.pc ? 'emerald' : 'bl') + '">' + (cbt.pc ? 'Herói' : 'Inimigo') + '</span>' +
            '<span>CA ' + cbt.ac + '</span>' + (conds ? '<span class="row" style="gap:.2rem">' + conds + '</span>' : '') +
            (cbt.notes ? '<span style="opacity:.7">· ' + esc(cbt.notes) + '</span>' : '') + '</div></div>' +
          '<div class="cbt-hp">' +
            '<div class="cbt-hp-top"><span>' + cbt.hp + ' / ' + cbt.maxHp + ' PV</span><span>' + Math.round(pct) + '%</span></div>' +
            '<div class="bar ' + UI.hpBucket(cbt.hp, cbt.maxHp) + '"><i style="width:' + pct + '%"></i></div>' +
            '<div class="row" style="gap:.25rem;margin-top:.3rem">' +
              '<input type="number" data-hp-amount placeholder="0" style="width:56px">' +
              '<button class="btn btn-sm btn-danger" data-action="cbt-dmg" data-id="' + cbt.id + '">Dano</button>' +
              '<button class="btn btn-sm" data-action="cbt-heal" data-id="' + cbt.id + '">Cura</button>' +
              '<select data-cond-select data-id="' + cbt.id + '" style="width:auto;padding:.18rem .3rem;font-size:.72rem">' + opt + '</select>' +
            '</div>' +
          '</div>' +
          '<div class="cbt-actions">' +
            '<button class="icon-btn" data-action="cbt-remove" data-id="' + cbt.id + '" title="Remover">&times;</button>' +
          '</div>' +
        '</div>';
      }).join('');

      var logs = c.log.length ? c.log.map(function (l) {
        return '<div class="log-item"><b>R' + l.round + '</b><span>' + esc(l.text) + '</span><span class="t">' + l.time + '</span></div>';
      }).join('') : '<div class="empty">Nenhum evento ainda.</div>';

      return '<div class="grid cols-2" style="align-items:start">' +
        '<div class="panel parchment">' +
          '<div class="panel-head"><h3 class="panel-title">Ordem de combate<small>' +
            (c.active && c.combatants[c.index] ? 'Vez de ' + esc(c.combatants[c.index].name) : 'Combate parado') +
          '</small></h3><span class="round-badge">Rodada ' + c.round + '</span></div>' +
          '<div class="row" style="margin-bottom:.8rem">' +
            '<button class="btn btn-primary" data-action="cbt-next">Próximo turno</button>' +
            '<button class="btn" data-action="cbt-reset">Reiniciar</button>' +
            '<button class="btn btn-ghost" data-action="cbt-add">+ Combatente</button>' +
            '<button class="btn btn-ghost" data-action="cbt-party">Grupo</button>' +
            '<button class="btn btn-ghost" data-action="cbt-clear">Limpar</button>' +
          '</div>' +
          (c.combatants.length ? '<div class="initiative-list">' + rows + '</div>'
            : '<div class="empty">Ninguém em combate. Use <b>Grupo</b> para trazer os heróis ou <b>+ Combatente</b> para os inimigos.</div>') +
        '</div>' +
        '<div class="panel"><div class="panel-head"><h3 class="panel-title">Registro<small>Dano, cura e quedas</small></h3></div>' +
        '<div class="log-list">' + logs + '</div></div>' +
      '</div>';
    },

    dice: function () {
      var s = S();
      var last = s.dice.last;
      var hist = s.dice.history.length ? s.dice.history.map(function (h) {
        return '<span class="dice-chip" title="' + esc(h.rolls.join(', ')) + '">' + esc(h.note) + ' → <b>' + h.total + '</b></span>';
      }).join('') : '<span class="empty" style="padding:.5rem 1rem">Sem rolagens.</span>';

      var crit = last && last.sides === 20 && last.qty === 1 && Math.max.apply(null, last.rolls) === 20;
      var fumble = last && last.sides === 20 && last.qty === 1 && last.mode === 'normal' && last.rolls[0] === 1;

      return '<div class="grid cols-2" style="align-items:start">' +
        '<div class="panel parchment">' +
          '<div class="panel-head"><h3 class="panel-title">Mesa de dados<small>Escolha um dado</small></h3></div>' +
          '<div class="dice-stage"><div class="dice-result ' + (crit ? 'crit' : fumble ? 'fumble' : '') + '" id="dice-result">' + (last ? last.total : '—') + '</div>' +
          '<div class="dice-detail">' + (last ? esc(last.note) + (last.rolls.length > 1 ? ' · [' + last.rolls.join(', ') + ']' : '') : 'Ajuste e role') + '</div></div>' +
          '<div class="form-grid" style="margin-top:1rem">' +
            '<label class="field"><span>Quantidade</span><input type="number" id="dice-qty" min="1" max="30" value="1"></label>' +
            '<label class="field"><span>Modificador</span><input type="number" id="dice-mod" value="0"></label>' +
            '<label class="field wide"><span>Modo (d20)</span><select id="dice-mode">' +
              '<option value="normal">Normal</option><option value="adv">Vantagem</option><option value="dis">Desvantagem</option></select></label>' +
          '</div>' +
          '<div class="dice-grid" style="margin-top:1rem">' +
            [4, 6, 8, 10, 12, 20, 100].map(function (d) {
              return '<button class="die-btn" data-action="dice-roll" data-sides="' + d + '">d' + d + '</button>';
            }).join('') +
          '</div>' +
        '</div>' +
        '<div class="stack">' +
          '<div class="panel"><div class="panel-head"><h3 class="panel-title">Histórico</h3>' +
            '<button class="btn btn-sm btn-ghost" data-action="dice-clear">Limpar</button></div>' +
            '<div class="dice-history">' + hist + '</div></div>' +
          '<div class="panel"><div class="panel-head"><h3 class="panel-title">Rolagens prontas</h3></div>' +
            '<div class="row" style="gap:.35rem">' +
              '<button class="btn btn-sm" data-action="dice-quick" data-sides="20" data-qty="1" data-mod="0">Iniciativa</button>' +
              '<button class="btn btn-sm" data-action="dice-quick" data-sides="20" data-qty="1" data-mod="5">Perícia +5</button>' +
              '<button class="btn btn-sm" data-action="dice-quick" data-sides="8" data-qty="1" data-mod="4">Guardião 1d8+4</button>' +
              '<button class="btn btn-sm" data-action="dice-quick" data-sides="6" data-qty="3" data-mod="3">Furtivo 3d6+3</button>' +
              '<button class="btn btn-sm" data-action="dice-quick" data-sides="20" data-qty="1" data-mod="1">Reflexos</button>' +
            '</div></div>' +
        '</div>' +
      '</div>';
    }
  };

  window.Tools = Tools;

  /* ---------- ações ---------- */
  Actions['cbt-add'] = function () {
    UI.openForm({
      title: 'Adicionar combatente',
      fields: [
        { name: 'name', label: 'Nome', required: true, placeholder: 'Guardiã de Pedra 1' },
        { name: 'init', label: 'Iniciativa', type: 'number', value: 10 },
        { name: 'hp', label: 'PV', type: 'number', value: 20 },
        { name: 'maxHp', label: 'PV máximo', type: 'number', value: 20 },
        { name: 'ac', label: 'CA', type: 'number', value: 14 },
        { name: 'pc', label: 'É um herói?', type: 'checkbox' },
        { name: 'notes', label: 'Notas', wide: true }
      ],
      submitLabel: 'Entrar no combate',
      onSubmit: function (v) { Tools.add(v); App.render(); UI.toast(v.name + ' entrou no combate'); }
    });
  };

  Actions['cbt-party'] = function () {
    var s = S(), n = 0;
    s.party.forEach(function (p) {
      if (s.combat.combatants.some(function (x) { return x.linkId === p.id; })) return;
      Tools.add({ name: p.name, init: 10 + (Number(p.init) || 0), hp: p.hp, maxHp: p.maxHp, ac: p.ac, pc: true, linkId: p.id });
      n++;
    });
    UI.toast(n ? n + ' herói(s) no combate' : 'Todos já estão no combate');
    App.render();
  };

  Actions['cbt-next'] = function () { var n = Tools.next(); if (n) UI.toast('Vez de ' + n.name); App.render(); };
  Actions['cbt-reset'] = function () { Tools.reset(); App.render(); UI.toast('Combate reiniciado'); };
  Actions['cbt-clear'] = function () {
    UI.confirm({ title: 'Limpar combate', message: 'Remove todos os combatentes e o registro. As fichas do grupo continuam.', okLabel: 'Limpar', onOk: function () { Tools.clear(); App.render(); } });
  };
  Actions['cbt-remove'] = function (id) {
    var c = C();
    c.combatants = c.combatants.filter(function (x) { return x.id !== id; });
    if (c.index >= c.combatants.length) c.index = Math.max(0, c.combatants.length - 1);
    Store.save(); App.render();
  };
  Actions['cbt-dmg'] = function (id, d, el) {
    var inp = el.closest('.combatant').querySelector('[data-hp-amount]');
    var n = Number(inp && inp.value);
    if (!n || n <= 0) { UI.toast('Digite o dano'); return; }
    Tools.hp(id, -Math.abs(n)); App.render();
  };
  Actions['cbt-heal'] = function (id, d, el) {
    var inp = el.closest('.combatant').querySelector('[data-hp-amount]');
    var n = Number(inp && inp.value);
    if (!n || n <= 0) { UI.toast('Digite a cura'); return; }
    Tools.hp(id, Math.abs(n)); App.render();
  };
  Actions['cbt-cond-del'] = function (id, d) {
    var c = C();
    var cbt = c.combatants.filter(function (x) { return x.id === id; })[0];
    if (!cbt) return;
    cbt.conditions = cbt.conditions.filter(function (x) { return x !== d.cond; });
    Store.save(); App.render();
  };

  document.addEventListener('change', function (e) {
    var sel = e.target.closest && e.target.closest('[data-cond-select]');
    if (!sel || !sel.value) return;
    var c = C();
    var cbt = c.combatants.filter(function (x) { return x.id === sel.dataset.id; })[0];
    if (cbt && cbt.conditions.indexOf(sel.value) < 0) {
      cbt.conditions.push(sel.value);
      log(cbt.name + ': ' + sel.value);
      Store.save(); App.render();
    }
  });

  /* ---------- dados ---------- */
  function rnd(s) { return Math.floor(Math.random() * s) + 1; }

  function roll(sides, o) {
    o = o || {};
    var qty = Math.max(1, Math.min(30, Number(o.qty) || 1));
    var mod = Number(o.mod) || 0;
    var mode = o.mode || 'normal';
    var rolls = [], total = 0, note = '';
    if (sides === 20 && qty === 1 && mode !== 'normal') {
      var a = rnd(20), b = rnd(20);
      var ch = mode === 'adv' ? Math.max(a, b) : Math.min(a, b);
      rolls = [a, b]; total = ch + mod;
      note = (mode === 'adv' ? 'vantagem' : 'desvantagem') + ': ' + a + '/' + b + ' → ' + ch;
    } else {
      for (var i = 0; i < qty; i++) rolls.push(rnd(sides));
      total = rolls.reduce(function (x, y) { return x + y; }, 0) + mod;
      note = qty + 'd' + sides + (mod ? (mod > 0 ? ' + ' + mod : ' − ' + Math.abs(mod)) : '');
    }
    var entry = { sides: sides, qty: qty, mod: mod, mode: mode, rolls: rolls, total: total, note: note, ts: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) };
    var s = Store.get();
    s.dice.history.unshift(entry);
    if (s.dice.history.length > 24) s.dice.history.length = 24;
    s.dice.last = entry;
    Store.save();
    return entry;
  }

  Actions['dice-roll'] = function (id, d) {
    var q = document.getElementById('dice-qty'), m = document.getElementById('dice-mod'), mo = document.getElementById('dice-mode');
    roll(Number(d.sides), { qty: q && q.value, mod: m && m.value, mode: mo && mo.value });
    App.render();
    var el = document.getElementById('dice-result');
    if (el) { el.classList.remove('rolling'); void el.offsetWidth; el.classList.add('rolling'); }
  };

  Actions['dice-quick'] = function (id, d) {
    roll(Number(d.sides), { qty: d.qty, mod: d.mod });
    App.render();
    var el = document.getElementById('dice-result');
    if (el) { el.classList.remove('rolling'); void el.offsetWidth; el.classList.add('rolling'); }
  };

  Actions['dice-clear'] = function () {
    var s = Store.get();
    s.dice.history = []; s.dice.last = null; Store.save(); App.render();
  };
})();
