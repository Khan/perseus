import{j as r}from"./jsx-runtime-BGVbfQ2Z.js";import{l as p}from"./index-awljIyHI.js";import{r as w}from"./index-qhcEwEpg.js";import{Q as b}from"./question-markers-Utwv24P_.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./article-renderer-qAzmhpSG.js";import"./compare-VLxlEkSV.js";import"./version-akiLXZts.js";import"./index-default-4_ZsnO94.js";import"./prop-types-18HXJOop.js";import"./index-lUErx3pE.js";import"./index-J2t_5nK1.js";import"./index-E09jvG0x.js";import"./index-halg33Zp.js";import"./index-4c2J3ov1.js";import"./tabbar-_HYg3Kcf.js";import"./item-MgaZQyPg.js";import"./index-VhM44oCk.js";import"./index-tvtfaFq4.js";import"./button-assets-cmoMUwP4.js";import"./keypad-button-BUF7auet.js";import"./operators-page-H6dLcd0l.js";import"./navigation-pad-URlj9thj.js";import"./index-JT1-kTlx.js";import"./key-translator-t-qTln-I.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./renderer-9dy5MCqC.js";import"./index-dnMhQZ-1.js";import"./jquery-5v7aFUvu.js";import"./asset-context-pmjKTqqL.js";import"./svg-image-K2-sSw7D.js";import"./index-mohBxQl_.js";import"./dependencies-fnqF3NiV.js";import"./perseus-error-OpXxk17X.js";import"./util-WvQWLN3r.js";import"./fixed-to-responsive-ybwlrogx.js";import"./constants-I_nlPaPx.js";import"./inline-icon-MJBS_-2U.js";import"./icon-paths-AuJwhOz7.js";import"./image-loader-BrzYBUzY.js";import"./tex-SwZEYYPF.js";import"./zoomable-QW77xrsT.js";import"./zoomable-tex-LJgLrbXQ.js";import"./perseus-api-Ly41NhN4.js";import"./stub-tag-editor-CaJYfBue.js";import"./text-list-editor-bJphcq85.js";import"./lint-4QkP-VXi.js";import"./index-bfZeEiF5.js";import"./index-Fk0JNZQD.js";import"./index-2Es7CZJJ.js";import"./index-_15Y2y0p.js";import"./index-h47zdzUa.js";import"./Popper-uHddJoXq.js";import"./i18n-context-9-s9cJ--.js";import"./strings-YJ61eiUN.js";import"./math-input-AcRqfdqV.js";import"./index-hU7TnBqE.js";import"./unit-1L4OY2_r.js";import"./input-with-examples-Qtv5hjfZ.js";import"./math-output-o5-UebzW.js";import"./text-input-GIma_XqC.js";import"./index-KktidPha.js";import"./tooltip-K2JbXmT6.js";import"./simple-keypad-input-A9uEOuum.js";import"./base-radio-k7WnshVw.js";import"./media-queries-MaBBbpNq.js";import"./shared-3pf9YZIg.js";import"./choice-PH0yrPYg.js";import"./icon-HbAIhp4d.js";import"./choice-icon-8EqwF5gf.js";import"./focus-ring-SGFL5fpl.js";import"./option-status-atX5Qolq.js";import"./choice-none-above-QvP72MZ8.js";import"./video-transcript-link-g12jSPmn.js";import"./answer-choices-_eCGRFWs.js";import"./button-group-eBTrRsKy.js";import"./graph-gX7mFe7S.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-3RuEOGQS.js";import"./hud-Q7Km3N9P.js";import"./info-tip-BoVrgmxI.js";import"./multi-button-group-rHU9dGVb.js";import"./number-input-QmtkIb5a.js";import"./prop-check-box-U5TrzrfJ.js";import"./range-input-IMzA4hKn.js";import"./marker-OX44YJJ9.js";import"./answer-pill-v4PNCWwW.js";import"./sortable-v0XP6F0w.js";import"./multi-renderer-xPPtcP82.js";import"./hints-renderer-ISphOZ2X.js";import"./marker-qZaQjaZl.js";import"./components-fyuLUWh0.js";import"./util-cblgOEF4.js";import"./form-wrapped-text-field-nDnnTPB4.js";const nt={title:"PerseusEditor/Widgets/Label Image/Question Markers"},k=p.StyleSheet.create({wrapper:{width:338}}),W=t=>r("div",{className:p.css(k.wrapper),children:r(b,{...t})});class S extends w.Component{constructor(){super(...arguments),this.state={markers:[{answers:[],label:"",x:50,y:50}]}}render(){const{markers:m}=this.state;return r("div",{className:p.css(k.wrapper),children:r(b,{choices:["Lamborghini","BMW","Volkswagen","Fiat","Porsche","Ferrari"],imageUrl:"https://ka-perseus-images.s3.amazonaws.com/2ee5fc32e35c5178373b39fd304b325b2994c913.png",imageWidth:1280,imageHeight:1024,markers:m,onChange:f=>this.setState({markers:f})})})}}const o=t=>r(W,{...{choices:[],imageUrl:"",imageWidth:0,imageHeight:0,markers:[],onChange:()=>{}}}),e=t=>r(W,{...{choices:[],imageUrl:"https://ka-perseus-images.s3.amazonaws.com/2ee5fc32e35c5178373b39fd304b325b2994c913.png",imageWidth:1280,imageHeight:1024,markers:[{answers:[],label:"",x:50,y:50}],onChange:()=>{}}}),i=t=>r(S,{});var s,a,n;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
