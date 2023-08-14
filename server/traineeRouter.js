const express = require("express");
const router = express.Router();
const { getTraineeByGithubName, getCohortById } = require("./traineeUser");

router.get("/", async (req, res) => {
    const githubName = req.query.github_name;

    if(!githubName) {
        return res.status(400).json({ error: "github_name is required" });
    }

    const traineeData = await getTraineeByGithubName(githubName);
    if(!traineeData) {
        return res.status(404).json({ error: "No trainee found with provided github_name" });
    }

    const cohortData = await getCohortById(traineeData.cohort_id);

    if(!cohortData) {
        return res.status(404).json({ error: "No cohort found for the trainee" });
    }

    return res.json(cohortData);
});

module.exports = router;
