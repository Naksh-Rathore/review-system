import logo from '../../assets/brewtide-logo.png'
import "./Company-Info.css"

function CompanyInfo({ avgImage }) {
    return (
        <div className='company-info'>
            <img src={logo} alt="BrewTide Logo" width="150px"/>
            <h1>BrewTide</h1>
            <h4>"Brew the calm, ride the tide"</h4>
            <h3>Average Rating: {avgImage || "Loading..."}</h3>
        </div>
    )  
}

export default CompanyInfo