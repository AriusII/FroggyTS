import { Listener } from '@sapphire/framework';
import { createCanvas } from '../others/utils/functions';
import { GuildMember, MessageAttachment, MessageEmbed } from 'discord.js';
import { cmdIsActive, cmdGetName } from '../others/utils/checks_functions';
import type { Events } from '@sapphire/framework';

export class UserEvent extends Listener<typeof Events.GuildMemberRemove> {
    public async run(member: GuildMember) {

        if(!cmdIsActive(3)) {
            return member.send(`The command ${cmdGetName(3)} is not active.`);
        }

        const img = await createCanvas(member, member.guild);
        const attachment = new MessageAttachment(img, 'UserRemove.png');

        const removeMemberEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription(`**🔴 ${member.user.tag}`);
        
        return await member.send({ embeds: [removeMemberEmbed], files: [attachment] });
    }
}