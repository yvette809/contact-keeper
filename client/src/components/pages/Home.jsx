import React from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../ContactFilter';

 const Home = () => {
    return (
        <div className= "grid-2">
            <div>
                <ContactForm/>
            </div>
            <div>
                <Contacts/>
                <ContactFilter/>
            </div>
            
        </div>
    )
}


export default Home