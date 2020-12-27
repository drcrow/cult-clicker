var gameStats = {
    "fait": {
        "points": 0,
        "increment": 0
    },
    "members": {
        "points": 0,
        "increment": 0,
        "cost": {
            "stat": "fait",
            "amount": 10,
            "modifier": 1.1
        },
        "product": {
            "stat": "fait",
            "amount": 1
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

function updateLabels(){
    $('#label-fait-pts').text(gameStats.fait.points);
    $('#label-fait-inc').text(gameStats.fait.increment);

    $('#label-members-pts').text(gameStats.members.points);
    $('#label-members-inc').text(gameStats.members.increment);
    $('#label-members-cost').text(gameStats.members.cost.amount);

    $('#label-money-pts').text(gameStats.money.points);
    $('#label-money-inc').text(gameStats.money.increment);
    $('#label-money-cost').text(gameStats.money.cost.amount);
}

var intervalID = window.setInterval(updateLabels, 1000);

function pray(){
    gameStats.fait.points = gameStats.fait.points + 1;
    updateLabels();
}

function recruit(){
    if(checkCost('members')){
        spendCost('members');
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

function checkCost(stat){
    var costStat = gameStats[stat].cost.stat;
    var costAmount = gameStats[stat].cost.amount;

    if(gameStats[costStat].points >= costAmount){
        return true;
    }else{
        return false;
    }
}

function spendCost(stat){
    var costStat = gameStats[stat].cost.stat;
    var costAmount = gameStats[stat].cost.amount;
    var newCostAmount = Math.round(gameStats[stat].cost.amount * gameStats[stat].cost.modifier);

    gameStats[costStat].points = gameStats[costStat].points - costAmount;
    gameStats[stat].cost.amount = newCostAmount;
}

function showBlock(block){
    $('.collapse').collapse('hide');
    $('.block').hide();
    $('.block-'+block).show();
}