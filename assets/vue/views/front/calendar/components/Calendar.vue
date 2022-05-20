<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Température Quotidienne</span>
      </div>
    </template>
    <full-calendar :options="calendarOptions">
    </full-calendar>
  </el-card>
</template>

<script>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {useStore} from "vuex";
import {computed, reactive, watch} from "vue";
export default {
  name: "Calendar",
  components: {
    FullCalendar
  },
  setup(){
    const { state } = useStore()
    const calendarOptions = reactive({
      plugins: [
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin, // needed for dateClick
      ],
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      },
      buttonText: {
        today: "Aujourd'hui",
        month: "Mois",
        week: "Semaine",
        day: "Jour",
      },
      locale: "fr",
      initialView: "dayGridMonth",
      events: [], // alternatively, use the `events` setting to fetch from a feed
      editable: false,
      selectable: false,
      selectMirror: true,
      dayMaxEvents: true,
      weekends: true,
      // select: this.handleDateSelect,
      eventClick: handleEventClick,
      eventRender: eventRenderClick,
      firstDay: 1,
      slotDuration: "00:10:00",
      slotLabelInterval: 10,
      initialDate: '2015-07-01'
    })

    // Computed
    const events = computed(() => state.calendar.events)

    // Methods
    const eventRenderClick = (event, element) => {
      element.css("font-size", "5px");
      element.css("padding", "15px");
      element.css("cursor", "pointer");
    }
    const handleEventClick = (clickInfo) => { console.log(clickInfo)}

    // Watch
    watch(events, (value) => {
      const events = []
      for (const date in value.avarageTempDay){
        const avarage = value.avarageTempDay[date]
        for(const label in avarage){
          const data = {
            title: `${label}: ${avarage[label]}`,
            date: date
          }
          events.push(data)
        }
      }
      calendarOptions.events = events
    })

    return {
      calendarOptions,
      events,
      eventRenderClick,
      handleEventClick
    }
  }
}
</script>

<style scoped>

</style>