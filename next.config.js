const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "prokion33",
        mongodb_password: "fire135964",
        mongodb_clustername: "cluster0",
        mongodb_database: "inquiry-dev",
        mongodb_authdata: "authdata-dev"
      },
    };
  }
  return {
    env: {
      mongodb_username: "prokion33",
      mongodb_password: "fire135964",
      mongodb_clustername: "cluster0",
      mongodb_database: "inquiry",
      mongodb_authdata: "authdata"
    },
  };
};
