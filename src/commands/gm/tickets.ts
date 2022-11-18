import { ApplyOptions } from '@sapphire/decorators';
import { Command, RegisterBehavior } from '@sapphire/framework';
import { ColorResolvable, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } from 'discord.js';
import * as API_Ticket from '../../others/api/endpoints/tickets';
import { cmdIsActive, cmdGetName } from '../../lib/checks_functions';
import * as fxs from '../../others/utils/functions';
@ApplyOptions<Command.Options>({
	description: `[GM] Ensemble de commandes pour les tickets ${process.env.SERVER_NAME}`,
})
export class UserCommand extends Command {
    // constructor with preconditions
    public constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            preconditions: ['GameMasterOnly']
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
        const discord_id = parseInt(interaction.user.id);
        const embed_color: ColorResolvable = process.env.EMBED_COLOR?.toString() as ColorResolvable;
        const embed = new MessageEmbed()
            .setColor(embed_color)
            .setTimestamp()

        if (!await cmdIsActive(7)) {
            embed.setTitle(`Commande désactivée`)
                .setDescription(`❌ La commande "${cmdGetName(7)}" est désactivée pour le moment.`)
            return await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (!await fxs.isLogin(discord_id)) {
            embed.setTitle(`Erreur`)
                .setDescription(`❌ Vous n'êtes pas connecté à votre compte ${process.env.SERVER_NAME}.`)
            return await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (!await fxs.isGm(discord_id)) {
            embed.setTitle(`Erreur`)
                .setDescription(`❌ Vous n'avez pas les droits pour utiliser cette commande.`)
            return await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        const api_data: any = await API_Ticket.API_getAllTickets();
        console.log(api_data);
        if (api_data === null || api_data === undefined) {
            embed.setTitle(`Erreur`)
                .setDescription(`❌ Une erreur est survenue lors de la récupération des tickets.`)
            return await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (api_data.length === 0) {
            embed.setTitle(`Aucun ticket`)
                .setDescription(`**❌ Aucun ticket disponible pour le moment, réessayer dans quelques instants !**`)
            return await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        embed.setTitle(`Tickets`)
            .setDescription(`Voici la liste des tickets:`)
        for (let i = 0; i < api_data.length; i++) {
            const ticket = api_data[i];
            embed.addFields(
                { name: `Ticket`, value: `REF#${ticket.id}`, inline: true },
                { name: `Auteur`, value: `<@${ticket.discord_id}>`, inline: true },
                { name: `Date`, value: `${ticket.date}`, inline: true },
                { name: `Message`, value: `${ticket.message}` },
            )
        }

        // previous button
        const previous_button = new MessageButton()
            .setCustomId('previous')
            .setLabel('Précédent')
            .setStyle('PRIMARY')

        // Select Menu Reply
        const select_menu_reply = new MessageSelectMenu()
            .setCustomId('reply')
            .setPlaceholder('Répondre')
            .addOptions([
                api_data.map((ticket: any) => {
                    return {
                        label: `REF#${ticket.id}`,
                        value: `T${ticket.id}`,
                        description: `Répondre au ticket REF#${ticket.id}`,
                    }
                })
            ])

        // next button
        const next_button = new MessageButton()
            .setCustomId('next')
            .setLabel('Suivant')
            .setStyle('PRIMARY')

        // close button
        const close_button = new MessageButton()
            .setCustomId('close')
            .setLabel('Fermer')
            .setStyle('DANGER')

        const row = new MessageActionRow()
            .addComponents(
                previous_button,
                select_menu_reply,
                next_button,
                close_button,
            )

        return await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
	}
}
