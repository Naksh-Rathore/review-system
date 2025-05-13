import { useState, useRef } from "react"
import { getData } from "../../utils/fetch-api.util.js"

import lock from "../../assets/lock.png"

import "./Login-Form.css"

function LoginForm({ setModalIsOpen }) {
    const tries = useRef(1)

    const [userPasswordGuess, setUserPasswordGuess] = useState("")
    const [buttonIsDisabled, setButtonIsDisabled] = useState(false)

    const handleInputChange = event => {
        setUserPasswordGuess(event.target.value)
    }

    const handleSubmit = async () => {
        if (tries.current > 5) {
            setButtonIsDisabled(true)
            return window.alert("You have used all your tries!")
        }

        setButtonIsDisabled(true)

        const res = await getData(`http://localhost:8080/api/reviews/check-password/${userPasswordGuess}`)

        if (res.passwordMatches) {
            tries.current = 1
            setModalIsOpen(false)
        }
        
        else {
            tries.current++
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