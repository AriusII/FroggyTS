import * as API_account from '../api/endpoints/account';
import * as API_characters from '../api/endpoints/characters';
import * as API_tickets from '../api/endpoints/tickets';

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
                    return 'Warrior';
                case 2:
                    return 'Paladin';
                case 3:
                    return 'Hunter';
                case 4:
                    return 'Rogue';
                case 5:
                    return 'Priest';
                case 6:
                    return 'Death Knight';
                case 7:
                    return 'Shaman';
                case 8:
                    return 'Mage';
                case 9:
                    return 'Warlock';
                case 11:
                    return 'Druid';
                default:
                    return 'Inconnu';
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
                    return 'Human';
                case 2:
                    return 'Orc';
                case 3:
                    return 'Dwarf';
                case 4:
                    return 'Night Elf';
                case 5:
                    return 'Undead';
                case 6:
                    return 'Tauren';
                case 7:
                    return 'Gnome';
                case 8:
                    return 'Troll';
                case 10:
                    return 'Blood Elf';
                case 11:
                    return 'Draenei';
                default:
                    return 'Inconnu';
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