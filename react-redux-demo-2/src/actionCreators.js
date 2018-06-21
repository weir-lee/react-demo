import * as actionEnums from './actionEnums.js'

export function add() {
    return {
        type: actionEnums.ADD
    }
}

export function minus() {
    return {
        type: actionEnums.MINUS
    }
}

export function addNum(num) {
    return {
        type: actionEnums.ADD_NUM,
        num
    }
}