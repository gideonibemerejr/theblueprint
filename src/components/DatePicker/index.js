import { Controller } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';

const DatePicker = ({ control, name }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <ReactDatePicker
          className='input'
          placeholderText='Select date'
          onChange={(e) => field.onChange(e)}
          selected={field.value}
        />
      )}
    />
  );
};

export default DatePicker;
