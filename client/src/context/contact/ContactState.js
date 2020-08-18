import React, {useReduce, useReducer} from 'react';
//import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR
    
} from '../types';

const ContactState = props =>{
    const initialState = {
        contacts:null,
        current:null,
        filtered:null,
        error:null
    };


const [state, dispatch] = useReducer(contactReducer,initialState)

// Get Contacts
const getContacts =  async () =>{
    
    try{
        const res = await axios.get('/api/contacts')
        dispatch({type:GET_CONTACTs ,payload:res.data})

    }catch(err){
        dispatch({
            type: CONTACT_ERROR,
            payload:err.response.msg
        })
    }
    // contact.id = uuidv4()
    
}

// Add contact
const addContact =  async contact =>{
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    try{
        const res = await axios.post('/api/contacts', contact,config)
        dispatch({type:ADD_CONTACT ,payload:res.data})

    }catch(err){
        dispatch({
            type: CONTACT_ERROR,
            payload:err.response.msg
        })
    }
    // contact.id = uuidv4()
    
}
// Delete contact
const deleteContact = async id =>{
    try{
        await axios.delete(`/api/contacts/${id}`)
        dispatch({
            type:DELETE_CONTACT,
            payload:id
            })

    }catch(err){
        dispatch({
            type: CONTACT_ERROR,
            payload:err.response.msg
        })
    }
    dispatch({type:DELETE_CONTACT ,payload:id})
}

// update contact
const updateContact = async contact =>{

    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    try{
        const res = await axios.put(`/api/contacts/${contact._id}`, contact,config)
        dispatch({
            type:UPDATE_CONTACT,
            payload:res.data
            })

    }catch(err){
        dispatch({
            type: CONTACT_ERROR,
            payload:err.response.msg
        })
    }
    
}

// clear contacts
const clearContacts = () =>{
    dispatch({type:CLEAR_CONTACTS })
}

//set curret contact
const setCurrent = contact =>{
    dispatch({type:SET_CURRENT ,payload:contact})
}
//clear current contact
const clearCurrent = () =>{
    dispatch({type:CLEAR_CURRENT })
}

// filter contacts
 const filterContacts = text => {
     dispatch({type:FILTER_CONTACTS, payload:text})
 }
// clear filter
const clearFilter = () =>{
    dispatch({type:CLEAR_FILTER })
}

return(
    <ContactContext.Provider>
        value={{
            contacts: state.contacts,
            current:state.current,
            filtered:state.filtered,
            error:state.error,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter,
            getContacts
        }}
        {props.children}
    </ContactContext.Provider>
);  }

export default  ContactState;