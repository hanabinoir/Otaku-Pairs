var time_left =[75,60,50,45,30];
var level = 1;
var curtime = 0;
var score = 0;
var time_ready = 0;
var time_ready_list = [3,4,5,4,3];
var img_values = [];
var src_values = [];
var time_spent = 0;
var add_score = 0;
var total_score = 0;
var paused = false;
var aced = false;
var resetting = false;
var timer1,timer2,timer5;

//loading title page and the background musics at the beginning
$(document).ready(function(){
	load_tracks();
	title_page();
});

//LAYOUTS
//title page
//load the title layout and reset all the data
function title_page(){
	clearInterval(timer1);
	clearInterval(timer2);
	paired = 0;
	score = 0;
	add_score = 0;
	total_score = 0;
	level = 1;
	all_cards = [];
	random_cards = [];
	pairs = [];
	$("#board").hide();
	$("#title").show();
	var title ='<div><img src="Images/title.jpg"/></div>' + 
	'<div><input type="image" src="Images/start.jpg" onclick="load_game()" id="start"></div>' + 
	'<div><input type="image" src="Images/intro.jpg" onclick="intro_page()" id="intro"></div>';
	$("#title").html(title);
}

//instruction page
function intro_page(){
	var intro ='<div><h2>Introduction</h2>' + 
	'<p style="color:red" id="show_tip">cheatings</p></div>' + 
	'<div id="tip"></div>' + 
	'<div style="float:left"><input type="image" src="Images/back.jpg" onclick="title_page()"/></div>' + 
	'<div style="float:right"><input type="image" src="Images/start.jpg" onclick="load_game()"></div>';
	$("#title").html(intro);
	$("#show_tip").mouseenter(function(){
		$("#tip").html('<p>Almost time out? <br />' + 
		'=> Try to PAUSE</p>' + 
		'<p>During the last 10 seconds at level 3 <br />' + 
		'=> find and click somewhere became <span style="color:RED">RED</span></p>' + 
		'<p><span style="color:blue">CAUTION: </span><br />' + 
		'You cannot do both together!</p>');
	});
	$("#show_tip").mouseleave(function(){
		$("#tip").html('');
	});
}

//Drawing the tables
//Control on the left and cards on the right
function load_tables(){
	if(paused == true)
		pause_resume();
	$("#title").hide();
	$("#board").show();
	var game = '<table id="cards" class="cards">' + 
	'<tr><td id="cell_1"></td><td id="cell_2"></td><td id="cell_3"></td>' + 
	'<td id="cell_4"></td><td id="cell_5"></td><td id="cell_6"></td></tr>' + 
	'<tr><td id="cell_7"></td><td id="cell_8"></td><td id="cell_9"></td>' + 
	'<td id="cell_10"></td><td id="cell_11"></td><td id="cell_12"></td></tr>' + 
	'<tr><td id="cell_13"></td><td id="cell_14"></td><td id="cell_15"></td>' + 
	'<td id="cell_16"></td><td id="cell_17"></td><td id="cell_18"></td></tr>' + 
	'</table>';
	var control = '<table id="ctrl_panel" class="ctrl_panel">' + 
	'<tr><td class="score">Score: <span id="score_change"></span><br />' + 
	'<span id="score"></span></td></tr>' + 
	'<tr><td class="time">Timeleft: <span id="time_change"></span><br />' + 
	'<span id="time" onclick="ultra_cheat()" alt="TIME"></span></td></tr>' + 
	'<tr><td class="level">Level: <span id="level_change"></span><br />' + 
	'<span id="level"></span></td></tr>' + 
	'<tr><td><input type="image" src="Images/back.jpg" onclick="title_page()"><br />' + 
	'<input type="image" src="Images/pause.jpg" id="pause" ' + 
	'onclick="pause_resume()"></td></tr></table>';
	$("#left").html(control);
	$("#right").html(game);
	$("#time").css("color","black");
}

//Inner controls
//initializing
function load_game(){
	load_tables();
	load_data();
	show_all();
	process_1();
}

//initializing the score, time and level and shuffling the cards
function load_data(){
	resetting = false;
	time_ready = time_ready_list[level-1];
	curtime = time_left[level-1];
	score = 0;
	
	load_cards();
	
	$("#score").html(total_score);
	$("#time").html(time_ready);
	$("#level").html(level);
}

//Showing or hiding all cards
function show_all(){
	for(var i = 0; i < pairs.length; i++){
		$('#cell_' + (i+1)).html('<img class="card" id="card_' + i + '" src="' + pairs[i] + '"/>');
	}
}

