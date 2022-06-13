import { dirname, resolve } from "path";
import { cwd } from "process";
import { platform } from "os";
import { stat, mkdir, readdir, open } from "fs/promises";
import { execFileSync } from "child_process";

const src = resolve(cwd(), "src");

const exportedFunctions = {
  calculateNetwork: "() => number;",
};

const libraryName = "lib.js";
const targetName = resolve(cwd(), "..", "evolve-from-bits", "src", "evolve", libraryName);

const emcc = platform() === "win32"
  ? "emcc.bat"
  : "emcc";

const useDebugBuild = false;

/**
 * Get all file names of a directory and all its subdirectories.
 * @param {string} directoryPath Path of the directory to list all file names
 * @param {string[]} arrayOfFiles Array of file names to combine the result with
 * @param {(fileName: string) => boolean} filter Optional filter function to filter out file names
 * @returns A promise that resolves to an array of file names
 */
const getFileNamesRecursive = async (directoryPath, arrayOfFiles = [], filter = undefined) => {
  const directoryEntries = await readdir(directoryPath, { withFileTypes: true });

  directoryEntries.forEach(async (directoryEntry) => {
    const entryPath = resolve(directoryPath, directoryEntry.name);
    if (directoryEntry.isDirectory()) {
      arrayOfFiles = await getFileNamesRecursive(entryPath, arrayOfFiles, filter);
    } else if (directoryEntry.isFile()) {
      if (filter) {
        if (filter(entryPath)) {
          arrayOfFiles.push(entryPath);
        }
      }
    }
  });

  return arrayOfFiles;
};

/**
 * Gets the stats of a file or directory.
 * @param {string} path Path of the file or directory to get the stats of
 * @returns the stats of the file or directory or null if the file or directory does not exist
 */
const getStatsSave = async (path) => {
  try {
    return await stat(path);
  } catch {
    return null;
  }
};

/**
 * Creates a directory if it does not exist (recursive).
 * @param {string} directory Path of the directory to create
 */
const createDirectoryRecusive = async (directory) => {
  const parentDirectory = dirname(directory);

  if (!await getStatsSave(parentDirectory)) {
    await createDirectoryRecusive(parentDirectory);
  }

  if (!(await getStatsSave(parentDirectory)).isDirectory()) {
    throw new Error(`${parentDirectory} is not a directory`);
  }

  if (!await getStatsSave(directory)) {
    await mkdir(directory);
  }

  if (!(await getStatsSave(directory)).isDirectory()) {
    throw new Error(`${directory} is not a directory`);
  }
};

/**
 * Compiles the library using emcc.
 * @param {string[]} sourceFileNames Array of file names to compile
 */
const runEmcc = async (sourceFileNames) => {
  const outputDirectory = dirname(targetName);
  await createDirectoryRecusive(outputDirectory);

  const debugArgs = [
    "-O1",
    "-g",
  ];

  const releaseArgs = [
    "-O3",
    "-g0",
    "-flto",
    "--closure",
    "1",
  ];

  const args = [
    ...(useDebugBuild ? debugArgs : releaseArgs),
    "-sENVIRONMENT=web",
    "-sWASM",
    "-sMODULARIZE",
    "-sEXPORT_ES6",
    "-sNO_DYNAMIC_EXECUTION",
    `-sEXPORTED_FUNCTIONS=${Object.keys(exportedFunctions).map((key) => `_${key}`).join(",")}`,
    "-sEXPORTED_RUNTIME_METHODS=cwrap",
    "--no-entry",
    "-o",
    targetName,
    ...sourceFileNames,
  ];
  const options = { cwd: cwd() };
  return execFileSync(emcc, args, options);
};

/**
 * Create the typings file.
 */
const createTypingsFile = async () => {
  const typingsFileName = targetName.replace(/\.js$/, ".d.ts");
  const indexFileName = targetName.replace(libraryName, "index.ts");
  const typingsFd = await open(typingsFileName, "w");
  try {
    const content = `declare type ModuleResult = {
${Object.entries(exportedFunctions).map(([key, value]) => `  _${key}: ${value}`).join("\n")}
};
declare function Module(): Promise<ModuleResult>;
export default Module;
`;
    await typingsFd.writeFile(content, { encoding: "utf8" });
  } finally {
    await typingsFd.close();
  }

  const indexFd = await open(indexFileName, "w");
  try {
    const content = `import Module from "./lib";

export default Module;
`;
    await indexFd.writeFile(content, { encoding: "utf8" });
  } finally {
    await indexFd.close();
  }
};

try {
  const souceFileNames = await getFileNamesRecursive(
    src,
    undefined,
    (fileName) => fileName.endsWith(".c") || fileName.endsWith(".cpp"),
  );

  await runEmcc(souceFileNames);
  await createTypingsFile();
} catch(err) {
  console.error(err);
}
