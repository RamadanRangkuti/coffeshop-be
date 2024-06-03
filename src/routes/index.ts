import { Router } from "express";

const router = Router();

import productRouter from "./product.route";
import userRouter from "./user.route";
import orderRouter from "./order.route";
import promoRouter from "./promo.route";
import authRouter from "./auth.route";

router.get('/', (req, res) => {
  return res.send("Backend For Coffe Shop");
});

router.use('/product', productRouter);
router.use('/user', userRouter);
router.use('/order', orderRouter);
router.use('/promo', promoRouter);
router.use('/auth', authRouter);

export default router;