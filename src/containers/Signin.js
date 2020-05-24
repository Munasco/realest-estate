import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {Helmet} from 'react-helmet'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import  {logIn} from '../actions/auth'


function Signin({logIn, isAuthenticated }) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const {email, password} = formData;

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = e => {
        e.preventDefault();

        logIn(email, password)
    }

    if(isAuthenticated) return(
        <Redirect to='/' />
    )

    return (
        <div className="auth">
            <Helmet>
                <title>Realest Estate - LogIn</title>
                <meta name='description' content='login page'/>
            </Helmet>
            <h1 className='auth__title'>Sign In</h1>
            <p className="auth__lead">Sign into your account</p>
            <form className="auth__form" onSubmit={onSubmit}>
                <div className="auth__form__group">
                    <input type="email" className="auth__form__input" 
                    placeholder="Email" value={email} name="email" onChange={onChange} required/>
                </div>
                <div className="auth__form__group">
                    <input type="password" className="auth__form__input" name="password"
                    placeholder="Password" value={password} onChange={onChange} required
                    minLength="6"/>
                </div>
                <button className="auth__form__button">LogIn</button>
            </form>
            <p className="auth__authtext">
                Don't have an account? <Link className="auth__authtext__link" to='/signup'>Sign Up</Link>
            </p>
        </div>
    )
}

logIn.PropTypes = {
    logIn: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})



export default connect(mapStateToProps, {logIn})(Signin)
