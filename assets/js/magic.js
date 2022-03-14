(function() {

	var moment = require('moment'); // require

	window.onload = function(){

		var total_eur = 0;
		let now = moment.utc();
		let invasion = moment.utc('2022-02-24T03:00:00');

		var tanks = 0;
		var jets = 0;

		var tanksPrice = 914134;
		var jetsPrice = 36565360;

		var tweetBtn = document.getElementById('tweet-this');

		document.getElementById('days-ago').innerHTML = invasion.fromNow();

		fetch('proxy.php?url=https://api.energyandcleanair.org/v1/russia_counter')
		  .then(response => response.json())
		  .then(data => {

        total_eur = data.total_eur;

        setFunds(total_eur);

			 	setInterval(function() {
			 		total_eur = total_eur + (data.total_eur_per_sec / 10);
			 		setFunds(total_eur)
			 	}, 100);

	 			setGraphics(total_eur, tanks, jets);

			 	setInterval(function() {
			 		total_eur = total_eur + (data.total_eur_per_sec * 1);
			 		setGraphics(total_eur, tanks, jets);
			 	}, 1000);

    });

	 	function setFunds(total_eur){

			var euros = new Intl.NumberFormat({
			    currency: `EUR`,
			    style: 'currency',
			}).format(Math.floor(total_eur));

		 	document.getElementById('funds-counter').innerHTML = euros;
	 	}

	 	function setGraphics(total_eur, oldTanks, oldJets){

	 		tanks = Math.floor(total_eur / tanksPrice);
	 		jets = Math.floor(total_eur / jetsPrice);

	 		var tanksHtml = '';

	 		if(oldTanks != tanks){

		 		for (let i = 0; i < tanks; i++) {
		  		tanksHtml += "<div class='tank'></div>";
				}

			 	document.getElementById('tanks').innerHTML = tanksHtml;
			 	document.getElementById('tanks-amount').innerHTML = tanks;

			}
			
	 		var jetsHtml = '';

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
			}).format(Math.floor(total_eur));
		
			tweetBtn.href = "http://twitter.com/share?text=So far the EU has funded Putin's war with €"+euros+" and counting. @stillfundingwar https://arewestillfundingputinswar.com/";

	 	}
	}

})();