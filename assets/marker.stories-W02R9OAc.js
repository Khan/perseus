import{j as p}from"./jsx-runtime-BGVbfQ2Z.js";import{a as i}from"./chunk-WFFRPTHA-zlNDxfrq.js";import{l}from"./index-awljIyHI.js";import{M as u}from"./marker-_4LIcIBm.js";import"./index-qhcEwEpg.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./preview-errors-7FWlPnjy.js";import"./index-PPLHz8o0.js";import"./article-renderer-rRl5DFLq.js";import"./compare-59FC1ybr.js";import"./version-akiLXZts.js";import"./prop-types-vQnmTrRW.js";import"./index-lUErx3pE.js";import"./index-J2t_5nK1.js";import"./index-E09jvG0x.js";import"./index-3xb9Ri9D.js";import"./index-oMd7J_hd.js";import"./tabbar-_VM3Ijmc.js";import"./item-HTAlbNMZ.js";import"./index-TeOhC3cV.js";import"./index-tvtfaFq4.js";import"./button-assets-cmoMUwP4.js";import"./keypad-button-41QiUrLb.js";import"./operators-page-jZhMvB4n.js";import"./navigation-pad-GvGLKm0w.js";import"./index-JT1-kTlx.js";import"./key-translator-yjRRNSuW.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./invariant-bu5zBsRS.js";import"./enums-x5qaTru7.js";import"./perseus-error-l3K_anoI.js";import"./renderer-YMwVTw_k.js";import"./index-dnMhQZ-1.js";import"./jquery-5v7aFUvu.js";import"./index-default-4_ZsnO94.js";import"./asset-context-pmjKTqqL.js";import"./svg-image-A17_gkxe.js";import"./index-TymzEsVR.js";import"./dependencies-fnqF3NiV.js";import"./util-hMu2nkBL.js";import"./fixed-to-responsive-ybwlrogx.js";import"./constants-I_nlPaPx.js";import"./inline-icon-MJBS_-2U.js";import"./icon-paths-AuJwhOz7.js";import"./image-loader-BrzYBUzY.js";import"./tex-SwZEYYPF.js";import"./zoomable-QW77xrsT.js";import"./zoomable-tex-LJgLrbXQ.js";import"./perseus-api-XkoWPDUZ.js";import"./index-0C4KXdeC.js";import"./stub-tag-editor-f1WdYARp.js";import"./text-list-editor-xQBHt64k.js";import"./lint-4QkP-VXi.js";import"./index-JK7f6wub.js";import"./index-1lR5LStt.js";import"./index-B3k62xyQ.js";import"./index-O-KD2pfb.js";import"./index-KIBY7gd7.js";import"./Popper-uHddJoXq.js";import"./i18n-context-9-s9cJ--.js";import"./strings-YJ61eiUN.js";import"./math-input-N24XH-Sd.js";import"./index-_6fd2Dz3.js";import"./unit-Tx_erQ0l.js";import"./input-with-examples-yz1cRTAi.js";import"./text-input-yDsqFbe3.js";import"./index-ZObC1LzG.js";import"./minus-bold-ONmDo3Ve.js";import"./tooltip-K2JbXmT6.js";import"./simple-keypad-input-55p0fpKJ.js";import"./base-radio-P1bXxk6A.js";import"./media-queries-MaBBbpNq.js";import"./shared-3pf9YZIg.js";import"./choice-0QJfWvzE.js";import"./icon-HbAIhp4d.js";import"./choice-icon-8EqwF5gf.js";import"./focus-ring-SGFL5fpl.js";import"./option-status-atX5Qolq.js";import"./choice-none-above-uA3FBL2f.js";import"./video-transcript-link-BKfVoN1g.js";import"./answer-choices-BwZBRDRP.js";import"./button-group-eBTrRsKy.js";import"./graph-pwSeuXvn.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-3RuEOGQS.js";import"./hud-Q7Km3N9P.js";import"./info-tip-_E95qi8X.js";import"./multi-button-group-rHU9dGVb.js";import"./number-input-TyU6YAix.js";import"./prop-check-box-AM0eLeop.js";import"./range-input-iEradMpU.js";import"./marker-zA5QTbad.js";import"./answer-pill-ZdXJ3IOO.js";import"./sortable-6_LsuQ0i.js";import"./multi-renderer-EN5GCubG.js";import"./hints-renderer-4Qo-Mdjs.js";import"./components-vGtFGqPh.js";import"./util-RR67UMDN.js";import"./form-wrapped-text-field-OfCv3pEU.js";const no={title:"PerseusEditor/Widgets/Label Image/Marker"},v=l.StyleSheet.create({wrapper:{marginTop:150,position:"relative",width:32,height:32}}),h=m=>p("div",{className:l.css(v.wrapper),children:p(u,{...m})}),o=m=>p(h,{...{answers:[],choices:[],label:"",onChange:(...r)=>{i("onChange")(...r)},onRemove:(...r)=>{i("onRemove")(...r)},x:50,y:50}}),t=m=>p(h,{...{answers:["BMW","Ferrari"],choices:["Lamborghini","BMW","Volkswagen","Fiat","Porsche","Ferrari"],label:"Automotive",onChange:(...r)=>{i("onChange")(...r)},onRemove:(...r)=>{i("onRemove")(...r)},x:50,y:50}});var e,s,n;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(g=(c=t.parameters)==null?void 0:c.docs)==null?void 0:g.source}}};const ao=["Empty","WithAnswers"];export{o as Empty,t as WithAnswers,ao as __namedExportsOrder,no as default};
