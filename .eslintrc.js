module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: [
    "import",
    "@typescript-eslint"
  ],
  extends: [
    "airbnb-base"
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': [ '.ts', '.tsx' ]
    },
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    semi: ["error", "never"],
    quotes: ["error", "single"],
    "@typescript-eslint/no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": true }],
    "@typescript-eslint/class-name-casing": ["error"],
    "@typescript-eslint/member-delimiter-style": ["error", {
      "multiline": {
        "delimiter": "none"
      },
      "singleline": {
        "delimiter": "comma",
        "requireLast": false
      }
    }],
    "arrow-body-style": "off",
    "arrow-parens": "off",
    "class-methods-use-this": "off",
    "consistent-return": "off",
    "import/no-unresolved": "off",
    "import/prefer-default-export": "off",
    "import/extensions": "off",
    "lines-between-class-members": "off",
    "max-len": ["error", { "code": 160 }],
    "no-await-in-loop": "off",
    "no-underscore-dangle": "off",
    "no-use-before-define": "off",
    "no-unused-vars": "off",
    "no-shadow": "off",
    "object-curly-newline": ["error", { "consistent": true }],
    "object-property-newline": "off",
    "padded-blocks": "off",
    "semi-style": ["error", "first"],
    "no-param-reassign": ["error",
      {
        "props": true,
        "ignorePropertyModificationsFor": [
          "acc", // for reduce accumulators
          "req", // for Express requests
          "request", // for Express requests
          "res", // for Express responses
          "response", // for Express responses
          "state" // vuex store
        ]
      }
    ]
  },
  env: {
    node: true,
  },
  overrides: [
    {
      files: ["*.spec.ts"],
      env: {
        jest: true,
      },
      rules: {
        "import/no-extraneous-dependencies": "off"
      }
    }
  ]
};
