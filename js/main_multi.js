const WORKER_COUNT = 10;
const WORKER_TRIAL_COUNT = 3000000;
const TRIAL_COUNT = WORKER_COUNT*WORKER_TRIAL_COUNT;

var accepted = 0;
var yMax = 1;
var xMax = Math.PI;
var workers = [];
var finishedWorkers = 0;

console.time('main');

for(var i=0; i<WORKER_COUNT; i++){
	var blob = new Blob([document.querySelector('#worker1').textContent]);
	workers.push(new Worker(window.URL.createObjectURL(blob)));
	
	workers[i].onmessage = function(e) {
		
		if (e.data === 'finished')
			finishedWorkers++
		else
			accepted += e.data;
	}
	
	workers[i].postMessage({ cmd: 'start', 'xMax' : xMax, 'yMax': yMax, 'trialCount': WORKER_TRIAL_COUNT });
}

var intId;

intId = setInterval(function(){ 
	if(finishedWorkers == WORKER_COUNT){
		var result = (accepted/TRIAL_COUNT)*(yMax*xMax);
		document.getElementById('res').innerHTML = "res: "+result;
		
		console.timeEnd('main');
		
		clearInterval(intId);
	}
},1);



