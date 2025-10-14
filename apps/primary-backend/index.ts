import { primsaClient } from "db/client";
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/create-project", async(req, res) => {

} )