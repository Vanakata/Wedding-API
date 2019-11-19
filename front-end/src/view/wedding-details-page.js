import React, { Component, Fragment } from 'react';
import WeddingService from '../components/services/wedding-service';
import { UserConsumer } from '../components/User-Context';
// import UploadImage from '../components/upload-data/upload-data-filepond';
import axios from 'axios';


class WeddingDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            wedding: {},
            selectedFile: null

        }
    }
    static service = new WeddingService();
    
    onChangeHandler = event => {
        this.setState({
          selectedFile: event.target.files[0],
          loaded: 0,
        })
      }
      onClickHandler = () => {
        
        const data = new FormData()
        data.append('file', this.state.selectedFile)
        axios.post("http://localhost:5000/upload/upload", data)
          .then(res => {
            console.log(res.statusText)
          })
      }

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
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <form method="post" action="#" id="#">
                                <div className="form-group files">
                                    <label>Upload Your File </label>
                                    <input type="file" className="form-control" multiple="" name="file" onChange={this.onChangeHandler} />
                                    <button type="button" className="btn btn-sucess btn-block" onClick={this.onClickHandler}>Upload</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div>
                        <h1>{wedding.username}`s wedding</h1>
                        <h5>Date of wedding: {wedding.weddingDate}</h5>
                        <h5>Happy groom: {wedding.groom}</h5>
                        <h5>Adorable bride: {wedding.bride}</h5>
                    </div>
                    <div>
                        <h5>Pictures:</h5>
                    </div>
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