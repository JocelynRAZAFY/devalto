<template>
  <el-card class="box-card" style="margin-bottom: 2em">
    <template #header>
      <div class="card-header">
        <span>Meilleur jour pour aller au festival d'été</span>
      </div>
    </template>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column prop="date" label="Date" />
    </el-table>
  </el-card>

</template>

<script>
import {mapState} from "vuex";

export default {
  name: "BestDay",
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
      this.tableData.push({date: value.bestDayFestival})
    }
  }
}
</script>

<style scoped>

</style>