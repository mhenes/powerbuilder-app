// More about:
// http://mootools.net/forge/p/utetris

"use strict";

window.addEvent('domready', function() {
  var container = $('container'), preview = $('preview'), tetris = new uTetris(container, preview, {
    keypress: true,
    box_width: "20px",
    box_height: "20px"
  });

  var play = $("play"),
      score = $("score"),
      level = $("level"),
      lines = $("lines");

  tetris.addEvents({
    "start": function(e) {
      container.addClass('game');
      preview.addClass('game');
      setInfo(e);
      setPause();
    },
    "lines": setInfo,
    "fixed": setInfo,
    "pause": setPause,
    "gameover": function() {
      container.removeClass('game');
      preview.removeClass('game');
      play.set("html", "Play");
    }
  });

  function setLabel(str) {
    play.set("html", str);
  }

  function setInfo(obj) {
    level.set("html", "Level: " + obj.level || 0);
    score.set("html", "Score: " + obj.score || 0);
    lines.set("html", "Lines: " + obj.lines || 0);
  }

  function setPause(pause) {
    setLabel(pause ? "Resume" : "Pause");
  }

  play.addEvent("click", function() {
    if (this.isStop()) {
      this.restart();
    } else {
      this.pause();
    }
  }.bind(tetris));
});
