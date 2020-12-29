/**
 * Recalculate and Refresh for the interval
 */
function updateGame() {
    updatePoints();
    updateLabels();
    runEvents();
    localStorage.setItem('gameStats', JSON.stringify(gameStats));
}

/**
 * Load saved game stats and start interval
 */
$(document).ready(function() {
    var savedGameStats = JSON.parse(localStorage.getItem('gameStats'));
    if(savedGameStats != null){
        gameStats = savedGameStats;
    }

    // Interval (cicle of the game) Each cicle is a day
    window.intervalID = window.setInterval(updateGame, 1000);
});

/**
 * Reset saved game stats
 */
function resetGame() {
    clearInterval(window.intervalID);
    localStorage.setItem('gameStats', null);
    location.reload();
}

/**
 * Refresh the values of all the stats labels
 */
function updateLabels() {

     // time indicator
    $('#days-view').text(formatDays(gameStats.time.points));

    Object.keys(gameStats).forEach(stat => {

        // table of values
        $('#label-'+stat+'-pts').text(gameStats[stat].points);
        $('#label-'+stat+'-inc').text(gameStats[stat].increment);

        // costs in buttons
        if(gameStats[stat].cost != undefined){

            var costText = '';

            for (var costIndex in gameStats[stat].cost) {
                var cost = gameStats[stat].cost[costIndex];
                costText = costText + ' -' + cost.amount + ' ' + cost.stat;
            }

            $('#'+stat+'-cost').text(costText);
        }

    });
}

/**
 * Apply the autoincrement for stats points
 */
function updatePoints() {
    Object.keys(gameStats).forEach(stat => {
        if(gameStats[stat].increment != 0){
            gameStats[stat].points = gameStats[stat].points + gameStats[stat].increment;
        }

    });
}

/**
 * Ejecute all the events if the conditions are ok
 */
function runEvents() {
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
                            addLog(result.message, result.logtype);
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

/**
 * Add new message log
 */
function addLog(message, type) {
    switch(type){
        case 'success':
            $('.log').prepend('<small class="log-success">&ofcir; '+message+'</small>');
            break;
        case 'danger':
            $('.log').prepend('<small class="log-danger">&ofcir; '+message+'</small>');
            break;
        default:
            $('.log').prepend('<small>&ofcir; '+message+'</small>');
            break;
    }
}

/**
 * Execute an action from one button (in generl, to gain some stat)
 */
function doAction(action) {
    switch(action){
        case 'pray':
            buyStat('fait', 1);
            //consumeStat(stat, qty);
            break;
        case 'study':
            buyStat('knowledge', 1);
            break;
        case 'write':
            buyStat('grimoires', 1);
            break;
    }

    updateLabels();
}

/**
 * Increment the points of a stat (in general by click an action button)
 */
function buyStat(stat, qty) {
    // 1: Check costs
    if(gameStats[stat].cost != undefined){
        for (var costIndex in gameStats[stat].cost) {
            var cost = gameStats[stat].cost[costIndex];
            if(gameStats[cost.stat].points < (cost.amount * qty)){
                addLog('Not enough '+cost.stat, 'danger');
                return false;
            }
        }
    }

    // 2: Pay costs
    if(gameStats[stat].cost != undefined){
        for (var costIndex in gameStats[stat].cost) {
            var cost = gameStats[stat].cost[costIndex];
            consumeStat(cost.stat, cost.amount);
        }
    }

    // 3: Add qty to the Stat
    gameStats[stat].points = gameStats[stat].points + qty;

    // 4: If the stat has some "product", update the product's increments
    if(gameStats[stat].product != undefined){
        for (var productIndex in gameStats[stat].product) {
            var product = gameStats[stat].product[productIndex];
            gameStats[product.stat].increment = gameStats[product.stat].increment + (qty * product.amount);
        }
    }
}

/**
 * Decrement the points of a stat (in general consumed by an action)
 * If the stat has a "product" (autoincrement other stat) this autoincrement must be modified
 */
function consumeStat(stat, qty) {
    gameStats[stat].points = gameStats[stat].points - qty;

    if(gameStats[stat].product != undefined){
        for (var productIndex in gameStats[stat].product) {
            var product = gameStats[stat].product[productIndex];
            gameStats[product.stat].increment = gameStats[product.stat].increment - (qty * product.amount);
        }
    }
}

/**
 * Show/Hide content blocks (from the menu)
 */
function showBlock(block) {

    // Hide all block and show the selected one
    $('.collapse').collapse('hide');
    $('.block').hide();
    $('.block-'+block).show();

    // Remove background and add the one of the selected block
    $('body').removeClass('bg_home bg_cult bg_forest bg_town bg_help');
    $('body').addClass('bg_'+block);
}

/**
 * Format days (cicles) this whas stolen from stackoverflow
 */
function formatDays (diff) {

    var str = '';
    var values = [['y', 365], ['m', 30], ['d', 1]];
    for (var i=0;i<values.length;i++) {
      var amount = Math.floor(diff / values[i][1]);
      if (amount >= 1) {
         str += amount + values[i][0] + (amount > 1 ? 's' : '') + ' ';
         diff -= amount * values[i][1];
      }
    }
    return str;
  }