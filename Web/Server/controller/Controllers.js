// write functions here
// with queries
const db = require("../DB/DBConnect");

//  cust_ssn should be dynamic later
const getCartProducts = async (req, res) => {
  const sql = `select p.product_name,p.count as totalCnt,cc.qty,p.price,p.pid from product p , customer_cart cc, customer c 
where p.pid=cc.p_id and cc.cust_ssn=c.ssn and c.ssn=${req.query.ssn};`;

  try {
    const data = await db.execute(sql);

    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

// p_id should be dynamic later
const decProductQtyinCart = async (req, res) => {
  const sql = `update product set count=count+1 where pid=${req.params.id};`;
  const sql2 = `update customer_cart  set qty=qty-1 where p_id=${req.params.id} and cust_ssn=${req.query.ssn};`;
  try {
    await db.execute(sql);
    await db.execute(sql2);
    res.send("Done dec");
  } catch (error) {
    console.log(error);
  }
};

// ssn should be dynamic later
const incProductQtyinCart = async (req, res) => {
  const sql = `update product set count=count-1 where pid=${req.params.id};`;
  const sql2 = `update customer_cart  set qty=qty+1 where p_id=${req.params.id} and cust_ssn=${req.query.ssn};`;
  try {
    await db.execute(sql);
    await db.execute(sql2);
    res.send("Done inc");
  } catch (error) {
    console.log(error);
  }
};

// cust_ssn && p_id should be dynamic later
const deleteProductFromCart = async (req, res) => {
  const sql = `delete from customer_cart where p_id=${req.params.id} and cust_ssn=${req.query.ssn};`;
  try {
    await db.execute(sql);
    res.send("deleted");
  } catch (error) {
    console.log(error);
  }
};

// cust_ssn mudt be dynamic later
const getProductData = async (req, res) => {
  const sql = `select pid,has_offer,new_price,product_name,price,color,count, su_name,p.p_value,p.desc, 1 as favorite
from product p,suppliers s,favorites fv,customer c
where p.su_id=s.suid and  fv.p_id=p.pid and fv.cust_ssn=c.ssn  and p.pid=${req.params.id}
union all
select pid,has_offer,new_price,product_name,price,color,count, su_name,p.p_value,p.desc, 0 as favorite
from product p,suppliers s,customer c
where p.su_id=s.suid  and p.pid=${req.params.id};`;

  try {
    const data = await db.execute(sql);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

const addToCart = async (req, res) => {
  const sql = `insert into customer_cart values(${req.body.cust_ssn},${req.body.pid},${req.body.qty});`;
  const sql2 = `update product set count=count-${req.body.qty} where pid=${req.body.pid};`;
  try {
    await db.execute(sql);
    await db.execute(sql2);
    console.log("enserted");
  } catch (error) {
    console.log(error.sqlMessage);
    if (error.code == "ER_DUP_ENTRY") {
      const sql3 = `update customer_cart  set qty=qty+${req.body.qty} where p_id=${req.body.pid} and cust_ssn=${req.body.cust_ssn};`;
      const sql4 = `update product set count=count-${req.body.qty} where pid=${req.body.pid};`;
      try {
        db.execute(sql3);
        db.execute(sql4);
      } catch (error) {
        console.log(error.sqlMessage);
      }
    }
  }
};
const getOffersData = async (req, res) => {
  const sql = ` select pid,product_name,price,new_price,start_date,p.end_date,p.desc,p.p_value,p.count from product p where has_offer=1;`;
  try {
    const data = await db.execute(sql);
    res.send(data);
  } catch (error) {
    console.log(error.sqlMessage);
  }
};

const addCustomer = async (req, res) => {
  const sql1 = `insert into users (f_name,l_name,phone,address,email,authority,password) values('${req.body.firstName}','${req.body.lastName}',${req.body.phone},'${req.body.address}','${req.body.email}',"customer",'${req.body.password}');`;
  const sql3 = `select ssn from users where email="${req.body.email}" and password ="${req.body.password}"; `;
  const sql4 = `SELECT EXISTS(SELECT 1 FROM users WHERE email="${req.body.email}" ) as checked;`;
  const checkEmail = await db.execute(sql4);
  const checked = checkEmail[0][0].checked;
  if (checked === 0) {
    try {
      await db.execute(sql1);
      const data = await db.execute(sql3);
      const ssn = data[0][0].ssn;
      console.log("userid", ssn);

      const sql2 = `insert into customer(ssn) values(${ssn})`;
      await db.execute(sql2);

      res.send("Done");
      console.log("done");
    } catch (error) {
      console.log(error.sqlMessage);
    }
  } else {
    res.json("email_signed_before");
    console.log("signed before");
  }
};

const checkOnUser = async (req, res) => {
  const sql = `SELECT EXISTS(SELECT 1 FROM users WHERE email="${req.query.email}" and password='${req.query.password}') as checked;`;

  try {
    const data = await db.execute(sql);
    res.send(data);
  } catch (error) {
    console.log(error.sqlMessage);
  }
};
const getUserData = async (req, res) => {
  const sql = `SELECT ssn,f_name,l_name,phone,address,authority FROM users u
   where email='${req.query.email}' and password='${req.query.password}';`;
  try {
    const data = await db.execute(sql);
    res.send(data);
  } catch (error) {
    console.log(error.sqlMessage);
  }
};

const addOrder = async (req, res) => {
  const sql = `insert into orders (price,date,cust_ssn,sc_id)
   values(${req.body.total},'${req.body.date}',${req.body.cust_ssn},${req.body.scid});`;
  const sql3 = `   select max(oid) as maxOrderId from orders `;
  const sql4 = `delete from customer_cart where cust_ssn = ${req.body.cust_ssn}`;
  try {
    await db.execute(sql);
    const cartProducts = req.body.products;
    console.log(cartProducts);

    const data = await db.execute(sql3);
    const oid = data[0][0].maxOrderId;

    console.log(oid);
    for (const product of cartProducts) {
      const sql2 = `insert into contains values (${oid},${product.pid},${product.qty})`;
      await db.execute(sql2);
    }

    await db.execute(sql4);
    res.send("Done");
  } catch (error) {
    console.log(error.sqlMessage);
  }
};

const getShippingCompData = async (req, res) => {
  const sql = `SELECT * FROM hardwhere.shipping_company;`;
  try {
    const data = await db.execute(sql);

    res.send(data);
  } catch (error) {
    console.log(error.sqlMessage);
  }
};
module.exports = {
  getCartProducts,
  decProductQtyinCart,
  incProductQtyinCart,
  deleteProductFromCart,
  getProductData,
  addToCart,
  getOffersData,
  addCustomer,
  checkOnUser,
  getUserData,
  addOrder,
  getShippingCompData,
};
