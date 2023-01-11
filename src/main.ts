import { createMachine, interpret } from "xstate"

const lightBulbMachine = createMachine({
  id: "lightBulb",
  initial: "unlit",
  states: {
    lit: {
      on: {
        TOGGLE: "unlit",
        BREAK: "broken"
      }
    },
    unlit: {
      on: {
        TOGGLE: "lit",
        BREAK: "broken"
      }
    },
    broken: {
      type: "final"
    }
  },

  predictableActionArguments: true,
  strict: true
})

const service = interpret(lightBulbMachine).start()
service.send("TOGGLE")
console.log("Service: ", service)