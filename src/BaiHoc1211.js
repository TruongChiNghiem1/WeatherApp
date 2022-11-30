import { useState } from "react"

const Input = ({text,suKien}) => (
    <div>
        <input value={text} onChange={(e)=>suKien(e.target.value)}/>
    </div>
)

const Display2 = ({name}) => (
    <div>
        <h1>{name}</h1>
    </div>
)

const Display = ({name}) => (
    <div>
        <h1>{name}</h1>
    </div>
)

function Container(){
    const [text, setText] = useState('aaa')
    return (
        <>
            <Input value={text} suKien={setText}/>
            <Display name={text}/>
            <Display2 name={text}/>
        </>
        )
}

function App() {
    return <Container />
}

export default App;