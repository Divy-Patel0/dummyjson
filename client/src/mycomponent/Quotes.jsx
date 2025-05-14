import { useEffect, useState } from 'react'

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
        fetch(`https://dummyjson.com/quotes?limit=${pageitem}&skip=${skip}`)
            .then(res => res.json())
            .then(data => setQuotes([...data.quotes]))

    }, [skip, limit])

    const handlePage = (pageNumber) => {
        setSkip((pageNumber - 1) * limit)
        setcurrentPage(pageNumber)
    }
    const pagecount = Math.ceil(total / limit);

    const start = Math.floor((currentPage - 1) / 10 * 10 + 1)
    const end = Math.min((start + 9), pagecount)
    const visiblePages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    return (
        <>
            <header style={{ display: "flex", justifyContent: "flex-end", padding: "10px" }}>
                <nav>
                    <label htmlFor="limit">Limit: </label>
                    <select
                        name="limit"
                        id="limit" value={pageitem} 
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

                <div>
                    <ul>
                        {quotes.map(quote => <li key={quote.id}>{quote.id}. {quote.quote}</li>)}
                    </ul>
                </div>
                <div className='button-array'>
                    {start > 1 && (<button onClick={() => handlePage(start > 10 ? start - 10 : start - 1)}>prev</button>)}

                    {visiblePages.map((page) =>
                    (<button key={page} onClick={() => handlePage(page)}>
                        {page}</button>
                    ))}

                    {end < pagecount && (<button onClick={() => handlePage(end + 1)}>next</button>)}
                </div>

            </div>
        </>
    )
}

export default Quotes