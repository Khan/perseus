import{j as n}from"./jsx-runtime-63Ea5SlK.js";import{c as y,p as v}from"./article-renderer-672kQv0H.js";import{_ as r}from"./jquery-yG1GhClm.js";import"./util-AYeX86gl.js";import"./phet-simulation-_7qOO4_B.js";import"./version-akiLXZts.js";import"./dependencies-CP7Uh8Kq.js";import{A as b}from"./perseus-api-1-ethIrW.js";import"./perseus-item-tX_UkuqW.js";import"./hints-renderer-55KvvYOM.js";import"./renderer-Fa29TEBe.js";import{B as q}from"./base-radio-lzGbv5LT.js";import{c as x}from"./components-_HVRA9p2.js";import{i as O}from"./icon-paths-5JCXzGsq.js";import"./index-0C4KXdeC.js";import"./i18n-context-fsWEgybQ.js";import"./svg-image-ZjoZQGiG.js";import"./index-smZ6iCr_.js";import{C as c}from"./index-V5gl6frG.js";import{P as t}from"./index-k-0mNqHS.js";import{r as g}from"./index-6oxdNXpR.js";import{E as f}from"./editor-yBN_3Yf0.js";import{i as C}from"./icon-paths-EoBkHOLI.js";const{InlineIcon:p}=x,d=class d extends g.Component{render(){const e=this.props.choice.correct?"correct":"incorrect";let s="Type a choice here...";this.props.choice.isNoneOfTheAbove&&(s=this.props.choice.correct?"Type the answer to reveal to the user...":"None of the above");const o=n.jsx(f,{ref:"content-editor",apiOptions:this.props.apiOptions,content:this.props.choice.content||"",widgetEnabled:!1,placeholder:s,disabled:this.props.choice.isNoneOfTheAbove&&!this.props.choice.correct,onChange:this.props.onContentChange}),i=n.jsx(f,{ref:"clue-editor",apiOptions:this.props.apiOptions,content:this.props.choice.clue||"",widgetEnabled:!1,placeholder:`Why is this choice ${e}?`,onChange:this.props.onClueChange}),l=n.jsx("a",{className:"simple-button orange delete-choice",href:"#",onClick:m=>{m.stopPropagation(),m.preventDefault(),this.props.onDelete()},title:"Remove this choice",children:n.jsx(p,{...O})});return n.jsxs("div",{className:"choice-clue-editors",children:[n.jsx("div",{className:`choice-editor ${e}`,children:o}),n.jsx("div",{className:"clue-editor",children:i}),this.props.showDelete&&l]})}};d.propTypes={apiOptions:b.propTypes,choice:t.object,showDelete:t.bool,onClueChange:t.func,onContentChange:t.func,onDelete:t.func};let h=d;const a=class a extends g.Component{constructor(){super(...arguments),this.change=(...e)=>y.apply(this,e),this.onMultipleSelectChange=e=>{e=e.multipleSelect;const s=r.reduce(this.props.choices,function(o,i){return i.correct?o+1:o},0);if(!e&&s>1){const o=r.map(this.props.choices,function(i){return r.defaults({correct:!1},i)});this.props.onChange({multipleSelect:e,choices:o})}else this.props.onChange({multipleSelect:e})},this.onCountChoicesChange=e=>{e=e.countChoices,this.props.onChange({countChoices:e})},this.onChange=({checked:e})=>{const s=r.map(this.props.choices,(o,i)=>r.extend({},o,{correct:e[i],content:o.isNoneOfTheAbove&&!e[i]?"":o.content}));this.props.onChange({choices:s})},this.onContentChange=(e,s)=>{const o=this.props.choices.slice();o[e]=r.extend({},o[e],{content:s}),this.props.onChange({choices:o})},this.onClueChange=(e,s)=>{const o=this.props.choices.slice();o[e]=r.extend({},o[e],{clue:s}),s===""&&delete o[e].clue,this.props.onChange({choices:o})},this.onDelete=e=>{const s=this.props.choices.slice(),o=s[e];s.splice(e,1),this.props.onChange({choices:s,hasNoneOfTheAbove:this.props.hasNoneOfTheAbove&&!o.isNoneOfTheAbove})},this.addChoice=(e,s)=>{s.preventDefault();const o=this.props.choices.slice(),i={isNoneOfTheAbove:e},l=o.length-(this.props.hasNoneOfTheAbove?1:0);o.splice(l,0,i),this.props.onChange({choices:o,hasNoneOfTheAbove:e||this.props.hasNoneOfTheAbove},()=>{this.refs[`choice-editor${l}`].refs["content-editor"].focus()})},this.setDisplayCount=e=>{this.props.onChange({displayCount:e})},this.focus=()=>(this.refs["choice-editor0"].refs["content-editor"].focus(),!0),this.getSaveWarnings=()=>r.some(r.pluck(this.props.choices,"correct"))?[]:["No choice is marked as correct."],this.serialize=()=>r.pick(this.props,"choices","randomize","multipleSelect","countChoices","displayCount","hasNoneOfTheAbove","deselectEnabled")}render(){const e=r.reduce(this.props.choices,function(s,o){return o.correct?s+1:s},0);return n.jsxs("div",{children:[n.jsxs("div",{className:"perseus-widget-row",children:[n.jsx("a",{href:"https://docs.google.com/document/d/1frZf7yrWVWb1n4tVjqlzqVUiv1pn4cZXbxgP62-JDBY/edit#heading=h.8ng1isya19nu",target:"_blank",rel:"noreferrer",children:"Multiple choice style guide"}),n.jsx("br",{}),n.jsx("div",{className:"perseus-widget-left-col",children:n.jsx(c,{label:"Multiple selections",checked:this.props.multipleSelect,onChange:s=>{this.onMultipleSelectChange({multipleSelect:s})}})}),n.jsx("div",{className:"perseus-widget-right-col",children:n.jsx(c,{label:"Randomize order",checked:this.props.randomize,onChange:s=>{this.props.onChange({randomize:s})}})}),this.props.multipleSelect&&n.jsx("div",{className:"perseus-widget-left-col",children:n.jsx(c,{label:"Specify number correct",checked:this.props.countChoices,onChange:s=>{this.onCountChoicesChange({countChoices:s})}})})]}),n.jsx(q,{multipleSelect:this.props.multipleSelect,countChoices:this.props.countChoices,numCorrect:e,editMode:!0,labelWrap:!1,apiOptions:this.props.apiOptions,reviewMode:!1,choices:this.props.choices.map((s,o)=>({content:n.jsx(h,{ref:`choice-editor${o}`,apiOptions:this.props.apiOptions,choice:s,onContentChange:i=>{"content"in i&&this.onContentChange(o,i.content)},onClueChange:i=>{"content"in i&&this.onClueChange(o,i.content)},onDelete:()=>this.onDelete(o),showDelete:this.props.choices.length>=2}),isNoneOfTheAbove:s.isNoneOfTheAbove,checked:s.correct}),this),onChange:this.onChange}),n.jsxs("div",{className:"add-choice-container",children:[n.jsxs("a",{className:"simple-button orange",href:"#",onClick:this.addChoice.bind(this,!1),children:[n.jsx(p,{...C})," Add a choice"," "]}),!this.props.hasNoneOfTheAbove&&n.jsxs("a",{className:"simple-button",href:"#",onClick:this.addChoice.bind(this,!0),children:[n.jsx(p,{...C})," None of the above"," "]})]})]})}};a.propTypes={...v,apiOptions:b.propTypes,choices:t.arrayOf(t.shape({content:t.string,clue:t.string,correct:t.bool})),displayCount:t.number,randomize:t.bool,hasNoneOfTheAbove:t.bool,multipleSelect:t.bool,countChoices:t.bool,deselectEnabled:t.bool,static:t.bool},a.widgetName="radio",a.defaultProps={choices:[{},{},{},{}],displayCount:null,randomize:!1,hasNoneOfTheAbove:!1,multipleSelect:!1,countChoices:!1,deselectEnabled:!1};let u=a;u.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"onMultipleSelectChange",docblock:null,modifiers:[],params:[{name:"allowMultiple",optional:!1,type:null}],returns:null},{name:"onCountChoicesChange",docblock:null,modifiers:[],params:[{name:"count",optional:!1,type:null}],returns:null},{name:"onChange",docblock:null,modifiers:[],params:[{name:"{checked}",optional:!1,type:null}],returns:null},{name:"onContentChange",docblock:null,modifiers:[],params:[{name:"choiceIndex",optional:!1,type:null},{name:"newContent",optional:!1,type:null}],returns:null},{name:"onClueChange",docblock:null,modifiers:[],params:[{name:"choiceIndex",optional:!1,type:null},{name:"newClue",optional:!1,type:null}],returns:null},{name:"onDelete",docblock:null,modifiers:[],params:[{name:"choiceIndex",optional:!1,type:null}],returns:null},{name:"addChoice",docblock:null,modifiers:[],params:[{name:"noneOfTheAbove",optional:!1,type:null},{name:"e",optional:!1,type:null}],returns:null},{name:"setDisplayCount",docblock:null,modifiers:[],params:[{name:"num",optional:!1,type:null}],returns:null},{name:"focus",docblock:null,modifiers:[],params:[],returns:null},{name:"getSaveWarnings",docblock:null,modifiers:[],params:[],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"RadioEditor",props:{choices:{defaultValue:{value:"[{}, {}, {}, {}]",computed:!1},description:"",type:{name:"arrayOf",value:{name:"shape",value:{content:{name:"string",required:!1},clue:{name:"string",required:!1},correct:{name:"bool",required:!1}}}},required:!1},displayCount:{defaultValue:{value:"null",computed:!1},description:"",type:{name:"number"},required:!1},randomize:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},hasNoneOfTheAbove:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},multipleSelect:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},countChoices:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},deselectEnabled:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},apiOptions:{description:"",type:{name:"shape",value:{isArticle:{name:"bool",required:!0},onFocusChange:{name:"func",required:!0},GroupMetadataEditor:{name:"func",required:!0},showAlignmentOptions:{name:"bool",required:!0},readOnly:{name:"bool",required:!0},answerableCallback:{name:"func",required:!1},getAnotherHint:{name:"func",required:!1},interactionCallback:{name:"func",required:!1},groupAnnotator:{name:"func",required:!0},imagePlaceholder:{name:"node",required:!1},widgetPlaceholder:{name:"node",required:!1},baseElements:{name:"shape",value:{Link:{name:"func",required:!1}},required:!1},imagePreloader:{name:"func",required:!1},trackInteraction:{name:"func",required:!1},customKeypad:{name:"bool",required:!1},nativeKeypadProxy:{name:"func",required:!1},isMobile:{name:"bool",required:!1},setDrawingAreaAvailable:{name:"func",required:!1},hintProgressColor:{name:"string",required:!1},canScrollPage:{name:"bool",required:!1},crossOutEnabled:{name:"bool",required:!1},editorChangeDelay:{name:"number",required:!1}}},required:!0},static:{description:"",type:{name:"bool"},required:!1}},composes:["@khanacademy/perseus"]};export{u as R};