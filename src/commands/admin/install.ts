import { ApplyOptions } from '@sapphire/decorators';
import { Command, RegisterBehavior } from '@sapphire/framework';
import { container } from '@sapphire/pieces';
@ApplyOptions<Command.Options>({
	description: `[ADMIN / OWNER] Permet d'installer les informations du bot, pour le serveur: ${process.env.SERVER_NAME}.`,
})
export class UserCommand extends Command {
    // constructor with preconditions
    public constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            preconditions: [
                'OwnerOnly',
                
            ]
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
        //
        
        const sql = `CREATE TABLE ${process.env.DB_AUTH}.discord_account (
            account_id int NOT NULL,
            discord_id bigint NULL DEFAULT NULL,
            verified binary(1) NULL DEFAULT NULL,
            PRIMARY KEY (account_id) USING BTREE
        )
        ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;`;

        await container.database.query(sql);

        //
        await interaction.editReply('Installations terminées.');
    }
}