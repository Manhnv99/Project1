import axios from "axios";


class ProductDetailService{

    add=(productDetailRequest)=>{
        return axios.post(`http://localhost:8080/productdetail/add`,productDetailRequest)
    }


    getAll=()=>{
        return axios.get(`http://localhost:8080/productdetail/list`)
    }


}

export default new ProductDetailService()