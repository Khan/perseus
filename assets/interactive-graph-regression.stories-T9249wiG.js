import{j as Y}from"./jsx-runtime-63Ea5SlK.js";import{A as gr}from"./perseus-api-DO0X8arb.js";import{R as hr}from"./renderer-5W1KYZ8O.js";import{m as lr}from"./i18n-context-_hhyRM-i.js";import{i as e}from"./interactive-graph-question-builder-00J3MhwK.js";import{j as fr}from"./interactive-graph.testdata-qM68PLwC.js";import"./index-6oxdNXpR.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-o42urCig.js";import"./stub-tag-editor-3VEaZ-53.js";import"./text-list-editor-ND6Qift6.js";import"./jquery-5v7aFUvu.js";import"./index-9gkyvru-.js";import"./index-default-4_ZsnO94.js";import"./core-widget-registry-uiKfW1Am.js";import"./perseus-error-l3K_anoI.js";import"./util-gHYooniF.js";import"./get-decimal-separator-c07pHhM9.js";import"./index-J2t_5nK1.js";import"./index-dnMhQZ-1.js";import"./zoomable-tex-OTkyDBc-.js";import"./tex-MX5FPdQh.js";import"./dependencies-CP7Uh8Kq.js";import"./zoomable-pOEbOEqK.js";import"./svg-image-e2j_53PB.js";import"./index-oE4Tpxqm.js";import"./no-important-xCWWYXQR.js";import"./index-_3CKOwHy.js";import"./index-QHkT31Yt.js";import"./fixed-to-responsive-I_PLOgi8.js";import"./constants-qvNmarDy.js";import"./client-Rb4DelHy.js";import"./inline-icon-6fh0Wu1y.js";import"./icon-paths-5JCXzGsq.js";import"./image-loader-cBoFrbCq.js";import"./lint-r_VdOcfh.js";import"./index-smZ6iCr_.js";import"./tiny-invariant-bHgPayXn.js";const ss={title:"Perseus/Widgets/Interactive Graph Visual Regression Tests",component:Mr,parameters:{chromatic:{disableSnapshot:!1}}};function mr(v){return Y.jsx("div",{className:"framework-perseus perseus-mobile",children:Y.jsx(v,{})})}const r={args:{question:e().withAxisLabels("\\text{Custom $x$ label}","\\text{Custom $y$ label}").build()}},s={args:{question:e().withGridStep(2.571,3.123).build()}},t={args:{question:e().withTickStep(1.5,1.5).build()}},a={args:{question:e().withMarkings("axes").build()}},i={args:{question:e().withMarkings("grid").build()}},o={args:{question:e().withMarkings("none").build()}},n={args:{question:e().withXRange(-2,2).withYRange(-2,2).build()}},c={args:{question:e().withXRange(-50,50).withYRange(-50,50).build()}},u={args:{question:e().withXRange(0,20).addLockedLine([1,1],[5,2]).build()}},d={args:{question:e().withXRange(-1,20).addLockedLine([1,1],[5,2]).build()}},p={args:{question:e().withXRange(-3,20).addLockedLine([1,1],[5,2]).build()}},m={args:{question:e().withXRange(1,20).build()}},g={args:{question:e().withXRange(6,20).build()}},h={args:{question:e().withXRange(-20,0).build()}},l={args:{question:e().withXRange(-20,-1).build()}},f={args:{question:e().withYRange(0,20).build()}},M={args:{question:e().withYRange(-1,20).build()}},b={args:{question:e().withYRange(1,20).build()}},w={args:{question:e().withYRange(-3,20).addLockedLine([-3,2],[5,16]).build()}},q={args:{question:e().withYRange(-20,0).build()}},R={args:{question:e().withYRange(-20,-1).build()}},W={args:{question:e().build()},decorators:[mr]},L={args:{question:e().withSegments({numSegments:3}).build()}},A={args:{question:e().withCircle().withXRange(-10,10).withYRange(-5,5).build()},decorators:[mr]},x={args:{question:e().addLockedLine([-3,-3],[3,3]).withXRange(-5,5).withYRange(-10,10).build()}},k={args:{question:e().addLockedPointAt(3,2).addLockedPointAt(-1,1).addLockedPointAt(0,-4).build()}},S={args:{question:e().addLockedLine([-1,1],[2,3]).build()}},G={args:{question:e().withProtractor().build()}},B={args:{question:fr}};function Mr(v){const{question:X}=v;return Y.jsx(hr,{strings:lr,content:X.content,widgets:X.widgets,images:X.images,apiOptions:gr.defaults})}var Q,O,P;r.parameters={...r.parameters,docs:{...(Q=r.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withAxisLabels("\\\\text{Custom $x$ label}", "\\\\text{Custom $y$ label}").build()
  }
}`,...(P=(O=r.parameters)==null?void 0:O.docs)==null?void 0:P.source}}};var C,T,N;s.parameters={...s.parameters,docs:{...(C=s.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withGridStep(2.571, 3.123).build()
  }
}`,...(N=(T=s.parameters)==null?void 0:T.docs)==null?void 0:N.source}}};var $,j,y;t.parameters={...t.parameters,docs:{...($=t.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withTickStep(1.5, 1.5).build()
  }
}`,...(y=(j=t.parameters)==null?void 0:j.docs)==null?void 0:y.source}}};var F,I,J;a.parameters={...a.parameters,docs:{...(F=a.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withMarkings("axes").build()
  }
}`,...(J=(I=a.parameters)==null?void 0:I.docs)==null?void 0:J.source}}};var D,E,_;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withMarkings("grid").build()
  }
}`,...(_=(E=i.parameters)==null?void 0:E.docs)==null?void 0:_.source}}};var V,z,H;o.parameters={...o.parameters,docs:{...(V=o.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withMarkings("none").build()
  }
}`,...(H=(z=o.parameters)==null?void 0:z.docs)==null?void 0:H.source}}};var K,U,Z;n.parameters={...n.parameters,docs:{...(K=n.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-2, 2).withYRange(-2, 2).build()
  }
}`,...(Z=(U=n.parameters)==null?void 0:U.docs)==null?void 0:Z.source}}};var ee,re,se;c.parameters={...c.parameters,docs:{...(ee=c.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-50, 50).withYRange(-50, 50).build()
  }
}`,...(se=(re=c.parameters)==null?void 0:re.docs)==null?void 0:se.source}}};var te,ae,ie;u.parameters={...u.parameters,docs:{...(te=u.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(0, 20).addLockedLine([1, 1], [5, 2]).build()
  }
}`,...(ie=(ae=u.parameters)==null?void 0:ae.docs)==null?void 0:ie.source}}};var oe,ne,ce;d.parameters={...d.parameters,docs:{...(oe=d.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-1, 20).addLockedLine([1, 1], [5, 2]).build()
  }
}`,...(ce=(ne=d.parameters)==null?void 0:ne.docs)==null?void 0:ce.source}}};var ue,de,pe;p.parameters={...p.parameters,docs:{...(ue=p.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-3, 20).addLockedLine([1, 1], [5, 2]).build()
  }
}`,...(pe=(de=p.parameters)==null?void 0:de.docs)==null?void 0:pe.source}}};var me,ge,he;m.parameters={...m.parameters,docs:{...(me=m.parameters)==null?void 0:me.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(1, 20).build()
  }
}`,...(he=(ge=m.parameters)==null?void 0:ge.docs)==null?void 0:he.source}}};var le,fe,Me;g.parameters={...g.parameters,docs:{...(le=g.parameters)==null?void 0:le.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(6, 20).build()
  }
}`,...(Me=(fe=g.parameters)==null?void 0:fe.docs)==null?void 0:Me.source}}};var be,we,qe;h.parameters={...h.parameters,docs:{...(be=h.parameters)==null?void 0:be.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-20, 0).build()
  }
}`,...(qe=(we=h.parameters)==null?void 0:we.docs)==null?void 0:qe.source}}};var Re,We,Le;l.parameters={...l.parameters,docs:{...(Re=l.parameters)==null?void 0:Re.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-20, -1).build()
  }
}`,...(Le=(We=l.parameters)==null?void 0:We.docs)==null?void 0:Le.source}}};var Ae,xe,ke;f.parameters={...f.parameters,docs:{...(Ae=f.parameters)==null?void 0:Ae.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(0, 20).build()
  }
}`,...(ke=(xe=f.parameters)==null?void 0:xe.docs)==null?void 0:ke.source}}};var Se,Ge,Be;M.parameters={...M.parameters,docs:{...(Se=M.parameters)==null?void 0:Se.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-1, 20).build()
  }
}`,...(Be=(Ge=M.parameters)==null?void 0:Ge.docs)==null?void 0:Be.source}}};var ve,Xe,Ye;b.parameters={...b.parameters,docs:{...(ve=b.parameters)==null?void 0:ve.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(1, 20).build()
  }
}`,...(Ye=(Xe=b.parameters)==null?void 0:Xe.docs)==null?void 0:Ye.source}}};var Qe,Oe,Pe;w.parameters={...w.parameters,docs:{...(Qe=w.parameters)==null?void 0:Qe.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-3, 20).addLockedLine([-3, 2], [5, 16]).build()
  }
}`,...(Pe=(Oe=w.parameters)==null?void 0:Oe.docs)==null?void 0:Pe.source}}};var Ce,Te,Ne;q.parameters={...q.parameters,docs:{...(Ce=q.parameters)==null?void 0:Ce.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-20, 0).build()
  }
}`,...(Ne=(Te=q.parameters)==null?void 0:Te.docs)==null?void 0:Ne.source}}};var $e,je,ye;R.parameters={...R.parameters,docs:{...($e=R.parameters)==null?void 0:$e.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-20, -1).build()
  }
}`,...(ye=(je=R.parameters)==null?void 0:je.docs)==null?void 0:ye.source}}};var Fe,Ie,Je;W.parameters={...W.parameters,docs:{...(Fe=W.parameters)==null?void 0:Fe.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().build()
  },
  decorators: [MobileContainerDecorator]
}`,...(Je=(Ie=W.parameters)==null?void 0:Ie.docs)==null?void 0:Je.source}}};var De,Ee,_e;L.parameters={...L.parameters,docs:{...(De=L.parameters)==null?void 0:De.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withSegments({
      numSegments: 3
    }).build()
  }
}`,...(_e=(Ee=L.parameters)==null?void 0:Ee.docs)==null?void 0:_e.source}}};var Ve,ze,He;A.parameters={...A.parameters,docs:{...(Ve=A.parameters)==null?void 0:Ve.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withCircle().withXRange(-10, 10).withYRange(-5, 5).build()
  },
  // NOTE(jeremy): I migrated these stories to the v3 CSF story format, but
  // I'm unclear why this one story forces mobile when none of the others do,
  // and this story doesn't look mobile-specific. :thinking:
  decorators: [MobileContainerDecorator]
}`,...(He=(ze=A.parameters)==null?void 0:ze.docs)==null?void 0:He.source}}};var Ke,Ue,Ze;x.parameters={...x.parameters,docs:{...(Ke=x.parameters)==null?void 0:Ke.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().addLockedLine([-3, -3], [3, 3]).withXRange(-5, 5).withYRange(-10, 10).build()
  }
}`,...(Ze=(Ue=x.parameters)==null?void 0:Ue.docs)==null?void 0:Ze.source}}};var er,rr,sr;k.parameters={...k.parameters,docs:{...(er=k.parameters)==null?void 0:er.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().addLockedPointAt(3, 2).addLockedPointAt(-1, 1).addLockedPointAt(0, -4).build()
  }
}`,...(sr=(rr=k.parameters)==null?void 0:rr.docs)==null?void 0:sr.source}}};var tr,ar,ir;S.parameters={...S.parameters,docs:{...(tr=S.parameters)==null?void 0:tr.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().addLockedLine([-1, 1], [2, 3]).build()
  }
}`,...(ir=(ar=S.parameters)==null?void 0:ar.docs)==null?void 0:ir.source}}};var or,nr,cr;G.parameters={...G.parameters,docs:{...(or=G.parameters)==null?void 0:or.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withProtractor().build()
  }
}`,...(cr=(nr=G.parameters)==null?void 0:nr.docs)==null?void 0:cr.source}}};var ur,dr,pr;B.parameters={...B.parameters,docs:{...(ur=B.parameters)==null?void 0:ur.docs,source:{originalSource:`{
  args: {
    question: sinusoidWithPiTicks
  }
}`,...(pr=(dr=B.parameters)==null?void 0:dr.docs)==null?void 0:pr.source}}};const ts=["MafsWithCustomAxisLabels","MafsWithFractionalGridStep","MafsWithFractionalAxisTicks","MafsWithAxesMarkings","MafsWithGridMarkings","MafsWithNoMarkings","MafsWithSmallRange","MafsWithLargeRange","MafsWithYAxisAtLeft","MafsWithYAxisNearLeft","MafsWithYAxisJustOverLeft","MafsWithYAxisOffLeft","MafsWithYAxisOffFarLeft","MafsWithYAxisAtRight","MafsWithYAxisOffRight","MafsWithXAxisAtBottom","MafsWithXAxisNearBottom","MafsWithXAxisOffBottom","MafsWithXAxisJustOverBottom","MafsWithXAxisAtTop","MafsWithXAxisOffTop","MafsInMobileContainer","MafsWithMultipleSegments","MafsCircleGraphWithNonsquareRange","MafsLineGraphWithNonsquareRange","MafsWithLockedPoints","MafsWithLockedLine","MafsWithProtractor","MafsWithPiTicks"];export{A as MafsCircleGraphWithNonsquareRange,W as MafsInMobileContainer,x as MafsLineGraphWithNonsquareRange,a as MafsWithAxesMarkings,r as MafsWithCustomAxisLabels,t as MafsWithFractionalAxisTicks,s as MafsWithFractionalGridStep,i as MafsWithGridMarkings,c as MafsWithLargeRange,S as MafsWithLockedLine,k as MafsWithLockedPoints,L as MafsWithMultipleSegments,o as MafsWithNoMarkings,B as MafsWithPiTicks,G as MafsWithProtractor,n as MafsWithSmallRange,f as MafsWithXAxisAtBottom,q as MafsWithXAxisAtTop,w as MafsWithXAxisJustOverBottom,M as MafsWithXAxisNearBottom,b as MafsWithXAxisOffBottom,R as MafsWithXAxisOffTop,u as MafsWithYAxisAtLeft,h as MafsWithYAxisAtRight,p as MafsWithYAxisJustOverLeft,d as MafsWithYAxisNearLeft,g as MafsWithYAxisOffFarLeft,m as MafsWithYAxisOffLeft,l as MafsWithYAxisOffRight,ts as __namedExportsOrder,ss as default};
