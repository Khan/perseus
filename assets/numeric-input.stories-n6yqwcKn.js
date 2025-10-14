import{bp as Y,j as n,aJ as t}from"./iframe-B6KTqCWL.js";import{S as a}from"./server-item-renderer-with-debug-ui-By5PO8Vj.js";import"./server-item-renderer-DcApu9WE.js";import"./hints-renderer-qnXvFzv1.js";import"./main-DWtxW3EU.js";import"./test-keypad-context-wrapper-WD9S3CYI.js";import"./Popper-DpFWtsF0.js";const f={content:"$5008 \\div 4 =$ [[☃ numeric-input 1]] ",images:{},widgets:{"numeric-input 1":{graded:!0,static:!1,type:"numeric-input",options:{coefficient:!1,static:!1,answers:[{status:"correct",maxError:null,strict:!0,value:1252,simplify:"required",message:"",answerForms:["integer","mixed","improper","proper","decimal","pi"]}],labelText:"",size:"normal"}}}},Q={content:`$12 + 0.52 =$ [[☃ numeric-input 1]] 

‎`,images:{},widgets:{"numeric-input 1":{graded:!0,static:!1,type:"numeric-input",options:{coefficient:!1,static:!1,answers:[{status:"correct",maxError:null,strict:!0,value:12.52,simplify:"required",message:"",answerForms:["decimal"]}],labelText:"",size:"normal"}}}},H={content:`$5/5 + 10/10 =$ [[☃ numeric-input 1]] 

‎`,images:{},widgets:{"numeric-input 1":{graded:!0,static:!1,type:"numeric-input",options:{coefficient:!1,static:!1,answers:[{status:"correct",maxError:null,strict:!0,value:15,simplify:"required",message:"",answerForms:["integer"]}],labelText:"",size:"normal"}}}},J={content:`$2/2 + 5/2 =$ [[☃ numeric-input 1]] 

‎

‎`,images:{},widgets:{"numeric-input 1":{graded:!0,static:!1,type:"numeric-input",options:{coefficient:!1,static:!1,answers:[{status:"correct",maxError:null,strict:!0,value:3.5,simplify:"optional",message:"",answerForms:["improper"]}],labelText:"",size:"normal"}}}},B={content:`$pi * 32 =$ [[☃ numeric-input 1]] 

‎

 Hint: Enter 100.53 to get an approx of pi error.`,images:{},widgets:{"numeric-input 1":{graded:!0,static:!1,type:"numeric-input",options:{coefficient:!1,static:!1,answers:[{status:"correct",maxError:null,strict:!1,value:100.53096491487338,simplify:"required",message:"",answerForms:["pi"]}],labelText:"",size:"normal"}}}},G={content:`$2 + 2/10 =$ [[☃ numeric-input 1]] 

‎`,images:{},widgets:{"numeric-input 1":{graded:!0,version:{major:0,minor:0},static:!1,type:"numeric-input",options:{coefficient:!1,static:!1,answers:[{status:"correct",maxError:null,strict:!0,value:2.2,simplify:"optional",message:"",answerForms:["mixed"]}],labelText:"",size:"normal"}}}},K={content:`$3/10 + 2/10 =$ [[☃ numeric-input 1]] 

‎

‎`,images:{},widgets:{"numeric-input 1":{graded:!0,static:!1,type:"numeric-input",options:{coefficient:!1,static:!1,answers:[{status:"correct",maxError:null,strict:!0,value:.5,simplify:"optional",message:"",answerForms:["proper"]}],labelText:"",size:"normal"}}}},L={content:"$1 =$ [[☃ numeric-input 1]] ",images:{},widgets:{"numeric-input 1":{graded:!0,static:!1,type:"numeric-input",options:{coefficient:!0,static:!1,answers:[{status:"correct",maxError:null,strict:!1,value:1,simplify:"required",message:""}],labelText:"What's the answer?",size:"normal"}}}},Z=`[
    {
        simplify: string;
        name: string;
    }
]`,ee=`[
    {
        message: string;
        value: number;
        status: string;
        answerForms: array<string>;
        strict: boolean;
        maxError: number;
        simplify: string;
    }
]`,oe={component:Y,title:"Widgets/Numeric Input",tags:["!dev"],parameters:{docs:{description:{component:"A widget that allows users to input numeric answers with specific validation criteria,                    supporting various formats including fractions, decimals, and mathematical expressions."}}},args:{coefficient:!1,userInput:{currentValue:""},rightAlign:!1,size:"normal",answers:[{status:"correct",maxError:null,strict:!1,value:1252,simplify:"required",message:"",answerForms:["decimal","integer","mixed","pi","proper","improper"]}]},argTypes:{answers:{control:{type:"object"},description:"A list of all the possible correct and incorrect answers",table:{type:{summary:"array",detail:ee}}},answerForms:{control:{type:"object"},description:"Used by examples, maybe not used and should be removed in the future",table:{type:{summary:"array",detail:Z}}},userInput:{currentValue:{control:{type:"text"},description:"The current value of the input field",table:{type:{summary:"string"}}}},coefficient:{control:{type:"boolean"},description:"A coefficient style number allows the student to use - for -1 and an empty string to mean 1.",table:{type:{summary:"boolean"}}},labelText:{control:{type:"text"},description:" Translatable Text; Text to describe this input. This will be shown to users using screenreaders.",value:"What's the answer?",table:{type:{summary:"string"}}},rightAlign:{control:{type:"boolean"},description:"Whether to right-align the text or not",table:{type:{summary:"boolean"}}},size:{options:["normal","small"],control:{type:"radio"},defaultValue:"normal",description:"Use size 'Normal' for all text boxes, unless there are multiple text boxes in one line and the answer area is too narrow to fit them.",table:{type:{summary:"string"},defaultValue:{summary:"normal"}}},static:{control:{type:"boolean"},description:"Always false.  Not used for this widget",table:{type:{summary:"boolean"}}},apiOptions:{table:{disable:!0}},linterContext:{table:{disable:!0}}}},i=(e,r,X)=>{const w=e.widgets[r];return{...e,widgets:{[r]:{...w,options:{...w.options,...X}}}}},s=e=>{const r=i(f,"numeric-input 1",e);return n.jsx(a,{item:t({question:r})})};s.args=f.widgets["numeric-input 1"].options;s.parameters={docs:{description:{story:"The default Numeric Input widget."}}};const l=e=>{const r=i(H,"numeric-input 1",e);return n.jsx(a,{item:t({question:r})})};l.args=H.widgets["numeric-input 1"].options;l.parameters={docs:{description:{story:"Numeric Input set to strictly integer mode will only accept integer answers."}}};const o=e=>{const r=i(Q,"numeric-input 1",e);return n.jsx(a,{item:t({question:r})})};o.args=Q.widgets["numeric-input 1"].options;o.parameters={docs:{description:{story:"Numeric Inputs set to strictly decimal mode will only accept decimal answers."}}};const u=e=>{const r=i(J,"numeric-input 1",e);return n.jsx(a,{item:t({question:r})})};u.args=J.widgets["numeric-input 1"].options;u.parameters={docs:{description:{story:"Numeric Inputs set to strictly improper mode will only accept improper fractions."}}};const m=e=>{const r=i(K,"numeric-input 1",e);return n.jsx(a,{item:t({question:r})})};m.args=K.widgets["numeric-input 1"].options;m.parameters={docs:{description:{story:"Numeric Inputs set to strictly proper mode will only accept proper fractions. This example does not require simplifying."}}};const p=e=>{const r=i(G,"numeric-input 1",e);return n.jsx(a,{item:t({question:r})})};p.args=G.widgets["numeric-input 1"].options;p.parameters={docs:{description:{story:"Numeric Inputs set to strictly mixed mode will only accept mixed fractions."}}};const c=e=>{const r=i(B,"numeric-input 1",e);return n.jsx(a,{item:t({question:r})})};c.args=B.widgets["numeric-input 1"].options;c.parameters={docs:{description:{story:"Numeric Inputs set to strictly pi mode will only accept answers in terms of π. Approximating pi will result in an incorrect answer and a hint."}}};const d=e=>{const r=i(L,"numeric-input 1",e);return n.jsx(a,{item:t({question:r})})};d.args=L.widgets["numeric-input 1"].options;d.parameters={docs:{description:{story:"When Numeric Input is set to coefficient mode, it allows the student to use - for -1 and an empty string to mean 1."}}};const g=e=>{const r=i(f,"numeric-input 1",e);return n.jsx(a,{item:t({question:r}),startAnswerless:!0})};g.args=f.widgets["numeric-input 1"].options;g.parameters={docs:{description:{story:"The answerless Numeric Input widget."}}};s.__docgenInfo={description:"",methods:[],displayName:"Default",props:{answers:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    // Translatable Display; A description for why this answer is correct, wrong, or ungraded
    message: string;
    // The expected answer
    value?: number | null;
    // Whether this answer is "correct", "wrong", or "ungraded"
    status: string;
    // The forms available for this answer.  Options: "integer, ""decimal", "proper", "improper", "mixed", or "pi"
    answerForms?: MathFormat[];
    // Whether we should check the answer strictly against the the configured answerForms (strict = true)
    // or include the set of default answerForms (strict = false).
    strict: boolean;
    // A range of error +/- the value
    maxError?: number | null;
    // Unsimplified answers are Ungraded, Accepted, or Wrong.
    simplify: PerseusNumericInputSimplify;
}`,signature:{properties:[{key:"message",value:{name:"string",required:!0}},{key:"value",value:{name:"union",raw:"number | null",elements:[{name:"number"},{name:"null"}],required:!1}},{key:"status",value:{name:"string",required:!0}},{key:"answerForms",value:{name:"Array",elements:[{name:"union",raw:`| "integer"
| "mixed"
| "improper"
| "proper"
| "decimal"
| "percent"
| "pi"`,elements:[{name:"literal",value:'"integer"'},{name:"literal",value:'"mixed"'},{name:"literal",value:'"improper"'},{name:"literal",value:'"proper"'},{name:"literal",value:'"decimal"'},{name:"literal",value:'"percent"'},{name:"literal",value:'"pi"'}]}],raw:"MathFormat[]",required:!1}},{key:"strict",value:{name:"boolean",required:!0}},{key:"maxError",value:{name:"union",raw:"number | null",elements:[{name:"number"},{name:"null"}],required:!1}},{key:"simplify",value:{name:"union",raw:'"required" | "enforced" | "optional"',elements:[{name:"literal",value:'"required"'},{name:"literal",value:'"enforced"'},{name:"literal",value:'"optional"'}],required:!0}}]}}],raw:"PerseusNumericInputAnswer[]"},description:""},labelText:{required:!1,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},size:{required:!0,tsType:{name:"string"},description:""},coefficient:{required:!0,tsType:{name:"boolean"},description:""},rightAlign:{required:!1,tsType:{name:"boolean"},description:""},static:{required:!0,tsType:{name:"boolean"},description:""}}};l.__docgenInfo={description:"",methods:[],displayName:"IntegerExample",props:{answers:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    // Translatable Display; A description for why this answer is correct, wrong, or ungraded
    message: string;
    // The expected answer
    value?: number | null;
    // Whether this answer is "correct", "wrong", or "ungraded"
    status: string;
    // The forms available for this answer.  Options: "integer, ""decimal", "proper", "improper", "mixed", or "pi"
    answerForms?: MathFormat[];
    // Whether we should check the answer strictly against the the configured answerForms (strict = true)
    // or include the set of default answerForms (strict = false).
    strict: boolean;
    // A range of error +/- the value
    maxError?: number | null;
    // Unsimplified answers are Ungraded, Accepted, or Wrong.
    simplify: PerseusNumericInputSimplify;
}`,signature:{properties:[{key:"message",value:{name:"string",required:!0}},{key:"value",value:{name:"union",raw:"number | null",elements:[{name:"number"},{name:"null"}],required:!1}},{key:"status",value:{name:"string",required:!0}},{key:"answerForms",value:{name:"Array",elements:[{name:"union",raw:`| "integer"
| "mixed"
| "improper"
| "proper"
| "decimal"
| "percent"
| "pi"`,elements:[{name:"literal",value:'"integer"'},{name:"literal",value:'"mixed"'},{name:"literal",value:'"improper"'},{name:"literal",value:'"proper"'},{name:"literal",value:'"decimal"'},{name:"literal",value:'"percent"'},{name:"literal",value:'"pi"'}]}],raw:"MathFormat[]",required:!1}},{key:"strict",value:{name:"boolean",required:!0}},{key:"maxError",value:{name:"union",raw:"number | null",elements:[{name:"number"},{name:"null"}],required:!1}},{key:"simplify",value:{name:"union",raw:'"required" | "enforced" | "optional"',elements:[{name:"literal",value:'"required"'},{name:"literal",value:'"enforced"'},{name:"literal",value:'"optional"'}],required:!0}}]}}],raw:"PerseusNumericInputAnswer[]"},description:""},labelText:{required:!1,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},size:{required:!0,tsType:{name:"string"},description:""},coefficient:{required:!0,tsType:{name:"boolean"},description:""},rightAlign:{required:!1,tsType:{name:"boolean"},description:""},static:{required:!0,tsType:{name:"boolean"},description:""}}};o.__docgenInfo={description:"",methods:[],displayName:"DecimalExample",props:{answers:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    // Translatable Display; A description for why this answer is correct, wrong, or ungraded
    message: string;
    // The expected answer
    value?: number | null;
    // Whether this answer is "correct", "wrong", or "ungraded"
    status: string;
    // The forms available for this answer.  Options: "integer, ""decimal", "proper", "improper", "mixed", or "pi"
    answerForms?: MathFormat[];
    // Whether we should check the answer strictly against the the configured answerForms (strict = true)
    // or include the set of default answerForms (strict = false).
    strict: boolean;
    // A range of error +/- the value
    maxError?: number | null;
    // Unsimplified answers are Ungraded, Accepted, or Wrong.
    simplify: PerseusNumericInputSimplify;
}`,signature:{properties:[{key:"message",value:{name:"string",required:!0}},{key:"value",value:{name:"union",raw:"number | null",elements:[{name:"number"},{name:"null"}],required:!1}},{key:"status",value:{name:"string",required:!0}},{key:"answerForms",value:{name:"Array",elements:[{name:"union",raw:`| "integer"
| "mixed"
| "improper"
| "proper"
| "decimal"
| "percent"
| "pi"`,elements:[{name:"literal",value:'"integer"'},{name:"literal",value:'"mixed"'},{name:"literal",value:'"improper"'},{name:"literal",value:'"proper"'},{name:"literal",value:'"decimal"'},{name:"literal",value:'"percent"'},{name:"literal",value:'"pi"'}]}],raw:"MathFormat[]",required:!1}},{key:"strict",value:{name:"boolean",required:!0}},{key:"maxError",value:{name:"union",raw:"number | null",elements:[{name:"number"},{name:"null"}],required:!1}},{key:"simplify",value:{name:"union",raw:'"required" | "enforced" | "optional"',elements:[{name:"literal",value:'"required"'},{name:"literal",value:'"enforced"'},{name:"literal",value:'"optional"'}],required:!0}}]}}],raw:"PerseusNumericInputAnswer[]"},description:""},labelText:{required:!1,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},size:{required:!0,tsType:{name:"string"},description:""},coefficient:{required:!0,tsType:{name:"boolean"},description:""},rightAlign:{required:!1,tsType:{name:"boolean"},description:""},static:{required:!0,tsType:{name:"boolean"},description:""}}};u.__docgenInfo={description:"",methods:[],displayName:"ImproperExample",props:{answers:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    // Translatable Display; A description for why this answer is correct, wrong, or ungraded
    message: string;
    // The expected answer
    value?: number | null;
    // Whether this answer is "correct", "wrong", or "ungraded"
    status: string;
    // The forms available for this answer.  Options: "integer, ""decimal", "proper", "improper", "mixed", or "pi"
    answerForms?: MathFormat[];
    // Whether we should check the answer strictly against the the configured answerForms (strict = true)
    // or include the set of default answerForms (strict = false).
    strict: boolean;
    // A range of error +/- the value
    maxError?: number | null;
    // Unsimplified answers are Ungraded, Accepted, or Wrong.
    simplify: PerseusNumericInputSimplify;
}`,signature:{properties:[{key:"message",value:{name:"string",required:!0}},{key:"value",value:{name:"union",raw:"number | null",elements:[{name:"number"},{name:"null"}],required:!1}},{key:"status",value:{name:"string",required:!0}},{key:"answerForms",value:{name:"Array",elements:[{name:"union",raw:`| "integer"
| "mixed"
| "improper"
| "proper"
| "decimal"
| "percent"
| "pi"`,elements:[{name:"literal",value:'"integer"'},{name:"literal",value:'"mixed"'},{name:"literal",value:'"improper"'},{name:"literal",value:'"proper"'},{name:"literal",value:'"decimal"'},{name:"literal",value:'"percent"'},{name:"literal",value:'"pi"'}]}],raw:"MathFormat[]",required:!1}},{key:"strict",value:{name:"boolean",required:!0}},{key:"maxError",value:{name:"union",raw:"number | null",elements:[{name:"number"},{name:"null"}],required:!1}},{key:"simplify",value:{name:"union",raw:'"required" | "enforced" | "optional"',elements:[{name:"literal",value:'"required"'},{name:"literal",value:'"enforced"'},{name:"literal",value:'"optional"'}],required:!0}}]}}],raw:"PerseusNumericInputAnswer[]"},description:""},labelText:{required:!1,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},size:{required:!0,tsType:{name:"string"},description:""},coefficient:{required:!0,tsType:{name:"boolean"},description:""},rightAlign:{required:!1,tsType:{name:"boolean"},description:""},static:{required:!0,tsType:{name:"boolean"},description:""}}};m.__docgenInfo={description:"",methods:[],displayName:"ProperExample",props:{answers:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    // Translatable Display; A description for why this answer is correct, wrong, or ungraded
    message: string;
    // The expected answer
    value?: number | null;
    // Whether this answer is "correct", "wrong", or "ungraded"
    status: string;
    // The forms available for this answer.  Options: "integer, ""decimal", "proper", "improper", "mixed", or "pi"
    answerForms?: MathFormat[];
    // Whether we should check the answer strictly against the the configured answerForms (strict = true)
    // or include the set of default answerForms (strict = false).
    strict: boolean;
    // A range of error +/- the value
    maxError?: number | null;
    // Unsimplified answers are Ungraded, Accepted, or Wrong.
    simplify: PerseusNumericInputSimplify;
}`,signature:{properties:[{key:"message",value:{name:"string",required:!0}},{key:"value",value:{name:"union",raw:"number | null",elements:[{name:"number"},{name:"null"}],required:!1}},{key:"status",value:{name:"string",required:!0}},{key:"answerForms",value:{name:"Array",elements:[{name:"union",raw:`| "integer"
| "mixed"
| "improper"
| "proper"
| "decimal"
| "percent"
| "pi"`,elements:[{name:"literal",value:'"integer"'},{name:"literal",value:'"mixed"'},{name:"literal",value:'"improper"'},{name:"literal",value:'"proper"'},{name:"literal",value:'"decimal"'},{name:"literal",value:'"percent"'},{name:"literal",value:'"pi"'}]}],raw:"MathFormat[]",required:!1}},{key:"strict",value:{name:"boolean",required:!0}},{key:"maxError",value:{name:"union",raw:"number | null",elements:[{name:"number"},{name:"null"}],required:!1}},{key:"simplify",value:{name:"union",raw:'"required" | "enforced" | "optional"',elements:[{name:"literal",value:'"required"'},{name:"literal",value:'"enforced"'},{name:"literal",value:'"optional"'}],required:!0}}]}}],raw:"PerseusNumericInputAnswer[]"},description:""},labelText:{required:!1,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},size:{required:!0,tsType:{name:"string"},description:""},coefficient:{required:!0,tsType:{name:"boolean"},description:""},rightAlign:{required:!1,tsType:{name:"boolean"},description:""},static:{required:!0,tsType:{name:"boolean"},description:""}}};p.__docgenInfo={description:"",methods:[],displayName:"MixedExample",props:{answers:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    // Translatable Display; A description for why this answer is correct, wrong, or ungraded
    message: string;
    // The expected answer
    value?: number | null;
    // Whether this answer is "correct", "wrong", or "ungraded"
    status: string;
    // The forms available for this answer.  Options: "integer, ""decimal", "proper", "improper", "mixed", or "pi"
    answerForms?: MathFormat[];
    // Whether we should check the answer strictly against the the configured answerForms (strict = true)
    // or include the set of default answerForms (strict = false).
    strict: boolean;
    // A range of error +/- the value
    maxError?: number | null;
    // Unsimplified answers are Ungraded, Accepted, or Wrong.
    simplify: PerseusNumericInputSimplify;
}`,signature:{properties:[{key:"message",value:{name:"string",required:!0}},{key:"value",value:{name:"union",raw:"number | null",elements:[{name:"number"},{name:"null"}],required:!1}},{key:"status",value:{name:"string",required:!0}},{key:"answerForms",value:{name:"Array",elements:[{name:"union",raw:`| "integer"
| "mixed"
| "improper"
| "proper"
| "decimal"
| "percent"
| "pi"`,elements:[{name:"literal",value:'"integer"'},{name:"literal",value:'"mixed"'},{name:"literal",value:'"improper"'},{name:"literal",value:'"proper"'},{name:"literal",value:'"decimal"'},{name:"literal",value:'"percent"'},{name:"literal",value:'"pi"'}]}],raw:"MathFormat[]",required:!1}},{key:"strict",value:{name:"boolean",required:!0}},{key:"maxError",value:{name:"union",raw:"number | null",elements:[{name:"number"},{name:"null"}],required:!1}},{key:"simplify",value:{name:"union",raw:'"required" | "enforced" | "optional"',elements:[{name:"literal",value:'"required"'},{name:"literal",value:'"enforced"'},{name:"literal",value:'"optional"'}],required:!0}}]}}],raw:"PerseusNumericInputAnswer[]"},description:""},labelText:{required:!1,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},size:{required:!0,tsType:{name:"string"},description:""},coefficient:{required:!0,tsType:{name:"boolean"},description:""},rightAlign:{required:!1,tsType:{name:"boolean"},description:""},static:{required:!0,tsType:{name:"boolean"},description:""}}};c.__docgenInfo={description:"",methods:[],displayName:"PiExample",props:{answers:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    // Translatable Display; A description for why this answer is correct, wrong, or ungraded
    message: string;
    // The expected answer
    value?: number | null;
    // Whether this answer is "correct", "wrong", or "ungraded"
    status: string;
    // The forms available for this answer.  Options: "integer, ""decimal", "proper", "improper", "mixed", or "pi"
    answerForms?: MathFormat[];
    // Whether we should check the answer strictly against the the configured answerForms (strict = true)
    // or include the set of default answerForms (strict = false).
    strict: boolean;
    // A range of error +/- the value
    maxError?: number | null;
    // Unsimplified answers are Ungraded, Accepted, or Wrong.
    simplify: PerseusNumericInputSimplify;
}`,signature:{properties:[{key:"message",value:{name:"string",required:!0}},{key:"value",value:{name:"union",raw:"number | null",elements:[{name:"number"},{name:"null"}],required:!1}},{key:"status",value:{name:"string",required:!0}},{key:"answerForms",value:{name:"Array",elements:[{name:"union",raw:`| "integer"
| "mixed"
| "improper"
| "proper"
| "decimal"
| "percent"
| "pi"`,elements:[{name:"literal",value:'"integer"'},{name:"literal",value:'"mixed"'},{name:"literal",value:'"improper"'},{name:"literal",value:'"proper"'},{name:"literal",value:'"decimal"'},{name:"literal",value:'"percent"'},{name:"literal",value:'"pi"'}]}],raw:"MathFormat[]",required:!1}},{key:"strict",value:{name:"boolean",required:!0}},{key:"maxError",value:{name:"union",raw:"number | null",elements:[{name:"number"},{name:"null"}],required:!1}},{key:"simplify",value:{name:"union",raw:'"required" | "enforced" | "optional"',elements:[{name:"literal",value:'"required"'},{name:"literal",value:'"enforced"'},{name:"literal",value:'"optional"'}],required:!0}}]}}],raw:"PerseusNumericInputAnswer[]"},description:""},labelText:{required:!1,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},size:{required:!0,tsType:{name:"string"},description:""},coefficient:{required:!0,tsType:{name:"boolean"},description:""},rightAlign:{required:!1,tsType:{name:"boolean"},description:""},static:{required:!0,tsType:{name:"boolean"},description:""}}};d.__docgenInfo={description:"",methods:[],displayName:"CoefficientExample",props:{answers:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    // Translatable Display; A description for why this answer is correct, wrong, or ungraded
    message: string;
    // The expected answer
    value?: number | null;
    // Whether this answer is "correct", "wrong", or "ungraded"
    status: string;
    // The forms available for this answer.  Options: "integer, ""decimal", "proper", "improper", "mixed", or "pi"
    answerForms?: MathFormat[];
    // Whether we should check the answer strictly against the the configured answerForms (strict = true)
    // or include the set of default answerForms (strict = false).
    strict: boolean;
    // A range of error +/- the value
    maxError?: number | null;
    // Unsimplified answers are Ungraded, Accepted, or Wrong.
    simplify: PerseusNumericInputSimplify;
}`,signature:{properties:[{key:"message",value:{name:"string",required:!0}},{key:"value",value:{name:"union",raw:"number | null",elements:[{name:"number"},{name:"null"}],required:!1}},{key:"status",value:{name:"string",required:!0}},{key:"answerForms",value:{name:"Array",elements:[{name:"union",raw:`| "integer"
| "mixed"
| "improper"
| "proper"
| "decimal"
| "percent"
| "pi"`,elements:[{name:"literal",value:'"integer"'},{name:"literal",value:'"mixed"'},{name:"literal",value:'"improper"'},{name:"literal",value:'"proper"'},{name:"literal",value:'"decimal"'},{name:"literal",value:'"percent"'},{name:"literal",value:'"pi"'}]}],raw:"MathFormat[]",required:!1}},{key:"strict",value:{name:"boolean",required:!0}},{key:"maxError",value:{name:"union",raw:"number | null",elements:[{name:"number"},{name:"null"}],required:!1}},{key:"simplify",value:{name:"union",raw:'"required" | "enforced" | "optional"',elements:[{name:"literal",value:'"required"'},{name:"literal",value:'"enforced"'},{name:"literal",value:'"optional"'}],required:!0}}]}}],raw:"PerseusNumericInputAnswer[]"},description:""},labelText:{required:!1,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},size:{required:!0,tsType:{name:"string"},description:""},coefficient:{required:!0,tsType:{name:"boolean"},description:""},rightAlign:{required:!1,tsType:{name:"boolean"},description:""},static:{required:!0,tsType:{name:"boolean"},description:""}}};g.__docgenInfo={description:"",methods:[],displayName:"Answerless",props:{answers:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    // Translatable Display; A description for why this answer is correct, wrong, or ungraded
    message: string;
    // The expected answer
    value?: number | null;
    // Whether this answer is "correct", "wrong", or "ungraded"
    status: string;
    // The forms available for this answer.  Options: "integer, ""decimal", "proper", "improper", "mixed", or "pi"
    answerForms?: MathFormat[];
    // Whether we should check the answer strictly against the the configured answerForms (strict = true)
    // or include the set of default answerForms (strict = false).
    strict: boolean;
    // A range of error +/- the value
    maxError?: number | null;
    // Unsimplified answers are Ungraded, Accepted, or Wrong.
    simplify: PerseusNumericInputSimplify;
}`,signature:{properties:[{key:"message",value:{name:"string",required:!0}},{key:"value",value:{name:"union",raw:"number | null",elements:[{name:"number"},{name:"null"}],required:!1}},{key:"status",value:{name:"string",required:!0}},{key:"answerForms",value:{name:"Array",elements:[{name:"union",raw:`| "integer"
| "mixed"
| "improper"
| "proper"
| "decimal"
| "percent"
| "pi"`,elements:[{name:"literal",value:'"integer"'},{name:"literal",value:'"mixed"'},{name:"literal",value:'"improper"'},{name:"literal",value:'"proper"'},{name:"literal",value:'"decimal"'},{name:"literal",value:'"percent"'},{name:"literal",value:'"pi"'}]}],raw:"MathFormat[]",required:!1}},{key:"strict",value:{name:"boolean",required:!0}},{key:"maxError",value:{name:"union",raw:"number | null",elements:[{name:"number"},{name:"null"}],required:!1}},{key:"simplify",value:{name:"union",raw:'"required" | "enforced" | "optional"',elements:[{name:"literal",value:'"required"'},{name:"literal",value:'"enforced"'},{name:"literal",value:'"optional"'}],required:!0}}]}}],raw:"PerseusNumericInputAnswer[]"},description:""},labelText:{required:!1,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},size:{required:!0,tsType:{name:"string"},description:""},coefficient:{required:!0,tsType:{name:"boolean"},description:""},rightAlign:{required:!1,tsType:{name:"boolean"},description:""},static:{required:!0,tsType:{name:"boolean"},description:""}}};var y,h,v;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`(args: PerseusNumericInputWidgetOptions): React.ReactElement => {
  const question = updateWidgetOptions(defaultQuestion, "numeric-input 1", args);
  return <ServerItemRendererWithDebugUI item={generateTestPerseusItem({
    question
  })} />;
}`,...(v=(h=s.parameters)==null?void 0:h.docs)==null?void 0:v.source}}};var b,q,x;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:`(args: PerseusNumericInputWidgetOptions): React.ReactElement => {
  const question = updateWidgetOptions(integerProblem, "numeric-input 1", args);
  return <ServerItemRendererWithDebugUI item={generateTestPerseusItem({
    question
  })} />;
}`,...(x=(q=l.parameters)==null?void 0:q.docs)==null?void 0:x.source}}};var T,I,A;o.parameters={...o.parameters,docs:{...(T=o.parameters)==null?void 0:T.docs,source:{originalSource:`(args: PerseusNumericInputWidgetOptions): React.ReactElement => {
  const question = updateWidgetOptions(decimalProblem, "numeric-input 1", args);
  return <ServerItemRendererWithDebugUI item={generateTestPerseusItem({
    question
  })} />;
}`,...(A=(I=o.parameters)==null?void 0:I.docs)==null?void 0:A.source}}};var k,F,E;u.parameters={...u.parameters,docs:{...(k=u.parameters)==null?void 0:k.docs,source:{originalSource:`(args: PerseusNumericInputWidgetOptions): React.ReactElement => {
  const question = updateWidgetOptions(improperProblem, "numeric-input 1", args);
  return <ServerItemRendererWithDebugUI item={generateTestPerseusItem({
    question
  })} />;
}`,...(E=(F=u.parameters)==null?void 0:F.docs)==null?void 0:E.source}}};var W,P,N;m.parameters={...m.parameters,docs:{...(W=m.parameters)==null?void 0:W.docs,source:{originalSource:`(args: PerseusNumericInputWidgetOptions): React.ReactElement => {
  const question = updateWidgetOptions(properProblem, "numeric-input 1", args);
  return <ServerItemRendererWithDebugUI item={generateTestPerseusItem({
    question
  })} />;
}`,...(N=(P=m.parameters)==null?void 0:P.docs)==null?void 0:N.source}}};var O,U,R;p.parameters={...p.parameters,docs:{...(O=p.parameters)==null?void 0:O.docs,source:{originalSource:`(args: PerseusNumericInputWidgetOptions): React.ReactElement => {
  const question = updateWidgetOptions(mixedProblem, "numeric-input 1", args);
  return <ServerItemRendererWithDebugUI item={generateTestPerseusItem({
    question
  })} />;
}`,...(R=(U=p.parameters)==null?void 0:U.docs)==null?void 0:R.source}}};var S,D,j;c.parameters={...c.parameters,docs:{...(S=c.parameters)==null?void 0:S.docs,source:{originalSource:`(args: PerseusNumericInputWidgetOptions): React.ReactElement => {
  const question = updateWidgetOptions(piProblem, "numeric-input 1", args);
  return <ServerItemRendererWithDebugUI item={generateTestPerseusItem({
    question
  })} />;
}`,...(j=(D=c.parameters)==null?void 0:D.docs)==null?void 0:j.source}}};var M,z,_;d.parameters={...d.parameters,docs:{...(M=d.parameters)==null?void 0:M.docs,source:{originalSource:`(args: PerseusNumericInputWidgetOptions): React.ReactElement => {
  const question = updateWidgetOptions(withCoefficient, "numeric-input 1", args);
  return <ServerItemRendererWithDebugUI item={generateTestPerseusItem({
    question
  })} />;
}`,...(_=(z=d.parameters)==null?void 0:z.docs)==null?void 0:_.source}}};var $,C,V;g.parameters={...g.parameters,docs:{...($=g.parameters)==null?void 0:$.docs,source:{originalSource:`(args: PerseusNumericInputWidgetOptions): React.ReactElement => {
  const question = updateWidgetOptions(defaultQuestion, "numeric-input 1", args);
  return <ServerItemRendererWithDebugUI item={generateTestPerseusItem({
    question
  })} startAnswerless={true} />;
}`,...(V=(C=g.parameters)==null?void 0:C.docs)==null?void 0:V.source}}};const ue=["Default","IntegerExample","DecimalExample","ImproperExample","ProperExample","MixedExample","PiExample","CoefficientExample","Answerless"];export{g as Answerless,d as CoefficientExample,o as DecimalExample,s as Default,u as ImproperExample,l as IntegerExample,p as MixedExample,c as PiExample,m as ProperExample,ue as __namedExportsOrder,oe as default};
