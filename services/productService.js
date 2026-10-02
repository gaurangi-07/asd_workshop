const { readDB, writeDB } = require('../database/db');

async function getAllProducts() {
  const products = await readDB();
  return products;
}

async function getProductById(id) {
  const products = await readDB();
  const product = products.find(p => p.id === parseInt(id));
  return product || null;
}

async function createProduct(productData) {
  const products = await readDB();
  const newProduct = {
    id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
    ...productData
  };
  products.push(newProduct);
  await writeDB(products);
  return newProduct;
}

async function updateProduct(id, productData) {
  const products = await readDB();
  const index = products.findIndex(p => p.id === parseInt(id));
  if (index === -1) return null;
  products[index] = { ...products[index], ...productData, id: parseInt(id) };
  await writeDB(products);
  return products[index];
}

async function deleteProduct(id) {
  const products = await readDB();
  const index = products.findIndex(p => p.id === parseInt(id));
  if (index === -1) return null;
  const deleted = products.splice(index, 1)[0];
  await writeDB(products);
  return deleted;
}

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
