import State from './State';
import Util  from './Util';

const Actions = {};

Actions.GO_TO_NEXT_MONTH = (prevState) => {
    const newState = Util.extend(new State(), prevState);

    if (newState.monthIndex === 11) { // eslint-disable-line no-magic-numbers
        newState.monthIndex = 0;
        newState.year++;
    } else {
        newState.monthIndex++;
    }

    return newState;
};

Actions.GO_TO_PREV_MONTH = (prevState) => {
    const newState = Util.extend(new State(), prevState);

    if (newState.monthIndex === 0) {
        newState.monthIndex = 11;
        newState.year--;
    } else {
        newState.monthIndex--;
    }

    return newState;
};

Actions.GO_TO_NEXT_YEAR = (prevState) => {
    const newState = Util.extend(new State(), prevState);

    newState.year++;

    return newState;
};

Actions.GO_TO_PREV_YEAR = (prevState) => {
    const newState = Util.extend(new State(), prevState);

    newState.year--;

    return newState;
};

export default Actions;