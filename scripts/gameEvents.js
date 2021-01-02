var gameEvents = {

    "game-start": {
        "done": 0,
        "conditions":[{
            "resource": "time",
            "amount": 0
        }],
        "results": [{
            "type": "log",
            "message": "Welcome to Cult Clicker. First of all you need to select a God."
        }]
    },

    "selected-god": {
        "done": 0,
        "conditions":[{
            "resource": "god",
            "amount": 1
        }],
        "results": [{
            "type": "display",
            "element": "areaLibrary"
        },{
            "type": "display",
            "element": "actionStudy"
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
        },{
            "type": "display",
            "element": "resourceMembers"
        },{
            "type": "display",
            "element": "actionRecruit"
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