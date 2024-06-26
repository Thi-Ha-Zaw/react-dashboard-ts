import ReactPaginate from "react-paginate";

type handlePageClick = ({selected} : {selected : number}) => void;

type PaginationUIProps = {
  total: number;
  pageCount: number,
  handlePageClick: handlePageClick,
  to : number
};

const PaginationUI = ({ total, pageCount, handlePageClick, to } : PaginationUIProps) => {
    return (
        <div className=" flex justify-end sm:justify-between items-center">
            <div className=" hidden sm:block">
                <p className=" text-gray-800 text-sm dark:text-gray-300">
                    showing <span className=" font-bold">{to || "0"}</span> of
                    total <span className=" font-bold">{total}</span>
                </p>
            </div>
            <ReactPaginate
                pageCount={pageCount}
                pageRangeDisplayed={2}
                nextLabel="Next"
                previousLabel="Previous"
                previousClassName="page-num-pre"
                nextClassName="page-num-next"
                marginPagesDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                pageLinkClassName="page-num"
                activeClassName={"active"}
                renderOnZeroPageCount={null}
            />
        </div>
    );
};

export default PaginationUI;
