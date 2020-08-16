import { GET_DATA } from "../actions/actions"

const intialState = {
   
        totalSamplesTested: "",
        totalConfirmedCases: 0,
        totalActiveCases: 0,
        discharged: 0,
        death: 0,
        states: []
}
export default (state=intialState, action) => {
    switch(action.type) {
        case GET_DATA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return {
                ...state
            }
    }
}