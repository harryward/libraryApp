
Template.appCheckin.events({
    'click .list-group-item':function(event,template){
        event.preventDefault()
        console.log($(event.target).attr('data-target'))
        Session.set('intention',$(event.target).attr('data-target'))
        FlowRouter.go('/action/'+Session.get('intention'))
    }
})


Template.actionDefiner.events({
    'click .list-group-item':function(event,template){
        event.preventDefault()
        console.log($(event.target).attr('data-target'))
        Session.set('intention',$(event.target).attr('data-target'))
        FlowRouter.go('/action/'+Session.get('intention'))
    },
    'keyup #autocomplete':function(){
        Session.set('readyToComplete',true)
    }
})

Template.actionDefiner.events({
    'click #checkInNow':function(){
        var checkincount = Profiles.find({date: { $gte: new Date(moment().subtract(1,'hour').format()) },'cat':Session.get('selectedCat')}).fetch()
        if(checkincount.length){
       //alert('checkins active')
        FlowRouter.go('/action/checkinList')
        console.log(checkincount)
            //Meteor.call('createCheckin',FlowRouter.getParam("template"),Session.get('selectedCat'),function(err,resp){
            //    console.log(resp)
            //    Session.set('thisCheckin',resp)
            //})
        }else{
       +
            FlowRouter.go('/action/profileForm')
            //Meteor.call('createCheckin',FlowRouter.getParam("template"),Session.get('selectedCat'),function(err,resp){
            //    console.log(resp)
            //    Session.set('thisCheckin',resp)
            //})
        }
    }
})

Template.profileForm.events({
    'submit .profileForm':function(event,template){
        event.preventDefault()
        var a = $('form.profileForm').serializeArray();
        var formObj = {}

        //thisOutfit = Guides.findOne({'_id':Meteor.user()._id}) // THE OUTFITTER



        $.each(a, function() {
            if (formObj[this.name] !== undefined) {
                if (!formObj[this.name].push) {
                    formObj[this.name] = [formObj[this.name]];
                }

                formObj[this.name].push(this.value || false);
            } else {
                formObj[this.name] = this.value || false;
            }
        })
        console.log(formObj)

        Profiles.insert({
            //'_id':Meteor.user()._id,
            'date':new Date(),
            'cat':Session.get('selectedCat'),
            'data':formObj,
        })
        Meteor.call('getTrending',function(err,resp){
            Session.set('trending',resp)
        })
        //if(Profiles.find(Meteor.user()._id).count()){
        //    Profiles.update({
        //        '_id':Meteor.user()._id},{$set:{
        //        'date':new Date(),
        //        'cat':Session.get('selectedCat'),
        //        'data':formObj,
        //    }})
        //}else{
        //Profiles.insert({
        //    '_id':Meteor.user()._id,
        //    'date':new Date(),
        //    'cat':Session.get('selectedCat'),
        //    'data':formObj,
        //})
        //}
        FlowRouter.go('/action/checkinList')
        Session.set('checkedIn',true)
    }

})





