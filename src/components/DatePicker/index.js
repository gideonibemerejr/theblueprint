import { Controller } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';

const DatePicker = ({ control, name }) => {
  return (
    <div className='z-50'>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <ReactDatePicker
            className='input mb-4'
            placeholderText='Select date'
            onChange={(e) => field.onChange(e)}
            selected={field.value}
          />
        )}
      />
    </div>
  );
};

export default DatePicker;
