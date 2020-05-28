const express = require('express');
const router = express.Router();
const RegistrationController = require('../controllers/registration');

router.get('/getList');
// router.get('/getList', RegistrationController.registration_list);
// router.post('/List', RegistrationController.post_new);
// router.put('/List/:id', RegistrationController.update_user);
// router.delete('/List/:id', RegistrationController.delete_user);

module.exports = router;
