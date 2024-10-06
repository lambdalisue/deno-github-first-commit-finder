import type { FC } from "hono/jsx";
import { Style } from "hono/css";

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
      {children}
    </body>
  </html>
);
