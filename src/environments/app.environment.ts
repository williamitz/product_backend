export default () => ({
  port: parseInt(process.env.SERVER_PORT, 10) || 8080,
  mode: process.env.SERVER_MODE || 'development',

  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
});
