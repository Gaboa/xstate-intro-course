import { createMachine } from "xstate";

const doorMachine = createMachine({
    id: "door",
    initial: "locked",
    states: {
        locked: {
            on: {
                UNLOCK: "unlocked"
            }
        },
        unlocked: {
            initial: "closed",
            states: {
                opened: {
                    on: {
                        CLOSE: "closed"
                    }
                },
                closed: {
                    on: {
                        OPEN: "opened",
                        LOCK: "#door.locked"
                    }
                }
            }
        }
    }
})