/* =========================================================
   store.js — estado, persistência e semente
   ========================================================= */
(function () {
  'use strict';

  var KEY = 'capela-duas-prisoes-v1';

  function uid(p) { return (p || 'id') + '-' + Math.random().toString(36).slice(2, 8); }

  function seed() {
    return {
      v: 1,
      role: 'player',        // 'gm' | 'player'
      pin: 'mestre',
      revealed: { clues: {}, places: { vila: true, capela: true } },   // o que já foi mostrado aos jogadores
      checks: {},                            // checklist do guia rápido
      solves: {},                            // puzzles já resolvidos na mesa
      notes: [],                             // diário do mestre
      party: [
        { id: uid('pc'), name: 'Herói 1', player: '', klass: 'Nível 5', level: 5, ac: 17, hp: 45, maxHp: 45, init: 2 },
        { id: uid('pc'), name: 'Herói 2', player: '', klass: 'Nível 5', level: 5, ac: 16, hp: 42, maxHp: 42, init: 3 },
        { id: uid('pc'), name: 'Herói 3', player: '', klass: 'Nível 5', level: 5, ac: 15, hp: 38, maxHp: 38, init: 1 },
        { id: uid('pc'), name: 'Herói 4', player: '', klass: 'Nível 5', level: 5, ac: 18, hp: 48, maxHp: 48, init: 0 },
        { id: uid('pc'), name: 'Iniciante', player: '', klass: 'Nível 2', level: 2, ac: 13, hp: 14, maxHp: 14, init: 1 }
      ],
      combat: { round: 1, index: 0, active: false, combatants: [], log: [] },
      dice: { history: [], last: null },
      clock: { seconds: 0, running: false },
      session: { date: '', place: 'Valebruma', started: '' },
      seal: 0,
      tables: {},
      lastName: null
    };
  }

  var State = load();
  State.role = 'player';

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return seed();
      return migrate(JSON.parse(raw));
    } catch (e) {
      console.warn('Falha ao carregar estado; usando semente.', e);
      return seed();
    }
  }

  function migrate(d) {
    var b = seed();
    d = d || {};
    d.v = 1;
    d.role = d.role === 'player' ? 'player' : 'gm';
    d.pin = typeof d.pin === 'string' && d.pin.length ? d.pin : b.pin;
    d.revealed = Object.assign({ clues: {}, places: { vila: true, capela: true } }, d.revealed || {});
    d.revealed.clues = d.revealed.clues || {};
    d.revealed.places = d.revealed.places || {};
    d.checks = d.checks || {};
    d.solves = d.solves || {};
    d.session = Object.assign({}, b.session, d.session || {});
    d.combat = Object.assign({}, b.combat, d.combat || {});
    d.combat.combatants = d.combat.combatants || [];
    d.combat.log = d.combat.log || [];
    d.dice = Object.assign({}, b.dice, d.dice || {});
    d.dice.history = d.dice.history || [];
    d.clock = Object.assign({}, b.clock, d.clock || {});
    if (!Array.isArray(d.party)) d.party = b.party;
    if (!Array.isArray(d.notes)) d.notes = [];
    d.seal = Math.max(0, Math.min(6, Number(d.seal) || 0));
    d.tables = d.tables || {};
    d.lastName = d.lastName || null;
    return d;
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(State)); }
    catch (e) { console.error(e); if (window.UI) UI.toast('Não foi possível salvar (armazenamento cheio?)'); }
  }

  window.Store = {
    get: function () { return State; },
    save: save,
    uid: uid,
    isGM: function () { return State.role === 'gm'; },
    reset: function () { State = seed(); save(); },
    setRole: function (role, pin) {
      if (role === 'gm' && String(pin) !== String(State.pin)) return false;
      State.role = role;
      save();
      return true;
    },
    setPin: function (pin) { if (pin) { State.pin = String(pin); save(); } },
    reveal: function (type, id, value) {
      State.revealed[type] = State.revealed[type] || {};
      if (value === undefined) value = !State.revealed[type][id];
      State.revealed[type][id] = value;
      save();
      return value;
    },
    isRevealed: function (type, id) {
      var r = State.revealed[type] || {};
      return !!r[id];
    },
    toggleCheck: function (id) {
      State.checks[id] = !State.checks[id];
      save();
      return State.checks[id];
    },
    exportData: function () { return JSON.stringify(State, null, 2); },
    importData: function (txt) {
      var p = JSON.parse(txt);
      if (!p || typeof p !== 'object') throw new Error('arquivo inválido');
      State = migrate(p);
      save();
    }
  };
})();
