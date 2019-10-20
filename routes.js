const express = require('express')
const projectController = require('./Controllers/projectController')
const router = express.Router()

router.get('/', projectController.store )