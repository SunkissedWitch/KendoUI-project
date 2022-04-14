import { Error } from "@progress/kendo-react-labels";
import { Checkbox, Input } from "@progress/kendo-react-inputs";
import { FieldRenderProps } from "@progress/kendo-react-form";

export const ValidatedInput = (fieldRenderProps: FieldRenderProps) => {
  const { validationMessage, visited, value, ...others } = fieldRenderProps;
  return (
    <div>
      <Input value={value} {...others} />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
};

export const ValidatedCheckbox = (fieldRenderProps: FieldRenderProps) => {
  const { validationMessage, visited, value, ...others } = fieldRenderProps;
  return (
    <div>
      <Checkbox value={value} {...others} />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
};
