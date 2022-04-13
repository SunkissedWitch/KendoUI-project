import { IValidation, IUser } from '../services/interfaces'

export const nameRegex: RegExp = new RegExp(/^[a-z0-9]+$/i);

export const nameValidator = (value: string) => 
	(value && value.length > 25) 
		? "Max length is 25 characters"
		: nameRegex.test(value) 
      ? ""
      : "Please fill in the form using only a-Z and numeric symbols";

export const userNameValidator = (value: string) => 
  (value && value.length > 15) 
    ? "Max length Username is 15 characters"
    : nameRegex.test(value) 
      ? ""
      : "Please fill in the form using only a-Z and numeric symbols";	


export const checkboxValidator: (value: boolean | undefined) => string = (value) =>
  value === undefined 
  ? "Checkbox is required" 
  : "";


export const formValidator = (values: IUser) => {
  const {
    first_name: firstName, 
    last_name: lastName, 
    user_name: userName, 
    enabled
  } = values;

  let validation: IValidation = {};

  if(!nameRegex.test(firstName)) {
    validation['first_name'] = "Please fill in the form using only a-Z and numeric symbols";
  }

  if(firstName?.length > 25) {
    validation['first_name'] = "You can use maximum 25 characters in this field";
  }

  if(!nameRegex.test(lastName)) {
    validation['last_name'] = "Please fill in the form using only a-Z and numeric symbols";
  }

  if(lastName?.length > 25) {
    validation['last_name'] = "You can use maximum 25 characters in this field";
  }

  if(!userName || !firstName || !lastName) {
    validation['VALIDATION_SUMMARY'] = "Please fill in the form";
  }

  if(`${firstName} ${lastName}`.length > 40) {
    validation['first_name'] = "You can use maximum 25 characters in this field";
    validation['last_name'] = "You can use maximum 25 characters in this field";
    validation['VALIDATION_SUMMARY'] = "Your Full Name can be maximum 40 characters";
  }

  if ( enabled === undefined ) {
    validation['enabled'] = "Please set the value";
  }

  if(!Object.keys(validation).length) {
    return;
  }

  return validation;
};

// * Form validator for use at UserDetail.tsx component

export const formWithValueValidator = (values: IUser) => {

  const {
    first_name: firstName, 
    last_name: lastName, 
    enabled
  } = values;

  let validation: IValidation = {};

  if(!nameRegex.test(firstName)) {
    validation['first_name'] = "Please fill in the form using only a-Z and numeric symbols";
  }

  if(firstName?.length > 25) {
    validation['first_name'] = "You can use maximum 25 characters in this field";
  }

  if(!nameRegex.test(lastName)) {
    validation['last_name'] = "Please fill in the form using only a-Z and numeric symbols";
  }

  if(lastName?.length > 25) {
    validation['last_name'] = "You can use maximum 25 characters in this field";
  }

  if(!firstName || !lastName || enabled === undefined) {
    validation['VALIDATION_SUMMARY'] = "Please fill in the form";
  }

  if(`${firstName} ${lastName}`.length > 40) {
    validation['first_name'] = "You can use maximum 25 characters in this field";
    validation['last_name'] = "You can use maximum 25 characters in this field";
    validation['VALIDATION_SUMMARY'] = "Your Full Name can be maximum 40 characters";
  }

  if ( enabled === undefined ) {
    validation['enabled'] = "Please set the value";
  }

  if(!Object.keys(validation).length) {
    return;
  }

  return validation;
};