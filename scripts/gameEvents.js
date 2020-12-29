var gameEvents = {

    "game-start-1": {
        "done": 0,
        "conditions":[{
            "stat": "time",
            "amount": 0
        }],
        "results": [{
            "type": "log",
            "message": "Welcome to Cult Clicker. Start in the dark isolation of your home and grow your power building an ominous cult to help your ancient god to raise again."
        }]
    },

    "game-start-2": {
        "done": 0,
        "conditions":[{
            "stat": "time",
            "amount": 5
        }],
        "results": [{
            "type": "log",
            "message": "With pray and study you will gain fait and knowledge."
        }]
    },

    "is-praying": {
        "done": 0,
        "conditions":[{
            "stat": "fait",
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
            "stat": "knowledge",
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
            "stat": "fait",
            "amount": 10
        },{
            "stat": "knowledge",
            "amount": 10
        }],
        "results": [{
            "type": "log",
            "message": "Leave a written record of what grows in your mind and soul."
        },{
            "type": "display-resource",
            "element": "#grimoires-row"
        },{
            "type": "display-action",
            "element": "#write-btn"
        }]
    },

    "first-grimoires": {
        "done": 0,
        "conditions":[{
            "stat": "grimoires",
            "amount": 1
        }],
        "results": [{
            "type": "log",
            "message": "Your grimoires will help you grow your magic power."
        },{
            "type": "display-resource",
            "element": "#magic-row"
        }]
    },

    "new-area-town": {
        "done": 0,
        "conditions":[{
            "stat": "fait",
            "amount": 50
        },{
            "stat": "knowledge",
            "amount": 50
        }],
        "results": [{
            "type": "log",
            "logtype": "success",
            "message": "New area accesible: Town."
        },{
            "type": "display-area",
            "element": "#town-menu"
        }]
    },

    "first-member": {
        "done": 0,
        "conditions":[{
            "stat": "members",
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
            "stat": "members",
            "amount": 10
        }],
        "results": [{
            "type": "log",
            "message": "Explore the nearby forest and make sacrifices to bless the land."
        },
        {
            "type": "display-area",
            "element": "#forest-menu"
        }]
    }
};