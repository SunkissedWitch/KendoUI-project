import React, { useState, useContext } from "react";
import { StoreContext } from '../../App';
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { addUser, fetchUser } from '../../services/users';

import {
  Form,
  Field,
  FormElement,
  FormRenderProps
} from "@progress/kendo-react-form";

import { nameValidator, userNameValidator, checkboxValidator, formValidator } from "../../services/validators"
import { ValidatedInput, ValidatedCheckbox } from '../users-list/FormComponents';

interface IProps {
	dialogClose: () => void;
}


function NewUserDialog(props: IProps) {
	const store: any = useContext(StoreContext);
	const { dialogClose } = props;


	const unique = async (userName: string) => {
		const result = await fetchUser(userName);
		console.log( "fetchUser", result )
		if (result) {
			console.log("not unique");
			return false;
		}
		return true;
	}

	const handleSubmit = async (dataItem: { [name: string]: any }) => {
    console.log(JSON.stringify(dataItem, null, 2));
		const isUnique = await unique(dataItem.user_name);

		if (isUnique) {
			console.log("unique");
			addUser(dataItem);
			store.addUser(dataItem);
			dialogClose();			
		};

	}

  return (
    <>
			<Dialog title={"Add new user"} onClose={() => dialogClose()}>
				<Form
				initialValues={{enabled: undefined}}
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
