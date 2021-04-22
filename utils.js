function fetchOrderedImgs() {
	if (!localStorage) return;

	// get the list of keys in order of last saved
	let orderedKeys = Object.keys(localStorage).sort().reverse();

	let orderedObj = {};
	for (const key of orderedKeys) {
		if (parseInt(key) > 1) {
			const url = localStorage.getItem(key);
			orderedObj[key] = url;
		}
	}

	return orderedObj;
}

function selectImg(imgKey) {
	if (imgKey && localStorage) {
		const url = localStorage.getItem(imgKey);
		localStorage.setItem('selectedImg', url);
	}

	window.location.href = 'index.html';
}

function initImgHtml() {
	const orderedImgObjs = fetchOrderedImgs();
	let htmlStr = '';
	for (const key in orderedImgObjs) {
		htmlStr +=
			'<img id="' +
			key +
			'" src="' +
			orderedImgObjs[key] +
			'" onclick="selectImg(' +
			key +
			')"/>';
	}

	const container = document.getElementById('imagesContainer');
	container.innerHTML = htmlStr;
}

function initDropDown() {
	const headUsed = localStorage.getItem('Head') === 'true';
	const torsoUsed = localStorage.getItem('Torso') === 'true';
	const legsUsed = localStorage.getItem('Legs') === 'true';
	const container = document.getElementById('promptList');
	let htmlStr = '';

	if (!headUsed) htmlStr += '<option value="head">Head</option>';

	if (!torsoUsed) htmlStr += '<option value="torso">Torso</option>';

	if (!legsUsed) htmlStr += '<option value="legs">Legs</option>';

	container.innerHTML = htmlStr;
}
