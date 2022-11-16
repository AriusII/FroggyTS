import { fetchClient } from "../fetchClient";

export async function API_getTicketById(id: number) {
    const response: any = await fetchClient.get(`/api/v1/tickets/${id}`);
    return response
}

export async function API_getAllTickets() {
    const response: any = await fetchClient.get(`/api/v1/tickets/all`);
    return response.json();
}