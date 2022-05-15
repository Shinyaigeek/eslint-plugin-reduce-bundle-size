import { TSESLint } from "@typescript-eslint/utils";
import { banComputedPropertyAccess } from "../rules/ban-computed-property-access";

const tester = new TSESLint.RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
});

describe("[rule] ban computed property access", () => {
  tester.run("banComputedPropertyAccess", banComputedPropertyAccess, {
    valid: [
      {
        name: "not computed property access",
        code: `hoge.bar`,
      },
    ],
    invalid: [
      {
        name: "computed property access",
        code: `hoge[bar]`,
        errors: [{ messageId: "banComputedPropertyAccess" }],
      },
      {
        name: "computed property access",
        code: `hoge["bar"]`,
        errors: [{ messageId: "banComputedPropertyAccess" }],
      },
    ],
  });
});
