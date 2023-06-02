require("dotenv").config();

const PORT = process.env.PORT || 7000;

export default {
  app: {
    appName: process.env.APP_NAME || "ShoomaApp",
    environment: process.env.NODE_ENV || "development",
    companyName: process.env.COMPANY_NAME || "ShoomaApp",
    appSecret: process.env.SERVER_SECRET || "ShoomaAppSecrete",
    encryptionKey: process.env.SERVER_SECRET || "ShoomaAppSecret",
    baseUrl: process.env.BASE_URL || `http://localhost:${PORT}`,
    serviceUrl: `${process.env.SERVICE_URL}` || `http://localhost:${PORT}`,
    port: PORT,
  },
  api: {
    lang: "en",
    prefix: "^/api/v[0-9]+",
    versions: [1],
    resources: "^/resources/[a-zA-Z-]+",
    pagination: {
      itemsPerPage: 10,
    },
    jsonFeedApiKey: process.env.API_KEY,
    expiresIn: "60d",
  },
  db: {
    uri: process.env.DB_URL || "mongodb://localhost:27017/shooma",
  },
};
