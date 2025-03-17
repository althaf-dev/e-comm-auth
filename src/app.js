const express = require("express");
const path = require('path')
const { engine } = require("express-handlebars");
require("dotenv").config();
const router = require("./routes/routes");
const cookieParser = require("cookie-parser");
const session  = require("express-session");
const {RedisStore}= require("connect-redis");
const cors = require("cors")
const redis = require("redis");
const connectDB = require("./config/db");
const corsConfig = require("./config/corsConfig");
const { errorHandler } = require("./controllers/errorController");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");


const swaggerDocument = YAML.load(path.join(__dirname, ".", "docs", "swagger.yaml"));
const app = express();
const PORT = process.env.PORT || 8000;

// const redisClient  = redis.createClient();
// const redisClient1  = redis.createClient();

// redisClient1.connect().then(async()=>{
//     console.log("connected to redis1");
//     await redisClient1.subscribe("notifications",(message)=>{
//         console.log("message recived on notification",message)
//     })
// })
// redisClient.connect().then(async()=>{
//     console.log("connected to redis");
//     await redisClient.publish("notifications","hello")
//     await redisClient.publish("notifications","hello everyone!")
//     // await redisClient.del("notes")
//     // await redisClient.set("test","testval");
//     // const val = await redisClient.get("test");
//     // console.log(val)
//     // await redisClient.rPush("notes",["note1","note2","note3"]);
//     // const notes = await redisClient.lRange("notes",0,-1);
//     // console.log(notes);
//     // await redisClient.zAdd("cart",[{score:100,value:"cart1"}]);
//     // const cart = await redisClient.zRange("cart",0,-1);
//     // console.log(cart);
//     // const cartwithScores = await redisClient.zRangeWithScores("cart",0,-1);
//     // console.log(cartwithScores);
//     // await redisClient.hSet("product1",{
//     //     name:"product1",
//     //     price:"100",
//     //     stock:"10"
//     // })
//     // const products = await redisClient.hGetAll("product1");
//     // console.log(products);
   
// }).catch(console.error);


app.use(corsConfig)
// app.use(cors());

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());



connectDB();
// app.use(session({
//     store: new RedisStore({client:redisClient , prefix: "myapp:",}),
//     secret: "mySecretKey", // Used to sign the session ID cookie
//     resave: false, // Prevents resaving unchanged sessions
//     saveUninitialized: false, // Saves new sessions without modification
//     cookie: { secure: false, maxAge: 60000 },
// }));

app.use("/public", express.static(path.join(__dirname,"..", "public")));

app.engine("hbs",engine({extname:"hbs"}));
app.set("view engine","hbs");
app.set("views","./src/views");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1",router);

app.use(errorHandler)
app.listen(PORT,()=>{
    console.log("server is listening to the port",PORT);
    
})

module.exports = app;