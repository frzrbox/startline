import { Document, NunjucksPlugin, StaticFile, Url } from "@amagaki/amagaki";

module.exports = function (pod) {
	pod.configure({
		meta: {
			name: "Startline",
		},
		localization: {
			defaultLocale: "en",
			locales: ["en", "fr", "it", "ja"],
		},
		staticRoutes: [
			{
				path: "/static/",
				staticDir: "/dist/",
			},
			{
				path: "/static/img/",
				staticDir: "assets/img/",
			},
		],
	});

	const nunjucksPlugin = pod.plugins.get("NunjucksPlugin") as NunjucksPlugin;

	type Urlable = StaticFile | Document | string;

	nunjucksPlugin.addFilter("url", function (object: Urlable) {
		if (object instanceof StaticFile) {
			return `${Url.relative(object.url.path, this.ctx.doc)}?fingerprint=${
				object.fingerprint
			}`;
		} else if (object instanceof Document) {
			return `${Url.relative(object.url.path, this.ctx.doc)}`;
		}
		return `${Url.relative(object, this.ctx.doc)}`;
	});

	nunjucksPlugin.addFilter("log", function (value: any) {
		console.log("log", value);
	});
};
