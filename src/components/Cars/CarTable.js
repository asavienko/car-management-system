import React from "react";
import { StyledTable } from "./Cars.styles";
import { stringComparator } from "../../utils";
import { Button, message, Space } from "antd";
import { deleteCar } from "../../services/carServices";

const CarTable = ({
  carList,
  listLoading,
  onRow,
  deleteCarById,
  setListLoading,
}) => {
  const columns = [
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      sorter: {
        compare: (a, b) => stringComparator(a.brand, b.brand),
      },
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
      sorter: {
        compare: (a, b) => stringComparator(a.model, b.model),
      },
    },
    {
      title: "Engine",
      dataIndex: "engineType",
      key: "engineType",
      filters: [
        { text: "FUEL", value: "FUEL" },
        { text: "HYBRID", value: "HYBRID" },
        { text: "GAS", value: "GAS" },
      ],
      onFilter: (value, record) => record.engineType.indexOf(value) === 0,
      sorter: (a, b) => stringComparator(a.engineType, b.engineType),
    },
    {
      title: "Number",
      dataIndex: "carNumber",
      key: "carNumber",
      sorter: {
        compare: (a, b) => stringComparator(a.carNumber, b.carNumber),
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, { id }) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={(event) => {
              event.stopPropagation();
              setListLoading(true);
              deleteCar(id)
                .then(() => deleteCarById(id))
                .catch(() => message.error("Something went wrong"))
                .finally(() => setListLoading(false));
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

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
