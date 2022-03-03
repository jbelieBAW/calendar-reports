import React from 'react';
import ReactDOM from 'react-dom';
import CalendarReports from './CalendarReports';

var calendarReports = ReactDOM.render(
  <CalendarReports/>,
  document.getElementsByName('react-control-root')[0]
);

window.CalendarReports = calendarReports;
