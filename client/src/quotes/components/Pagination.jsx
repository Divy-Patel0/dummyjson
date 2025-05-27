import React from 'react'

function Pagination({ currentPage, setcurrentPage, setSkip, limit, pagecount }) {
  const handlePage = (pageNumber) => {
    setSkip((pageNumber - 1) * limit)
    setcurrentPage(pageNumber)
  }


  const start = Math.floor((currentPage - 1) / 10 * 10 + 1)
  const end = Math.min((start + 9), pagecount)
  const visiblePages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <>
      <div className='button-array'>
        {start > 1 && (<button onClick={() => handlePage(start > 10 ? start - 10 : start - 1)}>prev</button>)}

        {visiblePages.map((page) =>
        (<button key={page} onClick={() => handlePage(page)}>
          {page}</button>
        ))}

        {end < pagecount && (<button onClick={() => handlePage(end + 1)}>next</button>)}
      </div>
    </>
  )
}

export default Pagination