import React from 'react'

function Quote({ quotes }) {
    return (
        <>
            <div>
                <ul>
                    {quotes.map((quote, index) => <li key={index}>{quote.id}. {quote.quote}&nbsp;- <em>{quote.author || unknown}</em></li>)}
                </ul>
            </div>
        </>
    )
}

export default Quote