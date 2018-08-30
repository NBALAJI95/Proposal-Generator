import React from 'react';
import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
let multiDataSet=[];

const currency = (val, cond, special = false) => {
    if(cond)
        val = `$ ${parseFloat(val).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})}`;
    else
        val = `${parseFloat(val).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})}`;
    return (val !== '$ NaN') ? val : (special) ? '$ 0.00':' ';
};

const redundantObject = (obj, count) => {
    const ret = [];
    for(let i = 0; i < count ; i++) {
        ret.push(obj);
    }
    return ret;
};

const Heading1 = (headingValue) => {
    return ([{value: headingValue, style: {font:{color: {rgb: "FFFFFF"}, bold: true}, fill: {patternType: "solid", fgColor: {rgb: "538DD5"}}}},
        ...redundantObject({value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "538DD5"}}}}, 10),
    ]);
};

const feeValue = (label1, value1, value2, style={}) => {
    return ([{value: label1, style},
        ...redundantObject({value: ""}, 4), {value: value1, style}, ...redundantObject({value: ""}, 4), {value: value2, style}
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
        returnVal.push( feeValue( (mapValues[item] || item), currency(AdditionalFees[`${item}`], true),
            currency(AdditionalFeesB[`${item}`], true) ) );
    });

    returnVal.push(feeValue("TOTAL", currency(Total.TotalAdditionalFee, true), currency(TotalB.TotalAdditionalFee, true),
        {font: {bold: true}}));

    return returnVal;
};

const cardInput = (label, property, value, valueB) => {
    const { Volume: VolumeA, Number: NumberA,
        Percentage: PercentageA, Item: ItemA, Fee: FeeA } = value.ProcessingFees[property];
    const { Volume: VolumeB, Number: NumberB,
        Percentage: PercentageB, Item: ItemB, Fee: FeeB } = valueB.ProcessingFees[property];

    return ([{value: label},
        {value: currency(VolumeA, true)}, {value: `${NumberA}`}, {value: `${PercentageA}`},
        {value: currency(ItemA, true)}, {value: currency(FeeA, true)},
        {value: currency(VolumeB, true)}, {value: `${NumberB}`}, {value: `${PercentageB}`},
        {value: currency(ItemB, true)}, {value: currency(FeeB, true)},
    ]);
};

const TotalFee_AND_ER = (label, firstVal, secondVal) => ([
    {value: label, style: {font:{color: {rgb: "FFFFFF"}, bold: true}, fill: {patternType: "solid", fgColor: {rgb: "538DD5"}}}},
    ...redundantObject({value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "538DD5"}}}}, 4),

    {value: firstVal, style: {font:{color: {rgb: "FFFFFF"}, bold: true}, fill: {patternType: "solid", fgColor: {rgb: "538DD5"}}}},
    ...redundantObject({value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "538DD5"}}}}, 4),

    {value: secondVal, style: {font:{color: {rgb: "FFFFFF"}, bold: true}, fill: {patternType: "solid", fgColor: {rgb: "538DD5"}}}},
]);

const renderSavings = (label, value) => ([
    {value: label, style: {font:{color: {rgb: "FFFFFF"},bold: true}, fill: {patternType: "solid", fgColor: {rgb: "538DD5"}}}},
    {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "538DD5"}}}},
    {value, style: {font:{color: {rgb: "FFFFFF"}, bold: true}, fill: {patternType: "solid", fgColor: {rgb: "538DD5"}}}},
]);

