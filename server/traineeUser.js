const pool = require("./db");

async function getTraineeByGithubName(githubName) {
  const result = await pool.query("SELECT * FROM trainee WHERE github_name = $1", [githubName]);
  return result.rows[0];
}

async function getCohortById(cohortId) {
  const result = await pool.query("SELECT * FROM cohorts WHERE id = $1", [cohortId]);
  return result.rows[0];
}

module.exports = {
  getTraineeByGithubName,
  getCohortById,
};
