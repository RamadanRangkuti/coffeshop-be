import { Router } from "express";

import { get, getDetail, add, update, remove } from "../handlers/promo.handler"

const router = Router();

router.get('/', get);
router.get('/:id', getDetail);
router.post('/', add);
router.patch('/:id', update);
router.delete('/:id', remove);


export default router;