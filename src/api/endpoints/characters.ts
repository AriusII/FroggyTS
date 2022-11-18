import { fetchClient } from "../fetchClient";

export async function API_getAllCharactersByDiscordId(id: number) {
    const response: any = await fetchClient.get(`api/v1/characters/discord/${id}`);
    return response.json();
}

export async function API_getCharacterByGuid(guid: number) {
    const response: any = await fetchClient.get(`api/v1/characters/${guid}`);
    return response.json();
}

export async function API_getCharactersByAccountId(accountId: number) {
    const response: any = await fetchClient.get(`api/v1/characters/account/${accountId}`);
    return response.json();
}