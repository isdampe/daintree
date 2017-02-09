class Daintree {

	constructor(Config) {
		this.Config = Config;
		this.Views = [];
		this.BufferTypes = {};
		this.Buffers = {};
	}

	/**
	 * Writes a message to console if debug is active
	 * @param {string} message - The message to write to log
	 * @return {void}
	 */
	DebugLog(message) {
		if ( this.Config.Debug === true ) {
			console.log(message);
		}
	}

	/**
	 * Returns a reference to the cores base HTML DOM element
	 * @return {object} The DOM object
	 */
	GetElementBase() {
		return this.Config.ElementBase;
	}

	/**
	 * Registers a new buffer class
	 * @param {string} Name - The name of the new class, used to reference the class type
	 * @param {class} BufferClass - The new BufferClass to register
	 * @return {bool} True on success, false on error
	 */
	RegisterBuffer(Name, BufferClass) {
		
		if ( this.BufferTypes.hasOwnProperty(Name) ) {
			return false;
		}

		this.BufferTypes[Name] = BufferClass;

		this.DebugLog('Registered new buffer type: ' + Name);

		return true;

	}

	/**
	 * Creates a new instance of a view
	 * @param {object} Args - The object of arguments to pass to the new View class
	 * @return {void}
	 */
	NewView(Args) {

		if ( typeof Args === 'undefined' ) {
			Args = {};
		}

		//Create the new class instance
		var NewView = new View(this, Args);

		//Push the new class instance into our Views store.
		this.Views.push(NewView);

		return NewView;
	
	}

	/**
	 * Attempts to close a view instance
	 * @param {object} ViewObject - The view object instance
	 * @return {bool} True on success, false on failure
	 */
	CloseView(ViewObject) {

		var CloseStatus = ViewObject.Close();
		if (! CloseStatus ) {
			this.DebugLog('Cannot close ' + ViewObject + ', received failed attempt to run Close()');
			return false;
		}

		//Remove the view element.
		ViewObject.ViewElement.parentNode.removeChild(ViewObject.ViewElement);

		//Find the object.
		for ( let key in this.Views ) {
			if (! this.Views.hasOwnProperty(key) ) continue;
			if ( this.Views[key] === ViewObject ) {
				//Delete the view object
				this.Views.splice(key,1);
				break;
			}
		}

		//We have successfully closed and deleted our view instance now.
		return true;

	}

	NewBuffer(BufferType, Args, View) {

		Args.View = View;

		//Create a new buffer instance.
		var NewBuffer = new this.BufferTypes[BufferType](this, Args);
		return NewBuffer;

	}

}
