module.exports = {
    'extends': [
        'eslint-config-google',
    ],
    'env': {
        'es6': true,
    },
    'rules': {
        'indent': ['error', 4],
        'max-len': ['error', {'code': 120}],
    },
    'parserOptions': {'ecmaVersion': 2018},
    'ignorePatterns': ['data/recipes.js'],
};
