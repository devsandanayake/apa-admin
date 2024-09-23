import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';  // Import the CSS for react-big-calendar
import { viewEachLongrent } from '../../actions/longrentAction';
import {fetchDataSpecific} from '../../actions/postAction';

// Set up moment as localizer for react-big-calendar
const localizer = momentLocalizer(moment);

export default function Calendar() {
  const { adCode } = useParams();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.longrent);
  const post = useSelector((state) => state.data.data);

  

  useEffect(() => {
    dispatch(viewEachLongrent(adCode));
    dispatch(fetchDataSpecific(adCode));
  }, [dispatch, adCode]);

   

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Transforming the data into events for the calendar
  const events = data.map((item) => {
    return {
      title: item.adminKeyStatus === 'Approved' ? 'Paid Rental' : 'Unpaid Rental',
      start: new Date(item.rentalStartDate),
      end: new Date(item.rentalEndDate),
      allDay: true,
    };
  });

  // Custom event style getter
  const eventStyleGetter = (event) => {
    const backgroundColor = event.title === 'Paid Rental' ? 'lightgreen' : 'yellow';
    const style = {
      backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'black',
      border: '0px',
      display: 'block',
    };
    return {
      style,
    };
  };

  return (
       <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Calendar</h1>
    
      <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow-sm">
        <p className="text-lg font-semibold text-gray-700">Apartment - {post.title}</p>
        <p className="text-md text-gray-600">Publish Date - {new Date(post.publishedAt).toLocaleDateString()}</p>
      </div>
    
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          eventPropGetter={eventStyleGetter}
        />
      </div>
    </div>
  );
}