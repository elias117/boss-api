const express = require("express");
const meetingRouter = express.Router();
const {
    getAllFromDatabase,
    addToDatabase,
    deleteAllFromDatabase,
    createMeeting,
} = require("./db");
module.exports = meetingRouter;

meetingRouter.get("/", (req, res) => {
    res.status(200).send(getAllFromDatabase("meetings"));
});

meetingRouter.post("/", (req, res) => {
    const newMeeting = createMeeting();
    addToDatabase("meetings", newMeeting);
    res.status(201).send(newMeeting);
});
meetingRouter.delete("/", (req, res) => {
    deleteAllFromDatabase("meetings");
    res.status(204).send();
});
