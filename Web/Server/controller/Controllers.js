// write functions here
// with queries
const db = require("../DB/DBConnect");

//  cust_ssn should be dynamic later
const getCartProducts = async (req, res) => {
  const sql = `select p.product_name,p.count as totalCnt,cc.qty,p.price,p.pid,p.img_link from product p , customer_cart cc, customer c 
where p.pid=cc.p_id and cc.cust_ssn=c.ssn and c.ssn=${req.query.ssn};`;

  try {
    const data = await db.execute(sql);

    res.json({ status: true, data: data[0] });
  } catch (error) {
    console.log(error);
    res.json({ status: false, message: error.sqlMessage });
  }
};

// p_id should be dynamic later
const decProductQtyinCart = async (req, res) => {
  const sql = `update product set count=count+1 where pid=${req.params.id};`;
  const sql2 = `update customer_cart  set qty=qty-1 where p_id=${req.params.id} and cust_ssn=${req.query.ssn};`;
  const sql3 = `select exists(select * from customer_cart where cust_ssn =${req.query.ssn} and p_id=${req.params.id}) as has`;
  const checked = await db.execute(sql3);

  if (checked[0][0].has === 1) {
    try {
      await db.execute(sql);
      await db.execute(sql2);
      res.send({ status: true, message: "decremented" });
    } catch (error) {
      console.log(error);
      res.json({ status: false, message: error.sqlMessage });
    }
  } else {
    res.json({ status: false, message: "this product is't in this cart" });
  }
};

// ssn should be dynamic later
const incProductQtyinCart = async (req, res) => {
  const sql = `update product set count=count-1 where pid=${req.params.id};`;
  const sql2 = `update customer_cart  set qty=qty+1 where p_id=${req.params.id} and cust_ssn=${req.query.ssn};`;
  const sql3 = `select exists(select * from customer_cart where cust_ssn =${req.query.ssn} and p_id=${req.params.id}) as has`;
  const checked = await db.execute(sql3);

  if (checked[0][0].has === 1) {
    try {
      await db.execute(sql);
      await db.execute(sql2);
      res.send({ status: true, message: "incremented" });
    } catch (error) {
      console.log(error);
      res.json({ status: false, message: error.sqlMessage });
    }
  } else {
    res.json({ status: false, message: "this product is't in this cart" });
  }
};

const deleteProductFromCart = async (req, res) => {
  const sql = `delete from customer_cart where p_id=${req.params.id} and cust_ssn=${req.query.ssn};`;

  try {
    await db.execute(sql);
    res.send({ status: true, message: "deleted" });
  } catch (error) {
    console.log(error);
    res.json({ status: false, message: error.sqlMessage });
  }
};

const getProductData = async (req, res) => {
  const sql = `select distinct pid,has_offer,p.img_link,new_price,product_name,price,color,count, su_name,p.p_value,p.desc, 1 as favorite
from product p,suppliers s,favorites fv,customer c
where p.su_id=s.suid and  fv.p_id=p.pid and fv.cust_ssn=c.ssn  and p.pid=${req.params.id}
union all
select distinct pid,has_offer,p.img_link,new_price,product_name,price,color,count, su_name,p.p_value,p.desc, 0 as favorite
from product p,suppliers s,customer c
where p.su_id=s.suid  and p.pid=${req.params.id};`;

  try {
    const data = await db.execute(sql);
    res.json({ status: true, data: data[0][0] });
  } catch (error) {
    console.log(error);
    res.json({ status: false, message: error.sqlMessage });
  }
};

