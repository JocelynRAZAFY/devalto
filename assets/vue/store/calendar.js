import CalendarApi from "../api/CalendarApi";

export default {
    namespaced: true,
    state:{
        events: [],
    },
    mutations:{
        setEvents(state,events){
            state.events = events
        }
    },
    actions: {
        async getCalendarAction(context){
            const res = await CalendarApi.getCalendar()
            context.commit('setEvents',res.data.data.events)
        }
    }
}
