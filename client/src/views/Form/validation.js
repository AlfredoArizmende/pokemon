const regexName = /^[a-z]+$/;


export const validate = (inputs) => {
  let errors = {};

  if (!regexName.test(inputs.name)) errors.name = 'Must be lowercase and only letters';
  if (!inputs.name) errors.name = 'This field is required';

  if (!inputs.image) errors.image = 'This field is required';

  if (inputs.hp === '0') errors.hp = 'It must be greater than 0';
  if (inputs.attack === '0') errors.attack = 'It must be greater than 0';
  if (inputs.defense === '0') errors.defense = 'It must be greater than 0';

  if (inputs.types.length < 1) errors.types = 'Choose at least one type';

  return errors;
}