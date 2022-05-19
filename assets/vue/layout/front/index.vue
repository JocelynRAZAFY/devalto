<template>
  <div>
    <header-front/>
    <breadcrumb/>
    <!-- SECTION -->
    <div class="section">
      <!-- container -->
      <div class="container">
        <!-- row -->
        <div class="row">
          <content-app/>
        </div>
        <!-- /row -->
      </div>
      <!-- /container -->
    </div>

    <!-- /SECTION -->
    <!-- NEWSLETTER -->
    <newsletter/>
    <!-- /NEWSLETTER -->


  </div>
</template>

<script>
import ContentApp from "../../components/ContentApp";
import HeaderFront from "../../components/HeaderFront";
import Newsletter from "../../components/Newsletter";
import Categorie from "../../components/Categorie";
import Breadcrumb from "../../components/Breadcrumb";
export default {
  name: "index",
  components: {Breadcrumb, Categorie, Newsletter, HeaderFront, ContentApp},
  data: () => ({

  }),
  created() {
    console.log('ici')
  },
}
</script>

<style lang="scss" scoped>
@import "../../../electro/css/bootstrap.min.css";
@import "../../../electro/css/slick.css";
@import "../../../electro/css/slick-theme.css";
@import "../../../electro/css/nouislider.min.css";
@import "../../../electro/css/font-awesome.min.css";
@import "../../../electro/css/style.css";
</style>