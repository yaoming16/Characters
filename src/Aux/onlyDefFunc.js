import { readFile, writeFile } from "node:fs/promises";

const sourcePath = new URL(
  "../../public/data/dictionary.json",
  import.meta.url,
);
const outputPath = new URL(
  "../../public/data/dictionary copy.json",
  import.meta.url,
);

function extractDefinitions(dictionaryData) {
  if (!dictionaryData || !Array.isArray(dictionaryData.CharactersInfo)) {
    throw new Error("dictionary.json must contain a CharactersInfo array");
  }

  return dictionaryData.CharactersInfo.reduce((definitionsMap, characterInfo) => {
    definitionsMap[characterInfo?.character ?? ""] =
      typeof characterInfo?.definition === "string"
        ? characterInfo.definition
        : null;

    return definitionsMap;
  }, {});
}

async function main() {
  const rawDictionary = await readFile(sourcePath, "utf8");
  const dictionaryData = JSON.parse(rawDictionary);
  const extractedDefinitions = extractDefinitions(dictionaryData);

  await writeFile(
    outputPath,
    `${JSON.stringify(extractedDefinitions, null, 2)}\n`,
    "utf8",
  );

  console.log(
    `Wrote definition copy to ${outputPath.pathname.split("/").pop()}`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
