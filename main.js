$(document).ready(function () {
	$("#bgm").css('display','none');
    $("#main").css('display','none');
});

// $("button#start").on('click', load_game());

function shuffle(a) {
    var i, j, x
    for(i=a.length; i>0; i--){
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
    return a
}

function load_cards() {
    var all_cards = [];
    var pairs = [];
    //choose the cards to load
    for(var i = 0; i < 22; i++){
        all_cards.push('Images/card_' + i + '.jpg');
    }
    //shuffle the cards and create pairs
    var random_cards = shuffle(all_cards);
    for(i = 0; i < 12; i++){
        pairs.push(random_cards[i], random_cards[i]);
    }
    //shuffled pairs
    pairs = shuffle(pairs);
    return pairs
}

function load_game() {
    var cards = load_cards();
    $("#title").css('display','none');
    $("#main").css('display','block');

    for(var i=0; i<3; i++){
        $("table.game-board").append($("<tr></tr>"))
    }

    for(var j=0; j<8; j++){
        var card_index = (i+1) * (j+1);
        $("table.game-board tr").append($(
            "<td>" +
            "<img src='Images/card_bk.jpg' onclick='turn_card(this, \"" + cards[card_index] + "\")'>" +
            "</td>"
        ));
    }
}

function turn_card(tag, source) {
    tag.src = source
}