const express = require('express');
const controller = require('../controllers/boardController');

const router = express.Router();

router
  .route('/')
  .get(controller.getAllBoards)
  .post(controller.prepareBody, controller.createOneBoard);
router
  .route('/:name')
  .get(controller.getOneBoard)
  .patch(controller.prepareBody, controller.updateOneBoard)
  .delete(controller.deleteOneBoard);

module.exports = router;
