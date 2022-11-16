import { fetch } from "@sapphire/fetch";

/**
 * It's a class that contains two functions, one that makes a GET request, and one that makes a POST request.
 */
export class fetchClient {

    /**
     * It's a function that takes a route as a parameter, and returns a promise that resolves to the JSON
     * response from the server.
     * @param {string} route - string - The route to the API endpoint
     * @returns The response from the server.
     */
    public static async get(route: string) {
        const response: any = await fetch(`http://${process.env.EXPRESS_HOST}:${process.env.EXPRESS_PORT}/${route}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return response.json();
    }

    /**
     * It takes a route and a JSON object, and returns a promise that resolves to the JSON response from
     * the server.
     * @param {string} route - string - The route to the API endpoint
     * @param {JSON} jsonBody - JSON - The JSON body to send to the server
     * @returns The response from the server.
     */
    public static async post(route: string, jsonBody: JSON) {
        const response: any = await fetch(`http://${process.env.EXPRESS_HOST}:${process.env.EXPRESS_PORT}${route}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonBody
        });
        return response.json();
    }
}