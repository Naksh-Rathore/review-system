import { useState, useRef, useEffect } from "react"
import { getData } from "../../utils/fetch-api.util.js"

import lock from "../../assets/lock.png"

import "./Login-Form.css"

function LoginForm({ setModalIsOpen }) {
    const tries = useRef(Number(localStorage.getItem("adminPasswordTries")) || 1)

    const [userPasswordGuess, setUserPasswordGuess] = useState("")
    const [buttonIsDisabled, setButtonIsDisabled] = useState(false)

    useEffect(() => {
        const lockedUntil = localStorage.getItem("adminPasswordLockedUntil")

        if (lockedUntil && new Date() > new Date(lockedUntil)) {
            localStorage.removeItem("adminPasswordLockedUntil")
            
            tries.current = 1
            localStorage.setItem("adminPasswordTries", String(tries.current))
        }
    }, [])


    const handleInputChange = event => {
        setUserPasswordGuess(event.target.value)
    }

    const handleSubmit = async () => {
        const lockedUntil = localStorage.getItem("adminPasswordLockedUntil")

        if (lockedUntil && new Date() < new Date(lockedUntil)) {
            setButtonIsDisabled(true)
            return window.alert(`You are locked out until ${new Date(lockedUntil).toLocaleTimeString()}`)
        }

        if (userPasswordGuess.length <= 0) return

        if (tries.current > 5) {
            setButtonIsDisabled(true)

            const oneHourLater = new Date()
            oneHourLater.setHours(oneHourLater.getHours() + 1)

            localStorage.setItem("adminPasswordLockedUntil", oneHourLater.toISOString())

            return window.alert("You have used all your tries!")
        }

        setButtonIsDisabled(true)

        const res = await getData(`http://localhost:8080/api/auth/check-password/${userPasswordGuess}`)

        if (res.passwordMatches) {
            tries.current = 1
            localStorage.setItem("adminPasswordTries", String(tries.current))

            setModalIsOpen(false)
        }
        
        else {
            tries.current++
            localStorage.setItem("adminPasswordTries", String(tries.current))

            window.alert("Incorrect password!")
        }

        setButtonIsDisabled(false)
    }

    return (
        <>
            <h1>Sign In</h1>
            <img src={lock} alt="Lock" /><br />

            <input type="password" placeholder="Enter Password" onChange={handleInputChange}/><br />
            <button onClick={handleSubmit} disabled={buttonIsDisabled}>Submit</button><br /><br />

            <h3>{6 - tries.current} attempt(s) remaining</h3>
        </>
    )
}

export default LoginForm