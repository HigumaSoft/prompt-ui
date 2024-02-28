module.exports = {
    env: {
        browser: true,
    },
    parser: '@typescript-eslint/parser',
    extends: ['plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
    plugins: ['@typescript-eslint', 'cypress'],
    rules: {
        // Add custom rules here if needed
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
}