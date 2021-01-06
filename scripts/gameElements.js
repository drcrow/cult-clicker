/**
 * List of Areas and Actions
 */

var gameElements = {
    "frontYard": {
        "label": "Front Yard",
        "visible": true, // Menu is displayed (several menus can be displayed at the same time)
        "active": true, // Block is displayed (only one block must be displayed)
        "actions": [{
            "name": "enter",
            "label": "ENTER",
            "visible": true,
            "results": [
                {"type": "enable-area", "value": true, "area": "library"}
            ]
        }]
    },

    "library": {
        "label": "Library",
        "visible": false,
        "active": false,
        "actions": [{
            "label": "Study",
            "visible": true,
            "cost": [
                {"resource": "sanity", "amount": 10, "modifier": 1.1},
                {"resource": "books", "amount": 1, "modifier": 1.1}
            ],
            "results": [
                {"type": "buy-resource", "value": 1, "resource": "intelligence"}
            ]
        }]
    },
};