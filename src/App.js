import './App.css';

const SanPham = ({name, price, stocked}) => (
  <tr>
    <td style={{color: stocked ? 'black': 'red'}}>{name}</td>
    <td>{price}</td>
  </tr>
)

const LoaiSanPham = ({category}) => (
  <tr>
    <th colSpan={2}>{category}</th>
  </tr>
)

const HienThiSanPham = ({products}) => {
  const rows = []
  let lastCategory = ''
  products.forEach(product => {
    if(product.category !== lastCategory) {
      rows.push(<LoaiSanPham key={product.category} category={product.category} />)
    }

    rows.push(
      <SanPham
        key={product.name}
        name={product.name} 
        price={product.price} 
        stocked={product.stocked}
      />)
    lastCategory = product.category
  });

  return(
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

const ThanhSearch = () => (
  <form className='searchBottom'>
    <input placeholder='Search...' />
    <br />
    <label>
      <input type='checkbox' />
      {' '}
      in stock only
    </label>
  </form>
)

const TimKiemSanPham = ({products}) => (
  <div className='container'>
    <ThanhSearch />
    <HienThiSanPham products={products}/>
  </div>
)

const products = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]

function App() {
  return <TimKiemSanPham products={products}/>
}

// export default App;

