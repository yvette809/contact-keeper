import React, {useState, useContext} from 'react'
import ContactContext from '../../context/contact/contactContext';

function ContactForm() {

    const contactContext = useContext(ContactContext)
    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone:'',
        type: 'personal'
    })

    const {name, email, phone,type} = contact;

    const onChange = e => setContact({...contact, [e.target.name]: e.target.value})

    const onSubmit= e =>{
        e.preventDefault();
        contactContext.addContact(contact)
        setContact({
            name: '',
            email: '',
            phone:'',
            type: 'personal'

        })
    }

    return (
      <form onSubmit = {onSubmit}> 
          <h2>Add Contact</h2>
          <input 
          type = "text"
          placeholder = "name"
          value = {name}
          onChange= {onChange}
          />
           <input 
          type = "email"
          placeholder = "Email"
          value = {email}
          onChange= {onChange}
          />
           <input 
          type = "text"
          placeholder = "phone"
          value = {name}
          onChange= {onChange}
          />
          <h5>Contact Type</h5>
          <input type = "radio" name = "type" value = "personal"   onChange= {onChange} checked={type ==='personal'}
          /> personal {''}
          <input type = "radio" name = "type" value = "professional"   onChange= {onChange} checked={type ==='professional'}
          /> professional {''}
          <div>
              <input type = "submit" value = "Add Contact" className= "btn-btn-primary btn-blog"/>
          </div>
      </form>
    )
}

export default ContactForm
