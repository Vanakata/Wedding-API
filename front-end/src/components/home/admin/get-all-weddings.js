import React, { Component, Fragment } from 'react';


class AllWeddings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            weddings:[],
        }
    }

    static service = new WeddingService();
}
