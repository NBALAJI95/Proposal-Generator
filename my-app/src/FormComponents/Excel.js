import React from 'react';
import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
let multiDataSet=[];

const fill = {patternType: "solid", fgColor: {rgb: "538DD5"}};

const setBorder = (directions) => {
    let object = {};
    for(let i = 0; i < directions.length; i++) {
        object[directions[i]] = {style: "medium", color: {rgb: "000000"}};
    }
    return object;
};

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

const Heading = (headingValue) => {
    return ([{value: headingValue, style: {font:{color: {rgb: "FFFFFF"}, bold: true}, fill: {patternType: "solid",
                fgColor: {rgb: "538DD5"}}}},
        ...redundantObject({value: "", style: {border: setBorder(["left"]), fill}}, 1),
        ...redundantObject({value: "", style: {fill}}, 3),
        ...redundantObject({value: "", style: {border: setBorder(["right"]), fill}}, 1),
        ...redundantObject({value: "", style: {border: setBorder(["left"]), fill}}, 1),
        ...redundantObject({value: "", style: {fill}}, 3),
        ...redundantObject({value: "", style: {border: setBorder(["right"]), fill}}, 1)
    ]);
};

const emptyLine = [{value: ""}, {value: "", style: {border: setBorder(["left"])}}, ...redundantObject({value: ""}, 3),
    {value: "", style: {border: setBorder(["right"])}}, {value: "", style: {border: setBorder(["left"])}},
    ...redundantObject({value: ""}, 3), {value: "", style: {border: setBorder(["right"])}}];

const feeValue = (label1, value1, value2, style={}) => {
    style['border'] = setBorder(["right"]);
    return ([{value: label1, style},
        ...redundantObject({value: "", style: {border: setBorder(["left"])}}, 1), ...redundantObject({value: ""}, 3),
            {value: value1, style}, ...redundantObject({value: "", style: {border: setBorder(["left"])}}, 1),
        ...redundantObject({value: ""}, 3), {value: value2, style}
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
        {value: currency(VolumeA, true), style: {border: setBorder(["left"])}}, {value: `${NumberA}`},
            {value: `${PercentageA}`},
        {value: currency(ItemA, true)}, {value: currency(FeeA, true), style: {border: setBorder(["right"])}},
        {value: currency(VolumeB, true), style: {border: setBorder(["left"])}}, {value: `${NumberB}`},
            {value: `${PercentageB}`},
        {value: currency(ItemB, true)}, {value: currency(FeeB, true), style: {border: setBorder(["right"])}},
    ]);
};

const TotalFee_AND_ER = (label, firstVal, secondVal, lastC = false) => {
    if(lastC) {
        const border = setBorder(["bottom"]);
        return ([
            {value: label, style: { font:{color: {rgb: "FFFFFF"}, bold: true}, fill}},
            ...redundantObject({value: "", style: {border: setBorder(["left", "bottom"]), fill}}, 1),
            ...redundantObject({value: "", style: {border, fill}}, 3),

            {value: firstVal, style: {border: setBorder(["right", "bottom"]), font:{color: {rgb: "FFFFFF"}, bold: true}, fill}},
            ...redundantObject({value: "", style: {border: setBorder(["left", "bottom"]), fill}}, 1),
            ...redundantObject({value: "", style: {border, fill}}, 3),

            {value: secondVal, style: {border: setBorder(["right", "bottom"]), font:{color: {rgb: "FFFFFF"}, bold: true}, fill}},
        ]);
    }
    else {
    return ([
        {value: label, style: {font:{color: {rgb: "FFFFFF"}, bold: true}, fill}},
        ...redundantObject({value: "", style: {border: setBorder(["left"]), fill}}, 1),
        ...redundantObject({value: "", style: {fill}}, 3),

        {value: firstVal, style: {border: setBorder(["right"]), font:{color: {rgb: "FFFFFF"}, bold: true}, fill}},
        ...redundantObject({value: "", style: {border: setBorder(["left"]), fill}}, 1),
        ...redundantObject({value: "", style: {fill}}, 3),

        {value: secondVal, style: {border: setBorder(["right"]), font:{color: {rgb: "FFFFFF"}, bold: true}, fill}},
    ]);
    }
};
// , style: {}
const renderSavings = (label, value, lastCond=false) => {
    let border = [];
    if(lastCond)
        border = [setBorder(["left", "bottom"]), setBorder(["bottom"]), setBorder(["right", "bottom"])];
    else
        border = [setBorder(["left"]), {}, setBorder(["right"])];
    return ([
    {value: label, style: {border: border[0], font:{color: {rgb: "FFFFFF"},bold: true}, fill: {patternType: "solid", fgColor: {rgb: "538DD5"}}}},
    {value: "", style: {border: border[1],fill: {patternType: "solid", fgColor: {rgb: "538DD5"}}}},
    {value, style: {border: border[2], font:{color: {rgb: "FFFFFF"}, bold: true}, fill: {patternType: "solid", fgColor: {rgb: "538DD5"}}}},
    ]);
};

