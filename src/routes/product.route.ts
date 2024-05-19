import { Router } from "express";

import { get } from "../handlers/product.handler"

const router = Router();

router.get('/', get)

export default router;