var all_cards = [];
var random_cards = [];
var pairs = [];
var paired = 0;

function load_tracks(){
	//choose the files to load
	var tracks = [];
	var track = 0;
	for(track = 0; track < 2; track++){
		tracks.push('Audio/Track 0' + (track+1) + '.mp3');
	}
	
	//load the tracks and loop the playlist
	track = 1;
	$("#track").attr('src',tracks[track-1]);
	$("#tracks").on('ended',function(){
		if(track < tracks.length){
			track++;
			$("#track").attr('src',tracks[track-1]);
			this.load();
			this.play();
		}
		else{
			track = 1;
			$("#track").attr('src',tracks[track-1]);
			this.load();
			this.play();
		}
	});
}

function load_cards(){
	all_cards = [];
	random_cards = [];
	pairs = [];
	paired = 0;
	//choose the cards to load
	for(var i = 0; i < 22; i++){
		all_cards.push('Images/card_' + i + '.jpg');
	}
	//shuffle the cards and create pairs
	random_cards = shuffle(all_cards);
	for(var i = 0; i < 9; i++){
		pairs.push(random_cards[i], random_cards[i]);
	}
	//shuffled pairs
	pairs = shuffle(pairs);
}

//shuffling function
function shuffle(arr){
	var i = arr.length, j, temp;
	while(--i > 0){
		j = Math.floor(Math.random() * (i+1));
		temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
	}
	return arr;
}