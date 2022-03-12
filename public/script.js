




var $messages = $('.messages-content'),
  d, h, m,
  i = 0;

$(window).load(function () {
  $messages.mCustomScrollbar();
});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setDate() {
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}


function sendToServer(message) {
  sendObject({ message });
}

function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal"></div>').appendTo($('.mCSB_container')).addClass('new').text(msg);
  setDate();
  $('.message-input').val(null);
  updateScrollbar();
  sendToServer(msg);
}




$('.message-submit').click(function () {
  insertMessage();
});

$(window).on('keydown', function (e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})

var replyQueue = [
  'Hi there, I\'m Fabio and <br> you aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa talk talk taktaoiwtaoi  tawintaowitn?',
  'Nice to meet you',
  'How are you?',
  'Not too bad, thanks',
  'What do you do?',
  'That\'s awesome',
  'Codepen is a nice place to stay',
  'I think you\'re a nice person',
  'Why do you think that?',
  'Can you explain?',
  'Anyway I\'ve gotta go now',
  'It was a pleasure chat with you',
  'Time to make a new codepen',
  'Bye',
  ':)'
]

function showReply(reply) {
  // $('<div class="message loading new"></div>').appendTo($('.mCSB_container'));
  updateScrollbar();


  if (reply === undefined) reply = replyQueue[i];
  $('.message.loading').remove();
  $('<div class="message new"> </div>').appendTo($('.mCSB_container')).addClass('new').text(reply);
  setDate();
  updateScrollbar();
  i++;

}


/**
 * Styling custom
 */

const properties = {};

  (() => {
    const input = document.getElementById("input");
    input.onfocus = () => {
      let chat = document.getElementsByClassName("chat")[0];

      chat.style.backgroundColor = "#000000BB";
      chat.style.top = "60%";
      chat.style.height = "35%";
      chat.style.bottom = "5%";
      updateScrollbar();
      properties.focused = true;

      document.getElementById("notification").hidden = true;

    }





    input.addEventListener('focusout', () => {
      let chat = document.getElementsByClassName("chat")[0];
      chat.style.backgroundColor = "#00000000";
      chat.style.top = "90%";
      chat.style.bottom = "5%";
      chat.style.height = "5%";
      properties.focused = false;


    });


    (() => {
      const iframe = document.createElement("iframe");
      iframe.src = "https://mozilla.github.io/pdf.js/web/viewer.html";
      document.body.prepend(iframe);

      iframe.frameBorder = 0;
      iframe.style.zIndex = 0;
      iframe.style.position = "fixed";
      iframe.style.left = 0;
      iframe.style.right = 0;
      iframe.style.top = 0;
      iframe.style.right = 0;
      iframe.style.height = "100%";
      iframe.style.width = "100%";
    })()
  })();



/**
 * Socket IO config
 */


(

  () => {
    let socket = io();

    const sendObject = (object) => {
      socket.emit('object', object);
    }

    socket.on("object", (object) => {
      showReply(object.message);

      if (properties.focused !== true)
        document.getElementById("notification").hidden = false;
    })

    window.sendObject = sendObject;
  }

)();
