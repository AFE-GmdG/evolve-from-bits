/* eslint-disable import/no-extraneous-dependencies */
const { execFileSync } = require("child_process");
const { join, basename } = require("path");
const { existsSync, mkdirSync, writeFileSync, readFileSync } = require("fs");
const { tmpdir } = require("os");

function createTempDir() {
  const path = join(tmpdir(), "emcc-loader");
  if (!existsSync(path)) {
    mkdirSync(path);
  }
  return path;
}

function runEmcc(emcc, cwd, main) {
  const args = [main, "-O3", "-s", "WASM=1", "-s", "MODULARIZE=1"];
  const options = { cwd };
  return execFileSync(emcc, args, options);
}

function emccLoader(source) {
  const emccLoaderTempDir = createTempDir();
  const filename = basename(this.resource);

  const options = this.getOptions() || {};
  const emcc = options.emcc || "emcc";

  writeFileSync(join(emccLoaderTempDir, filename), source);
  runEmcc(emcc, emccLoaderTempDir, filename);

  const publicPath = typeof options.publicPath === "string"
    ? options.publicPath === "" || options.publicPath.endsWith("/")
      ? options.publicPath
      : `${options.publicPath}/`
    : typeof options.publicPath === "function"
      ? options.publicPath(this.resourcePath, this.rootContext)
      : this._compilation.outputOptions.publicPath || "dist";

  if (!existsSync(publicPath)) {
    mkdirSync(publicPath);
  }

  const wasmPath = join(publicPath, `${filename}.wasm`);
  const wasm = readFileSync(join(emccLoaderTempDir, "a.out.wasm"));
  writeFileSync(wasmPath, wasm);

  return `
    import Load from "${join(emccLoaderTempDir, "a.out.js").replace(/\\/g, "/")}";
    export async function then(cb) {
      const m = Load({
        locateFile(path) {
          if(path.endsWith('.wasm')) {
            return "${filename}.wasm";
          }
          return path;
        }
      });
      m.onRuntimeInitialized = () => {
        delete m.then;
        cb(m);
      }
    }
  `;
}

module.exports = emccLoader;
