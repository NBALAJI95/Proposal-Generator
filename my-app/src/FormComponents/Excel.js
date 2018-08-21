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

const setValues = (props) => {
    multiDataSet = [
        {
            columns: [`${props.value.businessName}`, "", "", "", "", ],
            data: [
                [
                    {value: "TOTAL VOLUME"}, {value: currency(props.value.volume)},
                ],
                [
                    {value: "TOTAL TRANSACTIONS"}, {value: `${props.value.transactions}`},
                ],
                [
                    {value: "AVG. TICKET"}, {value: currency(props.value.ticket) },
                ],
                [
                    {value: "PROVIDER"}, {value: `${props.value.currentProvider}`},
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
            data: [
                [{value: "PROCESSING FEES", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                    {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                    {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                    {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                    {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                    {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                ],
            ]
        },
        {
            columns: ["", "VOLUME", "#", "%", "ITEM", "FEE"],
            data: [
                [{value: "Visa"},
                    {value: currency(props.value.VISA.Volume) },
                    {value: `${props.value.VISA.Number}`},
                    {value: `${props.value.VISA.Percentage}`},
                    {value: currency(props.value.VISA.Item) },
                    {value: currency(props.value.VISA.Fee) }],
                [{value: "Master Card"},
                    {value: currency(props.value.Mastercard.Volume) },
                    {value: `${props.value.Mastercard.Number}`},
                    {value: `${props.value.Mastercard.Percentage}`},
                    {value: currency(props.value.Mastercard.Item) },
                    {value: currency(props.value.Mastercard.Fee) }],
                [{value: "DISCOVER"},
                    {value: currency(props.value.Discover.Volume) },
                    {value: `${props.value.Discover.Number}`},
                    {value: `${props.value.Discover.Percentage}`},
                    {value: currency(props.value.Discover.Item)},
                    {value: currency(props.value.Discover.Fee) }],
                [{value: "AMEX"},
                    {value: currency(props.value.AMEX.Volume) },
                    {value: `${props.value.AMEX.Number}`},
                    {value: `${props.value.AMEX.Percentage}`},
                    {value: currency(props.value.AMEX.Item) },
                    {value: currency(props.value.AMEX.Fee) }],
                [{value: "TOTAL"},
                    {value: ""},
                    {value: ""},
                    {value: ""},
                    {value: ""},
                    {value: currency(`${props.value.VISA.Fee + props.value.Mastercard.Fee + props.value.Discover.Fee 
                        + props.value.AMEX.Fee}`) }]
            ]
        },
        {
            columns: [],
            data: [
                [{value: "ASSOCIATION FEES", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                    {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                    {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                    {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                    {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                    {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                ],
            ]
        },
        {
            columns: [],
            data: [
                [{value: "AMEX"},
                    {value: ""},
                    {value: ""},
                    {value: currency(props.value.amexFee) },
                    {value: ""},
                    {value: ""}],
                [{value: "TOTAL"},
                    {value: ""},
                    {value: ""},
                    {value: ""},
                    {value: ""},
                    {value: currency(props.value.assoFee) }]
            ]
        },
        {
            columns: [],
            data: [
                [{value: "OTHER AUTH FEES", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                    {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                    {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                    {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                    {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                    {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                ],
            ]
        },
        {
            columns: [],
            data: [
                [{value: "TOTAL"},
                    {value: ""},
                    {value: ""},
                    {value: ""},
                    {value: ""},
                    {value: currency(props.value.authFee) }]
            ]
        },
        {
            columns: [],
            data: [
                [{value: "ADDITIONAL FEES", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                    {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                    {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                    {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                    {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                    {value: "", style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}},
                ],
            ]
        },
        {
            columns: [],
            data: [
                [{value: "Monthly Fee"},
                    {value: ""},
                    {value: ""},
                    {value: ""},
                    {value: ""},
                    {value: currency(props.value.monthlyFee) }],
                [{value: "Regulatory Fee"},
                    {value: ""},
                    {value: ""},
                    {value: ""},
                    {value: ""},
                    {value: currency(props.value.regulatoryFee) }],
                [{value: "PCI Compliance"},
                    {value: ""},
                    {value: ""},
                    {value: ""},
                    {value: ""},
                    {value: currency(props.value.pciFee) }],
                [{value: "Tech Fee"},
                    {value: ""},
                    {value: ""},
                    {value: ""},
                    {value: ""},
                    {value: currency(props.value.techFee) }],
                [{value: "POS"},
                    {value: ""},
                    {value: ""},
                    {value: ""},
                    {value: ""},
                    {value: currency(props.value.pos) }],
                [{value: "Misc"},
                    {value: ""},
                    {value: ""},
                    {value: ""},
                    {value: ""},
                    {value: currency(props.value.misc) }],
                [{value: "TOTAL"},
                    {value: ""},
                    {value: ""},
                    {value: ""},
                    {value: ""},
                    {value: currency(props.value.Total.TotalAdditionalFee) }],
            ]
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
                    {value: currency(props.value.Total.Total_Fee) || 0, style: {fill: {patternType: "solid", fgColor: {rgb: "0000FF"}}}}],
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
                    {value: `${parseFloat(((parseFloat(props.value.Total.Total_Fee) || 0)/(parseFloat(props.value.volume) || 0)*100)).toFixed(2)} %`
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
    const values = [props.fee, ((parseFloat(props.value.monthlyFee) || 0) + (parseFloat(props.value.regulatoryFee) || 0)
    + (parseFloat(props.value.pciFee) || 0) + (parseFloat(props.value.techFee) || 0) + (parseFloat(props.value.pos) || 0)
    + (parseFloat(props.value.misc) || 0)), parseFloat(props.value.authFee), parseFloat(props.value.assoFee),
    (props.value.VISA.Fee + props.value.Mastercard.Fee + props.value.Discover.Fee + props.value.AMEX.Fee),
    props.value.businessName, props.value.currentProvider, props.value.volume, props.value.ticket,
    props.value.transactions ];

    return (
    <div style={{display: 'inline-block'}}>
        <ExcelFile element={<input type="submit" className="btn btn-primary" disabled={enableCondition(values)} value="Submit" />}>
            <ExcelSheet dataSet={multiDataSet} name="Organization"/>
        </ExcelFile>
    </div>);
};

export default Excel;

