module.exports = {
    extends: [
        'eslint:recommended',
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:jsdoc/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
    },
    plugins: [
        'jsdoc',
        '@typescript-eslint',
    ],
    rules: {
        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/space-before-function-paren': ['error', 'always'],
        'jsdoc/require-jsdoc': ['error'],
    },
};
