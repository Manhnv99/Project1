import axios from "axios";


class SoleService{

    getAll=()=>{
        return axios.get(`http://localhost:8080/sole/list`)
    }

    addCategory=(soleRequest)=>{
        return axios.post(`http://localhost:8080/sole/add`,soleRequest);
    }

    getAllPaging=(page)=>{
        return axios.get(`http://localhost:8080/sole/list/${page}`);
    }

    getTotalPage=()=>{
        return axios.get(`http://localhost:8080/sole/totalPage`)
    }

    getById=(id)=>{
        return axios.get(`http://localhost:8080/sole/${id}`)
    }

    update=(id,soleRequest)=>{
        return axios.put(`http://localhost:8080/sole/update/${id}`,soleRequest);
    }

    findByAll=(name,status,page)=>{
        return axios.get(`http://localhost:8080/sole/find`,{
            params:{
                name:name,
                status:status,
                page:page
            }
        })
    }

    findByAllTotalPage=(name,status)=>{
        return axios.get(`http://localhost:8080/sole/findTotalPage`,{
            params:{
                name:name,
                status:status
            }
        })
    }
}

export default new SoleService();