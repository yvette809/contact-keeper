import React, {useReduce, useReducer} from 'react';
import {uuid} from 'uuid/v4';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';

const ContactState = props =>{
    const initialState = {
        contacts:[]
    }
}

const [state, dispatch] = useReducer(contactReducer,initialState)

// Add contact
const addContact = contact =>{
    contact.id = uuid.v4()
    dispatch({type:ADD_CONTACT ,payload:contact})
}
// Delete contact
//set contact
//clear current contact
// update contact
// filter contacts
// clear filter

return(
    <ContactContext.Provider>
        value={{
            contacts: state.contacts,
            addContact
        }}
        {props.children}
    </ContactContext.Provider>
);

export default  ContactState;