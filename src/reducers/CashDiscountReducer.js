const INITIAL_STATE = () => ({
    partA: {
        volume: '',
        Fees: '',
        additionalFees: {},
        modalFees: ''
    },
    partB: {
        volume: '',
        Fees: '',
        additionalFees: {},
        modalFees: ''
    },
    overview: false
});

export default (state = INITIAL_STATE(), action) => {
    console.log(state);
    switch(action.type) {
        case 'UPDATE_CD':
            const tmp = { ...state[action.part], [action.name]: action.val };
            return Object.assign({}, state, {[action.part]: tmp});
        case 'UPDATE_ADDITIONAL_FEES':
            const t = Object.assign({}, state[action.part].additionalFees, {[action.name]: action.val});
            const additional = {
                ...state[action.part],
                additionalFees: t
            };
            return Object.assign({}, state, {[action.part]: additional});
        case 'UPDATE_COMMON':
            if(action.part) {
                const modal = { ...state[action.part], modalFees: action.val };
                return Object.assign({}, state, {[action.part]: modal});
            } else {
                return Object.assign({}, state, {overview: !(state.overview)});
            }
        case 'RESET_CASH_DISCOUNT':
            return INITIAL_STATE();
        default:
            return state;
    }
};