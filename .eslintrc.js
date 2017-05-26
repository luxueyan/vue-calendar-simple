// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  // parser: 'babel-eslint',
  parser: 'typescript-eslint-parser',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html',
    'tslint' // not work unless use the 'typescript-eslint-parser'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,

    'space-before-function-paren': 0,
    "spaced-comment": [0, "never"],
    'indent': [2, 2, {
      'SwitchCase': 1
    }],

    // for typescript-eslint-parser issues
    'no-undef': 0,
    'no-unused-vars': 0,
    'no-useless-constructor': 0,
    'space-infix-ops': 0,

    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
