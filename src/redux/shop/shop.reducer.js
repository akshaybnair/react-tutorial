import SHOP_DATA from './shop.data';
import {updateCollections} from './shop.actions';
import shopActionType  from './shop.types';
const INITIAL_STATE = {
    collections: null
}
const shopReducer = (state = INITIAL_STATE, action ) => {
    switch ( action.type) {
        case shopActionType.UPDATE_COLLECTIONS:
            return {
                ...state,
                collections : action.payload
            }
        default : 
            return {
                ...state
            }
    }
}
export default shopReducer;
