!function(){var t=document.querySelector("button[data-start]"),n=document.querySelector("button[data-stop]"),o={intervalId:null,start:function(){this.intervalId=setInterval((function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16)),e(t,n)}),1e3)},stop:function(){clearInterval(this.intervalId),e(n,t),document.body.style.backgroundColor="#c7d8ff"}};function e(t,n){t.disabled=!0,n.disabled=!1}t.addEventListener("click",o.start.bind(o)),n.addEventListener("click",o.stop.bind(o))}();
//# sourceMappingURL=01-color-switcher.834d1b8f.js.map
