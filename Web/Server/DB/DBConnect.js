require("dotenv").config();
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

// // ======test query
// let sql = "select p.product_name,p.count,p.price from product p , customer_cart cc, customer c where p.pid=cc.p_id and cc.cust_ssn=c.ssn and c.ssn=2;";

// pool.execute(sql, (err, res) => {
//   if (err) throw err;

//   res.forEach((res) => {
//     console.log(res);
//   });
// });

module.exports = pool.promise();
