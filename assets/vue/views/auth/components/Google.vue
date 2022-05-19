<template>
  <div class="google-btn"
       @click="authGoogle">
    <div class="google-icon-wrapper">
      <img class="google-icon" :src="logo"/>
    </div>
    <p class="btn-text"><b>Sign in with google</b></p>
  </div>
</template>

<script>
    import gAuth from 'vue3-google-auth'
    import {mapActions, mapState, mapMutations} from 'vuex'

    export default {
        name: "Google",
        setup(){
            const $gAuth = gAuth.useGAuth()
            return {
                $gAuth
            }
        },
        mounted() {

        },
        data: () => ({
            user:{
                personalID: null,
                pseudo: null,
                email: null,
                emailSocial: null,
                password: null,
                isSocial: true,
                avatar: null,
                name: null
            },
            personalID: null,
            logo: '/image/google.svg'
        }),
        computed:{
          ...mapState({
              isSocialExist: (state) => state.user.isSocialExist,
              isRegister: (state) => state.user.isRegister,
              token: (state) => state.user.token,
              loading: (state) => state.other.loading
          })
        },
        methods:{
            ...mapMutations('other',['setLoading']),
            ...mapMutations('user',['setUserInfo']),
            ...mapActions('user',['userCheckSocialAction','registerAction','loginAction']),
            authGoogle(){
                this.$gAuth
                    .signIn()
                    .then(GoogleUser => {
                        const basicProfile = GoogleUser.getBasicProfile()

                        this.personalID = basicProfile.getId()
                        this.user.personalID = basicProfile.getId();
                        this.user.pseudo = basicProfile.getId()+'-'+basicProfile.getName();
                        this.user.email = basicProfile.getId()+"@gmail.com";
                        this.user.emailSocial = basicProfile.getEmail();
                        this.user.password = basicProfile.getId();
                        this.user.name = basicProfile.getName();
                        this.user.firstName = basicProfile.getGivenName();
                        this.user.lastName = basicProfile.getFamilyName();
                        this.user.avatar = basicProfile.getImageUrl();
                        this.user.isCompany = false

                        this.setLoading(true)
                        this.onSuccess(this.personalID)

                    })
                    .catch(error => {
                        console.log('error', error)
                    })
            },
            async onSuccess(value) {
                if(value != null){
                    await this.userCheckSocialAction({email: this.user.email})
                    if(this.isSocialExist){
                        await this.login()
                        // if(this.token != null){
                        //     this.setTestLogin(false)
                        //     await this.$router.push({path: '/app/cli/dashboard'})
                        // }
                    }else {
                        this.setUserInfo(this.user)
                        //await this.$router.push({ path: '/info-register-social' })
                       // console.log(this.user)
                        await this.registerAction(this.user)
                        if(this.isRegister){
                            await this.login()
                            // if(this.token != null){
                            //     this.setTestLogin(false)
                            //     await this.$router.push({ path:'/app/cli/dashboard'})
                            // }
                        }
                    }
                    // console.log(this.isSocialExist)
                }
                this.setLoading(false)
            },
            getOtherQuery(query) {
                return Object.keys(query).reduce((acc, cur) => {
                    if (cur !== 'redirect') {
                        acc[cur] = query[cur]
                    }
                    return acc
                }, {})
            },
            async login(){
                await this.loginAction({email: this.user.email, password: this.user.password})
                if(this.token != null){
                  await this.$router.push({ path: '/app/dashboard', query: this.otherQuery })
                }
            }
        },
        watch: {
            $route: {
                handler: function(route) {
                    const query = route.query
                    if (query) {
                        this.redirect = query.redirect
                        this.otherQuery = this.getOtherQuery(query)
                    }
                },
                immediate: true
            }
        },
    }
</script>

<style lang="scss" scoped>
    $white: #fff;
    $google-blue: #4285f4;
    $button-active-blue: #1669F2;

    .google-btn {
      width: 184px;
      height: 42px;
      background-color: $google-blue;
      border-radius: 2px;
      box-shadow: 0 3px 4px 0 rgba(0,0,0,.25);
      cursor: pointer;
      margin: 0 auto;
      .google-icon-wrapper {
        position: absolute;
        margin-top: 1px;
        margin-left: 1px;
        width: 40px;
        height: 40px;
        border-radius: 2px;
        background-color: $white;
      }
      .google-icon {
        position: absolute;
        margin-top: 11px;
        margin-left: -7px;
        width: 18px;
        height: 18px;
      }
      .btn-text {
        float: right;
        margin: 11px 11px 0 0;
        color: $white;
        font-size: 14px;
        letter-spacing: 0.2px;
        font-family: "Roboto";
      }
      &:hover {
        box-shadow: 0 0 6px $google-blue;
      }
      &:active {
        background: $button-active-blue;
      }
    }

    //@import url(https://fonts.googleapis.com/css?family=Roboto:500);
</style>