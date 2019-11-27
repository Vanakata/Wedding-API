import React, { Component } from 'react';
import GuestService from '../../services/guest-list-service';

class GuestCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            error: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
    }

    static service = new GuestService();

    handleSubmit = (event) => {
        event.preventDefault();


        let credentials = this.state.value;
        const id = this.props.guest._id;
        
        this.setState({ error: '' }, async () => {
            try {
                debugger;
                const result = await GuestCard.service.statusChange(id, {isComing:credentials});
                if (!result.success) {
                    const errors = Object.values(result.errors).join(" ");
                    throw new Error(errors)
                } else {
                    console.log("Status updated sucessffuly");
                }
            } catch (error) {
                console.log(error);
            }
        })
    }

    handleOptionChange = (event) => {
        this.setState({ value: event.target.value });
    }
    render() {

        const { guest } = this.props;
   
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <h5>{guest.firstName} {guest.lastName} {guest.isComing}</h5>
                    <select onChange={this.handleOptionChange}>
                        <option value="None">--</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>

                    <input type="submit" className="button" />
                </div>
            </form>
        )
    }
}
export default GuestCard;