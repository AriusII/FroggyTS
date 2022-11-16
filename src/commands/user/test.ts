import { ApplyOptions } from '@sapphire/decorators';
import { Command, RegisterBehavior } from '@sapphire/framework';
import { ColorResolvable, MessageEmbed } from 'discord.js';


import { cmdIsActive, cmdGetName } from '../../others/utils/checks_functions';
@ApplyOptions<Command.Options>({
	description: `[TEST]`,
})
export class UserCommand extends Command {
    // constructor with preconditions
    public constructor(context: Command.Context) {
        super(context, {
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
        const embed_color: ColorResolvable = process.env.EMBED_COLOR?.toString() as ColorResolvable;
        const embed = new MessageEmbed()
            .setColor(embed_color)
            .setTimestamp()

        if (!await cmdIsActive(9)) {
            embed.setTitle(`Commande désactivée`)
                .setDescription(`❌ La commande "${cmdGetName(9)}" est désactivée pour le moment.`)
            return await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        embed.setTitle(`Test`)
            .setDescription(`Test`)
        return await interaction.reply({ embeds: [embed] });
    }
}