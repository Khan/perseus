import{j as r}from"./jsx-runtime-BGVbfQ2Z.js";import{l as p}from"./index-awljIyHI.js";import{r as w}from"./index-qhcEwEpg.js";import{Q as b}from"./question-markers-HXp-ORii.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./article-renderer-OoSV0ipl.js";import"./compare-VLxlEkSV.js";import"./version-akiLXZts.js";import"./index-default-4_ZsnO94.js";import"./prop-types-7k0xoVJO.js";import"./index-25YgVP-A.js";import"./index-J2t_5nK1.js";import"./index-E09jvG0x.js";import"./index-JlHdd4kR.js";import"./index-4c2J3ov1.js";import"./tabbar-0ADFFMFf.js";import"./item-Xl3u6w2R.js";import"./index-IxqgEL7X.js";import"./index-tvtfaFq4.js";import"./button-assets-cmoMUwP4.js";import"./keypad-button-Xf3EMv8Q.js";import"./operators-page-oziijydk.js";import"./navigation-pad-tBxIIqLP.js";import"./index-uu39Elyn.js";import"./key-translator-s4FBkb4c.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./renderer-Wb2DaYYn.js";import"./index-awCzqCwC.js";import"./jquery-5v7aFUvu.js";import"./asset-context-pmjKTqqL.js";import"./svg-image-poqCQSyv.js";import"./index-Or3qlYxC.js";import"./dependencies-fnqF3NiV.js";import"./perseus-error-OpXxk17X.js";import"./util-WvQWLN3r.js";import"./fixed-to-responsive-G5J_wmel.js";import"./constants-I_nlPaPx.js";import"./inline-icon-MJBS_-2U.js";import"./icon-paths-fAaGW1jp.js";import"./image-loader-BrzYBUzY.js";import"./tex-SwZEYYPF.js";import"./zoomable-QW77xrsT.js";import"./zoomable-tex-LJgLrbXQ.js";import"./perseus-api-Ly41NhN4.js";import"./stub-tag-editor-CaJYfBue.js";import"./text-list-editor-bJphcq85.js";import"./lint-4QkP-VXi.js";import"./index-7T2lngWb.js";import"./index-d9IHWphb.js";import"./index-Fg8WJp4t.js";import"./index-_15Y2y0p.js";import"./index-BrnICqZg.js";import"./Popper-2p8US95Y.js";import"./i18n-context-9-s9cJ--.js";import"./strings-YJ61eiUN.js";import"./math-input-GHTdTe09.js";import"./index-h2JMrIr3.js";import"./unit-1L4OY2_r.js";import"./input-with-examples-7Vnal2l5.js";import"./math-output-o5-UebzW.js";import"./text-input-77oq4TCL.js";import"./index-sXD0g-3O.js";import"./tooltip-K2JbXmT6.js";import"./simple-keypad-input-TeiJTgBZ.js";import"./base-radio-xekGTTHM.js";import"./media-queries-MaBBbpNq.js";import"./shared-3pf9YZIg.js";import"./choice-RxyDdJg6.js";import"./icon-HbAIhp4d.js";import"./choice-icon-vIIlTgls.js";import"./focus-ring-SGFL5fpl.js";import"./option-status-_ONChKTK.js";import"./choice-none-above-h_sDiStO.js";import"./video-transcript-link-wp-Fzerj.js";import"./answer-choices-zbYZCy3M.js";import"./button-group-eBTrRsKy.js";import"./graph-a5VTgKei.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-3RuEOGQS.js";import"./hud-Q7Km3N9P.js";import"./info-tip-GL4ov8Im.js";import"./multi-button-group-rHU9dGVb.js";import"./number-input-CBSxyfjJ.js";import"./prop-check-box-OYeLup7m.js";import"./range-input-YYhLn03P.js";import"./marker-kvmyDvYD.js";import"./answer-pill-zw05MYdT.js";import"./sortable-g0pvHT5_.js";import"./multi-renderer-nC1GqpnN.js";import"./hints-renderer-rLnwZcEs.js";import"./marker-VTpxlFnB.js";import"./components-K98IFuqq.js";import"./util-RXJ3igrq.js";import"./form-wrapped-text-field--7Jb2AQP.js";const nt={title:"PerseusEditor/Widgets/Label Image/Question Markers"},k=p.StyleSheet.create({wrapper:{width:338}}),W=t=>r("div",{className:p.css(k.wrapper),children:r(b,{...t})});class S extends w.Component{constructor(){super(...arguments),this.state={markers:[{answers:[],label:"",x:50,y:50}]}}render(){const{markers:m}=this.state;return r("div",{className:p.css(k.wrapper),children:r(b,{choices:["Lamborghini","BMW","Volkswagen","Fiat","Porsche","Ferrari"],imageUrl:"https://ka-perseus-images.s3.amazonaws.com/2ee5fc32e35c5178373b39fd304b325b2994c913.png",imageWidth:1280,imageHeight:1024,markers:m,onChange:f=>this.setState({markers:f})})})}}const o=t=>r(W,{...{choices:[],imageUrl:"",imageWidth:0,imageHeight:0,markers:[],onChange:()=>{}}}),e=t=>r(W,{...{choices:[],imageUrl:"https://ka-perseus-images.s3.amazonaws.com/2ee5fc32e35c5178373b39fd304b325b2994c913.png",imageWidth:1280,imageHeight:1024,markers:[{answers:[],label:"",x:50,y:50}],onChange:()=>{}}}),i=t=>r(S,{});var s,a,n;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(u=(d=i.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};const ct=["Empty","Filled","Interactive"];export{o as Empty,e as Filled,i as Interactive,ct as __namedExportsOrder,nt as default};
