import express from "express";

const app = express();

app.use(express.json());
app.use(express.text());

export default express;
