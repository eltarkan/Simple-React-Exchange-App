import {useState} from "react";
import {Link} from "react-router-dom";
const md5 = require('md5');

export default function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const login = (e) => {
        e.preventDefault()
        const validateMail = localStorage.getItem("email");
        const validatePassword = localStorage.getItem("password");
        if(validateMail === email && validatePassword === md5(password)){
            window.location.href = "/"
        } else {
            alert("Invalid Username or Password")
        }
    }

    return(
        <div className="flex flex-col w-full h-screen items-center justify-center bg-gray-900">
            <div className="flex flex-col h-1/2 w-full sm:w-5/6 lg:w-1/2 bg-black rounded-xl">
                <form onSubmit={login} className="w-full h-full mx-auto flex flex-col items-center justify-evenly">
                    <div className="flex flex-col">
                        <span className="text-white text-5xl">LOGIN</span>
                        <Link to="/register" className="text-green-600 mx-auto pt-2">or register</Link>
                    </div>
                    <div className="rounded-2xl border-2 border-blue-400">
                        <input required type="email" onChange={(e) => {setEmail(e.target.value)}} className="bg-black text-gray-200 py-6 px-8 text-center font-bold" placeholder="Mail" />
                    </div>
                    <div className="rounded-2xl border-2 border-blue-400">
                        <input required onChange={(e) => {setPassword(e.target.value)}} type="password" className="bg-black text-white py-6 px-8 text-center font-bold" placeholder="Password" />
                    </div>

                    <div className="rounded-2xl border-2 border-green-400">
                        <button type="submit" className="bg-black text-gray-400 py-6 px-8 font-bold"> Login </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
