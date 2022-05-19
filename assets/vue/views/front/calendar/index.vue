<template>
  <el-row :gutter="10">
    <el-col :span="8" :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
      <best-day/>
      <average-period-day/>
    </el-col>
    <el-col :span="16" :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
      <calendar/>
    </el-col>
  </el-row>
</template>

<script>

import Calendar from "./components/Calendar";
import BestDay from "./components/BestDay";
import AveragePeriodDay from "./components/AveragePeriodDay";
import {mapActions} from "vuex";
export default {
  name: "index",
  components :{
    AveragePeriodDay,
    BestDay,
    Calendar
  },
  async created() {
    await this.getCalendarAction()
  },
  methods: {
    ...mapActions('calendar', ['getCalendarAction'])
  }
}
</script>

<style lang="scss" scoped>
.el-col {
  border-radius: 4px;
}
</style>