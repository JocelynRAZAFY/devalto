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
import {mapState} from "vuex";
export default {
  name: "Calendar",
  components: {
    FullCalendar
  },
  data: function (){
    return {
      calendarOptions: {
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
        eventClick: this.handleEventClick,
        eventRender: this.eventRender,
        firstDay: 1,
        slotDuration: "00:10:00",
        slotLabelInterval: 10,
        initialDate: '2015-07-01'
      },
    }
  },
  computed:{
    ...mapState({
      events: (state) => state.calendar.events
    })
  },
  methods:{
    handleEventClick(clickInfo) {
      //const prog = this.progs.find((_prog) => _prog.id == clickInfo.event.id);
      // this.$modal.show(EventModal, { event: prog });
    },
    eventRender(event, element) {
      element.css("font-size", "5px");
      element.css("padding", "15px");
      element.css("cursor", "pointer");
    },
  },
  watch:{
    events(value){
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
      this.calendarOptions.events = events
    }
  }
}
</script>

<style scoped>

</style>