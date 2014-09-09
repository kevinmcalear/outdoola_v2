'use strict';

angular.module('app')
  .controller('LoginCtrl',['$scope', '$firebase', function ($scope, $firebase) {
    var Firebase = require("firebase");
     // now we can use $firebase to synchronize data between clients and the server!
    var ref = new Firebase("https://outdoola.firebaseio.com/");
    var sync = $firebase(ref);
    var auth = new FirebaseSimpleLogin(ref, function(error, user) {
      if (error) {
        console.log('Authentication error: ', error);
      } else if (user) {
        console.log('User ' + user.id + ' authenticated via the ' + user.provider + ' provider!');
      } else {
        console.log("User is logged out.")
      }
    });

    auth.createUser(email, password, function(error, user) {
      if (error === null) {
        console.log("User created successfully:", user);
      } else {
        console.log("Error creating user:", error);
      }
    });

    var myRef = new Firebase("https://outdoola.firebaseio.com");
    var authClient = new FirebaseSimpleLogin(myRef, function(error, user) {
      if (error) {
        // an error occurred while attempting login
        console.log(error);
      } else if (user) {
        // user authenticated with Firebase
        console.log("User ID: " + user.uid + ", Provider: " + user.provider);
      } else {
        // user is logged out
      }
    });

    var authRef = new Firebase("https://outdoola.firebaseio.com/.info/authenticated");
    authRef.on("value", function(snap) {
      if (snap.val() === true) {
        alert("authenticated");
      } else {
        alert("not authenticated");
      }
    });

    // we would probably save a profile when we register new users on our site
    // we could also read the profile to see if it's null
    // here we will just simulate this with an isNewUser boolean
    var isNewUser = true;

    var myRef = new Firebase("https://outdoola.firebaseio.com");
    var authClient = new FirebaseSimpleLogin(myRef, function(error, user) {
        if (error) { ... }
        else if (user) {
          if( isNewUser ) {
            // save new user's profile into Firebase so we can
            // list users, use them in security rules, and show profiles
            myRef.child('users').child(user.uid).set({
              displayName: user.displayName,
              provider: user.provider,
              provider_id: user.id
            });
          }
        }
        else { ... }
      }
    });






    // SIGNUP EXAMPLE
    function runExample(demoUrl) {
    var $txtEmail = $('#txtEmail'),
      $txtPass = $('#txtPass'),
      $chkRegister = $('#chkRegister'),
      $btAction = $('#btAction'),
          $btLogout = $('#btLogout'),
          $userList = $('#userList'),
      $error = $('#error'),
          $views = $('.view'),
      ref = new Firebase(demoUrl),
        auth = initAuth(ref);

      // intialize Firebase Simple Login
    function initAuth(ref) {
      return new FirebaseSimpleLogin(ref, function (err, user) {
              // if there is an error then display it
        if (err) {
          displayError(err);
        } else if (user) {
                  // we only want to log people in through the email/password provider
                  if( user.provider !== 'password' ) {
                     auth.logout();
                  }
                  else {
                      // logged in!
                      uid = user.uid;
                      // save the user to our firebase
                      ref.child(user.uid).set({
                          id: user.id,
                          uid: user.uid,
                          email: user.email
                      });
                      // switch over the the user info screen
                      switchView('userInfo');
                  }
        } else {
          // logged out!
                  console.log('not logged in');
        }
      });
    }

      // custom event that fires off when we transition to the
      // userInfo page
      $("#userInfo").on("viewLoaded", function() {
         bindUsers();
      });

      // custom event that fires off when we transition to the
      // login page
      $("#login").on("viewLoaded", function() {
         // clear users
         $userList.html('');
         return;
      });

    function login() {
      auth.login('password', {
        email: $txtEmail.val(),
        password: $txtPass.val()
      });
    }

    function register() {

      auth.createUser($txtEmail.val(), $txtPass.val(), function (error, user) {
              // if there isn't an error, log the user in
              // then switch to the userInfo view
        if (!error) {
          login();
                  switchView('userInfo');
        } else {
                  // display any errors
          displayError(error);
        }
      });

    }

      // after logging out switch back to the login view
      function logout() {
          auth.logout();
          switchView('login');
      }

      // hides all views first, then shows the view that was
      // passed through the function
    function switchView(view) {
          var $view = $("#" + view);
          $views.removeClass('active');
          $view.addClass('active');
          $error.text(''); // clear error
          $view.trigger("viewLoaded");
    }

      // compares against error codes to display errors
    function displayError(error) {
      var errorMsg = '';
      switch (error.code) {
      case "INVALID_EMAIL":
        errorMsg = "You entered an invalid email";
        break;
      case "INVALID_PASSWORD":
        errorMsg = "You entered an invalid password";
        break;
          case "EMAIL_TAKEN":
               errorMsg = "The email you entered has been taken.";
               break;
      default:
        errorMsg = "We're not really sure what happened.";
        break;
      }
          $error.text(errorMsg);
    }

      // attaches a child_added listener to firebase and whenever
      // a new child is added a list item gets appended
      function bindUsers() {
          ref.on('child_added', function(snap) {
              console.log(snap.val());
              $userList.append("<li>" + snap.val().email + "</li>");
          });
      }

      // toggles whether the user is registering and logging in
      $chkRegister.on('click', function () {
          $btAction.off('click');
          if ($chkRegister.is(':checked')) {
              $btAction.on('click', register);
              $btAction.text('Register');
          } else {
              $btAction.on('click', login);
              $btAction.text('Login');
          }
      });

      // default to register
      $btAction.on('click', register);

      // logout handler
      $btLogout.on('click', logout);

  }

  // Dependencies used in this fiddle:
  // code.jquery.com/jquery-2.1.0.min.js
  // cdn.firebase.com/js/client/1.0.17/firebase.js
  // cdn.firebase.com/js/simple-login/1.6.1/firebase-simple-login.js
  // cdn-gh.firebase.com/demo-utils-script/demo-utils.js
  //
  // This line creates a unique, private Firebase URL
  // you can hack in! Have fun!
  $.loadSandbox('web/uauth/profiles/', 'web/uauth/profiles/').then(runExample);


}]);
