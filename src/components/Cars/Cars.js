import React, { useEffect, useState } from "react";
import { Form, message } from "antd";
import { createCar, getCarList, updateCar } from "../../services/carServices";
import { StyledButton, StyledDrawer, StyledLayout } from "./Cars.styles";
import CarTable from "./CarTable";
import CarForm from "./CarForm";
import _ from "lodash";

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
      .catch(() => message.error("Something went wrong"))
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
    form.validateFields().then(() => {
      message.loading({ content: "Loading...", key: "carInformation" });
      updateCar(newValues.id, newValues)
        .then(({ updatedCar }) => {
          const updatedCarList = carList.map((storedCar) =>
            storedCar.id === newValues.id ? updatedCar : storedCar
          );
          setCarList(updatedCarList);
          message.success({
            content: `${updatedCar.brand} ${updatedCar.model} has successfully updated`,
            key: "carInformation",
          });
        })
        .catch(() =>
          message.error({
            content: "Something went wrong",
            key: "carInformation",
          })
        );
    });
  }, 1500);

  const deleteCarById = (id) => {
    const filteredCarList = carList.filter((item) => item.id !== id);
    setCarList(filteredCarList);
  };

  return (
    <StyledLayout>
      <StyledButton type="primary" onClick={toggleAddCarVisible}>
        Add car
      </StyledButton>
      <CarTable
        carList={carList}
        listLoading={listLoading}
        onRow={onRow}
        deleteCarById={deleteCarById}
        setListLoading={(value) => setListLoading(value)}
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
