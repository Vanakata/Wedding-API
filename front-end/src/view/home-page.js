import React from 'react';
import { UserConsumer } from '../components/User-Context';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade'
//import AvailableWeddingCards from '../components/home/available-wedding-cards';

const HomePage = ({ username, isLoggedIn, isAdmin }) => {
    return (
        <main>
            <div className="welcome-container">
                {
                    isLoggedIn
                        ?
                        <div>

                            <Fade top cascade>
                                <div>
                                    <p>Welcome back, {username}!</p>
                                </div>
                            </Fade>


                        </div>
                        :
                        null
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