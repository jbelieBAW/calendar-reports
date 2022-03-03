import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import $, { event } from 'jquery';

import "./CalendarReports.css";
import 'react-big-calendar/lib/css/react-big-calendar.css';

/**
* TRANSLATIONS
*/
const localizer = momentLocalizer(moment) // or globalizeLocalizer

const defaultMessages_fr = {
    date: 'Date',
    time: 'Heure',
    event: 'Evènement',
    allDay: 'Toute la journée',
    week: 'Semaine',
    work_week: 'Semaine de travail',
    day: 'Jour',
    month: 'Mois',
    previous: 'Précédent',
    next: 'Suivant',
    yesterday: 'Hier',
    tomorrow: 'Demain',
    today: "Aujourd'hui",
    agenda: 'Agenda',
    noEventsInRange: "Il n'y a pas d'évènements dans cette période.",
    deleteButton: "SUPPRIMER",
    showMore: function showMore(total) {
        return "+" + total + " de plus";
    }
};

const defaultMessages_en = {
    date: 'Date',
    time: 'Time',
    event: 'Event',
    allDay: 'All Day',
    week: 'Week',
    work_week: 'Work Week',
    day: 'Day',
    month: 'Month',
    previous: 'Back',
    next: 'Next',
    yesterday: 'Yesterday',
    tomorrow: 'Tomorrow',
    today: 'Today',
    agenda: 'Agenda',
    noEventsInRange: 'There are no events in this range.',
    deleteButton: "DELETE",
    showMore: function showMore(total) {
        return "+" + total + " more";
    }
};

/**
* HTML Renderer
*/
function Event({event}) {
	let cssClass = "";
	
	return (
		<div class = {cssClass} style = {{ backgroundColor: event.bgcolor, borderLeft: '8px solid ' + event.color }}  >
			<span class='dcc-event-title'>{event.type}</span>
		</div> 
	)    
}


class CalendarReports extends Component {

    constructor(props) {
        super(props);
		
        this.state = {
            defaultCulture: '',
            defaultMessages: {},
            defaultDeleteButtonText: '',
            events: []
        };
		this.eventsObject = {};
		this.eventsArray = [];
		this.eventsArrayGroupByDate = [];
		this.currentCulture = '';
		this.currentDefaultMessages = {};
		this.localizer = momentLocalizer(moment);
		this.dateFormats = {
			agendaDateFormat: function (date, culture, localizer) {
				return localizer.format(date, 'DD ddd', culture);
			}
		};
		

		
    };

	/**
	* Navigate to DCR & SIR
	*/
	navigateTo(event) {
		if(event.URL) {
			window.location.href = decodeURI(event.URL);
		}
	}

	/**
	* Initialization method
	*/
    componentDidMount() {
        if ($('[name="com.dcr.datalabel.lang"]').html() == 'FR') {
			this.currentCulture = 'fr';
            this.currentDefaultMessages = defaultMessages_fr;
        } else {
            this.currentCulture = 'en';
            this.currentDefaultMessages = defaultMessages_en;
        }

		this.readEvents('sir',  $('div[name="SIRList"] .grid-body .grid-body-content tr').not('.empty-grid'));
		this.readEvents('dcr',  $('div[name="DCRList"] .grid-body .grid-body-content tr').not('.empty-grid'));
		this.groupByReportTypeAndDate();

		this.setState({
            defaultCulture: this.currentCulture,
            defaultMessages: this.currentDefaultMessages,
            events: this.eventsArray,
            agenda: {
                event: Event
            }
        });
    }


	groupByReportTypeAndDate() {
		let $this = this;
		Object.entries($this.eventsObject).map(([type, object]) => (
			Object.entries(object).map(([key, event]) => {
				$this.eventsArray.push(event);
			})
		));
	}
	

	/**
	* Read events from HTML from k2 and add events to react-calendar
	* @eventType : tasks, dcr, sir
	* @elementsArray : html element
	*/
    readEvents(eventType, elementsArray) {
		var $this = this;
		if (!$this.eventsObject[eventType]) {
			$this.eventsObject[eventType] = {};
		}
		elementsArray.each(function() {
			this.event = new Object;
			var my_self = this;
			my_self.event.type = eventType.toUpperCase();
			let date = $("td", this).eq("2").data("options").value;

			if (!$this.eventsObject[eventType][date]) {
				$(this).children("td").each(function (idx) {
					my_self.event.allDay = true;
			
					switch (idx) {
						//ID
						case 0:
							my_self.event.id = $(this).data("options").value;
							break;
						//NUMBER
						case 1:
							my_self.event.title = $(this).data("options").value;
							my_self.event.number = $(this).data("options").value;
							break;
						// DATE
						case 2:
							my_self.event.date = $(this).data("options").value;
							my_self.event.start = $(this).data("options").value;
							my_self.event.end = $(this).data("options").value;
							break;
						//URL
						case 3:
							my_self.event.URL = $(this).data("options").value;
							break;
						//Color
						case 4:
							my_self.event.color	 = $(this).data("options").value;
							break;
						default:
						console.log("Unbound value");
					}	
				});
				$this.eventsObject[eventType][date] = this.event; 
			}				
		});
	
}

	/**
	* Navigate to DCR & SIR
	*/
	navigateTo(event) {
		if(event.URL) {
			window.location.href = decodeURI(event.URL);
		}
	}
	
	/**
	* Render react
	*/
    render() {
		this.dateStartCalendar = moment().toDate();
		
		
        return (
           <div className="App">
				<Calendar
				  defaultDate={moment().toDate()}
				  defaultView="month"
				  events={this.state.events}
				  localizer={localizer}
				  messages={this.state.defaultMessages}
				  culture={this.state.defaultCulture}
				  style={{ height: "90vh" }}
				  onSelectEvent={this.navigateTo}
				  eventPropGetter={event => ({
					style: {
					  backgroundColor: event.color,
					  color: 'white',
					  border: '0px'
					}
				  })}
				  components={{
					event: Event
				  }}
				/>
			</div>
		);
    };
};

export default CalendarReports;
