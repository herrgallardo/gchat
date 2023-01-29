const express = require('express');
const {
  invite,
  accept,
  reject,
  getAll,
} = require('../controllers/invitationControllers');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/invite').post(protect, invite);
router.route('/accept').post(protect, accept);
router.route('/reject').post(protect, reject);
router.route('/getall').post(protect, getAll);

module.exports = router;
