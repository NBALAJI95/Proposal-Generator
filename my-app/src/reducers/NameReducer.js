const INITIAL_STATE = () => ({
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

const ValueOf = (val) => (
    parseFloat(val) || 0
);

const calculateTotal = (State) => {
    const norm_val = ['assoFee', 'authFee'];
    const array_val = ['VISA', 'Mastercard', 'Discover', 'AMEX'];

    let total = 0;

    norm_val.forEach((val) => {
        total += ValueOf(State[val]);
    });

    array_val.forEach((val) => {
        total += ValueOf(State[val].Fee);
    });

    const additional = State.AdditionalFees;

    Object.values(additional).forEach((val) => {
        total += ValueOf(val);
    });

    total = parseFloat(total.toFixed(2));


    return Object.assign({}, State, {Total: {Total_Fee: total, TotalAdditionalFee: State.Total.TotalAdditionalFee}});
};

export default (state = INITIAL_STATE(), action) => {

    switch (action.type) {
        case 'NAME':
            return calculateTotal(Object.assign({}, state, {name: action.data}));
        case 'InputWithLabel':
        case 'InputWithoutLabel':
        case 'ModalState':
        case 'Total':
            const appendVal = {[action.name]: action.val};
            return calculateTotal(Object.assign({}, state, appendVal));
        case 'TOGGLE_CHECK':
            const check = !(state.amexCheck);
            return calculateTotal(Object.assign({}, state, {amexCheck: check}));
        case 'RESET':
            return INITIAL_STATE();
        default:
            return state;
    }
};