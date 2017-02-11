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
	 * Closes and destroys the browser view instance
	 * @return {bool} True if successful, false if failure
	 */
	Close() {

		//Delete Ace editor.

		return true;

	}

	Launch(Url) {

		//Create Ace wrapper
		var AceWrapperElement = document.createElement('div');
		AceWrapperElement.id = this.BufferID;

		this.Args.View.ViewMainElement.appendChild(AceWrapperElement);

		this.MainElement = AceWrapperElement;

		//Create ace editor.
		this.Ace = ace.edit(this.BufferID);
		this.Ace.setTheme("ace/theme/monokai");
		this.Ace.getSession().setMode("ace/mode/javascript");

	}

	GetMainElement() {
		return this.MainElement;
	}


}
