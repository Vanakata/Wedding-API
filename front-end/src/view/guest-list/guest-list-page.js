import React, { Component, Fragment } from 'react';
import GuestCard from '../../components/home/user/guest-card'
import GuestService from '../../components/services/guest-list-service'

class GuestList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            guests: [],
        }
    }

    static service = new GuestService();
    render() {
        const { guests } = this.state;

        if (!guests.length || guests === "Guest list is empty") {
            return <h1>No guests</h1>
        }


        return (
            <Fragment>
                <div className="guest-container">
                    <h3>Guests:</h3>
                    {
                        guests.map(guest => (
                            < GuestCard key={guest._id} guest={guest} />

                        ))
                    }
                    < p > Total guests:{guests.length}</p>
                </div>
            </Fragment >
        )
    }
    async componentDidMount() {

        try {

            const guests = await GuestList.service.getAllGuests();
            this.setState({ guests })

        } catch (error) {
            console.log(error)
        }
    }
}


export default GuestList;