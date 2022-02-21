import { Switch as HeadlessSwitch } from '@headlessui/react';
import { Controller } from 'react-hook-form';

const SwitchBase = ({ onChange, isChecked, label, description }) => {
  return (
    <HeadlessSwitch.Group
      as='div'
      className='flex items-center justify-between'
    >
      <span className='flex-grow flex flex-col'>
        <HeadlessSwitch.Label
          as='span'
          className='text-sm font-medium text-gray-900'
          passive
        >
          {label}
        </HeadlessSwitch.Label>
        <HeadlessSwitch.Description as='span' className='text-sm text-gray-500'>
          {description}
        </HeadlessSwitch.Description>
      </span>
      <HeadlessSwitch
        checked={isChecked}
        onChange={onChange}
        className={`
          ${
            isChecked ? 'bg-emerald-500' : 'bg-gray-200'
          } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
        `}
      >
        <span
          aria-hidden='true'
          className={`
            ${isChecked ? 'translate-x-5' : 'translate-x-0'}
            pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200
          `}
        />
      </HeadlessSwitch>
    </HeadlessSwitch.Group>
  );
};

export default function Switch({ control, name, ...rest }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <SwitchBase
          {...rest}
          onChange={(e) => field.onChange(e)}
          isChecked={field.value}
        />
      )}
    />
  );
}
