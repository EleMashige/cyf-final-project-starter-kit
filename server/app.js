import express from "express";

import apiRouter from "./api";
import config from "./utils/config";
import {
	clientRouter,
	configuredHelmet,
	configuredMorgan,
	httpsOnly,
	logErrors,
} from "./utils/middleware";

import traineeModle from "./traineeModle";

const app = express();
app.use(traineeModle);
const apiRoot = "/api";
app.use(express.json());
app.use(configuredHelmet());
app.use(configuredMorgan());

if (config.production) {
	app.enable("trust proxy");
	app.use(httpsOnly());
}

app.use(apiRoot, apiRouter);
app.use("/health", (_, res) => res.sendStatus(200));
app.use(clientRouter(apiRoot));

app.use(logErrors());

export default app;