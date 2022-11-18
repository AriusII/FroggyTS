import { ApplyOptions } from '@sapphire/decorators';
import { Command, RegisterBehavior } from '@sapphire/framework';
@ApplyOptions<Command.Options>({
	description: `[ADMIN / OWNER] Permet d'installer les informations du bot, pour le serveur: ${process.env.SERVER_NAME}.`,
})
export class UserCommand extends Command {
    // constructor with preconditions
    public constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            preconditions: ['OwnerOnly']
        });
    }
    // Register slash and context menu command
    public override registerApplicationCommands(registry: Command.Registry) {
        // Register slash command
        registry.registerChatInputCommand({
            name: this.name,
            description: this.description,
        }, {
            behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
        });
    }
    // slash command
    public async chatInputRun(interaction: Command.ChatInputInteraction) {
        await interaction.reply('Installations en cours...');
        //... do stuff
        await interaction.editReply('Installations terminées.');
    }
}