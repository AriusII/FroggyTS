import jsonCmds from './active.json';

export async function cmdIsActive(cmdId: number) {
    return jsonCmds.commands[cmdId].active;
}

export async function cmdGetName(cmdId: number) {
    return jsonCmds.commands[cmdId].name;
}