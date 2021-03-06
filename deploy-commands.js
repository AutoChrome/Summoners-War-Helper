const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');
const fs = require('fs');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
    const command = require('./commands/' + file);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered guild commands.'))
	.catch(console.error);

/*

rest.put(Routes.applicationCommands(clientId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

rest.get(Routes.applicationCommands(clientId, guildId))
    .then(data => {
		console.log(data);
        const promises = [];
		const deleteUrl = `${Routes.applicationCommands(clientId, guildId)}/917925729776324641`;
		promises.push(rest.delete(deleteUrl));
        return Promise.all(promises);
    });

*/