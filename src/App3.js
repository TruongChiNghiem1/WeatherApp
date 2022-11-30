
function App(){
    return <TimKiemSanPham products={products}/>;
}


const ThanhSearch = () => (
    <form >
        <input placeholder='search'/>
        <br></br>
        <label>
            <input type='checkbox' />
            {' '}
            in stock only
        </label>
    </form>
)

const products = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
  ]

const TimKiemSanPham = ({products}) => (
    <div>
        <ThanhSearch />
        <HienThiSanPham products={products}/>
    </div>
)

const HienThiSanPham = ({products}) => {
    const rows = []
    let categorycu = ''
    products.forEach(element => {
        if(element.category !== categorycu){
            rows.push(<LoaiSanPham key={element.category} category={element.category}/>)
        }

        rows.push(
            <SanPham
                key={element.name}
                name={element.name}
                price={element.price}
                stocked={element.stocked}
        />)
    });
}
    


export default App;