function hide_all(){
	for(var i = 0; i < pairs.length; i++){
		$('#cell_' + (i+1)).html('<img class="card" id="card_' + i + 
		'" src="Images/card_bk.jpg" onclick="turn(this,&#34;' + pairs[i] + '&#34;)"/>');
	}
}

//get time spent
function getTimeSpent(){
	time_spent += time_left[level-1] - curtime;
	return time_spent;
}

//calculating the time bonus
function time_bonus(){
	var n = 0;
	if(level <= 4)
		n = 5 * level;
	else
		n = 100;
	return n;
}

//Threads
//count down to hide the cards
function process_1(){
	timer1 = setInterval(function(){
		if(paused == false){
			show_all();
			time_ready --;
			$("#time").html(time_ready);
		}
		else
			hide_all();
		if(time_ready == 0){
			clearInterval(timer1);
			$("#time").html(curtime);
			hide_all();
			process_2();
		}
	},1000);
}

//time left
function process_2(){
	timer2 = setInterval(function(){
		if(paused == false){
			curtime--;
			$("#time").html(curtime);
		}
		if(paired == pairs.length || aced){
			clearInterval(timer2);
			if(paused == false){
				add_score = curtime * time_bonus();
				score += add_score;
				total_score += add_score;
				$("#score").html(total_score);
			}
		}
		if(curtime <= 10){
			$("#time").css("color","red");
		}
		if(curtime == 0){
			clearInterval(timer2);
			getTimeSpent();
			$("#time").html("Time out");
			total_score -= score;
			$("#score").html(total_score);
			alert('Your score so far: ' + total_score + '\n' +
			'You spent: ' + time_spent + ' seconds');
			setTimeout(function(){
				load_game();
			},5000);
		}
	},1000);
}

//Player control and game play
//Pause or resume the game
function pause_resume(){
	if(paused == false){
		paused = true;
		$("#pause").attr("src","Images/resume.jpg");
	}
	else{
		paused = false;
		$("#pause").attr("src","Images/pause.jpg");
	}
}

//cheating within the last 10 seconds at level 3
function ultra_cheat(){
	if(level == 5 && paired != 18 && curtime <=10 && paused == false){
		aced = true;
		show_all();
		add_score = (18-paired)/2*150;
		score += add_score;
		total_score += add_score;
		$("#score").html(total_score);
		getTimeSpent();
		alert('Aced\n' + 
		'Your score: ' + total_score + '\n' +
		'You spent: ' + time_spent + ' seconds');
		setTimeout(function(){
			title_page();
		},5000);
	}
}

//turning event
function turn(img, src){
	if(src_values.length < 2){
		img.src = src;
		if(src_values.length == 0){
			img_values.push(img);
			src_values.push(src);
			timer5 = setTimeout(function(){
				if(paused == false && total_score >= 5){
					add_score = -5;
					score += add_score;
					total_score += add_score;
					$("#score").html(total_score);
				}
				img_values[0].src = "Images/card_bk.jpg";
				img_values = [];
				src_values = [];
			},3000);
		}
		else
			if(src_values.length == 1){
				clearInterval(timer5);
				img_values.push(img);
				src_values.push(src);
				if(src_values[0] == src_values[1] && img_values[0].id != img_values[1].id){
					img_values[0].onclick = null;
					img_values[1].onclick = null;
					img_values = [];
					src_values = [];
					paired += 2;
					if(paused == false){
						add_score = 100;
						score += add_score;
						total_score += add_score;
						$("#score").html(total_score);
					}
					
					if(curtime <= (curtime/2) && paused == false){
						curtime++;
						$("#time").html(curtime);
					}
					if(paired == pairs.length){
						getTimeSpent();
						if(level == 5){
							alert('Congratulations\n' + 
							'Your score: ' + total_score + '\n' +
							'You spent: ' + time_spent + ' seconds');
							setTimeout(function(){
								if(!paused)
									title_page();
							},5000);
						}
						else{
							var i = 4;
							var timer3 = setInterval(function(){
								i--;
								$("#time").css("color","blue");
								$("#time").html("You won! " + i);
								if(i == 0){
									clearInterval(timer3);
									level++;
									$("#level").html(level);
									load_game();
								}
							}, 1000);
						}
					}
				}
				else{
					if(paused == false && curtime > (curtime/2)){
						curtime--;
						$("#time").html(curtime);
					}
					if(paused == false && total_score >= 25){
						add_score = -25;
						score += add_score;
						total_score += add_score;
						$("#score").html(total_score);
					}
					setTimeout(function(){
						img_values[0].src = "Images/card_bk.jpg";
						img_values[1].src = "Images/card_bk.jpg";
						img_values = [];
						src_values = [];
					},550);
				}
			}
	}
}