import { createMachine } from "xstate"

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

console.log("Machine: ", lightBulbMachine)