import { randomUUID } from "node:crypto";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, extname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";

const tempRoot = mkdtempSync(join(tmpdir(), "pricingnest-ts-tests-"));
const moduleCache = new Map();

const importPatterns = [
  /(from\s+["'])(\.{1,2}\/[^"']+)(["'])/g,
  /(import\s*\(\s*["'])(\.{1,2}\/[^"']+)(["']\s*\))/g
];

process.on("exit", () => {
  rmSync(tempRoot, { recursive: true, force: true });
});

function rewriteRelativeImports(outputText, sourcePath) {
  const sourceDir = dirname(sourcePath);

  return importPatterns.reduce(
    (text, pattern) =>
      text.replace(pattern, (_, prefix, specifier, suffix) => {
        const resolvedPath = resolve(sourceDir, specifier);
        return `${prefix}${pathToFileURL(resolvedPath).href}${suffix}`;
      }),
    outputText
  );
}

export async function importTypeScriptModule(modulePath) {
  const resolvedModulePath = resolve(modulePath);

  if (!moduleCache.has(resolvedModulePath)) {
    const sourceText = readFileSync(resolvedModulePath, "utf-8");
    const { outputText } = ts.transpileModule(sourceText, {
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2022
      },
      fileName: resolvedModulePath
    });

    const runtimeModuleText = rewriteRelativeImports(outputText, resolvedModulePath);
    const runtimeModulePath = join(
      tempRoot,
      `${basename(resolvedModulePath, extname(resolvedModulePath))}-${randomUUID()}.mjs`
    );

    writeFileSync(runtimeModulePath, runtimeModuleText, "utf-8");
    moduleCache.set(resolvedModulePath, pathToFileURL(runtimeModulePath).href);
  }

  return import(moduleCache.get(resolvedModulePath));
}
