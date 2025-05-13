import { useState } from "react"
import { getData } from "../../utils/fetch-api.util.js"

import lock from "../../assets/lock.png"

import "./Login-Form.css"

function LoginForm({ setModalIsOpen }) {
    const [userPasswordGuess, setUserPasswordGuess] = useState("")
    const [buttonIsDisabled, setButtonIsDisabled] = useState(false)

    const handleInputChange = event => {
        setUserPasswordGuess(event.target.value)
    }

    const handleSubmit = async () => {
        setButtonIsDisabled(true)

        const res = await getData(`http://localhost:8080/api/reviews/check-password/${userPasswordGuess}`)

        if (res.passwordMatches) {
            setModalIsOpen(false)
        }
        
        else {
            window.alert("Incorrect password!")
        }

        setButtonIsDisabled(false)
    }

    return (
        <>
            <h1>Sign In</h1>
            <img src={lock} alt="Lock" /><br />

            <input type="password" placeholder="Enter Password" onChange={handleInputChange}/><br />
            <button onClick={handleSubmit} disabled={buttonIsDisabled}>Submit</button>
        </>
    )
}

export default LoginForm