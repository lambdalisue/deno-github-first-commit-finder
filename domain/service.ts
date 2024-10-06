import { ensure, is } from "@core/unknownutil";

/**
 * Find the first commit of the repository
 *
 * @param owner - The owner of the repository
 * @param repo - The name of the repository
 * @param branch - The branch of the repository
 * @param token - The GitHub token
 * @returns The first commit of the repository or `undefined` if not found
 */
export async function findFirstCommit<T>(
  owner: string,
  repo: string,
  { branch, token }: { branch?: string; token?: string } = {},
): Promise<T> {
  // Construct headers
  const headers = {
    "Accept": "application/vnd.github.v3+json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
  };

  // Find the page count of commits
  const qs = new URLSearchParams({ per_page: "1" });
  if (branch) {
    // Explicitly set the branch (otherwise GitHub API uses the default branch)
    qs.set("sha", branch);
  }

  // Find the last page of the commits
  const resp1 = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/commits?${qs}`,
    { headers },
  );
  const lastPage = extractLastPageFromLinkHeader(resp1.headers);
  qs.set("page", lastPage.toString());

  // Get the last page of the commits
  const resp2 = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/commits?${qs}`,
    { headers },
  );
  const commits = ensure(await resp2.json(), is.Array);
  return commits.at(0) as T;
}

function extractLastPageFromLinkHeader(headers: Headers): number {
  const linkHeader = headers.get("link");
  if (linkHeader) {
    const lastPageMatch = linkHeader.match(/&page=(\d+)>; rel="last"/);
    return lastPageMatch ? Number(lastPageMatch[1]) : 1;
  } else {
    return 1;
  }
}
