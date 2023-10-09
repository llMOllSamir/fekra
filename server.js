import { config } from "dotenv";
config({});
import express from "express";
import morgan from "morgan";
import cors from "cors";
import connection from "./DB/connection.js";
import initApp from "./initApp.js";

/*=====================
....Fekra-Bokra App....
=====================*/

let app = express();
let port = 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

/*== Connect with database ==*/
connection();

/*== Rest APIS  ==*/
initApp(app);

// app listen
app.listen(process.env.PORT || port, () => {
  console.log(`server is running in ${process.env.PORT || port}`);
});
