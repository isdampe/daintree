((window) => {

	var Core = new Daintree({
		Debug: true,
		ElementBase: document.getElementById('daintree'),
		//DefaultBufferType: 'Browser'
		DefaultBufferType: 'Editor'
	}); 
	Core.RegisterBuffer('Browser', BrowserBuffer);
	Core.RegisterBuffer('Editor', EditorBuffer);

	var View = Core.NewView();
	View.CreateBuffer('Editor', {
		uri: '/tmp/test.js',
		type: 'lfs'
	});
	//View.CreateBuffer('Browser', {url: "https://www.evasivesoftware.com/"});
	//View.CreateBuffer('Browser', {url: "http://stkbfr.com/53/"});

	var SecondView = Core.NewView();
	SecondView.CreateBuffer('Browser', {
		url: "https://www.evasivesoftware.com"
	});

	window.DainetreeCore = Core;

})(window);

