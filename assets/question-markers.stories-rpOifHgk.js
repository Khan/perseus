import{j as r}from"./jsx-runtime-5BUNAZ9W.js";import{l as p}from"./index-awljIyHI.js";import{r as W}from"./index-4g5l5LRQ.js";import{Q as b}from"./question-markers-7hXpOLZt.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./article-renderer-mAfgFNpR.js";import"./util-KY8kJaBW.js";import"./version-akiLXZts.js";import"./jquery-yG1GhClm.js";import"./prop-types-m2woFJUg.js";import"./index-lUErx3pE.js";import"./index-J2t_5nK1.js";import"./index-jmm5gWkb.js";import"./mobile-keypad-cY_XnmKN.js";import"./index-FsYHUvK_.js";import"./index-e4P84RkC.js";import"./tabbar-bBu8F0LR.js";import"./item-m8Nh1pVx.js";import"./index-Cz55-Vre.js";import"./index-tvtfaFq4.js";import"./button-assets-Z9EPvaqZ.js";import"./keypad-button--EiKtrcz.js";import"./operators-page-6_sBHI_n.js";import"./navigation-pad-Mri7Skbs.js";import"./key-translator-TewQj1fb.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./renderer-pli2TMa5.js";import"./index-dnMhQZ-1.js";import"./asset-context-4nzQV6k0.js";import"./svg-image-UfCByHtE.js";import"./index-zXbQRqKp.js";import"./dependencies-9B_Bv_mA.js";import"./fixed-to-responsive-Q2lYGnje.js";import"./constants-I_nlPaPx.js";import"./client-MU6fCXSs.js";import"./inline-icon-QIU9thzn.js";import"./icon-paths-AuJwhOz7.js";import"./image-loader-s-naDkf8.js";import"./tex-Co-L2gRx.js";import"./zoomable-fMxvjK02.js";import"./zoomable-tex-ZKYDI9ak.js";import"./perseus-api-GqFoxb6z.js";import"./stub-tag-editor--1JgemZ6.js";import"./text-list-editor--7RKQsFY.js";import"./lint-IvfTv29b.js";import"./index-8nUh1h5D.js";import"./index-zE8cp1oq.js";import"./index-hihFCi2M.js";import"./index-skotlSua.js";import"./index-KZ9xT8RQ.js";import"./x-6ZxseNgc.js";import"./index-wjVcXLkf.js";import"./Popper-D86xJ3go.js";import"./i18n-context-SHL040F7.js";import"./strings-U4LenZoO.js";import"./math-input-2kaZn-qQ.js";import"./index-GPnNv0mI.js";import"./input-with-examples-CjW7Da2q.js";import"./text-input-wkUsDgzz.js";import"./index-YQYcT5qz.js";import"./minus-bold-ONmDo3Ve.js";import"./tooltip-vkx2pUmk.js";import"./simple-keypad-input-foIzcx54.js";import"./base-radio-zkDiNGbB.js";import"./media-queries-MaBBbpNq.js";import"./shared-3pf9YZIg.js";import"./choice-oTvvoS3K.js";import"./icon-TA3bBVIW.js";import"./choice-icon-Fa6RfAAR.js";import"./focus-ring-dCiEd0Hc.js";import"./option-status-_NngQfjZ.js";import"./choice-none-above-Vho8qiQ4.js";import"./video-transcript-link-jDAvsjOz.js";import"./answer-choices-KtMb4KU2.js";import"./button-group-KR3umc1e.js";import"./graph-VKYZ1zR1.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-ylPat90q.js";import"./hud-CJYktPgf.js";import"./multi-button-group-AxfQn4Cq.js";import"./number-input-_vmR2dDD.js";import"./range-input-W6BaCFKq.js";import"./marker-y8HT1OEI.js";import"./answer-pill-lkxcWMEQ.js";import"./sortable-X6tDHNEp.js";import"./multi-renderer-MCXnPgij.js";import"./hints-renderer-q11RVp2Y.js";import"./marker-dAev1L48.js";import"./components-7_mvsqhN.js";import"./util-Vy3v7tG2.js";import"./form-wrapped-text-field-675BOsRF.js";const pt={title:"PerseusEditor/Widgets/Label Image/Question Markers"},f=p.StyleSheet.create({wrapper:{width:338}}),k=t=>r("div",{className:p.css(f.wrapper),children:r(b,{...t})});class w extends W.Component{constructor(){super(...arguments),this.state={markers:[{answers:[],label:"",x:50,y:50}]}}render(){const{markers:m}=this.state;return r("div",{className:p.css(f.wrapper),children:r(b,{choices:["Lamborghini","BMW","Volkswagen","Fiat","Porsche","Ferrari"],imageUrl:"https://ka-perseus-images.s3.amazonaws.com/2ee5fc32e35c5178373b39fd304b325b2994c913.png",imageWidth:1280,imageHeight:1024,markers:m,onChange:y=>this.setState({markers:y})})})}}const o=t=>r(k,{...{choices:[],imageUrl:"",imageWidth:0,imageHeight:0,markers:[],onChange:()=>{}}}),e=t=>r(k,{...{choices:[],imageUrl:"https://ka-perseus-images.s3.amazonaws.com/2ee5fc32e35c5178373b39fd304b325b2994c913.png",imageWidth:1280,imageHeight:1024,markers:[{answers:[],label:"",x:50,y:50}],onChange:()=>{}}}),i=t=>r(w,{});o.__docgenInfo={description:"",methods:[],displayName:"Empty"};e.__docgenInfo={description:"",methods:[],displayName:"Filled"};i.__docgenInfo={description:"",methods:[],displayName:"Interactive"};var s,a,n;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const props = ({
    choices: [],
    imageUrl: "",
    imageWidth: 0,
    imageHeight: 0,
    markers: [],
    onChange: () => {}
  } as const);
  return <Wrapper {...props} />;
}`,...(n=(a=o.parameters)==null?void 0:a.docs)==null?void 0:n.source}}};var c,g,d;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(d=(g=e.parameters)==null?void 0:g.docs)==null?void 0:d.source}}};var l,h,u;i.parameters={...i.parameters,docs:{...(l=i.parameters)==null?void 0:l.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <WithState />;
}`,...(u=(h=i.parameters)==null?void 0:h.docs)==null?void 0:u.source}}};const st=["Empty","Filled","Interactive"];export{o as Empty,e as Filled,i as Interactive,st as __namedExportsOrder,pt as default};
