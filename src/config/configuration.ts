export default () => {
  const config = {
    database: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
      name: process.env.DB_NAME,
    },
    app: {
      port: parseInt(process.env.APP_PORT || '3000', 10),
    },
  };

  return config;
};
