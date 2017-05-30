class DummyFs {

	/**
	 * DummyFs constructor
	 * DummyFs wholly provides a simulated filesystem driver for testing and
	 * development purposes only. It only produces fake files and i/o
	 */
	constructor() {

		//Dummy only data
		this.dummyFsData = [
			{
				'uri': '',
				'type': 'dir',
				'name': '/',
				'children': [
					{
						'uri': '/dir1',
						'type': 'dir',
						'name': 'dir1',
						'children': [
							{
								'uri': '/dir1/child.c',
								'type': 'file',
								'name': 'child.c'
							}
						]
					},
					{
						'uri': '/test.php',
						'type': 'file',
						'name': 'test.php'
					}
				]
			}
		];
	
	}

	/**
	 * Retrieves a list of all child items in a directory
	 * @param {string} Uri - The uri of the directory to scan
	 * @param {function} Callback - The callback function handler
	 * @return {void}
	 */
	ScanDir(Uri, Callback) {

	}

	ScanTree(Uri, Callback) {
	}

	ReadFile(Uri, Callback) {
	}

	WriteFile(Uri, Data, Callback) {
	}

}
