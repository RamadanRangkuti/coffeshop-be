import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
  return res.send('Backend For Coffe Shop');
});

export default router;