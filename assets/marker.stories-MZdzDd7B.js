import{j as i}from"./jsx-runtime-FVsy8kgq.js";import{a as p}from"./chunk-WFFRPTHA-zlNDxfrq.js";import{l as h}from"./index-awljIyHI.js";import{M as u}from"./marker-ObQHdknL.js";import"./index-TT1qJ6UJ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./preview-errors-7FWlPnjy.js";import"./index-PPLHz8o0.js";import"./article-renderer-B3a5AOTz.js";import"./util-F8-MDmsT.js";import"./version-akiLXZts.js";import"./jquery-yG1GhClm.js";import"./prop-types-USJa6TEW.js";import"./mobile-keypad-FAAYdnZl.js";import"./index-7vsPyIck.js";import"./index-CkAxGj88.js";import"./index-J2t_5nK1.js";import"./index-6h5t6F0w.js";import"./index-deFLJwr4.js";import"./tabbar-WYCYDof0.js";import"./item-X9tjzx12.js";import"./index-2dmvOE3q.js";import"./react-router-dom-W_e8xVUu.js";import"./index-tvtfaFq4.js";import"./button-assets-7ktaymgV.js";import"./keypad-button-jI4mTut6.js";import"./operators-page-3iLxVcON.js";import"./navigation-pad-OHJ-nokQ.js";import"./key-translator-fG0zRKO4.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./invariant-bu5zBsRS.js";import"./enums-x5qaTru7.js";import"./renderer-isFAG50x.js";import"./index-dnMhQZ-1.js";import"./asset-context-I7yIqWki.js";import"./i18n-context-vLFBfHTg.js";import"./svg-image-QKR8YXWf.js";import"./dependencies-8XILypbq.js";import"./fixed-to-responsive-AkRQxH3P.js";import"./constants-iPV6vHZm.js";import"./client-rbWgHzHN.js";import"./inline-icon-tKY1iMkH.js";import"./icon-paths-AuJwhOz7.js";import"./image-loader-mgyZcN0j.js";import"./tex-VP4hirbI.js";import"./zoomable-CA1NzpZD.js";import"./zoomable-tex-MZi7Hqbp.js";import"./perseus-api-mOiZT07d.js";import"./index-k-0mNqHS.js";import"./stub-tag-editor-Hmby24Jq.js";import"./text-list-editor-pe7AGDAl.js";import"./lint--ywkTlk8.js";import"./index-K9BSJPWl.js";import"./index-xuPsLuPk.js";import"./index-YCTzZMik.js";import"./index-rfN0X25E.js";import"./index-o3wWn3Y5.js";import"./index-h_CiYGGb.js";import"./Popper-kGnKOid7.js";import"./math-input-bD_fkCqU.js";import"./index-WNT3sUKf.js";import"./index-BPSWBbj5.js";import"./input-with-examples-aSjV2N9O.js";import"./text-input-15gEhfDF.js";import"./index-QCAhLhLD.js";import"./minus-bold-ONmDo3Ve.js";import"./tooltip-S_hcgkAT.js";import"./simple-keypad-input-dl6DKjCR.js";import"./base-radio-7Mwkxvpv.js";import"./media-queries-gbofTbz-.js";import"./shared-4TdECMLk.js";import"./choice-D4XD19hc.js";import"./index-ngddCaVG.js";import"./index-qUyqkRvh.js";import"./icon-YuYiVxsK.js";import"./choice-icon-leO-MukQ.js";import"./focus-ring-22L_uhmX.js";import"./option-status-dMSPdnXL.js";import"./choice-none-above-g3tM3Sry.js";import"./phet-simulation-t2MmZhV5.js";import"./arrow-square-out-bold-090vdhrx.js";import"./answer-choices-opduCWAn.js";import"./button-group-nsoLlHtM.js";import"./graph-bSP67F6m.js";import"./index-IIMKO4_x.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-7jAAHVxW.js";import"./hud-WFKWq8xK.js";import"./multi-button-group-a0iIfrwx.js";import"./number-input-g6MYyxRe.js";import"./range-input-fCdrNH5B.js";import"./marker-PDy6odzO.js";import"./answer-pill-9S1lg_Mj.js";import"./sortable-OA9BYG5N.js";import"./video-transcript-link-XLofc3H-.js";import"./multi-renderer-nCo4427v.js";import"./hints-renderer-2IbvQnz8.js";import"./components-o9vQdbai.js";import"./util-qk2aeK8X.js";import"./form-wrapped-text-field-6asMsAu_.js";const ao={title:"PerseusEditor/Widgets/Label Image/Marker"},y=h.StyleSheet.create({wrapper:{marginTop:150,position:"relative",width:32,height:32}}),l=m=>i("div",{className:h.css(y.wrapper),children:i(u,{...m})}),o=m=>i(l,{...{answers:[],choices:[],label:"",onChange:(...r)=>{p("onChange")(...r)},onRemove:(...r)=>{p("onRemove")(...r)},x:50,y:50}}),t=m=>i(l,{...{answers:["BMW","Ferrari"],choices:["Lamborghini","BMW","Volkswagen","Fiat","Porsche","Ferrari"],label:"Automotive",onChange:(...r)=>{p("onChange")(...r)},onRemove:(...r)=>{p("onRemove")(...r)},x:50,y:50}});o.__docgenInfo={description:"",methods:[],displayName:"Empty"};t.__docgenInfo={description:"",methods:[],displayName:"WithAnswers"};var e,s,n;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(g=(c=t.parameters)==null?void 0:c.docs)==null?void 0:g.source}}};const co=["Empty","WithAnswers"];export{o as Empty,t as WithAnswers,co as __namedExportsOrder,ao as default};
