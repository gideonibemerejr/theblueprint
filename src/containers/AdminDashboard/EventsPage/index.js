import React, { useMemo, useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import useSWR from 'swr';
import queryString from 'query-string';
import { pickBy } from 'lodash';
import { Switch } from '@headlessui/react';
import moment from 'moment';

import {
  Table,
  AdminEmptyState,
  Cards,
  Pagination,
  SortDropdown,
} from '../../../components';
import { notification } from '../../../services';
import { getEvents } from '../../../services/events';
import {
  FESTIVAL_DAYS,
  TABLE_COLUMNS,
  VIEW_TYPES,
  SORT_OPTIONS,
} from '../../../_constants';

const EventsPage = (props) => {
  const [view, setView] = useState(VIEW_TYPES.CARDS);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(25);
  const [currentDate, setCurrentDate] = useState(FESTIVAL_DAYS[0].value);
  const [currentSort, setCurrentSort] = useState(SORT_OPTIONS[0].value);
  const nextPage = () => setPage((prevState) => prevState + 1);
  const prevPage = () => setPage((prevState) => prevState - 1);
  const params = queryString.stringify(
    pickBy({
      populate: '*',
    }),
    {
      encodeValuesOnly: true,
    }
  );
  const { data, error } = useSWR(
    `/blue-sheet-events?${params}&pagination[page]=${page}&pagination[pageSize]=${pageSize}${
      currentDate !== '*'
        ? `&filters[startDate][$eq]=${moment(currentDate).format()}`
        : ''
    }${currentSort !== 'none' ? `&sort=${currentSort}` : ''}`,
    getEvents
  );

  useEffect(() => {
    if (error) notification.error(error.message);
  }, [error]);
  const { setCurrentModal, setOpen } = useOutletContext();

  const columns = useMemo(
    () =>
      TABLE_COLUMNS.INITIAL_EVENT_COLUMNS.reduce(
        (acc, value) => ({ ...acc, [value]: value }),
        {}
      ),
    []
  );

  const renderBlueprint = () => {
    switch (view) {
      case VIEW_TYPES.TABLE:
        return (
          <Table
            columns={columns}
            data={data?.events?.map((event) => {
              const newEvent = { ...event?.attributes, id: event.id };

              return newEvent;
            })}
          />
        );
      case VIEW_TYPES.CARDS:
        return (
          <Cards
            data={data?.events?.map((event) => {
              const newEvent = { ...event?.attributes, id: event.id };

              return newEvent;
            })}
          />
        );

      default:
        break;
    }
  };

  return (
    <>
      <div className='flex sm:items-center justify-between'>
        <div className='flex flex-col sm:flex-row mt-4'>
          <div className='mb-4 sm:mr-4'>
            <SortDropdown
              label='Festival Day'
              options={FESTIVAL_DAYS}
              onChange={setCurrentDate}
            />
          </div>

          <SortDropdown
            label='Sort By'
            options={SORT_OPTIONS}
            onChange={setCurrentSort}
          />
        </div>
        <div className='flex flex-col mt-4'>
          <label className='block text-sm font-medium text-gray-300'>{`${
            view === VIEW_TYPES.CARDS ? 'Card' : 'Table'
          } View`}</label>
          <ViewSwitch
            enabled={view === VIEW_TYPES.CARDS}
            setEnabled={setView}
          />
        </div>
      </div>
      <div className='px-4 py-8 sm:px-0'>
        {data?.events?.length > 0 ? (
          renderBlueprint()
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
      <Pagination
        page={page}
        perPage={pageSize}
        pageCount={data?.meta?.pagination?.pageCount}
        total={data?.meta?.pagination?.total}
        handleNext={nextPage}
        handlePrevious={prevPage}
      />
    </>
  );
};

export default EventsPage;

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function ViewSwitch({ enabled, setEnabled }) {
  return (
    <Switch
      checked={enabled}
      onChange={() =>
        setEnabled((prevState) =>
          prevState === VIEW_TYPES.CARDS ? VIEW_TYPES.TABLE : VIEW_TYPES.CARDS
        )
      }
      className={classNames(
        enabled ? 'bg-green-600' : 'bg-gray-200',
        'mt-2 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
      )}
    >
      <span className='sr-only'>Use setting</span>
      <span
        className={classNames(
          enabled ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
        )}
      >
        <span
          className={classNames(
            enabled
              ? 'opacity-0 ease-out duration-100'
              : 'opacity-100 ease-in duration-200',
            'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
          )}
          aria-hidden='true'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-3 w-3 text-gray-400'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
              clipRule='evenodd'
            />
          </svg>
        </span>
        <span
          className={classNames(
            enabled
              ? 'opacity-100 ease-in duration-200'
              : 'opacity-0 ease-out duration-100',
            'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
          )}
          aria-hidden='true'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-3 w-3 text-green-600'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path d='M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z' />
          </svg>
        </span>
      </span>
    </Switch>
  );
}
