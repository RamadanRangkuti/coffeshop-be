import { Router } from "express";

import { get, getDetail, add, update, remove } from "../handlers/user.handler"
import { authorization } from "../middlewares/authorization";
import { singleUploader } from "../middlewares/upload";

const router = Router();

router.get('/', get);
router.get('/:id', getDetail);
router.post('/', authorization, singleUploader("images"), add);
router.patch('/:id', authorization, singleUploader("images"), update);
router.delete('/:id', remove);


export default router;