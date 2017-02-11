((window) => {

	var Core = new Daintree({
		Debug: true,
		ElementBase: document.getElementById('daintree')
	}); 
	Core.RegisterBuffer('Browser', BrowserBuffer);

	var View = Core.NewView();
	View.CreateBuffer('Browser', {url: "https://www.evasivesoftware.com/"});
	View.CreateBuffer('Browser', {url: "http://stkbfr.com/53/"});

	var SecondView = Core.NewView();
	SecondView.CreateBuffer('Browser', {
		url: "http://www.cowes.info"
	});
	SecondView.CreateBuffer('Browser', {
		url: "https://www.evasivesoftware.com"
	});

	window.DainetreeCore = Core;

})(window);

