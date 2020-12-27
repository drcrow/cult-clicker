var gameStats = {
    "fait": {
        "points": 0,    // Current points
        "increment": 0  // Automatic increment of points in each interval
    },
    "magic": {
        "points": 0,    // Current points
        "increment": 0  // Automatic increment of points in each interval
    },
    "members": {
        "points": 0,
        "increment": 0,
        "cost": {   // Cost of buying this stat
            "stat": "fait",
            "amount": 10,
            "modifier": 1.1
        },
        "product": {    // Product of buying this stat
            "stat": "fait", // Stat modified
            "amount": 1 // Amount added to the increment of the modified stat
        }
    },
    "money": {
        "points": 0,
        "increment": 0,
        "cost": {
            "stat": "members",
            "amount": 1,
            "modifier": 1.1
        }
    },
    "land": {
        "points": 0,
        "increment": 0,
        "cost": {
            "stat": "members",
            "amount": 10,
            "modifier": 1.1
        },
        "product": {
            "stat": "magic",
            "amount": 1
        }
    },
};

var gameEvents = {
    "game-start": {
        "done": 0,
        "conditions":[{
            "stat": "fait",
            "amount": 0
        }],
        "results": [{
            "type": "log",
            "message": "Your God needs your faith to become stronger and stronger. Show him that you are worthy of existing."
        }]
    },
    "is-praying": {
        "done": 0,
        "conditions":[{
            "stat": "fait",
            "amount": 5
        }],
        "results": [{
            "type": "log",
            "message": "Dont stop!!."
        }]
    },
    "ready-for-first-member": {
        "done": 0,
        "conditions":[{
            "stat": "fait",
            "amount": 10
        }],
        "results": [{
            "type": "log",
            "message": "Is time to recruit new members."
        },
        {
            "type": "display",
            "object": "#members-row"
        },
        {
            "type": "display",
            "object": "#recruit-btn"
        }]
    },
    "first-member": {
        "done": 0,
        "conditions":[{
            "stat": "members",
            "amount": 1
        }],
        "results": [{
            "type": "log",
            "message": "Each new member will pray with you and make your fait grow."
        }]
    },
    "discover-forest": {
        "done": 0,
        "conditions":[{
            "stat": "members",
            "amount": 10
        }],
        "results": [{
            "type": "log",
            "message": "Explore the nearby forest and make sacrifices to bless the land."
        },
        {
            "type": "display",
            "object": "#forest-menu"
        }]
    }
};

// Load saved game stats
$(document).ready(function(){
    var savedGameStats = JSON.parse(localStorage.getItem('gameStats'));
    if(savedGameStats != null){
        gameStats = savedGameStats;
    }
});

// Reset saved game stats
function resetGame(){
    clearInterval(intervalID);
    localStorage.setItem('gameStats', null);
    location.reload();
}

// Refresh the values of all the stats labels
function updateLabels(){
    Object.keys(gameStats).forEach(stat => {
        $('#label-'+stat+'-pts').text(gameStats[stat].points);
        $('#label-'+stat+'-inc').text(gameStats[stat].increment);

        if(gameStats[stat].cost != undefined){
            $('#label-'+stat+'-cost').text(gameStats[stat].cost.amount);
            $('#label-'+stat+'-cost-stat').text(gameStats[stat].cost.stat);
        }

        if(gameStats[stat].product != undefined){
            $('#label-'+stat+'-product').text(gameStats[stat].product.amount);
        }

    });
}

// Apply the autoincrement for stats points
function updatePoints(){
    Object.keys(gameStats).forEach(stat => {
        if(gameStats[stat].increment != 0){
            gameStats[stat].points = gameStats[stat].points + gameStats[stat].increment;
        }

    });
}

// Ejecute all the events if the conditions are ok
function updateEvents(){
    Object.keys(gameEvents).forEach(event => {
        if(gameEvents[event].done == 0){ // Only process events not done
            var canBeDone = true;
            for (var conditionIndex in gameEvents[event].conditions) { // Validate conditions
                var condition = gameEvents[event].conditions[conditionIndex];
                if(gameStats[condition.stat].points < condition.amount){
                    canBeDone = false;
                }
            }

            if(canBeDone){ // Excecute results
                gameEvents[event].done = 1;
                for (var resultIndex in gameEvents[event].results) {
                    var result = gameEvents[event].results[resultIndex];
                    switch (result.type) {
                        case "log":
                            addLog(result.message);
                            break;
                        case "display":
                            $(result.object).show();
                            break;
                        default:
                            break;
                    }
                }
            }
        }

    });
}

// Recalculate and Refresh for the interval
function updateGame(){
    updatePoints();
    updateLabels();
    updateEvents();
    localStorage.setItem('gameStats', JSON.stringify(gameStats));
}

// Interval (cicle of the game)
var intervalID = window.setInterval(updateGame, 1000);

function addLog(message){
    $('.log').prepend('<small>'+message+'</small>');
}

// Update the Increment of a Stat when it is purchased (+) or used (-)
function updateIncrement(stat, qty, purchased){
    if(gameStats[stat].product != undefined){
        var productStat = gameStats[stat].product.stat;
        var productAmount = gameStats[stat].product.amount;

        if(purchased){ // purchased (+)
            gameStats[productStat].increment = gameStats[productStat].increment + (qty * productAmount);
        }else{  // used (-)
            gameStats[productStat].increment = gameStats[productStat].increment - (qty * productAmount);
        }
    }
}

function pray(){
    gameStats.fait.points = gameStats.fait.points + 1;
    updateLabels();
}

function recruit(){
    if(checkCost('members')){
        spendCost('members');
        updateIncrement('members', 1, true);
        gameStats.members.points = gameStats.members.points + 1;
        updateLabels();
    }
}

function collect(){
    if(checkCost('money')){
        spendCost('money');
        gameStats.money.points = gameStats.money.points + 10;
        updateLabels();
    }
}

function takeLand(){
    if(checkCost('land')){
        spendCost('land');
        updateIncrement('land', 1, true);
        gameStats.land.points = gameStats.land.points + 1;
        updateLabels();
    }
}

// Check if a stat's cost can be paid
function checkCost(stat){
    var costStat = gameStats[stat].cost.stat;
    var costAmount = gameStats[stat].cost.amount;

    if(gameStats[costStat].points >= costAmount){
        return true;
    }else{
        return false;
    }
}

// Pay stat's cost
function spendCost(stat){
    var costStat = gameStats[stat].cost.stat;
    var costAmount = gameStats[stat].cost.amount;
    var newCostAmount = Math.round(gameStats[stat].cost.amount * gameStats[stat].cost.modifier);

    updateIncrement(costStat, costAmount, false);

    gameStats[costStat].points = gameStats[costStat].points - costAmount;
    gameStats[stat].cost.amount = newCostAmount;
}

// Show/Hide content blocks (from the menu)
function showBlock(block){

    // Hide all block and show the selected one
    $('.collapse').collapse('hide');
    $('.block').hide();
    $('.block-'+block).show();

    // Remove background and add the one of the selected block
    $('body').removeClass('bg_cult bg_forest bg_town bg_help');
    $('body').addClass('bg_'+block);
}