<template>
  <el-card class="box-card" style="margin-bottom: 2em">
    <template #header>
      <div class="card-header">
        <span>Meilleur jour pour aller au festival d'été 9 au 19 juillet
        2015.</span>
      </div>
    </template>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column prop="date" label="Date" width="120" />
      <el-table-column prop="com" label="Commentaire" />
    </el-table>
  </el-card>

</template>

<script>
import {useStore} from "vuex";
import {computed, watch, ref} from "vue";

export default {
  name: "BestDay",
  setup(){
    const {state} = useStore()
    const tableData = ref([])

    //Computed
    const events = computed(() => state.calendar.events)

    // Watch
    watch(events, (value) => {
      for (const date in value.bestDayFestival){
        const com = "C'est le meilleur jour pour assister à un spectacle\n" +
            "musical extérieur en soirée durant le festival d’été qui s’est déroulé du 9 au 19 juillet\n" +
            "2015. Car la valeur MAXIMAL parmi les valeurs de températures minimales est : "+value.bestDayFestival[date].min
        tableData.value.push({date: date, com: com})
      }
    })

    return {
      tableData,
      events
    }
  }
}
</script>

<style scoped>

</style>