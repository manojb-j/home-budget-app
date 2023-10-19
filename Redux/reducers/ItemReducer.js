import { constants as types } from "../actionTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
const initialState ={
    note: [],
    allNotes:[],
}


const addItemsReducer = (state = initialState,action) =>{
    switch(action.type){
        case types.ADD_ITEM:{
            AsyncStorage.setItem("notesData",JSON.stringify([...state.allNotes,action.payload]))
            console.log("showing data from reducer", action.payload)
            return{
                note:[...state.note,action.payload]
            }
        }

                  
        case types.STORE_ITEM:{
            console.log("showing data from storeitem",action.payload)
            return{
                ...state,
                allNotes:action.payload
            }
        }
        default:
            return state;
    }

}

const deleteItemReducer = (state = initialState, action) => {
    switch(action.type){
      case types.DELETE_ITEM: {
        console.log("Deleting item with ID:", action.payload);
        // Filter out the item to be deleted from both 'note' and 'allNotes'
        const updatedNote = state.note.filter(item => item.id !== action.payload);
        const updatedAllNotes = state.allNotes.filter(item => item.id !== action.payload);
  
        // Update AsyncStorage to reflect the changes
        AsyncStorage.setItem("notesData", JSON.stringify(updatedAllNotes));

        console.log("Updated note array:", updatedNote);
      console.log("Updated allNotes array:", updatedAllNotes);
  
        return {
          ...state,
          note: updatedNote,
          allNotes: updatedAllNotes,
        };
      }
      default:
        return state;
    }
  };

module.exports ={
    addItemsReducer,
    deleteItemReducer
}