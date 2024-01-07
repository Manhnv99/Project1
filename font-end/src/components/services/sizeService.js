import axios from "axios";


class SizeService{
    getAll=()=>{
        return axios.get(`http://localhost:8080/size/list`)
    }

    addSize=(sizeRequest)=>{
        return axios.post(`http://localhost:8080/size/add`,sizeRequest)
    }
}

export default new SizeService();