const setValues = (value, valueB) => {
    multiDataSet = [
        {
            columns: [],
            data: [
                [ {value: `${value.businessName}`, style: { font:{color: {rgb: "FFFFFF"}, bold: true},
                    fill, fgColor: {rgb: "538DD5"}}}, {value: ''} ],
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
                [{value: ""}, {value: "", style: {border: setBorder(["top", "left", "bottom"])}},
                {value: "CURRENT PROVIDER", style: {border: setBorder(["top", "bottom"]), font: {bold: true}}},
                ...redundantObject({value: "", style: {border: setBorder(["top", "bottom"])}}, 2),
                ...redundantObject({value: "", style: {border: setBorder(["top", "bottom", "right"])}}, 1),

                ...redundantObject({value: "", style: {border: setBorder(["top", "left", "bottom"]),
                    fill}}, 1),
                ...redundantObject({value: "", style: {border: setBorder(["top", "bottom"]),
                    fill}}, 1),
                {value: "OUR QUOTE", style: {border: setBorder(["top", "bottom"]),
                    font: {bold: true, color: {rgb: "FFFFFF"}}, fill}},
                ...redundantObject({value: "", style: {border: setBorder(["top", "bottom"]),
                    fill}}, 1),
                ...redundantObject({value: "", style: {border: setBorder(["top", "bottom", "right"]),
                        fill}}, 1),
                ],

                [{value: ""}, {value: "VOLUME", style: {border: setBorder(["left"]), font: {sz: "11", bold: true}}},
                    {value: "#", style: {font: {sz: "11", bold: true}}},
                    {value: "%", style: {font: {sz: "11", bold: true}}}, {value: "ITEM", style: {font: {sz: "11", bold: true}}},
                    {value: "FEE", style: {border: setBorder(["right"]), font: {sz: "11", bold: true}}},
                    {value: "VOLUME", style: {border: setBorder(["left"]), font: {sz: "11", bold: true}}},
                    {value: "#", style: {font: {sz: "11", bold: true}}},
                    {value: "%", style: {font: {sz: "11", bold: true}}}, {value: "ITEM", style: {font: {sz: "11", bold: true}}},
                    {value: "FEE", style: {border: setBorder(["right"]), font: {sz: "11", bold: true}}}],

                [...Heading("PROCESSING FEES")],
                cardInput("VISA", "VISA", value, valueB), cardInput("Master Card", "Mastercard", value, valueB),
                cardInput("Discover", "Discover", value, valueB), cardInput("AMEX", "AMEX", value, valueB),
                feeValue("TOTAL", currency(value.Total.TotalProcessingFees, true),
                    currency(valueB.Total.TotalProcessingFees, true), {font: {bold: true}}),

                emptyLine, [...Heading("ASSOCIATION FEES")],
                [{value: "AMEX"},
                    {value: "", style: {border: setBorder(["left"])}}, ...redundantObject({value: ""}, 3),
                    {value: currency(value.amexFee, true), style: {border: setBorder(["right"])}},
                    {value: "", style: {border: setBorder(["left"])}},
                    ...redundantObject({value: ""}, 3), {value: currency(valueB.amexFee, true), style: {border: setBorder(["right"])}},
                ],
                feeValue("TOTAL", currency(value.assoFee, true, true), currency(valueB.assoFee, true, true), {font: {bold: true}}),

                emptyLine, [...Heading("OTHER AUTH FEES")],
                feeValue("TOTAL", currency(value.authFee, true, true), currency(valueB.authFee, true, true), {font: {bold: true}}),

                emptyLine, [...Heading("ADDITIONAL FEES")],
                ...additionalFees(value, valueB),

                emptyLine, TotalFee_AND_ER("TOTAL FEES", (currency(value.Total.Total_Fee, true) || 0),
                    (currency(valueB.Total.Total_Fee, true) || 0)),

                TotalFee_AND_ER("EFFECTIVE RATE",
                    `${parseFloat(((parseFloat(value.Total.Total_Fee) || 0)/
                        (parseFloat(value.volume) || 0)*100)).toFixed(2)} %`,
                    `${parseFloat(((parseFloat(valueB.Total.Total_Fee) || 0)/
                        (parseFloat(valueB.volume) || 0)*100)).toFixed(2)} %`, true),

                [], [{value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""},
                    {value: "MONTHLY SAVINGS", style: {border: setBorder(["left", "top"]), font:{color: {rgb: "FFFFFF"}, bold: true},
                        fill: {patternType: "solid", fgColor: {rgb: "538DD5"}}}},
                    {value: "", style: {border: setBorder(["top"]), fill: {patternType: "solid", fgColor: {rgb: "538DD5"}}}},
                    {value: `${currency(value.Total.Total_Fee - valueB.Total.Total_Fee, true)}`,
                        style: {border: setBorder(["right", "top"]), font:{color: {rgb: "FFFFFF"}, bold: true}, fill: {patternType: "solid", fgColor: {rgb: "538DD5"}}}},
                ],

                [{value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""},
                    ...renderSavings("SAVINGS %", `${currency((value.Total.Total_Fee - valueB.Total.Total_Fee)
                    / (value.Total.Total_Fee) * 100, false)}%`)],

                [{value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""},
                    ...renderSavings("1 YEAR SAVINGS", `${currency((value.Total.Total_Fee - valueB.Total.Total_Fee) * 12, true)}`)],

                [{value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""},
                    ...renderSavings("3 YEAR SAVINGS", `${currency((value.Total.Total_Fee - valueB.Total.Total_Fee) * 12 * 3, true)}`, true)]
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
        <ExcelFile element={<input type="submit" disabled={enableCondition(values) && enableCondition(valuesB)}
            className="btn btn-primary" value="Submit" />}>
            <ExcelSheet dataSet={multiDataSet} name="Organization"/>
        </ExcelFile>
    </div>);
};

export default Excel;
