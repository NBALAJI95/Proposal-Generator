import React from 'react';
import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
let multiDataSet=[];

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
    ],]);
};

const feeValue = (label, value) => {
    return ([{value: label},
        {value: ""},
        {value: ""},
        {value: ""},
        {value: ""},
        {value: value}]);
};

const additionalFees = ({ AdditionalFees, Total }) => {
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
        returnVal.push( feeValue( (mapValues[item] || item), currency(AdditionalFees[`${item}`]) ) );
    });

    returnVal.push(feeValue("TOTAL", currency(Total.TotalAdditionalFee)));

    return returnVal;
};

const setValues = ({ value }) => {
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
                [{value: "CURRENT PROVIDER"}],
            ]
        },
        {
            columns: [],
            data: Heading("PROCESSING FEES")
        },
        {
            columns: ["", "VOLUME", "#", "%", "ITEM", "FEE"],
            data: [
                [{value: "Visa"},
                    {value: currency(value.VISA.Volume) },
                    {value: `${value.VISA.Number}`},
                    {value: `${value.VISA.Percentage}`},
                    {value: currency(value.VISA.Item) },
                    {value: currency(value.VISA.Fee) }],
                [{value: "Master Card"},
                    {value: currency(value.Mastercard.Volume) },
                    {value: `${value.Mastercard.Number}`},
                    {value: `${value.Mastercard.Percentage}`},
                    {value: currency(value.Mastercard.Item) },
                    {value: currency(value.Mastercard.Fee) }],
                [{value: "DISCOVER"},
                    {value: currency(value.Discover.Volume) },
                    {value: `${value.Discover.Number}`},
                    {value: `${value.Discover.Percentage}`},
                    {value: currency(value.Discover.Item)},
                    {value: currency(value.Discover.Fee) }],
                [{value: "AMEX"},
                    {value: currency(value.AMEX.Volume) },
                    {value: `${value.AMEX.Number}`},
                    {value: `${value.AMEX.Percentage}`},
                    {value: currency(value.AMEX.Item) },
                    {value: currency(value.AMEX.Fee) }],
                feeValue("TOTAL", currency(`${value.VISA.Fee + value.Mastercard.Fee + value.Discover.Fee
                + value.AMEX.Fee}`))
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
                    {value: currency(value.amexFee) },
                    {value: ""},
                    {value: ""}],
                feeValue("TOTAL", currency(value.assoFee))
            ]
        },
        {
            columns: [],
            data: Heading("OTHER AUTH FEES")
        },
        {
            columns: [],
            data: [
                feeValue("TOTAL", currency(value.authFee))
            ]
        },
        {
            columns: [],
            data: Heading("ADDITIONAL FEES")
        },
        {
            columns: [],
            data: additionalFees(value)
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
                    {value: currency(value.Total.Total_Fee) || 0, style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}}],
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
                    , style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}}],
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
    setValues(props);

    const { value } = props;
    const values = [value.Total.Total_Fee, value.Total.TotalAdditionalFee, parseFloat(value.authFee), parseFloat(value.assoFee),
        (value.VISA.Fee + value.Mastercard.Fee + value.Discover.Fee + value.AMEX.Fee),
        value.businessName, value.currentProvider, value.volume, value.ticket,
        value.transactions ];

    return (
    <div style={{display: 'inline-block'}}>
        <ExcelFile element={<input type="submit" className="btn btn-primary" disabled={enableCondition(values)} value="Submit" />}>
            <ExcelSheet dataSet={multiDataSet} name="Organization"/>
        </ExcelFile>
    </div>);
};

export default Excel;

