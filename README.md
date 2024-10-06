# GitHub First Commit Finder

Find the first commit of a GitHub repository.

![](https://github.com/user-attachments/assets/f8bc6da7-0ca4-4717-a7b8-9c15136b2f63)

> [!WARNING]
>
> The service uses GitHub's REST API without authentication. So the rate limit
> is 60 requests per hour and I couln't be bothered to implement error handling.
> PR to fix this issue is welcome.
>
> https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28

## Usage

Access to https://github-first-commit-finder.deno.dev or run the following
command

```
curl https://github-first-commit-finder.deno.dev/api/{owner}/{repo}
```

## License

The code follows MIT license written in [LICENSE](./LICENSE). Contributors need
to agree that any modifications sent in this repository follow the license.
