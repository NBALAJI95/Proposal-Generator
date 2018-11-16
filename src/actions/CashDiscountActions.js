export const updateCashDiscountState = (name, val, part) => (
    {
        type: 'UPDATE_CD', name, val, part
    }
);

export const updateNewFees = (name, val, part) => (
    {
        type: 'UPDATE_ADDITIONAL_FEES', name, val, part
    }
);

export const updateCommon = (name, val, part) => (
    {
        type: 'UPDATE_COMMON', name, val, part
    }
);

export const resetCashDiscount = () => (
    {
        type: 'RESET_CASH_DISCOUNT'
    }
);

export const updateBusinessInfo = (prop, val) => {
    console.log('&&&&&&', prop, val)
    return ({
        type: 'BUSINESS_INFO', name: prop, val
    });
};

export const copyCashDiscount = () => (
    {
        type: 'COPY_CASH_DISCOUNT'
    }
);


