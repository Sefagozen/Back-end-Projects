const express=require('express');
const app= express();
const mysql= require('mysql2');
const bodyParser= require('body-parser');
const cors=require('cors');


var db= mysql.createPool({
    host: "localhost",
    user: "root",
    password: "new_password",
    database:"EcommerceDb",
  });

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));



app.post('/api/login',(req,res)=>{
    const UserName=req.body.UserName;
    const UserPassword=req.body.UserPassword;

    const sqlLogin= `SELECT * FROM User WHERE UserName = ? AND UserPassword = ?`
    db.query(sqlLogin,[UserName, UserPassword], (err,result)=>{
        if(err){
            res.send({err: err})
        } else {
            if (result.length > 0){
                res.send(result);
            }else {
                res.send({message : " Kullanıcı adı veya şifresi hatalı."});
            }
        }
    })
})


app.post('/api/insertLogin',(req,res)=>{

    const UserName=req.body.UserName;
    const UserPassword=req.body.UserPassword;
    const UserMail=req.body.UserMail;

    const sqlInsert= `INSERT INTO User (UserName, UserPassword, UserMail) VALUES (?,?,?)`
    db.query(sqlInsert,[UserName, UserPassword, UserMail], (err,result)=>{
        console.log(err);
    })
});

// app.post('/api/setProductList',(req,res)=>{

//     const ProductName=req.body.ProductName;
//     const ProductWeight=req.body.ProductWeight;
//     const ProductOhm=req.body.ProductOhm;
//     const ProductFreq=req.body.ProductFreq;
//     const ProductImg=req.body.image;
//     const ProductPrice=req.body.ProductPrice;
//     const ProductStock=req.body.ProductStock;

//     const sqlProduct= `INSERT INTO Product (ProductName,ProductWeight,ProductOhm,ProductFreq,ProductImg,ProductPrice,ProductStock) VALUES (?,?,?,?,?,?,?)`
//     db.query(sqlProduct,[ProductName,ProductWeight,ProductOhm,ProductFreq,ProductImg,ProductPrice,ProductStock], (err,result)=>{
//       console.log(result);
//     })
// });

app.post('/api/insertCart',(req,res)=>{

    const CartTotal=req.body.CartTotal;
    const itemBasket=req.body.itemBasket;
    const idUser=req.body.idUser;
    const ProductID=req.body.ProductID;
    const UserName=req.body.UserName;

    const sqlInsert= `INSERT INTO Cart (UserName,idUser, ProductID,CartTotal,itemBasket) VALUES (?,?,?,?,?)`
    db.query(sqlInsert,[UserName,idUser,ProductID,CartTotal,itemBasket], (err,result)=>{
        console.log(err);
    })
});
app.get('/api/getproducts',(req,res)=>{

    const sqlProducts= `SELECT * FROM Product`
    db.query(sqlProducts, (err,result)=>{
       res.send(result);
    })
})
app.get('/api/get',(req,res)=>{

    const sqlSelect= `SELECT * FROM  User`
    db.query(sqlSelect,(err,result)=>{
        res.send(result);
    })
});


app.listen(4000,()=>{
    console.log("Running on port 4000");
})