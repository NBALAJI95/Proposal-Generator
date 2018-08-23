const INITIAL_STATE_A = () => ({
    businessName: '', currentProvider: '',
    volume: '', ticket: '', transactions: '',
    assoFee: '', authFee: '',
    newFees: [],
    VISA: {
        Volume: '', Number: '', Percentage: '', Item: '', Fee: ''
    },
    Mastercard: {
        Volume: '', Number: '', Percentage: '', Item: '', Fee: ''
    },
    Discover: {
        Volume: '', Number: '', Percentage: '', Item: '', Fee: ''
    },
    AMEX: {
        Volume: '', Number: '', Percentage: '', Item: '', Fee: ''
    },
    AdditionalFees: {monthlyFee: '', regulatoryFee: '', pciFee: '', techFee: '', pos: '', misc: ''},
    Total: {TotalAdditionalFee: 0, Total_Fee: 0},
    amexCheck: false,
    amexFee: '',
});

const INITIAL_STATE = () => (
    Object.assign({}, {partA: INITIAL_STATE_A()}, {partB: INITIAL_STATE_A()})
);

const ValueOf = (val) => (
    parseFloat(val) || 0
);

const calculateTotal = (State, part) => {
    const norm_val = ['assoFee', 'authFee'];
    const array_val = ['VISA', 'Mastercard', 'Discover', 'AMEX'];

    let total = 0;

    const additional = State[part].AdditionalFees;

    Object.values(additional).forEach((val) => {
        total += ValueOf(val);
    });

    const additionalTotal = total;

    norm_val.forEach((val) => {
        total += ValueOf(State[part][val]);
    });

    array_val.forEach((val) => {
        total += ValueOf(State[part][val].Fee);
    });

    total = parseFloat(total.toFixed(2));

    const step1 = Object.assign({}, State[part], {Total: {Total_Fee: total, TotalAdditionalFee: additionalTotal}});
    return Object.assign({}, State, {[part]: step1});
};

/*const calculate = () => {
    CalculateTotal();
};*/

export default (state = INITIAL_STATE(), action) => {

    switch (action.type) {
        case 'InputWithLabel':
        case 'InputWithoutLabel':
        case 'ModalState':
        case 'Total':
            const appendVal = {[action.name]: action.val};
            const valueP = Object.assign({}, state[action.part], appendVal);
            return calculateTotal(Object.assign({}, state, {[action.part]: valueP}), action.part);
        case 'TOGGLE_CHECK':
            console.log("&&&&&&&&&&&state", state);
            console.log("action.part", action.part);
            const check = !(state[action.part].amexCheck);
            console.log("checkbox value", check);
            const valueT = Object.assign({}, state[action.part], {amexCheck: check}, (check)?{}:{amexFee: ''});
            return calculateTotal(Object.assign({}, state, {[action.part]: valueT}), action.part);
        case 'RESET':
            return Object.assign({}, state, {[action.part]:INITIAL_STATE_A()});
        case 'FETCH':
            return Object.assign({}, state, {partB: state.partA});
        default:
            return state;
    }
};