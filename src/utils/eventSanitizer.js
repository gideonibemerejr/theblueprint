import moment from 'moment';

const eventSanitizer = ({
  endDate = '',
  endTime = '',
  rsvpStatus = 'not_open',
  startDate = '',
  startTime = '',
  ...rest
}) => {
  let initialData = {};
  initialData.endDate = moment(endDate).format('YYYY-MM-DD');
  initialData.startDate = moment(startDate).format('YYYY-MM-DD');
  initialData.startTime = moment(startTime).format('HH:mm:ss.SSS');
  initialData.endTime = moment(endTime).format('HH:mm:ss.SSS');
  initialData.rsvpStatus = {
    status: rsvpStatus,
    price: rest?.price || null,
    ifOther: rest?.ifOther || null,
  };
  initialData.bluesheet = [2];
  let data = {
    ...rest,
    ...initialData,
  };
  console.log('sanitized data', data);
  return data;
};
export default eventSanitizer;
