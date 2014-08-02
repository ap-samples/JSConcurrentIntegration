//Cos^2 x
var CosPowerTwoX = (function(){
	return {
		isPointAccepted: function(fR, xR){			
			return fR <= (Math.cos(xR) * Math.cos(xR));
		}
	};
})();

const TRIAL_COUNT = 30000000;

var yMax = 1;
var xMax = Math.PI;

var accepted = 0;

console.time('main');

for(var i=0; i<TRIAL_COUNT; i++){
	var xR = Math.random() * xMax;
	var fR = Math.random() * yMax;
	
	if(CosPowerTwoX.isPointAccepted(fR,xR))
		accepted++;
}

var result = (accepted/TRIAL_COUNT)*(yMax*xMax);

document.getElementById('res').innerHTML = "res: "+result;

console.timeEnd('main');
