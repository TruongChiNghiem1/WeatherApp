import { useState } from 'react';
import './App.css';

const data = [
  { id: 1, text: 'do a', complete: false },
  { id: 2, text: 'do b', complete: false },
  { id: 3, text: 'do c', complete: false },
  { id: 4, text: 'do d', complete: true },
  { id: 5, text: 'do e', complete: false },
  { id: 6, text: 'do f', complete: true },
  { id: 7, text: 'do g', complete: false },
]

function Todo({ text, complete, id, toggleTask, handleEdit, handleDelete }) {
  const style = complete ? { textDecoration: 'line-through' } : {}
  const [textEdit, setTextEdit] = useState(text)
  const [isEdit, setEdit] = useState(false)

  const handleSave = () => {
    handleEdit(id, textEdit)
    setEdit(false)
  }

  if (isEdit) return (
    <>
      <input type='text' value={textEdit} onChange={(e) => setTextEdit(e.target.value)} />
      <button onClick={handleSave}>Save</button>
    </>
  )
  return (
    <div>
      <div style={{...style, width: 150, display: 'inline-block'}} onClick={() => toggleTask(id)}>{text}</div>
      <span>
        <button onClick={() => setEdit(id)}>edit</button>
        <button onClick={() => handleDelete(id)}>delete</button>
      </span>
    </div>
  )
}

function Todos({ todos, toggleTask, handleEdit, handleDelete }) {
  console.log(todos);

  return (
    <div>
      {
        todos.map(todo =>
          <Todo
            key={todo.id}
            text={todo.text}
            complete={todo.complete}
            id={todo.id}
            toggleTask={toggleTask}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )
      }
    </div>
  )
}

function AddTodo({ handleAdd }) {
  const [text, setText] = useState('')

  const handleClick = () => {
    handleAdd(text)
    setText('')
  }
  return (
    <>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleClick}>Add</button>
    </>
  )
}

function FilterButton({ action, title, isActive }) {
  const style = isActive ? { border: '1px solid back', color: 'yellow', backgroundColor: 'black' } : {}
  return (
    <button style={style} onClick={action}>{title}</button>
  )
}

function FitlerAction({ filter, setFilter }) {
  return (
    <div style={{ margin: 10, display: 'flex', width: 170, justifyContent: 'space-between' }}>
      <FilterButton title={'all'} action={() => setFilter('all')} isActive={filter === 'all'} />
      <FilterButton title={'done'} action={() => setFilter('done')} isActive={filter === 'done'} />
      <FilterButton title={'undone'} action={() => setFilter('undone')} isActive={filter === 'undone'} />
    </div>
  )
}

function App() {
  const [todos, setTodos] = useState(data)
  const [filter, setFilter] = useState('all')

  const handleAdd = (txt) => {
    const newTodo = {
      id: todos.length + 1,
      text: txt,
      complete: false
    }

    const newTodos = [...todos]
    newTodos.push(newTodo)
    setTodos(newTodos)
  }
  const handleEdit = (id, txt) => {
    const newTodos = [...todos]
    newTodos.forEach(todo => {
      if (todo.id === id) {
        todo.text = txt
      }
    })
    setTodos(newTodos)
  }
  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }
  const toggleTask = (id) => {
    const newTodos = [...todos]
    newTodos.forEach(todo => {
      if (todo.id === id) {
        todo.complete = !todo.complete
      }
    })
    setTodos(newTodos)
  }

  // đọc kỹ đoạn code dưới để hiểu 
  // Từ khoá: "javascript array filter"
  const filteredTodos = todos.filter(todo => {
    if (filter === 'done') return todo.complete
    if (filter === 'undone') return !todo.complete
    return todo
  })

  return (
    <div style={{ margin: 50 }}>
      <AddTodo handleAdd={handleAdd} />
      <FitlerAction
        setFilter={setFilter}
        filter={filter}
      />
      <Todos
        todos={filteredTodos}
        toggleTask={toggleTask}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;

