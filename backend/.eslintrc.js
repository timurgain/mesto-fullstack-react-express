module.exports = {
  extends: ['airbnb-base', 'plugin:node/recommended'],
  rules: {
    // add any custom rules here
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'import/no-extraneous-dependencies': [
      'error',
      // {
      //   devDependencies: false,
      //   dependencies: false
      // }
    ],
    'node/no-unpublished-require': [
      'error',
      {
        allowModules: ['electron'],
      },
    ],
    'max-classes-per-file': ['error', Infinity],
  },
  env: {
    node: true,
  },
};
