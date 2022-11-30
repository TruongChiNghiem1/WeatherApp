import { useState } from 'react';
import './TodoCss.css';

function ThanhSearch({handleAdd}) {
    const [text, setText] = useState('')
    const setTxtAdd = (e) => {
        setText(e.target.value)
    }

    return (
        <div>
            <input className='height-25 padding-right-50px' value={text} onChange={setTxtAdd}/>
            <button onClick={() =>{
                handleAdd(text)
                setText('')}}
                className='height-30'>Add</button>
        </div>
    )
}

function Document({ name,check, id, checkBox,handEdit, handleDelete }) {
    const [textEdit, setNameEdit] = useState(name)
    const [isEdit, setEdit] = useState(false);
    const handleOnChange = () => {
        checkBox(id);
    }

    const handleSave = () => {
        handEdit(id, textEdit)
        setEdit(false)
    }

    if(isEdit) return (
        <>
            <input type='text' value={textEdit} onChange={(e) => setNameEdit(e.target.value)}/>
            <button onClick={handleSave}>Save</button>
        </>
    )
    return (
        <>
            <input type="checkbox" checked={check} onChange={handleOnChange}/>
            {' '}
            {name}
            <span>
                <button onClick={() => setEdit(id)}>edit</button>
                <button onClick={() => handleDelete(id)}>delete</button>
            </span>
            <br/>
        </>
    )
}

function NoiDung ({todos, checkBox,handEdit, handleDelete}) {
    return (
        <>
            <div className='overflow border-child margin-top-15'>
                <label>{
                    todos.map(product => 
                        <Document 
                            key={product.id} 
                            name={product.name} 
                            check={product.check} 
                            id={product.id} 
                            checkBox={checkBox} 
                            handEdit={handEdit}
                            handleDelete={handleDelete}/>)
                }
                </label>
            </div>
        </>
    )
}

const Button = ({title,action, style}) => {
    return (
        <>
            <button onClick={action} style={{...style}} className='button-width-10'>
                {title}
            </button>
        </>
    )
}

const Footer = ({setFilter, filter}) =>{
    const style = {color: 'red'};
    return (
        <div>
            <p className='padding-bottom'>Filter</p>
            <div className="display-flex justify-between">
                <Button title='All' action={() => setFilter('All')} isActive={filter === 'All'} />
                <Button title='Complete' action={() => setFilter('Complete')} isActive={filter === 'Complete'} />
                <Button title='Incomplete' action={() => setFilter('Incomplete')} isActive={filter === 'Incomplete'} />
            </div>
        </div>
    )
}

const products = [
    {id: 1, name: "Make a todo list", check: false},
    {id: 2, name: "Check random a task", check: false},
    {id: 3, name: "make a wireframe", check: true},
    {id: 5, name: "Finish the core", check: true},
    {id: 6, name: "make a new example", check: false},
    {id: 7, name: "Make plan for new example", check: false}
]

function App(){
    const [todos, setTodos] = useState(products)
    const [filter, setFilter] = useState('All')
    const handleAdd = (text) =>{
        const newTodo = {
            id: todos.length + 1,
            name: text,
            check: false
        }

        const newTodos = [...todos]
        newTodos.push(newTodo)
        setTodos(newTodos)
    }
    const checkBox = (id) => {
        const newProducts = [...todos]
        newProducts.forEach(todo => {
            if(todo.id === id){
                todo.check = !todo.check
            }
        })
        setTodos(newProducts)
    }

    const handleDelete = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const handEdit = (id, text) => {
        const newTodos = [...todos]
        newTodos.forEach(todo =>{
            if(todo.id === id){
                todo.name = text
            }
        })
        setTodos(newTodos)
    }

    const filteredTodos = todos.filter(todo => {
        if(filter === 'Complete') return todo.check
        if(filter === 'Incomplete') return !todo.check
        return todo
    })
    return (
        <div className="child">
            <ThanhSearch handleAdd={handleAdd} />
            <NoiDung todos={filteredTodos} handEdit={handEdit} handleDelete={handleDelete} checkBox={checkBox}/>
            <Footer setFilter={setFilter} filter={filter}/>
        </div>
    )
}

export default App;