import * as dotenv from "dotenv";
dotenv.config({override: true});
import {Nothing} from "./types/nothing.type";
import {Localization} from "yml-localization";
import * as path from "node:path";
import {Scanner} from "./classes/application/Scanner";
import {ModularORM} from "modular-orm";
import {EnvironManager} from "./classes/utils/EnvironManager";
import {Client} from "./classes/application/Client";
import {Logger} from "./classes/utils/Logger";

export class Main {
    private static instance: Main;
    public static localization: Localization;

    private constructor() {}

    public async start(): Nothing {
        const startTime: Date = new Date();

        Main.localization = new Localization(
            path.resolve(process.cwd(), "localization.yml")
        );
        Logger.info("Localization was cached");

        await Scanner.scanAndImportDirectory(
            path.resolve(__dirname, "../logic")
        );
        Logger.info("Logic directory was imported");

        const isDevMode: boolean =
            EnvironManager.getEnvironField<number>(
                "MODE",
                (val: string) => +val
            ) === 1;

        await ModularORM.getInstance().start({
            host: EnvironManager.getEnvironField("MYSQL_HOST"),
            database: EnvironManager.getEnvironField("MYSQL_DATABASE"),
            user: EnvironManager.getEnvironField("MYSQL_USER"),
            password: EnvironManager.getEnvironField("MYSQL_PASSWORD"),
            port: EnvironManager.getEnvironField<number>(
                "MYSQL_PORT",
                (val: string) => +val
            ),
            logs: isDevMode,
            validationErrors: isDevMode,
            maxMemoryUsageMB: 100,
            useCache: true,
            migrations: isDevMode ? "auto" : "file",
            connectionType: "pool",
            returnsNullWhenErrors: true,
            checkTablesExists: !isDevMode,
        });
        Logger.info("ORM was started");

        await new Client(
            EnvironManager.getEnvironField("BOT_TOKEN")
        ).startPolling();

        const endTime: Date = new Date();
        Logger.info(
            `Bot has been started in ${endTime.getTime() - startTime.getTime()} ms`,
            1
        );
    }

    public static getInstance(): Main {
        if (!this.instance) this.instance = new Main();
        return this.instance;
    }
}

(async () => {
    await Main.getInstance().start();
})();
