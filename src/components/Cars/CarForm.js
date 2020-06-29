import React from "react";
import { Form, Input, Radio } from "antd";
import { StyledFormItem, StyledSubmitButton } from "./Cars.styles";

const CarForm = ({ onFormFinish, form, loading, onValuesChange, name }) => {
  return (
    <Form
      name={name}
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 19 }}
      onFinish={onFormFinish}
      form={form}
      {...(onValuesChange && { onValuesChange })}
    >
      <Form.Item
        label="Brand"
        name="brand"
        rules={[
          {
            type: "string",
            required: true,
            message: "Please input car's brand!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Model"
        name="model"
        rules={[{ required: true, message: "Please input car's model!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Engine"
        name="engineType"
        rules={[{ required: true, message: "Please choose engine!" }]}
      >
        <Radio.Group>
          <Radio.Button value="FUEL">FUEL</Radio.Button>
          <Radio.Button value="HYBRID">HYBRID</Radio.Button>
          <Radio.Button value="GAS">GAS</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label="Number"
        name="carNumber"
        rules={[{ required: true, message: "Please input car's number!" }]}
      >
        <Input />
      </Form.Item>
      {onFormFinish && (
        <StyledFormItem>
          <StyledSubmitButton
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Submit
          </StyledSubmitButton>
        </StyledFormItem>
      )}
    </Form>
  );
};

export default CarForm;
