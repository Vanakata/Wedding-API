import React, { Component } from 'react';
import WeddingService from '../../services/wedding-service';
import { UserConsumer } from '../../User-Context';
import { Link } from 'react-router-dom'

class WeddingCard extends Component {
    static service = new WeddingService();
    render() {

        const { wedding } = this.props;
        if (wedding.roles[0] === 'admin') {

            return null;
        } else {

            return (
                <div className="wedding">
                    <ul>
                        <li>
                            <Link to={`/admin/all/${wedding._id}`}>
                                <h5>
                                    {wedding.username}
                                </h5>
                            </Link>
                        </li>
                    </ul>

                </div>
            )
        }
    }
}

const WeddingCardWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({ isLoggedIn, isAdmin }) => (
                    <WeddingCard {...props} isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
                )
            }
        </UserConsumer>
    )
}
export default WeddingCardWithContext;