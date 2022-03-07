import { useMemo } from 'react';
import { LocationMarkerIcon } from '@heroicons/react/solid';
import { TicketIcon } from '@heroicons/react/outline';
import { startCase } from 'lodash';
import moment from 'moment';

import Emoji from '../Emoji';

export default function Cards({ data }) {
  const memoizedData = useMemo(() => data, [data]);

  return (
    <ul
      role='list'
      className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
    >
      {memoizedData.map((event) => {
        const query = event?.venue.split(' ').join('+');

        return (
          <li
            key={event.id}
            className='col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200'
          >
            <div className='w-full flex items-center justify-between p-6 space-x-6'>
              <div className='flex-1'>
                <div className='flex items-center justify-between space-x-3 mb-4'>
                  <h3 className='text-gray-900 text-xl font-medium truncate'>
                    {event.name}
                  </h3>
                  <span className='flex-shrink-0 inline-block px-2 py-0.5  font-medium '>
                    {event.staffPick ? (
                      <Emoji symbol='🅿️ ' label='true' />
                    ) : null}
                  </span>
                </div>
                {event?.startTime && (
                  <p className='mt-1 text-gray-800  truncate'>
                    <strong className='mr-2'>Starts:</strong>
                    {moment(event?.startTime, 'h:mm a').format('h:mm a')}
                  </p>
                )}
                {event?.endTime && (
                  <p className='mt-1 text-gray-800  truncate'>
                    <strong className='mr-2'>Ends:</strong>
                    {moment(event?.endTime, 'h:mm a').format('h:mm a')}
                  </p>
                )}
                {event?.venue && (
                  <p className='mt-1 text-gray-800  truncate'>
                    <strong className='mr-2'>Location:</strong>
                    {startCase(event?.venue)}
                  </p>
                )}
                {event?.freeDrinks && (
                  <p className='mt-1 text-gray-800  truncate'>
                    <strong className='mr-2'>Free Drinks? </strong>
                    {event?.freeDrinks ? (
                      <Emoji symbol='🥃' label='true' />
                    ) : (
                      'Nope'
                    )}
                  </p>
                )}
                {event?.venue && (
                  <p className='mt-1 text-gray-800  truncate'>
                    <strong className='mr-2'>Free Food?</strong>
                    {event?.freeDrinks ? (
                      <Emoji symbol='🌮 ' label='true' />
                    ) : (
                      'Nope'
                    )}
                  </p>
                )}
                {event?.rsvpStatus?.status && (
                  <p className='mt-1 text-gray-800  truncate'>
                    <strong className='mr-2'>RSVP Status:</strong>
                    {startCase(event?.rsvpStatus?.status)}
                  </p>
                )}
                {event?.price && (
                  <p className='mt-1 text-gray-800  truncate'>
                    <strong className='mr-2'>Price:</strong>
                    {startCase(event?.price)}
                  </p>
                )}
                {event?.notes && (
                  <p className='mt-1 text-gray-800'>
                    <strong className='mr-2'>Notes:</strong>
                    {startCase(event?.notes)}
                  </p>
                )}
              </div>
            </div>
            <div>
              <div className='-mt-px flex divide-x divide-gray-200'>
                {event?.link && (
                  <div className='w-0 flex-1 flex'>
                    <a
                      href={event?.link}
                      target='_blank'
                      rel='noreferrer'
                      className='relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4  text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500'
                    >
                      <TicketIcon
                        className='w-5 h-5 text-gray-400'
                        aria-hidden='true'
                      />
                      <span className='ml-3'>Link</span>
                    </a>
                  </div>
                )}
                <div className='-ml-px w-0 flex-1 flex'>
                  <a
                    href={`http://maps.google.com/maps?q=${query},+Austin,+Texas`}
                    target='_blank'
                    rel='noreferrer'
                    className='relative w-0 flex-1 inline-flex items-center justify-center py-4  text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500'
                  >
                    <LocationMarkerIcon
                      className='w-5 h-5 text-gray-400'
                      aria-hidden='true'
                    />
                    <span className='ml-3'>Map</span>
                  </a>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
