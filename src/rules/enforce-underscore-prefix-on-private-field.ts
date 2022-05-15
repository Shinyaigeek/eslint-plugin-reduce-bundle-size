import * as tsutils from "tsutils";
import * as ts from "typescript";
import { ASTUtils, AST_NODE_TYPES, TSESTree } from "@typescript-eslint/utils";
import { TSESLint } from "@typescript-eslint/utils";

export const enforceUnderscorePrefixOnPrivateFieldRule: TSESLint.RuleModule<
  "enforceUnderscorePrefixOnPrivateField",
  []
> = {
  meta: {
    docs: {
      description:
        "enforce underscore(_) prefix on private field for more friendly mangling-properties by terser",
      recommended: "warn",
      requiresTypeChecking: true,
    },
    fixable: "code",
    messages: {
      enforceUnderscorePrefixOnPrivateField:
        "Private member '{{fieldName}}' is should be prefixed with _ for more friendly mangling-properties by terser",
    },
    schema: [
      {
        allowAdditionalProperties: false,
        properties: {
          onlyInlineLambdas: {
            type: "boolean",
          },
        },
        type: "object",
      },
    ],
    type: "suggestion",
  },
  create({ report }) {
    return {
      PropertyDefinition(node): void {
        if (node.accessibility !== "private" || node.computed) {
          return;
        }
        const propKey = node.key;
        const name = (() => {
          switch (propKey.type) {
            case "Identifier": {
              return propKey.name;
            }
            case "Literal": {
              return propKey.value;
            }
            default: {
              return undefined; // computed props
            }
          }
        })();
        if (typeof name !== "string" && typeof name !== "number") {
          return; // should not be linted because cannot be mangled
        }
        if (!name.toString().startsWith("_")) {
          report({
            node,
            messageId: "enforceUnderscorePrefixOnPrivateField",
            data: {
              fieldName: name,
            },
          });
        }
      },
      MethodDefinition(node): void {
        if (node.accessibility !== "private" || node.computed) {
          return;
        }
        const propKey = node.key;
        const name = (() => {
          switch (propKey.type) {
            case "Identifier": {
              return propKey.name;
            }
            case "Literal": {
              return propKey.value;
            }
            default: {
              return undefined; // computed props
            }
          }
        })();
        if (typeof name !== "string" && typeof name !== "number") {
          return; // should not be linted because cannot be mangled
        }
        if (!name.toString().startsWith("_")) {
          report({
            node,
            messageId: "enforceUnderscorePrefixOnPrivateField",
            data: {
              fieldName: name,
            },
          });
        }
      },
      TSParameterProperty(node): void {
        if (node.accessibility !== "private") {
          return;
        }
        if (node.parameter.type !== "Identifier") {
          return;
        }

        if (!node.parameter.name.startsWith("_")) {
          report({
            node,
            messageId: "enforceUnderscorePrefixOnPrivateField",
            data: {
              fieldName: node.parameter.name,
            },
          });
        }
      },
    };
  },
};
