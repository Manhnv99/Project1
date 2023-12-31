import axios from "axios";



class Staffservice{

    uploadImage=(formData)=>{
        return axios.post(`http://localhost:8080/staff/staff-upload`,formData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    addStaff=(staffRequest)=>{
       return axios.post(`http://localhost:8080/staff/add`,staffRequest);
    }


    getAll=()=>{
        return axios.get(`http://localhost:8080/staff/list`);
    }

    getAllPaging=(page)=>{
        return axios.get(`http://localhost:8080/staff/list/${page}`);
    }

    findAllPaging=(input,ageFrom,ageTo,status,page)=>{
        return axios.get(`http://localhost:8080/staff/list/find`,{
            params:{
                input:input,
                ageFrom:ageFrom,
                ageTo:ageTo,
                status:status,
                page:page
            }
        })
    }

    findAllTotalPage=(input,ageFrom,ageTo,status)=>{
        return axios.get("http://localhost:8080/staff/findTotalPage/find",{
            params:{
                input:input,
                ageFrom:ageFrom,
                ageTo:ageTo,
                status:status
            }
        })
    }

    updateStaff=(id,staffRequest)=>{
        return axios.put(`http://localhost:8080/staff/update/${id}`,staffRequest);
    }

    getStaffById=(id)=>{
        return axios.get(`http://localhost:8080/staff/${id}`);
    }


    totalPage=()=>{
        return axios.get(`http://localhost:8080/staff/totalPage`)
    }




}

export default new Staffservice();