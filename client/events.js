import './events.html';
import { ReactiveDict } from 'meteor/reactive-dict';
// <link rel="icon" sizes="16x16 32x32" href="/favicon.ico?v=2"/>


function onSignIn() {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}
Meteor.startup(() =>
  Meteor.subscribe('Meteor.users.userdetails',Meteor.userId());
});

Accounts.onCreateUser( {
  $var attachData, email, picture, profileImageUrl, profilePicture, url, service, allEmails, firstEmail
   profileImageUrl = undefined
  user.profile = user.profile || {},
//  If the google service exists
  if ((service = user.services) !== undefined ? service.google : undefined) {
    user.emails = [
      {
        address: user.services.google.email,
        verified: true
      }
    ];
    user.profile.firstName = user.services.google.given_name;
    user.profile.lastName = user.services.google.family_name;
    user.profile.avatar = user.services.google.picture;
  }

  //No avatar defined from Google service? Okay let's get a Gravatar
  if (!user.profile.avatar) {
    email = ((allEmails = user.emails) !== undefined ? (firstEmail = allEmails[0]) !== undefined ? firstEmail.address : undefined : undefined) || '';
    url = Gravatar.imageUrl(Gravatar.hash(email));
    user.profile = { avatar: url };
  }
  return user;
});
Template.user.onDetail(function useronDetail() {
   this.state = new ReactiveDict();
});

Template.userDetail.events({

    'click #save': function (events) {
        event.preventDefault();
        console.log("Saving User Details of "+ $('#name').val());
        var gender = 'male';
        if ($("#female").is(":checked")) {
            gender = 'female';
        }
        const newDetail = {
            name:$('#name').val(),
            age:$('#age').val(),
            sex:gender
        }

        Meteor.call('adduserinfo',newDetail);

        //console.log("Saved User Details of "+ $('#name').val());
        //console.log(Meteor.user());
    },
});
