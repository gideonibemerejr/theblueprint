import React, { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import useSWR from 'swr';

import { AdminEmptyState, Table } from '../../../components';
import { getEvents } from '../../../services/events';
import { TABLE_COLUMNS } from '../../../_constants';

const EventsPage = (props) => {
  const { data, error } = useSWR('/blue-sheet-events', getEvents);

  const { setCurrentModal, setOpen } = useOutletContext();
  const columns = useMemo(
    () =>
      TABLE_COLUMNS.INITIAL_EVENT_COLUMNS.reduce(
        (acc, value) => ({ ...acc, [value]: value }),
        {}
      ),
    []
  );
  return (
    <div className='px-4 py-8 sm:px-0'>
      {data?.events?.length > 0 ? (
        <Table
          columns={columns}
          data={data?.events?.map((event) => {
            const newEvent = { ...event?.attributes, id: event.id };

            return newEvent;
          })}
        />
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
