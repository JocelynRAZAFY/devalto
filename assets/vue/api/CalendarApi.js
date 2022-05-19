import axiosService from '../plugins/axiosService'

export default {
    async getCalendar(){
        return axiosService.get('/api/calendar')
    }
}
