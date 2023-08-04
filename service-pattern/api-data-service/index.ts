import { APIRequestService } from '../api-request-service';

export class APIDataService {

    GetALLProducts() {
        return new APIRequestService().GET({
            URL: '/products'
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

}
