function lightBulb() {
  let isLit = false
  let isBroken = false

  return {
    state() {
      return { isLit, isBroken }
    },
    toggle() {
      if (isBroken) {
        isLit = false
        return
      }
      isLit = !isLit
    },
    break() {
      isBroken = true
      isLit = false
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