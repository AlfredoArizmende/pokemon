const regexName = /^[a-z]+$/;
const regexImage = /(http(s?):)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg|.gif)(\?[^\s[",><]*)?/;


export const validate = (inputs) => {
  let errors = {};

  if (!regexName.test(inputs.name)) errors.name = 'Must be lowercase and only letters';
  if (!inputs.name) errors.name = 'This field is required';

  if (!regexImage.test(inputs.image)) errors.image = 'Must be a link to an image';
  if (!inputs.image) errors.image = 'This field is required';

  if (inputs.hp === '0') errors.hp = 'It must be greater than 0';
  if (inputs.attack === '0') errors.attack = 'It must be greater than 0';
  if (inputs.defense === '0') errors.defense = 'It must be greater than 0';
  if (inputs.speed === '0') errors.speed = 'It must be greater than 0';
  if (inputs.height === '0') errors.height = 'It must be greater than 0';
  if (inputs.weight === '0') errors.weight = 'It must be greater than 0';

  if (inputs.types.length < 1) errors.types = 'Choose at least one type';

  return errors;
}