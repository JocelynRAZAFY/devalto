<template>
  <el-card class="box-card" style="margin-bottom: 2em">
    <template #header>
      <div class="card-header">
        <span>Moyenne par période de la journée</span>
      </div>
    </template>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column prop="date" label="Date"/>
      <el-table-column prop="avarageMorning" label="Morning"/>
      <el-table-column prop="avarageAfterNoon" label="After noon" />
      <el-table-column prop="avarageEvening" label="Evening"/>
      <el-table-column prop="avarageNight" label="Night" />
    </el-table>
  </el-card>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "AveragePeriodDay",
  data: () => ({
    tableData: []
  }),
  computed:{
    ...mapState({
      events: (state) => state.calendar.events
    })
  },
  methods:{

  },
  watch:{
    events(value){
      for(const day in value.avarageTempPeriod){
        const avarage = value.avarageTempPeriod[day]
        let data = {}
        for(const label in avarage){
          data['date'] = day
          data[label] = avarage[label]
        }
        this.tableData.push(data)
      }
    }
  }
}
</script>

<style scoped>

</style>