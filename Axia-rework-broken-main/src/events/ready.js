module.exports = (client, message) => {
	

    console.log('client is ready!');
    const clientStatus = [
		`over 80k Users`,
		`${client.guilds.cache.size} Servers`,
	];

	setInterval(function() {
		const status = clientStatus[Math.floor(Math.random() * clientStatus.length)];
		client.user.setActivity(`${status} | ,help`, { type: 'WATCHING' });
    }, 30000);
}