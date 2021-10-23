const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.ensureAuth = catchAsync(async (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    console.log(req.user);
    return next(
      new AppError('You donot have permission to perform this action!', 403)
    );
  }
});
