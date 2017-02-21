class Tabs {

	constructor(Core, Args) {
		
		this.Core = Core;
		this.ContainerElement = Args.ContainerElement;
		this.Buffers = Args.Buffers;
		this.TabsID = new Date().getTime();
		this.Tabs = {};
		this.CurrentTab = false;
		this.View = Args.View;

		//Create our tab emitter.
		this.Emitter = new Emitter();

		//Create the tab container.
		this.TabsElementContainer = document.createElement('ul');
		this.TabsElementContainer.id = "TabsContainer-" + this.TabsID;
		this.TabsElementContainer.className = "TabsContainer";

		//Apend the container to the ViewMetaElement
		this.ContainerElement.appendChild(this.TabsElementContainer);

	}

	/**
	 * Renders buffers as tabs into our container element
	 * @param {object} Buffers - The buffers object
	 * @return {void}
	 */
	Render() {

		var _this = this;

		//First, reset the container.
		//This could probably be optimised to remove only inactive buffers.
		this.TabsElementContainer.innerHTML = '';

		for ( let Key in this.Buffers ) {
			if (! this.Buffers.hasOwnProperty(Key) ) continue;
			let SingleBuffer = this.Buffers[Key];
			let TabElement = document.createElement('li');
			let TabTitle = document.createElement('span');
			let TabClose = document.createElement('button');

			TabTitle.innerText = SingleBuffer.Name;

			//Add hook.
			TabElement.addEventListener("mousedown", (e) => {
				e.preventDefault();
				_this.TabClick(SingleBuffer);
			});

			//Add close hook.
			TabClose.addEventListener("mousedown", (e) => {
				e.preventDefault();
				e.stopPropagation();
				_this.TabClose(SingleBuffer);
			});

			//Add this tab to the store.
			this.Tabs[this.Buffers[Key].ID] = {
				Element: TabElement,
				SingleBuffer: SingleBuffer,
				ElementTitle: TabTitle
			};

			//Hide the tab "content" initially.
			SingleBuffer.View.ViewMainElement.classList.add('tab-inactive');

			TabElement.appendChild(TabTitle);
			TabElement.appendChild(TabClose);
			this.TabsElementContainer.appendChild(TabElement);
		}

		//Create the "new" tab button.
		var NewBufferElement = document.createElement('li');
		NewBufferElement.className = "new-buffer";

		NewBufferElement.addEventListener("mousedown", (e) => {
			e.preventDefault();
			_this.NewTab();
		});

		//Inject the button into the container element.
		this.TabsElementContainer.appendChild(NewBufferElement);

	}

	/**
	 * Attempts to close a tab
	 * @param {object} SingleBuffer - The buffer object of the clicked tab
	 * @return {void}
	 */
	TabClose(SingleBuffer) {

		SingleBuffer.Close();


	}

	/**
	 * Handles a tab click action
	 * @param {object} SingleBuffer - The buffer object of the clicked tab
	 * @return {void}
	 */
	TabClick(SingleBuffer) {

		var SingleTab = this.Tabs[SingleBuffer.ID];
		this.ActivateTab(SingleTab);
	
	}

	/**
	 * Handles the user clicking the new tab button
	 * @return {void}
	 */
	NewTab(View) {

		this.View.NewBuffer();

	}

	/**
	 * Activates a specified tab
	 * @param {object} SingleTab - The tab object to activate
	 * @return {void}
	 */
	ActivateTab(SingleTab) {

		if ( this.CurrentTab ) {
			this.HideTab(this.CurrentTab);
		}

		//Add the "active" class to the tab element itself.
		SingleTab.Element.classList.add('active');

		//Work on the buffers' actual main element now.
		var BufferTabElement = SingleTab.SingleBuffer.GetMainElement();
		BufferTabElement.classList.remove('tab-inactive');
		BufferTabElement.classList.add('tab-active');

		//Call global and then specified event
		this.Emitter.Emit('OnTabActivate', SingleTab);
		this.Emitter.Emit('OnTabActivate-' + SingleTab.SingleBuffer.BufferID, SingleTab);

		this.CurrentTab = SingleTab;

	}

	/**
	 * Hides a specified tab
	 * @param {object} SingleTab - The tab object to hide
	 * @return {void}
	 */
	HideTab(SingleTab) {
	
		//Remove the "active" class from the tab element itself.
		SingleTab.Element.classList.remove('active');

		//Work on the buffers' actual main element now.
		var BufferTabElement = SingleTab.SingleBuffer.GetMainElement();
		BufferTabElement.classList.remove('tab-active');
		BufferTabElement.classList.add('tab-inactive');

	}

	/**
	 * Finds a tab and activates it by a Buffer object
	 * Handy for calling from View class where tab objects
	 * may not be accessible or known
	 * @param {object} SingleBuffer - The buffer object to activate
	 * @return {void}
	 */
	ActivateTabByBuffer(SingleBuffer) {

		for ( let Key in this.Tabs ) {
			if (! this.Tabs.hasOwnProperty(Key) ) continue;
			let ThisTab = this.Tabs[Key];
			if ( ThisTab.SingleBuffer === SingleBuffer ) {
				this.ActivateTab( ThisTab );
				return;
			}
		}

	}

}
