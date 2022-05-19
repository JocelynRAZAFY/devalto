import { createStore } from 'vuex'
import userModule from "./user";
import OtherModule from './other'
import LeagueModule from './league'
import ProgrammeModule from './programme'
import ProjectModule from './project'
export default createStore({
    state: {

    },
    mutations: {
    },
    actions: {

    },
    modules: {
        user: userModule,
        other: OtherModule,
        league: LeagueModule,
        programme: ProgrammeModule,
        project: ProjectModule
    }
})
