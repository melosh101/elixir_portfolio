// If you want to use Phoenix channels, run `mix help phx.gen.channel`
// to get started and then uncomment the line below.
// import "./user_socket.js"

// You can include dependencies in two ways.
//
// The simplest option is to put them in assets/vendor and
// import them using relative paths:
//
//     import "../vendor/some-package.js"
//
// Alternatively, you can `npm install some-package --prefix assets` and import
// them using a path starting with the package name:
//
//     import "some-package"
//

// Include phoenix_html to handle method=PUT/DELETE in forms and buttons.
import "phoenix_html"
// Establish Phoenix Socket and LiveView configuration.
import { Socket } from "phoenix"
import { Hook, LiveSocket } from "phoenix_live_view"
import { animate, AnimationSequence, delay, easeIn } from "motion";
import topbar from "../vendor/topbar"

let hooks: Record<string, Hook> = {

}

hooks.handleMount = {
  mounted() {
    console.log("mounted")
    handleMount()
  }
}

let csrfToken = document.querySelector("meta[name='csrf-token']")!.getAttribute("content")
let liveSocket = new LiveSocket("/live", Socket, {
  longPollFallbackMs: 2500,
  params: { _csrf_token: csrfToken },
  hooks,
},)


// Show progress bar on live navigation and form submits
topbar.config({ barColors: { 0: "#29d" }, shadowColor: "rgba(0, 0, 0, .3)" })
window.addEventListener("phx:page-loading-start", _info => topbar.show(300))
window.addEventListener("phx:page-loading-stop", _info => topbar.hide())

// connect if there are any LiveViews on the page
liveSocket.connect()

// expose liveSocket on window for web console debug logs and latency simulation:
// >> liveSocket.enableDebug()
// >> liveSocket.enableLatencySim(1000)  // enabled for duration of browser session
// >> liveSocket.disableLatencySim()
window.liveSocket = liveSocket
var noAnims = false;
var searchparams = new URLSearchParams(window.location.search)
if (searchparams.has("noanims")) {
  noAnims = true;
}



function handleMount() {
  const introSeq: AnimationSequence = [
    ["#intro", { translateY: ["-30rem", "0"] }, { duration: .6, delay: 1.5, type: "spring", bounce: .4 }],
    ["#intro", { rotate: 0.35 }, { duration: 0.2, delay: 0.2 }],
    // drop img to border
    ["#intro>img", { translateY: ["0", "3.45rem"] }, { duration: .25, ease: "easeIn" }],
    ["#intro>img", { translateX: ["0", "1.98rem"], rotate: 25 }, { duration: .3, ease: "easeIn" }],

  ]

  const introElm = document.getElementById("intro")!.classList.remove("opacity-0")
  const arrowSeq: AnimationSequence = [
    ["#pointer", { translateY: ["0", ".5rem", "0"], scale: [1, .9, 1] }, { duration: 2 }]
  ]
  if (!noAnims) {
    animate(introSeq).then(() => {
    animate("#pointer", { opacity: 1 }, { duration: 0 })
    animate(arrowSeq, { repeat: Infinity })
    })
  } else {
    animate("#pointer", { opacity: 1 }, { duration: 0 })
    animate(arrowSeq, { repeat: Infinity })
  }
}
