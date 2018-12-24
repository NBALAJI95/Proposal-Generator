export const updateStateValue = (type, name, val, part) => (
	{
		type, name, val, part
	}
);

export const resetForm = (part) => (
	{
		type: 'RESET',
		part
	}
);

export const fetchForm = () => (
	{
		type: 'FETCH'
	}
);

export const toggleCheck = (part) => (
	{
		type: 'TOGGLE_CHECK',
		part
	}
);
