import express from "express";
import cors from "cors";
import db from "./db";
import logger from "./utils/logger";
import bodyParser from "body-parser";

const app = express();

app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));



//GET
app.get("/get", async (req, res) => {
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
app.post("/insert", async (req, res) => {
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

app.post("/insert", async (req, res) => {
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

//DELETE
app.delete("/delete/:id", async (req, res) => {
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
  app.put("/update/:id", async (req, res) => {
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


//GET FOR TRAINEE PROGRESS TABLE

app.get("/traineeProgress", async (req, res) => {
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








export default app;
