import React from 'react'

function Pagination({ currentPage, setcurrentPage, setSkip, limit, pagecount }) {

  const handlePage = (pageNumber) => {
    setSkip((pageNumber - 1) * limit)
    setcurrentPage(pageNumber)
    window.scrollTo({ top: 120, behavior: 'smooth' });
  }

  
  let start = Math.floor((currentPage - 1) / 10 * 10 + 1)
  // recheck the code for fixed length pagination
  if (start > pagecount-10) {
    start = Math.max(1, pagecount - 9)
  }
  const end = Math.min(start + 9, pagecount)
  const visiblePages = Array.from({ length: 10}, (_, i) => start + i);

  return (
    <>
      <div className='button-array'>
        {start !==1 && (<button onClick={() => handlePage(1)}>goto first page</button>)}

        {currentPage > 1 && (<button onClick={() => handlePage( currentPage - 1)}>prev</button>)}

        {visiblePages.map((page) =>
        (<button  className={page === currentPage ? 'active' : ''} key={page} onClick={() => handlePage(page)}>
          {page}</button>
        ))}

        {currentPage < pagecount && (<button onClick={() => handlePage(currentPage + 1)}>next</button>)}

         {currentPage < pagecount  && (<button onClick={() => handlePage(pagecount)}>goto last page</button>)}
      </div>
    </>
  )
}

export default Pagination