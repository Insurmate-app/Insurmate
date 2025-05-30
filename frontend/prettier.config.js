export default {
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  importOrder: [
    "^react",
    "<THIRD_PARTY_MODULES>",
    "^@/components/(.*)$",
    "^@/utils/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
