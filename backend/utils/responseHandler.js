exports.sendSuccessResponse = (data, message = 'Success') => {
    return {
      status: 'success',
      message,
      data
    };
  };
  
  exports.sendErrorResponse = (message = 'Something went wrong', data = null) => {
    return {
      status: 'error',
      message,
      data
    };
  };