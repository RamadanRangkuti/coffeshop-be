import express from "express";
// import { Request, Response } from "express-serve-static-core";
import * as dotenv from "dotenv";

dotenv.config();

import router from "./src/routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/api/v1',router);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`backend successfully running on port ${PORT}`)
});

app.get('*', (req, res) => {
  return res.send({ status: 404, message: 'not found' })
})