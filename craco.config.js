const path = require(`path`);
const alias = require(`./aliases`);

const SRC = `./src`;
const aliases = alias(SRC);

const resolvedAliases = Object.fromEntries(
	Object.entries(aliases).map(([key, value]) => [
		key,
		path.resolve(__dirname, value),
	])
);

module.exports = {
	webpack: {
		alias: resolvedAliases,
	},
	// devServer: {
	// host: '192.168.0.10',
	// host: '0.0.0.0',
	// proxy: {
	// 	'/newsApi': {
	// 		target: 'https://newsapi.org/v2',
	// 		secure: false,
	// 	},
	// },
	// headers: {
	// 	'Access-Control-Allow-Origin': 'https://newsapi.org/v2',
	// 	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
	// 	'Access-Control-Allow-Headers':
	// 		'X-Requested-With, content-type, Authorization',
	// },
	// },
};
