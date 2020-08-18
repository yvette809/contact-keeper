import React , {useContext, useEffect}from 'react'
//import {CSSTransiton, TransitionGroup} from 'react-transition-group'
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItems'
import Spinner from '../layout/Spinner'

function Contacts() {
    const contactContext = useContext(ContactContext);
    const{contacts, filtered, getContacts,loading} = contactContext;

    useEffect(()=>{
        getContacts();
    },[]);
    //eslint-disable-next-line

    if(contacts !== null && contacts.length === 0 && !loading){
        return<h4>Please add a contact</h4>
    }
    return (
        <>
        {contacts !== null && !loading? 
        ( 
            {filtered !== null 
        ? filtered.map(contact => (<ContactItem key = {contact._id} contact={contact}/> ))
        : contacts.map(contact=>(
            <ContactItem key = {contact._id} contact = {contact}/>
        ))}

         ) : <Spinner/>}

        </>
        )
    
        }
    
    
    

export default Contacts
