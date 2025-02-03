import{j as Y}from"./jsx-runtime-63Ea5SlK.js";import{R as gr}from"./renderer--yoXpbTs.js";import{m as hr}from"./i18n-context-YAdgKrxn.js";import{i as e}from"./interactive-graph-question-builder-00J3MhwK.js";import{h as lr}from"./interactive-graph.testdata-2DgsQbSB.js";import"./index-6oxdNXpR.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-default-4_ZsnO94.js";import"./index-VBBZE5E5.js";import"./perseus-error-l3K_anoI.js";import"./svg-image-dQmvqixs.js";import"./index-wB6JGB7j.js";import"./index-awljIyHI.js";import"./index-Cj1jPHW9.js";import"./index-dmcq622U.js";import"./index-dnMhQZ-1.js";import"./jquery-5v7aFUvu.js";import"./dependencies-CP7Uh8Kq.js";import"./util-Deofanvy.js";import"./fixed-to-responsive-m4E_8Ehf.js";import"./constants-NhstHO4m.js";import"./index-J2t_5nK1.js";import"./client-Rb4DelHy.js";import"./index-9gkyvru-.js";import"./inline-icon-6fh0Wu1y.js";import"./icon-paths-5JCXzGsq.js";import"./image-loader-cBoFrbCq.js";import"./asset-context-H6Iqp7Gi.js";import"./tex-MX5FPdQh.js";import"./zoomable-_uYFBX1Q.js";import"./zoomable-tex-Jjwex-Ep.js";import"./perseus-api-DO0X8arb.js";import"./index-o42urCig.js";import"./stub-tag-editor-3VEaZ-53.js";import"./text-list-editor-ND6Qift6.js";import"./lint-ZDfMj7xF.js";import"./index-smZ6iCr_.js";import"./tiny-invariant-bHgPayXn.js";const rs={title:"Perseus/Widgets/Interactive Graph Visual Regression Tests",component:fr,parameters:{chromatic:{disableSnapshot:!1}}};function mr(v){return Y.jsx("div",{className:"framework-perseus perseus-mobile",children:Y.jsx(v,{})})}const r={args:{question:e().withAxisLabels("\\text{Custom $x$ label}","\\text{Custom $y$ label}").build()}},s={args:{question:e().withGridStep(2.571,3.123).build()}},t={args:{question:e().withTickStep(1.5,1.5).build()}},a={args:{question:e().withMarkings("axes").build()}},i={args:{question:e().withMarkings("grid").build()}},o={args:{question:e().withMarkings("none").build()}},n={args:{question:e().withXRange(-2,2).withYRange(-2,2).build()}},c={args:{question:e().withXRange(-50,50).withYRange(-50,50).build()}},u={args:{question:e().withXRange(0,20).addLockedLine([1,1],[5,2]).build()}},d={args:{question:e().withXRange(-1,20).addLockedLine([1,1],[5,2]).build()}},p={args:{question:e().withXRange(-3,20).addLockedLine([1,1],[5,2]).build()}},m={args:{question:e().withXRange(1,20).build()}},g={args:{question:e().withXRange(6,20).build()}},h={args:{question:e().withXRange(-20,0).build()}},l={args:{question:e().withXRange(-20,-1).build()}},f={args:{question:e().withYRange(0,20).build()}},M={args:{question:e().withYRange(-1,20).build()}},b={args:{question:e().withYRange(1,20).build()}},w={args:{question:e().withYRange(-3,20).addLockedLine([-3,2],[5,16]).build()}},q={args:{question:e().withYRange(-20,0).build()}},R={args:{question:e().withYRange(-20,-1).build()}},W={args:{question:e().build()},decorators:[mr]},L={args:{question:e().withSegments({numSegments:3}).build()}},x={args:{question:e().withCircle().withXRange(-10,10).withYRange(-5,5).build()},decorators:[mr]},A={args:{question:e().addLockedLine([-3,-3],[3,3]).withXRange(-5,5).withYRange(-10,10).build()}},k={args:{question:e().addLockedPointAt(3,2).addLockedPointAt(-1,1).addLockedPointAt(0,-4).build()}},S={args:{question:e().addLockedLine([-1,1],[2,3]).build()}},G={args:{question:e().withProtractor().build()}},B={args:{question:lr}};function fr(v){const{question:X}=v;return Y.jsx(gr,{strings:hr,content:X.content,widgets:X.widgets,images:X.images,apiOptions:{flags:{mafs:{segment:!0,circle:!0,linear:!0,sinusoid:!0}}}})}var Q,O,P;r.parameters={...r.parameters,docs:{...(Q=r.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withAxisLabels("\\\\text{Custom $x$ label}", "\\\\text{Custom $y$ label}").build()
  }
}`,...(P=(O=r.parameters)==null?void 0:O.docs)==null?void 0:P.source}}};var C,T,N;s.parameters={...s.parameters,docs:{...(C=s.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withGridStep(2.571, 3.123).build()
  }
}`,...(N=(T=s.parameters)==null?void 0:T.docs)==null?void 0:N.source}}};var $,y,F;t.parameters={...t.parameters,docs:{...($=t.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withTickStep(1.5, 1.5).build()
  }
}`,...(F=(y=t.parameters)==null?void 0:y.docs)==null?void 0:F.source}}};var j,I,J;a.parameters={...a.parameters,docs:{...(j=a.parameters)==null?void 0:j.docs,source:{originalSource:`{
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
}`,...(Le=(We=l.parameters)==null?void 0:We.docs)==null?void 0:Le.source}}};var xe,Ae,ke;f.parameters={...f.parameters,docs:{...(xe=f.parameters)==null?void 0:xe.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(0, 20).build()
  }
}`,...(ke=(Ae=f.parameters)==null?void 0:Ae.docs)==null?void 0:ke.source}}};var Se,Ge,Be;M.parameters={...M.parameters,docs:{...(Se=M.parameters)==null?void 0:Se.docs,source:{originalSource:`{
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
}`,...(Ne=(Te=q.parameters)==null?void 0:Te.docs)==null?void 0:Ne.source}}};var $e,ye,Fe;R.parameters={...R.parameters,docs:{...($e=R.parameters)==null?void 0:$e.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-20, -1).build()
  }
}`,...(Fe=(ye=R.parameters)==null?void 0:ye.docs)==null?void 0:Fe.source}}};var je,Ie,Je;W.parameters={...W.parameters,docs:{...(je=W.parameters)==null?void 0:je.docs,source:{originalSource:`{
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
}`,...(_e=(Ee=L.parameters)==null?void 0:Ee.docs)==null?void 0:_e.source}}};var Ve,ze,He;x.parameters={...x.parameters,docs:{...(Ve=x.parameters)==null?void 0:Ve.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withCircle().withXRange(-10, 10).withYRange(-5, 5).build()
  },
  // NOTE(jeremy): I migrated these stories to the v3 CSF story format, but
  // I'm unclear why this one story forces mobile when none of the others do,
  // and this story doesn't look mobile-specific. :thinking:
  decorators: [MobileContainerDecorator]
}`,...(He=(ze=x.parameters)==null?void 0:ze.docs)==null?void 0:He.source}}};var Ke,Ue,Ze;A.parameters={...A.parameters,docs:{...(Ke=A.parameters)==null?void 0:Ke.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().addLockedLine([-3, -3], [3, 3]).withXRange(-5, 5).withYRange(-10, 10).build()
  }
}`,...(Ze=(Ue=A.parameters)==null?void 0:Ue.docs)==null?void 0:Ze.source}}};var er,rr,sr;k.parameters={...k.parameters,docs:{...(er=k.parameters)==null?void 0:er.docs,source:{originalSource:`{
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
}`,...(pr=(dr=B.parameters)==null?void 0:dr.docs)==null?void 0:pr.source}}};const ss=["MafsWithCustomAxisLabels","MafsWithFractionalGridStep","MafsWithFractionalAxisTicks","MafsWithAxesMarkings","MafsWithGridMarkings","MafsWithNoMarkings","MafsWithSmallRange","MafsWithLargeRange","MafsWithYAxisAtLeft","MafsWithYAxisNearLeft","MafsWithYAxisJustOverLeft","MafsWithYAxisOffLeft","MafsWithYAxisOffFarLeft","MafsWithYAxisAtRight","MafsWithYAxisOffRight","MafsWithXAxisAtBottom","MafsWithXAxisNearBottom","MafsWithXAxisOffBottom","MafsWithXAxisJustOverBottom","MafsWithXAxisAtTop","MafsWithXAxisOffTop","MafsInMobileContainer","MafsWithMultipleSegments","MafsCircleGraphWithNonsquareRange","MafsLineGraphWithNonsquareRange","MafsWithLockedPoints","MafsWithLockedLine","MafsWithProtractor","MafsWithPiTicks"];export{x as MafsCircleGraphWithNonsquareRange,W as MafsInMobileContainer,A as MafsLineGraphWithNonsquareRange,a as MafsWithAxesMarkings,r as MafsWithCustomAxisLabels,t as MafsWithFractionalAxisTicks,s as MafsWithFractionalGridStep,i as MafsWithGridMarkings,c as MafsWithLargeRange,S as MafsWithLockedLine,k as MafsWithLockedPoints,L as MafsWithMultipleSegments,o as MafsWithNoMarkings,B as MafsWithPiTicks,G as MafsWithProtractor,n as MafsWithSmallRange,f as MafsWithXAxisAtBottom,q as MafsWithXAxisAtTop,w as MafsWithXAxisJustOverBottom,M as MafsWithXAxisNearBottom,b as MafsWithXAxisOffBottom,R as MafsWithXAxisOffTop,u as MafsWithYAxisAtLeft,h as MafsWithYAxisAtRight,p as MafsWithYAxisJustOverLeft,d as MafsWithYAxisNearLeft,g as MafsWithYAxisOffFarLeft,m as MafsWithYAxisOffLeft,l as MafsWithYAxisOffRight,ss as __namedExportsOrder,rs as default};
