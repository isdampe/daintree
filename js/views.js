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

		this.ViewID = new Date().getTime();

		//Create the new element entrypoint for it.
		this.ViewElementWrapper = document.createElement('div');
		this.ViewElementWrapper.id = "ViewWrapper-" + this.ViewID;
		this.ViewElementWrapper.className = "ViewWrapper";

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
		this.Tabs = new Tabs(Core, {
			View: this,
			ContainerElement: this.ViewMetaElement,
			Buffers: this.Buffers
		});

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

		NewBuffer.ID = new Date().getTime();

		this.BuffersIndex[NewBuffer.ID] = this.Buffers.length;
		this.Buffers.push(NewBuffer);

		//Update the tab view
		this.Tabs.Render();

		//Debug, activate tab?
		this.Tabs.ActivateTabByBuffer(NewBuffer);

	}

	/**
	 * Deletes a buffer 
	 * @param {object} Buffer - The buffer to remove
	 * @return {void}
	 */
	DeleteBuffer(Buffer) {

		//Remove the buffer from the store.
		this.Buffers.splice(this.BuffersIndex[Buffer.ID],1);
		delete this.BuffersIndex[Buffer.ID];

		//Ensure we rebuild BufferIndex
		this.RebuildIndex();

		//Update the tabs.
		this.Tabs.Render();

		//Auto focus the next buffer, if we have one.


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
