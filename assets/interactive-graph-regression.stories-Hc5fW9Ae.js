import{j as r}from"./jsx-runtime-BT65X5dW.js";import"./underscore-U-AHniOr.js";import"./core-widget-registry-2eRuEUfZ.js";import{s as vs}from"./split-perseus-item-CsFgMK-K.js";import{V as Bs}from"./index-CskvhqFA.js";import{A as Xs}from"./perseus-api-Ty_QvlNi.js";import{R as Ys}from"./renderer-DnhW87FU.js";import{m as Qs}from"./i18n-context-3AkWzTTj.js";import{i as e}from"./interactive-graph-question-builder-Di7B97iI.js";import{j as Ts}from"./interactive-graph.testdata-CPB2IZMq.js";import"./index-C6mWTJJr.js";import"./_commonjsHelpers-BosuxZz1.js";import"./util-CfzqFt4k.js";import"./perseus-error-CSETqePQ.js";import"./jquery-CkHB0_Mt.js";import"./get-decimal-separator-B2cicA45.js";import"./no-important-DlFk8a1I.js";import"./index-CrGd2QqM.js";import"./stub-tag-editor-B8lH250S.js";import"./text-list-editor-HcP7oGoC.js";import"./index-B1Gws05u.js";import"./index-BzwLglMS.js";import"./index-D7h-teXI.js";import"./zoomable-tex-Dy-nElJT.js";import"./tex-BONImhZG.js";import"./dependencies-BsVPGK1s.js";import"./zoomable-C_CCSKDG.js";import"./svg-image-9gRPvOod.js";import"./index-CQ5XbMj6.js";import"./index-C9RM_t1w.js";import"./fixed-to-responsive-CTsII9Xx.js";import"./constants-BIpV3g0K.js";import"./client-CAS5PaPY.js";import"./inline-icon-AJRwMA4Z.js";import"./icon-paths-C3bPmxpL.js";import"./image-loader-CdkY-jNs.js";import"./lint-D0FI20JF.js";import"./index-Dd-cahjY.js";import"./tiny-invariant-CopsF_GD.js";const Rr={title:"Perseus/Widgets/Interactive Graph Visual Regression Tests",component:Os,parameters:{chromatic:{disableSnapshot:!1}},decorators:s=>r.jsx(Bs,{style:{marginInlineStart:32},children:r.jsx(s,{})})};function Gs(s){return r.jsx("div",{className:"framework-perseus perseus-mobile",children:r.jsx(s,{})})}const i={args:{question:e().withAxisLabels("\\text{Custom $x$ label}","\\text{Custom $y$ label}").build()}},a={args:{question:e().withGridStep(2.571,3.123).build()}},t={args:{question:e().withTickStep(1.5,1.5).build()}},o={args:{question:e().withMarkings("axes").build()}},n={args:{question:e().withMarkings("grid").build()}},c={args:{question:e().withMarkings("none").build()}},u={args:{question:e().withXRange(-2,2).withYRange(-2,2).build()}},d={args:{question:e().withXRange(-50,50).withYRange(-50,50).build()}},p={args:{question:e().withXRange(0,20).addLockedLine([1,1],[5,2]).build()}},m={args:{question:e().withXRange(-1,20).addLockedLine([1,1],[5,2]).build()}},l={args:{question:e().withXRange(-3,20).addLockedLine([1,1],[5,2]).build()}},g={args:{question:e().withXRange(1,20).build()}},h={args:{question:e().withXRange(6,20).build()}},f={args:{question:e().withXRange(-20,0).build()}},b={args:{question:e().withXRange(-20,-1).build()}},w={args:{question:e().withYRange(0,20).build()}},M={args:{question:e().withYRange(-1,20).build()}},L={args:{question:e().withYRange(1,20).build()}},R={args:{question:e().withYRange(-3,20).addLockedLine([-3,2],[5,16]).build()}},W={args:{question:e().withYRange(-20,0).build()}},q={args:{question:e().withYRange(-20,-1).build()}},A={args:{question:e().withXRange(0,10).withYRange(0,10).withAxisLabels("Video Game Hours per Week","Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()}},x={args:{question:e().withXRange(-1,10).withYRange(-1,10).withAxisLabels("Video Game Hours per Week","Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()}},S={args:{question:e().withXRange(0,.5).withYRange(0,.5).withTickStep(.1,.1).withGridStep(.1,.1).withAxisLabels("Video Game Hours per Week","Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()}},k={args:{question:e().build()},decorators:[Gs]},G={args:{question:e().withSegments({numSegments:3}).build()}},v={args:{question:e().withCircle().withXRange(-10,10).withYRange(-5,5).build()},decorators:[Gs]},B={args:{question:e().addLockedLine([-3,-3],[3,3]).withXRange(-5,5).withYRange(-10,10).build()}},X={args:{question:e().addLockedPointAt(3,2).addLockedPointAt(-1,1).addLockedPointAt(0,-4).build()}},Y={args:{question:e().addLockedLine([-1,1],[2,3]).build()}},Q={args:{question:e().withAngle().withProtractor().build()}},T={args:{question:Ts}},O={args:{question:vs(e().build())}};function Os(s){const{question:P}=s;return r.jsx(Ys,{strings:Qs,content:P.content,widgets:P.widgets,images:P.images,apiOptions:Xs.defaults})}var C,E,N;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withAxisLabels("\\\\text{Custom $x$ label}", "\\\\text{Custom $y$ label}").build()
  }
}`,...(N=(E=i.parameters)==null?void 0:E.docs)==null?void 0:N.source}}};var j,V,y;a.parameters={...a.parameters,docs:{...(j=a.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withGridStep(2.571, 3.123).build()
  }
}`,...(y=(V=a.parameters)==null?void 0:V.docs)==null?void 0:y.source}}};var I,$,F;t.parameters={...t.parameters,docs:{...(I=t.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withTickStep(1.5, 1.5).build()
  }
}`,...(F=($=t.parameters)==null?void 0:$.docs)==null?void 0:F.source}}};var H,J,D;o.parameters={...o.parameters,docs:{...(H=o.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withMarkings("axes").build()
  }
}`,...(D=(J=o.parameters)==null?void 0:J.docs)==null?void 0:D.source}}};var Z,_,z;n.parameters={...n.parameters,docs:{...(Z=n.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withMarkings("grid").build()
  }
}`,...(z=(_=n.parameters)==null?void 0:_.docs)==null?void 0:z.source}}};var K,U,ee;c.parameters={...c.parameters,docs:{...(K=c.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withMarkings("none").build()
  }
}`,...(ee=(U=c.parameters)==null?void 0:U.docs)==null?void 0:ee.source}}};var se,re,ie;u.parameters={...u.parameters,docs:{...(se=u.parameters)==null?void 0:se.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-2, 2).withYRange(-2, 2).build()
  }
}`,...(ie=(re=u.parameters)==null?void 0:re.docs)==null?void 0:ie.source}}};var ae,te,oe;d.parameters={...d.parameters,docs:{...(ae=d.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-50, 50).withYRange(-50, 50).build()
  }
}`,...(oe=(te=d.parameters)==null?void 0:te.docs)==null?void 0:oe.source}}};var ne,ce,ue;p.parameters={...p.parameters,docs:{...(ne=p.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(0, 20).addLockedLine([1, 1], [5, 2]).build()
  }
}`,...(ue=(ce=p.parameters)==null?void 0:ce.docs)==null?void 0:ue.source}}};var de,pe,me;m.parameters={...m.parameters,docs:{...(de=m.parameters)==null?void 0:de.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-1, 20).addLockedLine([1, 1], [5, 2]).build()
  }
}`,...(me=(pe=m.parameters)==null?void 0:pe.docs)==null?void 0:me.source}}};var le,ge,he;l.parameters={...l.parameters,docs:{...(le=l.parameters)==null?void 0:le.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-3, 20).addLockedLine([1, 1], [5, 2]).build()
  }
}`,...(he=(ge=l.parameters)==null?void 0:ge.docs)==null?void 0:he.source}}};var fe,be,we;g.parameters={...g.parameters,docs:{...(fe=g.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(1, 20).build()
  }
}`,...(we=(be=g.parameters)==null?void 0:be.docs)==null?void 0:we.source}}};var Me,Le,Re;h.parameters={...h.parameters,docs:{...(Me=h.parameters)==null?void 0:Me.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(6, 20).build()
  }
}`,...(Re=(Le=h.parameters)==null?void 0:Le.docs)==null?void 0:Re.source}}};var We,qe,Ae;f.parameters={...f.parameters,docs:{...(We=f.parameters)==null?void 0:We.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-20, 0).build()
  }
}`,...(Ae=(qe=f.parameters)==null?void 0:qe.docs)==null?void 0:Ae.source}}};var xe,Se,ke;b.parameters={...b.parameters,docs:{...(xe=b.parameters)==null?void 0:xe.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-20, -1).build()
  }
}`,...(ke=(Se=b.parameters)==null?void 0:Se.docs)==null?void 0:ke.source}}};var Ge,ve,Be;w.parameters={...w.parameters,docs:{...(Ge=w.parameters)==null?void 0:Ge.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(0, 20).build()
  }
}`,...(Be=(ve=w.parameters)==null?void 0:ve.docs)==null?void 0:Be.source}}};var Xe,Ye,Qe;M.parameters={...M.parameters,docs:{...(Xe=M.parameters)==null?void 0:Xe.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-1, 20).build()
  }
}`,...(Qe=(Ye=M.parameters)==null?void 0:Ye.docs)==null?void 0:Qe.source}}};var Te,Oe,Pe;L.parameters={...L.parameters,docs:{...(Te=L.parameters)==null?void 0:Te.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(1, 20).build()
  }
}`,...(Pe=(Oe=L.parameters)==null?void 0:Oe.docs)==null?void 0:Pe.source}}};var Ce,Ee,Ne;R.parameters={...R.parameters,docs:{...(Ce=R.parameters)==null?void 0:Ce.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-3, 20).addLockedLine([-3, 2], [5, 16]).build()
  }
}`,...(Ne=(Ee=R.parameters)==null?void 0:Ee.docs)==null?void 0:Ne.source}}};var je,Ve,ye;W.parameters={...W.parameters,docs:{...(je=W.parameters)==null?void 0:je.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-20, 0).build()
  }
}`,...(ye=(Ve=W.parameters)==null?void 0:Ve.docs)==null?void 0:ye.source}}};var Ie,$e,Fe;q.parameters={...q.parameters,docs:{...(Ie=q.parameters)==null?void 0:Ie.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-20, -1).build()
  }
}`,...(Fe=($e=q.parameters)==null?void 0:$e.docs)==null?void 0:Fe.source}}};var He,Je,De;A.parameters={...A.parameters,docs:{...(He=A.parameters)==null?void 0:He.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(0, 10).withYRange(0, 10).withAxisLabels("Video Game Hours per Week", "Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()
  }
}`,...(De=(Je=A.parameters)==null?void 0:Je.docs)==null?void 0:De.source}}};var Ze,_e,ze;x.parameters={...x.parameters,docs:{...(Ze=x.parameters)==null?void 0:Ze.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-1, 10).withYRange(-1, 10).withAxisLabels("Video Game Hours per Week", "Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()
  }
}`,...(ze=(_e=x.parameters)==null?void 0:_e.docs)==null?void 0:ze.source}}};var Ke,Ue,es;S.parameters={...S.parameters,docs:{...(Ke=S.parameters)==null?void 0:Ke.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(0, 0.5).withYRange(0, 0.5).withTickStep(0.1, 0.1).withGridStep(0.1, 0.1).withAxisLabels("Video Game Hours per Week", "Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()
  }
}`,...(es=(Ue=S.parameters)==null?void 0:Ue.docs)==null?void 0:es.source}}};var ss,rs,is;k.parameters={...k.parameters,docs:{...(ss=k.parameters)==null?void 0:ss.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().build()
  },
  decorators: [MobileContainerDecorator]
}`,...(is=(rs=k.parameters)==null?void 0:rs.docs)==null?void 0:is.source}}};var as,ts,os;G.parameters={...G.parameters,docs:{...(as=G.parameters)==null?void 0:as.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withSegments({
      numSegments: 3
    }).build()
  }
}`,...(os=(ts=G.parameters)==null?void 0:ts.docs)==null?void 0:os.source}}};var ns,cs,us;v.parameters={...v.parameters,docs:{...(ns=v.parameters)==null?void 0:ns.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withCircle().withXRange(-10, 10).withYRange(-5, 5).build()
  },
  // NOTE(jeremy): I migrated these stories to the v3 CSF story format, but
  // I'm unclear why this one story forces mobile when none of the others do,
  // and this story doesn't look mobile-specific. :thinking:
  decorators: [MobileContainerDecorator]
}`,...(us=(cs=v.parameters)==null?void 0:cs.docs)==null?void 0:us.source}}};var ds,ps,ms;B.parameters={...B.parameters,docs:{...(ds=B.parameters)==null?void 0:ds.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().addLockedLine([-3, -3], [3, 3]).withXRange(-5, 5).withYRange(-10, 10).build()
  }
}`,...(ms=(ps=B.parameters)==null?void 0:ps.docs)==null?void 0:ms.source}}};var ls,gs,hs;X.parameters={...X.parameters,docs:{...(ls=X.parameters)==null?void 0:ls.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().addLockedPointAt(3, 2).addLockedPointAt(-1, 1).addLockedPointAt(0, -4).build()
  }
}`,...(hs=(gs=X.parameters)==null?void 0:gs.docs)==null?void 0:hs.source}}};var fs,bs,ws;Y.parameters={...Y.parameters,docs:{...(fs=Y.parameters)==null?void 0:fs.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().addLockedLine([-1, 1], [2, 3]).build()
  }
}`,...(ws=(bs=Y.parameters)==null?void 0:bs.docs)==null?void 0:ws.source}}};var Ms,Ls,Rs;Q.parameters={...Q.parameters,docs:{...(Ms=Q.parameters)==null?void 0:Ms.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withAngle().withProtractor().build()
  }
}`,...(Rs=(Ls=Q.parameters)==null?void 0:Ls.docs)==null?void 0:Rs.source}}};var Ws,qs,As;T.parameters={...T.parameters,docs:{...(Ws=T.parameters)==null?void 0:Ws.docs,source:{originalSource:`{
  args: {
    question: sinusoidWithPiTicks
  }
}`,...(As=(qs=T.parameters)==null?void 0:qs.docs)==null?void 0:As.source}}};var xs,Ss,ks;O.parameters={...O.parameters,docs:{...(xs=O.parameters)==null?void 0:xs.docs,source:{originalSource:`{
  args: {
    question: splitPerseusItem(interactiveGraphQuestionBuilder().build())
  }
}`,...(ks=(Ss=O.parameters)==null?void 0:Ss.docs)==null?void 0:ks.source}}};const Wr=["MafsWithCustomAxisLabels","MafsWithFractionalGridStep","MafsWithFractionalAxisTicks","MafsWithAxesMarkings","MafsWithGridMarkings","MafsWithNoMarkings","MafsWithSmallRange","MafsWithLargeRange","MafsWithYAxisAtLeft","MafsWithYAxisNearLeft","MafsWithYAxisJustOverLeft","MafsWithYAxisOffLeft","MafsWithYAxisOffFarLeft","MafsWithYAxisAtRight","MafsWithYAxisOffRight","MafsWithXAxisAtBottom","MafsWithXAxisNearBottom","MafsWithXAxisOffBottom","MafsWithXAxisJustOverBottom","MafsWithXAxisAtTop","MafsWithXAxisOffTop","MafsWithLabelsAlongEdge","MafsWithLabelsAlongEdgeJustOverLeft","MafsWithLabelsAlongEdgeZoomed","MafsInMobileContainer","MafsWithMultipleSegments","MafsCircleGraphWithNonsquareRange","MafsLineGraphWithNonsquareRange","MafsWithLockedPoints","MafsWithLockedLine","MafsWithProtractor","MafsWithPiTicks","MafsWithAnswerlessData"];export{v as MafsCircleGraphWithNonsquareRange,k as MafsInMobileContainer,B as MafsLineGraphWithNonsquareRange,O as MafsWithAnswerlessData,o as MafsWithAxesMarkings,i as MafsWithCustomAxisLabels,t as MafsWithFractionalAxisTicks,a as MafsWithFractionalGridStep,n as MafsWithGridMarkings,A as MafsWithLabelsAlongEdge,x as MafsWithLabelsAlongEdgeJustOverLeft,S as MafsWithLabelsAlongEdgeZoomed,d as MafsWithLargeRange,Y as MafsWithLockedLine,X as MafsWithLockedPoints,G as MafsWithMultipleSegments,c as MafsWithNoMarkings,T as MafsWithPiTicks,Q as MafsWithProtractor,u as MafsWithSmallRange,w as MafsWithXAxisAtBottom,W as MafsWithXAxisAtTop,R as MafsWithXAxisJustOverBottom,M as MafsWithXAxisNearBottom,L as MafsWithXAxisOffBottom,q as MafsWithXAxisOffTop,p as MafsWithYAxisAtLeft,f as MafsWithYAxisAtRight,l as MafsWithYAxisJustOverLeft,m as MafsWithYAxisNearLeft,h as MafsWithYAxisOffFarLeft,g as MafsWithYAxisOffLeft,b as MafsWithYAxisOffRight,Wr as __namedExportsOrder,Rr as default};
