import{j as i,a as c}from"./jsx-runtime-FVsy8kgq.js";import{l as p}from"./index-awljIyHI.js";import{r as u}from"./index-TT1qJ6UJ.js";import{R as g}from"./renderer-with-debug-ui-QfvfhYya.js";import{E as l}from"./expression-editor-qBPCR-6y.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./choice-E4eyMygy.js";import"./index-6h5t6F0w.js";import"./react-router-dom-W_e8xVUu.js";import"./index-tvtfaFq4.js";import"./index-o3wWn3Y5.js";import"./index-deFLJwr4.js";import"./index-h_CiYGGb.js";import"./index-ngddCaVG.js";import"./index-rfN0X25E.js";import"./index-xuPsLuPk.js";import"./index-WNT3sUKf.js";import"./index-qUyqkRvh.js";import"./index-BPSWBbj5.js";import"./index-7vsPyIck.js";import"./index-YCTzZMik.js";import"./index-CkAxGj88.js";import"./Popper-kGnKOid7.js";import"./index-dnMhQZ-1.js";import"./i18n-context-hxuRe8oU.js";import"./strings-OAjNfY6D.js";import"./icon-YuYiVxsK.js";import"./perseus-api-mOiZT07d.js";import"./index-k-0mNqHS.js";import"./invariant-bu5zBsRS.js";import"./stub-tag-editor-Hmby24Jq.js";import"./text-list-editor-pe7AGDAl.js";import"./jquery-yG1GhClm.js";import"./media-queries-MaBBbpNq.js";import"./constants-I_nlPaPx.js";import"./choice-icon-LAaL9HdM.js";import"./inline-icon-tKY1iMkH.js";import"./icon-paths-AuJwhOz7.js";import"./focus-ring-sgSTt4fM.js";import"./option-status-6glEGOB8.js";import"./article-renderer-4y7LcYNV.js";import"./util-YrNvlCNO.js";import"./version-akiLXZts.js";import"./prop-types-3bOVFRDQ.js";import"./mobile-keypad-hKjeQGNp.js";import"./index-J2t_5nK1.js";import"./tabbar-WYCYDof0.js";import"./item-X9tjzx12.js";import"./index-2dmvOE3q.js";import"./button-assets-txIojR3b.js";import"./keypad-button-rKskH7oM.js";import"./operators-page-C_EsmjPW.js";import"./navigation-pad-ss7r0FKW.js";import"./key-translator-IA-2V2LV.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./renderer-hPmI_Chp.js";import"./asset-context-I7yIqWki.js";import"./svg-image-RL9NlJEY.js";import"./dependencies-8XILypbq.js";import"./fixed-to-responsive-1fSZ1n--.js";import"./client-rbWgHzHN.js";import"./image-loader-mgyZcN0j.js";import"./tex-VP4hirbI.js";import"./zoomable-CA1NzpZD.js";import"./zoomable-tex-MZi7Hqbp.js";import"./lint-I_5mQeXl.js";import"./index-K9BSJPWl.js";import"./math-input-b6JdL4xR.js";import"./input-with-examples-YZffrKhM.js";import"./text-input-15gEhfDF.js";import"./index-QCAhLhLD.js";import"./minus-bold-ONmDo3Ve.js";import"./tooltip-S_hcgkAT.js";import"./simple-keypad-input-zNNuoI83.js";import"./base-radio-TdBv-OLd.js";import"./shared-3pf9YZIg.js";import"./choice-none-above-HXEAXx7K.js";import"./phet-simulation-4u5-UljK.js";import"./arrow-square-out-bold-090vdhrx.js";import"./answer-choices-xSqM961S.js";import"./button-group-nsoLlHtM.js";import"./graph-myhk4Jua.js";import"./index-IIMKO4_x.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-7jAAHVxW.js";import"./hud-FI3E3dT_.js";import"./multi-button-group-a0iIfrwx.js";import"./number-input-ZhezuDVT.js";import"./range-input-kzyKWO0E.js";import"./marker-ockQWLHi.js";import"./answer-pill-NjYGKpaV.js";import"./sortable-1zDjBYMZ.js";import"./video-transcript-link-WVgIZGhp.js";import"./side-by-side-kpK-8vW0.js";import"./multi-renderer-TkkEhTow.js";import"./hints-renderer-sA0Ao_qa.js";import"./register-all-widgets-for-testing-8oYMh3Jn.js";import"./components-h6HHhmoA.js";import"./index-fuycm_QE.js";import"./index-0C4KXdeC.js";const ar={title:"PerseusEditor/Widgets/Expression Editor"};class f extends u.Component{constructor(e){super(e);const t=r.widgets["expression 1"].options;this.state={answerForms:t.answerForms,times:t.times,buttonSets:t.buttonSets,functions:t.functions}}mergeQuestionWithState(){return{...r,widgets:{...r.widgets,"expression 1":{...r.widgets["expression 1"],options:{...r.widgets["expression 1"].options,...this.state}}}}}render(){const e=Object.freeze({});return c("div",{className:p.css(m.wrapper),children:[i("div",{className:p.css(m.editorWrapper),children:i(l,{...this.state,onChange:t=>{this.setState({...t})}})}),i(g,{question:this.mergeQuestionWithState(),apiOptions:e,reviewMode:!0})]})}}const o=d=>i(f,{}),r={content:`This is a cool expression question

[[☃ expression 1]]

`,images:{},widgets:{"expression 1":{alignment:"default",graded:!0,options:{answerForms:[{considered:"correct",form:!0,key:"0",simplify:!1,value:"16+88i"}],buttonSets:["basic"],functions:["f","g","h"],times:!1},static:!1,type:"expression",version:{major:1,minor:0}}}},m=p.StyleSheet.create({wrapper:{padding:50},editorWrapper:{paddingBottom:100}});o.__docgenInfo={description:"",methods:[],displayName:"Debug"};var s,n,a;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <WithDebug />;
}`,...(a=(n=o.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const dr=["Debug"];export{o as Debug,dr as __namedExportsOrder,ar as default};