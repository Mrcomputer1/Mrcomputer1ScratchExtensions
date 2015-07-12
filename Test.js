(function (ext) {
    ext._shutdown = function () {};

    ext._getStatus = function () {
        return {
            status: 2,
            msg: 'Installed and Ready'
        };
    };

    /*
    Code by thisisntme
    This WILL be removed it is only a test to see if it works on github and not google drive
    */

    var descriptor = {
        blocks: [

            ['', 'Display Scratch Alert %s', 'notify', 'Your message here!!!'],
            ['', 'Follow %s', 'follow', '-HMX-'],
            ['', 'Love project with id %n','love','57277422'],
            ['', 'favorite project id %n', 'favorite','57277422'],
          //        ['R','# of messages','messages',''],


            ]
    };

    ext.notify = function (text) {
        ScratchExtensions.notify(text);
    };
    ext.love = function (projectID) {
        $.ajax({
            type: "PUT",
            url: "https://scratch.mit.edu/site-api/users/lovers/"+projectID+"/add/?usernames="+Scratch.INIT_DATA.LOGGED_IN_USER.model.username,
            data: {
                usernames: Scratch.INIT_DATA.LOGGED_IN_USER.model.username
            }
        })
    }
    ext.favorite = function (projectID) {
        $.ajax({
            type: "PUT",
            url: "https://scratch.mit.edu/site-api/users/favoriters/"+projectID+"/add/?usernames="+Scratch.INIT_DATA.LOGGED_IN_USER.model.username,
            data: {
                usernames: Scratch.INIT_DATA.LOGGED_IN_USER.model.username
            }
        })
    }
    ext.follow = function (user) {
        $.ajax({
            type: "PUT",
            url: "https://scratch.mit.edu/site-api/users/followers/" + user + "/add/",
            data: {
                usernames: Scratch.INIT_DATA.LOGGED_IN_USER.model.username
            }
        })

    };

    /*  ext.messages = function(callback) {
        $.ajax({
            url: 'https://scratch.mit.edu/messages/ajax/get-message-count/',
            data: {
                usernames: Scratch.INIT_DATA.LOGGED_IN_USER.model.username
            }
        })
    };*/
    ScratchExtensions.register("_Scratch API wrapper by -HMX- and Thisisntme", descriptor, ext);
})({});
