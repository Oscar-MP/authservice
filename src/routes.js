'use static'

/**
 *  Autor: Sleider
 *  Date: 21/02/21
 *  Desription: In this file will be configured all the routes imported from the routes folder.
 */

const routes  = require('./routes/index.js');

module.exports.set_routes = (server) => {

  server.get('/', (req, res) => {
   res.send({
     message: 'This is the authservice! Everything looks great.'
   });
  });

  server.use('/', routes.auth, routes.users);
  server.use('/session', routes.sessions);


  // If the requested route does not match with any route we will return
  // a 404 error.
  server.use('/*', (req, res) => {
    res.status(404).send({
      message: 'Route not found'
    });
  });
}
