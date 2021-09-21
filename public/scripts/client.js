/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// READY THE DOM
$(document).ready(function() {

  // ON SUBMIT, PREVENT SUBMIT BUTTON FROM GOING TO NEXT PAGE
  $("#tweetPost").submit((event) => {
    event.preventDefault();

    // ERROR MESSAGES APPEAR IF TEXT EXCEEDS CHAR COUNT 140/EMPTY
    if ($("#counterText").val() < 0) {
      $(".errorBox").slideDown();
    } else if ($("#counterText").val() == 140) {
      $(".errorBox1").slideDown();
    } else {
      $(".errorBox").slideUp();
      $(".errorBox1").slideUp();
      $.ajax("/tweets", {
        method: "POST",
        data: $("#tweet-text").serialize(),
      }).done(() => {
        loadTweets();
        $(".errorBox").slideUp();
        $(".errorBox1").slideUp();
      });

    }
  });

});
/// END OF DOM


// THE LAYOUT AND VALUES WHEN CREATING A NEW TWEET
const createTweetElement = function(dataObj) {

  // ESCAPE - PREVENTING SCRIPTS TO WORK WHEN USERS POST IT AS TWEETS
  const escape = function(str) {
    let textArea = document.createElement("textarea");
    textArea.appendChild(document.createTextNode(str));
    return textArea.innerHTML;
  };

  // THE LAYOUT
  const article =
    ` <section class="new-tweet1">
    <div class="userInfo">
         <div class="userImage">
        <img src="${dataObj.user.avatars}" width="50" height="50"></img>
       <p>${dataObj.user.name}</p></div>

        <p style="color:green;">${dataObj.user.handle}</p>
       </div>

      <article class="tweetContainer">${escape(dataObj.content.text)}</article>

      <footer class="footer"><p>
      <time class="timeago" datetime="${jQuery.timeago(new Date(dataObj.created_at))}">${jQuery.timeago(new Date(dataObj.created_at))}</time></p>
        <p><i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </p>
      </footer>
      </section>`;

  return article;
};

// RENDER TWEETS FROM createTweetElement
const renderTweets = function(data) {
  $(".tweets").empty();
  for (const dataObj of data) {
    $(".tweets").prepend(createTweetElement(dataObj));
  }
};

// LOAD TWEETS from renderTweets
const loadTweets = function() {
  $.ajax("/tweets", { method: "GET", datatype: "JSON" }).done((data) => {
    renderTweets(data);
  });
};


