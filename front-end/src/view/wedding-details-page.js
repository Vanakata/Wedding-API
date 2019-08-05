import React, { Component, Fragment } from 'react';
import WeddingService from '../components/services/wedding-service';
import { UserConsumer } from '../components/User-Context';
import UploadImage from '../components/upload-data/upload-data-filepond';


class WeddingDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            wedding: {},
            
        }
    }
    static service = new WeddingService();

    
    render() {
        const { wedding } = this.state;
        // const{username} = this.props;

        if (wedding === undefined) {
            return (
                <div>
                    <h2>Wedding does not exist</h2>
                </div>
            )
        }
        return (
            <Fragment>
                <UploadImage/>
                <div>
                    <h1>{wedding.username}`s wedding</h1>
                    <h5>Date of wedding: {wedding.weddingDate}</h5>
                    <h5>Happy groom: {wedding.groom}</h5>
                    <h5>Adorable bride: {wedding.bride}</h5>
                </div>
                <div>
                    <h5>Pictures:</h5>
                </div>
            </Fragment>
        )
    }
    async componentDidMount() {

        try {
            const weddingId = this.props.match.params.id;
            const weddings = await WeddingDetails.service.getAllWeddings();
            const wedding = weddings.find(wedding => wedding._id === weddingId)

            this.setState({ wedding })
        } catch (error) {
            alert(error.toString());

        }
    }
}
const WeddingDetailsWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({ username }) => (
                    <WeddingDetails {...props} username={username} />
                )
            }
        </UserConsumer>
    )
}
export default WeddingDetailsWithContext;