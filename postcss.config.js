module.exports = {
	parser: "sugarss",
	plugins: [
		// Keep this plugin above the others
		require("postcss-mixins")({ mixinsDir: "./css/mixins" }),
		require("postcss-simple-vars"),
		require("autoprefixer"),
		require("postcss-nested"),
		require("postcss-easy-import", {
			extensions: [".sss"],
		}),
		require("cssnano")({
			preset: "default",
		}),
	],
};
