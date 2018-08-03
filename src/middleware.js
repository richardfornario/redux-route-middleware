import {getActionTypes} from './getActionTypes';

const SUCCESS = 1, FAIL = 2;

const createRouteMiddleware = (history, options) => {
    return store => next => action => {
        let actionToCarryOut = {};
        if(action.route)
            actionToCarryOut = action.route;
        else if(action.meta) {
            const { previousAction } = action.meta;
            const actionTypes = getActionTypes(previousAction, options);
            if(previousAction.route) {
                const { success, fail } = previousAction.route;
                if(success && action.type == actionTypes[SUCCESS])
                    actionToCarryOut = success;
                else if(fail && action.type == actionTypes[FAIL])
                    actionToCarryOut = fail;
            }
        }
        if(actionToCarryOut.history)
        {
            const { push, replace, go } = actionToCarryOut.history;
            if(push)
                history.push(push);
            else if(replace)
                history.replace(replace);
            else if(go)
                history.go(go);
        }
        next(action);
    }
}

export default createRouteMiddleware;