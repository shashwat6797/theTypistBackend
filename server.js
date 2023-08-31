import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import userRoute from "./routes/userRoute.js";
import testRoute from "./routes/testRoute.js";
import session, { Store } from "express-session";
import MongoStore from "connect-mongo";

/*configuration*/
dotenv.config({ path: "./.env" });
const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["POST", "GET"],
  credentials: true
}));
app.use(helmet());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, limit: "10mb" }));
app.use(session({
  secret: "my_secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24,
  },
  store: MongoStore.create({ mongoUrl:"mongodb://localhost:27017/theTypist"})
}));

/* ROUTES */
app.get("/", (req,res)=>{
  res.send("<h1>Server is Runing!</h1>");
})
app.use("/user", userRoute);
app.use("/test", testRoute);

/*Mongoose Setup*/
const PORT = process.env.PORT;
const connectionSting =
  process.env.MONGO_URL;

mongoose
  .connect(connectionSting, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to theTypist MonogDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("Error connecting to database:", err));
