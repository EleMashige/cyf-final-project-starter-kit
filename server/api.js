
import express, { Router } from "express";

import cors from "cors";
import db from "./db";
import logger from "./utils/logger";

const app = express();
const router = Router();

// Middleware
app.use(express.json());
app.use(cors());

router.use(express.json());
router.use(cors());
router.use(express.urlencoded({ extended: true }));

//GET
router.get("/get", async (req, res) => {
	try {
	const querySelect = `
		SELECT * from modules`;
	const result = await db.query(querySelect);

	// Debugging: Log the result to see the retrieved data
	console.log(result);

	// Send the retrieved data as the response
	res.json(result.rows);
	} catch (error) {
	logger.error("Error fetching modules:", error);
	res.status(500).json({ error: "Internal Server Error" });
	}
  });


//POST
router.post("/insert", async (req, res) => {
  try {

const moduleName = req.body.moduleName;
const startDate = req.body.startDate;
const endDate = req.body.endDate;
const cohort = req.body.cohort;

    const query = `
      INSERT INTO modules (modulename, startdate, enddate, cohort)
      VALUES ($1, $2, $3, $4)
      RETURNING *`;
    const values = [moduleName, startDate, endDate, cohort];
    const result = await db.query(query, values);

    // Debugging: Log the result to see if data is being inserted correctly
    console.log("Inserted Data:", result.rows[0]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    logger.error("Error adding module:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



// Endpoint to create a new cohort

router.post("/api/cohorts", (req, res) => {
	const query = req.body;
	const insertQuery = "INSERT INTO cohorts (name) VALUES ($1) RETURNING id";

	try {
		db.query(insertQuery, [query.name])
			.then((result) => {
				res.json({ id: result.rows[0].id });
			})
			.catch((error) => {
				logger.debug(error);
				res
					.status(500)
					.json({ error: "An error occurred while inserting the cohort." });
			});
	} catch (error) {
		logger.debug(error);
		res.status(500).json({ error: "An unexpected error occurred." });
	}
});

router.get("/api/cohorts", (req, res) => {
	const selectQuery = "SELECT * FROM cohorts";
	try {
		db.query(selectQuery)
			.then((result) => {
				res.json(result.rows);
			})
			.catch((error) => {
				logger.debug(error); // Log the error
				res
					.status(500)
					.json({ error: "An error occurred while fetching cohorts." });
			});
	} catch (error) {
		logger.debug(error);
		res.status(500).json({ error: "An unexpected error occurred." });
	}
});

//DELETE
router.delete("/delete/:id", async (req, res) => {
	try {
	const { id } = req.params;
	const query = `
		DELETE FROM modules
		WHERE id = $1`;
	const result = await db.query(query, [id]);
	res.status(204).json({ message: "Module deleted successfully" });
	} catch (error) {
	logger.error("Error deleting module:", error);
	res.status(500).json({ error: "Internal Server Error" });
	}
  });

  //PUT
  router.put("/update/:id", async (req, res) => {
	try {
       const { id } = req.params;
       const { moduleName, startDate, endDate, cohort } = req.body;

        const query = `
		UPDATE modules
		SET modulename = $1, startdate = $2, enddate = $3, cohort = $4
		WHERE id = $5
		RETURNING *`;
     const values = [moduleName, startDate, endDate, cohort, id];
      const result = await db.query(query, values);

    res.status(200).json(result.rows[0]);
	} catch (error) {
     logger.error("Error updating module:", error);
      res.status(500).json({ error: "Internal Server Error" });
	}
  });


router.get("/api/trainees", async (req, res) => {
    const githubName = req.query.github_name;

    if (!githubName) {
        return res.status(400).json({ error: "GitHub name is required" });
    }

    try {
        // This is a pseudo code. Use your actual DB logic here
        const trainees = await db.query("SELECT * FROM trainees WHERE github_name = $1", [githubName]);

        if (trainees.rows.length === 0) {
            return res.status(404).json({ error: "Trainee not found" });
        }

        res.json(trainees.rows[0]);  // Assuming you want to return just the first match
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: "Failed to retrieve trainee" });
    }

});

//GET FOR TRAINEE PROGRESS TABLE

router.get("/traineeProgress", async (req, res) => {
	try {
	const querySelect = `
		SELECT * from traineeProgress`;
	const result = await db.query(querySelect);
	console.log(result);

	res.json(result.rows);
	} catch (error) {
	logger.error("Error fetching modules:", error);
	res.status(500).json({ error: "Internal Server Error" });
	}
  });


export default router;

