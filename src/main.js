import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import { appConfig } from "./config/app.config.js";
import categoryRoutes from "./routes/category.routes.js";
import orderRoutes from "./routes/order.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import orderItemRoutes from "./routes/order-item.routes.js";
import productRoutes from "./routes/products.routes.js";
import contractTypeRoutes from "./routes/contract.type.routes.js";
import customerRoutes from "./routes/customer.routes.js";

const app = express();

// Middlaware
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// Routes
// app.use("/api/v1", routes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);
app.use("/customer", customerRoutes);
app.use("/order", orderRoutes);
app.use("/order-items", orderItemRoutes)
app.use("/contract-type", contractTypeRoutes)
app.use("/payments", paymentRoutes);


// app listening
app.listen(appConfig.port, appConfig.host, () => {
  console.log(`listening on ${appConfig.port}`);
});