const addToCart = async (req, res) => {
  const sql = `insert into customer_cart values(${req.body.cust_ssn},${req.body.pid},${req.body.qty});`;
  const sql2 = `update product set count=count-${req.body.qty} where pid=${req.body.pid};`;
  try {
    await db.execute(sql);
    await db.execute(sql2);
    res.send({ status: true, message: "product added to cart" });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
    if (error.code == "ER_DUP_ENTRY") {
      const sql3 = `update customer_cart  set qty=qty+${req.body.qty} where p_id=${req.body.pid} and cust_ssn=${req.body.cust_ssn};`;
      const sql4 = `update product set count=count-${req.body.qty} where pid=${req.body.pid};`;
      try {
        db.execute(sql3);
        db.execute(sql4);
      } catch (error) {
        console.log(error.sqlMessage);
        res.json({ status: false, message: error.sqlMessage });
      }
    }
  }
};
const getOffersData = async (req, res) => {
  const sql = ` select pid,product_name,p.img_link,price,new_price,start_date,p.end_date,p.p_value,p.count from product p where has_offer=1;`;
  try {
    const data = await db.execute(sql);
    res.json({ status: true, data: data[0] });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
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
      res.json({ status: true, message: "Customer added successfully" });
      console.log("done");
    } catch (error) {
      console.log(error.sqlMessage);
      res.json({ status: false, message: error.sqlMessage });
    }
  } else {
    res.json({ status: false, message: "email_signed_before" });
    console.log("signed before");
  }
};

