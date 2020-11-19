import  {selectuser,followers,stars,issue,forks,category}  from "./Types";

const initialState ={
    selectedUser : {},
    followers:0,
    stars:0,
    forks:[],
    issue:[],
    category:[]
}

const SelectUserReducer =(state = initialState,action) =>{
    
    switch(action.type){
        case selectuser:
        return{
            ...state,
            selectedUser:action.payload.userDetail,
           
        }
        case followers:
        return{
            ...state,
            followers:action.payload.follower,
           
        }
        case stars:
        return{
            ...state,
            stars:action.payload.stars,
           
        }
        case issue:
        return{
            ...state,
            issue:action.payload.issue,
           
        }
        case forks:
        return{
            ...state,
            forks:action.payload.forks,
           
        }
        case category:
        return{
            ...state,
            category:action.payload.category,
           
        }
        default: return state;
    }
}

export default SelectUserReducer;