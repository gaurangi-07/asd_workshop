const productService = require('../services/productService');
const { invalidateCache } = require('../middleware/cache');

// GET /products
async function getAllProducts(req, res) {
  const products = await productService.getAllProducts();
  if (res.populateCache) res.populateCache(products);
  res.json(products);
}

// GET /products/:id
async function getProductById(req, res) {
  const product = await productService.getProductById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  if (res.populateCache) res.populateCache(product);
  res.json(product);
}

// POST /products
async function createProduct(req, res) {
  const newProduct = await productService.createProduct(req.body);
  invalidateCache();
  res.status(201).json(newProduct);
}

// PUT /products/:id
async function updateProduct(req, res) {
  const updated = await productService.updateProduct(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: 'Product not found' });
  invalidateCache();
  res.json(updated);
}

// PATCH /products/:id
async function patchProduct(req, res) {
  const updated = await productService.updateProduct(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: 'Product not found' });
  invalidateCache();
  res.json(updated);
}

// DELETE /products/:id
async function deleteProduct(req, res) {
  const deleted = await productService.deleteProduct(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Product not found' });
  invalidateCache();
  res.json({ message: 'Product deleted', product: deleted });
}

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, patchProduct, deleteProduct };
