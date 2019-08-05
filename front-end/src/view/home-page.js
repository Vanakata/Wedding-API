import React from 'react';
import { UserConsumer } from '../components/User-Context';
import { Link } from 'react-router-dom';
//import AvailableWeddingCards from '../components/home/available-wedding-cards';

const HomePage = ({ username, isLoggedIn,  isAdmin }) => {
    return (
        <main>
            <div>
                {
                    isLoggedIn
                        ?
                        <div>
                            <div>
                                <p>Welcome back,{username}</p>
                            </div>
                        </div>
                        :
                        <ul>
                            <h2>Welcome to our wedding world! These are our wedding invitations </h2>
                        </ul>
                }
                {/* <AvailableWeddingCards/> */}
            </div>
        </main>
    )
}
const HomePageWithCotext = (props) => {
    return (
        <UserConsumer>
            {
                ({ username, isLoggedIn, isAdmin }) => (
                    <HomePage {...props} username={username} isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
                )
            }
        </UserConsumer>
    )
}
export default HomePageWithCotext;