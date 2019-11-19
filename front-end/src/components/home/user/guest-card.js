import React, { Component } from 'react';
import { UserConsumer } from '../../User-Context';
import GuestListService from '../../services/guest-list-service';

class GuestCard extends Component {

    static service = new GuestListService();

    render() {
        const { guest } = this.props;
        let status = guest.isComing;
        if (!guest.length) {
            return null;
        } else {

            if (!status) {
                status = "No"
            } else {
                status = "Yes"
            }
        }

        return (
            <div>
                <div>
                    <label>First name:</label>
                    <h5>{guest.firstName} {guest.lastName}</h5>
                    <h5><label>Presence:</label>{status}</h5>

                </div>
            </div>
        )
    }

}
const GuestCardWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({ isLoggedIn }) => (
                    <GuestCard {...props} isLoggedIn={isLoggedIn} />
                )
            }
        </UserConsumer>
    )
}
export default GuestCardWithContext;