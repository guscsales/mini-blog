import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Raiz do conteúdo. Tudo que é texto do blog mora aqui. */
const CMS_DIR = join(process.cwd(), ".cms");

/** Lê um arquivo do `.cms`. O caminho é relativo à raiz do conteúdo. */
export async function readCmsFile(path: string): Promise<string> {
  return readFile(join(CMS_DIR, path), "utf8");
}