const check_GetDataUser = async (req, res) => {
  const sql = `SELECT EXISTS(SELECT 1 FROM users WHERE email="${req.query.email}" and password='${req.query.password}') as checked;`;
  const sql2 = `SELECT ssn,f_name,l_name,phone,address,authority FROM users u
   where email='${req.query.email}' and password='${req.query.password}';`;
  try {
    const dataCheck = await db.execute(sql);
    const checked = dataCheck[0][0].checked;
    if (checked === 1) {
      const data = await db.execute(sql2);
      res.json({ status: true, data: data[0][0] });
    } else if (checked === 0) {
      res.json({ status: false, message: "userNotFount" });
    }
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
const addOrder = async (req, res) => {
  const sql = ` insert into orders (price,date,cust_ssn,sc_id)
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
    res.send({ status: true, message: "order added" });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};

const getShippingCompData = async (req, res) => {
  const sql = `SELECT * FROM hardwhere.shipping_company;`;
  try {
    const data = await db.execute(sql);

    res.json({ status: true, data: data[0] });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
const getlabtops = async (req, res) => {
  const sql = `select p.pid,p.product_name,p.price,p.p_value,p.img_link from labtops l, product p where p.pid=l.pid ;`;
  try {
    const data = await db.execute(sql);
    res.json({ status: true, data: data[0] });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
const getscreens = async (req, res) => {
  const sql = `select p.pid,p.product_name,p.price,p.p_value,p.img_link from screens l, product p where p.pid=l.pid ;`;
  try {
    const data = await db.execute(sql);
    res.json({ status: true, data: data[0] });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
const getaccessories = async (req, res) => {
  const sql = `select p.pid,p.product_name,p.price,p.p_value,p.img_link from accessories l, product p where p.pid=l.pid ;`;
  try {
    const data = await db.execute(sql);
    res.json({ status: true, data: data[0] });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
const getmobiles = async (req, res) => {
  const sql = `select p.pid,p.product_name,p.price,p.p_value,p.img_link from mobiles l, product p where p.pid=l.pid ;`;
  try {
    const data = await db.execute(sql);
    res.json({ status: true, data: data[0] });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
const getheadphones = async (req, res) => {
  const sql = `select p.pid,p.product_name,p.price,p.p_value,p.img_link from headphones l, product p where p.pid=l.pid ;`;
  try {
    const data = await db.execute(sql);
    res.json({ status: true, data: data[0] });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};

const addToFavorites = async (req, res) => {
  const sql = `insert into favorites values(${req.query.ssn},${req.query.pid}) ;`;
  try {
    await db.execute(sql);
    res.json({ status: true, message: "added to favorite" });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
const removeFromFavorites = async (req, res) => {
  const sql = `delete from favorites where cust_ssn=${req.query.ssn} and p_id=${req.query.pid};`;
  try {
    await db.execute(sql);
    res.json({ status: true, message: "removed from favorite" });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
const getFavorites = async (req, res) => {
  const sql = `select * from favorites, product where cust_ssn = ${req.query.ssn} and p_id = pid`;
  try {
    const data = await db.execute(sql);
    res.json({ status: true, data: [...data[0]] });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
const addSupplier = async (req, res) => {
  const sql = `Insert into suppliers (su_name,su_address,su_phone) values('${req.body.name}','${req.body.address}','${req.body.phone}');`;
  try {
    await db.execute(sql);
    res.json({ status: true, message: "new supplier added " });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
const addShipping = async (req, res) => {
  const sql = `insert into shipping_company (sc_name,cost,delivery_time) values("${req.body.sc_name}",${req.body.cost},${req.body.delivery_time});`;
  try {
    await db.execute(sql);
    res.json({ status: true, message: "new shipping company added " });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
const addStorage = async (req, res) => {
  const sql = `insert into storages (st_address,max_capacity) values ("${req.body.address}",${req.body.max_capacity});`;
  try {
    await db.execute(sql);
    res.json({ status: true, message: "new Storage added " });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
const getAllProducts = async (req, res) => {
  const sql = `SELECT * FROM hardwhere.product;`;
  try {
    const data = await db.execute(sql);
    res.json({ status: true, data: data[0] });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
const getAllStorages = async (req, res) => {
  const sql = `SELECT * FROM hardwhere.storages;`;
  try {
    const data = await db.execute(sql);
    res.json({ status: true, data: data[0] });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
const getAllSuppliers = async (req, res) => {
  const sql = `SELECT * FROM hardwhere.suppliers;`;
  try {
    const data = await db.execute(sql);
    res.json({ status: true, data: data[0] });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
const addProduct = async (req, res) => {
  const sql = `insert into product (product_name,price,color,count,st_id,su_id,img_link)
   values ("${req.body.product_name}",${req.body.price},"${req.body.color}",${req.body.count},${req.body.st_id},${req.body.su_id},"${req.body.img_link}");`;
  try {
    await db.execute(sql);
    res.json({ status: true, message: "product added" });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
const deleteProduct = async (req, res) => {
  const sql = `delete from product where pid = ${req.body.pid};`;
  try {
    await db.execute(sql);
    res.json({ status: true, message: "product deleted" });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
const updateProduct = async (req, res) => {
  const sql = `update product set count = ${req.body.count},img_link = '${req.body.img_link}', price = ${req.body.price}, st_id = ${req.body.st_id},
              has_offer = ${req.body.has_offer}, new_price = ${req.body.new_price}, start_date = '${req.body.start_date}', end_date = '${req.body.end_date}'
              where pid = ${req.body.pid};`;
  try {
    await db.execute(sql);
    res.json({ status: true, message: "product updated" });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
const filterBySupplier = async (req, res) => {
  const sql = `select * from product where su_id = ${req.body.su_id}`;
  try {
    const data = await db.execute(sql);
    res.json({ status: true, data: data[0] });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
const filterByOffer = async (req, res) => {
  const sql = `select * from product where has_offer = 1`;
  try {
    const data = await db.execute(sql);
    res.json({ status: true, data: data[0] });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
const filterByPrice = async (req, res) => {
  const sql = `select * from product where price >= ${req.body.min_price} and price <= ${req.body.max_price} and has_offer != 1 
              union
              select * from product where new_price >= ${req.body.min_price} and new_price <= ${req.body.max_price} and has_offer = 1`;
  try {
    const data = await db.execute(sql);
    res.json({ status: true, data: data[0] });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
const searchProduct = async (req, res) => {
  const sql = `select * from product where product_name like '%${req.body.search_text}%';`;
  try {
    const data = await db.execute(sql);
    res.json({ status: true, data: data[0] });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
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
  check_GetDataUser,
  addOrder,
  getShippingCompData,
  getlabtops,
  getmobiles,
  getheadphones,
  getscreens,
  getaccessories,
  addToFavorites,
   removeFromFavorites,
  getFavorites,
  addSupplier,
  addShipping,
  addStorage,
  getAllProducts,
  getAllStorages,
  getAllSuppliers,
  addProduct,
  deleteProduct,
  updateProduct,
  filterBySupplier,
  filterByOffer,
  filterByPrice,
  searchProduct,
};
