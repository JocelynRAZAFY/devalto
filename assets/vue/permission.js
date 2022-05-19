import router from './router'
import store from './store'
import { getToken,removeToken } from './plugins/auth'
import axios from "axios";

const whiteList = ['/login', '/auth-redirect']

router.beforeEach(async(to, from, next) => {
     const hasToken = getToken()

    if (hasToken) {
        try {
           await store.dispatch('user/userInfoAction')
        }catch (e) {
           // window.location.href = '/';
            removeToken()
        }

        if (to.path === '/login') {
            // if is logged in, redirect to the home page
            next({ path: '/app/dashboard' })
        } else {
            try {
                axios.interceptors.response.use(undefined, (err) => {
                    return new Promise(() => {
                        console.log(err.response.status)
                        if (err.response.status === 401) {
                            window.location.href = '/';
                            // this.$router.push({path: "/login"})
                        }
                        throw err;
                    });
                });
                // get user info
                // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
                // const { roles } = await store.dispatch('user/getInfo')
                //console.log(to)
               // await store.dispatch('user/getInfoAction')
               // console.log('permission')
                next()

            } catch (error) {
                console.log(error)
                // await store.dispatch('user/resetToken')
                removeToken()
                next(`/login?redirect=${to.path}`)
            }
        }
    }
    else {
        /* has no token*/
        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next()
        } else {

            if (to.matched.some(record => record.meta.requiresAuth)) {
                // other pages that do not have permission to access are redirected to the login page.
                next(`/login?redirect=${to.path}`)

                //NProgress.done()
            } else {
                if(from.path.match('/app')){
                    window.location.href = '/';
                }else {
                    next();
                }
            }
        }
    }
})

router.afterEach(() => {
    // finish progress bar
   // NProgress.done()
})
//console.log('permission')
