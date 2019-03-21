function sendMessage(data, transferable) {
	parent.postMessage(data, '*', transferable);
}

window.addEventListener('message', event => {
	const data = event.data;
	switch (data.command) {
		case 'init':
			return init(data);
		case 'render':
			return render(data);
	}
}, false);

let offscreen;
let context;

function init(data) {
	offscreen = data.offscreen;
	context = offscreen.getContext('2d');
	sendMessage({ command: 'init' });
}

function render(data) {
	const time = data.time;
	context.clearRect(0, 0, offscreen.width, offscreen.height);
	context.fillStyle = 'green';
	context.fillRect(time * 300, 150, 100, 100);
	Promise.resolve().then(() => {
		sendMessage({ command: 'render' });
	});
}