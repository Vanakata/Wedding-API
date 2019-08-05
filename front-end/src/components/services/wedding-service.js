import { get, post, remove } from '../../data/crud';

class WeddingService {
    constructor() {

        this.baseUrl = 'http://localhost:5000/weddings';
        this.allWeddingsUrl = `${this.baseUrl}/all`;
        this.editWeddingUrl = `${this.baseUrl}/edit`;
        this.deleteWeddingUrl = `${this.baseUrl}/delete`
    }
    edit(id, credentials) {
        return post(`${this.editWeddingUrl}${id}`, credentials);
    }
    delete(id, credentials) {
        return remove(`${this.deleteWeddingUrl}${id}`, credentials);
    }
    getAllWeddings() {
        return get(this.allWeddingsUrl);
    }
}
export default WeddingService;