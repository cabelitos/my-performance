module.exports = {
    'env': {
        'browser': true,
        'es6': true
    },
    'extends': [
      'airbnb',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:prettier/recommended',
      'prettier/@typescript-eslint',
      'prettier/react'
    ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'parser': '@typescript-eslint/parser',
    'plugins': [
      'react',
      'react-hooks',
      'filenames',
      'import'
    ],
    'rules': {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-filename-extension': [
        'error',
        {
          extensions: ['.tsx'],
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_'
        }
      ],
      'no-underscore-dangle': ['error', { 'allow': ['__typename'] }],
      'spaced-comment': ['error', 'always', { 'markers': ['/'] }],
      'react/jsx-props-no-spreading': 'off',
    },
    settings: {
      'import/resolver': {
        typescript: {},
      },
    }
};
