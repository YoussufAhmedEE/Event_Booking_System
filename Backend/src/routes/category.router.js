const express = require('express');
const categoryRouter = express.Router();
const { getCategories } = require('../controllers/category.controller');

const { isAdmin } = require('../middlewares/authentication.middleware');

categoryRouter.get('/',isAdmin, getCategories);

module.exports = {categoryRouter};
