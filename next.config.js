const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const combinedConfig = (phase) => {
  const commonEnv = {
    mongodb_username: process.env.mongodb_username,
    mongodb_password: process.env.mongodb_password,
    mongodb_clustername: "cluster0",
  };

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      images: {
        domains: ["firebasestorage.googleapis.com"],
      },
      env: {
        ...commonEnv,
        mongodb_inquirydata: "inquiry-dev",
        mongodb_authdata: "authdata-dev",
        mongodb_noticeboarddata: "boarddata-dev",
        orders: "orders-dev",
        products: "products-dev",
      },
      // async redirects() {
      //    return [
      //     {
      //       source: '/checkout',
      //       destination: '/',
      //       permanent: false,
      //     },
      //     {
      //       source: '/error/:slug*',
      //       destination: '/',
      //       permanent: false,
      //     },
      //    ];
      // },
    };
  } else {
    return {
      env: {
        ...commonEnv,
        mongodb_inquirydata: "inquiry",
        mongodb_authdata: "authdata",
        mongodb_noticeboarddata: "boarddata",
        orders: "orders",
        products: "products",
      },
      // async redirects() {
      //   return [
      //     {
      //       source: '/checkout',
      //       destination: '/',
      //       permanent: true,
      //     },
      //     {
      //       source: '/error',
      //       destination: '/',
      //       permanent: true,
      //     },
      //   ];
      // },
    };
  }
};

module.exports = combinedConfig;
