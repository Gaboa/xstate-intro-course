import { createMachine, interpret } from "xstate"

const lightBulbMachine = createMachine({
  id: "lightBulb",
  initial: "unlit",
  states: {
    lit: {
      entry: ["logLit"],
      on: {
        TOGGLE: "unlit",
        BREAK: "broken"
      }
    },
    unlit: {
      entry: ["logUnlit"],
      on: {
        TOGGLE: "lit",
        BREAK: "broken"
      }
    },
    broken: {
      type: "final",
      entry: ["logBroken"]
    }
  },

  predictableActionArguments: true,
  strict: true
}, {
  actions: {
    logLit() {
      console.log(`How bright and beautiful`)
    },
    logUnlit() {
      console.log(`Darkness`)
    },
    logBroken() {
      console.log("I am broken it is a GAME OVER")
    }
  }
})

const service = interpret(lightBulbMachine).start()
service.onTransition(state => {
  if (state.changed && state.matches("lit"))
    console.log(state.value)
})
service.send("TOGGLE")
console.log("Service: ", service)