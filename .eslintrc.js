module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  "rules": {
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/explicit-function-return-type": "error",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/naming-convention": [
            "error",
            {
                "selector": "default",
                "format": ["camelCase", "PascalCase"]
            },
            {
                "selector": "variable",
                "types": [
                    "boolean"
                ],
                "format": ["PascalCase"],
                "prefix": ["is", "should", "has", "can", "did", "will"]
            },
            {
                "selector": "function",
                "format": ["camelCase"]
            },
            {
                "selector": "interface",
                "format": [ "PascalCase"]
            },
            {
                "selector": "typeAlias",
                "format": ["PascalCase"]
            },
            {
                "selector": "enumMember",
                "format": ["PascalCase", "UPPER_CASE" ]
            },
            {
                "selector": "enum",
                "format": [ "PascalCase" ]
            },
            {
                "selector": "class",
                "format": [ "PascalCase" ]
            }
        ]
    }
};
