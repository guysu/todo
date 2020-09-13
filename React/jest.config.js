module.exports = {
    clearMocks: true,
    roots: ["<rootDir>/client/src"],
    preset: "ts-jest",
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    testEnvironment: "node",
    moduleNameMapper: {
        "\\.(scss)$": "identity-obj-proxy",
    },
};
