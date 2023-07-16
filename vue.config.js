const { defineConfig } = require("@vue/cli-service");
const {
  meta: { title = "Portfolio" },
} = require("./src/assets/data.json");

module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      // entry for the page
      entry: "src/main.ts",
      title,
    },
  },
});
