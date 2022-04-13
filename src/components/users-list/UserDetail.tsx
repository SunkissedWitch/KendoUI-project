import { useEffect, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { fetchUser, editUser } from '../../services/users';
import { observer } from "mobx-react-lite";
import {
  Form,
  Field,
  FormElement,
  FormRenderProps,
} from "@progress/kendo-react-form";
import { ValidatedInput, ValidatedCheckbox }from '../users-list/FormComponents';
import { nameValidator, checkboxValidator, formWithValueValidator } from "../../services/validators";
import { loadingPanel } from '../../services/constants';
import { IUser } from '../../services/interfaces';


const UserDetail = observer (() => {
  const { user } = useParams();
  const navigate: NavigateFunction = useNavigate();

  const [ loaded, setLoaded ] = useState <boolean>(false);

  const [ currentUser, setCurrentUser ] = useState <IUser>({
    user_name: "",
    first_name: "",
    last_name: "",
    enabled: undefined,
  });

  useEffect( () => {
    
    const fetch = async () => {
      const userData: any = await fetchUser(user);
      setCurrentUser(userData); 
      setLoaded(true);
    } 
    fetch();
    
  }, [])

  const { user_name } = currentUser;
 
  const handleSubmit = (dataItem: { [name: string]: any }) => {
    // console.log(JSON.stringify(dataItem, null, 2));
    editUser("/edit_user", dataItem);
    navigate('/');
	}

  return(
    <div className="centered">
      <h2>Edit User</h2>
      {!loaded && loadingPanel}

      <Form
        initialValues={currentUser}
        key={JSON.stringify(currentUser)}
        onSubmit={handleSubmit}
        validator={formWithValueValidator}
        render={(formRenderProps: FormRenderProps) => (
          <FormElement style={{minWidth: 400, maxWidth: 650 }}>
            <fieldset className={"k-form-fieldset"}>
              <legend className={"k-form-legend"}>
              {user_name}
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
                    name={"first_name"}
                    label={"First name"}
                    component={ValidatedInput}
                    validator={nameValidator}
                  />
                </div>

                <div className="mb-3">
                  <Field 
                  name={"last_name"} 
                  label={"Last name"} 
                  component={ValidatedInput} 
                  validator={nameValidator}
                  />
                </div>

                <div className="my-3">
                  <Field
                    name={"enabled"}
                    label={"Enabled"}
                    component={ValidatedCheckbox}
                    validator={checkboxValidator}	
                  />
                </div>
              </fieldset> 


                <button
                  className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                  onClick={() => navigate('/')}
                >
                  Cancel
                </button>
                <button
                    type={"submit"}
                    className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                    disabled={!formRenderProps.allowSubmit}
                  >
                    Submit
                  </button>

          </FormElement>
        )}
      />
    </div> 
  )

})

export default UserDetail;