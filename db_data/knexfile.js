module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'db',
      user: 'postgres',
      password: 'docker',
      database: 'helpdesk_tracker'
    }
  },

  staging: { // leave this unchanged

  },

  production: { // leave this unchanged

  },
};