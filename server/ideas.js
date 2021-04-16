const express = require("express");
const ideaRouter = express.Router();
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require("./db");
const checkMillionDollarIdea = require("./checkMillionDollarIdea");

module.exports = ideaRouter;
ideaRouter.param("ideaId", (req, res, next, ideaId) => {
    const retreivedIdea = getFromDatabaseById("ideas", ideaId);
    if (retreivedIdea) {
        req.idea = retreivedIdea;
        next();
    } else {
        res.status(404).send();
    }
});
ideaRouter.get("/", (req, res) => {
    res.status(200).send(getAllFromDatabase("ideas"));
});

ideaRouter.post("/", checkMillionDollarIdea, (req, res) => {
    const newIdea = addToDatabase("ideas", req.body);
    res.status(201).send(newIdea);
});

ideaRouter.get("/:ideaId", (req, res) => {
    res.status(200).send(req.idea);
});

ideaRouter.put("/:ideaId", checkMillionDollarIdea, (req, res) => {
    let updatedInstance = updateInstanceInDatabase("ideas", req.body);
    res.status(200).send(updatedInstance);
});

ideaRouter.delete("/:ideaId", (req, res) => {
    if (deleteFromDatabasebyId("ideas", req.params.ideaId)) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});
