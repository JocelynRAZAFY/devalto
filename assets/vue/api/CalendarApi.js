import axiosService from '../plugins/axiosService'

export default {
    async login(param){
        return axiosService.post('/api/user/login',param)
    },
    async userInfo(){
        return axiosService.get('/api/app/user/info')
    },
    async userCheckSocial(param){
        return await axiosService.post('/api/user/social/check',param)
    },
    async register(param){
        return axiosService.post('/api/user/register',param)
    },
}
