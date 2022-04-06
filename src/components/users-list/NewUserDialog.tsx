import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

import {
  Form,
  Field,
  FormElement,
  FieldRenderProps,
  FormRenderProps,
  FormValidatorType,
} from "@progress/kendo-react-form";

import { Error } from "@progress/kendo-react-labels";
import { Checkbox, Input } from "@progress/kendo-react-inputs";

import { nameValidator, userNameValidator, checkboxValidator, formValidator } from "../../services/validators"



interface IProps {
	dialogClose: () => void;
}

const ValidatedInput = (fieldRenderProps: FieldRenderProps) => {
	const { validationMessage, visited, ...others } = fieldRenderProps;
	return (
		<div>
			<Input {...others} />
			{visited && validationMessage && <Error>{validationMessage}</Error>}
		</div>
	);
};

const ValidatedCheckbox = (fieldRenderProps: FieldRenderProps) => {
	const { validationMessage, visited, value, ...others } = fieldRenderProps;
	return (
		<div>
			<Checkbox value={undefined} {...others} />
			{visited && validationMessage && <Error>{validationMessage}</Error>}
		</div>
	);
};


function NewUserDialog(props: IProps) {
	const { dialogClose } = props;

	const handleSubmit = (dataItem: { [name: string]: any }) => {
    console.log(JSON.stringify(dataItem, null, 2))
	}

  return (
    <>
			<Dialog title={"Add new user"} onClose={() => dialogClose()}>
				<Form
				onSubmit={handleSubmit}
				validator={formValidator}
				render={(formRenderProps: FormRenderProps) => (
					<FormElement style={{minWidth: 400, maxWidth: 650 }}>
						<fieldset className={"k-form-fieldset"}>
            <legend className={"k-form-legend"}>
              Please fill in the following information:
            </legend>
            {formRenderProps.visited &&
              formRenderProps.errors &&
              formRenderProps.errors.VALIDATION_SUMMARY && (
                <div className={"k-messagebox k-messagebox-error"}>
                  {formRenderProps.errors.VALIDATION_SUMMARY}
                </div>
              )}
							
							<div className="mb-3">
								<Field
									name={"user_name"}
									component={ValidatedInput}
									label={"Username"}
									validator={userNameValidator}
								/>
							</div>

							<div className="mb-3">
								<Field
									name={"first_name"}
									component={ValidatedInput}
									label={"First name"}
									validator={nameValidator}
								/>
							</div>

							<div className="mb-3">
								<Field 
								name={"last_name"} 
								component={ValidatedInput} 
								label={"Last name"} 
								validator={nameValidator}
								/>
							</div>

							<div className="my-3">
								<Field
									name={"enabled"}
									component={ValidatedCheckbox}
									label={"Enabled"}
									validator={checkboxValidator}	
								/>
							</div>
						</fieldset>

						<DialogActionsBar>
							<button
								className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
								onClick={() => dialogClose()}
							>
								No
							</button>
							<button
									type={"submit"}
									className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
									disabled={!formRenderProps.allowSubmit}
								>
									Submit
								</button>
						</DialogActionsBar>
					</FormElement>
				)}
				/>
			</Dialog>
    </>
  );
}
export default NewUserDialog;
