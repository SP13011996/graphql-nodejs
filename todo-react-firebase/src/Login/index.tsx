import { } from 'firebase/database'
import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const LoginPage = () => {
    const user = useContext(UserContext)
    console.log(user)
    return (<div></div>)
}

export default LoginPage