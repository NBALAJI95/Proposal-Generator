export const CashDiscount = {
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
	overview: false,
	volume: '',
	businessName: '',
	currentProvider: '',
	avgTicket: '',
	transactions: '',
	serviceFeePercent: '',
	additional: new Set()
};

export const Name = {
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
};