import { XIcon } from '@heroicons/react/solid';
import { toast, Slide } from 'react-toastify';
import {
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationIcon,
} from '@heroicons/react/outline';

import { NOTIFICATION_TYPES } from '../_constants';
const DEFAULT_NOTIFICATION = {
  transition: Slide,
  draggable: false,
  hideProgressBar: true,
  autoClose: 4000,
  closeOnClick: true,
  position: toast.POSITION.TOP_LEFT,
};

const getNotificationIcon = (type) => {
  switch (type) {
    case NOTIFICATION_TYPES.SUCCESS:
      return {
        icon: CheckCircleIcon,
        iconProps: {
          className: 'h-6 w-6 text-green-600',
          'aria-hidden': 'true',
        },
        heading: 'Its Lit',
      };
    case NOTIFICATION_TYPES.INFO:
      return {
        icon: InformationCircleIcon,
        iconProps: {
          className: 'h-6 w-6 text-green-600',
          'aria-hidden': 'true',
        },
        heading: 'Info',
      };
    case NOTIFICATION_TYPES.WARNING:
      return {
        icon: ExclamationIcon,
        iconProps: {
          className: 'h-6 w-6 text-yellow-600',
          'aria-hidden': 'true',
        },
        heading: 'Ayo...',
      };
    case NOTIFICATION_TYPES.ERROR:
      return {
        icon: ExclamationIcon,
        iconProps: {
          className: 'h-6 w-6 text-red-600',
          'aria-hidden': 'true',
        },
        heading: 'Error',
      };
    default:
      break;
  }
};

const NotificationBody = ({ type, text, closeToast, toastProps }) => {
  const { icon: Component, iconProps, heading } = getNotificationIcon(type);

  return (
    <div className=''>
      <div className='flex items-start'>
        <div className='flex-shrink-0'>
          <Component {...iconProps} />
        </div>
        <div className='ml-3 w-0 flex-1 pt-0.5'>
          <p className='text-sm font-medium text-gray-900'>{heading}</p>
          <p className='mt-1 text-sm text-gray-500'>{text}</p>
        </div>
      </div>
    </div>
  );
};

export const info = (notification) =>
  toast(
    <NotificationBody type={NOTIFICATION_TYPES.INFO} text={notification} />,
    DEFAULT_NOTIFICATION
  );

export const success = (notification) =>
  toast(
    <NotificationBody type={NOTIFICATION_TYPES.SUCCESS} text={notification} />,
    DEFAULT_NOTIFICATION
  );

export const warning = (notification) =>
  toast(
    <NotificationBody type={NOTIFICATION_TYPES.WARNING} text={notification} />,
    DEFAULT_NOTIFICATION
  );

export const error = (notification) =>
  toast(
    <NotificationBody type={NOTIFICATION_TYPES.ERROR} text={notification} />,
    DEFAULT_NOTIFICATION
  );

export const removeNotifications = () => toast.dismiss();

//  <>
//    {/* Global notification live region, render this permanently at the end of the document */}
//    <div
//      aria-live='assertive'
//      className='fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start'
//    >
//      <div className='w-full flex flex-col items-center space-y-4 sm:items-end'>
//        {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
//      </div>
//    </div>
//  </>;
