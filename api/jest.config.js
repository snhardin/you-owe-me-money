module.exports = {
    coveragePathIgnorePatterns: ['node_modules', 'dist'],
    moduleDirectories: ['node_modules'],
    roots: ['<rootDir>/src'],
    setupFilesAfterEnv: ['<rootDir>/src/test.ts'],
    testMatch: ['**/+(*.(+(spec).+(js)'],
};
