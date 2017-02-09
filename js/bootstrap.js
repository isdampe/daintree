((window) => {

	var Core = new Daintree({
		Debug: true,
		ElementBase: document.getElementById('daintree')
	}); 
	Core.RegisterBuffer('Browser', BrowserBuffer);

	var View = Core.NewView();
	View.CreateBuffer('Browser', {url: "https://www.evasivesoftware.com/"});
	View.CreateBuffer('Browser', {url: "https://www.3dvt.com.au/"});

	var SecondView = Core.NewView();
	SecondView.CreateBuffer('Browser', {
		url: "http://www.cowes.info"
	});
	SecondView.CreateBuffer('Browser', {
		url: "http://www.markinginc.co"
	});

	window.DainetreeCore = Core;

})(window);

