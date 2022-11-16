import './lib/setup';
import { LogLevel, SapphireClient, container } from '@sapphire/framework';

// Import Prisma as Database ORM
import { PrismaClient } from '@prisma/client';

// Import expressServer as Express API Rest server
import expressServer from './resources/server';
expressServer.listen(process.env.EXPRESS_PORT, () => {
    console.log(`EXPRESS SERVER started on port ${process.env.EXPRESS_PORT}.`);
});


const client = new SapphireClient({
	defaultPrefix: '!',
	regexPrefix: /^(hey +)?bot[,! ]/i,
	caseInsensitiveCommands: true,
	logger: {
		level: LogLevel.Debug
	},
	shards: 'auto',
	intents: [
		'GUILDS',
		'GUILD_MEMBERS',
		'GUILD_BANS',
		'GUILD_EMOJIS_AND_STICKERS',
		'GUILD_VOICE_STATES',
		'GUILD_MESSAGES',
		'GUILD_MESSAGE_REACTIONS',
		'DIRECT_MESSAGES',
		'DIRECT_MESSAGE_REACTIONS'
	],
	partials: ['CHANNEL'],
	loadMessageCommandListeners: true
});

const main = async () => {
	try {
		client.logger.info('Logging in');
		await client.login();
		client.logger.info('logged in');
	} catch (error) {
		client.logger.fatal(error);
		client.destroy();
		process.exit(1);
	}
};

main();

declare module '@sapphire/pieces' {
	interface Container {
		prisma: PrismaClient;
	}
}