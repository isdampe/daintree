class EditorBuffer {

	/**
	 * EditorBuffer is a class for controlling the Ace code editor
	 * @param {Daintree} Core - The Dainetree core reference
	 * @param {object} Args - The arguments to pass in
	 */
	constructor(Core, Args) {
		this.Core = Core;
		this.Args = Args;
		this.View = Args.View;
		this.MainElement = null;
		this.Ace = null;
		this.BufferID = "Editor-" + this.Core.GenerateRandomID(16);
		this.HasChanged = false;
		
		//Ensure we have a URL to browse, otherwise use blank.html
		if (! this.Args.hasOwnProperty('uri') ) {
			this.Args.uri = "/dev/null";
			this.Args.dir = "/dev/null";
			this.Args.name = "untitled";
		}

		this.Name = Args.name;

		this.Launch(this.Args.uri);

	}
	/**
	 * Closes and destroys the editor view instance
	 * @return {bool} True if successful, false if failure
	 */
	Close() {

		if ( confirm('Are you sure you want to close this?') ) {

			//Delete Ace editor.
			this.Ace.destroy();
			this.MainElement.parentNode.removeChild(this.MainElement);
			this.Ace = null;

			//Delete the buffer from the View.
			this.View.DeleteBuffer( this );

			return true;

		} else {

			return false;

		}

	}

	/**
	 * Called when the buffer is activated from a tab press
	 * @return {void}
	 */
	OnTabActivate(SingleTab) {

		this.FocusEditor();

	}

	/**
	 * Launches a new buffer for the specified uri
	 * @return {void}
	 */
	Launch(Uri) {

		var _this = this;

		//Create Ace wrapper
		var AceWrapperElement = document.createElement('div');
		AceWrapperElement.id = this.BufferID;

		this.Args.View.ViewMainElement.appendChild(AceWrapperElement);

		this.MainElement = AceWrapperElement;

		//Create ace editor.
		ace.require("ace/ext/language_tools");
		this.Ace = ace.edit(this.BufferID);
		//this.Ace.setTheme("ace/theme/one_dark");
		this.Ace.getSession().setMode("ace/mode/javascript");
		this.Ace.setOptions(this.Core.Config.Ace);
		this.FocusEditor();

		//Add event listener for OnTabActivate for _this_ editor instance
		this.View.Tabs.Emitter.On('OnTabActivate-' + this.BufferID, (SingleTab) => {
			_this.OnTabActivate(SingleTab);
		});

	}

	/**
	 * Sets focus on this instances Ace editor
	 * @return {void}
	 */
	FocusEditor() {

		this.Ace.focus();

	}

	/**
	 * Returns the main DOM element
	 * @return {object} The main DOM element for this buffer
	 */
	GetMainElement() {

		return this.MainElement;

	}


}
