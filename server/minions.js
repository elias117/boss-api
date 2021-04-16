const express = require("express");
const minionRouter = express.Router();
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require("./db");

module.exports = minionRouter;

minionRouter.get("/", (req, res) => {
    const all_minions = getAllFromDatabase("minions");
    res.status(200).send(all_minions);
});

minionRouter.post("/", (req, res) => {
    const newMinion = addToDatabase("minions", req.body);
    res.status(201).send(newMinion);
});

minionRouter.get("/:minionId", (req, res) => {
    const retreivedMinion = getFromDatabaseById("minions", req.params.minionId);
    if (retreivedMinion) {
        res.status(200).send(retreivedMinion);
    } else {
        res.status(404).send();
    }
});

minionRouter.put("/:minionId", (req, res) => {
    const retreivedMinion = getFromDatabaseById("minions", req.params.minionId);
    const { name, title, salary } = req.body;
    if (retreivedMinion && name && title && salary) {
        retreivedMinion.name = name;
        retreivedMinion.title = title;
        retreivedMinion.salary = Number(salary);
        const updatedMinion = updateInstanceInDatabase(
            "minions",
            retreivedMinion
        );
        if (updatedMinion) {
            res.status(200).send(updatedMinion);
        } else {
            res.status(404).send();
        }
    } else {
        res.status(404).send();
    }
});

minionRouter.delete("/:minionId", (req, res) => {
    if (deleteFromDatabasebyId("minions", req.params.minionId)) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});
