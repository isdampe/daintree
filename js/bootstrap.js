((window) => {

	var Core = new Daintree({
		Debug: true,
		ElementBase: document.getElementById('daintree'),
		//DefaultBufferType: 'Browser'
		DefaultBufferType: 'Editor',
		DefaultFsDriver: 'lfs',
		Ace: {
			selectionStyle: "text",
			highlightActiveLine: false,
			readOnly: false,
			cursorStyle: "ace",
			showLineNumbers: true,
			showGutter: true,
			displayIndentGuides: true,
			fontSize: "10pt",
			fontFamily: "Meno, monospace",
			scrollPastEnd: false,
			fixedWidthGutter: false,
			useWorker: true,
			useSoftTabs: false,
			tabSize: 2,
			wrap: false,
			enableBasicAutocompletion: true,
			enableLiveAutocompletion: true,
			//theme: "ace/theme/one_dark"
			theme: "ace/theme/monokai"
		}
	}); 
	Core.RegisterBuffer('Browser', BrowserBuffer);
	Core.RegisterBuffer('Editor', EditorBuffer);

	var FileTreeView = Core.NewView({
		tabs: false,
		class: 'FileTreeView'
	});
	FileTreeView.CreateBuffer('Browser', {
		url: 'https://www.evasivesoftware.com'
	});

	var View = Core.NewView();
	View.CreateBuffer('Editor', {
		uri: '/tmp/test.js',
		dir: '/tmp',
		name: 'test.js',
		type: 'lfs'
	});
	//View.CreateBuffer('Browser', {url: "https://www.evasivesoftware.com/"});
	//View.CreateBuffer('Browser', {url: "http://stkbfr.com/53/"});

	var SecondView = Core.NewView();
	SecondView.CreateBuffer('Browser', {
		url: "https://www.evasivesoftware.com"
	});

	Core.SetViewMode('cols');

	window.DainetreeCore = Core;

})(window);

