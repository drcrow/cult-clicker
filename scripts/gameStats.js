var gameStats = {

    "time": { // Time is only used to count the past of time
        "points": 0,    // Current points
        "increment": 1  // Automatic increment of points in each interval
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
            "stat": "fait",
            "amount": 10,
            "modifier": 1.1
        },{
            "stat": "knowledge",
            "amount": 10,
            "modifier": 1.1
        },],
        "product": [{
            "stat": "magic",
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