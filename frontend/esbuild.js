import esbuild from "esbuild";
import process from "node:process";
import { lessLoader } from "esbuild-plugin-less";
import fs from "fs";

// Read environment variables from .env file
const envFile = fs.readFileSync("env/.env", "utf-8");
const envVariables = Object.fromEntries(
  envFile.split("\n").map((line) => line.split("="))
);
// Define environment variables for esbuild
const define = Object.entries(envVariables).reduce((acc, [key, value]) => {
  acc[`process.env.${key}`] = JSON.stringify(value);
  return acc;
}, {});
const args = process.argv;

const config = {
  logLevel: "info",
  entryPoints: ["src/index.js"],
  outfile: "../public/build/bundle.js",
  bundle: true,
  define,
  alias: { "@": "./src/" },
  plugins: [
    lessLoader({
      paths: ["node_modules/"],
      math: "always",
      javascriptEnabled: true,
    }),
  ],
  loader: { ".js": "jsx", ".css": "css" },
};

if (args.includes("--build")) {
  esbuild
    .build({
      ...config,
      outfile: "../public/build/bundle.js",
      minify: true,
      sourcemap: false,
    })
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}

if (args.includes("--start")) {
  esbuild
    .context({
      ...config,
      minify: false,
      sourcemap: true,
    })
    .then(async (ctx) => {
      await ctx.watch();
      // await ctx.serve({
      //   servedir: "../public",
      //   onRequest: ({ remoteAddress, method, path, status, timeInMS }) => {
      //     console.info(
      //       remoteAddress,
      //       status,
      //       `"${method} ${path}" [${timeInMS}ms]`
      //     );
      //   },
      // });
    })
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
