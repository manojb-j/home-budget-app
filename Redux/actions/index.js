import { constants as types } from "../actionTypes";

const addItem = (payload) => {
    // console.log("showing notes in payload",payload)
    const action={
        type:types.ADD_ITEM,
        payload
    }
    return action;
}

const updateItem = (payload) => {
    const action={
        type:types.UPDATE_ITEM,
        payload
    }
    return action;
}

const deleteItem = (itemId) => {
    console.log("showing itemId in delete action",itemId)
    const action={
        type:types.DELETE_ITEM,
        payload: itemId,
    }
    return action;
}

const storeItem = (payload) => {
    const action={
        type:types.STORE_ITEM,
        payload
    }
    return action;
}

module.exports = {
    addItem,
    updateItem,
    deleteItem,
    storeItem
}