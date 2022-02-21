import { Controller } from 'react-hook-form';
import ReactSelect from 'react-select';

const Select = ({ control, name, isClearable, options }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <ReactSelect
          {...field}
          onChange={(value) => field.onChange(value.value)}
          value={options.find((o) => o.value === field.value)}
          isClearable={isClearable}
          options={options}
        />
      )}
    />
  );
};

export default Select;
