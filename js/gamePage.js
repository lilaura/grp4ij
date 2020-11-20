// game page js code
let pipeIdx = 1;

var state = [];
for (var n = 0; n < 6; ++n) {
  state[n] = 0;
}
//
//the main idea for checking states is do a check every 5 seconds
//the state array will store states for all pipes based on their index
//pipe1 with state[0], and pipe2 with state[1]...
//there are 5 possible value for the state, 0 for normal, 1 for leaking
//2 for small ice, 3 for large ice and 4 for totally broken
//a normal pipe will have 40% to be leaking and a borken pipe, after every 5 seconds, will go to the next state
//
//some possible idea is that if you want to implement the solver, you can add more possible values in the array
//and thus the checkleaking function will not do anything to the pipes in the process

// Main
$(document).ready(function () {
  console.log("Ready!");
  // pipe = $('#pipe0');
  setInterval(function () {
    checkleaking();
  }, 5000);
});

function createItemDivString(itemIndex, type, imageString) {
  return (
    "<img src='asset/pipe-state/" +
    imageString +
    "'id='" +
    type +
    itemIndex +
    "'class='pipe0'" +
    "alt='horizontal pipe'" +
    "/>"
  );
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function checkleaking() {
  for (var idx = 1; idx < 7; idx++) {
    var change = false;
    var left = [83,172,262,352,444,532]
    if (state[idx - 1] == 0 && change == false) {
      let p = getRandomNumber(0, 1);
      change = true;
      if (p < 0.4) {
        state[idx - 1] = 1;
        var img = createItemDivString(idx, "leak", "drip.png");
        console.log(img);
        // alert(img);
        $("body").append(img);
        let leak = $("#leak" + idx);
        let tube = $("#pipe" + idx);
        leak.css("position", "absolute");
        leak.css("top", 355);
        leak.css('height',90);
        leak.css("left", left[idx-1]);
        leak.css("z-index",10);
        // leak.css("top", parseInt(tube.css("top")));
      }
    }
    if (state[idx - 1] == 1 && change == false) {
      change = true;
      state[idx - 1] = 2;
      var img = createItemDivString(idx, "smallice", "sm-ice.png");
      $("body").append(img);
      let ice = $("#smallice" + idx);
      let leak = $("#leak" + idx);
      ice.css("position", "absolute");
      ice.css("left",left[idx-1]);
      ice.css("top", 350);
      ice.css('height',85);
      ice.css("z-index",11);
      leak.remove();
    }
    if (state[idx - 1] == 2 && change == false) {
      change = true;
      state[idx - 1] = 3;
      var img = createItemDivString(idx, "largeice", "lg-ice.png");
      $("body").append(img);
      let ice = $("#largeice" + idx);
      let smice = $("#smallice" + idx);
      ice.css("position", "absolute");
      ice.css("left", left[idx-1]);
      ice.css("top", 358);
      ice.css('height',73);
      ice.css("z-index",12);
      smice.remove();
    }
  }
}
