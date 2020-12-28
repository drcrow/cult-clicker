var gameRandomEvents = {
    "police-raid": {
        "type": "negative",
        "message": "A police raid cost the lives of % members.",
        "odds": 100, // Odds over 10000
        "stat": "members", // Stat where poits will be lost
        "amount": "",
        "min": 1, // Minimum percentage of loss
        "max": 10 // Maximum percentage of loss
    },
    "god-blessing": {
        "type": "positive",
        "message": "Your loving god rewarded your hard work with % fait.",
        "odds": 100,
        "stat": "fait",
        "min": 1,
        "max": 20
    }
};