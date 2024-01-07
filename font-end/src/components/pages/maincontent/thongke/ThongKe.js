import {useState} from "react";



const ThongKe = () => {
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);

    // Dữ liệu giày theo màu sắc và kích cỡ
    const shoesData = [
        { id: 1, color: 'Pink', size: 37, name: 'Nike', image: 'pink_nike.jpg' },
        { id: 2, color: 'Pink', size: 38, name: 'Nike', image: 'pink_nike.jpg' },
        { id: 3, color: 'Blue', size: 37, name: 'Nike', image: 'blue_nike.jpg' },
        { id: 4, color: 'Blue', size: 38, name: 'Nike', image: 'blue_nike.jpg' },
    ];

    // Lấy danh sách các màu sắc duy nhất
    const uniqueColors = [...new Set( shoesData.map((shoe) => shoe.color) )];

    const test=()=>{
        console.log(uniqueColors)
    }

    // Hiển thị bảng
    return (
        <>
        <button onClick={test}>click</button>
        <div>
            <div>
                <label>Chọn màu sắc: </label>
                <select
                    onChange={(e) => setSelectedColor(e.target.value)}
                    value={selectedColor || ''}
                >
                    <option value="">Tất cả màu sắc</option>
                    {uniqueColors.map((color) => (
                        <option key={color} value={color}>
                            {color}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Chọn kích cỡ: </label>
                <select
                    onChange={(e) => setSelectedSize(parseInt(e.target.value, 10))}
                    value={selectedSize || ''}
                >
                    <option value="">Tất cả kích cỡ</option>
                    {[37, 38].map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
            </div>

            {uniqueColors.map((color) => {
                const sizesForColor = [...new Set(shoesData.filter((shoe) => shoe.color === color))];
                return (
                    <div key={color}>
                        <h2>{`Sản phẩm màu ${color}:`}</h2>
                        {sizesForColor.map((size) => (
                            <div key={size.size}>
                                <h3 onClick={()=>{console.log(sizesForColor)}}>{`Size ${size.size}:`}</h3>
                            </div>
                        ))}
                        <input type="file" accept="image/*"/>
                    </div>
                );
            })}
        </div>
        </>
    );
}

export default ThongKe