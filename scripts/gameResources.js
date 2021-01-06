var gameResources = {

    "time": {               // Time is only used to count the past of time
        "label": "time",    // Label used in UI
        "visible": false,
        "points": 0,        // Current points
        "increment": 1      // Automatic increment of points in each interval
    },

    "god": {            // god is not as the rest of resources, is used to save the selected god's name
        "label": "god",
        "visible": false,
        "points": 0,
        "increment": 0,
        "value": ''     //God's name
    },

    "sanity": {
        "label": "Sanity",
        "visible": true,
        "points": 999,
        "increment": 0.05
    },

    "intelligence": {
        "label": "Intell",
        "visible": true,
        "points": 10,
        "increment": 0,
        "cost": [{
            "resource": "sanity",
            "amount": 10,
            "modifier": 1.1
        },{
            "resource": "books",
            "amount": 1,
            "modifier": 1.1
        }]
    },

    "money": {
        "label": "Money",
        "visible": true,
        "points": 200,
        "increment": 0.05,
        "cost": {
            "resource": "members",
            "amount": 1,
            "modifier": 1.1
        }
    },

    "books": {
        "label": "Books",
        "visible": true,
        "points": 999,
        "increment": 0
    },

    "knowledge": {
        "label": "Knowledge",
        "visible": false,
        "points": 0,
        "increment": 0
    },

    "grimoires": {
        "label": "Grimoires",
        "visible": false,
        "points": 0,
        "increment": 0,
        "cost": [{
            "resource": "fait",
            "amount": 10,
            "modifier": 1.1
        },{
            "resource": "knowledge",
            "amount": 10,
            "modifier": 1.1
        },],
        "product": [{
            "resource": "magic",
            "amount": 1
        }]
    },

    "magic": {
        "label": "Magic",
        "visible": false,
        "points": 0,
        "increment": 0
    },

    "members": {
        "label": "Members",
        "visible": false,
        "points": 0,
        "increment": 0,
        "cost": [{
            "resource": "fait",
            "amount": 10,
            "modifier": 1.1
        }],
        "product": [{
            "resource": "fait",
            "amount": 1
        }]
    },

    "land": {
        "label": "Land",
        "visible": false,
        "points": 0,
        "increment": 0,
        "cost": {
            "resource": "members",
            "amount": 10,
            "modifier": 1.1
        },
        "product": {
            "resource": "magic",
            "amount": 1
        }
    },
};