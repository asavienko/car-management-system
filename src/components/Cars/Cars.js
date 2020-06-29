import React, { useEffect, useState } from "react";
import { Button, Form, message, Space } from "antd";
import {
  createCar,
  deleteCar,
  getCarList,
  updateCar,
} from "../../services/carServices";
import { StyledButton, StyledDrawer, StyledLayout } from "./Cars.styles";
import CarTable from "./CarTable";
import CarForm from "./CarForm";
import _ from "lodash";
import { stringComparator } from "../../utils";

const Cars = () => {
  const [carList, setCarList] = useState([]);
  const [listLoading, setListLoading] = useState(false);
  const [addCarrVisible, setAddCarVisible] = useState(false);
  const [addCarLoading, setAddCarLoading] = useState(false);
  const [carInfoVisible, setCarInfoVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setListLoading(true);
    getCarList()
      .then(({ cars }) => {
        setCarList(cars);
      })
      .catch(() => message.error("Something went wrong"))
      .finally(() => setListLoading(false));
  }, []);

  const toggleAddCarVisible = () => setAddCarVisible(!addCarrVisible);
  const onAddCarClosed = () => {
    toggleAddCarVisible();
  };

  const onFormFinish = (values) => {
    setAddCarLoading(true);
    createCar(values)
      .then(({ car }) => {
        form.resetFields();
        setAddCarVisible(false);
        setCarList([car, ...carList]);
      })
      .catch((e) => console.log(e))
      .finally(() => setAddCarLoading(false));
  };

  const onRow = (car) => {
    form.setFieldsValue(car);
    setCarInfoVisible(!carInfoVisible);
  };

  const onFullInfoClosed = () => {
    setCarInfoVisible(!carInfoVisible);
    form.resetFields();
  };

  const onValuesChange = _.debounce((changedValues, newValues) => {
    message.loading({ content: "Loading...", key: "carInformation" });
    updateCar(newValues.id, newValues)
      .then(({ car }) => {
        const carListFromStore = [...carList];
        const index = carListFromStore.findIndex(
          (item) => item.id === newValues.id
        );
        carListFromStore.splice(index, 1, car);
        setCarList(carListFromStore);
        message.success({
          content: `${car.brand} ${car.model} has successfully updated`,
          key: "carInformation",
        });
      })
      .catch(() =>
        message.error({
          content: "Something went wrong",
          key: "carInformation",
        })
      );
  }, 1500);
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
              const carListFromStore = [...carList];
              setListLoading(true);
              deleteCar(id)
                .then(() => {
                  const index = carListFromStore.findIndex(
                    (item) => item.id === id
                  );
                  carListFromStore.splice(index, 1);
                  setCarList(carListFromStore);
                })
                .catch((error) => console.log(error))
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
    <StyledLayout>
      <StyledButton type="primary" onClick={toggleAddCarVisible}>
        Add car
      </StyledButton>

      <CarTable
        carList={carList}
        columns={columns}
        listLoading={listLoading}
        onRow={onRow}
      />
      <StyledDrawer
        title="Add a new car"
        visible={addCarrVisible}
        onClose={onAddCarClosed}
      >
        <CarForm
          name="addNew"
          onFormFinish={onFormFinish}
          form={form}
          loading={addCarLoading}
          key="addCar"
        />
      </StyledDrawer>
      <StyledDrawer
        title="Full information"
        visible={carInfoVisible}
        onClose={onFullInfoClosed}
      >
        <CarForm
          name="editCar"
          form={form}
          onValuesChange={onValuesChange}
          key="editCar"
        />
      </StyledDrawer>
    </StyledLayout>
  );
};

export default Cars;
