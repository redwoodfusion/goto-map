module.exports = {
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": ["node", "@typescript-eslint"],
  "parserOptions": {
      "sourceType": "module",
  },
  "rules": {
    semi: "off",
    "@typescript-eslint/semi": ["error"],
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
      },
    ],
  },
  "extends": [
    "prettier",
  ],
};
