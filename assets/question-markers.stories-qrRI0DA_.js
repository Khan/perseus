import{j as r}from"./jsx-runtime-BGVbfQ2Z.js";import{l as p}from"./index-awljIyHI.js";import{r as w}from"./index-qhcEwEpg.js";import{Q as b}from"./question-markers-1t93jlYe.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./article-renderer-SKG7SapZ.js";import"./compare-VLxlEkSV.js";import"./version-akiLXZts.js";import"./index-default-4_ZsnO94.js";import"./prop-types-fFJpPeTy.js";import"./index-fuyzzUuV.js";import"./index-J2t_5nK1.js";import"./index-E09jvG0x.js";import"./index-oh0ULguc.js";import"./index-4c2J3ov1.js";import"./tabbar-4UDQk7cN.js";import"./item-P3WrK4af.js";import"./index-1P5txiDe.js";import"./index-tvtfaFq4.js";import"./button-assets-j_a3DoNi.js";import"./keypad-button-YUQpjb9n.js";import"./operators-page-z1_bgPo7.js";import"./navigation-pad-WomDHo4v.js";import"./index-uu39Elyn.js";import"./key-translator-wunrbeOa.js";import"./index-uTjn352v.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./renderer-iSFrzCHv.js";import"./index-awCzqCwC.js";import"./jquery-5v7aFUvu.js";import"./asset-context-pmjKTqqL.js";import"./svg-image-2-s0UD4j.js";import"./index-ntsnGU3X.js";import"./dependencies-fnqF3NiV.js";import"./perseus-error-OpXxk17X.js";import"./util-WDUWldFA.js";import"./fixed-to-responsive-G5J_wmel.js";import"./constants-I_nlPaPx.js";import"./inline-icon-MJBS_-2U.js";import"./icon-paths-fAaGW1jp.js";import"./image-loader-BrzYBUzY.js";import"./tex-SwZEYYPF.js";import"./zoomable-QW77xrsT.js";import"./zoomable-tex-LJgLrbXQ.js";import"./perseus-api-Ly41NhN4.js";import"./stub-tag-editor-CaJYfBue.js";import"./text-list-editor-bJphcq85.js";import"./lint-4QkP-VXi.js";import"./index-cRKslbtI.js";import"./index-fdRf1OJX.js";import"./index-Fg8WJp4t.js";import"./index-_15Y2y0p.js";import"./index-RrkX9P05.js";import"./Popper-2p8US95Y.js";import"./math-input-ULVcRJZN.js";import"./unit-ofwaj6cd.js";import"./input-with-examples-c24ECy26.js";import"./math-output-o5-UebzW.js";import"./text-input-aDhxqzgd.js";import"./index-to4e0yK9.js";import"./tooltip-K2JbXmT6.js";import"./simple-keypad-input-opb1sbhj.js";import"./base-radio-JUrgbypf.js";import"./media-queries-MaBBbpNq.js";import"./shared-3pf9YZIg.js";import"./choice-KfPbqG3R.js";import"./icon-HbAIhp4d.js";import"./choice-icon-UwZ4yTHY.js";import"./focus-ring-SGFL5fpl.js";import"./option-status-EA5HzHH0.js";import"./choice-none-above-uTHQsuuW.js";import"./video-transcript-link-H-EyMwVm.js";import"./answer-choices-eIDZE_lE.js";import"./button-group-eBTrRsKy.js";import"./graph-9ZKRidTm.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-3RuEOGQS.js";import"./hud-Q7Km3N9P.js";import"./info-tip-Fae-O4h-.js";import"./multi-button-group-rHU9dGVb.js";import"./number-input-Pc1Bye7I.js";import"./prop-check-box-wRngoh_G.js";import"./range-input-YxWiV4Eo.js";import"./marker-O4FBqhuf.js";import"./answer-pill-vgiJKzKj.js";import"./sortable-Wi-dBbPR.js";import"./multi-renderer-HU5Uo-UM.js";import"./hints-renderer-jCIUV4Tj.js";import"./marker-ddBCoCdB.js";import"./components-Wi3ArvkT.js";import"./util-RXJ3igrq.js";import"./form-wrapped-text-field-VVekJaqG.js";const st={title:"Perseus Editor/Widgets/Label Image/Question Markers"},k=p.StyleSheet.create({wrapper:{width:338}}),W=t=>r("div",{className:p.css(k.wrapper),children:r(b,{...t})});class S extends w.Component{constructor(){super(...arguments),this.state={markers:[{answers:[],label:"",x:50,y:50}]}}render(){const{markers:m}=this.state;return r("div",{className:p.css(k.wrapper),children:r(b,{choices:["Lamborghini","BMW","Volkswagen","Fiat","Porsche","Ferrari"],imageUrl:"https://ka-perseus-images.s3.amazonaws.com/2ee5fc32e35c5178373b39fd304b325b2994c913.png",imageWidth:1280,imageHeight:1024,markers:m,onChange:f=>this.setState({markers:f})})})}}const o=t=>r(W,{...{choices:[],imageUrl:"",imageWidth:0,imageHeight:0,markers:[],onChange:()=>{}}}),e=t=>r(W,{...{choices:[],imageUrl:"https://ka-perseus-images.s3.amazonaws.com/2ee5fc32e35c5178373b39fd304b325b2994c913.png",imageWidth:1280,imageHeight:1024,markers:[{answers:[],label:"",x:50,y:50}],onChange:()=>{}}}),i=t=>r(S,{});var s,a,n;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const props = ({
    choices: [],
    imageUrl: "",
    imageWidth: 0,
    imageHeight: 0,
    markers: [],
    onChange: () => {}
  } as const);
  return <Wrapper {...props} />;
}`,...(n=(a=o.parameters)==null?void 0:a.docs)==null?void 0:n.source}}};var c,g,h;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const props = ({
    choices: [],
    imageUrl: "https://ka-perseus-images.s3.amazonaws.com/2ee5fc32e35c5178373b39fd304b325b2994c913.png",
    imageWidth: 1280,
    imageHeight: 1024,
    markers: [{
      answers: [],
      label: "",
      x: 50,
      y: 50
    }],
    onChange: () => {}
  } as const);
  return <Wrapper {...props} />;
}`,...(h=(g=e.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var l,d,u;i.parameters={...i.parameters,docs:{...(l=i.parameters)==null?void 0:l.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <WithState />;
}`,...(u=(d=i.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};const at=["Empty","Filled","Interactive"];export{o as Empty,e as Filled,i as Interactive,at as __namedExportsOrder,st as default};
