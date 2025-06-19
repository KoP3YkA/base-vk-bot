module.exports = {
    preset: "ts-jest/presets/default-esm",
    testEnvironment: "node",
    transform: {
        "^.+\\.ts$": ["ts-jest", {useESM: true}],
    },
    extensionsToTreatAsEsm: [".ts"],
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1",
    },
    setupFiles: ["<rootDir>/test/setup.ts"]
};
