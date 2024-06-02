import {
  ChevronDoubleLeft,
  ChevronDoubleRight,
  ChevronLeft,
  ChevronRight,
} from "../../../icons";
import { useSearchParams } from "react-router-dom";
import "./tablepagination.css";

const TablePagination = ({ itemCount, pageSize, currentPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) {
    return null;
  }
  const changePage = (page) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  };
  return (
    <div className="pagination">
      <button
        onClick={() => changePage(1)}
        disabled={currentPage === 1}
        className="chevrondoubleleft"
      >
        <ChevronDoubleLeft />
      </button>
      <button
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
        className="chevronleft"
      >
        <ChevronLeft />
      </button>
      <span className="currentpage">
        {currentPage} of {pageCount}
      </span>
      <button
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === pageCount}
        className="chevronright"
      >
        <ChevronRight />
      </button>
      <button
        onClick={() => changePage(pageCount)}
        disabled={currentPage === pageCount}
        className="chevrondoubleright"
      >
        <ChevronDoubleRight />
      </button>
    </div>
  );
};

export default TablePagination;
