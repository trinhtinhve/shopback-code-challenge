module.exports = {
  'hapi-swagger': {
    responses: {
      '200': {
        description: 'Success'
      },
      '400': {
        description: 'Bad Request, required params are not valid'
      },
      '401': {
        description: 'Unauthorized'
      },
      '500': {
        description: 'Internal Server Error'
      }
    }
  }
};
