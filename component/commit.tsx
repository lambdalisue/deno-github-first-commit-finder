import type { FC } from "hono/jsx";
import { css } from "hono/css";
import { ensure, is, type Predicate } from "@core/unknownutil";

import { findFirstCommit } from "../domain/service.ts";

const tableStyle = css`
tr:last-child {
  border-bottom: none;
}
`;

const errorStyle = css`
color: red;
`;

export const Commit: FC<{ owner: string; repo: string }> = async (
  { owner, repo },
) => {
  if (!owner || !repo) {
    return <div />;
  }
  try {
    const commit = ensure(await findFirstCommit(owner, repo), isCommitData);
    return (
      <table class={tableStyle}>
        <tr>
          <th>Repository</th>
          <td>
            <a href={`https://github.com/${owner}/${repo}`}>
              {owner}/{repo}
            </a>
          </td>
        </tr>
        <tr>
          <th>SHA</th>
          <td>
            <a href={commit.html_url}>{commit.sha}</a>
          </td>
        </tr>
        <tr>
          <th>Message</th>
          <td>{commit.commit.message}</td>
        </tr>
        <tr>
          <th>Date</th>
          <td>{new Date(commit.commit.author.date)}</td>
        </tr>
        <tr>
          <th>Author</th>
          <td>{commit.commit.author.name}</td>
        </tr>
        <tr>
          <th>Committer</th>
          <td>{commit.commit.author.name}</td>
        </tr>
        <tr>
          <th>Raw JSON</th>
          <td>
            <a href={`/api/${owner}/${repo}`}>/api/{owner}/{repo}</a>
          </td>
        </tr>
      </table>
    );
  } catch (e) {
    console.warn(`Failed to find the first commit of ${owner}/${repo}`, e);
    return (
      <div class={errorStyle}>
        Failed to find the first commit of {owner}/{repo}
      </div>
    );
  }
};

export type CommitData = {
  sha: string;
  commit: {
    author: {
      name: string;
      email: string;
      date: string;
    };
    committer: {
      name: string;
      email: string;
      date: string;
    };
    message: string;
  };
};

export const isCommitData = is.ObjectOf({
  sha: is.String,
  commit: is.ObjectOf({
    author: is.ObjectOf({
      name: is.String,
      email: is.String,
      date: is.String,
    }),
    committer: is.ObjectOf({
      name: is.String,
      email: is.String,
      date: is.String,
    }),
    message: is.String,
  }),
  html_url: is.String,
}) satisfies Predicate<CommitData>;
