import config  from "./utils/config";
import { Router } from "express";
import fetch from "node-fetch";

import logger from "./utils/logger";

const router = Router();
router.get("/", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello, world!" });
});


router.get("/auth/github", async( req, res) => {
	const { code, state } = req.query;
	if(state !== config.client_key) {
		logger.debug("Invalid state: " + state + "<>" + config.client_key);
		res.status(403).send("unauthorized");
		return;
	}

	const baseUrl = "https://github.com/login/oauth/access_token";
	const url = `${baseUrl}?client_id=${config.client_id}&client_secret=${config.client_secret}&code=${code}`;
    const resp = await fetch (url,
		{
			method: "POST",
			headers: { Accept: "application/json" },
		});
    const data = await resp.json();
	res.send(data);
});

export default router;