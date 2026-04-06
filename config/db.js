
require("dotenv/config");
const { Pool } = require('pg');

const isProduction = process.env.DATABASE_URL;

const pool = new Pool({
 
  connectionString: isProduction ? process.env.DATABASE_URL : undefined,
  
  ...(isProduction ? {} : {
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATA_BASE,
    password: process.env.PASSWORD,
    port: process.env.DATABASE_PORT,
  }),

  ssl: isProduction ? { rejectUnauthorized: false } : false
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('❌ Database connect nahi ho paya:', err.stack);
  }
  console.log('✅ Database successfully connect ho gaya hai!');
  release();
});

module.exports = pool;



/*  local e liye
require("dotenv/config")
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATA_BASE,
  password: process.env.PASSWORD,
  port: process.env.DATABASE_PORT
});

pool.connect((err, client, release) => {
    if (err) {
      return console.error('❌ Database connect nahi ho paya:', err.stack);
    }
    console.log('✅ Database successfully connect ho gaya hai!');
    release(); 
  });
module.exports = pool; */