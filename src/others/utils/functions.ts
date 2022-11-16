import * as API_account from '../api/endpoints/account';
//import * as API_characters from '../api/endpoints/characters';
//import * as API_tickets from '../api/endpoints/tickets';
import Canvas, { GlobalFonts, Image } from '@napi-rs/canvas';
import type { Guild, GuildMember } from 'discord.js';
import { buffer } from 'stream/consumers';

export async function isGm(accountId: number) {
    const response = await API_account.API_getAccountAccessById(accountId);
    if (response === null || response === undefined) {
        return false;
    } else {
        return response
    }
}

export async function isLogin(discordId: number) {
    const response = await API_account.API_getAccountVerifiedByDiscordId(discordId);
    if (response === null || response === undefined) {
        return false;
    } else {
        return response;
    }
}

export async function convertSecondsToTime(second: number) {
    const seconds = Math.floor(second % 60);
    const minutes = Math.floor(second / 60 % 60);
    const hours = Math.floor(second / 3600 % 24);
    const days = Math.floor(second / 86400);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

export async function convertMoney(money: number) {
    const gold = Math.floor(money / 10000);
    const silver = Math.floor((money - gold * 10000) / 100);
    const copper = Math.floor(money - gold * 10000 - silver * 100);

    return `${gold}g ${silver}s ${copper}c`;
}

export async function getClassByGender(genderId: number, classId: number) {
    switch (genderId) {
        case 0:
            switch (classId) {
                case 1:
                    return 'Guerrier'
                case 2:
                    return 'Paladin'
                case 3:
                    return 'Chasseur'
                case 4:
                    return 'Voleur'
                case 5:
                    return 'Prêtre'
                case 6:
                    return 'Chevalier de la mort'
                case 7:
                    return 'Chaman'
                case 8:
                    return 'Mage'
                case 9:
                    return 'Démoniste'
                case 11:
                    return 'Druide'
                default:
                    return 'Inconnu'
            }
        case 1:
            switch (classId) {
                case 1:
                    return 'Guerrière'
                case 2:
                    return 'Paladin'
                case 3:
                    return 'Chasseuse'
                case 4:
                    return 'Voleuse'
                case 5:
                    return 'Prêtresse'
                case 6:
                    return 'Chevalière de la mort'
                case 7:
                    return 'Chaman'
                case 8:
                    return 'Mage'
                case 9:
                    return 'Démoniste'
                case 11:
                    return 'Druidesse'
                default:
                    return 'Inconnue'
            }
        default:
            return 'Unknown';
    }
}

export async function getRaceByGender(genderId: number, raceId: number) {
    switch (genderId) {
        case 0:
            switch (raceId) {
                case 1:
                    return 'Humain'
                case 2:
                    return 'Orc'
                case 3:
                    return 'Nain'
                case 4:
                    return 'Elfe de la nuit'
                case 5:
                    return 'Mort-vivant'
                case 6:
                    return 'Tauren'
                case 7:
                    return 'Gnome'
                case 8:
                    return 'Troll'
                case 10:
                    return 'Elfe de sang'
                case 11:
                    return 'Draeneï'
                default:
                    return 'Inconnu'
            }
        case 1:
            switch (raceId) {
                case 1:
                    return 'Humaine'
                case 2:
                    return 'Orc'
                case 3:
                    return 'Naine'
                case 4:
                    return 'Elfe de la nuit'
                case 5:
                    return 'Morte-vivante'
                case 6:
                    return 'Tauren'
                case 7:
                    return 'Gnome'
                case 8:
                    return 'Troll'
                case 10:
                    return 'Elfe de sang'
                case 11:
                    return 'Draeneï'
                default:
                    return 'Inconnue'
            }
        default:
            return 'Unknown';
    }
}

export async function createCanvas(member: GuildMember, client: Guild) {
    const font = '../assets/font/Metamorphous-Regular.otf';
    GlobalFonts.registerFromPath(font, 'Metamorphous');
    
    const canvas = Canvas.createCanvas(400, 200);
    const ctx = canvas.getContext('2d');

    const x = canvas.width / 2
    const y = canvas.height / 2

    const min = 1
    const max = 10

    const randomNumber = Math.floor(Math.random() * (max - min)) + min
    const background = await Canvas.loadImage(`../assets/img/${randomNumber}.jpg`)
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 5;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';

    ctx.font = '50px Metamorphous';
    ctx.fillText(member.user.tag, x, y * 1.4);

    ctx.font = '25px Metamorphous';
    ctx.fillText(member.user.tag, x, y * 1.4);
    const allUsers: any = client.client.users.cache.filter(user => !user.bot).size;
    ctx.fillText(`Nous sommes plus que ${JSON.stringify(JSON.parse(allUsers) - 1)} joueurs !`, x, y * 1.7);

    const radius = 75;
    ctx.beginPath();
    ctx.arc(x, y - 70, radius, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));

    // We want to convert avatar as Buffer
    const avatarBuffer = await <Buffer><unknown>avatar

    const newAvatarImg = new Image();
    newAvatarImg.src = Buffer.from(avatarBuffer);

    ctx.drawImage(avatar, x - radius, y - radius - 70, radius * 2, radius * 2);

    return canvas.encode('png');
}