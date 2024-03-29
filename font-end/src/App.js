import './App.css';
import Menu from "./components/pages/menu/menu";
import Header from "./components/pages/header/header";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import ThongKe from "./components/pages/maincontent/thongke/ThongKe";
import SanPham from "./components/pages/maincontent/sanpham/SanPham";
import TheLoai from "./components/pages/maincontent/sanpham/TheLoai";
import DeGiay from "./components/pages/maincontent/sanpham/DeGiay";
import ThuongHieu from "./components/pages/maincontent/sanpham/ThuongHieu";
import ChatLieu from "./components/pages/maincontent/sanpham/ChatLieu";
import NhanVien from "./components/pages/maincontent/taikhoan/NhanVien";
import KhachHang from "./components/pages/maincontent/taikhoan/KhachHang";
import AddNhanVien from "./components/pages/maincontent/taikhoan/AddNhanVien";
import {Toastmessage} from "./components/pages/maincontent/toastmessage/toastmessage";
import UpdateNhanVien from "./components/pages/maincontent/taikhoan/UpdateNhanVien";
import DetailNhanVien from "./components/pages/maincontent/taikhoan/DetailNhanVien";
import AddSanPham from "./components/pages/maincontent/sanpham/AddSanPham";
import UpdateSanPham from "./components/pages/maincontent/sanpham/UpdateSanPham";
import ModalProductDetail from "./components/pages/maincontent/sanpham/modal/ModalProductDetail";



function App() {

    return (
        <Router>
            <div className="flex">
                <div className="w-2/12">
                    <Menu/>
                </div>
                <div className="w-10/12">
                    <Header/>
                    <div className="main-content w-full bg-[#f4f4f4] mt-[65px]">
                        <Toastmessage/>
                        <Routes>
                            <Route path="/" element={<ThongKe/>}/>
                            <Route path="/sanpham-management" element={<SanPham/>}/>
                            <Route path="/create-sanpham-management" element={<AddSanPham/>}/>
                            <Route path="/update-sanpham-management/:id" element={<UpdateSanPham/>}/>
                            <Route path="/theloai-management" element={<TheLoai/>}/>
                            <Route path="/degiay-management" element={<DeGiay/>}/>
                            <Route path="/thuonghieu-management" element={<ThuongHieu/>}/>
                            <Route path="/chatlieu-management" element={<ChatLieu/>}/>
                            <Route path="/nhanvien-management" element={<NhanVien/>}/>
                            <Route path="/add-nhanvien-management" element={<AddNhanVien/>}/>
                            <Route path="/update-nhanvien-management/:id" element={<UpdateNhanVien/>}/>
                            <Route path="/detail-nhanvien-management/:id" element={<DetailNhanVien/>}/>
                            <Route path="/khachhang-management" element={<KhachHang/>}/>
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
