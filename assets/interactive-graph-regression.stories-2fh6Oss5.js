import{j as X}from"./jsx-runtime-63Ea5SlK.js";import{R as ur}from"./renderer-nz1EhU1V.js";import{m as dr}from"./i18n-context-QDJ9FYgZ.js";import{i as e}from"./interactive-graph-question-builder-00J3MhwK.js";import"./index-6oxdNXpR.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-default-4_ZsnO94.js";import"./index-VBBZE5E5.js";import"./perseus-error-l3K_anoI.js";import"./svg-image-Ah59ySlS.js";import"./index-wB6JGB7j.js";import"./index-awljIyHI.js";import"./index-Cj1jPHW9.js";import"./index-dmcq622U.js";import"./index-dnMhQZ-1.js";import"./jquery-5v7aFUvu.js";import"./dependencies-CP7Uh8Kq.js";import"./util-Deofanvy.js";import"./fixed-to-responsive-for_tVF1.js";import"./constants-iPV6vHZm.js";import"./index-J2t_5nK1.js";import"./client-Rb4DelHy.js";import"./index-9gkyvru-.js";import"./inline-icon-6fh0Wu1y.js";import"./icon-paths-5JCXzGsq.js";import"./image-loader-cBoFrbCq.js";import"./asset-context-H6Iqp7Gi.js";import"./tex-MX5FPdQh.js";import"./zoomable-_uYFBX1Q.js";import"./zoomable-tex-Jjwex-Ep.js";import"./perseus-api-_PWPZoDE.js";import"./index-IiwcBdIZ.js";import"./stub-tag-editor-3VEaZ-53.js";import"./text-list-editor-ND6Qift6.js";import"./lint-CRWxUAIQ.js";import"./index-smZ6iCr_.js";import"./tiny-invariant-bHgPayXn.js";const zr={title:"Perseus/Widgets/Interactive Graph Visual Regression Tests",component:pr,parameters:{chromatic:{disableSnapshot:!1}}};function cr(B){return X.jsx("div",{className:"framework-perseus perseus-mobile",children:X.jsx(B,{})})}const r={args:{question:e().withAxisLabels("\\text{Custom $x$ label}","\\text{Custom $y$ label}").build()}},s={args:{question:e().withGridStep(2.571,3.123).build()}},t={args:{question:e().withTickStep(1.5,1.5).build()}},a={args:{question:e().withMarkings("axes").build()}},i={args:{question:e().withMarkings("grid").build()}},o={args:{question:e().withMarkings("none").build()}},n={args:{question:e().withXRange(-2,2).withYRange(-2,2).build()}},c={args:{question:e().withXRange(-50,50).withYRange(-50,50).build()}},u={args:{question:e().withXRange(0,20).addLockedLine([1,1],[5,2]).build()}},d={args:{question:e().withXRange(-1,20).addLockedLine([1,1],[5,2]).build()}},p={args:{question:e().withXRange(-3,20).addLockedLine([1,1],[5,2]).build()}},m={args:{question:e().withXRange(1,20).build()}},g={args:{question:e().withXRange(6,20).build()}},h={args:{question:e().withXRange(-20,0).build()}},l={args:{question:e().withXRange(-20,-1).build()}},f={args:{question:e().withYRange(0,20).build()}},M={args:{question:e().withYRange(-1,20).build()}},b={args:{question:e().withYRange(1,20).build()}},w={args:{question:e().withYRange(-3,20).addLockedLine([-3,2],[5,16]).build()}},q={args:{question:e().withYRange(-20,0).build()}},R={args:{question:e().withYRange(-20,-1).build()}},W={args:{question:e().build()},decorators:[cr]},L={args:{question:e().withSegments({numSegments:3}).build()}},x={args:{question:e().withCircle().withXRange(-10,10).withYRange(-5,5).build()},decorators:[cr]},A={args:{question:e().addLockedLine([-3,-3],[3,3]).withXRange(-5,5).withYRange(-10,10).build()}},S={args:{question:e().addLockedPointAt(3,2).addLockedPointAt(-1,1).addLockedPointAt(0,-4).build()}},k={args:{question:e().addLockedLine([-1,1],[2,3]).build()}},G={args:{question:e().withProtractor().build()}};function pr(B){const{question:v}=B;return X.jsx(ur,{strings:dr,content:v.content,widgets:v.widgets,images:v.images,apiOptions:{flags:{mafs:{segment:!0,circle:!0,linear:!0}}}})}var Y,Q,O;r.parameters={...r.parameters,docs:{...(Y=r.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withAxisLabels("\\\\text{Custom $x$ label}", "\\\\text{Custom $y$ label}").build()
  }
}`,...(O=(Q=r.parameters)==null?void 0:Q.docs)==null?void 0:O.source}}};var C,P,N;s.parameters={...s.parameters,docs:{...(C=s.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withGridStep(2.571, 3.123).build()
  }
}`,...(N=(P=s.parameters)==null?void 0:P.docs)==null?void 0:N.source}}};var T,$,y;t.parameters={...t.parameters,docs:{...(T=t.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withTickStep(1.5, 1.5).build()
  }
}`,...(y=($=t.parameters)==null?void 0:$.docs)==null?void 0:y.source}}};var F,j,I;a.parameters={...a.parameters,docs:{...(F=a.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withMarkings("axes").build()
  }
}`,...(I=(j=a.parameters)==null?void 0:j.docs)==null?void 0:I.source}}};var J,D,E;i.parameters={...i.parameters,docs:{...(J=i.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withMarkings("grid").build()
  }
}`,...(E=(D=i.parameters)==null?void 0:D.docs)==null?void 0:E.source}}};var _,V,z;o.parameters={...o.parameters,docs:{...(_=o.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withMarkings("none").build()
  }
}`,...(z=(V=o.parameters)==null?void 0:V.docs)==null?void 0:z.source}}};var H,K,U;n.parameters={...n.parameters,docs:{...(H=n.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-2, 2).withYRange(-2, 2).build()
  }
}`,...(U=(K=n.parameters)==null?void 0:K.docs)==null?void 0:U.source}}};var Z,ee,re;c.parameters={...c.parameters,docs:{...(Z=c.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-50, 50).withYRange(-50, 50).build()
  }
}`,...(re=(ee=c.parameters)==null?void 0:ee.docs)==null?void 0:re.source}}};var se,te,ae;u.parameters={...u.parameters,docs:{...(se=u.parameters)==null?void 0:se.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(0, 20).addLockedLine([1, 1], [5, 2]).build()
  }
}`,...(ae=(te=u.parameters)==null?void 0:te.docs)==null?void 0:ae.source}}};var ie,oe,ne;d.parameters={...d.parameters,docs:{...(ie=d.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-1, 20).addLockedLine([1, 1], [5, 2]).build()
  }
}`,...(ne=(oe=d.parameters)==null?void 0:oe.docs)==null?void 0:ne.source}}};var ce,ue,de;p.parameters={...p.parameters,docs:{...(ce=p.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-3, 20).addLockedLine([1, 1], [5, 2]).build()
  }
}`,...(de=(ue=p.parameters)==null?void 0:ue.docs)==null?void 0:de.source}}};var pe,me,ge;m.parameters={...m.parameters,docs:{...(pe=m.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(1, 20).build()
  }
}`,...(ge=(me=m.parameters)==null?void 0:me.docs)==null?void 0:ge.source}}};var he,le,fe;g.parameters={...g.parameters,docs:{...(he=g.parameters)==null?void 0:he.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(6, 20).build()
  }
}`,...(fe=(le=g.parameters)==null?void 0:le.docs)==null?void 0:fe.source}}};var Me,be,we;h.parameters={...h.parameters,docs:{...(Me=h.parameters)==null?void 0:Me.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-20, 0).build()
  }
}`,...(we=(be=h.parameters)==null?void 0:be.docs)==null?void 0:we.source}}};var qe,Re,We;l.parameters={...l.parameters,docs:{...(qe=l.parameters)==null?void 0:qe.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-20, -1).build()
  }
}`,...(We=(Re=l.parameters)==null?void 0:Re.docs)==null?void 0:We.source}}};var Le,xe,Ae;f.parameters={...f.parameters,docs:{...(Le=f.parameters)==null?void 0:Le.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(0, 20).build()
  }
}`,...(Ae=(xe=f.parameters)==null?void 0:xe.docs)==null?void 0:Ae.source}}};var Se,ke,Ge;M.parameters={...M.parameters,docs:{...(Se=M.parameters)==null?void 0:Se.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-1, 20).build()
  }
}`,...(Ge=(ke=M.parameters)==null?void 0:ke.docs)==null?void 0:Ge.source}}};var Be,ve,Xe;b.parameters={...b.parameters,docs:{...(Be=b.parameters)==null?void 0:Be.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(1, 20).build()
  }
}`,...(Xe=(ve=b.parameters)==null?void 0:ve.docs)==null?void 0:Xe.source}}};var Ye,Qe,Oe;w.parameters={...w.parameters,docs:{...(Ye=w.parameters)==null?void 0:Ye.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-3, 20).addLockedLine([-3, 2], [5, 16]).build()
  }
}`,...(Oe=(Qe=w.parameters)==null?void 0:Qe.docs)==null?void 0:Oe.source}}};var Ce,Pe,Ne;q.parameters={...q.parameters,docs:{...(Ce=q.parameters)==null?void 0:Ce.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-20, 0).build()
  }
}`,...(Ne=(Pe=q.parameters)==null?void 0:Pe.docs)==null?void 0:Ne.source}}};var Te,$e,ye;R.parameters={...R.parameters,docs:{...(Te=R.parameters)==null?void 0:Te.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-20, -1).build()
  }
}`,...(ye=($e=R.parameters)==null?void 0:$e.docs)==null?void 0:ye.source}}};var Fe,je,Ie;W.parameters={...W.parameters,docs:{...(Fe=W.parameters)==null?void 0:Fe.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().build()
  },
  decorators: [MobileContainerDecorator]
}`,...(Ie=(je=W.parameters)==null?void 0:je.docs)==null?void 0:Ie.source}}};var Je,De,Ee;L.parameters={...L.parameters,docs:{...(Je=L.parameters)==null?void 0:Je.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withSegments({
      numSegments: 3
    }).build()
  }
}`,...(Ee=(De=L.parameters)==null?void 0:De.docs)==null?void 0:Ee.source}}};var _e,Ve,ze;x.parameters={...x.parameters,docs:{...(_e=x.parameters)==null?void 0:_e.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withCircle().withXRange(-10, 10).withYRange(-5, 5).build()
  },
  // NOTE(jeremy): I migrated these stories to the v3 CSF story format, but
  // I'm unclear why this one story forces mobile when none of the others do,
  // and this story doesn't look mobile-specific. :thinking:
  decorators: [MobileContainerDecorator]
}`,...(ze=(Ve=x.parameters)==null?void 0:Ve.docs)==null?void 0:ze.source}}};var He,Ke,Ue;A.parameters={...A.parameters,docs:{...(He=A.parameters)==null?void 0:He.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().addLockedLine([-3, -3], [3, 3]).withXRange(-5, 5).withYRange(-10, 10).build()
  }
}`,...(Ue=(Ke=A.parameters)==null?void 0:Ke.docs)==null?void 0:Ue.source}}};var Ze,er,rr;S.parameters={...S.parameters,docs:{...(Ze=S.parameters)==null?void 0:Ze.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().addLockedPointAt(3, 2).addLockedPointAt(-1, 1).addLockedPointAt(0, -4).build()
  }
}`,...(rr=(er=S.parameters)==null?void 0:er.docs)==null?void 0:rr.source}}};var sr,tr,ar;k.parameters={...k.parameters,docs:{...(sr=k.parameters)==null?void 0:sr.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().addLockedLine([-1, 1], [2, 3]).build()
  }
}`,...(ar=(tr=k.parameters)==null?void 0:tr.docs)==null?void 0:ar.source}}};var ir,or,nr;G.parameters={...G.parameters,docs:{...(ir=G.parameters)==null?void 0:ir.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withProtractor().build()
  }
}`,...(nr=(or=G.parameters)==null?void 0:or.docs)==null?void 0:nr.source}}};const Hr=["MafsWithCustomAxisLabels","MafsWithFractionalGridStep","MafsWithFractionalAxisTicks","MafsWithAxesMarkings","MafsWithGridMarkings","MafsWithNoMarkings","MafsWithSmallRange","MafsWithLargeRange","MafsWithYAxisAtLeft","MafsWithYAxisNearLeft","MafsWithYAxisJustOverLeft","MafsWithYAxisOffLeft","MafsWithYAxisOffFarLeft","MafsWithYAxisAtRight","MafsWithYAxisOffRight","MafsWithXAxisAtBottom","MafsWithXAxisNearBottom","MafsWithXAxisOffBottom","MafsWithXAxisJustOverBottom","MafsWithXAxisAtTop","MafsWithXAxisOffTop","MafsInMobileContainer","MafsWithMultipleSegments","MafsCircleGraphWithNonsquareRange","MafsLineGraphWithNonsquareRange","MafsWithLockedPoints","MafsWithLockedLine","MafsWithProtractor"];export{x as MafsCircleGraphWithNonsquareRange,W as MafsInMobileContainer,A as MafsLineGraphWithNonsquareRange,a as MafsWithAxesMarkings,r as MafsWithCustomAxisLabels,t as MafsWithFractionalAxisTicks,s as MafsWithFractionalGridStep,i as MafsWithGridMarkings,c as MafsWithLargeRange,k as MafsWithLockedLine,S as MafsWithLockedPoints,L as MafsWithMultipleSegments,o as MafsWithNoMarkings,G as MafsWithProtractor,n as MafsWithSmallRange,f as MafsWithXAxisAtBottom,q as MafsWithXAxisAtTop,w as MafsWithXAxisJustOverBottom,M as MafsWithXAxisNearBottom,b as MafsWithXAxisOffBottom,R as MafsWithXAxisOffTop,u as MafsWithYAxisAtLeft,h as MafsWithYAxisAtRight,p as MafsWithYAxisJustOverLeft,d as MafsWithYAxisNearLeft,g as MafsWithYAxisOffFarLeft,m as MafsWithYAxisOffLeft,l as MafsWithYAxisOffRight,Hr as __namedExportsOrder,zr as default};
