module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        project: "./tsconfig.json",
    },
    plugins: ["@typescript-eslint"],
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    rules: {
        "@typescript-eslint/no-unused-vars": [
            "warn",
            {argsIgnorePattern: "^_"},
        ],
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "eqeqeq": ["warn", "always"],
        "no-var": "error",
        "prefer-const": "error",
        "@typescript-eslint/no-unsafe-function-type": "off",
        "@typescript-eslint/no-wrapper-object-types": "off",
        "@typescript-eslint/no-explicit-any": "warn"
    },
};
