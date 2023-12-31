import {Link, NavLink} from "react-router-dom";
import './menu.css'
import {useEffect} from "react";

const Menu = () => {

    useEffect(() => {
        dropDownQLSP();
        dropDownQLND();
        dropDownQLKM();
    }, []);

    const dropDownQLSP = () => {
        let qlsp = document.getElementsByClassName('dropdown-qlsp')
        let listOption = document.querySelector('.list-option-qlsp')
        let keepshow = document.getElementsByClassName('keepshow-qlsp');
        for (let i = 0; i < keepshow.length; i++) {
            keepshow[i].addEventListener('click', () => {
                for (let i = 0; i < keepshow.length; i++) {
                    keepshow[i].classList.remove('active')
                }
                listOption.classList.toggle('showDropDown')
                keepshow[i].classList.add('active')
            })
        }
        qlsp[0].addEventListener('click', () => {
            listOption.classList.toggle('showDropDown')
        });
    }
    const dropDownQLND = () => {
        let qlnd = document.getElementsByClassName('dropdown-qlnd')
        let listOption = document.querySelector('.list-option-qlnd')
        let keepshow = document.getElementsByClassName('keepshow-qlnd');
        for (let i = 0; i < keepshow.length; i++) {
            keepshow[i].addEventListener('click', () => {
                for (let i = 0; i < keepshow.length; i++) {
                    keepshow[i].classList.remove('active')
                }
                listOption.classList.toggle('showDropDown')
                keepshow[i].classList.add('active')
            })
        }
        qlnd[0].addEventListener('click', () => {
            listOption.classList.toggle('showDropDown')
        });
    }
    const dropDownQLKM = () => {
        let qlkm = document.getElementsByClassName('dropdown-qlkm')
        let listOption = document.querySelector('.list-option-qlkm')
        let keepshow = document.getElementsByClassName('keepshow-qlkm');
        for (let i = 0; i < keepshow.length; i++) {
            keepshow[i].addEventListener('click', () => {
                for (let i = 0; i < keepshow.length; i++) {
                    keepshow[i].classList.remove('active')
                }
                listOption.classList.toggle('showDropDown')
                keepshow[i].classList.add('active')
            })
        }
        qlkm[0].addEventListener('click', () => {
            listOption.classList.toggle('showDropDown')
        });
    }
    return (
        <>
            <div
                className="fixed h-screen max-w-[16.666667%] border-[1px] border-solid border-black bg-[#001429] text-[12px]">
                <div className="pt-[30px] px-[30px]">
                    <div className="mb-[20px]">
                        <img className="w-full object-fill rounded-[50%]"
                             src="/logo.png" alt=""/>
                    </div>
                    <ul>
                        <li className="py-[10px] menu-hover">
                            <Link to="/" className="">
                            <span className=""><i className="fa-solid fa-chart-line text-[#fff]"></i></span>
                                <span className="text-[#999] ml-[10px]">Thống Kê</span>
                            </Link>
                        </li>
                        <li className="py-[10px] menu-hover">
                            <Link to="/" className="">
                                <span className="text-[#fff]"><i className="fa-solid fa-shop"></i></span>
                                <span className="text-[#999] ml-[10px]">Bán Hàng Tại Quầy</span>
                            </Link>
                        </li>
                        <li className="py-[10px] menu-hover">
                            <Link to="/" className="">
                                <span className="text-[#fff]"><i className="fa-solid fa-money-bill-wave"></i></span>
                                <span className="text-[#999] ml-[10px]">Quản Lý Hóa Đơn</span>
                            </Link>
                        </li>
                        <li className="py-[10px] menu-hover">
                            <Link to="/" className="">
                                <span className="text-[#fff]"><i className="fa-solid fa-truck-fast"></i></span>
                                <span className="text-[#999] ml-[10px]">Trả Hàng</span>
                            </Link>
                        </li>
                        {/*QLSP*/}
                        <li className="py-[10px] menu-hover cursor-pointer dropdown-qlsp">
                            <span className="text-[#fff]"><i className="fa-solid fa-box-open"></i></span>
                            <span className="text-[#999] ml-[10px]">Quản Lý Sản Phẩm</span>
                            <span className="text-[#999] ml-[10px]"><i className="fa-solid fa-caret-down"></i></span>
                            <ul className="list-option-qlsp text-[#999]  hidden">
                                <Link to="/sanpham-management">
                                    <li className="keepshow-qlsp px-[30px] py-[10px] mt-[10px] hover:bg-[#1676fc] hover:text-[#fff] transition ease-in-out duration-[0.2s] rounded-[10px]">
                                        Sản Phẩm
                                    </li>
                                </Link>
                                <Link to="/theloai-management">
                                    <li className="keepshow-qlsp px-[30px] py-[10px] mt-[10px] hover:bg-[#1676fc] hover:text-[#fff] transition ease-in-out duration-[0.2s] rounded-[10px]">
                                        Thể Loại
                                    </li>
                                </Link>
                                <Link to="/degiay-management">
                                    <li className="keepshow-qlsp px-[30px] py-[10px] mt-[10px] hover:bg-[#1676fc] hover:text-[#fff] transition ease-in-out duration-[0.2s] rounded-[10px]">
                                        Đế Giày
                                    </li>
                                </Link>
                                <Link to="/thuonghieu-management">
                                    <li className="keepshow-qlsp px-[30px] py-[10px] mt-[10px] hover:bg-[#1676fc] hover:text-[#fff] transition ease-in-out duration-[0.2s] rounded-[10px]">
                                        Thương Hiệu
                                    </li>
                                </Link>
                                <Link to="/chatlieu-management">
                                    <li className="keepshow-qlsp px-[30px] py-[10px] mt-[10px] hover:bg-[#1676fc] hover:text-[#fff] transition ease-in-out duration-[0.2s] rounded-[10px]">
                                        Chất Liệu
                                    </li>
                                </Link>
                            </ul>
                        </li>
                        {/*QLND*/}
                        <li className="py-[10px] menu-hover cursor-pointer dropdown-qlnd">
                            <span className="text-[#fff]"><i className="fa-solid fa-users"></i></span>
                            <span className="text-[#999] ml-[10px]">Quản Lý Tài Khoản</span>
                            <span className="text-[#999] ml-[10px]"><i
                                className="fa-solid fa-caret-down"></i></span>
                            <ul className="list-option-qlnd text-[#999] hidden">
                                <Link to="/nhanvien-management">
                                    <li className="keepshow-qlnd px-[30px] py-[10px] mt-[10px] hover:bg-[#1676fc] hover:text-[#fff] transition ease-in-out duration-[0.2s] rounded-[10px]">
                                        Nhân Viên
                                    </li>
                                </Link>
                                <Link to="/khachhang-management">
                                    <li className="keepshow-qlnd px-[30px] py-[10px] mt-[10px] hover:bg-[#1676fc] hover:text-[#fff] transition ease-in-out duration-[0.2s] rounded-[10px]">
                                        Khách Hàng
                                    </li>
                                </Link>
                            </ul>
                        </li>
                        {/*QLKM*/}
                        <li className="py-[10px] menu-hover cursor-pointer dropdown-qlkm">
                            <span className="text-[#fff]"><i className="fa-solid fa-tags"></i></span>
                            <span className=" text-[#999] ml-[10px]">Giảm Giá</span>
                            <span className=" text-[#999] ml-[10px]"><i
                                className="fa-solid fa-caret-down"></i></span>
                            <ul className="list-option-qlkm text-[#999] hidden">
                                <Link to="/dotgiamgia-management">
                                    <li className="keepshow-qlkm px-[30px] py-[10px] mt-[10px] hover:bg-[#1676fc] hover:text-[#fff] transition ease-in-out duration-[0.2s] rounded-[10px]">
                                        Đợt Giảm Giá
                                    </li>
                                </Link>
                                <Link to="/phieugiamgia-management">
                                    <li className="keepshow-qlkm px-[30px] py-[10px] mt-[10px] hover:bg-[#1676fc] hover:text-[#fff] transition ease-in-out duration-[0.2s] rounded-[10px]">
                                        Phiếu Giảm Giá
                                    </li>
                                </Link>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Menu