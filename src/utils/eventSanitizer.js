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
  initialData.startTime = moment(startTime).format('HH:mm');
  initialData.endTime = moment(endTime).format('HH:mm:ss');
  initialData.rsvpStatus = {
    status: rsvpStatus,
    price: rest?.price || null,
    ifOther: rest?.ifOther || null,
  };
  initialData.bluesheet = [2];
  let data = {
    ...initialData,
    ...rest,
  };
  if (data?.price) delete data.price;
  if (data?.rsvpStatus) delete data.rsvpStatus;
  return data;
};
export default eventSanitizer;
