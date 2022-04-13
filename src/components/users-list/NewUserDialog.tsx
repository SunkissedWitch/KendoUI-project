import { useState, useContext } from "react";
import { StoreContext } from '../../App';
import { addUser, fetchUser } from '../../services/users';
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
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

	const [ errorState, setErrorState ] = useState<boolean>(false);


	const checkIsUnique = async (userName: string) => {
		const result = await fetchUser(userName);

		return !result;
	}

	const handleSubmit = async (dataItem: { [name: string]: any }) => {
    // console.log(JSON.stringify(dataItem, null, 2));
		const isUnique = await checkIsUnique(dataItem.user_name);

		if (isUnique) {
			addUser("/add_user", dataItem);
			store.addUser(dataItem);
			store.isLoading(false);
			dialogClose();
		};

		if (!isUnique) {
			setErrorState(true)
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
							{errorState &&
								<div className={"k-messagebox k-messagebox-error"}>This Username already exist</div>
							}
							
							<div className="mb-3">
								<Field
									onChange={() => setErrorState(false)}
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
								disabled={!formRenderProps.allowSubmit || errorState}
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
