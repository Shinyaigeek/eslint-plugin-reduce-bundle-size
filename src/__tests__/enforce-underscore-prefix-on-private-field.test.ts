import { TSESLint } from "@typescript-eslint/utils";
import { enforceUnderscorePrefixOnPrivateFieldRule } from "../rules/enforce-underscore-prefix-on-private-field";

const tester = new TSESLint.RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
});

describe("[rule] enforce underscore prefix-on-private-field", () => {
  tester.run(
    "enforceUnderscorePrefixOnPrivateField",
    enforceUnderscorePrefixOnPrivateFieldRule,
    {
      valid: [
        {
          name: "private field with underscore",
          code: `
                  export class Foo {
                      private _bar: string;
                  }
                  `,
        },
        {
          name: "private method with underscore",
          code: `
                  export class Foo {
                      private _bar(): string {
                          return "";
                      }
                  }
                  `,
        },
      ],
      invalid: [
        {
          name: "private field without underscore",
          code: `
                  export class Foo {
                      private bar: string;
                  }
                  `,
          errors: [{ messageId: "enforceUnderscorePrefixOnPrivateField" }],
        },
        {
          name: "private method without underscore",
          code: `
                  export class Foo {
                      private bar(): string {
                          return "";
                      }
                  }
                  `,
          errors: [{ messageId: "enforceUnderscorePrefixOnPrivateField" }],
        },
      ],
    }
  );
});
