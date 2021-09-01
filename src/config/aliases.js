const aliases = (prefix = `src`) => ({
	'@components': `${prefix}/components`,
	'@config': `${prefix}/config`,
	'@icons': `${prefix}/icons`,
	'@services': `${prefix}/services`,
	'@styles': `${prefix}/styles`,
	'@views': `${prefix}/views`,
});

module.exports = aliases;
