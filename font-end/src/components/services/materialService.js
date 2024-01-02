import axios from "axios";


class MaterialService{
    addCategory=(materialRequest)=>{
        return axios.post(`http://localhost:8080/material/add`,materialRequest);
    }

    getAll=(page)=>{
        return axios.get(`http://localhost:8080/material/list/${page}`);
    }

    getTotalPage=()=>{
        return axios.get(`http://localhost:8080/material/totalPage`)
    }

    getById=(id)=>{
        return axios.get(`http://localhost:8080/material/${id}`)
    }

    update=(id,materialRequest)=>{
        return axios.put(`http://localhost:8080/material/update/${id}`,materialRequest);
    }

    findByAll=(name,status,page)=>{
        return axios.get(`http://localhost:8080/material/find`,{
            params:{
                name:name,
                status:status,
                page:page
            }
        })
    }

    findByAllTotalPage=(name,status)=>{
        return axios.get(`http://localhost:8080/material/findTotalPage`,{
            params:{
                name:name,
                status:status
            }
        })
    }
}

export default new MaterialService();