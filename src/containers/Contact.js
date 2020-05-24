import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Helmet} from 'react-helmet'
import { connect } from 'react-redux'
import Loader from 'react-loader-spinner'
import PropTypes from 'prop-types'
import {setAlert} from '../actions/alert'

function Contact({setAlert}) {

    useEffect(() => {
        window.scrollTo(0,0)
    }, [])

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const {name, email, subject, message} = formData;

    const [loading, setLoading] = useState(false);

    const onChange = e => setFormData({
        ...formData, [e.target.name]: e.target.value
    })

    const onSubmit = e => {
        e.preventDefault();
        axios.defaults.headers = {
            'Content-Type': 'application/json'
        };
        setLoading(true);
        axios.post('http://161.35.111.5/api/contacts/', {name, 
        email, subject, message})
        .then(res=> {
            setAlert('Message Sent', 'success');
            setLoading(false);
            console.log(res.data);
            window.scrollTo(0,0)
        })
        .catch(errors=>{
            setAlert('Error with Sending Message', 'error')
            setLoading(false);
            window.scrollTo(0,0)
        })

    }

    return (
        <div className='contact'>
            <Helmet>
                <title>Realest Estate - Contact</title>
                <meta name='description' content='Contact us' />
            </Helmet>
            <form className='contact__form' onSubmit={onSubmit}>
                <label htmlFor="name" className="contact__form__label">Name*</label>
                <input type="text"name='name'placeholder='Full Name'onChange={onChange}
                value={name} required className="contact__form__input"/>
                <label htmlFor="email" className="contact__form__label">Email*</label>
                <input type="email" name='email'placeholder='example@gmail.com' onChange={onChange}
                value={email} required className="contact__form__input"/>
                <label htmlFor="subject" className="contact__form__label">Subject*</label>
                <input type="text" name='subject' placeholder='Buying Home'onChange={onChange}
                value={subject} required className="contact__form__input"/>
                <label htmlFor="message" className="contact__form__label">Message*</label>
                <textarea name='message' cols='30' row='10'
                placeholder='Message:' onChange={onChange}
                value={message} className="contact__form__textarea"/>
                {loading ? 
                <div className="contact__form__loading">
                    <Loader type="Oval"
                            color='#424242'
                            height={50}
                            width={50} />
                </div> :
                <button htmltype='submit' className="contact__form__button">Send</button>
                }
            </form>
        </div>
    )
}

Contact.propTypes = {
    setAlert: PropTypes.func.isRequired
}

export default connect(null, {setAlert})(Contact)
