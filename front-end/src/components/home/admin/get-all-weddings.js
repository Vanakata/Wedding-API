import React, { Component, Fragment } from 'react';
import WeddingService from '../../services/wedding-service';
import WeddingCard from '../admin/wedding-card';

class AllWeddings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            weddings: [],
        }
    }

    static service = new WeddingService();
    render() {
        const { weddings } = this.state;

        if (!weddings.length) {
            return (
                <div>
                    <br />
                    <h2 className="white">No weddings at the moment</h2>
                </div>
            )
        }
        return (
            <Fragment>
                <div>
                    <h2>Weddings List:</h2>
                    {
                        weddings.map(wedding => (
                            <WeddingCard key={wedding._id} wedding={wedding} />
                        ))
                    }
                </div>
            </Fragment>
        )
    }
    async componentDidMount() {
        try {
            const weddings = await AllWeddings.service.getAllWeddings();
            this.setState({weddings})
        } catch(error){
            console.log(error);

        }
    }
}

export default AllWeddings;
