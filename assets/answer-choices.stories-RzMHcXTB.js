import{j as t}from"./jsx-runtime-63Ea5SlK.js";import{L as k}from"./index-18qWGOW7.js";import{r as a}from"./index-6oxdNXpR.js";import{A as C}from"./answer-choices-lVeJkx-U.js";import"./index-0DbkllkJ.js";import"./index-awljIyHI.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-i1pBWAmI.js";import"./react-router-dom-VIBHfbW6.js";import"./index-deFLJwr4.js";import"./index-469F30Ub.js";import"./minus-bold-ONmDo3Ve.js";import"./index-9gkyvru-.js";import"./index-f-3iKkZU.js";import"./index-7-BESUpx.js";import"./Popper-Y5KDXl-P.js";import"./index-jxhLXBHb.js";import"./i18n-context-fsWEgybQ.js";import"./renderer-1DxKQj1_.js";import"./version-akiLXZts.js";import"./perseus-error-l3K_anoI.js";import"./invariant-bu5zBsRS.js";import"./index-J2t_5nK1.js";import"./index-dnMhQZ-1.js";import"./jquery-yG1GhClm.js";import"./asset-context-H6Iqp7Gi.js";import"./svg-image-7aOK05RI.js";import"./dependencies-CP7Uh8Kq.js";import"./util-AYeX86gl.js";import"./fixed-to-responsive-for_tVF1.js";import"./constants-iPV6vHZm.js";import"./index-Dfd6auV6.js";import"./client-Rb4DelHy.js";import"./inline-icon-6fh0Wu1y.js";import"./icon-paths-5JCXzGsq.js";import"./image-loader-qoercD2n.js";import"./tex-MX5FPdQh.js";import"./zoomable-_uYFBX1Q.js";import"./zoomable-tex-Jjwex-Ep.js";import"./perseus-api-1-ethIrW.js";import"./index-k-0mNqHS.js";import"./stub-tag-editor-qMhJW4bS.js";import"./text-list-editor-aj1SAzcA.js";import"./lint-CRWxUAIQ.js";const he={title:"Perseus/Widgets/Label Image/Answer Choices"},_=[{content:"Lamborghini",checked:!1},{content:"BMW",checked:!1},{content:"Volkswagen",checked:!1},{content:"Fiat",checked:!1},{content:"$\\displaystyle f(x)=\\frac{1}{x}$",checked:!1},{content:"Porsche",checked:!1},{content:"Ferrari",checked:!1}],h=({multipleSelect:s=!1})=>{const[i,u]=a.useState([..._]),[g,f]=a.useState(!1),S=e=>{u([...i.map((x,j)=>({...x,checked:e[j]}))])};return t.jsxs(t.Fragment,{children:[t.jsx(C,{choices:i,multipleSelect:s,onChange:e=>S(e),opener:()=>t.jsx("button",{children:g?"Close":"Open"}),onToggle:e=>f(e),disabled:!1}),t.jsx(t.Fragment,{children:i.filter(({checked:e})=>e).map(({content:e})=>t.jsx(k,{children:e},e))})]})},r=s=>t.jsx(h,{}),o=s=>t.jsx(h,{multipleSelect:!0});r.__docgenInfo={description:"",methods:[],displayName:"SingleSelect"};o.__docgenInfo={description:"",methods:[],displayName:"MultipleSelect"};var c,m,p;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <WithState />;
}`,...(p=(m=r.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var n,l,d;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <WithState multipleSelect={true} />;
}`,...(d=(l=o.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};const ue=["SingleSelect","MultipleSelect"];export{o as MultipleSelect,r as SingleSelect,ue as __namedExportsOrder,he as default};