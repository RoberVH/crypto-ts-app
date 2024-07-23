module.exports = {
    semi: false,
    printWidth: 80,
    tabWidth: 2,
    useTabs: false,
    singleQuote: true,
    trailingComma: 'es5',
    bracketSpacing: true,
    arrowParens: 'always',
    overrides: [
      {
        files: '*.sol',
        options: {
          tabWidth: 4,
          singleQuote: false
        }
      }
    ]
  };
  