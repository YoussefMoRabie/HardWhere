// write functions here
// with queries
const db = require("../DB/DBConnect");

//  cust_ssn should be dynamic later
const getCartProducts = async (req, res) => {
  const sql =
    "select p.product_name,p.count,p.price from product p , customer_cart cc, customer c where p.pid=cc.p_id and cc.cust_ssn=c.ssn and c.ssn=2;";

  try {
    const data = await db.execute(sql);

    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

// p_id should be dynamic later
const decProductCount = async (req, res) => {
  const sql = "update product set count=count-1 where pid=0;";
  try {
    await db.execute(sql);
    res.send("done dec");
  } catch (error) {
    console.log(error);
  }
};

// p_id should be dynamic later
const incProductCount = async (req, res) => {
  const sql = "update product set count=count+1 where pid=0;";
  try {
    await db.execute(sql);
    res.send("done inc");
  } catch (error) {
    console.log(error);
  }
};


// cust_ssn && p_id should be dynamic later
const deleteProductFromCart =async(req,res)=>{
    const sql = "delete from customer_cart where p_id=0 and cust_ssn=2;";
    try {
      await db.execute(sql);
      res.send("deleted");
    } catch (error) {
      console.log(error);
    }
}

const test = (req, res) => {
  res.json("wrong");
};

module.exports = {
  getCartProducts,
  test,
  decProductCount,
  incProductCount,
  deleteProductFromCart,
};
