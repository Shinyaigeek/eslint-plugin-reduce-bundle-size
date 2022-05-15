import { TSESLint } from "@typescript-eslint/utils";
import { banConstantObject } from "../rules/ban-constant-object";

const tester = new TSESLint.RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
});

describe("[rule] ban constant object", () => {
  tester.run("banConstantObject", banConstantObject, {
    valid: [
      {
        name: "normal variable declaration",
        code: `const hoge = {}`,
      },
      {
        name: "normal constant declaration",
        code: `const HOGE = "hoge"`,
      },
      {
        name: "object variable and all keys identifier is UPPER_CAMEL_CASE",
        code: `const hoge = {
          HOGE: "hoge",
          FUGA: "fuga",
          bar: "bar",
        }`,
      },
    ],
    invalid: [
      {
        name: "object variable initialization with UPPER_CAMEL_CASE identifier",
        code: `const HOGE = {}`,
        errors: [{ messageId: "banConstantObject" }],
      },
      {
        name: "object variable and all keys identifier is UPPER_CAMEL_CASE",
        code: `const hoge = {
          HOGE: "hoge",
          FUGA: "fuga",
        }`,
        errors: [{ messageId: "banConstantObject" }],
      },
      {
        name: "object variable and all keys identifier is UPPER_CAMEL_CASE",
        code: `const HOGE = {
          HOGE: "hoge",
          FUGA: "fuga",
        }`,
        errors: [{ messageId: "banConstantObject" }],
      },
    ],
  });
});
