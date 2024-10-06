import { Hono } from "hono";
import { css } from "hono/css";

import { Layout } from "./_layout.tsx";
import { Commit } from "../component/commit.tsx";

const app = new Hono();

const formStyle = css`
display: flex;
aling-items: center;
justify-content: center;
margin: 1em;
padding: 1em;
border: 1px solid #ccc;

input {
  margin-bottom: 0;
}

label {
  margin-bottom: 0;
}
`;

app.get("/", (c) => {
  const owner = c.req.query("owner") ?? "";
  const repo = c.req.query("repo") ?? "";
  return c.html(
    <Layout>
      <form
        method="get"
        class={formStyle}
      >
        <label style={{ display: "inline-block" }}>
          Owner:
          <input type="text" name="owner" placeholder="owner" value={owner} />
        </label>
        <label style={{ display: "inline-block", marginLeft: "1em" }}>
          Repo:
          <input type="text" name="repo" placeholder="repo" value={repo} />
        </label>
        <button style={{ display: "inline-block", marginLeft: "1em" }}>
          Find
        </button>
      </form>
      <Commit owner={owner} repo={repo} />
    </Layout>,
  );
});

export default app;
