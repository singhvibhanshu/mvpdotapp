import { primsaClient } from "db/client";
import express from "express";
import cors from "cors";
import { authMiddleware } from "./middleware";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/project", authMiddleware, async (req, res) => {
    const { prompt } = req.body;
    const userId = req.userId;
    const description = prompt.split("\n")[0];
    const project = await primsaClient.project.create({
        data: { description, userId },
    });
    res.json({ projectId: project.id });
});

app.get("/projects", authMiddleware, async (req, res) => {
    const userId = req.userId;
    const project = await primsaClient.project.findFirst({
        where: { userId },
    });
    res.json(project);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});