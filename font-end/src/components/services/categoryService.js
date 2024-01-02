import axios from "axios";

class CategoryService{

    addCategory=(categoryRequest)=>{
        return axios.post(`http://localhost:8080/category/add`,categoryRequest);
    }

    getAll=(page)=>{
        return axios.get(`http://localhost:8080/category/list/${page}`);
    }

    getTotalPage=()=>{
        return axios.get(`http://localhost:8080/category/totalPage`)
    }

    getById=(id)=>{
        return axios.get(`http://localhost:8080/category/${id}`)
    }

    update=(id,categoryRequest)=>{
        return axios.put(`http://localhost:8080/category/update/${id}`,categoryRequest);
    }

    findByAll=(name,status,page)=>{
        return axios.get(`http://localhost:8080/category/find`,{
            params:{
                name:name,
                status:status,
                page:page
            }
        })
    }

    findByAllTotalPage=(name,status)=>{
        return axios.get(`http://localhost:8080/category/findTotalPage`,{
            params:{
                name:name,
                status:status
            }
        })
    }


}

export default new CategoryService();