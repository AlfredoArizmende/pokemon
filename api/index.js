const server = require('./src/app');
const { conn } = require('./src/db');
require('dotenv').config();
const { PORT } = process.env;

conn.sync({ force: false }).then(() => {
  console.log('Database connected');
  server.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
  });
});
