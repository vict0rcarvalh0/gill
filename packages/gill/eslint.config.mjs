import config from "@gillsdk/config-eslint/base";

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@solana/kit"],
              message: "Import from specific @solana/* packages instead of @solana/kit for better tree-shaking. Use @solana/rpc, @solana/transactions, @solana/signers, etc.",
            },
          ],
        },
      ],
    },
  },
];
