const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const { cacheMiddleware } = require('../middleware/cache');

// GET routes use cache middleware
router.get('/', cacheMiddleware, controller.getAllProducts);
router.get('/:id', cacheMiddleware, controller.getProductById);

// Write routes — no cache middleware, but they invalidate the cache internally
router.post('/', controller.createProduct);
router.put('/:id', controller.updateProduct);
router.patch('/:id', controller.patchProduct);
router.delete('/:id', controller.deleteProduct);

module.exports = router;
