import jsonCmds from './active.json';

export async function cmdIsActive(theid: string) {

    const cmd = jsonCmds.commands;
    console.log('cmd');
    console.log(cmd);
    const cmdId: any = cmd[theid];
    console.log('cmdId');
    console.log(cmdId);
    const cmdActive = cmdId[2];
    console.log('cmdAcc');
    console.log(cmdActive);
    return cmdActive;
}

export async function cmdGetName(id: number) {
    const cmd: any = jsonCmds.commands;
    console.log(cmd);
    const cmdId = cmd[id];
    console.log(cmdId);
}