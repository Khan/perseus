import"./underscore-885MUNGo.js";import"./random-util-qPwTTOJz.js";import{s as Mr}from"./split-perseus-item--ZTLzHIt.js";import{r as Q}from"./index-6oxdNXpR.js";import{A as br}from"./perseus-api-Y55S7ZPk.js";import{R as wr}from"./renderer-GgilJG6V.js";import{m as qr}from"./i18n-context-T9Cdk0dK.js";import{i as e}from"./interactive-graph-question-builder-XRgV277b.js";import{j as Wr}from"./interactive-graph.testdata-m30UTVy5.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./util-AXsb50Si.js";import"./perseus-error-l3K_anoI.js";import"./jquery-5v7aFUvu.js";import"./get-decimal-separator-C5N_K9o2.js";import"./index-o42urCig.js";import"./stub-tag-editor--BF0WBUz.js";import"./text-list-editor-9dKImvgD.js";import"./index-9gkyvru-.js";import"./index-J2t_5nK1.js";import"./index-dnMhQZ-1.js";import"./zoomable-tex-w6m6mqm2.js";import"./tex-q_4hQMGs.js";import"./dependencies-CP7Uh8Kq.js";import"./zoomable-m_J-BBOg.js";import"./svg-image-QtqEBn5V.js";import"./index--z92Kcj-.js";import"./no-important-xCWWYXQR.js";import"./index-hw7d7wq0.js";import"./index-zRqVZh6A.js";import"./fixed-to-responsive-8Rm8IBlT.js";import"./constants-vGHYchdS.js";import"./client-Rb4DelHy.js";import"./inline-icon-8e4u-lSW.js";import"./icon-paths-5JCXzGsq.js";import"./image-loader-qCu_dXQl.js";import"./lint-a43UkMJQ.js";import"./index-smZ6iCr_.js";import"./tiny-invariant-bHgPayXn.js";import"./jsx-runtime-63Ea5SlK.js";const cs={title:"Perseus/Widgets/Interactive Graph Visual Regression Tests",component:Rr,parameters:{chromatic:{disableSnapshot:!1}}};function fr(X){return Q.createElement("div",{className:"framework-perseus perseus-mobile"},Q.createElement(X,null))}const r={args:{question:e().withAxisLabels("\\text{Custom $x$ label}","\\text{Custom $y$ label}").build()}},s={args:{question:e().withGridStep(2.571,3.123).build()}},t={args:{question:e().withTickStep(1.5,1.5).build()}},a={args:{question:e().withMarkings("axes").build()}},i={args:{question:e().withMarkings("grid").build()}},o={args:{question:e().withMarkings("none").build()}},n={args:{question:e().withXRange(-2,2).withYRange(-2,2).build()}},c={args:{question:e().withXRange(-50,50).withYRange(-50,50).build()}},u={args:{question:e().withXRange(0,20).addLockedLine([1,1],[5,2]).build()}},d={args:{question:e().withXRange(-1,20).addLockedLine([1,1],[5,2]).build()}},p={args:{question:e().withXRange(-3,20).addLockedLine([1,1],[5,2]).build()}},m={args:{question:e().withXRange(1,20).build()}},g={args:{question:e().withXRange(6,20).build()}},l={args:{question:e().withXRange(-20,0).build()}},h={args:{question:e().withXRange(-20,-1).build()}},f={args:{question:e().withYRange(0,20).build()}},M={args:{question:e().withYRange(-1,20).build()}},b={args:{question:e().withYRange(1,20).build()}},w={args:{question:e().withYRange(-3,20).addLockedLine([-3,2],[5,16]).build()}},q={args:{question:e().withYRange(-20,0).build()}},W={args:{question:e().withYRange(-20,-1).build()}},R={args:{question:e().build()},decorators:[fr]},A={args:{question:e().withSegments({numSegments:3}).build()}},L={args:{question:e().withCircle().withXRange(-10,10).withYRange(-5,5).build()},decorators:[fr]},S={args:{question:e().addLockedLine([-3,-3],[3,3]).withXRange(-5,5).withYRange(-10,10).build()}},k={args:{question:e().addLockedPointAt(3,2).addLockedPointAt(-1,1).addLockedPointAt(0,-4).build()}},x={args:{question:e().addLockedLine([-1,1],[2,3]).build()}},G={args:{question:e().withAngle().withProtractor().build()}},B={args:{question:Wr}},v={args:{question:Mr(e().build())}};function Rr(X){const{question:Y}=X;return Q.createElement(wr,{strings:qr,content:Y.content,widgets:Y.widgets,images:Y.images,apiOptions:br.defaults})}var P,O,C;r.parameters={...r.parameters,docs:{...(P=r.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withAxisLabels("\\\\text{Custom $x$ label}", "\\\\text{Custom $y$ label}").build()
  }
}`,...(C=(O=r.parameters)==null?void 0:O.docs)==null?void 0:C.source}}};var T,N,$;s.parameters={...s.parameters,docs:{...(T=s.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withGridStep(2.571, 3.123).build()
  }
}`,...($=(N=s.parameters)==null?void 0:N.docs)==null?void 0:$.source}}};var y,F,I;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withTickStep(1.5, 1.5).build()
  }
}`,...(I=(F=t.parameters)==null?void 0:F.docs)==null?void 0:I.source}}};var E,D,J;a.parameters={...a.parameters,docs:{...(E=a.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withMarkings("axes").build()
  }
}`,...(J=(D=a.parameters)==null?void 0:D.docs)==null?void 0:J.source}}};var j,_,V;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withMarkings("grid").build()
  }
}`,...(V=(_=i.parameters)==null?void 0:_.docs)==null?void 0:V.source}}};var z,H,K;o.parameters={...o.parameters,docs:{...(z=o.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withMarkings("none").build()
  }
}`,...(K=(H=o.parameters)==null?void 0:H.docs)==null?void 0:K.source}}};var U,Z,ee;n.parameters={...n.parameters,docs:{...(U=n.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-2, 2).withYRange(-2, 2).build()
  }
}`,...(ee=(Z=n.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var re,se,te;c.parameters={...c.parameters,docs:{...(re=c.parameters)==null?void 0:re.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-50, 50).withYRange(-50, 50).build()
  }
}`,...(te=(se=c.parameters)==null?void 0:se.docs)==null?void 0:te.source}}};var ae,ie,oe;u.parameters={...u.parameters,docs:{...(ae=u.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(0, 20).addLockedLine([1, 1], [5, 2]).build()
  }
}`,...(oe=(ie=u.parameters)==null?void 0:ie.docs)==null?void 0:oe.source}}};var ne,ce,ue;d.parameters={...d.parameters,docs:{...(ne=d.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-1, 20).addLockedLine([1, 1], [5, 2]).build()
  }
}`,...(ue=(ce=d.parameters)==null?void 0:ce.docs)==null?void 0:ue.source}}};var de,pe,me;p.parameters={...p.parameters,docs:{...(de=p.parameters)==null?void 0:de.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-3, 20).addLockedLine([1, 1], [5, 2]).build()
  }
}`,...(me=(pe=p.parameters)==null?void 0:pe.docs)==null?void 0:me.source}}};var ge,le,he;m.parameters={...m.parameters,docs:{...(ge=m.parameters)==null?void 0:ge.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(1, 20).build()
  }
}`,...(he=(le=m.parameters)==null?void 0:le.docs)==null?void 0:he.source}}};var fe,Me,be;g.parameters={...g.parameters,docs:{...(fe=g.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(6, 20).build()
  }
}`,...(be=(Me=g.parameters)==null?void 0:Me.docs)==null?void 0:be.source}}};var we,qe,We;l.parameters={...l.parameters,docs:{...(we=l.parameters)==null?void 0:we.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-20, 0).build()
  }
}`,...(We=(qe=l.parameters)==null?void 0:qe.docs)==null?void 0:We.source}}};var Re,Ae,Le;h.parameters={...h.parameters,docs:{...(Re=h.parameters)==null?void 0:Re.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-20, -1).build()
  }
}`,...(Le=(Ae=h.parameters)==null?void 0:Ae.docs)==null?void 0:Le.source}}};var Se,ke,xe;f.parameters={...f.parameters,docs:{...(Se=f.parameters)==null?void 0:Se.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(0, 20).build()
  }
}`,...(xe=(ke=f.parameters)==null?void 0:ke.docs)==null?void 0:xe.source}}};var Ge,Be,ve;M.parameters={...M.parameters,docs:{...(Ge=M.parameters)==null?void 0:Ge.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-1, 20).build()
  }
}`,...(ve=(Be=M.parameters)==null?void 0:Be.docs)==null?void 0:ve.source}}};var Xe,Ye,Qe;b.parameters={...b.parameters,docs:{...(Xe=b.parameters)==null?void 0:Xe.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(1, 20).build()
  }
}`,...(Qe=(Ye=b.parameters)==null?void 0:Ye.docs)==null?void 0:Qe.source}}};var Pe,Oe,Ce;w.parameters={...w.parameters,docs:{...(Pe=w.parameters)==null?void 0:Pe.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-3, 20).addLockedLine([-3, 2], [5, 16]).build()
  }
}`,...(Ce=(Oe=w.parameters)==null?void 0:Oe.docs)==null?void 0:Ce.source}}};var Te,Ne,$e;q.parameters={...q.parameters,docs:{...(Te=q.parameters)==null?void 0:Te.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-20, 0).build()
  }
}`,...($e=(Ne=q.parameters)==null?void 0:Ne.docs)==null?void 0:$e.source}}};var ye,Fe,Ie;W.parameters={...W.parameters,docs:{...(ye=W.parameters)==null?void 0:ye.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-20, -1).build()
  }
}`,...(Ie=(Fe=W.parameters)==null?void 0:Fe.docs)==null?void 0:Ie.source}}};var Ee,De,Je;R.parameters={...R.parameters,docs:{...(Ee=R.parameters)==null?void 0:Ee.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().build()
  },
  decorators: [MobileContainerDecorator]
}`,...(Je=(De=R.parameters)==null?void 0:De.docs)==null?void 0:Je.source}}};var je,_e,Ve;A.parameters={...A.parameters,docs:{...(je=A.parameters)==null?void 0:je.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withSegments({
      numSegments: 3
    }).build()
  }
}`,...(Ve=(_e=A.parameters)==null?void 0:_e.docs)==null?void 0:Ve.source}}};var ze,He,Ke;L.parameters={...L.parameters,docs:{...(ze=L.parameters)==null?void 0:ze.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withCircle().withXRange(-10, 10).withYRange(-5, 5).build()
  },
  // NOTE(jeremy): I migrated these stories to the v3 CSF story format, but
  // I'm unclear why this one story forces mobile when none of the others do,
  // and this story doesn't look mobile-specific. :thinking:
  decorators: [MobileContainerDecorator]
}`,...(Ke=(He=L.parameters)==null?void 0:He.docs)==null?void 0:Ke.source}}};var Ue,Ze,er;S.parameters={...S.parameters,docs:{...(Ue=S.parameters)==null?void 0:Ue.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().addLockedLine([-3, -3], [3, 3]).withXRange(-5, 5).withYRange(-10, 10).build()
  }
}`,...(er=(Ze=S.parameters)==null?void 0:Ze.docs)==null?void 0:er.source}}};var rr,sr,tr;k.parameters={...k.parameters,docs:{...(rr=k.parameters)==null?void 0:rr.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().addLockedPointAt(3, 2).addLockedPointAt(-1, 1).addLockedPointAt(0, -4).build()
  }
}`,...(tr=(sr=k.parameters)==null?void 0:sr.docs)==null?void 0:tr.source}}};var ar,ir,or;x.parameters={...x.parameters,docs:{...(ar=x.parameters)==null?void 0:ar.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().addLockedLine([-1, 1], [2, 3]).build()
  }
}`,...(or=(ir=x.parameters)==null?void 0:ir.docs)==null?void 0:or.source}}};var nr,cr,ur;G.parameters={...G.parameters,docs:{...(nr=G.parameters)==null?void 0:nr.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withAngle().withProtractor().build()
  }
}`,...(ur=(cr=G.parameters)==null?void 0:cr.docs)==null?void 0:ur.source}}};var dr,pr,mr;B.parameters={...B.parameters,docs:{...(dr=B.parameters)==null?void 0:dr.docs,source:{originalSource:`{
  args: {
    question: sinusoidWithPiTicks
  }
}`,...(mr=(pr=B.parameters)==null?void 0:pr.docs)==null?void 0:mr.source}}};var gr,lr,hr;v.parameters={...v.parameters,docs:{...(gr=v.parameters)==null?void 0:gr.docs,source:{originalSource:`{
  args: {
    question: splitPerseusItem(interactiveGraphQuestionBuilder().build())
  }
}`,...(hr=(lr=v.parameters)==null?void 0:lr.docs)==null?void 0:hr.source}}};const us=["MafsWithCustomAxisLabels","MafsWithFractionalGridStep","MafsWithFractionalAxisTicks","MafsWithAxesMarkings","MafsWithGridMarkings","MafsWithNoMarkings","MafsWithSmallRange","MafsWithLargeRange","MafsWithYAxisAtLeft","MafsWithYAxisNearLeft","MafsWithYAxisJustOverLeft","MafsWithYAxisOffLeft","MafsWithYAxisOffFarLeft","MafsWithYAxisAtRight","MafsWithYAxisOffRight","MafsWithXAxisAtBottom","MafsWithXAxisNearBottom","MafsWithXAxisOffBottom","MafsWithXAxisJustOverBottom","MafsWithXAxisAtTop","MafsWithXAxisOffTop","MafsInMobileContainer","MafsWithMultipleSegments","MafsCircleGraphWithNonsquareRange","MafsLineGraphWithNonsquareRange","MafsWithLockedPoints","MafsWithLockedLine","MafsWithProtractor","MafsWithPiTicks","MafsWithAnswerlessData"];export{L as MafsCircleGraphWithNonsquareRange,R as MafsInMobileContainer,S as MafsLineGraphWithNonsquareRange,v as MafsWithAnswerlessData,a as MafsWithAxesMarkings,r as MafsWithCustomAxisLabels,t as MafsWithFractionalAxisTicks,s as MafsWithFractionalGridStep,i as MafsWithGridMarkings,c as MafsWithLargeRange,x as MafsWithLockedLine,k as MafsWithLockedPoints,A as MafsWithMultipleSegments,o as MafsWithNoMarkings,B as MafsWithPiTicks,G as MafsWithProtractor,n as MafsWithSmallRange,f as MafsWithXAxisAtBottom,q as MafsWithXAxisAtTop,w as MafsWithXAxisJustOverBottom,M as MafsWithXAxisNearBottom,b as MafsWithXAxisOffBottom,W as MafsWithXAxisOffTop,u as MafsWithYAxisAtLeft,l as MafsWithYAxisAtRight,p as MafsWithYAxisJustOverLeft,d as MafsWithYAxisNearLeft,g as MafsWithYAxisOffFarLeft,m as MafsWithYAxisOffLeft,h as MafsWithYAxisOffRight,us as __namedExportsOrder,cs as default};
