/* =========================================================
   ui.js — utilidades de interface
   ========================================================= */
(function () {
  'use strict';

  function esc(v) {
    return String(v == null ? '' : v)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function nl2br(v) {
    return esc(v).replace(/\n/g, '<br>');
  }

  function paras(v) {
    return String(v || '').split(/\n{2,}/).map(function (p) {
      return '<p>' + esc(p.trim()).replace(/\n/g, '<br>') + '</p>';
    }).join('');
  }

  function toast(msg) {
    var root = document.getElementById('toast-root');
    if (!root) return;
    var el = document.createElement('div');
    el.className = 'toast';
    el.textContent = msg;
    root.appendChild(el);
    setTimeout(function () { el.classList.add('out'); setTimeout(function () { el.remove(); }, 250); }, 2200);
  }

  var openEl = null;

  function closeModal() {
    if (!openEl) return;
    openEl.remove();
    openEl = null;
    document.removeEventListener('keydown', onKey);
  }

  function onKey(e) { if (e.key === 'Escape') closeModal(); }

  function mount(html) {
    closeModal();
    var bd = document.createElement('div');
    bd.className = 'modal-backdrop';
    bd.innerHTML = '<div class="modal" role="dialog" aria-modal="true">' + html + '</div>';
    bd.addEventListener('mousedown', function (e) { if (e.target === bd) closeModal(); });
    document.getElementById('modal-root').appendChild(bd);
    openEl = bd;
    document.addEventListener('keydown', onKey);
    var f = bd.querySelector('input, textarea, select, button');
    if (f) setTimeout(function () { f.focus(); }, 40);
    return bd;
  }

  function openForm(cfg) {
    var fields = cfg.fields || [];
    var px = 'f' + Math.random().toString(36).slice(2, 7);

    function fieldHtml(f) {
      var id = px + '-' + f.name;
      var at = 'name="' + esc(f.name) + '" id="' + id + '"' + (f.required ? ' required' : '');
      var input, type = f.type || 'text';
      if (type === 'textarea') {
        input = '<textarea ' + at + ' rows="' + (f.rows || 3) + '" placeholder="' + esc(f.placeholder || '') + '">' + esc(f.value || '') + '</textarea>';
      } else if (type === 'select') {
        input = '<select ' + at + '>' + (f.options || []).map(function (o) {
          var v = typeof o === 'string' ? o : o.value;
          var l = typeof o === 'string' ? o : o.label;
          return '<option value="' + esc(v) + '"' + (String(f.value) === String(v) ? ' selected' : '') + '>' + esc(l) + '</option>';
        }).join('') + '</select>';
      } else if (type === 'checkbox') {
        input = '<input type="checkbox" ' + at + (f.value ? ' checked' : '') + '>';
      } else if (type === 'number') {
        input = '<input type="number" ' + at + ' value="' + esc(f.value == null ? '' : f.value) + '"' +
          (f.min !== undefined ? ' min="' + f.min + '"' : '') + ' step="' + (f.step || 1) + '">';
      } else {
        input = '<input type="' + type + '" ' + at + ' value="' + esc(f.value == null ? '' : f.value) + '" placeholder="' + esc(f.placeholder || '') + '">';
      }
      return '<label class="field' + (f.wide ? ' wide' : '') + '"><span>' + esc(f.label) + '</span>' + input + '</label>';
    }

    var bd = mount(
      '<h3>' + esc(cfg.title || 'Novo') + '</h3>' +
      (cfg.hint ? '<p class="hint">' + esc(cfg.hint) + '</p>' : '<div class="rule"><i></i></div>') +
      '<form>' +
        '<div class="form-grid">' + fields.map(fieldHtml).join('') + '</div>' +
        '<div class="modal-actions">' +
          '<button type="button" class="btn btn-ghost" data-close>Cancelar</button>' +
          '<button type="submit" class="btn btn-primary">' + esc(cfg.submitLabel || 'Salvar') + '</button>' +
        '</div>' +
      '</form>'
    );

    var form = bd.querySelector('form');
    bd.querySelector('[data-close]').addEventListener('click', closeModal);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = {};
      fields.forEach(function (f) {
        var el = form.elements[f.name];
        if (!el) return;
        if ((f.type || 'text') === 'checkbox') v[f.name] = el.checked;
        else if (f.type === 'number') v[f.name] = el.value === '' ? null : Number(el.value);
        else v[f.name] = el.value;
      });
      if (!cfg.onSubmit || cfg.onSubmit(v) !== false) closeModal();
    });
    return form;
  }

  function confirmBox(cfg) {
    var bd = mount(
      '<h3>' + esc(cfg.title || 'Confirmar') + '</h3>' +
      '<p class="hint">' + esc(cfg.message || 'Tem certeza?') + '</p>' +
      '<div class="modal-actions">' +
        '<button type="button" class="btn btn-ghost" data-close>Cancelar</button>' +
        '<button type="button" class="btn btn-danger" data-ok>' + esc(cfg.okLabel || 'Confirmar') + '</button>' +
      '</div>'
    );
    bd.querySelector('[data-close]').addEventListener('click', closeModal);
    bd.querySelector('[data-ok]').addEventListener('click', function () {
      closeModal();
      if (cfg.onOk) cfg.onOk();
    });
  }

  function hpBucket(hp, max) {
    if (max <= 0) return '';
    if (hp <= 0) return 'zero';
    var p = hp / max;
    return p <= 0.25 ? 'crit' : (p <= 0.6 ? 'warn' : '');
  }

  window.UI = {
    esc: esc, nl2br: nl2br, paras: paras, toast: toast,
    openForm: openForm, confirm: confirmBox, closeModal: closeModal,
    hpBucket: hpBucket,
    today: function () { return new Date().toISOString().slice(0, 10); }
  };

  window.Actions = window.Actions || {};
})();
