import React, { Component } from 'react';
import { get, post, remove } from '../data/crud';

class WeddingService {
    constructor() {

        this.baseUrl = 'http://localhost:5000/weddings';
        this.allWeddingsUrl = `${this.baseUrl}/all`;
        this.createWeddingUrl = `${this.baseUrl}/create`;
        this.editWeddingUrl = `${this.baseUrl}/edit`;
        this.deleteWeddingUrl = `${this.baseUrl}/delete`
    }
    getAllWeddings() {
        return get(this.allWeddingsUrl);
    }
    create(credentials){
        return post(this.createWeddingUrl,credentials);
    }
    edit(id,credentials){
        return post(`${this.editWeddingUrl}${id}`,credentials);
    }
    delete(id,credentials){
        return remove(`${this.deleteWeddingUrl}${id}`,credentials);
    }
}
export default WeddingService