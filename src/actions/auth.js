import {SIGNUP_FAIL, SIGNUP_SUCCESS,
LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './types'
import {setAlert} from './alert'
import axios from 'axios'

export const logIn = (email, password)=> async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({email, password})

    try {
        const res = await axios.post('http://161.35.111.5/api/token/', body, config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(setAlert('Authenticated Successfully', 'success'));
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL
        })

        dispatch(setAlert('Error Authenticating', 'error'))
    }
} 
export const signUp = (name, email, password, password2) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({name, email, password, password2})
    axios.post('http://161.35.111.5/api/accounts/signup', body, config)
    .then(res=> {
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });

        dispatch(logIn(email, password))
    })
    .catch(error=> {
        dispatch({
            type: SIGNUP_FAIL
        })

        dispatch(setAlert('Error Authenticating', 'error'))
    })
    
}

export const logOut = () => dispatch=>{
    dispatch(setAlert('Log Out Successful', 'success'));
    dispatch({
        type: LOGOUT
    })
}