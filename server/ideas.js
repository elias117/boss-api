const express = require("express");
const ideaRouter = express.Router();
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require("./db");

module.exports = ideaRouter;

ideaRouter.get("/", (req, res) => {
    res.status(200).send(getAllFromDatabase("ideas"));
});

ideaRouter.post("/", (req, res) => {
    const newIdea = addToDatabase("ideas", req.body);
    res.status(201).send(newIdea);
});

ideaRouter.get("/:ideaId", (req, res) => {
    const retreivedIdea = getFromDatabaseById("ideas", req.params.ideaId);
    if (retreivedIdea) {
        res.status(200).send(retreivedIdea);
    } else {
        res.status(404).send();
    }
});

ideaRouter.put("/:ideaId", (req, res) => {
    const retreivedIdea = getFromDatabaseById("ideas", req.params.ideaId);
    const { name, description, numWeeks, weeklyRevenue } = req.body;
    if (retreivedIdea && name && description && numWeeks && weeklyRevenue) {
        retreivedIdea.name = name;
        retreivedIdea.description = description;
        retreivedIdea.numWeeks = Number(numWeeks);
        retreivedIdea.weeklyRevenue = Number(weeklyRevenue);
        const updatedIdea = updateInstanceInDatabase("ideas", retreivedIdea);
        if (updatedIdea) {
            res.status(200).send(updatedIdea);
        } else {
            res.status(404).send();
        }
    } else {
        res.status(404).send();
    }
});

ideaRouter.delete("/:ideaId", (req, res) => {
    if (deleteFromDatabasebyId("ideas", req.params.ideaId)) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});
