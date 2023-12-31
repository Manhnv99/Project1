const Header = () => {
    return (
        <>
            <div className="fixed top-0 left-[16.666667%] right-0 bg-[#fff]">
                <div className="py-[15px] px-[30px] flex justify-between items-center">
                    <div className="">
                        <i className="fa-solid fa-layer-group cursor-pointer"></i>
                    </div>
                    <div className="flex items-center">
                        <div className="relative">
                            <i className="fa-regular fa-bell cursor-pointer hover:opacity-[0.8] transition ease-in-out duration-[0.2s]"></i>
                            <span
                                className="absolute top-[-10px] bg-red-500 px-[6px] text-[#fff] rounded-[50%] text-[12px]">3</span>
                        </div>
                        <span
                            className="hover:opacity-[0.8] transition ease-in-out duration-[0.2s] pl-[30px] pr-[20px] cursor-pointer font-[600]">Nguyễn Vĩ Mạnh</span>
                        <img className="h-[35px] w-[35px] object-cover rounded-[50%] cursor-pointer"
                             src="https://genk.mediacdn.vn/2017/photo-1-1511425238742.jpg" alt=""/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header