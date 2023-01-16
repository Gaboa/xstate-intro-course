import { assign, createMachine, interpret, EventObject } from "xstate"

interface ColorEventObject extends EventObject {
  color: string
}

const lightBulbMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QBsCWUAWAXAQgV2QCMA6NLAYgBUB5AcVoBkBRAbQAYBdRUABwHtYqLKj4A7biAAeiAEwyAbMRkBWNmoAs8rQHZVy+QBoQAT1nb1xAIxb52tvIAcATgeXtAZmUBfL0bSZcAhIychwAJSYAQQBpdi4kEH5BYTEJaQRlS0tiG1snNW1LNld1I1MEdxltKxtC53d5T3MfP3RsfCJSIXIAYQAJSIA5WiYAfR7qBmowuIkkoRFxBPT3dycleTZ1GW31azyy2TYZJVU1SwcGpyd9FpB-dqDiPFEQmnpmWYT5lKXQdLkihUai2tT0hhMiEqFlydScDSa6juD0CnReIXCUVinDmAgWqWWsgUpxBmh04MOCFcxDO5xknmK8m2Pl8IFEfAgcAkKI6hFxyUWaUQAFoIeVhcpiNdpTLZe5kW1UcEhPz8X8pFD1NVaWxtJcFA0mZT3FsajossoHJddAqArznq8Vd88b8hQhtpSqusttY7Op8upLg5bY9OoQAE58ADWYHVP0FhIQ8hkbCUxXcgZkDmUN3kyk9Dmqex09nkFv92hZXiAA */
createMachine({
  id: "lightBulb",
  initial: "unlit",
  context: {
    color: "#FFF"
  },
  states: {
    lit: {
      entry: ["logLit"],
      on: {
        TOGGLE: "unlit",
        BREAK: "broken",
        CHANGE_COLOR: {
          actions: ["changeColor"]
        }
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
    },
    changeColor() {
      assign<unknown, ColorEventObject>((context, event) => ({
        color: event.color
      }))
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