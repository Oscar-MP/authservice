'use static'

/**
 *  Autor: Sleider
 *  Date: 21/02/21
 *  Desription: In this file will be configured all the routes imported from the routes folder.
 */

const routes  = require('./routes/index.js');
const { ErrorHandler } = require('./common/helpers');
const { catch_session, catch_token } = require('./common/middlewares')

module.exports.set_routes = (server) => {

  server.get('/', (req, res) => {
   res.send({
     message: 'This is the authservice! Everything looks great.'
   });
  });

  server.use('/', routes.auth);

  // From here all routes must be performed having a valid token and session
  server.use(catch_token, catch_session);

  server.use('/', routes.users, routes.roles)
  server.use('/session', routes.sessions);


  // If the requested route does not match with any route we will return
  // a 404 error.
  server.use('/*', (req, res, next) => {
    next(new ErrorHandler(404, `Route '${req.originalUrl}' not found!`));
  });
}
