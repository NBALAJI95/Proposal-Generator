const INITIAL_STATE_A = () => ({
    businessName: '', currentProvider: '',
    volume: '', ticket: '', transactions: '',
    assoFee: '', authFee: '',
    newFees: [],
    ProcessingFees: {
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
    },
    AdditionalFees: {monthlyFee: '', regulatoryFee: '', pciFee: '', techFee: '', pos: '', misc: ''},
    Total: {TotalAdditionalFee: 0, Total_Fee: 0, TotalProcessingFees: 0},
    amexCheck: false,
    amexFee: '',
});

const progress = (state, r) => {
    let count = 0;
    ["partA", "partB"].forEach((part) => {
        ["businessName", "currentProvider", "volume", "ticket", "transactions", "assoFee", "Total"].forEach((item) => {
            if(item !== "Total") {
                if (state[part][item].toString().length > 0) {
                    count++;
                }
            }
            else {
                if (state[part][item].TotalProcessingFees > 0) {
                    count++;
                }
                if (state[part][item].TotalAdditionalFee > 0) {
                    count++;
                }
            }
        })
    });
    if(r) {
        r['R'].progress = (count/18)*100;
        sessionStorage.setItem("State", JSON.stringify(r['R']));
    }
    return storage(Object.assign({}, state, {progress: (count/16)*100, m: true}));
};

const GET_PART_A = (state) => {
    return {partB: Object.assign({}, state.partA, state.partA.VISA, state.partA.Mastercard, state.partA.Discover,
        state.partA.AMEX)};
};

const INITIAL_STATE = () => (
    Object.assign({}, {partA: INITIAL_STATE_A()}, {partB: INITIAL_STATE_A()}, {progress: 0})
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
        const eachFee = ValueOf(State[part].ProcessingFees[val].Volume *
            (State[part].ProcessingFees[val].Percentage/100)) + ValueOf((State[part].ProcessingFees[val].Number  *
            State[part].ProcessingFees[val].Item));
        State[part].ProcessingFees[val].Fee = (eachFee > 0) ? eachFee.toFixed(2) : " ";
    });

    let processTotal = 0;

    array_val.forEach((val) => {
        total += ValueOf(State[part].ProcessingFees[val].Fee);
        processTotal +=ValueOf(State[part].ProcessingFees[val].Fee);
    });

    total = parseFloat(total.toFixed(2));
    processTotal = parseFloat(processTotal.toFixed(2));

    const step1 = Object.assign({}, State[part], {Total: {Total_Fee: total, TotalAdditionalFee: additionalTotal,
            TotalProcessingFees: processTotal}});
    return Object.assign({}, State, {[part]: step1});
};

const storage = (state) => {
    let ret = null;
    if (typeof(Storage) !== "undefined") {
        if(sessionStorage.getItem("State")) {
            let t = JSON.parse(sessionStorage.getItem("State"));
            if(t != null && (state.progress === 0 && state.m !== true)) {
                ret = JSON.parse(sessionStorage.getItem("State"));
            }
            else {
                sessionStorage.setItem("State", JSON.stringify(state));
                ret = JSON.parse(sessionStorage.getItem("State"));
            }
        }
        else {
            sessionStorage.setItem("State", JSON.stringify(state));
            ret = JSON.parse(sessionStorage.getItem("State"));
        }

    } else {
        alert('Session Storage not supported by your browser!');
        return state;
    }
    return ret;
};

export default (state = INITIAL_STATE(), action) => {
    state = storage(state);

    switch (action.type) {
        case 'InputWithLabel':
        case 'InputWithoutLabel':
        case 'ModalState':
        case 'Total':
            const appendVal = {[action.name]: action.val};
            const valueP = Object.assign({}, state[action.part], appendVal);
            return progress(calculateTotal(Object.assign({}, state, {[action.part]: valueP}), action.part));
        case 'TOGGLE_CHECK':
            const check = !(state[action.part].amexCheck);
            const valueT = Object.assign({}, state[action.part], {amexCheck: check}, (check)?{}:{amexFee: ''});
            return progress(calculateTotal(Object.assign({}, state, {[action.part]: valueT}), action.part));
        case 'RESET':
            let t = JSON.parse(sessionStorage.getItem("State"));
            t[action.part] = INITIAL_STATE_A();
            return progress(Object.assign({}, state, {[action.part]:INITIAL_STATE_A()}), {'R': t});
        case 'FETCH':
            return progress(Object.assign({}, state, GET_PART_A(state)));
        default:
            return state;
    }
};
