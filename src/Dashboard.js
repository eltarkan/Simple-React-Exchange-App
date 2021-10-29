import { Component } from 'react';
import {GetCurrencies, GetCurrencyValues} from "./services/exchange";

export default class Dashboard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            codeList: [["bla", "blu"]],
            value: 0,
            isLoading: true,
            searchBox: [],
            showModal: false,
            selectedCode: "",
            error: false,
            toUSD: 0,
            toTRY: 0
        }
    };
    getCurrencies = () => {
        let codes = []
        GetCurrencies().then((currencies) => {
            for(let i in currencies.supported_codes){
                codes.push(currencies.supported_codes[i])
            }
            this.setState(
                {codeList: codes}
            )
            this.setState({
                isLoading: false
            })
        }).catch((error) => {
            this.setState({
                error: true
            })
            console.log(error)
            return
        })
    }
    getCurrencyValues = (code) => {

        GetCurrencyValues(code).then((values) => {
            this.setState({
                toTRY: values.conversion_rates["TRY"],
                toUSD: values.conversion_rates["USD"]
            })
        }).catch((error) => {
            console.log(error)
        })
    }
    getEmail(){
        return localStorage.getItem("email")
    }
    getPassword(){
        return localStorage.getItem("password")
    }
    async auth(){
        const email = this.getEmail();
        const password = this.getPassword();
        return email !== null && password !== null;
    }
    selectACurrency(code){
        this.setState({
            showModal: true
        })
        this.setState({
            selectedCode: code
        })
        this.getCurrencyValues(code[0])

    }
    findCurrency(e){
        let search = e.target.value
        let result = []
        if(search.length === 0){
            this.setState({
                searchBox: []
            })
            return
        }

        for(let i in this.state.codeList){
            if(this.state.codeList[i][1].toLowerCase().includes(search.toLowerCase())){
                result.push(this.state.codeList[i])
            }
        }
        this.setState({
            searchBox: result
        })
    }
    logout(){
        localStorage.removeItem("email")
        localStorage.removeItem("password")
        window.location.href = "/login"
    }
    closeModal(){
        this.setState({
            showModal: false
        })
    }

    componentDidMount() {
        this.getCurrencies();
    }

    render(){
        if(!this.auth()){
            window.location.href = "/login"
            return
        }
        if(this.state.isLoading){
            return <div>Loading...</div>;
        }
        return(
            <div className="flex flex-col relative h-screen">

                {
                    this.state.showModal &&
                        <div className="absolute h-full w-full flex items-center justify-center ">
                            <div className="w-1/3 h-1/2 bg-gray-600 flex flex-col p-4 text-white">
                                <div className="flex w-full justify-end">
                                    <button onClick={() => {this.closeModal()}}>X</button>
                                </div>
                                <div className="flex justify-center flex-col">
                                    <span>{this.state.selectedCode[0]} - {this.state.selectedCode[1]}</span>
                                    <span>TRY => {this.state.toTRY}</span>
                                    <span>USD => {this.state.toUSD}</span>
                                </div>


                            </div>
                        </div>


                }


                <div className="h-24 border-b-2 border-gray-600 flex flex-row justify-between px-4 items-center">
                    <div className="w-1/3">Muni Exchange App</div>
                    <div className="flex flex-col w-1/3 items-center justify-center">
                        <span>Total Worth: 10k</span>
                        <span>USD TRY</span>
                    </div>
                    <div className="w-1/3 flex flex-col items-end justify-end">
                        <span>Welcome {this.getEmail()}</span>
                        <button onClick={this.logout}>Logout</button>
                    </div>
                </div>
                <div className="p-10">
                    <div className="flex flex-col w-full justify-center">
                        <input onChange={e => {this.findCurrency(e)}} className="w-1/2 border-2 border-gray-600 p-3 mx-auto" placeholder="Search ..." />
                        {
                            this.state.searchBox.map((code, id) => {
                                return(
                                    <div onClick={e => {this.selectACurrency(code)}} key={id} className="w-1/2 border-2 border-t-0 border-black mx-auto h-14 flex items-center justify-center">
                                        <span>{code[0]} - {code[1]}</span>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>




{/*                {<div> {
                    this.state.codeList.map((code, id) => {
                        return(
                            <div key={id}>
                                <span>{code[0]}</span>
                                <br></br>
                            </div>
                        )
                    })
                }
                </div>}*/}
            </div>
        )
    }
}
