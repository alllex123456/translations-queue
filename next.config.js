const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongo_user: 'alex',
        mongo_pass: 'andaluzia231178',
        mongo_database: 'translationsQueue',
        mongo_cluster: 'cluster0',
      },
    };
  }
  return {
    env: {
      mongo_user: 'alex',
      mongo_pass: 'andaluzia231178',
      mongo_database: 'translationsQueue',
      mongo_cluster: 'cluster0',
    },
  };
};
