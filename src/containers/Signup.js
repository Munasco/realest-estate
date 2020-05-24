import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import  {signUp} from '../actions/auth'
import {setAlert} from '../actions/alert'

function Signup({signUp, setAlert, isAuthenticated }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const {name, email, password, password2} = formData;

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = e => {
        e.preventDefault();

        if(password !== password2)
            setAlert('Passwords do not match', 'error')
        else signUp(name, email, password, password2)
        
    }

    if(isAuthenticated) return(
        <Redirect to='/' />
    )

    return (
        <div className="auth">
            <Helmet>
                <title>Realest Estate - SignUp</title>
                <meta name='description' content='signup page'/>
            </Helmet>
            <h1 className='auth__title'>Sign Up</h1>
            <p className="auth__lead">Create your account</p>
            <form className="auth__form" onSubmit={onSubmit}>
                <div className="auth__form__group">
                    <input type="text" className="auth__form__input" 
                    placeholder="Name" value={name} name="name" onChange={onChange} required/>
                </div>
                <div className="auth__form__group">
                    <input type="email" className="auth__form__input" 
                    placeholder="Email" value={email} name="email" onChange={onChange} required/>
                </div>
                <div className="auth__form__group">
                    <input type="password" className="auth__form__input" name="password"
                    placeholder="Password" value={password} onChange={onChange} required
                    minLength="6"/>
                </div>
                <div className="auth__form__group">
                    <input type="password" className="auth__form__input" name="password2"
                    placeholder="Confirm your password" value={password2} onChange={onChange} required
                    minLength="6"/>
                </div>
                <button className="auth__form__button">Register</button>
            </form>
            <p className="auth__authtext">
                Already have an account? <Link className="auth__authtext__link" to='/login'>Sign In</Link>
            </p>
        </div>
    );
}

Signup.propTypes = {
    setAlert: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})



export default connect(mapStateToProps, { setAlert, signUp})(Signup)
