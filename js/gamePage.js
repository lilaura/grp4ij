// game page js code
let pipeIdx = 1;
let existAP = false;
let haveCurrAct = false;
let currActTime = 0;

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
    "onClick='gameAction(this.id)'/>"
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
      // console.log("#smallice" + idx)
      console.log(leak)
    }
    if (state[idx - 1] == 2 && change == false) {
      change = true;
      state[idx - 1] = 3;
      var img = createItemDivString(idx, "bigice", "lg-ice.png");
      $("body").append(img);
      let ice = $("#bigice" + idx);
      let smice = $("#smallice" + idx);
      ice.css("position", "absolute");
      ice.css("left", left[idx-1]);
      ice.css("top", 358);
      ice.css('height',73);
      ice.css("z-index",12);
      smice.remove();
    }
    if (state[idx - 1] == 4 && change == false) {
      let undoCoat = Math.random();
      if (undoCoat > 0.75) {
        change = true;
        state[idx - 1] = 0;
        let coat = $("#coat" + idx);
        coat.remove();
      }
    }
  }
}
function createActionPanel(type, actID) {
  if (type == 'l') {
    return (
      "<div id='actionPanel'> <button id='" + actID + 
      "'class='action1' onClick='actionReplace(this.id)'> replace </button>" +
      " <button id='" + actID + 
      "'class='action1'' onClick='actionCover(this.id)'> cover </button></div>"
    )
  }
  else if (type == 's') {
    return (
      "<div id='actionPanel'> <button id='" + actID + 
      "'class='action1' onClick='actionReplace(this.id)'> replace </button>" +
      " <button id='" + actID + 
      "'class='action1'' onClick='actionMelt(this.id)'> melt </button></div>"
    )
  }
  if (type == 'b') {
    return (
      "<div id='actionPanel'> <button id='" + actID + 
      "'class='action1' onClick='actionReplace(this.id)'> replace </button>" +
      " <button id='" + actID + 
      "'class='action1'' onClick='actionMelt(this.id)'> melt </button></div>"
    )
  }
}
function gameAction(actionID) {
  // if 
  if (existAP == false) {
    existAP = true;
  } else {
    let prevAP = $("#actionPanel")
    prevAP.remove();
    // console.log("removed");
  }
  let type = actionID.charAt(0);
  let idx = parseInt(actionID.charAt(actionID.length-1))
  // console.log(idx)
  // console.log(type);
  let ap = createActionPanel(type,actionID);
  $("body").append(ap);
  var left = [83,172,262,352,444,532]
  // let currAP = $("#actionPanel");
  // currAP.css("top",305);
  // currAP.css("left", left[idx-1]);

}

function actionReplace(actionID) {
  let actionPanel = $("#actionPanel");
  actionPanel.remove()
  let idx = actionID.charAt(actionID.length-1)
  let type = actionID.charAt(0);
  var left = [83,172,262,352,444,532];
  let currState = $("#"+actionID);
  // console.log()
  console.log(currState)
  // add curr action thing here
  currState.remove();
  console.log("fixed");
  state[idx-1]=0;
}

function addCover(type, itemIndex) {
  return (
    "<img src='asset/pipe-state/coat.png" + 
    "'id='" +
    type +
    itemIndex +
    "'class='pipe0'" +
    "alt='horizontal pipe'" +
    "onClick='gameAction(this.id)'/>"
  );
}

function actionCover(actionID) {
  let actionPanel = $("#actionPanel");
  actionPanel.remove()
  var left = [83,172,262,352,444,532]
  let idx = parseInt(actionID.charAt(actionID.length-1))
  let type = "coat";
  let currState = $("#"+actionID);
  // currState.remove();
  let cov = addCover(type,idx);
  $("body").append(cov);
  let cover = $("#coat" + idx);
  cover.css("position", "absolute");
  cover.css("left",left[idx-1]);
  cover.css("top", 350);
  cover.css('height',85);
  cover.css("z-index",11);
  currState.remove()
  state[idx-1]=4;
}

function actionMelt(actionID) {
  let actionPanel = $("#actionPanel");
  actionPanel.remove()
  var left = [83,172,262,352,444,532]
  let idx = parseInt(actionID.charAt(actionID.length-1))
  if (state[idx - 1] == 2) {
      state[idx - 1] = 1;
      var img = createItemDivString(idx, "leak", "drip.png");
      $("body").append(img);
      let ice = $("#smallice" + idx);
      let leak = $("#leak" + idx);
      leak.css("position", "absolute");
      leak.css("left",left[idx-1]);
      leak.css("top", 358);
      leak.css('height',73);
      leak.css("z-index",12);
      ice.remove();
      // console.log("#smallice" + idx)
      // console.log(leak)
    }
    if (state[idx - 1] == 3) {
      state[idx - 1] = 2;
      var img = createItemDivString(idx, "smallice", "sm-ice.png");
      $("body").append(img);
      let ice = $("#smallice" + idx);
      let bigice = $("#bigice" + idx);
      ice.css("position", "absolute");
      ice.css("left", left[idx-1]);
      ice.css("top", 350);
      ice.css('height',85);
      ice.css("z-index",11);
      bigice.remove();
    }
}
