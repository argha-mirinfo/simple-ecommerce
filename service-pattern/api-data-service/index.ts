import { APIRequestService } from '../api-request-service';

export class APIDataService {

    GetALLProducts() {
        return new APIRequestService().GET({
            URL: '/products'
        });
    }

    GetALLCategory() {
        return new APIRequestService().GET({
            URL: '/products/categories'
        });
    }

}
