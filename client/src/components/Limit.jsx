import React from 'react'

const Limit = ({ limit, setLimit, setcurrentPage, setSkip, quoteContainerRef }) => {
    const limitArr = [10, 25, 50]

    const limitChange = async (e) => {
        setLimit(Number(e.target.value));
        setcurrentPage(1);
        setSkip(0);
        if (quoteContainerRef.current) {
            quoteContainerRef.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }
    return (
        <>
            <label htmlFor="limit">Limit: </label>
            <select
                name="limit"
                id="limit" value={limit}
                onChange={(e) => {
                    limitChange(e)
                }}>
                {limitArr.map((item) => (
                    <option key={item} value={item}>{item}</option>
                ))}
            </select>
        </>
    )
}

export default Limit