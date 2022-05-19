import UserApi from "../api/UserApi";
import {setToken} from "../plugins/auth";
export default {
    namespaced: true,
    state:{
        token: null,
        user: {},
        isSocialExist: false,
        isPseudoExist: false,
        isEmailExist: false,
        isRegister: false,
        userInfo: {}
    },
    mutations:{
        setToken(state,token){
            state.token = token
        },
        setUser(state,user){
            state.user = user
        },
        setIsSocialExist(state,isSocialExist){
            state.isSocialExist = isSocialExist
        },
        setUserInfo(state,userInfo){
            Object.assign(state.userInfo,userInfo)
        },
        setIsPseudoExist(state,isPseudoExist){
            state.isPseudoExist = isPseudoExist
        },
        setIsEmailExist(state,isEmailExist){
            state.isEmailExist = isEmailExist
        },
        setIsRegister(state,isRegister){
            state.isRegister = isRegister
        },
    },
    actions:{
        async loginAction({commit},param){
            const res = await UserApi.login(param)
            if(res.data.data.token != null){
                commit('setToken', res.data.data.token)
                setToken(res.data.data.token)
            }
        },
        async userInfoAction({commit},param){
            const res = await UserApi.userInfo(param)
            commit('setUser',res.data.data.user)
        },
        async userCheckSocialAction({commit},param){
            const res = await UserApi.userCheckSocial(param)
            commit('setIsSocialExist',res.data.data.isSocialExist)
        },
        async registerAction({commit},param){
            const res = await UserApi.register(param)
            if(typeof res.data.data.isPseudoExist){
                commit('setIsPseudoExist',res.data.data.isPseudoExist)
            }
            if(typeof res.data.data.isEmailExist){
                commit('setIsEmailExist',res.data.data.isEmailExist)
            }

            commit('setIsRegister',res.data.data.register)
        },
    }
}
