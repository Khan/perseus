import{j as a}from"./jsx-runtime-63Ea5SlK.js";import{I as c}from"./article-renderer-mU-6RWLp.js";import"./jquery-yG1GhClm.js";import"./util-AYeX86gl.js";import"./phet-simulation-_7qOO4_B.js";import"./version-akiLXZts.js";import"./dependencies-CP7Uh8Kq.js";import"./perseus-api-1-ethIrW.js";import"./perseus-item-CWRjfKXr.js";import"./hints-renderer-alc4yvsU.js";import"./renderer-1DxKQj1_.js";import"./base-radio-9_hKye4B.js";import{c as h}from"./components-ODdjt0Ld.js";import"./index-k-0mNqHS.js";import"./i18n-context-fsWEgybQ.js";import"./svg-image-7aOK05RI.js";import"./index-smZ6iCr_.js";import{V as s}from"./index-0DbkllkJ.js";import{C as u}from"./index-V5gl6frG.js";import{s as p}from"./index-deFLJwr4.js";import{l as f}from"./index-awljIyHI.js";import{r as d}from"./index-6oxdNXpR.js";const{InfoTip:m}=h,o=class o extends d.Component{constructor(){super(...arguments),this.serialize=()=>{const e={...o.defaultProps};for(const n of c)e[n]=!!this.props[n];return e}}shouldShowFinancialCalculatorOptions(){return this.props.financialCalculatorMonthlyPayment||this.props.financialCalculatorTotalAmount||this.props.financialCalculatorTimeToPayOff}render(){return a.jsx("div",{className:"perseus-answer-editor",children:a.jsxs("div",{className:"perseus-answer-options",children:[a.jsx(t,{label:"Show calculator",infoTip:"Use the calculator when completing difficult calculations is NOT the intent of the question. DON’T use the calculator when testing the student’s ability to complete different types of computations.",checked:this.props.calculator,onChange:e=>{this.props.onChange({calculator:e})}}),a.jsx(t,{label:"Show financial calculator",infoTip:"This provides the student with the ability to view a financial calculator, e.g., for answering financial questions. Once checked, requires at least one of the three options below to be checked.",checked:this.shouldShowFinancialCalculatorOptions(),onChange:e=>{this.props.onChange({financialCalculatorMonthlyPayment:e,financialCalculatorTotalAmount:e,financialCalculatorTimeToPayOff:e})}}),this.shouldShowFinancialCalculatorOptions()&&a.jsxs(a.Fragment,{children:[a.jsx(t,{label:"Include monthly payment",infoTip:"This provides the student with the ability to view a monthly payment calculator; e.g., given a loan amount, interest rate, and term, what is the monthly payment?",checked:this.props.financialCalculatorMonthlyPayment,onChange:e=>{this.props.onChange({financialCalculatorMonthlyPayment:e})},indent:!0}),a.jsx(t,{label:"Include total amount",infoTip:"This provides the student with the ability to view a total amount calculator; e.g., given a monthly payment, interest rate, and term, what is the total amount to be paid?",checked:this.props.financialCalculatorTotalAmount,onChange:e=>{this.props.onChange({financialCalculatorTotalAmount:e})},indent:!0}),a.jsx(t,{label:"Include time-to-pay-off",infoTip:"This provides the student with the ability to view a time to pay off calculator; e.g., given a loan amount, interest rate, and monthly payment, how long will it take to pay off the loan?",checked:this.props.financialCalculatorTimeToPayOff,onChange:e=>{this.props.onChange({financialCalculatorTimeToPayOff:e})},indent:!0})]}),a.jsx(t,{label:"Show periodic table",infoTip:"This provides the student with the ability to view a periodic table of the elements, e.g., for answering chemistry questions.",checked:this.props.periodicTable,onChange:e=>{this.props.onChange({periodicTable:e,periodicTableWithKey:!1})}}),this.props.periodicTable&&a.jsx(t,{label:"Include key/legend with periodic table",infoTip:"Include a key for HS courses; omit for AP chemistry.",checked:this.props.periodicTableWithKey,onChange:e=>{this.props.onChange({periodicTableWithKey:e})},indent:!0}),a.jsx(t,{label:"Show z table (statistics)",infoTip:"This provides the student with the ability to view a table of critical values for the z distribution, e.g. for answering statistics questions.",checked:this.props.zTable,onChange:e=>{this.props.onChange({zTable:e})}}),a.jsx(t,{label:"Show t table (statistics)",infoTip:"This provides the student with the ability to view a table of critical values for the Student's t distribution, e.g. for answering statistics questions.",checked:this.props.tTable,onChange:e=>{this.props.onChange({tTable:e})}}),a.jsx(t,{label:"Show chi-squared table (statistics)",infoTip:"This provides the student with the ability to view a table of critical values for the chi-squared distribution, e.g. for answering statistics questions.",checked:this.props.chi2Table,onChange:e=>{this.props.onChange({chi2Table:e})}})]})})}};o.defaultProps={calculator:!1,chi2Table:!1,financialCalculatorMonthlyPayment:!1,financialCalculatorTotalAmount:!1,financialCalculatorTimeToPayOff:!1,periodicTable:!1,periodicTableWithKey:!1,tTable:!1,zTable:!1};let l=o;const t=i=>a.jsx(s,{style:[r.checkbox,i.indent?r.indented:void 0],children:a.jsx(u,{label:a.jsxs(s,{style:{flexDirection:"row"},children:[i.label," ",a.jsx(m,{children:i.infoTip})]}),checked:i.checked,onChange:e=>i.onChange(e)})}),r=f.StyleSheet.create({indented:{marginInlineStart:p.large_24}});l.__docgenInfo={description:"",methods:[{name:"shouldShowFinancialCalculatorOptions",docblock:null,modifiers:[],params:[],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"ItemExtrasEditor",props:{onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(props: Partial<PerseusAnswerArea>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"Record",elements:[{name:"unknown[number]",raw:"(typeof ItemExtras)[number]"},{name:"boolean"}],raw:"Record<(typeof ItemExtras)[number], boolean>"}],raw:"Partial<PerseusAnswerArea>"},name:"props"}],return:{name:"void"}}},description:""},calculator:{defaultValue:{value:"false",computed:!1},required:!1},chi2Table:{defaultValue:{value:"false",computed:!1},required:!1},financialCalculatorMonthlyPayment:{defaultValue:{value:"false",computed:!1},required:!1},financialCalculatorTotalAmount:{defaultValue:{value:"false",computed:!1},required:!1},financialCalculatorTimeToPayOff:{defaultValue:{value:"false",computed:!1},required:!1},periodicTable:{defaultValue:{value:"false",computed:!1},required:!1},periodicTableWithKey:{defaultValue:{value:"false",computed:!1},required:!1},tTable:{defaultValue:{value:"false",computed:!1},required:!1},zTable:{defaultValue:{value:"false",computed:!1},required:!1}}};export{l as I};