import './App.css'

import { useEffect, useRef, useState } from 'react'
import Pagination from './components/Pagination';
import Quote from './components/Quote';
import Limit from './components/Limit';

function App() {

  const [isLoading, setIsLoading] = useState(false)
  const [quotes, setQuotes] = useState([{}]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [currentPage, setcurrentPage] = useState(1)
  const [limit, setLimit] = useState(10)


  const quoteContainerRef = useRef(null);

  useEffect(() => {
    fetch('https://dummyjson.com/quotes')
      .then(res => res.json())
      .then(data => setTotal(data.total))
  }, [])

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://dummyjson.com/quotes?limit=${limit}&skip=${skip}`)
      .then(res => res.json())
      .then(data => {
        setQuotes([...data.quotes])
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [skip, limit])

  const pagecount = Math.ceil(total / limit);
  return (
    <>
      <div className="quotes-layout">

        <header className='header'>
          <h1>Quotes</h1>
          <nav>
            <Limit
              limit={limit}
              setLimit={setLimit}
              setSkip={setSkip}
              setcurrentPage={setcurrentPage}
              quoteContainerRef={quoteContainerRef}
            />
          </nav>
        </header>
        <div className='quote-container'>
          {isLoading ? (
            <div className="loader">Loading...</div>
          ) : (
            <Quote quotes={quotes} />
          )}
        </div>

        <div className='pagination-fixed'>
          <Pagination
            currentPage={currentPage}
            setcurrentPage={setcurrentPage}
            limit={limit}
            pagecount={pagecount}
            setSkip={setSkip}
            quoteContainerRef={quoteContainerRef}
          />
        </div>
      </div>
    </>
  )
}


export default App
