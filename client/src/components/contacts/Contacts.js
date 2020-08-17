import React , {useContext}from 'react'
//import {CSSTransiton, TransitionGroup} from 'react-transition-group'
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItems'

function Contacts() {
    const contactContext = useContext(ContactContext);
    const{contacts, filtered} = contactContext;

    if(contacts.length === 0){
        return<h4>Please add a contact</h4>
    }
    return (
        <>
        {filtered!== null 
        ? filtered.map(contact => (<ContactItem key = {contact.id} contact={contact}/> ))
        : Contacts.map((contact)=>(
            <ContactItem key = {contact.id} contact = {contact}/>
        ))}
        </>

        )
        }
        
            
       
  


export default Contacts
