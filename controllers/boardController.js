const Board = require('../models/boardModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.prepareBody = (req, res, next) => {
  if (!req.body.name && !req.body.notes) {
    next(
      new AppError(
        'There is something missing in the body of your request',
        400
      )
    );
  }
};

exports.getAllBoards = catchAsync(async (req, res, next) => {
  const boards = await Board.find();

  res.status(200).json({
    status: 'success',
    data: {
      boards,
    },
  });
});

exports.getOneBoard = catchAsync(async (req, res, next) => {
  const board = await Board.findOne({ name: req.params.name });

  if (!board) {
    next(new AppError('Board of given name does not exist', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      board,
    },
  });
});

exports.createOneBoard = catchAsync(async (req, res, next) => {
  const board = await Board.create(req.body);

  if (!board) {
    next(new AppError('Board of given name does not exist', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      board,
    },
  });
});

exports.updateOneBoard = catchAsync(async (req, res, next) => {
  const board = await Board.findOneAndUpdate(
    { name: req.params.name },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!board) {
    next(new AppError('Board of given name does not exist', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      board,
    },
  });
});

exports.deleteOneBoard = catchAsync(async (req, res, next) => {
  const board = await Board.findOneAndDelete({ name: req.params.name });

  if (!board) {
    next(new AppError('Board of given name does not exist', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
