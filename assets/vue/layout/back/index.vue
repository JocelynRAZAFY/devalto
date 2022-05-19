<template>
<div>
  <sidenav/>
  <main-content/>
</div>
</template>

<script>
import Sidenav from "../../components/Sidenav";
import MainContent from "../../components/MainContent";
export default {
  name: "index",
  components: {MainContent, Sidenav}
}
</script>

<style lang="scss" scoped>

</style>