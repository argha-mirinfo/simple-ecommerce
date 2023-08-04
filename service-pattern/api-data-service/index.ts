import { APIRequestService } from '../api-request-service';

export class APIDataService {

    GetALLProducts(params: Record<string, any>) {
        return new APIRequestService().GET({
            URL: '/products',
            params
        });
    }

    GetSingleProduct(URL: string) {
        return new APIRequestService().GET({
            URL
        });
    }

    GetALLCategory() {
        return new APIRequestService().GET({
            URL: '/products/categories'
        });
    }

    GetProductByCategory(URL: string, params: Record<string, any>) {
        return new APIRequestService().GET({
            URL,
            params
        });
    }

}
