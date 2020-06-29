import styled from "styled-components";
import { Button, Drawer, Form, Table } from "antd";

export const StyledTable = styled(Table)`
  min-width: 650px;
  padding: 10px 50px;
  .ant-table-body {
    max-height: calc(100vh - 175px) !important;
  }
`;

export const StyledLayout = styled.div`
  min-width: 650px;
`;

export const StyledButton = styled(Button)`
  float: right;
  margin: 10px 50px;
  z-index: 100;
`;

export const StyledDrawer = styled(Drawer)`
  .ant-drawer-content-wrapper {
    max-width: 500px !important;
    width: 100% !important;
  }
`;

export const StyledSubmitButton = styled(Button)`
  width: 100%;
`;

export const StyledFormItem = styled(Form.Item)`
  display: flex;
  justify-content: flex-end;
`;
