import { primsaClient } from "db/client";
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/project", async(req, res) => {
    const { prompt } = req.body;
    const description = prompt.split("\n")[0];
    const project = await primsaClient.project.create({
        data: { description },
    });
    res.json({ projectId: project.id });
});