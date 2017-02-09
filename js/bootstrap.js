((window) => {

	var Core = new Daintree({
		Debug: true,
		ElementBase: document.getElementById('daintree')
	}); 
	Core.RegisterView('Browser', BrowserView);

	Core.NewView('Browser', {
		url: "https://www.evasivesoftware.com/"
	});
Core.NewView('Browser', {
		url: "http://www.3dvt.com.au/"
	});

	window.DainetreeCore = Core;

})(window);

