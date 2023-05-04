import axios from "axios";


const uhealththApi = axios.create({
    baseURL: 'http://localhost:8080'
})

export default uhealththApi;