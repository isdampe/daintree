class Daintree {

	constructor(Config) {
		this.Config = Config;
		this.Views = [];
		this.ViewTypes = {};
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
	 * Registers a new view class
	 * @param {string} Name - The name of the new class, used to reference the class type
	 * @param {class} ViewClass - The new ViewClass to register
	 * @return {bool} True on success, false on error
	 */
	RegisterView(Name, ViewClass) {
		
		if ( this.ViewTypes.hasOwnProperty(Name) ) {
			return false;
		}

		this.ViewTypes[Name] = ViewClass;

		this.DebugLog('Registered new view type: ' + Name);

		return true;

	}

	/**
	 * Creates a new instance of a view
	 * @param {string} ViewType - The type of view to create
	 * @param {object} Args - The object of arguments to pass to the new View class
	 * @return {void}
	 */
	NewView(ViewType, Args) {

		if ( typeof this.ViewTypes[ViewType] !== 'function' ) {
			this.DebugLog('No view of type ' + ViewType + ' is registered with core.');
			return false;
		}

		if ( typeof Args === 'undefined' ) {
			Args = {};
		}

		var ViewID = new Date().getTime();

		//Create the new element entrypoint for it.
		var ViewElementWrapper = document.createElement('div');
		ViewElementWrapper.id = "ViewWrapper-" + ViewID;
		ViewElementWrapper.className = "ViewWrapper ViewWrapper-" + ViewType;

		//Create the main and meta element.
		var ViewMainElement = document.createElement('div');
		ViewMainElement.id = "ViewMain-" + ViewID;
		ViewMainElement.className = "ViewMain ViewMain-" + ViewType;

		var ViewMetaElement = document.createElement('div');
		ViewMetaElement.id = "ViewMeta-" + ViewID;
		ViewMetaElement.className = "ViewMeta ViewMeta-" + ViewType;

		ViewElementWrapper.appendChild(ViewMetaElement);
		ViewElementWrapper.appendChild(ViewMainElement);

		//Inject the element into the DOM root.
		this.GetElementBase().appendChild(ViewElementWrapper);

		//Add our ViewElement to Args
		Args.ViewElementWrapper = ViewElementWrapper;
		Args.ViewMainElement = ViewMainElement;
		Args.ViewMetaElement = ViewMetaElement;
		Args.ViewID = ViewID;

		//Create the new class instance
		var NewView = new this.ViewTypes[ViewType](this, Args);

		//Push the new class instance into our Views store.
		this.Views.push(NewView);
	
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

}
