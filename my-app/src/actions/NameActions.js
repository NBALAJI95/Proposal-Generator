
export const updateStateValue = (type, name, val) => (
    {
        type, name, val
    }
);

export const resetForm = () => (
    {
        type: 'RESET'
    }
);

export const toggleCheck = () => (
    {
        type: 'TOGGLE_CHECK'
    }
);

