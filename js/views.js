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

	CreateBuffer(BufferType, Args) {
	
		var NewBuffer = this.Core.NewBuffer(BufferType, Args, this);
		if (! NewBuffer ) return false;

		NewBuffer.ID = new Date().getTime();
		this.Buffers.push(NewBuffer);

		//Update the tab view
		this.Tabs.Render();

		//Debug, activate tab?
		this.Tabs.ActivateTabByBuffer(NewBuffer);

	}

	/**
	 * Create a new buffer in this view.
	 * @return {void}
	 */
	NewBuffer() {

		this.CreateBuffer(this.Core.Config.DefaultBufferType, {});

	}

}
