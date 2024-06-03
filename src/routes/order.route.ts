import { Router } from "express";

import { get, getDetail, add, update, remove } from "../handlers/order.handler"
import { authorization } from "../middlewares/authorization";

const router = Router();

router.get('/', authorization, get);
router.get('/:id', authorization, getDetail);
router.post('/', authorization, add);
router.patch('/:id', authorization, update);
router.delete('/:id', authorization, remove)


export default router;