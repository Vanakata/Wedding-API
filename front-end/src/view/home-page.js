import React from 'react';
import { UserConsumer } from '../components/User-Context/User-Context';
import Fade from 'react-reveal/Fade'


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