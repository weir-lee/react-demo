import * as actionEnums from './actionEnums.js'

let initState = {
    total: 0,
    haha: 'hello'
}

function counter(state = initState, action) {
    switch (action.type) {
    case actionEnums.ADD:
        return {
            ...state,
            total: state.total + 1
        };
        break;

    case actionEnums.MINUS:
        return {
            ...state,
            total: state.total - 1
        };
        break;

    case actionEnums.ADD_NUM:
        return {
            ...state,
            total: state.total + Number(action.num)
        };
        break;

    default:
        return state;
        break;
    }
}

export default counter