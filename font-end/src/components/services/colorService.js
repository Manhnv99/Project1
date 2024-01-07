import axios from "axios";


class ColorService{
    getAll=()=>{
        return axios.get(`http://localhost:8080/color/list`)
    }

    addColor=(colorRequest)=>{
        return axios.post(`http://localhost:8080/color/add`,colorRequest)
    }
}

export default new ColorService();