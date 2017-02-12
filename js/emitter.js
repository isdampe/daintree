class Emitter {

	/**
	 * Creates a new instance of the emitter object
	 * @return {void}
	 */
	constructor() {
		this.Events = {};
	}

	/**
	 * Registers an event by name to be triggered
	 * @param {string} EventName - The Event to trigger
	 * @parmam {function} Callback - The callback function to execute
	 * @return {int} The index of the registered event.
	 */
	On(EventName, Callback) {

		//Create the store array for the event if it doesn't exist.
		if (! this.Events.hasOwnProperty(EventName) ) {
			this.Events[EventName] = [];
		}

		var NewEventIndex = this.Events[EventName].length;
		this.Events[EventName].push( Callback );

		return NewEventIndex;

	}

	/**
	 * Triggers registered events by EventName
	 * @param {string} EventName - The event name to trigger
	 * @param {object} Args - The object arguments to optionally pass to the callback function
	 * @return {void}
	 */
	Emit(EventName, Args = {}) {

		if (! this.Events.hasOwnProperty(EventName) ) return false;
		if ( this.Events[EventName].length < 1 ) return false;

		var i = 0, max = this.Events[EventName].length;
		for ( i; i<max; i++ ) {
			let Event = this.Events[EventName][i];
			Event(Args);
		}

	}

}