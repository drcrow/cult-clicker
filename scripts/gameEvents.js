var gameEvents = {

    "game-start-1": {
        "done": 0,
        "conditions":[{
            "resource": "time",
            "amount": 0
        }],
        "results": [{
            "type": "log",
            "message": "Welcome to Cult Clicker. Start in the dark isolation of your home and grow your power building an ominous cult to help your ancient god to raise again."
        }]
    },

    "is-praying": {
        "done": 0,
        "conditions":[{
            "resource": "fait",
            "amount": 5
        }],
        "results": [{
            "type": "log",
            "message": "Keep praying!!."
        }]
    },

    "is-studying": {
        "done": 0,
        "conditions":[{
            "resource": "knowledge",
            "amount": 5
        }],
        "results": [{
            "type": "log",
            "message": "Keep studying!!."
        }]
    },

    "ready-for-write": {
        "done": 0,
        "conditions":[{
            "resource": "fait",
            "amount": 10
        },{
            "resource": "knowledge",
            "amount": 10
        }],
        "results": [{
            "type": "display",
            "element": "resourceGrimoires"
        },{
            "type": "display",
            "element": "actionWrite"
        }]
    },

    "first-grimoires": {
        "done": 0,
        "conditions":[{
            "resource": "grimoires",
            "amount": 1
        }],
        "results": [{
            "type": "display",
            "element": "resourceMagic"
        }]
    },

    "new-area-town": {
        "done": 0,
        "conditions":[{
            "resource": "fait",
            "amount": 50
        },{
            "resource": "knowledge",
            "amount": 50
        }],
        "results": [{
            "type": "display",
            "element": "areaTown"
        }]
    },

    "first-year": {
        "done": 0,
        "conditions":[{
            "resource": "time",
            "amount": 365
        }],
        "results": [{
            "type": "log",
            "message": "You have reached your first year in the search for ultimate enlightenment!!!"
        }]
    },

    "first-member": {
        "done": 0,
        "conditions":[{
            "resource": "members",
            "amount": 1
        }],
        "results": [{
            "type": "log",
            "message": "Each new member will pray with you and make your fait grow."
        }]
    },
    "discover-forest": {
        "done": 0,
        "conditions":[{
            "resource": "members",
            "amount": 10
        }],
        "results": [{
            "type": "display",
            "element": "areaForest"
        }]
    }
};