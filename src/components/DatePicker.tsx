import React from "react";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const Picker = styled(DatePicker)`
  padding: 15px 10px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin-bottom: 20px;
  width: 100%;
`;

export const DatePickerField = ({ name, placeholder }: any) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);
  return (
    <Picker
      {...field}
      dateFormat={"dd/MM/yyyy"}
      placeholderText={placeholder}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
    />
  );
};

export default DatePickerField;
