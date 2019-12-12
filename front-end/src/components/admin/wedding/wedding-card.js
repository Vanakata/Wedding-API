import React, { Component } from 'react';
import { UserConsumer } from '../../user-context/User-Context';
import { Link } from 'react-router-dom';

class WeddingCard extends Component {

    render() {

        const { wedding } = this.props;
        if (wedding.roles[0] === 'admin') {

            return null;
        } else {

            return (
                <div className="wedding">
                    <Link to={`/admin/all/${wedding._id}`}>
                        <h5>
                            {wedding.username}
                        </h5>
                    </Link>
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