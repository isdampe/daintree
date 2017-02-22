class BrowserBuffer {

	constructor(Core, Args) {
		this.Core = Core;
		this.Args = Args;
		this.View = Args.View;
		this.MainElement = null;
		
		//Ensure we have a URL to browse, otherwise use blank.html
		if (! this.Args.hasOwnProperty('url') ) {
			this.Args.url = "blank.html";
		}

		this.Name = Args.url;

		this.Launch(this.Args.url);

	}

	/**
	 * Closes and destroys the browser view instance
	 * @return {bool} True if successful, false if failure
	 */
	Close() {

		//Delete the Iframe Element.
		this.MainElement.parentNode.removeChild(this.MainElement);

		//Delete the buffer from the view.
		this.View.DeleteBuffer( this );

		return true;

	}

	Launch(Url) {

		//BufferID
		var BufferID = "Iframe-" + this.Core.GenerateRandomID(16);

		//Create the Iframe
		var IframeElement = document.createElement('iframe');
		IframeElement.src = Url;
		IframeElement.className = "BrowserView";
		IframeElement.id = BufferID;

		this.MainElement = IframeElement;

		//Inject the Iframe into the view
		this.Args.View.ViewMainElement.appendChild(IframeElement);

	}

	GetMainElement() {
		return this.MainElement;
	}


}
