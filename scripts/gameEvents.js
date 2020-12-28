var gameEvents = {
    "game-start": {
        "done": 0,
        "conditions":[{
            "stat": "fait",
            "amount": 0
        }],
        "results": [{
            "type": "log",
            "message": "Your God needs your faith to become stronger and stronger. Show him that you are worthy of existing."
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
            "message": "Dont stop!!."
        }]
    },
    "ready-for-first-member": {
        "done": 0,
        "conditions":[{
            "stat": "fait",
            "amount": 10
        }],
        "results": [{
            "type": "log",
            "message": "Is time to recruit new members."
        },
        {
            "type": "display",
            "object": "#members-row"
        },
        {
            "type": "display",
            "object": "#recruit-btn"
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
            "type": "display",
            "object": "#forest-menu"
        }]
    }
};