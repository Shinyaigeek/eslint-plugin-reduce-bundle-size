import { ObjectExpression } from "@typescript-eslint/types/dist/ast-spec";
import { TSESLint } from "@typescript-eslint/utils";

function getAllPropertyKey(obj: ObjectExpression): string[] {
  return obj.properties
    .map((prop) => {
      const descendantsProperties =
        prop.type === "Property" && prop.value.type === "ObjectExpression"
          ? getAllPropertyKey(prop.value)
          : [];
      if (prop.type !== "Property") {
        return descendantsProperties;
      }

      if (prop.key.type === "Identifier") {
        descendantsProperties.push(prop.key.name);
        return descendantsProperties;
      }
    })
    .flat()
    .filter((name) => typeof name !== "undefined")
    .map((p) => p as string);
}

function IS_UPPER_CAMEL_CASE(str: string): boolean {
  return str.toUpperCase() === str;
}

export const banConstantObject: TSESLint.RuleModule<"banConstantObject", []> = {
  meta: {
    docs: {
      description:
        "ban constant object because constant object causes bundle-size issue due to tree-shake and minify. you can use const OBJECT$PROPERTY const variable name.",
      recommended: "warn",
      requiresTypeChecking: true,
    },
    fixable: "code",
    messages: {
      banConstantObject:
        "ban constant object because constant object causes bundle-size issue due to tree-shake and minify. you can use const OBJECT$PROPERTY const variable name.",
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
      VariableDeclaration(node): void {
        if (node.kind !== "const") {
          return; // const 宣言以外は除外
        }

        if (node.declarations.length > 1) {
          return; // 二つ以上同時に宣言するのは除外
        }

        const declaration = node.declarations[0];
        if (!declaration.init) {
          return; // 初期化子がないのは除外
        }

        if (declaration.init.type !== "ObjectExpression") {
          return; // ObjectExpression以外は除外
        }

        const properties = getAllPropertyKey(declaration.init);
        // prop の key が全てUPPER_CAMEL_CASEであるか, object の identifier がUPPER_CAMEL_CASEの時に警告
        if (
          (declaration.id.type === "Identifier" &&
            IS_UPPER_CAMEL_CASE(declaration.id.name)) ||
          (properties.length > 0 && properties.every(IS_UPPER_CAMEL_CASE))
        ) {
          report({
            node,
            messageId: "banConstantObject",
          });
        }
      },
    };
  },
};