const setValues = (value, valueB) => {
    multiDataSet = [
        {
            columns: [],
            data: [
                [ {value: `${value.businessName}`, style: { font:{color: {rgb: "FFFFFF"}, bold: true},
                    fill: {patternType: "solid", fgColor: {rgb: "538DD5"}}}}, {value: ''} ],
                [ {value: "TOTAL VOLUME"}, {value: currency(value.volume, true)} ],
                [ {value: "TOTAL TRANSACTIONS"}, {value: `${value.transactions}`} ],
                [ {value: "AVG. TICKET"}, {value: currency(value.ticket, true) } ],
                [ {value: "PROVIDER"}, {value: `${value.currentProvider}`} ],
                [ {value: "DATE"}, {value: `${(new Date().getMonth() + 1)+"/"+(new Date().getDate())+
                    "/"+new Date().getFullYear()}`} ]
            ]
        },
        {
            columns: [],
            data: [
                [{value: ""}, {value: ""}, {value: "CURRENT PROVIDER", style: {font: {bold: true}} },
                ...redundantObject({value: ""}, 3),
                ...redundantObject({value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "538DD5"}}}}, 2),
                {value: "OUR QUOTE", style: {font: {bold: true, color: {rgb: "FFFFFF"}}, fill: {patternType: "solid",
                    fgColor: {rgb: "538DD5"}}}},
                ...redundantObject({value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "538DD5"}}}}, 2),
                ],

                [{value: ""}, {value: "VOLUME", style: {font: {bold: true}}}, {value: "#", style: {font: {bold: true}}},
                    {value: "%", style: {font: {bold: true}}}, {value: "ITEM", style: {font: {bold: true}}},
                    {value: "FEE", style: {font: {bold: true}}},
                    {value: "VOLUME", style: {font: {bold: true}}}, {value: "#", style: {font: {bold: true}}},
                    {value: "%", style: {font: {bold: true}}}, {value: "ITEM", style: {font: {bold: true}}},
                    {value: "FEE", style: {font: {bold: true}}}],

                [...Heading1("PROCESSING FEES")],
                cardInput("VISA", "VISA", value, valueB), cardInput("Master Card", "Mastercard", value, valueB),
                cardInput("Discover", "Discover", value, valueB), cardInput("AMEX", "AMEX", value, valueB),
                feeValue("TOTAL", currency(value.Total.TotalProcessingFees, true),
                    currency(valueB.Total.TotalProcessingFees, true), {font: {bold: true}}),

                [], [...Heading1("ASSOCIATION FEES")],
                [{value: "AMEX"},
                    ...redundantObject({value: ""}, 4), {value: currency(value.amexFee, true)},
                    ...redundantObject({value: ""}, 4), {value: currency(valueB.amexFee, true)},
                ],
                feeValue("TOTAL", currency(value.assoFee, true, true), currency(valueB.assoFee, true, true), {font: {bold: true}}),

                [], [...Heading1("OTHER AUTH FEES")],
                feeValue("TOTAL", currency(value.authFee, true, true), currency(valueB.authFee, true, true), {font: {bold: true}}),

                [], [...Heading1("ADDITIONAL FEES")],
                ...additionalFees(value, valueB),

                [], TotalFee_AND_ER("TOTAL FEES", (currency(value.Total.Total_Fee, true) || 0),
                    (currency(valueB.Total.Total_Fee, true) || 0)),

                TotalFee_AND_ER("EFFECTIVE RATE",
                    `${parseFloat(((parseFloat(value.Total.Total_Fee) || 0)/
                        (parseFloat(value.volume) || 0)*100)).toFixed(2)} %`,
                    `${parseFloat(((parseFloat(valueB.Total.Total_Fee) || 0)/
                        (parseFloat(valueB.volume) || 0)*100)).toFixed(2)} %`),

                [], [{value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""},
                    {value: "MONTHLY SAVINGS", style: {font:{color: {rgb: "FFFFFF"}, bold: true}, fill: {patternType: "solid", fgColor: {rgb: "538DD5"}}}},
                    {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "538DD5"}}}},
                    {value: `${currency(value.Total.Total_Fee - valueB.Total.Total_Fee, true)}`,
                        style: {font:{color: {rgb: "FFFFFF"}, bold: true}, fill: {patternType: "solid", fgColor: {rgb: "538DD5"}}}},
                ],

                [{value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""},
                    ...renderSavings("SAVINGS %", `${currency((value.Total.Total_Fee - valueB.Total.Total_Fee)
                    / (value.Total.Total_Fee) * 100, false)}%`)],

                [{value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""},
                    ...renderSavings("1 YEAR SAVINGS", `${currency((value.Total.Total_Fee - valueB.Total.Total_Fee) * 12, true)}`)],

                [{value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""},
                    ...renderSavings("3 YEAR SAVINGS", `${currency((value.Total.Total_Fee - valueB.Total.Total_Fee) * 12 * 3, true)}`)]
            ]
        },
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
    const { VISA: VISAa, Mastercard: MastercardA, Discover: DiscoverA, AMEX: AMEXa  } = partA.ProcessingFees;
    const { VISA: VISAb, Mastercard: MastercardB, Discover: DiscoverB, AMEX: AMEXb  } = partB.ProcessingFees;

    const value = partA;

    setValues(partA, partB);

    const values = [value.Total.Total_Fee, value.Total.TotalAdditionalFee, parseFloat(value.authFee),
        parseFloat(value.assoFee), (VISAa.Fee + MastercardA.Fee + DiscoverA.Fee + AMEXa.Fee),
        value.businessName, value.currentProvider, value.volume, value.ticket,value.transactions ];

    const valuesB = [partB.Total.Total_Fee, partB.Total.TotalAdditionalFee, parseFloat(partB.authFee),
        parseFloat(partB.assoFee), (VISAb.Fee + MastercardB.Fee + DiscoverB.Fee + AMEXb.Fee),
        partB.businessName, partB.currentProvider, partB.volume, partB.ticket, partB.transactions ];

    return (
    <div style={{display: 'inline-block'}}>
        <ExcelFile element={<input type="submit" className="btn btn-primary" value="Submit" />}>
            <ExcelSheet dataSet={multiDataSet} name="Organization"/>
        </ExcelFile>
    </div>);
};

export default Excel;