import { TSESLint } from "@typescript-eslint/utils";

export const banComputedPropertyAccess: TSESLint.RuleModule<
  "banComputedPropertyAccess",
  []
> = {
  meta: {
    docs: {
      description:
        "ban computed property access because this will break mangled property. if you want to do this, you should write a custom comment or a valid mangling rule expressly",
      recommended: "error",
      requiresTypeChecking: true,
    },
    fixable: "code",
    messages: {
      banComputedPropertyAccess:
        "if you want to do this, you should write a custom comment or a valid mangling rule expressly",
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
      MemberExpression(node): void {
        if (node.computed) {
          report({
            node,
            messageId: "banComputedPropertyAccess",
          });
        }
      },
    };
  },
};
