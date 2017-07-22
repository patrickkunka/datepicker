import State from './State';
import Util from './Util';

import {
    ACTION_TYPE_GO_TO_NEXT_MONTH,
    ACTION_TYPE_GO_TO_PREV_MONTH,
    ACTION_TYPE_GO_TO_NEXT_YEAR,
    ACTION_TYPE_GO_TO_PREV_YEAR
} from './Constants';

export const root = (prevState, action) => {
    const newState = Util.extend(new State(), prevState);

    switch (action.type) {
        case ACTION_TYPE_GO_TO_NEXT_MONTH:
            if (newState.monthIndex === 11) { // eslint-disable-line no-magic-numbers
                newState.monthIndex = 0;
                newState.year++;
            } else {
                newState.monthIndex++;
            }

            break;
        case ACTION_TYPE_GO_TO_PREV_MONTH:
            if (newState.monthIndex === 0) {
                newState.monthIndex = 11;
                newState.year--;
            } else {
                newState.monthIndex--;
            }

            break;
        case ACTION_TYPE_GO_TO_NEXT_YEAR:
            newState.year++;

            break;
        case ACTION_TYPE_GO_TO_PREV_YEAR:
            newState.year--;

            break;
        default:
            throw new RangeError(`[Datepicker] Unknown action type "${action.type}"`);
    }

    return newState;
};

export default root;