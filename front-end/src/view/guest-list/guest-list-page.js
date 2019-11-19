import React, { Component, Fragment } from 'react';
import GuestListService from '../../components/services/guest-list-service';
import GuestCard from '../../components/home/user/guest-card';


class GuestList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            guests: []
        }

    }
    static service = new GuestListService();

    render() {
        const { guests } = this.state;
        if (!guests.length) {
            return (
                <div>
                    <br />
                    <h2>Guest list is empty</h2>
                </div>
            )
        }
        return (
            <Fragment>
                <div>
                    {
                        guests.map(guest => (

                            <GuestCard key={guest._id} guest={guest} />
                        ))
                    }
                </div>
            </Fragment>
        )


    }
    async componentDidMount() {
        try {
            const guests = await GuestList.service.getAllGuests();
            this.setState({ guests });
        } catch (error) {
            alert(error)
        }
    }
}
export default GuestList;