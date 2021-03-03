'use strict'

const session_service = require('../services/session.service.js');

module.exports.list_active_sessions = async (req, res, next) => {
  // Lists all active sessions.

  try {
    var sessions = await session_service.get_active_session();
  } catch (e) {
    console.log('[!] Could not list sessions', e);
    return res.status(500).send({
      message: 'There was a problem listing the active sessions'
    });
  }

  let message = !sessions ? 'No active sessions found' : 'The sessions have been listed';

  return res.status(200).send({
    message: message,
    data: sessions
  })

}
