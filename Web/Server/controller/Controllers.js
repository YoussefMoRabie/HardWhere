// write functions here
// with queries
const db = require("../DB/DBConnect");

//  cust_ssn should be dynamic later
const getCartProducts = async (req, res) => {
  const sql = `select p.product_name,p.count as totalCnt,cc.qty,p.price,p.pid,p.has_offer,p.new_price,p.img_link from product p , customer_cart cc, customer c 
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
  // const sql = `update product set count=count+1 where pid=${req.params.id};`;
  const sql2 = `update customer_cart  set qty=qty-1 where p_id=${req.params.id} and cust_ssn=${req.query.ssn};`;
  // const sql3 = `select exists(select * from customer_cart where cust_ssn =${req.query.ssn} and p_id=${req.params.id}) as has`;
  // const checked = await db.execute(sql3);

  // if (checked[0][0].has === 1) {
  try {
    // await db.execute(sql);
    await db.execute(sql2);
    res.send({ status: true, message: "decremented" });
  } catch (error) {
    console.log(error);
    res.json({ status: false, message: error.sqlMessage });
  }
  // } else {
  //   res.json({ status: false, message: "this product is't in this cart" });
  // }
};

// ssn should be dynamic later
const incProductQtyinCart = async (req, res) => {
  // const sql = `update product set count=count-1 where pid=${req.params.id};`;
  const sql2 = `update customer_cart  set qty=qty+1 where p_id=${req.params.id} and cust_ssn=${req.query.ssn};`;
  // const sql3 = `select exists(select * from customer_cart where cust_ssn =${req.query.ssn} and p_id=${req.params.id}) as has`;
  // const checked = await db.execute(sql3);

  // if (checked[0][0].has === 1) {
  try {
    // await db.execute(sql);
    await db.execute(sql2);
    res.send({ status: true, message: "incremented" });
  } catch (error) {
    console.log(error);
    res.json({ status: false, message: error.sqlMessage });
  }
  // } else {
  //   res.json({ status: false, message: "this product is't in this cart" });
  // }
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
  const sql = `select distinct pid,has_offer,p.img_link,new_price,product_name,price,color,count, su_name,p.p_value, 1 as favorite
              from product p,suppliers s,favorites fv,customer c
              where p.su_id=s.suid and  fv.p_id=p.pid and fv.cust_ssn=c.ssn  and p.pid=${req.params.id}
              union all
              select distinct pid,has_offer,p.img_link,new_price,product_name,price,color,count, su_name,p.p_value, 0 as favorite
              from product p,suppliers s,customer c
              where p.su_id=s.suid  and p.pid=${req.params.id};`;

  const sql1 = `select count(*) as found, ram,processor,gpu,screen from labtops where pid = ${req.params.id};  `;
  const sql2 = `select count(*) as found, ram,processor,screen from mobiles where pid = ${req.params.id};`;
  const sql3 = `select count(*) as found, type,resolution,is_smart from screens where pid = ${req.params.id}; `;
  const sql4 = `select count(*) as found, frequency from headphones where pid = ${req.params.id};`;
  const sql5 = `select count(*) as found, type from accessories where pid = ${req.params.id}; `;

  try {
    const labData = await db.execute(sql1);
    const mobData = await db.execute(sql2);
    const screensData = await db.execute(sql3);
    const headphonesData = await db.execute(sql4);
    const accessoData = await db.execute(sql5);
    const data = await db.execute(sql);

    if (labData[0][0].found == 1) {
      const desc = `this labtop has ram: ${labData[0][0].ram}, processor: ${labData[0][0].processor}, gpu: ${labData[0][0].gpu}, screen: ${labData[0][0].screen}`;
      data[0][0].desc = desc;
    } else if (mobData[0][0].found == 1) {
      const desc = ` this mobile has ram: ${mobData[0][0].ram}, processor: ${mobData[0][0].processor}, screen: ${mobData[0][0].screen}`;
      data[0][0].desc = desc;
    } else if (screensData[0][0].found == 1) {
      const desc = `screen type: ${screensData[0][0].type}, resolution: ${
        screensData[0][0].resolution
      }${
        screensData[0][0].is_smart == null
          ? ""
          : screensData[0][0].is_smart == 1
          ? ", smart"
          : ", not smart"
      }`;
      data[0][0].desc = desc;
    } else if (headphonesData[0][0].found == 1) {
      const desc = `frequency of this headphone is ${headphonesData[0][0].frequency} HZ`;
      data[0][0].desc = desc;
    } else if (accessoData[0][0].found == 1) {
      const desc = `type is ${accessoData[0][0].type}`;
      data[0][0].desc = desc;
    }

    res.json({ status: true, data: data[0][0] });
  } catch (error) {
    console.log(error);
    res.json({ status: false, message: error.sqlMessage });
  }
};

const addToCart = async (req, res) => {
  const sql = `insert into customer_cart values(${req.body.cust_ssn},${req.body.pid},${req.body.qty});`;
  console.log(req.body);
  // const sql2 = `update product set count=count-${req.body.qty} where pid=${req.body.pid};`;
  try {
    await db.execute(sql);
    // await db.execute(sql2);
    res.send({ status: true, message: "new product added to cart" });
  } catch (error) {
    if (error.code == "ER_DUP_ENTRY") {
      // const sql3 = `update customer_cart  set qty=qty+${req.body.qty} where p_id=${req.body.pid} and cust_ssn=${req.body.cust_ssn};`;
      // const sql4 = `update product set count=count-${req.body.qty} where pid=${req.body.pid};`;
      // try {
      //   db.execute(sql3);
      //   db.execute(sql4);
      //   res.send({ status: true, message: "old product qty increased" });
      // } catch (error) {
      //   console.log(error.sqlMessage);
      //   res.json({ status: false, message: error.sqlMessage });
      // }
      res.json({ status: false, message: "product already in your cart" });
    } else {
      res.json({ status: false, message: error.sqlMessage });
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
  const sql1 = `insert into users (f_name,l_name,phone,address,email,authority,password)
   values('${req.body.firstName}','${req.body.lastName}','${req.body.phone}','${req.body.address}','${req.body.email}',"customer",'${req.body.password}');`;
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
  const sql2 = `SELECT * FROM users u
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
  console.log(req.body);
  const sql4 = `delete from customer_cart where cust_ssn = ${Number(req.body.cust_ssn)}`;
  try {
    await db.execute(sql);
    const cartProducts = req.body.products;
    console.log(cartProducts);

    const data = await db.execute(sql3);
    const oid = data[0][0].maxOrderId;
    await db.execute(sql4);
    for (const product of cartProducts) {

      const sql2 = `insert into contains values (${oid},${product.pid},${product.qty})`;
      const sql6 = `update product set count=count-${product.qty} where pid=${product.pid};`;
      await db.execute(sql6);
      await db.execute(sql2);
    }

    res.send({ status: true, message: "order added" });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
const addOrder_fluter = async (req, res) => {
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
      // const sql6 = `update product set count=count-${product.qty} where pid=${product.pid};`;
      // await db.execute(sql6);
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
  const sql = `SELECT * FROM shipping_company;`;
  try {
    const data = await db.execute(sql);

    res.json({ status: true, data: data[0] });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
const getlabtops = async (req, res) => {
  const sql = `select p.pid,p.product_name,p.price,p.p_value,p.has_offer,p.new_price,p.img_link from labtops l, product p where p.pid=l.pid ;`;
  try {
    const data = await db.execute(sql);
    res.json({ status: true, data: data[0] });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
const getscreens = async (req, res) => {
  const sql = `select p.pid,p.product_name,p.price,p.p_value,p.has_offer,p.new_price,p.img_link from screens l, product p where p.pid=l.pid ;`;
  try {
    const data = await db.execute(sql);
    res.json({ status: true, data: data[0] });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
const getaccessories = async (req, res) => {
  const sql = `select p.pid,p.product_name,p.price,p.has_offer,p.new_price,p.p_value,p.img_link from accessories l, product p where p.pid=l.pid ;`;
  try {
    const data = await db.execute(sql);
    res.json({ status: true, data: data[0] });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
const getmobiles = async (req, res) => {
  const sql = `select p.pid,p.product_name,p.price,p.has_offer,p.new_price,p.p_value,p.img_link from mobiles l, product p where p.pid=l.pid ;`;
  try {
    const data = await db.execute(sql);
    res.json({ status: true, data: data[0] });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
const getheadphones = async (req, res) => {
  const sql = `select p.pid,p.product_name,p.has_offer,p.new_price,p.price,p.p_value,p.img_link from headphones l, product p where p.pid=l.pid ;`;
  try {
    const data = await db.execute(sql);
    res.json({ status: true, data: data[0] });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};

const addToFavorites = async (req, res) => {
  const sql = `insert into favorites values(${req.body.ssn},${req.body.pid}) ;`;
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

const getEmployees = async (req, res) => {
  const sql = `select  CONCAT(f_name,' ',l_name) as fullname, u.ssn,e.salary,e.working_shift,e.d_id from employee e,users u where u.ssn=e.ssn `;
  try {
    const data = await db.execute(sql);
    res.json({ status: true, data: data[0] });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
const getAllProducts = async (req, res) => {
  const sql = `SELECT * FROM product;`;
  try {
    const data = await db.execute(sql);
    res.json({ status: true, data: data[0] });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
const getAllSuppliers = async (req, res) => {
  const sql = `SELECT * FROM suppliers;`;
  try {
    const data = await db.execute(sql);
    res.json({ status: true, data: data[0] });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
//-----------------------------------------------------------------Employee-------------------------------------------------------------------------
const addProduct = async (req, res) => {
  const sql = `insert into product (product_name,price,color,count,st_id,su_id,img_link)
   values ("${req.body.product_name}",${req.body.price},"${req.body.color}",${req.body.count},${req.body.selected_storage.stid},${req.body.su_id},"${req.body.img_link}");`;
  const sql2 = `update storages set currently_used = currently_used + ${req.body.count} where stid = ${req.body.selected_storage.stid}`;
 
  try {
    if(req.body.selected_storage.currently_used + parseInt(req.body.count) > req.body.selected_storage.max_capacity)
    {
      throw new Error("max capacity reached");
    }
    await db.execute(sql);
    await db.execute(sql2);
    
    res.json({ status: true, message: "product added"});
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  };
};

const deleteProduct = async (req, res) => {
  const sql = `delete from product where pid = ${req.body.pid};`;
  const sql2 = `update storages set currently_used = currently_used - ${req.body.count} where stid = ${req.body.st_id}`;
  try {
    await db.execute(sql);
    await db.execute(sql2);
    res.json({ status: true, message: "product deleted" });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
const updateProduct = async (req, res) => {
  const sql = `update product set count = ${req.body.count},img_link = '${req.body.img_link}', price = ${req.body.price}, 
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
//------------------------------------------------------------Filter and search--------------------------------------------------------------------
const filterBySupplier = async (req, res) => {
  const sql = `select * from product where su_id = ${req.params.su_id}`;
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
  const sql = `select * from product where price >= ${req.params.min_price} and price <= ${req.params.max_price} and has_offer != 1 
              union
              select * from product where new_price >= ${req.params.min_price} and new_price <= ${req.params.max_price} and has_offer = 1`;
  try {
    const data = await db.execute(sql);
    res.json({ status: true, data: data[0] });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
const searchProduct = async (req, res) => {
  const sql = `select * from product where product_name like '%${req.params.search_text}%';`;
  try {
    const data = await db.execute(sql);
    res.json({ status: true, data: data[0] });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
//-----------------------------------------------manager----------------------------------------------------------
const daleteEmpoyee = async (req, res) => {
  const sql = `delete from users where ssn=${req.query.ssn}`;
  try {
    await db.execute(sql);
    res.json({ status: true, message: `employee deleted` });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
const getDepartments = async (req, res) => {
  const sql = `select * from department `;
  try {
    const data = await db.execute(sql);
    res.json({ status: true, data: data[0] });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
const addNewEmployee = async (req, res) => {
  const sql = `insert into users (f_name,l_name,address,email)
   values("${req.body.f_name}","${req.body.l_name}",'${req.body.address}','${req.body.email}'); `;
  const sql2 = `select max(ssn) as empssn from users`;

  try {
    await db.execute(sql);

    const dataEmp = await db.execute(sql2);
    const empssn = dataEmp[0][0].empssn;

    const sql3 = `insert into employee values (${empssn},${req.body.salary},"${req.body.shift}",${req.body.d_id});`;
    await db.execute(sql3);

    res.json({ status: true, message: "employee added" });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
const deleteShippingCompany = async (req, res) => {
  const sql = `delete from shipping_company where scid=${req.query.scid} `;
  try {
    await db.execute(sql);
    res.json({ status: true, message: "deleted" });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
const getStorages = async (req, res) => {
  const sql = `select * from storages  `;
  try {
    const data = await db.execute(sql);
    res.json({ status: true, data: data[0] });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
const deleteFromStorages = async (req, res) => {
  const sql = `delete from storages where stid=${req.query.stid}; `;
  try {
    await db.execute(sql);
    res.json({ status: true, message: "storage deleted" });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
const updateEmployee = async (req, res) => {
  const sql = `UPDATE employee
               SET salary = ${req.body.salary}, working_shift="${req.body.working_shift}", d_id=${req.body.d_id}
               WHERE ssn=${req.query.ssn}; `;
  try {
    await db.execute(sql);
    res.json({ status: true, message: "employee updated" });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
//-------------------------------------------------------User-----------------------------------------------------------------------
const updateUserData = async (req, res) => {
  const sql = `UPDATE users
               SET phone = '${req.body.phone}', address="${req.body.address}", email='${req.body.email}', password='${req.body.password}'
               WHERE ssn = ${req.query.ssn};`;
  try {
    await db.execute(sql);
    res.json({ status: true, message: "user updated" });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
const updateStorage = async (req, res) => {
  const sql = ` update storages 
                set max_capacity=${req.body.max_capacity}
                where stid = ${req.query.stid} `;
  try {
    await db.execute(sql);
    res.json({ status: true, message: "storage updated" });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
const updateShipping = async (req, res) => {
  const sql = ` update shipping_company 
                set cost=${req.body.cost} , delivery_time=${req.body.delivery_time} 
                where scid =${req.query.scid}  `;
  try {
    await db.execute(sql);
    res.json({ status: true, message: " shipping company updated" });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
const updateSupplier = async (req, res) => {
  const sql = ` update suppliers 
                set su_address='${req.body.address}', su_phone='${req.body.phone}'
                where suid=${req.query.suid};`;
  try {
    await db.execute(sql);
    res.json({ status: true, message: " supplier company updated" });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
const getCustomer = async (req, res) => {
  const sql = `select * from users where ssn = ${req.query.ssn}  `;
  try {
    const data = await db.execute(sql);
    res.json({ status: true, data: data[0][0] });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};
//---------------------------------------------------Categories---------------------------------------------------------------
const addLaptop = async (req, res) => {
  const sql = `insert into labtops values (${req.body.pid},'${req.body.processor}',${req.body.ram},'${req.body.gpu}',${req.body.screen});`;
  
  try {
    await db.execute(sql);
    res.json({ status: true, message: "details added" });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  };
};
const addMobile = async (req, res) => {
  const sql = `insert into mobiles values (${req.body.pid},'${req.body.processor}',${req.body.ram},${req.body.screen});`;
  
  try {
    await db.execute(sql);
    res.json({ status: true, message: "details added" });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  };
};
const addHeadphone = async (req, res) => {
  const sql = `insert into headphones values (${req.body.pid},${req.body.frequency});`;
  
  try {
    await db.execute(sql);
    res.json({ status: true, message: "details added" });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  };
};
const addAccessory = async (req, res) => {
  console.log('accessory')
  const sql = `insert into accessories values (${req.body.pid},'${req.body.type}');`;
  
  try {
    await db.execute(sql);
    res.json({ status: true, message: "details added" });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  };
};
const addScreen = async (req, res) => {
  const sql = `insert into screens values (${req.body.pid},'${req.body.type}','${req.body.resolution}','${req.body.is_smart});`;
  
  try {
    await db.execute(sql);
    res.json({ status: true, message: "details added" });
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  };
};
const getLastInserted = async (req, res) => {
  console.log('id')
  const sql = `select LAST_INSERT_ID()`;
  try {
    const data = await db.execute(sql);
    res.json({ status: true, data: data[0]});
  } catch (error) {
    console.log(error.sqlMessage);
    res.json({ status: false, message: error.sqlMessage });
  }
};

module.exports = {
  getCustomer,
  updateSupplier,
  updateShipping,
  deleteFromStorages,
  getStorages,
  deleteShippingCompany,
  addNewEmployee,
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
  removeFromFavorites,
  addToFavorites,
  getFavorites,
  addSupplier,
  addShipping,
  addStorage,
  getEmployees,
  daleteEmpoyee,
  getDepartments,
  getAllProducts,
  getAllSuppliers,
  addProduct,
  deleteProduct,
  updateProduct,
  filterBySupplier,
  filterByOffer,
  filterByPrice,
  searchProduct,
  updateEmployee,
  updateStorage,
  updateUserData,
  addOrder_fluter,
  addLaptop,
  addMobile,
  addAccessory,
  addHeadphone,
  addScreen,
  getLastInserted,
};
