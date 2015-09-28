Meteor.startup(function (){
    Session.set('myProfile','test')

    Tracker.autorun(function () {


            Meteor.subscribe('userData')
            locationCheck =  setInterval(function(){
                myLoc = Geolocation.latLng()
                if(myLoc){
                    //console.log(myLoc)
                    clearInterval(locationCheck)
                    Meteor.call('updateLocation',myLoc)
                    reverseGeocode.getLocation(myLoc.lat, myLoc.lng, function(location){
                    Session.set('myGeo',location.results[0])
                        console.log('location grabbed...',location)
                        //location is straight output from Google
                        //or you can now access it from reverseGeocode object
                        //console.log(location.results[0])
                        Meteor.call('updateGEO',location.results[0])

                    });
                }else{

                    console.log('fetching location...')
                }

            }, 100);

    });


});

// DB cursor to find all posts with 'important' in the tags array.
var cursor = Profiles.find({});

// watch the cursor for changes
var handle = cursor.observe({
    added: function (post) {
        Meteor.call('getTrending',function(err,resp){
            Session.set('trending',resp)
        })
    }, // run when post is added
    //changed: function (post) { ... } // run when post is changed
    //removed: function (post) { ... } // run when post is removed
});

Template.actionDefiner.rendered = function(){
    $('#autocomplete').selectize({
        theme: 'links',
        maxItems: 1,
        valueField: 'name',
        searchField: 'name',
        openOnFocus: true,
        highlight: true,
        //scrollDuration: 300,
        options: Categories.find({goal:FlowRouter.getParam("template")},{sort:{name:1}}).fetch(),
        // options: [
        //     {id: 1, title: 'DIY', url: 'https://diy.org'},
        //     {id: 2, title: 'Google', url: 'http://google.com'},
        //     {id: 3, title: 'Yahoo', url: 'http://yahoo.com'},
        // ],
        render: {
            option: function(data, escape) {
                return '<div class="option">' +
                    '<span class="title">' + escape(data.name) + '</span>' +
                    '</div>';
            },
            item: function(data, escape) {
                return '<div class="item"><a href="#">' + escape(data.name) + '</a></div>';
            }
        },
        onChange: function(value) {


            Session.set('selectedCat',value)
            var checkincount = Profiles.find({date: { $gte: new Date(moment().subtract(1,'hour').format()) },'cat':Session.get('selectedCat')}).fetch()
            console.log(checkincount)
            if(checkincount.length){
                Session.set('activeChecks',true)
            }else{
                Session.set('activeChecks',false)
            }



        },
        // create:false
        create: function(input) {
            //console.log('creating site')
            Categories.insert({
                _id: CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(input.toLowerCase())).replace(/=/g, ''),
                name:input,
                goal:FlowRouter.getParam("template"),
                //user: Meteor.user()._id,
                type:'custom'
            })
            //console.log('location inserted...')
            return {
                _id: CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(input.toLowerCase())).replace(/=/g, ''),
                name:input,
                goal:FlowRouter.getParam("template"),
                //user: Meteor.user()._id,
                type:'custom',
            };
        }
    })
}



Template.profileForm.rendered = function(){
    $('#location').selectize({
        theme: 'links',
        maxItems: 1,
        valueField: 'name',
        searchField: 'name',
        openOnFocus: true,
        highlight: true,
        //scrollDuration: 300,
        options: Locations.find({},{sort:{name:1}}).fetch(),
        // options: [
        //     {id: 1, title: 'DIY', url: 'https://diy.org'},
        //     {id: 2, title: 'Google', url: 'http://google.com'},
        //     {id: 3, title: 'Yahoo', url: 'http://yahoo.com'},
        // ],
        render: {
            option: function(data, escape) {
                return '<div class="option">' +
                    '<span class="title">' + escape(data.name) + '</span>' +
                    '</div>';
            },
            item: function(data, escape) {
                return '<div class="item"><a href="#">' + escape(data.name) + '</a></div>';
            }
        },
        onChange: function(value) {


            //Session.set('selectedCat',value)
            //var checkincount = Profiles.find({date: { $gte: new Date(moment().subtract(1,'hour').format()) },'cat':Session.get('selectedCat')}).fetch()
            //console.log(checkincount)
            //if(checkincount.length){
            //    Session.set('activeChecks',true)
            //}else{
            //    Session.set('activeChecks',false)
            //}



        },
        // create:false
        create: function(input) {
            //console.log('creating site')
            Locations.insert({
                _id: CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(input.toLowerCase())).replace(/=/g, ''),
                name:input,
                //intent:Session.get('intention'),
                //user: Meteor.user()._id,
                type:'custom',
                //intent:FlowRouter.getParam("template"),
            })
            //console.log('location inserted...')
            return {
                _id: CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(input.toLowerCase())).replace(/=/g, ''),
                name:input,
                //intent:Session.get('intention'),
                //user: Meteor.user()._id,
                type:'custom',
                //intent:FlowRouter.getParam("template"),
            };
        }
    })
}