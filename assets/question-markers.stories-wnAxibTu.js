import{j as r}from"./jsx-runtime-BGVbfQ2Z.js";import{l as p}from"./index-awljIyHI.js";import{r as w}from"./index-qhcEwEpg.js";import{Q as b}from"./question-markers-OxOZqluY.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./article-renderer-LmcxA9wi.js";import"./compare-VLxlEkSV.js";import"./version-akiLXZts.js";import"./index-default-4_ZsnO94.js";import"./prop-types-kPsd7mQ-.js";import"./index-V35CFGao.js";import"./index-Hz0Gzck5.js";import"./index-J2t_5nK1.js";import"./index-E09jvG0x.js";import"./index-ro9eMDh3.js";import"./index-eZ2N530f.js";import"./tabbar-KlCELibv.js";import"./item-5Y8pErNg.js";import"./index-srUwhG8U.js";import"./index-tvtfaFq4.js";import"./button-assets-K2ZoY3Yc.js";import"./keypad-button-VkYP-uH6.js";import"./operators-page-8wHRNqBi.js";import"./navigation-pad-dX3NhTAE.js";import"./index-uu39Elyn.js";import"./key-translator-_9bpijyh.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./renderer-FLo8F5rM.js";import"./index-awCzqCwC.js";import"./jquery-5v7aFUvu.js";import"./asset-context-pmjKTqqL.js";import"./svg-image-YvWarZkB.js";import"./index-4IQmaM8V.js";import"./dependencies-fnqF3NiV.js";import"./perseus-error-OpXxk17X.js";import"./util-jqcWD9IE.js";import"./fixed-to-responsive-G5J_wmel.js";import"./constants-I_nlPaPx.js";import"./inline-icon-MJBS_-2U.js";import"./icon-paths-fAaGW1jp.js";import"./image-loader-BrzYBUzY.js";import"./tex-SwZEYYPF.js";import"./zoomable-QW77xrsT.js";import"./zoomable-tex-LJgLrbXQ.js";import"./perseus-api-Ly41NhN4.js";import"./stub-tag-editor-CaJYfBue.js";import"./text-list-editor-bJphcq85.js";import"./lint-4QkP-VXi.js";import"./index-L6PIa4US.js";import"./index-PqxJEXty.js";import"./index-A0DvNMpb.js";import"./index-K7FSCCGN.js";import"./index-5wVX51Nj.js";import"./index-SM3muJE2.js";import"./Popper-2p8US95Y.js";import"./math-input-q0JvItIR.js";import"./unit-tpB2tohZ.js";import"./input-with-examples-3twPDpeh.js";import"./math-output-o5-UebzW.js";import"./text-input-uBWtJznI.js";import"./index-vHSkRTKf.js";import"./tooltip-K2JbXmT6.js";import"./simple-keypad-input-s67b1Adp.js";import"./base-radio-9rnRpXz9.js";import"./media-queries-MaBBbpNq.js";import"./shared-3pf9YZIg.js";import"./choice-iPCOE-Yr.js";import"./icon-HbAIhp4d.js";import"./choice-icon-xGdQdsqz.js";import"./focus-ring-4m7DGTUl.js";import"./option-status-lQr4Jfyh.js";import"./choice-none-above-K2PPkreY.js";import"./video-transcript-link-EcJNVxEf.js";import"./answer-choices-Pn7hga-P.js";import"./button-group-eBTrRsKy.js";import"./graph-apb4acmV.js";import"./bundle.esm-3RuEOGQS.js";import"./hud-Q7Km3N9P.js";import"./info-tip-Lk8Jr-mP.js";import"./multi-button-group-rHU9dGVb.js";import"./number-input-OD1ToMin.js";import"./prop-check-box-wH3pF7aO.js";import"./range-input-3ju1pU_r.js";import"./marker-zxlfsTLy.js";import"./answer-pill-Z3_ar520.js";import"./sortable-AETXfb4s.js";import"./multi-renderer-LjUzxURe.js";import"./hints-renderer-TxlHMl9S.js";import"./marker-XQEuUjU9.js";import"./components-4Sxi7UY-.js";import"./util-r1Dnrca2.js";import"./form-wrapped-text-field-tnrYB9GL.js";const st={title:"Perseus/Editor/Widgets/Label Image/Question Markers"},k=p.StyleSheet.create({wrapper:{width:338}}),W=t=>r("div",{className:p.css(k.wrapper),children:r(b,{...t})});class S extends w.Component{constructor(){super(...arguments),this.state={markers:[{answers:[],label:"",x:50,y:50}]}}render(){const{markers:m}=this.state;return r("div",{className:p.css(k.wrapper),children:r(b,{choices:["Lamborghini","BMW","Volkswagen","Fiat","Porsche","Ferrari"],imageUrl:"https://ka-perseus-images.s3.amazonaws.com/2ee5fc32e35c5178373b39fd304b325b2994c913.png",imageWidth:1280,imageHeight:1024,markers:m,onChange:f=>this.setState({markers:f})})})}}const o=t=>r(W,{...{choices:[],imageUrl:"",imageWidth:0,imageHeight:0,markers:[],onChange:()=>{}}}),e=t=>r(W,{...{choices:[],imageUrl:"https://ka-perseus-images.s3.amazonaws.com/2ee5fc32e35c5178373b39fd304b325b2994c913.png",imageWidth:1280,imageHeight:1024,markers:[{answers:[],label:"",x:50,y:50}],onChange:()=>{}}}),i=t=>r(S,{});var s,a,n;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
