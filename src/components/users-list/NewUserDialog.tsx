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
import { getter } from "@progress/kendo-react-common";
import { Checkbox, Input } from "@progress/kendo-react-inputs";

import { nameValidator, userNameValidator, nameRegex, formValidator } from "../../services/validators"



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

function NewUserDialog(props: IProps) {
	const { dialogClose } = props;

	const handleSubmit = (dataItem: { [name: string]: any }) => {
		const usernameL = dataItem.user_name?.length;
		const firstnameL = dataItem.first_name?.length;
		const lastnameL = dataItem.last_name?.length;
		const firstAndLastNameL = firstnameL + lastnameL;
		if( usernameL > 15 || firstnameL > 25 || lastnameL > 25 || firstAndLastNameL > 40 ) {
			console.log("error");
			return;
		}
		// if (dataItem.user_name.length > 15) {
		// 	console.log("error 15");
		// 	return ;
		// }
		// if (dataItem.first_name.length > 25) {
		// 	console.log("error name 25");
		// 	return ;
		// }
		// if (dataItem.last_name.length > 25) {
		// 	console.log("error last name 25");
		// 	return ;
		// }
		// if ((dataItem.last_name.length + dataItem.first_name.length) > 40) {
		// 	console.log("error 40");
		// 	return ;
		// }
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

							<div className="mb-3">
								<Field
									name={"enabled"}
									label={"Enabled"}
									component={Checkbox}
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
