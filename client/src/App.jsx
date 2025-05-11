import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [quotes, setQuotes] = useState([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    fetch('https://dummyjson.com/quotes')
      .then(res => res.json())
      .then(data => setTotal(data.total))
  })

  useEffect(() => {
    fetch(`https://dummyjson.com/quotes?limit=10&skip=${skip}`)
        .then(res => res.json())
        .then(data => setQuotes([...data.quotes.map(q => q.quote)]) )
      
  }, [skip])
  
  const handlePage = (pageNumber)=>
  {
    setSkip((pageNumber-1)*10)
  }
  const pagecount = Math.ceil(total/10); 
  return (
    <>
      <div className='container'>

        <div>
          <ol>
            {quotes.map(quote => <li key={quote}>{quote}</li>)}
          </ol>
        </div>
        {Array.from({length:pagecount},(_,i)=>
          (<button key={i+1} onClick={()=>handlePage(i+1)}>
            {i+1}</button>
          ))}
      </div>
    </>
  )
}

export default App
