import React from 'react';
import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
let multiDataSet=[];

const withoutCurrency = (val) => {
    const v = `${parseFloat(val).toLocaleString('en-US',
        {minimumFractionDigits: 2, maximumFractionDigits:2})}`;
    if(v !== '$ NaN')
        return v;
    else
        return ' ';
};

const currency = (val) => {
    const v = `$ ${parseFloat(val).toLocaleString('en-US',
        {minimumFractionDigits: 2, maximumFractionDigits:2})}`;
    if(v !== '$ NaN')
        return v;
    else
        return ' ';
};

const Heading = (headingValue) => {
    return ([[{value: headingValue, style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
        {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
        {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
        {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
        {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
        {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
        {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
        {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
        {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
        {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
        {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
        {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},

    ],]);
};

const feeValue = (label1, value1, value2) => {
    return ([{value: label1},
        {value: ""},
        {value: ""},
        {value: ""},
        {value: ""},
        {value: value1},
        {value: ""},
        {value: ""},
        {value: ""},
        {value: ""},
        {value: ""},
        {value: value2},
    ]);
};

const additionalFees = ({ AdditionalFees, Total }, valueB) => {
    const { AdditionalFees: AdditionalFeesB, Total: TotalB } = valueB;
    let returnVal = [];

    const mapValues = {
        monthlyFee: "Monthly Fee",
        regulatoryFee: "Regulatory Fee",
        pciFee: "PCI Compliance",
        techFee: "Tech Fee",
        pos: "POS",
        misc: "Misc"
    };

    Object.keys(AdditionalFees).forEach((item, key) => {
        returnVal.push( feeValue( (mapValues[item] || item), currency(AdditionalFees[`${item}`]),
            currency(AdditionalFeesB[`${item}`]) ) );
    });

    returnVal.push(feeValue("TOTAL", currency(Total.TotalAdditionalFee), currency(TotalB.TotalAdditionalFee)));

    return returnVal;
};

const setValues = (value, valueB) => {
    multiDataSet = [
        {
            columns: [`${value.businessName}`, "", "", "", "", ],
            data: [
                [
                    {value: "TOTAL VOLUME"}, {value: currency(value.volume)},
                ],
                [
                    {value: "TOTAL TRANSACTIONS"}, {value: `${value.transactions}`},
                ],
                [
                    {value: "AVG. TICKET"}, {value: currency(value.ticket) },
                ],
                [
                    {value: "PROVIDER"}, {value: `${value.currentProvider}`},
                ]
            ]
        },
        {
            xSteps: 2,
            ySteps: 0,
            columns: [],
            data: [
                [{value: "CURRENT PROVIDER"},
                {value: ""},
                {value: ""},
                {value: ""},
                {value: ""},
                {value: ""},
                {value: ""},
                {value: "OUR QUOTE"},
                ],
            ]
        },
        {
            columns: [],
            data: Heading("PROCESSING FEES")
        },
        {
            columns: ["", "VOLUME", "#", "%", "ITEM", "FEE", "", "VOLUME", "#", "%", "ITEM", "FEE"],
            data: [
                [{value: "Visa"},
                    {value: currency(value.VISA.Volume) },
                    {value: `${value.VISA.Number}`},
                    {value: `${value.VISA.Percentage}`},
                    {value: currency(value.VISA.Item) },
                    {value: currency(value.VISA.Fee) },
                    {value: "" },
                    {value: currency(valueB.VISA.Volume) },
                    {value: `${valueB.VISA.Number}`},
                    {value: `${valueB.VISA.Percentage}`},
                    {value: currency(valueB.VISA.Item) },
                    {value: currency(valueB.VISA.Fee) },
                ],
                [{value: "Master Card"},
                    {value: currency(value.Mastercard.Volume) },
                    {value: `${value.Mastercard.Number}`},
                    {value: `${value.Mastercard.Percentage}`},
                    {value: currency(value.Mastercard.Item) },
                    {value: currency(value.Mastercard.Fee) },
                    {value: "" },
                    {value: currency(valueB.Mastercard.Volume) },
                    {value: `${valueB.Mastercard.Number}`},
                    {value: `${valueB.Mastercard.Percentage}`},
                    {value: currency(valueB.Mastercard.Item) },
                    {value: currency(valueB.Mastercard.Fee) },
                ],
                [{value: "DISCOVER"},
                    {value: currency(value.Discover.Volume) },
                    {value: `${value.Discover.Number}`},
                    {value: `${value.Discover.Percentage}`},
                    {value: currency(value.Discover.Item)},
                    {value: currency(value.Discover.Fee) },
                    {value: "" },
                    {value: currency(valueB.Discover.Volume) },
                    {value: `${valueB.Discover.Number}`},
                    {value: `${valueB.Discover.Percentage}`},
                    {value: currency(valueB.Discover.Item)},
                    {value: currency(valueB.Discover.Fee) },
                ],
                [{value: "AMEX"},
                    {value: currency(value.AMEX.Volume) },
                    {value: `${value.AMEX.Number}`},
                    {value: `${value.AMEX.Percentage}`},
                    {value: currency(value.AMEX.Item) },
                    {value: currency(value.AMEX.Fee) },
                    {value: "" },
                    {value: currency(valueB.AMEX.Volume) },
                    {value: `${valueB.AMEX.Number}`},
                    {value: `${valueB.AMEX.Percentage}`},
                    {value: currency(valueB.AMEX.Item) },
                    {value: currency(valueB.AMEX.Fee) },
                ],
                feeValue("TOTAL", currency(`${value.VISA.Fee + value.Mastercard.Fee + value.Discover.Fee
                + value.AMEX.Fee}`), currency(`${valueB.VISA.Fee + valueB.Mastercard.Fee + valueB.Discover.Fee
                + valueB.AMEX.Fee}`))
            ]
        },
        {
            columns: [],
            data: Heading("ASSOCIATION FEES")
        },
        {
            columns: [],
            data: [
                [{value: "AMEX"},
                    {value: ""},
                    {value: ""},
                    {value: ""},
                    {value: ""},
                    {value: currency(value.amexFee)},
                    {value: ""},
                    {value: ""},
                    {value: ""},
                    {value: ""},
                    {value: currency(valueB.amexFee)},
                ],
                feeValue("TOTAL", currency(value.assoFee), currency(valueB.assoFee))
            ]
        },
        {
            columns: [],
            data: Heading("OTHER AUTH FEES")
        },
        {
            columns: [],
            data: [
                feeValue("TOTAL", currency(value.authFee), currency(valueB.authFee))
            ]
        },
        {
            columns: [],
            data: Heading("ADDITIONAL FEES")
        },
        {
            columns: [],
            data: additionalFees(value, valueB)
        },
        {
            xSteps: 0,
            ySteps: 1,
            columns: [],
            data: [
                [{value: "TOTAL FEES", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                    {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                    {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                    {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                    {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                    {value: currency(value.Total.Total_Fee) || 0, style: {fill: {patternType: "solid",
                        fgColor: {rgb: "0000FF"}}}},

                    {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},

                    {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                    {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                    {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                    {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                    {value: currency(valueB.Total.Total_Fee) || 0, style: {fill: {patternType: "solid",
                                fgColor: {rgb: "0000FF"}}}}
                ],
            ]
        },
        {
            columns: [],
            data: [
                [{value: "EFFECTIVE RATE", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                    {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                    {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                    {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                    {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                    {value: `${parseFloat(((parseFloat(value.Total.Total_Fee) || 0)/(parseFloat(value.volume) || 0)*100)).toFixed(2)} %`
                    , style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},

                    {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},

                    {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                    {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                    {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                    {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},

                    {value: `${parseFloat(((parseFloat(valueB.Total.Total_Fee) || 0)/(parseFloat(valueB.volume) || 0)*100)).toFixed(2)} %`
                    , style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},

                ],
            ]
        },
        {
            columns: [],
            data: [
                [{value: "MONTHLY SAVINGS", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                    {value: `${currency(value.Total.Total_Fee - valueB.Total.Total_Fee)}`,
                        style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                ],
            ]
        },
        {
            columns: [],
            data: [
                [{value: "SAVINGS %", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                    {value: `${withoutCurrency((value.Total.Total_Fee - valueB.Total.Total_Fee) / (value.Total.Total_Fee) * 100)}%`,
                        style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                ],
            ]
        },
        {
            columns: [],
            data: [
                [{value: "1 YEAR SAVINGS", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                    {value: `${currency((value.Total.Total_Fee - valueB.Total.Total_Fee) * 12)}`,
                        style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                ],
            ]
        },
        {
            columns: [],
            data: [
                [{value: "3 YEAR SAVINGS", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                    {value: `${currency((value.Total.Total_Fee - valueB.Total.Total_Fee) * 12 * 3)}`,
                        style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                ],
            ]
        }
    ];
};

const enableCondition = (values) => {

    for (let value of values) {
        if(value <= 0 || (isNaN(value) && typeof value !== "string")) {
            return true;
        }
    }
    return false;
};

const Excel = (props) => {

    const { partA, partB } = props.value;

    const value = partA;

    setValues(partA, partB);

    const values = [value.Total.Total_Fee, value.Total.TotalAdditionalFee, parseFloat(value.authFee), parseFloat(value.assoFee),
        (value.VISA.Fee + value.Mastercard.Fee + value.Discover.Fee + value.AMEX.Fee),
        value.businessName, value.currentProvider, value.volume, value.ticket,
        value.transactions ];

    const valuesB = [partB.Total.Total_Fee, partB.Total.TotalAdditionalFee, parseFloat(partB.authFee), parseFloat(partB.assoFee),
        (partB.VISA.Fee + partB.Mastercard.Fee + partB.Discover.Fee + partB.AMEX.Fee),
        partB.businessName, partB.currentProvider, partB.volume, partB.ticket,
        partB.transactions ];

    return (
    <div style={{display: 'inline-block'}}>
        <ExcelFile element={<input type="submit" className="btn btn-primary"
           disabled={enableCondition(values) && enableCondition(valuesB)}  value="Submit" />}>
            <ExcelSheet dataSet={multiDataSet} name="Organization"/>
        </ExcelFile>
    </div>);
};

export default Excel;

