import {selectuser,followers,stars,issue,forks,category} from "./Types";


export const selectUser = (payload) => {
    return {
        type:selectuser,
        payload:{
            userDetail:payload
        }
    }
}
export const userFollower = (payload) => {
    return {
        type:followers,
        payload:{
            follower:payload
        }
    }
}
export const userStars = (payload) => {
    return {
        type:stars,
        payload:{
            stars:payload
        }
    }
}
export const Forks = (payload) => {
    return {
        type:forks,
        payload:{
            forks:payload
        }
    }
}
export const Issue = (payload) => {
    return {
        type:issue,
        payload:{
            issue:payload
        }
    }
}
export const Category = (payload) => {
    return {
        type:category,
        payload:{
            category:payload
        }
    }
}
