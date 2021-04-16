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
    const { name, title, salary } = req.body;
    if (name && title && salary) {
        const newMinion = addToDatabase("minions", {
            name: name,
            title: title,
            salary: Number(salary),
        });
        if (newMinion) {
            res.status(201).send(newMinion);
        } else {
            res.status(400).send();
        }
    } else {
        res.status(400).send();
    }
});

minionRouter.get("/:minionId", (req, res) => {
    const retreivedMinion = getFromDatabaseById("minions", req.params.minionId);
    if (retreivedMinion) {
        res.status(200).send(retreivedMinion);
    } else {
        res.status(400).send();
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
            res.status(400).send();
        }
    } else {
        res.status(400).send();
    }
});

minionRouter.delete("/:minionId", (req, res) => {
    if (deleteFromDatabasebyId("minions", req.params.minionId)) {
        res.status(410).send();
    } else {
        res.status(400).send();
    }
});
