import { TSESLint } from "@typescript-eslint/utils";
import { banUnderscorePrefixOnPublicFieldRule } from "../rules/ban-underscore-prefix-on-public-field";

const tester = new TSESLint.RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
});

describe("[rule] ban underscore prefix-on-public-field", () => {
  tester.run(
    "banUnderscorePrefixOnPublicField",
    banUnderscorePrefixOnPublicFieldRule,
    {
      valid: [
        {
          name: "public field without underscore",
          code: `
                export class Foo {
                    public bar: string;
                }
                `,
        },
        {
          name: "normal(=public) field without underscore",
          code: `
                export class Foo {
                    bar: string;
                }
                `,
        },
        {
          name: "private field with underscore",
          code: `
                export class Foo {
                    private _bar: string;
                }
                `,
        },
        {
          name: "protected field without underscore",
          code: `
                export class Foo {
                    protected bar: string;
                }
                `,
        },
        {
          name: "object field without underscore",
          code: `
                export const foo = {
                    bar: string
                }
                `,
        },
        {
          name: "computed field with string literal",
          code: `
                export const foo = {
                    ["bar"]: string
                }
                `,
        },
        {
          name: "object field with identifier",
          code: `
                export const foo = {
                    [_bar]: string
                }
                `,
        },
        {
          name: "public method without underscore",
          code: `
                export class Foo {
                    public bar(): string {
                        return "";
                    }
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
        {
          name: "protected method without underscore",
          code: `
                export class Foo {
                    protected bar(): string {
                        return "";
                    }
                }
                `,
        },
        {
          name: "object method without underscore",
          code: `
                export const foo = {
                    bar(): string {
                        return "";
                    }
                }
                `,
        },
      ],
      invalid: [
        {
          name: "public field with underscore",
          code: `
                  export class Foo {
                      public _bar: string;
                  }
                  `,
          errors: [{ messageId: "banUnderscorePrefixOnPublicField" }],
        },
        {
          name: "normal(=public) field with underscore",
          code: `
                    export class Foo {
                        _bar: string;  
                    }
                    `,
          errors: [{ messageId: "banUnderscorePrefixOnPublicField" }],
        },
        {
          name: "object field with underscore",
          code: `
                    export const foo = {
                        _bar: string
                    }
                    `,
          errors: [{ messageId: "banUnderscorePrefixOnPublicField" }],
        },
        {
          name: "public method with underscore",
          code: `
                    export class Foo {
                        public _fugafuga(): string {
                            return "";
                        }
                    }
                    `,
          errors: [{ messageId: "banUnderscorePrefixOnPublicField" }],
        },
        {
          name: "object method with underscore",
          code: `
                    export const foo = {
                        _bar(): string {
                            return "";
                        }
                    }
                    `,
          errors: [{ messageId: "banUnderscorePrefixOnPublicField" }],
        },
      ],
    }
  );
});
