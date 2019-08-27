const INITIAL_STATE = {
    currentUser : null
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'SET_CURRENT_USER' :
            console.log('-----------------action-----------------')
            console.log(action)
            console.log('-----------------payload-----------------')
            console.log(action.payload)           
            return {
                ...state,
                currentUser: action.payload
            };
        default:
             return state;
    }
}
export default userReducer;