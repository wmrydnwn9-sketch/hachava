(function () {
  const H = {};
  const API = {
    async get(path) {
      const res = await fetch(path, { credentials: 'include' });
      return H.handleJson(res);
    },
    async send(path, method, data, isForm) {
      const opts = { method, credentials: 'include', headers: {} };
      if (isForm) {
        opts.body = data;
      } else if (data !== undefined) {
        opts.headers['Content-Type'] = 'application/json';
        opts.body = JSON.stringify(data);
      }
      const res = await fetch(path, opts);
      return H.handleJson(res);
    },
    post(path, data, isForm) { return API.send(path, 'POST', data, isForm); },
    patch(path, data) { return API.send(path, 'PATCH', data); },
    del(path) { return API.send(path, 'DELETE'); }
  };

  H.handleJson = async function (res) {
    let json = {};
    try { json = await res.json(); } catch (_) {}
    if (!res.ok) {
      const error = new Error(json.error || 'אירעה שגיאה.');
      error.status = res.status;
      error.payload = json;
      throw error;
    }
    return json;
  };

  H.byId = (id) => document.getElementById(id);
  H.setActiveNav = function () {
    const current = location.pathname.replace(/\/$/, '') || '/';
    document.querySelectorAll('[data-nav]').forEach((link) => {
      const href = link.getAttribute('href').replace(/\.html$/, '');
      if (href === current || (href === '/index' && current === '/')) link.classList.add('active');
    });
  };

  H.showMessage = function (el, text, error) {
    if (!el) return;
    el.textContent = text;
    el.className = 'notice' + (error ? ' error' : '');
    el.classList.remove('hidden');
  };

  H.hideMessage = function (el) {
    if (!el) return;
    el.classList.add('hidden');
  };

  H.populateProducts = function (target, categories, editable) {
    target.innerHTML = '';
    categories.forEach((category) => {
      const block = document.createElement('section');
      block.className = 'card';
      block.style.padding = '18px';
      const heading = document.createElement('h3');
      heading.textContent = category.name_he;
      block.appendChild(heading);
      const list = document.createElement('div');
      list.className = 'grid';
      list.style.gap = '12px';
      (category.products || []).forEach((product) => {
        const row = document.createElement('div');
        row.className = 'order-item';
        row.innerHTML = `<div><div style="font-weight:700">${product.name_he}</div><div class="small muted">${product.description_he || ''}</div></div>`;
        if (editable) {
          const input = document.createElement('input');
          input.type = 'number';
          input.min = '0';
          input.value = '0';
          input.dataset.productId = product.id;
          input.dataset.productName = product.name_he;
          row.appendChild(input);
        }
        list.appendChild(row);
      });
      block.appendChild(list);
      target.appendChild(block);
    });
  };

  H.updatePromoNav = async function () {
    const navLink = document.querySelector('[data-promotions-link]');
    if (!navLink) return;
    try {
      const data = await API.get('/api/promotions-public');
      if (!data.promotions || !data.promotions.length) navLink.classList.add('hidden');
    } catch (_) {
      navLink.classList.add('hidden');
    }
  };

  H.loadSiteShell = async function () {
    H.setActiveNav();
    H.updatePromoNav();
    try {
      const data = await API.get('/api/site');
      document.querySelectorAll('[data-business-name]').forEach((n) => n.textContent = data.settings.business_name || 'החווה');
      document.querySelectorAll('[data-slogan]').forEach((n) => n.textContent = data.settings.slogan || 'מהמשק לצלחת');
      document.querySelectorAll('[data-phone-link]').forEach((n) => { n.href = 'tel:' + (data.settings.phone || ''); n.textContent = data.settings.phone || ''; });
      document.querySelectorAll('[data-whatsapp-link]').forEach((n) => { n.href = data.settings.whatsapp_url || '#'; });
      document.querySelectorAll('[data-email-link]').forEach((n) => { n.href = 'mailto:' + (data.settings.email || ''); n.textContent = data.settings.email || ''; });
      document.querySelectorAll('[data-instagram-link]').forEach((n) => { n.href = data.settings.instagram_url || '#'; });
      document.querySelectorAll('[data-address]').forEach((n) => { n.textContent = data.settings.address || ''; });
      document.querySelectorAll('[data-logo]').forEach((img) => { img.src = data.settings.logo_url || '/assets/logo.png'; });
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  H.requireAdminSession = async function () {
    try {
      await API.get('/api/admin/session');
      return true;
    } catch (_) {
      if (!location.pathname.endsWith('/admin/login') && !location.pathname.endsWith('/admin/login.html')) {
        location.href = '/admin/login';
      }
      return false;
    }
  };

  H.bindAdminLayout = async function () {
    const logout = H.byId('logoutBtn');
    if (logout) {
      logout.addEventListener('click', async () => {
        await API.post('/api/admin/logout', {});
        location.href = '/admin/login';
      });
    }
  };

  window.Hachava = { API, H };
})();
