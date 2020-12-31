var gameResources = {

    "time": {           // Time is only used to count the past of time
        "points": 0,    // Current points
        "increment": 1  // Automatic increment of points in each interval
    },

    "god": {            // god is not as the rest of resources, is used to save the selected god's name
        "points": 0,
        "increment": 0,
        "value": ''     //God's name
    },

    "fait": {
        "points": 0,
        "increment": 0
    },

    "knowledge": {
        "points": 0,
        "increment": 0
    },

    "grimoires": {
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
        "points": 0,
        "increment": 0
    },

    "members": {
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

    "money": {
        "points": 0,
        "increment": 0,
        "cost": {
            "resource": "members",
            "amount": 1,
            "modifier": 1.1
        }
    },
    "land": {
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