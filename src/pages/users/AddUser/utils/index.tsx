interface Errors {
  [key: string]: string;
}

export const validate = (values: any): Errors => {
  const errors: Errors = {};

  if (!values.Name) {
    errors.Name = '*Required Name';
  }

  if (!values.Email) {
    errors.Email = '*Required Email';
  } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.Email)) {
    errors.Email = '*Invalid Email';
  }

  if (!values.Mobile) {
    errors.Mobile = '*Required Mobile';
  } else if (!/[7-9]\d{9}/.test(values.Mobile)) {
    errors.Mobile = '*Invalid Mobile';
  }

  if (!values.City) {
    errors.City = '*Required City';
  }

  return errors;
};
