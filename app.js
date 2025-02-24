import express from "express";
import dotenv from "dotenv/config";
import dbConnect from "./config/dbConnect.js";
import cookieParser from "cookie-parser";

dbConnect();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// import testRoute from "./routes/testRoute.js";
// app.use("/api/test", testRoute);

import authRoute from "./routes/auth.routes.js";
import userRoute from "./routes/user.routes.js";
import productRoute from "./routes/product.routes.js";
import cartRoute from "./routes/cart.routes.js";
import orderRoute from "./routes/order.routes.js";

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log("Server is running on",PORT);
});