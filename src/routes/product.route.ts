import { Router } from "express";

import { get, getDetail, add, update, remove } from "../handlers/product.handler"
import { authorization } from "../middlewares/authorization";
import { singleUploader } from "../middlewares/upload";

const router = Router();

router.get('/', get);
router.get('/:id', singleUploader("images"), getDetail);
router.post('/', authorization, singleUploader("images"), add);
router.patch('/:id', singleUploader("images"), update);
router.delete('/:id', authorization, remove);


export default router;