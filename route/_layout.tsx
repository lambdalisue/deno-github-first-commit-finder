import type { FC } from "hono/jsx";
import { css, Style } from "hono/css";

const footerStyle = css`
text-align: right;
font-size: small;
margin-top: 1em;

a {
  color: #ccc;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
}
`;

export const Layout: FC = ({ children }) => (
  <html>
    <head>
      <title>GitHub First Commit Finder</title>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/sakura.css/css/sakura.css"
      />
      <Style />
    </head>
    <body>
      <header>
        <h1>GitHub First Commit Finder</h1>
      </header>
      <main>
        {children}
      </main>
      <footer class={footerStyle}>
        <a href="https://github.com/lambdalisue/deno-github-first-commit-finder">
          See project on GitHub
        </a>
      </footer>
    </body>
  </html>
);
