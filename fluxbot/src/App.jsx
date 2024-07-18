import { useState } from 'react'
import Studio from './Pages/Studio'
function App() {
  const [count, setCount] = useState(0)

  return (
   
      <div>
        <Studio/>
       </div>
    
  )
}

export default App
