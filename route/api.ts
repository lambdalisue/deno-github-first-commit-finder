import { Hono } from "hono";
import { cache } from "hono/cache";
import { findFirstCommit } from "../domain/service.ts";

const app = new Hono();

app.get(
  "*",
  cache({
    cacheName: "github-first-commit-finder-api",
    cacheControl: "max-age=3600",
    wait: true,
  }),
);

app.get("/:owner/:repo", async (c) => {
  const { owner, repo } = c.req.param();
  const commit = await findFirstCommit(owner, repo);
  return c.text(JSON.stringify(commit));
});

export default app;
