import axios from "axios";


class GeographService {

    callAPICity=()=>{
       return axios.get(`https://provinces.open-api.vn/api/?depth=3`);
    }


}

export default  new GeographService();