import { get, post, remove } from '../../data/crud';

class GuestListService {
    constructor() {
        this.baseUrl = 'http://localhost:5000/guest-list';
        this.allGuestsUrl = `${this.baseUrl}/all`;
        this.createGuestUrl = `${this.baseUrl}/create`;
        this.deleteGuestUrl = `${this.baseUrl}/delete`;
    }
    getAllGuests() {
        return get(this.allGuestsUrl);
    }
    create(credentials) {
        return post(this.createGuestUrl, credentials);
    }
    delete(id, credentials) {
        return remove(`${this.deleteGuestUrl}${id}`, credentials);
    }
}
export default GuestListService;