---
layout: post
category: technology
---
## Get setup

Use [Google Hosted Libraries](https://developers.google.com/speed/libraries/devguide#jquery) to host your jQuery script. This is a CDN service for your jQuery library.

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>

Also create an application.js file to store your [Unobtrusive JavaScript](http://en.wikipedia.org/wiki/Unobtrusive_JavaScript) code.

    <script src='/application.js'></script>

## jQuery Boilterplate Code

    $(document).ready(function() {
      $('someClassOrIdToAffect').someEffect();
    });

Most of unobtrusive javascript that I write wtih jQuery is going to start like this.

Line 1 says execute this javascript function once and only once when the document (Document Object Model / DOM) is ready.

Be aware that there is a shorthand notation for Line 1 that looks like this

    $(function() {

Line 2 says grab this object (usually some CSS element that that you can get ahold of by its class or ID) and execute this effect on it. The object does not have to be a class or ID - it could be the entire body, every div, every p, whatever. But typically it will be a specific element.

Here is a real example

    $(document).ready(function() {
      $('#container').fadeOut(1000);
    });

## Stacking Functions

Usually you will want some trigger to initiate the effect and so you will want to stack your functions.

    $(document).ready(function() {
      $('div').mouseenter(function() {
        $('div').fadeTo('fast', 1);
      });
    });

You can see there that we called the same div element twice. For readability I prefer _this_ which says this function is being invoked as a method of the object above.

    $(document).ready(function() {
      $('div').mouseenter(function() {
        $(this).fadeTo('fast', 1);
      });
    });

There is also the scenario of triggering an entry event and an exit event

    $(document).ready(function() {
        $('div').mouseenter(function() {
            $(this).fadeTo('fast', 1);
          });
        $('div').mouseleave(function() {
            $(this).fadeTo('fast', 0.5);
          });
      });

## Variables

You can also assign variables in jQuery to reuse code. This is a simple example, but you can see where it would be help in a more complex action.

    $(document).ready(function() {
        $target = 'li:nth-child(4)'
        $($target).fadeOut('fast');
      });

## Actions to Remember

A common use case would be inserting some HTML before or after another HTML element. Here is an example.

    $(document).ready(function() {
        $('#someId').after('<h1>Inserted an H1 tag</h1>');
      });

Remove allows you to delete an element entirely. Empty drops the elements contents, but leaves the element itself.

    $(document.ready(function() {
        $('#someId').remove();
      });

&

      $(document.ready(function() {
        $('#someId').empty();
      });

.toggleClass is a useful function for an instance where maybe you want turn highlighting on and off on a div.

    $(document).ready(function() {
        $('.someClass').toggleClass('hightlight')
      });

Here is a cool example where you might have an input box on the page and you want to automatically update a list when the input box is submitted.

    $(document).ready(function() {
      $('button').click(function() {
        var toAdd = $('input[name=checkListItem]').val();
        $('.list').append('<div class="item">' + toAdd + '</div>');;
        });
      });

How about applying a hover action to a div. Hover takes two actions that are comma separated. The first is the mouse in event and the second is the mouse leave event. These don't have to be opposite effects, but that is the most common use case.

    $(document).ready(function() {
        $('div').hover(
            function() {
              $(this).addClass('highlight');
            },
            function() {
              $(this).removeClass('highlight');
            }
          );
      });

## jQueryUI

jQueryUI adds some additional functionality for you.

Again use [Google Hosted Libraries](https://developers.google.com/speed/libraries/devguide#jquery-ui) to host your jQueryUI script.

    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/themes/smoothness/jquery-ui.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js"></script>

.sortable() is one of the coolest functions I've used so far with jQueryUI. This allows you to reorder your list on the screen just by dragging and dropping.

    $(document).ready(function() {
        $('ol').sortable();
      });

## Ajax

Ajax (or asynchronous Javascript and XML) allows you to send and receive data in the background without forcing a refresh of the entire page.

I used a bit of this in my [Blackjack Game](http://blackjack.rickpeyton.com) that I created in course 1 at [Tealeaf Academy](https://www.gotealeaf.com).

In this example I am submitting a post request to the url '/game/player/hit' when a button with the id #hit-form is clicked. There are no parameters being sent along with this request so there is no data included.

The request goes to the hit page, grabs all of the HTML from that page, and replaces the entirety of my #game div with a new #game div from the hit page.

    $(document).on('click', '#hit-form input', function() {}...

The above code is necessary because it rebinds the javascript to the #hit-form input. If I only relied on $(document).ready() then only the first 'hit' would work with Ajax. The next 'hit' would reload the page.

Here is the full code (note the return false. This keeps the post request from being sent by the browser _after_ the javascript Ajax request).

    $(document).ready(function() {
        $(document).on('click', '#hit-form input', function() {
            $.ajax({
                url: '/game/player/hit',
                type: 'POST'
              }).done(function(msg) {
                  $('game').replaceWith(msg);
                });
                return false;
          })
      });

There are actually three buttons on my [Blackjack Game](http://blackjack.rickpeyton.com) that use Ajax so the final code breaks those out into three separate functions in my _application.js_ file. Here is my final code

    $(document).ready(function() {

      player_hits();
      player_stays();
      dealer_hits();

    });

    function player_hits() {
      $(document).on('click', '#hit-form input', function() {
        $.ajax({
          url: '/game/player/hit',
        type: 'POST'
        }).done(function(msg) {
          $('#game').replaceWith(msg);
        });
        return false;
      });
    }

    function player_stays() {
      $(document).on('click', '#stay-form input', function() {
        $.ajax({
          url: '/game/player/stay',
        type: 'POST'
        }).done(function(msg) {
          $('#game').replaceWith(msg);
        });
        return false;
      });
    }

    function dealer_hits() {
      $(document).on('click', '#dealer-hit-form input', function() {
        $.ajax({
          url: '/game/dealer/hit',
        type: 'POST'
        }).done(function(msg) {
          $('#game').replaceWith(msg);
        });
        return false;
      });
    }
