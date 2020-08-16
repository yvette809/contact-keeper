import React , {useContext}from 'react'
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItems'

function Contacts() {
    const ContactContext = useContext(ContactContext);
    return (
        <>
        {Contacts.map((contact)=>(
            <ContactItem key = {contact.id} contact = {contact}/>
        ))}
            
        </>
    )
}

export default Contacts
