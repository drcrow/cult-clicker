var gameStats = {
    "fait": {
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
            "stat": "money",
            "amount": 100,
            "modifier": 1.1
        }
    },
};

// Refresh the values of all the stats labels
function updateLabels(){
    Object.keys(gameStats).forEach(stat => {
        $('#label-'+stat+'-pts').text(gameStats[stat].points);
        $('#label-'+stat+'-inc').text(gameStats[stat].increment);
        if(gameStats[stat].cost != undefined){
            $('#label-'+stat+'-cost').text(gameStats[stat].cost.amount);
        }

    });
}

// Apply the autoincrement of stats points
function updatePoints(){
    Object.keys(gameStats).forEach(stat => {
        if(gameStats[stat].increment != 0){
            gameStats[stat].points = gameStats[stat].points + gameStats[stat].increment;
        }

    });
}

// Recalculate and Refresh for the interval
function updateGame(){
    updatePoints();
    updateLabels();
}

// Interval (cicle of the game)
var intervalID = window.setInterval(updateGame, 1000);

// Update the Increment of a Stat when it is purchased (+) or used (-)
function updateIncrement(stat, purchased){
    if(gameStats[stat].product != undefined){
        var productStat = gameStats[stat].product.stat;
        var productAmount = gameStats[stat].product.amount;

        if(purchased){ // purchased (+)
            gameStats[productStat].increment = gameStats[productStat].increment + productAmount;
        }else{  // used (-)
            gameStats[productStat].increment = gameStats[productStat].increment - productAmount;
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
        updateIncrement('members', true);
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

    updateIncrement(costStat, false);

    gameStats[costStat].points = gameStats[costStat].points - costAmount;
    gameStats[stat].cost.amount = newCostAmount;
}

// Show/Hide content blocks (from the menu)
function showBlock(block){
    $('.collapse').collapse('hide');
    $('.block').hide();
    $('.block-'+block).show();
}