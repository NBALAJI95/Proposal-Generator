export * from './NameActions';
export * from './CashDiscountActions';

export const resetCashDiscount = () => (
    {
        type: 'RESET_CASH_DISCOUNT'
    }
);
export const copyCashDiscount = () => (
    {
        type: 'COPY_CASH_DISCOUNT'
    }
);