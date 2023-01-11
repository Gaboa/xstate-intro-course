const STATES = {
  LIT: "lit",
  UNLIT: "unlit",
  BROKEN: "broken"
}

function lightBulb() {
  let state = STATES.UNLIT

  return {
    state() {
      return state
    },
    toggle() {
      switch (state) {
        case STATES.LIT:
          state = STATES.UNLIT
          break;
        case STATES.UNLIT:
          state = STATES.LIT
          break;
      }
    },
    break() {
      state = STATES.BROKEN
    }
  }
}

const log = function () {
  console.log("State: ", bulb.state())
}

const bulb = lightBulb()
bulb.toggle()
log()

setTimeout(() => {
  bulb.toggle()
  log()
  bulb.break()
}, 5000)

setTimeout(() => {
  bulb.toggle()
  log()
}, 6000)

export {}