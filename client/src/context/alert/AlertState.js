import React, {useReduce, useReducer} from 'react';
import alertContext from './alertContext';
import alertReducer from './alertReducer';
import { v4 as uuidv4 } from 'uuid';
import {
    SET_ALERT,
    REMOVE_ALERT
    
} from '../types';

const AlertState = props =>{
    const initialState = [];
    const[state,dispatch] = useReducer(alertReducer,initialState);
// set Alert
const setAlert = (msg,type, timeout= 5000)=>{
    const id = uuidv4()
    dispatch({
        type: SET_ALERT,
        payload:{msg,type,id}
    })
};
 
setTimeout(()=> dispatch({type:REMOVE_ALERT, payload:id}), timeout)


return(
    <AuthContext.Provider>
        value={{
            alerts:state,
            setAlert
        }}
        {props.children}
    </AuthContext.Provider>
); 
 };

export default  AlertState;