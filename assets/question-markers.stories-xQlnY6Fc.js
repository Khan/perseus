import{j as r}from"./jsx-runtime-5BUNAZ9W.js";import{l as p}from"./index-awljIyHI.js";import{r as W}from"./index-4g5l5LRQ.js";import{Q as b}from"./question-markers-UGWUnffp.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./article-renderer-K4Kq0STP.js";import"./util-KY8kJaBW.js";import"./version-akiLXZts.js";import"./jquery-yG1GhClm.js";import"./prop-types-ew9eayR0.js";import"./index-lUErx3pE.js";import"./index-J2t_5nK1.js";import"./index-jmm5gWkb.js";import"./mobile-keypad-8hkmmP-T.js";import"./index-FsYHUvK_.js";import"./index-e4P84RkC.js";import"./tabbar-tY-vWj59.js";import"./item-kdyp1JvI.js";import"./index-Cz55-Vre.js";import"./index-tvtfaFq4.js";import"./button-assets-W0P3gTHH.js";import"./keypad-button-dkA26ccQ.js";import"./operators-page-AaL31SSd.js";import"./navigation-pad-J3QJzD-6.js";import"./key-translator-NrLPOiYy.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./renderer-O9Ux9vXX.js";import"./index-dnMhQZ-1.js";import"./asset-context-4nzQV6k0.js";import"./svg-image-UfCByHtE.js";import"./index-zXbQRqKp.js";import"./dependencies-9B_Bv_mA.js";import"./fixed-to-responsive-Q2lYGnje.js";import"./constants-I_nlPaPx.js";import"./client-MU6fCXSs.js";import"./inline-icon-QIU9thzn.js";import"./icon-paths-AuJwhOz7.js";import"./image-loader-s-naDkf8.js";import"./tex-Co-L2gRx.js";import"./zoomable-fMxvjK02.js";import"./zoomable-tex-ZKYDI9ak.js";import"./perseus-api-GqFoxb6z.js";import"./stub-tag-editor--1JgemZ6.js";import"./text-list-editor--7RKQsFY.js";import"./lint-IvfTv29b.js";import"./index-unb9_VrH.js";import"./index-zE8cp1oq.js";import"./index-zHEZmPKZ.js";import"./index-skotlSua.js";import"./index-QR_wlop5.js";import"./x-6ZxseNgc.js";import"./index-wjVcXLkf.js";import"./Popper-D86xJ3go.js";import"./i18n-context-SHL040F7.js";import"./strings-U4LenZoO.js";import"./math-input-WlXFmeVO.js";import"./index-GPnNv0mI.js";import"./input-with-examples-NsXNTdNW.js";import"./text-input-Q1V0RBx1.js";import"./index-_rEjQfTM.js";import"./minus-bold-ONmDo3Ve.js";import"./tooltip-vkx2pUmk.js";import"./simple-keypad-input-tVloz1vV.js";import"./base-radio-Md_S9nzg.js";import"./media-queries-MaBBbpNq.js";import"./shared-3pf9YZIg.js";import"./choice-S5THRw8V.js";import"./icon-TA3bBVIW.js";import"./choice-icon-Fa6RfAAR.js";import"./focus-ring-dCiEd0Hc.js";import"./option-status-_NngQfjZ.js";import"./choice-none-above-6H_eppBZ.js";import"./video-transcript-link-jDAvsjOz.js";import"./answer-choices-9MonqSxj.js";import"./button-group-KR3umc1e.js";import"./graph-VKYZ1zR1.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-ylPat90q.js";import"./hud-CJYktPgf.js";import"./multi-button-group-AxfQn4Cq.js";import"./number-input-_vmR2dDD.js";import"./range-input-W6BaCFKq.js";import"./marker-AseUKQsH.js";import"./answer-pill-YAqgpGMm.js";import"./sortable-WMtUiFt8.js";import"./multi-renderer-7BOHy2dW.js";import"./hints-renderer-_SHNb6_u.js";import"./marker-8dcSApcU.js";import"./components-E7mzsreM.js";import"./util-Bz6Wi_gr.js";import"./form-wrapped-text-field-NPfBI0Tl.js";const pt={title:"PerseusEditor/Widgets/Label Image/Question Markers"},f=p.StyleSheet.create({wrapper:{width:338}}),k=t=>r("div",{className:p.css(f.wrapper),children:r(b,{...t})});class w extends W.Component{constructor(){super(...arguments),this.state={markers:[{answers:[],label:"",x:50,y:50}]}}render(){const{markers:m}=this.state;return r("div",{className:p.css(f.wrapper),children:r(b,{choices:["Lamborghini","BMW","Volkswagen","Fiat","Porsche","Ferrari"],imageUrl:"https://ka-perseus-images.s3.amazonaws.com/2ee5fc32e35c5178373b39fd304b325b2994c913.png",imageWidth:1280,imageHeight:1024,markers:m,onChange:y=>this.setState({markers:y})})})}}const o=t=>r(k,{...{choices:[],imageUrl:"",imageWidth:0,imageHeight:0,markers:[],onChange:()=>{}}}),e=t=>r(k,{...{choices:[],imageUrl:"https://ka-perseus-images.s3.amazonaws.com/2ee5fc32e35c5178373b39fd304b325b2994c913.png",imageWidth:1280,imageHeight:1024,markers:[{answers:[],label:"",x:50,y:50}],onChange:()=>{}}}),i=t=>r(w,{});o.__docgenInfo={description:"",methods:[],displayName:"Empty"};e.__docgenInfo={description:"",methods:[],displayName:"Filled"};i.__docgenInfo={description:"",methods:[],displayName:"Interactive"};var s,a,n;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
