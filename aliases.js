const aliases = (prefix = `src`) => ({
	'@components': `${prefix}/components`,
	'@config': `${prefix}/config`,
	'@icons': `${prefix}/icons`,
	'@services': `${prefix}/services`,
	'@store': `${prefix}/store`,
	'@styles': `${prefix}/styles`,
	'@views': `${prefix}/views`,
});

module.exports = aliases;
