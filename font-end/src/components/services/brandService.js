import axios from "axios";


class BrandService{
    addCategory=(brandRequest)=>{
        return axios.post(`http://localhost:8080/brand/add`,brandRequest);
    }

    getAll=(page)=>{
        return axios.get(`http://localhost:8080/brand/list/${page}`);
    }

    getTotalPage=()=>{
        return axios.get(`http://localhost:8080/brand/totalPage`)
    }

    getById=(id)=>{
        return axios.get(`http://localhost:8080/brand/${id}`)
    }

    update=(id,brandRequest)=>{
        return axios.put(`http://localhost:8080/brand/update/${id}`,brandRequest);
    }

    findByAll=(name,status,page)=>{
        return axios.get(`http://localhost:8080/brand/find`,{
            params:{
                name:name,
                status:status,
                page:page
            }
        })
    }

    findByAllTotalPage=(name,status)=>{
        return axios.get(`http://localhost:8080/brand/findTotalPage`,{
            params:{
                name:name,
                status:status
            }
        })
    }
}

export default new BrandService();