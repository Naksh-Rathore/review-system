import "./Paginate.css"

function Paginate({ totalReviews, setPage, page }) {
    const nextPage = () => {
        if (page * 3 < totalReviews) {
            setPage(p => p + 1)
        }
    }

    const previousPage = () => {
        if (page > 1) {
            setPage(p => p - 1)
        }
    }

    return (
        <div className="pagination">
            <button onClick={previousPage}>Previous Page</button>
            <button onClick={nextPage}>Next Page</button>
        </div>
    )
}   

export default Paginate