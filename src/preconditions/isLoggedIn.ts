import { AllFlowsPrecondition } from '@sapphire/framework';
import type { CommandInteraction, ContextMenuInteraction, Message } from 'discord.js';
import { isLogin } from '../lib/functions';

export class UserPrecondition extends AllFlowsPrecondition {
	public override chatInputRun(interaction: CommandInteraction) {
		const userId = parseInt(interaction.user.id);
        return this.doLoginCheck(userId);
	}

	public override contextMenuRun(interaction: ContextMenuInteraction) {
		const userId = parseInt(interaction.user.id);
        return this.doLoginCheck(userId);
	}

	public override messageRun(message: Message) {
        const userId = parseInt(message.author.id);
		return this.doLoginCheck(userId);
	}

	private async doLoginCheck(userId: number) {
        return await isLogin(userId) ? this.ok() : this.error({ message: `You must be logged in to use this command.` });
	}
}

declare module '@sapphire/framework' {
	interface Preconditions {
		isLoggedIn: never;
	}
}
