
export const updateStateValue = (type, name, val, part) => (
    {
        type, name, val, part
    }
);

export const resetForm = () => (
    {
        type: 'RESET'
    }
);

export const toggleCheck = (part) => (
    {
        type: 'TOGGLE_CHECK',
        part
    }
);

