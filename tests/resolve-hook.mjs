import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const projectRoot = process.cwd();

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    const relativePath = specifier.slice(2);
    const candidatePaths = [
      path.resolve(projectRoot, "src", relativePath),
      path.resolve(projectRoot, "src", `${relativePath}.ts`),
      path.resolve(projectRoot, "src", `${relativePath}.tsx`),
      path.resolve(projectRoot, "src", `${relativePath}.js`),
      path.resolve(projectRoot, "src", relativePath, "index.ts"),
      path.resolve(projectRoot, "src", relativePath, "index.tsx"),
      path.resolve(projectRoot, "src", relativePath, "index.js"),
    ];

    for (const cand of candidatePaths) {
      if (fs.existsSync(cand) && !fs.statSync(cand).isDirectory()) {
        return {
          url: pathToFileURL(cand).href,
          shortCircuit: true,
        };
      }
    }
  }

  // Also support relative imports without extension (e.g. ./pricing)
  if (specifier.startsWith("./") || specifier.startsWith("../")) {
    const parentDir = context.parentURL
      ? path.dirname(new URL(context.parentURL).pathname)
      : projectRoot;
    const resolved = path.resolve(parentDir, specifier);
    const candidates = [
      resolved,
      `${resolved}.ts`,
      `${resolved}.tsx`,
      `${resolved}.js`,
      path.join(resolved, "index.ts"),
    ];
    for (const cand of candidates) {
      if (fs.existsSync(cand) && !fs.statSync(cand).isDirectory()) {
        return {
          url: pathToFileURL(cand).href,
          shortCircuit: true,
        };
      }
    }
  }

  return nextResolve(specifier, context);
}
