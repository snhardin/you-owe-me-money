module.exports = {
    extends: [
        'eslint:recommended',
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
    },
    plugins: [
        '@typescript-eslint',
    ],
    rules: {
        'arrow-parens': [
            'error',
            'as-needed',
        ],
        'import/prefer-default-export': 'off',
        'import/no-default-export': 'error',
        'indent': [
            'error',
            'tab',
        ],
        'no-console': 'error',
    },
};
