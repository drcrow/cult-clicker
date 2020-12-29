/**
 * Load saved game resources and start interval
 */
$(document).ready(function() {
    var savedGameResources = JSON.parse(localStorage.getItem('gameResources'));
    if(savedGameResources != null){
        gameResources = savedGameResources;
    }

    // Interval (cicle of the game) Each cicle is a day
    window.intervalID = window.setInterval(updateGame, 1000);
});

/**
 * Recalculate and Refresh for the interval
 */
function updateGame() {
    updatePoints();
    updateLabels();
    runEvents();
    localStorage.setItem('gameResources', JSON.stringify(gameResources));
}

/**
 * Apply the autoincrement for resources points
 */
function updatePoints() {
    Object.keys(gameResources).forEach(resource => {
        if(gameResources[resource].increment != 0){
            gameResources[resource].points = gameResources[resource].points + gameResources[resource].increment;
        }

    });
}

/**
 * Refresh the values of all the resources labels
 */
function updateLabels() {

    // time indicator
   $('#days-view').text(formatDays(gameResources.time.points));

   Object.keys(gameResources).forEach(resource => {

       // table of values
       $('#label-'+resource+'-pts').text(gameResources[resource].points);
       $('#label-'+resource+'-inc').text(gameResources[resource].increment);

       // costs in buttons
       if(gameResources[resource].cost != undefined){

           var costText = '';

           for (var costIndex in gameResources[resource].cost) {
               var cost = gameResources[resource].cost[costIndex];
               costText = costText + ' -' + cost.amount + ' ' + cost.resource;
           }

           $('#'+resource+'-cost').text(costText);
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
                if(gameResources[condition.resource].points < condition.amount){
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
                        case "activate-area":
                            activateElement('area', result.element, true);
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
 * Reset saved game resources
 */
function resetGame() {
    clearInterval(window.intervalID);
    localStorage.setItem('gameResources', null);
    location.reload();
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
 * Execute an action from one button (in generl, to gain some resource)
 */
function doAction(action) {
    switch(action){
        case 'pray':
            buyResource('fait', 1);
            //consumeResource(resource, qty);
            break;
        case 'study':
            buyResource('knowledge', 1);
            break;
        case 'write':
            buyResource('grimoires', 1);
            break;
        case 'recruit':
            buyResource('members', 1);
            break;
    }

    updateLabels();
}

/**
 * Increment the points of a resource (in general by click an action button)
 */
function buyResource(resource, qty) {
    // 1: Check costs
    if(gameResources[resource].cost != undefined){
        for (var costIndex in gameResources[resource].cost) {
            var cost = gameResources[resource].cost[costIndex];
            if(gameResources[cost.resource].points < (cost.amount * qty)){
                addLog('Not enough '+cost.resource, 'danger');
                return false;
            }
        }
    }

    // 2: Pay costs
    if(gameResources[resource].cost != undefined){
        for (var costIndex in gameResources[resource].cost) {
            var cost = gameResources[resource].cost[costIndex];
            consumeResource(cost.resource, cost.amount);
            // Increment modifier of the cost
            gameResources[resource].cost[costIndex].amount = Math.round(gameResources[resource].cost[costIndex].amount * gameResources[resource].cost[costIndex].modifier);
        }
    }

    // 3: Add qty to the Resource
    gameResources[resource].points = gameResources[resource].points + qty;

    // 4: If the resource has some "product", update the product's increments
    if(gameResources[resource].product != undefined){
        for (var productIndex in gameResources[resource].product) {
            var product = gameResources[resource].product[productIndex];
            gameResources[product.resource].increment = gameResources[product.resource].increment + (qty * product.amount);
        }
    }
}

/**
 * Decrement the points of a resource (in general consumed by an action)
 * If the resource has a "product" (autoincrement other resource) this autoincrement must be modified
 */
function consumeResource(resource, qty) {
    gameResources[resource].points = gameResources[resource].points - qty;
    if(gameResources[resource].product != undefined){
        for (var productIndex in gameResources[resource].product) {
            var product = gameResources[resource].product[productIndex];
            gameResources[product.resource].increment = gameResources[product.resource].increment - (qty * product.amount);
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