import { banUnderscorePrefixOnPublicFieldRule } from "./rules/ban-underscore-prefix-on-public-field";
import { enforceUnderscorePrefixOnPrivateFieldRule } from "./rules/enforce-underscore-prefix-on-private-field";

module.exports = {
  rules: {
    "ban-underscore-prefix-on-public-field":
      banUnderscorePrefixOnPublicFieldRule,
    "enforce-underscore-prefix-on-private-field":
      enforceUnderscorePrefixOnPrivateFieldRule,
  },
  configs: {
    recommended: {
      plugins: ["reduce-bundle-size", "@typescript-eslint"],
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      parser: "@typescript-eslint/parser",
      rules: {
        "reduce-bundle-size/ban-underscore-prefix-on-public-field":
          "warn",
        "reduce-bundle-size/enforce-underscore-prefix-on-private-field":
          "warn",
        "no-restricted-syntax": [
          "warn",
          {
            selector: "TSEnumDeclaration:not([const=true])",
            message:
              "Don't declare non-const enums, because enums will cause a worse bundle-size due to transpile helper",
          },
        ],
        "@typescript-eslint/consistent-type-imports": "error",
      },
    },
  },
};
