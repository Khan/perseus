import{j as r}from"./jsx-runtime-5BUNAZ9W.js";import{l as p}from"./index-awljIyHI.js";import{r as W}from"./index-4g5l5LRQ.js";import{Q as b}from"./question-markers-ktJfCYSj.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./article-renderer-5OJBCfzT.js";import"./util-KY8kJaBW.js";import"./version-akiLXZts.js";import"./jquery-yG1GhClm.js";import"./prop-types-zMIQXwU0.js";import"./mobile-keypad-cY_XnmKN.js";import"./index-jmm5gWkb.js";import"./index-FsYHUvK_.js";import"./index-J2t_5nK1.js";import"./index-e4P84RkC.js";import"./index-lUErx3pE.js";import"./tabbar-bBu8F0LR.js";import"./item-m8Nh1pVx.js";import"./index-Cz55-Vre.js";import"./index-tvtfaFq4.js";import"./button-assets-Z9EPvaqZ.js";import"./keypad-button--EiKtrcz.js";import"./operators-page-6_sBHI_n.js";import"./navigation-pad-Mri7Skbs.js";import"./key-translator-Hs3Uhnzm.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./renderer-zs11neBD.js";import"./index-dnMhQZ-1.js";import"./asset-context-4nzQV6k0.js";import"./svg-image-UfCByHtE.js";import"./index-zXbQRqKp.js";import"./dependencies-9B_Bv_mA.js";import"./fixed-to-responsive-Q2lYGnje.js";import"./constants-I_nlPaPx.js";import"./client-MU6fCXSs.js";import"./inline-icon-QIU9thzn.js";import"./icon-paths-AuJwhOz7.js";import"./image-loader-s-naDkf8.js";import"./tex-Co-L2gRx.js";import"./zoomable-fMxvjK02.js";import"./zoomable-tex-ZKYDI9ak.js";import"./perseus-api-GqFoxb6z.js";import"./stub-tag-editor--1JgemZ6.js";import"./text-list-editor--7RKQsFY.js";import"./lint-IvfTv29b.js";import"./index-8nUh1h5D.js";import"./index-zE8cp1oq.js";import"./index-hihFCi2M.js";import"./index-skotlSua.js";import"./index-KZ9xT8RQ.js";import"./x-6ZxseNgc.js";import"./index-wjVcXLkf.js";import"./Popper-D86xJ3go.js";import"./i18n-context-5R-kLn05.js";import"./strings-f8zw0_o5.js";import"./math-input-6SkbBwHq.js";import"./index-GPnNv0mI.js";import"./input-with-examples-AME1ueLx.js";import"./text-input-wkUsDgzz.js";import"./index-YQYcT5qz.js";import"./minus-bold-ONmDo3Ve.js";import"./tooltip-vkx2pUmk.js";import"./simple-keypad-input-Kh9rQ9F_.js";import"./base-radio-LpW5mNw9.js";import"./media-queries-MaBBbpNq.js";import"./shared-3pf9YZIg.js";import"./choice--doa5VMp.js";import"./icon-TA3bBVIW.js";import"./choice-icon-LY8yd0no.js";import"./focus-ring-dCiEd0Hc.js";import"./option-status-7w42WRhj.js";import"./choice-none-above-rimbSuz5.js";import"./video-transcript-link-92OgvJfI.js";import"./answer-choices-aG9t2SUR.js";import"./button-group-KR3umc1e.js";import"./graph-VKYZ1zR1.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-ylPat90q.js";import"./hud-CJYktPgf.js";import"./multi-button-group-AxfQn4Cq.js";import"./number-input-CBpHDTnb.js";import"./range-input-pIZWHWbz.js";import"./marker-nLmLZLOi.js";import"./answer-pill-5loCz_CO.js";import"./sortable-nJRD4nnB.js";import"./multi-renderer-q7RM_s5L.js";import"./hints-renderer-iCAhrl75.js";import"./marker-LNpdCW9X.js";import"./components-4f87eP1B.js";import"./util--MgOawjh.js";import"./form-wrapped-text-field-99Ltr1zS.js";const pt={title:"PerseusEditor/Widgets/Label Image/Question Markers"},f=p.StyleSheet.create({wrapper:{width:338}}),k=t=>r("div",{className:p.css(f.wrapper),children:r(b,{...t})});class w extends W.Component{constructor(){super(...arguments),this.state={markers:[{answers:[],label:"",x:50,y:50}]}}render(){const{markers:m}=this.state;return r("div",{className:p.css(f.wrapper),children:r(b,{choices:["Lamborghini","BMW","Volkswagen","Fiat","Porsche","Ferrari"],imageUrl:"https://ka-perseus-images.s3.amazonaws.com/2ee5fc32e35c5178373b39fd304b325b2994c913.png",imageWidth:1280,imageHeight:1024,markers:m,onChange:y=>this.setState({markers:y})})})}}const o=t=>r(k,{...{choices:[],imageUrl:"",imageWidth:0,imageHeight:0,markers:[],onChange:()=>{}}}),e=t=>r(k,{...{choices:[],imageUrl:"https://ka-perseus-images.s3.amazonaws.com/2ee5fc32e35c5178373b39fd304b325b2994c913.png",imageWidth:1280,imageHeight:1024,markers:[{answers:[],label:"",x:50,y:50}],onChange:()=>{}}}),i=t=>r(w,{});o.__docgenInfo={description:"",methods:[],displayName:"Empty"};e.__docgenInfo={description:"",methods:[],displayName:"Filled"};i.__docgenInfo={description:"",methods:[],displayName:"Interactive"};var s,a,n;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
