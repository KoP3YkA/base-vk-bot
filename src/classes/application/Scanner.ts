import { readdir } from "fs/promises";
import {Nothing} from "../../types/nothing.type";
import * as path from "node:path";

export class Scanner {

    public static async scanAndImportDirectory(directory: string) : Nothing {
        const entries = await readdir(directory, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(directory, entry.name);

            if (entry.isDirectory()) {
                await this.scanAndImportDirectory(fullPath);
            } else if (
                entry.isFile() &&
                (entry.name.endsWith(".ts") || entry.name.endsWith(".js")) &&
                !entry.name.endsWith(".d.ts")
            ) {
                await import(fullPath);
            }
        }
    }

    public static resolvePath(...paths: string[]) : string {
        return path.resolve(process.cwd(), ...paths)
    }

}