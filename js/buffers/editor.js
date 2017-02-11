class EditorBuffer {

	constructor(Core, Args) {
		this.Core = Core;
		this.Args = Args;
		this.View = Args.View;
		this.MainElement = null;
		this.Ace = null;
		this.BufferID = "Editor-" + new Date().getTime();
		
		//Ensure we have a URL to browse, otherwise use blank.html
		if (! this.Args.hasOwnProperty('uri') ) {
			this.Args.uri = "/dev/null";
		}

		this.Name = Args.uri;

		this.Launch(this.Args.uri);

	}

	/**
	 * Closes and destroys the editor view instance
	 * @return {bool} True if successful, false if failure
	 */
	Close() {

		//Delete Ace editor.
		this.Ace.destroy();
		this.MainElement.parentNode.removeChild(this.MainElement);
		this.Ace = null;

		return true;

	}

	/**
	 * Called when the buffer is activated from a tab press
	 * @return {void}
	 */
	OnTabActivate() {
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

	}

	FocusEditor() {
		this.Ace.focus();
	}

	GetMainElement() {
		return this.MainElement;
	}


}
