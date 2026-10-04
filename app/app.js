const serviceUrl = '/odata/v4/catalog';
const list = document.querySelector('#product-list');
const editor = document.querySelector('#editor');
const form = document.querySelector('#product-form');
const status = document.querySelector('#status');

const fields = ['id', 'name', 'description', 'price', 'stock'];
const value = (id) => document.querySelector(`#${id}`).value;
const setStatus = (message) => { status.textContent = message; };
const escapeHtml = (text) => String(text ?? '').replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);

async function request(path, options = {}) {
  const response = await fetch(`${serviceUrl}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options
  });
  if (!response.ok) throw new Error((await response.text()) || '要求に失敗しました');
  return response.status === 204 ? null : response.json();
}

async function loadProducts() {
  const data = await request('/Products?$orderby=name');
  list.innerHTML = data.value.map((product) => `
    <tr><td>${escapeHtml(product.name)}</td><td>${escapeHtml(product.description)}</td>
    <td>${escapeHtml(product.price)}</td><td>${escapeHtml(product.stock)}</td>
    <td><button data-id="${product.ID}">詳細・編集</button></td></tr>`).join('');
}

function openEditor(product = {}) {
  editor.hidden = false;
  document.querySelector('#editor-title').textContent = product.ID ? '明細・編集' : '新規登録';
  fields.forEach((field) => { document.querySelector(`#${field}`).value = product[field] ?? ''; });
  document.querySelector('#check-button').disabled = !product.ID;
}

list.addEventListener('click', async (event) => {
  const id = event.target.dataset.id;
  if (!id) return;
  try { openEditor(await request(`/Products(${id})`)); } catch (error) { setStatus(error.message); }
});
document.querySelector('#new-button').addEventListener('click', () => openEditor());
document.querySelector('#cancel-button').addEventListener('click', () => { editor.hidden = true; });

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const id = value('id');
  const data = { name: value('name'), description: value('description'), price: Number(value('price') || 0), stock: Number(value('stock') || 0) };
  try {
    await request(id ? `/Products(${id})` : '/Products', { method: id ? 'PATCH' : 'POST', body: JSON.stringify(data) });
    setStatus(id ? '更新しました' : '登録しました');
    editor.hidden = true;
    await loadProducts();
  } catch (error) { setStatus(error.message); }
});

document.querySelector('#check-button').addEventListener('click', async () => {
  try {
    const result = await request('/checkProduct', { method: 'POST', body: JSON.stringify({ ID: value('id') }) });
    alert(result.message);
  } catch (error) { alert(error.message); }
});

loadProducts().catch((error) => setStatus(error.message));
