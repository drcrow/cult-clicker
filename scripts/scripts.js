/**
 * Load saved game resources and start interval
 */
$(document).ready(function() {
    // Load gameResources from localStorage
    var savedGameResources = JSON.parse(localStorage.getItem('gameResources'));
    if(savedGameResources != null){
        gameResources = savedGameResources;
        console.log('Restored gameResources');
    }

    // Load gameElements from localStorage
    var savedGameElements = JSON.parse(localStorage.getItem('gameElements'));
    if(savedGameElements != null){
        gameElements = savedGameElements;
        console.log('Restored gameElements');
    }

    // Load gameEvents from localStorage
    var savedGameEvents = JSON.parse(localStorage.getItem('gameEvents'));
    if(savedGameEvents != null){
        gameEvents = savedGameEvents;
        console.log('Restored gameEvents');
    }

    // Show visible gameElements
    for (var elementIndex in gameElements) {
        var element = gameElements[elementIndex];
        if(element.visible == true){
            showElement(elementIndex, false);
        }
        //console.log(element);
    }

    // Generate list of buttons for god selection
    godsButtons();

    // If god is already selected, display Home
    if(gameResources.god.points == 1) {
        showBlock('home');
    }

    // Interval (cicle of the game) Each cicle is a day
    window.intervalID = window.setInterval(updateGame, 1000);
});

/**
 * Shows and elemente of the interface (area (menu item), resource (table row), action (button))
 */
function showElement(elementIndex, showMessage) {
    $(gameElements[elementIndex].selector).show();
    gameElements[elementIndex].visible = true;
    if(showMessage == true) {
        switch(gameElements[elementIndex].type){
            case 'area':
                addLog('New area available: ' + gameElements[elementIndex].label + '. ' + gameElements[elementIndex].message, 'blue');
                break;
            case 'resource':
                addLog('New resource: ' + gameElements[elementIndex].label + '. ' + gameElements[elementIndex].message, 'blue');
                break;
            case 'action':
                addLog('Now you can: ' + gameElements[elementIndex].label + '. ' + gameElements[elementIndex].message, 'blue');
                break;
        }
    }

}

/**
 * Recalculate and Refresh for the interval
 */
function updateGame() {
    updatePoints();
    updateLabels();
    runEvents();
    localStorage.setItem('gameResources', JSON.stringify(gameResources));
    localStorage.setItem('gameElements', JSON.stringify(gameElements));
    localStorage.setItem('gameEvents', JSON.stringify(gameEvents));
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
                            addLog(result.message, 'gray');
                            break;
                        case "display":
                            showElement(result.element, true);
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
    localStorage.setItem('gameElements', null);
    localStorage.setItem('gameEvents', null);
    location.reload();
}

/**
 * Add new message log
 */
function addLog(message, color) {
    $('.log').prepend('<small class="log-' + color + '">&ofcir; ' + message + '</small>');
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
                addLog('Not enough '+cost.resource, 'red');
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
function formatDays(diff) {
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

/**
 * Gods list
 */
var godsList = {
    "CTHULHU": {
        "description": "Master of R'lyeh",
        "phrase": "In his house at R'lyeh dead Cthulhu waits dreaming. Iä iä Cthulhu fhtagn!"
    },
    "TSATHOGGUA": {
        "description": "The Toad-God",
        "phrase": "In that secret cave in the bowels of Voormithadreth abides from eldermost eons the god Tsathoggua."
    },
    "YOG-SOTHOTH": {
        "description": "The Beyond-One",
        "phrase": "Yog-Sothoth knows the gate. Yog-Sothoth is the gate. Yog-Sothoth is the key and guardian of the gate. Past, present, future, all are one in Yog-Sothoth."
    },
    "NYARLATHOTEP": {
        "description": "The Crawling Chaos",
        "phrase": "To Nyarlathotep, Mighty Messenger, must all things be told. And he shall put on the semblance of man, the waxen mask and the robes that hide, and come down from the world of Seven Suns to mock."
    },
    "SHUB-NIGGURATH": {
        "description": "Lord of the Wood",
        "phrase": "Iä! Shub-Niggurath! The Black Goat of the Woods with a Thousand Young!"
    }
};

/**
 * Generte Gods buttons list
 */
function godsButtons() {
    for (var godName in godsList) {
        //console.log(godName);
        $('#god-selection').append('<button class="btn btn-sm btn-success" type="button" onclick="selectGod(\'' + godName + '\');">' + godName + '<br><small>' + godsList[godName].description + '</small></button>');
    }
}

/**
 * Save selected god's name
 */
function selectGod(godName) {
    gameResources.god.points = 1;
    gameResources.god.value = godName;
    addLog(godsList[godName].phrase, 'blue');
    //showElement('areaHome', false);
    showBlock('home');
}
