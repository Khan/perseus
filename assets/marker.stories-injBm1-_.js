import{j as i}from"./jsx-runtime-FVsy8kgq.js";import{a as p}from"./chunk-WFFRPTHA-zlNDxfrq.js";import{l as h}from"./index-awljIyHI.js";import{M as u}from"./marker-RdMB1eiZ.js";import"./index-TT1qJ6UJ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./preview-errors-7FWlPnjy.js";import"./index-PPLHz8o0.js";import"./article-renderer-oAjiGKk7.js";import"./util-Q3BXsyUV.js";import"./version-akiLXZts.js";import"./perseus-error-l3K_anoI.js";import"./index-default-4_ZsnO94.js";import"./jquery-5v7aFUvu.js";import"./prop-types-nSWwc1hR.js";import"./mobile-keypad-6FB87h35.js";import"./index-7vsPyIck.js";import"./index-CkAxGj88.js";import"./index-J2t_5nK1.js";import"./index-6h5t6F0w.js";import"./index-deFLJwr4.js";import"./tabbar-qQQo4fB1.js";import"./item--2I-4f2E.js";import"./index-u34vH4Ah.js";import"./index-tvtfaFq4.js";import"./button-assets-txIojR3b.js";import"./keypad-button-Oyhkb2Xv.js";import"./operators-page-eUz2SZPX.js";import"./navigation-pad-L84zJoYQ.js";import"./key-translator-w6GK8UdZ.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./renderer-_VS37mk6.js";import"./index-dnMhQZ-1.js";import"./asset-context-I7yIqWki.js";import"./svg-image-1KPe8aE1.js";import"./index-ngddCaVG.js";import"./dependencies-8XILypbq.js";import"./fixed-to-responsive-1fSZ1n--.js";import"./constants-I_nlPaPx.js";import"./client-rbWgHzHN.js";import"./inline-icon-tKY1iMkH.js";import"./icon-paths-AuJwhOz7.js";import"./image-loader-mgyZcN0j.js";import"./tex-VP4hirbI.js";import"./zoomable-CA1NzpZD.js";import"./zoomable-tex-MZi7Hqbp.js";import"./perseus-api-TZuPrt69.js";import"./stub-tag-editor-PtEloNzA.js";import"./text-list-editor-oYfrC68v.js";import"./lint-I_5mQeXl.js";import"./index-sNnTAXhT.js";import"./index-xuPsLuPk.js";import"./index-KnMeZIm4.js";import"./index--wY930uG.js";import"./index-h_CiYGGb.js";import"./Popper-kGnKOid7.js";import"./i18n-context-W41LcU6B.js";import"./strings-4Ql_kQxk.js";import"./math-input-7QTcx3Ho.js";import"./index-dTfPrQ97.js";import"./phet-simulation-UoycPENr.js";import"./arrow-square-out-bold-090vdhrx.js";import"./input-with-examples-Id57pxBf.js";import"./text-input-UKLpKhjh.js";import"./index-aLQwBKgs.js";import"./minus-bold-ONmDo3Ve.js";import"./tooltip-S_hcgkAT.js";import"./simple-keypad-input-vsRGHRFI.js";import"./base-radio-tGYiHWel.js";import"./media-queries-MaBBbpNq.js";import"./shared-3pf9YZIg.js";import"./choice-fYS92oPm.js";import"./index-qUyqkRvh.js";import"./icon-YuYiVxsK.js";import"./choice-icon-tgwIPBbY.js";import"./focus-ring-sgSTt4fM.js";import"./option-status-GwxF4Pf4.js";import"./choice-none-above-BfNQKOBW.js";import"./answer-choices-0G6D5qUP.js";import"./button-group-nsoLlHtM.js";import"./graph-7upsjcvo.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-7jAAHVxW.js";import"./hud-FI3E3dT_.js";import"./multi-button-group-a0iIfrwx.js";import"./number-input-pCzft7OM.js";import"./range-input-ayWbl0Ct.js";import"./marker-aR8pbMaX.js";import"./answer-pill-v_78Q0di.js";import"./sortable-Z65T0-N6.js";import"./video-transcript-link-iTc4P2FB.js";import"./multi-renderer-udw9K5Sh.js";import"./hints-renderer-xXQhzKns.js";import"./components-H6FlNzQ8.js";import"./util-4qmc0eF9.js";import"./form-wrapped-text-field-VKlNIOk1.js";const eo={title:"PerseusEditor/Widgets/Label Image/Marker"},y=h.StyleSheet.create({wrapper:{marginTop:150,position:"relative",width:32,height:32}}),l=m=>i("div",{className:h.css(y.wrapper),children:i(u,{...m})}),o=m=>i(l,{...{answers:[],choices:[],label:"",onChange:(...r)=>{p("onChange")(...r)},onRemove:(...r)=>{p("onRemove")(...r)},x:50,y:50}}),t=m=>i(l,{...{answers:["BMW","Ferrari"],choices:["Lamborghini","BMW","Volkswagen","Fiat","Porsche","Ferrari"],label:"Automotive",onChange:(...r)=>{p("onChange")(...r)},onRemove:(...r)=>{p("onRemove")(...r)},x:50,y:50}});o.__docgenInfo={description:"",methods:[],displayName:"Empty"};t.__docgenInfo={description:"",methods:[],displayName:"WithAnswers"};var e,s,n;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
