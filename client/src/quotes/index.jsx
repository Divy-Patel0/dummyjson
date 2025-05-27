import { useEffect, useState } from 'react'
import Pagination from './components/Pagination';
import Quote from './components/Quote';

function Quotes() {
    const [quotes, setQuotes] = useState([{}]);
    const [total, setTotal] = useState(0);
    const [skip, setSkip] = useState(0);
    const [currentPage, setcurrentPage] = useState(1)
    const [limit, setLimit] = useState(10)

    useEffect(() => {
        fetch('https://dummyjson.com/quotes')
            .then(res => res.json())
            .then(data => setTotal(data.total))
    }, [])

    useEffect(() => {
        fetch(`https://dummyjson.com/quotes?limit=${limit}&skip=${skip}`)
            .then(res => res.json())
            .then(data => setQuotes([...data.quotes]))

    }, [skip, limit])

    const pagecount = Math.ceil(total / limit);
    return (
        <>
            <header>
                <h1>Quotes</h1>
                <nav>
                    <label htmlFor="limit">Limit: </label>
                    <select
                        name="limit"
                        id="limit" value={limit} 
                        onChange={(e) => 
                        { 
                            setLimit(Number(e.target.value)); 
                            setcurrentPage(1); 
                            setSkip(0) }}>
                        <option value="10" >10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                </nav>
            </header>
            <div className='container'>

                <Quote quotes={quotes}/>
                <Pagination 
                    currentPage = {currentPage}
                    setcurrentPage = {setcurrentPage}
                    limit = {limit}
                    pagecount = {pagecount}
                    setSkip = {setSkip}
                />

            </div>
        </>
    )
}

export default Quotes