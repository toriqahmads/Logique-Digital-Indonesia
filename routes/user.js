const express = require('express');
const router = express.Router();
const validate = require('../app/middlewares/validation');
const validationRules = require('../app/validations/user');
const controller = require('../app/controllers/user');
const authenticator = require('../app/middlewares/authenticator');
const { upload } = require('../app/middlewares/multer');

router.post('/register', authenticator, upload.array('photos'), validationRules.create(), validate, controller.create);
router.get('/list', authenticator, validationRules.findAll(), validate, controller.findAll);
router.get('/:id', authenticator, validationRules.findById(), validate, controller.findById);
router.patch('/', authenticator, upload.array('photos'), validationRules.update(), validate, controller.update);

module.exports = router;
