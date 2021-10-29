import _ from "lodash";
import { useState } from 'react';
import {GetCurrencies, GetCurrencyValues} from "./services/exchange";

const Dashboard = () => {
    const [codesList, setCodesList] = useState([]);
    const [values, setValues] = useState([]);

    const getCurrencies = () => {
        let codes = []
        GetCurrencies().then((currencies) => {
            for(let i in currencies.supported_codes){
                codes.push(currencies.supported_codes[i][0])
            }
            setCodesList(codes)
        }).catch((error) => {
            console.log(error)
        })

    }
    const getCurrencyValues = (code) => {
        GetCurrencyValues(code).then((values) => {
            setValues(values)
        }).catch((error) => {
            console.log(error)
        })
    }
    const auth = async () => {
        const email = localStorage.getItem("email");
        const password = localStorage.getItem("password");

        return email !== null && password !== null;
    }

    if(!auth()){
        window.location.href = "/login"
        return
    } else{
        getCurrencies()
    }
    return(
        <div>
            <span>Success</span>
            <ol>
                {_.times(codesList.length, (i) => (
                    <li key={i}>{codesList[i]}</li>
                ))}
            </ol>
            <button onClick={() => {
                getCurrencyValues("TRY")
                console.log(values)
            }}>Push meeee</button>
        </div>

    )

}

export default Dashboard
