import {useState} from "react";
import {Link} from "react-router-dom";
const md5 = require('md5');

export default function Register(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setRePassword] = useState("")

    const register = async (e) => {
        e.preventDefault()

        if(password !== rePassword){
            alert("Invalid password")
            return
        }
        await localStorage.setItem("email", email)
        await localStorage.setItem("password", md5(password))
        window.location.href = "/login"
    }

    return(
        <div className="flex flex-col w-full h-screen items-center justify-center bg-gray-900">
            <div className="flex flex-col h-1/2 w-full sm:w-5/6 lg:w-1/2 bg-black rounded-xl">
                <form onSubmit={register} className="w-full h-full mx-auto flex flex-col items-center justify-evenly">
                    <div className="flex flex-col">
                        <span className="text-white text-5xl">REGISTER</span>
                        <Link to="/login" className="text-green-600 mx-auto pt-2">or login</Link>

                    </div>
                    <div className="rounded-2xl border-2 border-blue-400">
                        <input required type="email" onChange={(e) => {setEmail(e.target.value)}} className="bg-black text-gray-200 py-6 px-8 text-center font-bold" placeholder="Mail" />
                    </div>
                    <div className="rounded-2xl border-2 border-blue-400">
                        <input required onChange={(e) => {setPassword(e.target.value)}} type="password" className="bg-black text-white py-6 px-8 text-center font-bold" placeholder="Password" />
                    </div>

                    <div className="rounded-2xl border-2 border-blue-400">
                        <input required onChange={(e) => {setRePassword(e.target.value)}} type="password" className="bg-black text-white py-6 px-8 text-center font-bold" placeholder="RePassword" />
                    </div>

                    <div className="rounded-2xl border-2 border-green-400">
                        <button type="submit" className="bg-black text-gray-400 py-6 px-8 font-bold"> Register </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
