const properties = {};
properties.input = document.getElementById("input");

var $messages = $(".messages-content"),
  d,
  h,
  m,
  i = 0;

$(window).load(function () {
  $messages.mCustomScrollbar();
});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar("scrollTo", "bottom", {
    scrollInertia: 10,
    timeout: 0,
  });
}

function setDate() {
  d = new Date();
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ":" + m + "</div>").appendTo(
      $(".message:last")
    );
  }
}

function sendToServer(message) {
  sendObject({ message });
}

function insertMessage() {
  msg = $(".message-input").val();
  if ($.trim(msg) == "") {
    return false;
  }
  $('<div class="message message-personal"></div>')
    .appendTo($(".mCSB_container"))
    .addClass("new")
    .text(msg);
  setDate();
  $(".message-input").val(null);
  updateScrollbar();
  sendToServer(msg);
}

$(".message-submit").click(function () {
  insertMessage();
  properties.input.focus();
});

$(window).on("keydown", function (e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
});



function showReply(reply) {
  // $('<div class="message loading new"></div>').appendTo($('.mCSB_container'));
  updateScrollbar();

 
  $(".message.loading").remove();
  $('<div class="message new"> </div>')
    .appendTo($(".mCSB_container"))
    .addClass("new")
    .text(reply);
  setDate();
  updateScrollbar();
  i++;
}

/**
 * Styling custom
 */


(()=>{
  $(".message-box").click(()=>{
    console.log("click");
    $(".message-input ").focus();
  })
})()


const hideChat = () => {
  let chat = document.getElementsByClassName("chat")[0];
  chat.style.backgroundColor = "#00000000";
  chat.style.top = "95%";
  //chat.style.bottom = "5%";
  chat.style.height = "5%";
  properties.focused = false;
};

const showChat = () => {
  let chat = document.getElementsByClassName("chat")[0];

  chat.style.backgroundColor = "#00000099";
  chat.style.top = "0%";
  chat.style.height = "100%";
  //chat.style.bottom = "5%";
  updateScrollbar();
  properties.focused = true;

  document.getElementById("notification").hidden = true;
};

(() => {
  const input = properties.input;
  input.onfocus = showChat;
  input.onclick = () => {
    setTimeout(() => {
      updateScrollbar();
    }, 250);
  };

  (() => {
    const iframe = document.createElement("iframe");
    iframe.id = "watch";
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
    iframe.onfocus = hideChat;
  })();
})();

const setFrame = (url) => {
  document.getElementById("watch").src = url;
};

/**
 * Socket IO config
 */

(() => {
  let socket = io();

  const sendObject = (object) => {
    socket.emit("object", object);
  };

  socket.on("object", (object) => {
    showReply(object.message);

    if (properties.focused !== true)
      document.getElementById("notification").hidden = false;
  });

  socket.on("load", (object) => {
    setFrame(object.url);
  });

  window.sendObject = sendObject;
})();

setTimeout(() => {
  document.querySelector("#mCSB_1_container").addEventListener("click", (e) => {
    console.log("click!");
    if (e.target !== e.currentTarget) return;
    hideChat();
  });
}, 2000);



