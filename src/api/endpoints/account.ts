import { fetchClient } from "../fetchClient";

export async function API_createAccount(data: JSON) {
    const response: any = await fetchClient.post('api/v1/account/add', data);
    return response.json();
}

export async function API_loginAccount(data: JSON) {
    const response: any = await fetchClient.post(`api/v1/account/discord/login`, data);
    return response.json();
}

export async function API_getAccountVerifiedByDiscordId(id: number) {
    const response: any = await fetchClient.get(`api/v1/account/discord/${id}`);
    return response.json();
}

export async function API_getAccountAccessById(id: number) {
    const response: any = await fetchClient.get(`api/v1/account/access/${id}`);
    return response.json();
}

export async function API_getAccountByCharacterGuid(guid: number) {
    const response: any = await fetchClient.get(`api/v1/account/character/${guid}`);
    return response.json();
}