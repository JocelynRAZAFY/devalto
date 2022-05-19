<template>
  <div class="main-content" style=" background: rgb(23,43,77);">
    <!-- Header -->
    <login-title/>
    <!-- Page content -->
    <div class="container mt--8 pb-5">
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
          <div class="card bg-secondary border-0 mb-0">
            <div class="card-header bg-transparent pb-5">
              <div class="text-muted text-center mt-2 mb-3">
                <small>Sign in with</small>
              </div>
              <div class="btn-wrapper text-center">
                <!--                <a href="#" class="btn btn-neutral btn-icon">-->
                <!--                  <span class="btn-inner&#45;&#45;icon">-->
                <!--                    <img src="../../../../argon/assets/img/icons/common/github.svg">-->
                <!--                  </span>-->
                <!--                  <span class="btn-inner&#45;&#45;text">Github</span>-->
                <!--                </a>-->
                <a href="javascript:void(0)" class="btn btn-neutral btn-icon">
                  <span class="btn-inner--icon">
                    <img src="../../../../argon/assets/img/icons/common/google.svg">
                  </span>
                  <span class="btn-inner--text">Google</span>
                </a>
              </div>
            </div>
            <div class="card-body px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
                <small>Or sign in with credentials</small>
              </div>
              <login-form/>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-6">
              <a href="#" class="text-light"><small>Forgot password?</small></a>
            </div>
            <div class="col-6 text-right">
              <a href="#" class="text-light"><small>Create new account</small></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginNav from "../components/LoginNav";
import LoginTitle from "../components/LoginTitle";
import LoginForm from "../components/LoginForm";
import Google from "../components/Google";

export default {
  name: "index",
  components: {LoginForm, LoginTitle, LoginNav},
}
</script>

<style scoped>

</style>