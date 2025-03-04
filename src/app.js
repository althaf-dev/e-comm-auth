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
const { default: swaggerDocs } = require("./swagger");
const { errorHandler } = require("./controllers/errorController");


const app = express();
const PORT = process.env.PORT || 8000;

const redisClient  = redis.createClient();
redisClient.connect().catch(console.error);

app.use(corsConfig)
// app.use(cors());

app.use(express.json());
app.use(express.urlencoded());
// x
app.use(cookieParser());


connectDB();
app.use(session({
    store: new RedisStore({client:redisClient , prefix: "myapp:",}),
    secret: "mySecretKey", // Used to sign the session ID cookie
    resave: false, // Prevents resaving unchanged sessions
    saveUninitialized: false, // Saves new sessions without modification
    cookie: { secure: false, maxAge: 60000 },
}));

app.use("/public", express.static(path.join(__dirname,"..", "public")));

app.engine("hbs",engine({extname:"hbs"}));
app.set("view engine","hbs");
app.set("views","./src/views");

app.use("/api/v1",router);

app.use(errorHandler)
app.listen(PORT,()=>{
    console.log("server is listening to the port",PORT);
    swaggerDocs(app,PORT)
})