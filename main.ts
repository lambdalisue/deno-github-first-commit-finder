import { Hono } from "hono";
import { logger } from "hono/logger";
import Api from "./route/api.ts";
import App from "./route/app.tsx";

const app = new Hono();

app.use(logger());

app.route("/api", Api);
app.route("/", App);

Deno.serve(app.fetch);
