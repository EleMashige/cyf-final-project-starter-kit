import db from "./db";
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
	const url = `${baseUrl}?client_id=${config.client_id}&client_secret=${config.client_secret}&code=${code}&scope=read:user`;
    const resp = await fetch (url,
		{
			method: "POST",
			headers: { Accept: "application/json" },
		});
    const data = await resp.json();
	logger.debug(JSON.stringify(data));
	const auth = "Bearer " + data.access_token;
	logger.debug(auth);
	const user_resp = await fetch("https://api.github.com/user", {
		headers: { Authorization: auth },
	});

	const gh_user = await user_resp.json();
    // res.send(gh_user);
	// const user = await db.query("SELECT * FROM users WHERE username=$1", [data.login]);
	const result = await db.query("INSERT INTO users (username, name) VALUES ($1, $2)", [gh_user.login, gh_user.name]);
	res.send(result);
});

export default router;