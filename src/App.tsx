import { useState } from 'react'
import {GetIds} from './services/IdService'
import './App.css'
import { QueryConverter } from './utils/QueryConverter'
function App() {
  const [count, setCount] = useState(0)
  useState(() => {
    
    const records=10;
    const length=10;
    const has_letters=true;
    const values = { records, length, has_letters };
    const query = QueryConverter(values);
    GetIds(query).then((data) => {
      console.log(data)
    });
  });
  return (
    <>
      <div>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
