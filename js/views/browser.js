class BrowserView {

	/**
	 * Creates a new "browser" view
	 * @param {class} Core - Reference to the core instance
	 * @param {object} Args - The arguments object
	 * @return {void}
	 */
	constructor(Core,Args) {
		this.Core = Core;
		this.Args = Args;
		this.ViewMainElement = Args.ViewMainElement;
		this.Buffers = {};

		//Create a tab layout.
		this.Tabs = new Tabs(Core, {
			ContainerElement: Args.ViewMetaElement,
			Buffers: this.Buffers
		});

		//Ensure we have a URL to browse.
		if (! this.Args.hasOwnProperty('url') ) {
			this.Core.DebugLog('Cannot launch BrowserView: Missing url in Args');
			return false;
		}

		this.CreateBuffer(this.Args.url);
		var _this = this;
		window.setTimeout(function(){
			_this.CreateBuffer("http://www.emarketeer.com.au/");
		},5000);

		//Activate tab?

	}

	/**
	 * Closes and destroys the browser view instance
	 * @return {bool} True if successful, false if failure
	 */
	Close() {

		//Delete the Iframe Element.
		this.IframeElement.parentNode.removeChild(this.IframeElement);

		return true;
	
	}

	CreateBuffer(Url) {

		//BufferID
		var BufferID = "Iframe-" + new Date().getTime();
	
		//Create the Iframe
		var IframeElement = document.createElement('iframe');
		IframeElement.src = Url;
		IframeElement.className = "BrowserView";
		IframeElement.id = BufferID;

		var SingleBuffer = {
			"ID": BufferID,
			"Name": Url,
			"Url": Url,
			"Element": IframeElement
		};

		//Set the reference in buffers.
		this.Buffers[BufferID] = SingleBuffer;

		//Inject the Iframe into the view
		this.ViewMainElement.appendChild(IframeElement);

		//Update the tab view
		this.Tabs.Render();

		//Debug, activate tab?
		this.Tabs.ActivateTabByBuffer(SingleBuffer);

	}

}
