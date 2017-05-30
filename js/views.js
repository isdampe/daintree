class View {

	/**
	 * Creates a new "browser" view
	 * @param {class} Core - Reference to the core instance
	 * @param {object} Args - The arguments object
	 * @return {void}
	 */
	constructor(Core,Args) {
		this.Core = Core;
		this.Args = Args;
		this.Buffers = [];
		this.BuffersIndex = {};
		this.hasTabs = true;

		if ( this.Args.hasOwnProperty('tabs') && this.Args.tabs === false ) {
			this.hasTabs = false;
		}

		//Set the default ViewID.
		this.ViewID = this.Core.GenerateRandomID(16);

		//Create the new element entrypoint for it.
		this.ViewElementWrapper = document.createElement('div');
		this.ViewElementWrapper.id = "ViewWrapper-" + this.ViewID;
		this.ViewElementWrapper.className = "ViewWrapper";

		if (! this.hasTabs ) {
			this.ViewElementWrapper.className = "ViewWrapper ViewWrapperNoTabs";
		}
		if ( this.Args.hasOwnProperty('class') ) {
			this.ViewElementWrapper.className = this.ViewElementWrapper.className + " " + this.Args.class;
		}

		//Create the main and meta element.
		this.ViewMainElement = document.createElement('div');
		this.ViewMainElement.id = "ViewMain-" + this.ViewID;
		this.ViewMainElement.className = "ViewMain";

		this.ViewMetaElement = document.createElement('div');
		this.ViewMetaElement.id = "ViewMeta-" + this.ViewID;
		this.ViewMetaElement.className = "ViewMeta";

		this.ViewElementWrapper.appendChild(this.ViewMetaElement);
		this.ViewElementWrapper.appendChild(this.ViewMainElement);

		//Inject the element into the DOM root.
		this.Core.GetElementBase().appendChild(this.ViewElementWrapper);

		//Create a tab layout.
		if ( this.hasTabs ) {
			this.Tabs = new Tabs(Core, {
				View: this,
				ContainerElement: this.ViewMetaElement,
				Buffers: this.Buffers
			});
		}

	}

	/**
	 * Creates a new instance of a buffer and stores it in the store
	 * @param {string} BufferType - The Buffer Type to create
	 * @param {object} Args - The object of arguments to pass to the Buffer object
	 * @return {void}
	 */
	CreateBuffer(BufferType, Args) {
	
		var NewBuffer = this.Core.NewBuffer(BufferType, Args, this);
		if (! NewBuffer ) return false;

		NewBuffer.ID = this.Core.GenerateRandomID(16);

		this.BuffersIndex[NewBuffer.ID] = this.Buffers.length;
		this.Buffers.push(NewBuffer);


		if ( this.hasTabs ) {

			//Update the tab view
			this.Tabs.Render();

			//Debug, activate tab?
			this.Tabs.ActivateTabByBuffer(NewBuffer);

		}

	}

	/**
	 * Deletes a buffer 
	 * @param {object} Buffer - The buffer to remove
	 * @return {void}
	 */
	DeleteBuffer(Buffer) {

		var CurrentIndex = this.BuffersIndex[Buffer.ID];

		//Remove the buffer from the store.
		this.Buffers.splice(this.BuffersIndex[Buffer.ID],1);
		delete this.BuffersIndex[Buffer.ID];

		//Ensure we rebuild BufferIndex
		this.RebuildIndex();

		if ( this.hasTabs ) {
			//Update the tabs.
			this.Tabs.Render();
		}

		CurrentIndex -= 1;

		//Auto focus the next buffer, if we have one.
		if ( CurrentIndex >= this.BuffersIndex.length ) CurrentIndex = this.BuffersIndex.length;
		if ( CurrentIndex < 0 ) CurrentIndex = 0;
		
		if ( typeof this.Buffers[CurrentIndex] !== 'undefined' ) {
			if ( this.hasTabs ) {
				this.Tabs.ActivateTabByBuffer( this.Buffers[CurrentIndex] );
			}
		} else {
			//There are no buffers left in the view.
			//Should I automatically close the view?
			this.Core.DebugLog('No other buffers available in view to auto-activate');
		}

	}

	/**
	 * Rebuilds the BufferIndex
	 * @return {void}
	 */
	RebuildIndex() {

		for ( var i=0; i<this.Buffers.length; i++ ) {
			let Buffer = this.Buffers[i];
			this.BuffersIndex[Buffer.ID] = i;
		}

	}

	/**
	 * Create a new buffer in this view.
	 * @return {void}
	 */
	NewBuffer() {

		this.CreateBuffer(this.Core.Config.DefaultBufferType, {});

	}

}
