import React, {useContext} from 'react'
//import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'
import ContactContext from '../../context/contact/contactContext'



const NavBar = ({title,icon})=>{
    const authContext= useContext(AuthContext)
    const contactContext= useContext(ContactContext)

    const{isAuthenticated,logout,user} = authContext;
    const {clearContacts} = contactContext;

    const onLogout = ()=>{
        logout()
        clearContacts()
    }

    const authLinks = (
        <>
        <li>Hello {user && user.name}</li>
        <li>
            <a onClick = {onLogout} href="#!"></a>
            <i className="fas fa-sign-out-alt"></i><span className="hide-sm">Logout</span>
        </li>
        </>
    )

    const guestLinks = (
        <>
             <li>
                    <Link to="/register">Register</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
        </>
    )
    return(
        <div className= "navbar bg-primary">
            <h1 className ={icon}>{title}
            </h1>
            <ul>
                {isAuthenticated? authLinks:guestLinks}
            </ul>

        </div>
    )
}

// NavBar.PropTypes= {
//     title:PropTypes.string.isRequired,
//     icon:PropTypes.string
// }
// NavBar.defaultProps = {
//     title: "Contact Keeper",
//     icon:'fas fa-id-card-alt'
// }
export default NavBar