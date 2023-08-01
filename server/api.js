import { Router } from "express";
import { Octokit } from "@octokit/core";
import config from "./utils/config";
import { createOAuthAppAuth } from "@octokit/auth-oauth-app";

import logger from "./utils/logger";

const router = Router();


router.get("/", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello, world!" });
});


router.get("/getAccessToken", async function (req, res) {
	// console.log(req.query.code);
	const params =
		"?client_id=" +
		process.env.CLIENT_ID +
		"&client_secret=" +
		process.env.CLIENT_SECRET +
		"&code=" +
		req.query.code;

	await fetch("https://github.com/login/oauth/access_token" + params, {
		method: "POST",
		headers: {
			Accept: "application/json",
		},
	})
		.then((response) => response.json())
		.then((data) => res.json(data));
});

//get user data
router.get("/getGithubUserData", async function (req, res) {
	req.get("Authorization"); //bearer access token to be passed
	await fetch("https://api.github.com/user", {
		method: "GET",
		headers: {
			Authorization: req.get("Authorization"),
		},
	})
		.then((response) => response.json())
		.then((data) => res.json(data));
});



//define client_id from server
router.get("/clientId", (_, res) => {
	res.json({ client_id: process.env.CLIENT_ID });
});

router.delete("/applications/grant", async (req, res) => {
	try {
		//create a octokit client for oauth
		const octokit = new Octokit({
			authStrategy: createOAuthAppAuth,
			auth: {
				clientId: config.client_id,
				clientSecret: config.client_secret,
			},
		});
		//delete the grant for particular client_id
		await octokit.request("DELETE /applications/{client_id}/grant", {
			client_id: config.client_id,
			access_token: req.body.accessToken,
			headers: {
				"X-GitHub-Api-Version": "2022-11-28",
			},
		});
		res.send(true);
	} catch (error) {
		res.send(false);
	}
});


export default router;
