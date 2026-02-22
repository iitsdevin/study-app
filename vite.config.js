import { defineConfig } from "vite";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const ghBase = repoName ? `/${repoName}/` : "/";

export default defineConfig({
  // Use repo subpath on GitHub Pages project sites.
  base: process.env.GITHUB_ACTIONS ? ghBase : "/",
});
