import axios from "axios";


class ProductDetailService{

    add=(productDetailRequest)=>{
        return axios.post(`http://localhost:8080/productdetail/add`,productDetailRequest)
    }


}

export default new ProductDetailService()