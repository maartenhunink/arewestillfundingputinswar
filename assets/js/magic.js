var moment = require('moment'); // require


window.onload = function(){

	let now = moment.utc();
	let invasion = moment.utc('2022-02-24T03:00:00');
	var milisecondsSinceInvasion = now.diff(invasion, 'milliseconds');

	let fundsPerDay = 95000000;
	var fundsPerMilisecond = fundsPerDay / 86400000; 
	var fundsSinceInvasion = Math.floor(milisecondsSinceInvasion * fundsPerMilisecond);

	var tanks = 0;
	var jets = 0;

	var tanksPrice = 914134;
	var jetsPrice = 36565360;

	var tanksHtml = '';
	var jetsHtml = '';


	document.getElementById('days-ago').innerHTML = invasion.fromNow();

	var tweetBtn = document.getElementById('tweet-this');

 	setInterval(function() {
 		setFunds();
 	}, 70);

 	function setFunds(){

 		milisecondsSinceInvasion = moment.utc().diff(invasion, 'milliseconds');
 		fundsSinceInvasion = Math.floor(milisecondsSinceInvasion * fundsPerMilisecond);

		var euros = new Intl.NumberFormat({
		    currency: `EUR`,
		    style: 'currency',
		}).format(Math.floor(fundsSinceInvasion));

	 	document.getElementById('funds-counter').innerHTML = euros;
 	}

 	setGraphics(tanks, jets);

 	setInterval(function() {
 		setGraphics(tanks, jets);
 	}, 100000);


 	function setGraphics(oldTanks, oldJets){
 		milisecondsSinceInvasion = moment.utc().diff(invasion, 'milliseconds');
 		fundsSinceInvasion = Math.floor(milisecondsSinceInvasion * fundsPerMilisecond);

 		tanks = Math.floor(fundsSinceInvasion / tanksPrice);
 		jets = Math.floor(fundsSinceInvasion / jetsPrice);

 		if(oldTanks != tanks){

	 		for (let i = 0; i < tanks; i++) {
	  		tanksHtml += "<div class='tank'></div>";
			}

		 	document.getElementById('tanks').innerHTML = tanksHtml;
		 	document.getElementById('tanks-amount').innerHTML = tanks;

 		}

 		if(oldJets != jets){

	 		for (let i = 0; i < jets; i++) {
	  		jetsHtml += "<div class='jet'></div>";
			}

		 	document.getElementById('jets').innerHTML = jetsHtml;
		 	document.getElementById('jets-amount').innerHTML = jets;

 		}

		var euros = new Intl.NumberFormat({
	    currency: `EUR`,
	    style: 'currency',
		}).format(Math.floor(fundsSinceInvasion));
	
		tweetBtn.href = "http://twitter.com/share?text=So far the EU has funded Putin's war with €"+euros+" and counting. @stillfundingwar https://arewestillfundingputinswar.com/";

 	}
}