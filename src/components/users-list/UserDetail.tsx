import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUser } from '../../services/users';
import {
  Form,
  Field,
  FormElement,
  FormRenderProps,
} from "@progress/kendo-react-form";
import { ValidatedInput, ValidatedCheckbox }from '../users-list/FormComponents';
import { nameValidator, checkboxValidator, formWithValueValidator } from "../../services/validators"

const UserDetail = () => {
  const { user } = useParams();
  const navigate = useNavigate();

  const [ currentUser, setCurrentUser ] = useState({
    user_name: "",
    first_name: "",
    last_name: "",
    enabled: undefined,
  });

  useEffect( () => {
    
    const fetch = async () => {
      const userData: any = await fetchUser(user);  
      console.log("userData", userData)
      setCurrentUser(userData); 
    } 
    fetch();
    
  }, [])

  console.log("currentUser", currentUser);

  const { user_name, first_name, last_name, enabled } = currentUser;
 
  const handleSubmit = (dataItem: { [name: string]: any }) => {
    console.log(JSON.stringify(dataItem, null, 2));
    
	}

  
  return(
    <div className="centered">
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

}

export default UserDetail;