import { useState } from 'react';
import './App.css';

const SanPham = ({name, price, stocked}) => {
    return (
        <>
            <tr>
                <td style={{color: stocked ? 'black' : 'red'}}>{name}</td>
                <td>{price}</td>
            </tr>
        </>
    )
}

const LoaiSanPham = ({category}) => (
    <tr>
        <td colSpan={2}>{category}</td>
    </tr>
)

const HienThiSanPham = ({products, textSearch,hienSP}) => {
    const rows = [];
    let lastCategory = ''
    products.forEach(product =>{
        if(product.name == textSearch){
            if(product.category !== lastCategory){
                rows.push(<LoaiSanPham key={product.category} category={product.category}/>)
            }
            if(hienSP == true){
                if(product.stocked){
                    rows.push(
                        <SanPham 
                            key={product.name}
                            name={product.name}
                            price={product.price}
                            stocked={product.stocked}
                    />)
                }
            }else{
                rows.push(
                    <SanPham 
                        key={product.name}
                        name={product.name}
                        price={product.price}
                        stocked={product.stocked}
                />)
            }

        lastCategory = product.category
    }

    });

    return (
        <table>
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
                {rows}
            </tbody>
        </table>
    )
}

const ThanhSearch = ({textSearch,suKien,hienSP}) => (
    <form>
        <input value={textSearch} onChange={(e)=>suKien(e.target.value)} placeholder='Search'/>
        <br/>
        <label>
            <input type='checkbox' value={hienSP} onChange={(e)=>hienSP(e.target.value)}/>
            {' '}
            hien 
        </label>
    </form>
)

function TimKiemSanPham ({products}) {
    const [textSearch, setText] = useState('');
    const [hienSP, setCheckbox] = useState('');
    
    return (
        <div className='container'>
            <ThanhSearch textSearch={textSearch} suKien={setText} checkHien={hienSP} hienSP={setCheckbox} />
            <HienThiSanPham products={products} textSearch={textSearch} hienSP={hienSP}/>
        </div>
    )
}

const products = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
  ]

function App(){
    return <TimKiemSanPham products={products}/>
}

export default App;
