/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    // fe_api_url: process.env.apiUrl,
    apiKey: "33F85ADC279C7872D63B1B42A1B31",
    MP_PUBLIC_KEY: "APP_USR-61588964-6b13-44ce-bdc2-50541f814921",
    MP_ACCESS_TOKEN:
      "TEST-1906164796250883-022613-42d50ab6d1b2a73a2b12625d044ee785-54797482",
    GOOGLE_ID:
      "426944037353-doj012lil9vjrbb60o8gghbrs0khh1sp.apps.googleusercontent.com",
    GOOGLE_SECRET: "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",
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "**"
      }
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
