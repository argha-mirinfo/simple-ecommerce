import axios from "axios";

interface APIRequestConfig {
    params?: Record<string, any>;
    URL?: string
}


export class APIRequestService {

    private baseURL: string;

    constructor() {
        this.baseURL = process.env.NEXT_PUBLIC_BASE_URL_DEVELOPMENT || ""
    }

    async GET(config : APIRequestConfig) {
        return await axios.get(
            `${this.baseURL}${config.URL}`,
            {
                params: config.params,
            }
        )
    }
}