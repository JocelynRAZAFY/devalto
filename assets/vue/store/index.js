import { createStore } from 'vuex'
import userModule from "./user";
import OtherModule from './other'
import CalendarModule from './calendar'
export default createStore({
    state: {

    },
    mutations: {
    },
    actions: {

    },
    modules: {
        user: userModule,
        other: OtherModule,
        calendar: CalendarModule
    }
})
