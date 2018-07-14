const navState = {
    isAddClass:false,
    isHideNotify:false,
}

//action
const IS_ADD_CLASS = 'IS_ADD_CLASS';
const IS_HIDE_NOTIFY = 'IS_HIDE_NOTIFY';
const IS_REMOVE_CLASS = 'IS_REMOVE_CLASS';
//action creator
export function ACTION_IS_ADD_CLASS(params) {
    return {
        type:IS_ADD_CLASS,
        params
    }
}

export function ACTION_IS_HIDE_NOTIFY (params) {
    return {
        type:IS_HIDE_NOTIFY,
        params
    }
}

export function ACTION_IS_REMOVE_CLASS (params) {
    return {
        type:IS_REMOVE_CLASS,
        params
    }
}

//reducer 
export default function navReducer(state = navState, action) {
    switch(action.type) {

        //添加导航背景颜色class
        case IS_ADD_CLASS: {
            return {
                ...state,
                isAddClass:true,
            }
        }

        //删除导航背景颜色CLASS
        case IS_REMOVE_CLASS: {
            return {
                ...state,
                isAddClass:false,
            }
        }
        //隐藏导航广播
        case IS_HIDE_NOTIFY: {
           
            return {
                ...state,
                isHideNotify:true,
            }
         
        }

        default:
        return state;
    }
}