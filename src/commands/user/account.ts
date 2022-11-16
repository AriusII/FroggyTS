import { ApplyOptions } from '@sapphire/decorators';
import { Command, RegisterBehavior } from '@sapphire/framework';
import { ColorResolvable, MessageEmbed } from 'discord.js';

import * as API_Account from '../../others/api/endpoints/account';
import * as API_Character from '../../others/api/endpoints/characters';
import { getRaceByGender, getClassByGender } from '../../others/utils/functions';
import { cmdIsActive, cmdGetName } from '../../others/utils/checks_functions';
@ApplyOptions<Command.Options>({
	description: `Ensemble de commandes pour les comptes ${process.env.SERVER_NAME} !`,
})
export class UserCommand extends Command {
    // constructor with preconditions
    public constructor(context: Command.Context) {
        super(context, {
        });
    }
	// Register slash and context menu command
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand({
			name: this.name,
			description: this.description,
            options: [
                {
                    name: 'create',
                    description: `Créer un compte ${process.env.SERVER_NAME}, depuis Discord !`,
                    type: 'SUB_COMMAND',
                    options: [
                        {
                            name: 'username',
                            description: 'Votre compte utilisateur sur le serveur',
                            type: 'STRING',
                            required: true,
                        },
                        {
                            name: 'password',
                            description: 'Votre mot de passe sur le serveur',
                            type: 'STRING',
                            required: true,
                        },
                    ],
                },
                {
                    name: 'login',
                    description: `Se connecter à son compte ${process.env.SERVER_NAME} !`,
                    type: 'SUB_COMMAND',
                    options: [
                        {
                            name: 'username',
                            description: 'Votre compte utilisateur sur le serveur',
                            type: 'STRING',
                            required: true,
                        },
                        {
                            name: 'password',
                            description: 'Votre mot de passe sur le serveur',
                            type: 'STRING',
                            required: true,
                        },
                    ],
                },
                {
                    name: 'characters',
                    description: 'Affiche la liste de vos personnages !',
                    type: 'SUB_COMMAND',
                },
            ],
        }, {
           behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
        });
    }

    // slash command
    public async chatInputRun(interaction: Command.ChatInputInteraction) {

        // we create a condition to check which subcommand is used
        switch (interaction.options.getSubcommand()) {
            case 'login':
                return this.login(interaction);
            case 'create':
                return this.create(interaction);
            case 'characters':
                return this.characters(interaction);
            default:
                return;
        }
        
    }

    // subcommand create
    public async create(interaction: Command.ChatInputInteraction) {
        const embed_color: ColorResolvable = process.env.EMBED_COLOR?.toString() as ColorResolvable;
        const embed = new MessageEmbed()
            .setColor(embed_color)
            .setTimestamp()

        if (!await cmdIsActive(6)) {
            embed.setTitle(`Commande désactivée`)
                .setDescription(`❌ La commande "${cmdGetName(6)}" est désactivée pour le moment.`)
            return await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        embed.setTitle(`Création de compte`)
            .setDescription(`Création de compte en cours...`)
            

        return await interaction.reply({ embeds: [embed] });
    }

    // subcommand login
    public async login(interaction: Command.ChatInputInteraction) {
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

    // subcommand characters
    public async characters(interaction: Command.ChatInputInteraction) {
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