import './Quote.css';

function Quote({ quotes }) {
    return (
        <>
            {/* <div className='quote-container'> */}
                <ul className='quote-list'>
                    {quotes.map((quote, index) => <li key={index}>
                        <span className='quote-text'>{quote.id}. {quote.quote}</span>
                        <span className='quote-author'> - {quote.author || "unknown"}</span>
                    </li>
                    )}
                </ul>
            {/* </div> */}
        </>
    )
}

export default Quote