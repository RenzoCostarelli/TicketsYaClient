/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    // fe_api_url: process.env.apiUrl,
    apiKey: "33F85ADC279C7872D63B1B42A1B31",
    MP_PUBLIC_KEY: "APP_USR-61588964-6b13-44ce-bdc2-50541f814921",
    MP_ACCESS_TOKEN:
      "APP_USR-5729491792342125-092816-579911e43169ada6db3696d4c8b9eff7-1449054997",
    GOOGLE_ID:
      "426944037353-doj012lil9vjrbb60o8gghbrs0khh1sp.apps.googleusercontent.com",
    GOOGLE_SECRET: "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",
  },
  images: {
    remotePatterns: ["serv1.evento-simple.com"],
  },
};

module.exports = nextConfig;
