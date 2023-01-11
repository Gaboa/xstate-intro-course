function lightBulb() {
  let isLit = false
  let isBroken = false

  return {
    state() {
      return { isLit, isBroken }
    },
    toggle() {
      isLit = !isLit
    },
    break() {
      isBroken = true
    }
  }
}

const log = function () {
  console.log("State: ", bulb.state())
}

const bulb = lightBulb()
bulb.toggle()
bulb.break()
log()

export {}