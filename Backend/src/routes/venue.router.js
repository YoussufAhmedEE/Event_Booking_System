const express = require('express');
const venueRouter = express.Router();
const upload = require('../middlewares/image.middleware');
const { getVenues } = require('../controllers/venue.controller');
const { isAdmin } = require('../middlewares/authentication.middleware');

venueRouter.get('/',isAdmin, getVenues );

module.exports = {venueRouter};
