import * as React from "react";
import Paginate from "rc-pagination";
import "./Pagination.css";

interface IPaginationProps {
  current: number;
  total: number;
  perPage: number;
  handleChange: (current: number, pageSize: number) => void;
}

const Pagination: React.FunctionComponent<IPaginationProps> = ({
  current,
  total,
  perPage,
  handleChange,
}) => {
  return (
    <>
      <Paginate
        pageSize={perPage}
        defaultCurrent={current}
        total={total}
        style={{ margin: "100px" }}
        onChange={handleChange}
      />
    </>
  );
};

export default Pagination;
