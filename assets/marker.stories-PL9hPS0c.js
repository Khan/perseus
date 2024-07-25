import{j as i}from"./jsx-runtime-5BUNAZ9W.js";import{a as p}from"./chunk-WFFRPTHA-zlNDxfrq.js";import{l as h}from"./index-awljIyHI.js";import{M as u}from"./marker-Zflij6tA.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./preview-errors-7FWlPnjy.js";import"./index-PPLHz8o0.js";import"./article-renderer-zhRnwZOg.js";import"./util-TKXSNoh3.js";import"./version-akiLXZts.js";import"./perseus-error-l3K_anoI.js";import"./index-default-4_ZsnO94.js";import"./jquery-5v7aFUvu.js";import"./prop-types-4qPBfWmq.js";import"./index-lUErx3pE.js";import"./index-J2t_5nK1.js";import"./index-jmm5gWkb.js";import"./mobile-keypad-_omH0y9g.js";import"./index-FsYHUvK_.js";import"./index-e4P84RkC.js";import"./tabbar-Oqt6c7oQ.js";import"./item-BvwJUNFE.js";import"./index-Cz55-Vre.js";import"./index-tvtfaFq4.js";import"./button-assets-W0P3gTHH.js";import"./keypad-button-dkA26ccQ.js";import"./operators-page-AaL31SSd.js";import"./navigation-pad-J3QJzD-6.js";import"./key-translator-2vF_So3l.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./renderer-y7JKQjFK.js";import"./index-dnMhQZ-1.js";import"./asset-context-4nzQV6k0.js";import"./svg-image-oYAG2f52.js";import"./index-zXbQRqKp.js";import"./dependencies-9B_Bv_mA.js";import"./fixed-to-responsive-Q2lYGnje.js";import"./constants-I_nlPaPx.js";import"./client-MU6fCXSs.js";import"./inline-icon-QIU9thzn.js";import"./icon-paths-AuJwhOz7.js";import"./image-loader-A74C9PE_.js";import"./tex-Co-L2gRx.js";import"./zoomable-fMxvjK02.js";import"./zoomable-tex-ZKYDI9ak.js";import"./perseus-api-cFDIds9P.js";import"./stub-tag-editor-HTvc7FsQ.js";import"./text-list-editor-A-LpoxgU.js";import"./lint-IvfTv29b.js";import"./info-tip-7k4XWhfR.js";import"./index-zE8cp1oq.js";import"./index-zHEZmPKZ.js";import"./index-skotlSua.js";import"./index-QR_wlop5.js";import"./x-6ZxseNgc.js";import"./index-wjVcXLkf.js";import"./Popper-D86xJ3go.js";import"./i18n-context-3gTlIcWM.js";import"./strings-YJ61eiUN.js";import"./math-input-b0AfbzvY.js";import"./index-wgZGcu4m.js";import"./input-with-examples-AmCUa6lJ.js";import"./text-input-Q1V0RBx1.js";import"./index-_rEjQfTM.js";import"./minus-bold-ONmDo3Ve.js";import"./tooltip-vkx2pUmk.js";import"./simple-keypad-input-3R2CyUYq.js";import"./base-radio-g9_PPwpo.js";import"./media-queries-MaBBbpNq.js";import"./shared-3pf9YZIg.js";import"./choice--TeDH0lH.js";import"./icon-TA3bBVIW.js";import"./choice-icon-cBSCcTMf.js";import"./focus-ring-dCiEd0Hc.js";import"./option-status-o8Ma0JxL.js";import"./choice-none-above-tGaxJhBZ.js";import"./video-transcript-link-6o6i_Fnt.js";import"./answer-choices-owVNK_dc.js";import"./button-group-KR3umc1e.js";import"./graph-pewJN-kC.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-ylPat90q.js";import"./hud-CJYktPgf.js";import"./multi-button-group-AxfQn4Cq.js";import"./number-input-JKQiwz_W.js";import"./prop-check-box-f7I2HerX.js";import"./range-input--OPosy8W.js";import"./marker-a4IchvEr.js";import"./answer-pill-7iHnEXjS.js";import"./sortable-WyuT5T5o.js";import"./multi-renderer-ambvVR-o.js";import"./hints-renderer-LoUW7vqd.js";import"./components-_RNVLdhX.js";import"./util-ls3z633i.js";import"./form-wrapped-text-field-VxGZpcU4.js";const eo={title:"PerseusEditor/Widgets/Label Image/Marker"},y=h.StyleSheet.create({wrapper:{marginTop:150,position:"relative",width:32,height:32}}),l=m=>i("div",{className:h.css(y.wrapper),children:i(u,{...m})}),o=m=>i(l,{...{answers:[],choices:[],label:"",onChange:(...r)=>{p("onChange")(...r)},onRemove:(...r)=>{p("onRemove")(...r)},x:50,y:50}}),t=m=>i(l,{...{answers:["BMW","Ferrari"],choices:["Lamborghini","BMW","Volkswagen","Fiat","Porsche","Ferrari"],label:"Automotive",onChange:(...r)=>{p("onChange")(...r)},onRemove:(...r)=>{p("onRemove")(...r)},x:50,y:50}});o.__docgenInfo={description:"",methods:[],displayName:"Empty"};t.__docgenInfo={description:"",methods:[],displayName:"WithAnswers"};var e,s,n;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const props = ({
    answers: [],
    choices: [],
    label: "",
    onChange: (...args) => {
      action("onChange")(...args);
    },
    onRemove: (...args) => {
      action("onRemove")(...args);
    },
    x: 50,
    y: 50
  } as const);
  return <Wrapper {...props} />;
}`,...(n=(s=o.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};var a,c,g;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const props = ({
    answers: ["BMW", "Ferrari"],
    choices: ["Lamborghini", "BMW", "Volkswagen", "Fiat", "Porsche", "Ferrari"],
    label: "Automotive",
    onChange: (...args) => {
      action("onChange")(...args);
    },
    onRemove: (...args) => {
      action("onRemove")(...args);
    },
    x: 50,
    y: 50
  } as const);
  return <Wrapper {...props} />;
}`,...(g=(c=t.parameters)==null?void 0:c.docs)==null?void 0:g.source}}};const so=["Empty","WithAnswers"];export{o as Empty,t as WithAnswers,so as __namedExportsOrder,eo as default};
