import { useState } from "react"

function ModalContent({ setModalIsOpen }) {
    const password = "1234"

    const [userPasswordGuess, setUserPasswordGuess] = useState("")

    const handleInputChange = event => {
        setUserPasswordGuess(event.target.value)
    }

    const handleSubmit = () => {
        if (userPasswordGuess === password) {
            setModalIsOpen(false)
        }
        
        else {
            window.alert("Incorrect password!")
        }
    }

    return (
        <>
            <input type="password" onChange={handleInputChange}/>
            <button onClick={handleSubmit}>Submit</button>
        </>
    )
}

export default ModalContent