import {EnvironManager} from "./EnvironManager";
import chalk from "chalk";
import {Time} from "@kop3yka/time";

export class Logger {
    private static isDevMode : boolean = EnvironManager.getEnvironField<number>('MODE', (val: string) => +val) === 1;

    public static info(message: string, level: number = 0) : void {
        if (level === 1 || !this.isDevMode) console.log(chalk.green(`[INFO] [${new Time().format()}] ${message}`))
    }

}