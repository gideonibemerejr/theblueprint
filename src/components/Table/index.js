import { useEffect, useMemo } from 'react';
import { useTable } from 'react-table';
import moment from 'moment';

import { TABLE_COLUMNS } from '../../_constants';

const Table = ({ columns, data }) => {
  // const memoizedData = useMemo(() => data, [data]);

  const memoizedColumns = useMemo(
    () => [
      columns.staffPick && {
        Header: TABLE_COLUMNS.EVENT_COLUMNS[0].label,
        accessor: TABLE_COLUMNS.INITIAL_EVENT_COLUMNS[0], // accessor is the "key" in the data
        Cell: ({ value }) => (value ? <>&#128175;</> : 'No'),
      },
      columns.name && {
        Header: TABLE_COLUMNS.EVENT_COLUMNS[1].label,
        accessor: TABLE_COLUMNS.INITIAL_EVENT_COLUMNS[1],
        Cell: ({ value, row }) => <a href={row?.original?.link}>{value}</a>,
      },
      columns.status && {
        Header: TABLE_COLUMNS.EVENT_COLUMNS[3].label,
        accessor: (row) => row?.rsvpStatus?.status,
      },
      columns.price && {
        Header: TABLE_COLUMNS.EVENT_COLUMNS[4].label,
        accessor: (row) => row?.rsvpStatus?.price,
        Cell: ({ value }) => value || 'N/A',
      },
      columns.venue && {
        Header: TABLE_COLUMNS.EVENT_COLUMNS[5].label,
        accessor: TABLE_COLUMNS.INITIAL_EVENT_COLUMNS[5],
      },
      columns.startDate && {
        Header: TABLE_COLUMNS.EVENT_COLUMNS[6].label,
        accessor: TABLE_COLUMNS.INITIAL_EVENT_COLUMNS[6],
        Cell: ({ value }) => moment(value).format('MMMM Do'),
      },
      columns.endDate && {
        Header: TABLE_COLUMNS.EVENT_COLUMNS[7].label,
        accessor: TABLE_COLUMNS.INITIAL_EVENT_COLUMNS[7],
        Cell: ({ value }) => moment(value).format('MMMM Do'),
      },
      columns.startTime && {
        Header: TABLE_COLUMNS.EVENT_COLUMNS[8].label,
        accessor: TABLE_COLUMNS.INITIAL_EVENT_COLUMNS[8],
        Cell: ({ value }) => moment(value, 'HH:mm:ss').format('h:mm A'),
      },
      columns.endTime && {
        Header: TABLE_COLUMNS.EVENT_COLUMNS[9].label,
        accessor: TABLE_COLUMNS.INITIAL_EVENT_COLUMNS[9],
        Cell: ({ value }) => moment(value, 'HH:mm:ss').format('h:mm A'),
      },
      columns.isAllWeek && {
        Header: TABLE_COLUMNS.EVENT_COLUMNS[10].label,
        accessor: TABLE_COLUMNS.INITIAL_EVENT_COLUMNS[10],
      },
      columns.freeDrinks && {
        Header: TABLE_COLUMNS.EVENT_COLUMNS[11].label,
        accessor: TABLE_COLUMNS.INITIAL_EVENT_COLUMNS[11],
      },
      columns.freeFood && {
        Header: TABLE_COLUMNS.EVENT_COLUMNS[12].label,
        accessor: TABLE_COLUMNS.INITIAL_EVENT_COLUMNS[12],
      },
      columns.notes && {
        Header: TABLE_COLUMNS.EVENT_COLUMNS[12].label,
        accessor: TABLE_COLUMNS.INITIAL_EVENT_COLUMNS[13],
      },
    ],
    [
      columns.endDate,
      columns.endTime,
      columns.freeDrinks,
      columns.freeFood,
      columns.isAllWeek,
      columns.link,
      columns.name,
      columns.notes,
      columns.price,
      columns.staffPick,
      columns.startDate,
      columns.startTime,
      columns.status,
      columns.venue,
    ]
  );

  const memoizedData = useMemo(() => data, [data]);

  useEffect(() => {
    console.log(memoizedData, memoizedColumns);
  });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: memoizedColumns, data: memoizedData });

  return (
    <div className='flex flex-col'>
      <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
          <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
            <table
              {...getTableProps()}
              className='min-w-full divide-y divide-gray-200'
            >
              <thead className='bg-gray-50'>
                {
                  // Loop over the header rows
                  headerGroups.map((headerGroup) => (
                    // Apply the header row props
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {
                        // Loop over the headers in each row
                        headerGroup.headers.map((column) => (
                          // Apply the header cell props
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                            {...column.getHeaderProps()}
                          >
                            {
                              // Render the header
                              column.render('Header')
                            }
                          </th>
                        ))
                      }
                      {/* <th scope='col' className='relative px-6 py-3'>
                        <span className='sr-only'>Edit</span>
                      </th> */}
                    </tr>
                  ))
                }
              </thead>
              <tbody
                {...getTableBodyProps()}
                className='bg-white divide-y divide-gray-300'
              >
                {
                  // Loop over the table rows
                  rows.map((row, i) => {
                    // Prepare the row for display
                    prepareRow(row);
                    return (
                      // Apply the row props
                      <tr
                        {...row.getRowProps()}
                        className={i % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
                      >
                        {
                          // Loop over the rows cells
                          row.cells.map((cell) => {
                            // Apply the cell props
                            return (
                              <td
                                {...cell.getCellProps()}
                                className='px-6 py-4 whitespace-nowrap text-sm text-black'
                              >
                                {
                                  // Render the cell contents
                                  cell.render('Cell')
                                }
                              </td>
                            );
                          })
                        }
                        {/* <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                          <a href='#' className='text-blue hover:text-black'>
                            Edit
                          </a>
                        </td> */}
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
