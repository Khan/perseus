import{j as n,a as b}from"./jsx-runtime-FVsy8kgq.js";import{l as a}from"./index-awljIyHI.js";import{r as u}from"./index-TT1qJ6UJ.js";import"./article-renderer-ub6lGcPc.js";import"./jquery-yG1GhClm.js";import"./util-F8-MDmsT.js";import"./phet-simulation-9PbE2pxN.js";import"./version-akiLXZts.js";import"./dependencies-d8cZibFS.js";import"./perseus-api-Nq3s7IMx.js";import"./multi-renderer-la0A-h33.js";import"./hints-renderer-eYcfi__L.js";import"./renderer-JG1Z7r2S.js";import"./base-radio-SM-baXgO.js";import{c as S}from"./components-yT7oveOH.js";import"./index-k-0mNqHS.js";import"./i18n-context-P5sgPFep.js";import"./svg-image-4Vh9uTQ6.js";import"./index-IIMKO4_x.js";import{R as D}from"./index-7vsPyIck.js";import{a as w,c as g,d as x,e as y,f as R}from"./global-colors-VIVU4Od4.js";import{f as T}from"./util-qk2aeK8X.js";import{F as A}from"./form-wrapped-text-field-A2kf-LD-.js";const{Icon:M}=S,N=h=>{const e=D.findDOMNode(h);e.focus&&T(e)},q=`M10,3.8C10,4,9.9,4.2,9.8,4.3L5.1,8.9L4.3,9.8C4.2,9.9,4,10,3.8,10
 S3.5,9.9,3.4,9.8L2.5,8.9L0.2,6.6C0.1,6.5,0,6.3,0,6.2s0.1-0.3,0.2-0.4
 l0.9-0.9c0.1-0.1,0.3-0.2,0.4-0.2s0.3,0.1,0.4,0.2l1.9,1.9l4.2-4.2c0.1
 -0.1,0.3-0.2,0.4-0.2c0.2,0,0.3,0.1,0.4,0.2l0.9,0.9C9.9,3.5,10,3.7,
 10,3.8z`,E=30;class f extends u.Component{handleKeyDown(r){const{onDropdownClose:e}=this.props,o=r.key,t=r.target;o==="ArrowDown"&&t.nextSibling&&(r.preventDefault(),t.nextSibling.focus()),o==="ArrowUp"&&t.previousSibling&&(r.preventDefault(),t.previousSibling.focus()),o==="ArrowUp"&&!t.previousSibling&&e&&(r.preventDefault(),e()),(o==="Escape"||o==="Tab")&&e&&e()}render(){const{selected:r,value:e,onClick:o,children:t,disabled:s,hideFocusState:c,testId:l,ariaLabel:i}=this.props;return n("button",{ref:p=>this.node=p,value:e,role:"menuitemradio","aria-checked":r,className:a.css(d.notAButton,s&&d.cursorDefault,c&&d.noFocus),onClick:p=>{!s&&o&&o(p)},onKeyDown:p=>this.handleKeyDown(p),"aria-disabled":s,"aria-label":i,"data-testid":l,children:b("span",{className:a.css(d.option,r&&d.optionSelected,s&&d.optionDisabled),children:[t,r&&n("span",{className:a.css(d.check),children:n(M,{icon:q})})]})})}}class k extends u.Component{componentDidMount(){this.focusedElement&&N(this.focusedElement)}render(){const{children:r,onSelected:e,selectedValues:o,noMargin:t,onDropdownClose:s,hideFocusState:c}=this.props;return n("div",{style:{top},className:a.css(d.optionGroup,t&&d.optionGroupNoMargin),children:u.Children.map(r,(l,i)=>{const p=o.includes(l.props.value),v=p||i===0?C=>this.focusedElement=C:null;return u.cloneElement(l,{...l.props,key:i,selected:p,onClick:()=>e(l.props.value),ref:v,onDropdownClose:s,hideFocusState:c})})})}}const d=a.StyleSheet.create({optionGroup:{margin:"4px 0"},optionGroupNoMargin:{margin:0},option:{display:"flex",flexDirection:"row",alignItems:"center",paddingLeft:32,paddingRight:32,height:E,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",color:w,userSelect:"none",":hover":{backgroundColor:g}},optionSelected:{backgroundColor:g,color:"#11ACCD"},optionDisabled:{color:x,":hover":{backgroundColor:"transparent"}},check:{position:"absolute",left:11},notAButton:{backgroundColor:"transparent",border:"none",display:"block",padding:0,margin:0,width:"100%",font:"inherit"},noFocus:{outline:"none"},cursorDefault:{cursor:"default"}});k.__docgenInfo={description:"",methods:[],displayName:"OptionGroup",props:{onSelected:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},children:{required:!1,tsType:{name:"Array",elements:[{name:"ReactReactElement",raw:"React.ReactElement<React.ComponentProps<typeof Option>>",elements:[{name:"ReactComponentProps",raw:"React.ComponentProps<typeof Option>",elements:[{name:"Option"}]}]}],raw:"Array<React.ReactElement<React.ComponentProps<typeof Option>>>"},description:""},selectedValues:{required:!0,tsType:{name:"Array",elements:[{name:"string"}],raw:"Array<string>"},description:""},noMargin:{required:!1,tsType:{name:"boolean"},description:""},onDropdownClose:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},hideFocusState:{required:!1,tsType:{name:"boolean"},description:""}}};f.__docgenInfo={description:"",methods:[{name:"handleKeyDown",docblock:null,modifiers:[],params:[{name:"event",optional:!1,type:{name:"any"}}],returns:{type:{name:"void"}}}],displayName:"Option",props:{value:{required:!0,tsType:{name:"string"},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},selected:{required:!1,tsType:{name:"boolean"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onDropdownClose:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},hideFocusState:{required:!1,tsType:{name:"boolean"},description:""},testId:{required:!1,tsType:{name:"string"},description:""},ariaLabel:{required:!1,tsType:{name:"string"},description:""}}};class L extends u.Component{constructor(r){super(r),this.handleClick=e=>{const{showDropdown:o}=this.state;this._marker===e.target?this.setState({showDropdown:!o}):o&&this._marker&&!this._marker.contains(e.target)&&(e.stopPropagation(),this.setState({showDropdown:!1}))},this.handleLabelChange=e=>{this.updateMarker({label:e.target.value})},this.handleSelectAnswer=e=>{let{answers:o}=this.props;o.includes(e)?o=o.filter(t=>t!==e):o=[...o,e],this.updateMarker({answers:o})},this.state={showDropdown:!1}}componentDidMount(){document.addEventListener("click",this.handleClick,!0)}UNSAFE_componentWillReceiveProps(r){const{answers:e}=this.props,o=e.filter(t=>r.choices.includes(t));JSON.stringify(e)!==JSON.stringify(o)&&setTimeout(()=>this.updateMarker({answers:o}))}componentWillUnmount(){document.removeEventListener("click",this.handleClick,!0)}openDropdown(){this.setState({showDropdown:!0})}updateMarker(r){const{answers:e,label:o,onChange:t,x:s,y:c}=this.props;t({answers:e,label:o,x:s,y:c,...r})}render(){const{answers:r,choices:e,label:o,onRemove:t,x:s,y:c}=this.props,{showDropdown:l}=this.state;return n("div",{className:a.css(m.marker,r.length>0&&m.markerWithAnswers,l&&m.markerSelected),ref:i=>this._marker=i,style:{left:`${s}%`,top:`${c}%`},title:"Click to select marker answers or to delete marker. Repositioning marker is not implemented.",children:l&&n("div",{children:b("div",{className:a.css(m.dropdownBody,m.dropdownPositionWithArrow),children:[n(f,{value:"",onClick:()=>t(),children:"Delete marker"}),n("hr",{className:a.css(m.dividerHorizontal)}),n(k,{onSelected:this.handleSelectAnswer,selectedValues:r,children:e.map(i=>n(f,{value:i,children:i},i))}),n("div",{className:a.css(m.labelContainer),children:n(A,{placeholder:"ARIA label (for screen readers)",onChange:this.handleLabelChange,value:o,width:"100%"})})]})})})}}const m=a.StyleSheet.create({marker:{position:"absolute",boxSizing:"content-box",width:16,height:16,marginLeft:-8,marginTop:-8,cursor:"pointer",background:"linear-gradient(to bottom, rgba(33, 36, 44, 0.2), rgba(33, 36, 44, 0.5))",border:"solid 2px #ffffff",borderRadius:16,boxShadow:"0 2px 10px 0 rgba(33, 36, 44, 0.1)"},markerSelected:{width:28,height:28,marginLeft:-12,marginTop:-12,border:"none",borderRadius:28,"::before":{content:"''",display:"block",width:20,height:20,marginLeft:2,marginTop:2,border:"solid 2px #ffffff",borderRadius:20}},markerWithAnswers:{background:"#1865f2"},dropdownPositionWithArrow:{left:46,bottom:-12,"::before":{content:"''",display:"block",position:"absolute",width:0,height:0,left:-16,bottom:8,borderRight:`solid 16px ${y}`,borderTop:"solid 16px transparent",borderBottom:"solid 16px transparent"}},labelContainer:{padding:4},dividerHorizontal:{height:0,margin:0,border:`solid ${R}`,borderWidth:"0 0 1px",boxShadow:"none"},dropdownBody:{position:"absolute",border:"solid 1px rgba(0, 0, 0, 0.1)",zIndex:1e3,color:w,backgroundColor:y,borderRadius:4,maxHeight:320,cursor:"pointer"}});L.__docgenInfo={description:"",methods:[{name:"openDropdown",docblock:null,modifiers:[],params:[],returns:null},{name:"updateMarker",docblock:null,modifiers:[],params:[{name:"props",optional:!1,type:{name:"any"}}],returns:null},{name:"handleClick",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:{name:"MouseEvent",alias:"MouseEvent"}}],returns:null},{name:"handleLabelChange",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"handleSelectAnswer",docblock:null,modifiers:[],params:[{name:"toggleAnswer",optional:!1,type:{name:"string"}}],returns:null}],displayName:"Marker",props:{choices:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(marker: MarkerType) => void",signature:{arguments:[{type:{name:"MarkerType"},name:"marker"}],return:{name:"void"}}},description:""},onRemove:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};export{L as M};