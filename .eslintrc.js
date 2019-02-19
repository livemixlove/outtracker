module.exports = {
    env: {
        es6: true,
    },
    extends: 'airbnb',
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
            classes: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: [
        'react',
    ],
    globals: {
        $: true,
        window: true,
        document: true,
        test: true,
        expect: true,
        isNaN: true,
        alert: true,
        localStorage: true,
    },
    rules: {
        indent: [
            'error',
            4,
        ],
        // Indent JSX with 4 spaces
        'react/jsx-indent': ['error', 4],
        // Indent props with 4 spaces
        'react/jsx-indent-props': ['error', 4],
        'linebreak-style': [
            'error',
            'unix',
        ],
        'max-len': ['error', { code: 120 }],
        quotes: [
            'error',
            'single',
        ],
        'no-param-reassign': 0,
        'jsx-quotes': ['error', 'prefer-single'],
        semi: [
            'error',
            'never',
        ],
        camelcase: 'off',
        'class-methods-use-this': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'no-console': 'off',
        'no-alert': 'off',
        'no-plusplus': 'off',
        'import/prefer-default-export': 'off',
        'no-use-before-define': 'off',
        'no-class-assign': 'off',
        'react/no-multi-comp': 'off',
        'react/prefer-stateless-function': 'off',
        'no-underscore-dangle': 'off',
        'prefer-template': 'off',
        'click-events-have-key-events': 'off',
        'react/destructuring-assignment': 'off',
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],

    },
}
