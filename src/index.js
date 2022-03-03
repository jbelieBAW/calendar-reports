import React from 'react';
import ReactDOM from 'react-dom';
import CalendarReports from './CalendarReports';

var calendarReports = ReactDOM.render(
  <CalendarReports/>,
  document.getElementById('root')
);

window.CalendarReports = calendarReports;
