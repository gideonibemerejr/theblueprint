import { Controller } from 'react-hook-form';
import ReactTimePicker from 'rc-time-picker';
import moment from 'moment';

const format = 'h:mm a';
const now = moment().hour(0).minute();
const TimePicker = ({ control, name, containerId }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <ReactTimePicker
          className='z-50'
          defaultValue={now}
          showSecond={false}
          format={format}
          use12Hours
          onChange={(e) => field.onChange(e)}
          value={field.value}
          getPopupContainer={(node) => {
            return document.getElementById(containerId);
          }}
        />
      )}
    />
  );
};

export default TimePicker;
