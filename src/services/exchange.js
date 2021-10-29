import axios from "axios";

export const GetCurrencies = async () => {
    try{
        const response = await axios.get(process.env.REACT_APP_API_SERVER + "/" + process.env.REACT_APP_API_KEY + "/codes")
        return response.data
    } catch (e) {
        console.log(e)
        return []
    }
}

export const GetCurrencyValues = async (currencyCode) => {
    try{
        const response = await axios.get(process.env.REACT_APP_API_SERVER + "/" + process.env.REACT_APP_API_KEY + "/latest/" + currencyCode)
        return response.data
    } catch (e) {
        console.log(e)
        return []
    }
}