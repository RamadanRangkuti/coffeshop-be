import { Router } from "express";

const router = Router();

import productRouter from "./product.route";

router.get('/', (req, res) => {
  return res.send("Backend For Coffe Shop");
});

router.use('/products', productRouter);

export default router;