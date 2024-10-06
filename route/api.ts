import { Hono } from "hono";
import { findFirstCommit } from "../domain/service.ts";

const app = new Hono();

app.get("/:owner/:repo", async (c) => {
  const { owner, repo } = c.req.param();
  const commit = await findFirstCommit(owner, repo);
  return c.text(JSON.stringify(commit));
});

export default app;
