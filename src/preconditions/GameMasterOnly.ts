import { AllFlowsPrecondition } from '@sapphire/framework';
import type { CommandInteraction, ContextMenuInteraction, Message } from 'discord.js';
import { isGm } from '../others/utils/functions';

export class UserPrecondition extends AllFlowsPrecondition {
	public override chatInputRun(interaction: CommandInteraction) {
		const userId = parseInt(interaction.user.id);
        return this.doGMCheck(userId);
	}

	public override contextMenuRun(interaction: ContextMenuInteraction) {
		const userId = parseInt(interaction.user.id);
        return this.doGMCheck(userId);
	}

	public override messageRun(message: Message) {
        const userId = parseInt(message.author.id);
		return this.doGMCheck(userId);
	}

	private async doGMCheck(userId: number) {
        return await isGm(userId) ? this.ok() : this.error({ message: `This command can only be used by the Game Master.` });
	}
}

declare module '@sapphire/framework' {
	interface Preconditions {
		GameMasterOnly: never;
	}
}
