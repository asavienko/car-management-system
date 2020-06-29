import React from "react";
import { StyledTable } from "./Cars.styles";

const CarTable = ({ carList, columns, listLoading, onRow }) => {
  return (
    <StyledTable
      dataSource={carList}
      rowKey={"id"}
      columns={columns}
      scroll={{ y: 480 }}
      pagination={{ pageSize: 50 }}
      loading={listLoading}
      ellipsis
      onRow={(record, rowIndex) => ({ onClick: () => onRow(record, rowIndex) })}
    />
  );
};

export default CarTable;
