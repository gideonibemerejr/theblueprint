import { GENDERS } from '../_constants';

const userRegistrationSanitizer = ({
  city = '',
  zipCode = '',
  country = '',
  austinLocal = false,
  email = '',
  gender = GENDERS[1].value,
  ...rest
}) => {
  let initialData = {};

  initialData.residence = {
    city: austinLocal ? 'Austin' : city,
    zipCode,
    country,
  };
  initialData.username = email;

  let data = {
    ...rest,
    ...initialData,
    email,
    austinLocal,
    gender: gender !== '' ? gender : GENDERS[0].value,
  };

  return data;
};

export default userRegistrationSanitizer;
