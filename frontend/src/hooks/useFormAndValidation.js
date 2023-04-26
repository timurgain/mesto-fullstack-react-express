import React from "react";

function useFormAndValidation(
  initialValues = {},
  initialErrors = {},
  initialIsValid = true
) {
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState(initialErrors);
  const [isValid, setIsValid] = React.useState(initialIsValid);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: evt.target.validationMessage });
    setIsValid(evt.target.closest("form").checkValidity());
  }

  const resetForm = React.useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
    setValues,
    setErrors,
  };
}

export default useFormAndValidation;
