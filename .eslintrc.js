module.exports = {
    root: true,

    plugins: [
        'html',
        'jsx'
    ],

    extends: '@youyoufe/eslint-config-youyoufe',

    "rules": {
        "jsx/uses-factory": [1, { "pragma": "h" }],
        "jsx/factory-in-scope": [1, { "pragma": "h" }],
        "jsx/mark-used-vars": 1,
        "jsx/no-undef": 1
    },

    globals: {
        
    },

    parser: 'babel-eslint'
};
