import React from 'react';
import { useOutletContext } from 'react-router-dom';
import useSWR from 'swr';

import { AdminEmptyState } from '../../../components';
import { getEvents } from '../../../services/events';

const EventsPage = (props) => {
  const { data, error } = useSWR('/blue-sheet-events', getEvents);

  const { setCurrentModal, setOpen } = useOutletContext();
  return (
    <div className='px-4 py-8 sm:px-0'>
      {data?.events?.length > 0 ? (
        <div>theres some</div>
      ) : (
        <AdminEmptyState
          setCurrentModal={setCurrentModal}
          setOpen={setOpen}
          type='event'
          plural='events'
          modalType='CREATE_EVENT'
        />
      )}
    </div>
  );
};

export default EventsPage;
