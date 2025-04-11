import{j as r}from"./jsx-runtime-BT65X5dW.js";import"./underscore-U-AHniOr.js";import"./core-widget-registry-KZ25Ogfd.js";import{s as Qs}from"./split-perseus-item-DYShDb5G.js";import{V as Os}from"./index-CskvhqFA.js";import{A as Ts}from"./perseus-api-Ty_QvlNi.js";import{R as Ps}from"./renderer-B9M7a8hq.js";import{m as Cs}from"./i18n-context-3AkWzTTj.js";import{i as e}from"./interactive-graph-question-builder-Di7B97iI.js";import{j as Es}from"./interactive-graph.testdata-CPB2IZMq.js";import"./index-C6mWTJJr.js";import"./_commonjsHelpers-BosuxZz1.js";import"./util-BPd3URh2.js";import"./perseus-error-CSETqePQ.js";import"./jquery-CkHB0_Mt.js";import"./get-decimal-separator-B2cicA45.js";import"./no-important-DlFk8a1I.js";import"./index-CrGd2QqM.js";import"./stub-tag-editor-B8lH250S.js";import"./text-list-editor-HcP7oGoC.js";import"./index-B1Gws05u.js";import"./index-BzwLglMS.js";import"./index-D7h-teXI.js";import"./zoomable-tex-Dy-nElJT.js";import"./tex-BONImhZG.js";import"./dependencies-BsVPGK1s.js";import"./zoomable-C_CCSKDG.js";import"./svg-image-D1ElhkP2.js";import"./index-fj4wzhGb.js";import"./index-CjnMbH_2.js";import"./fixed-to-responsive-CTsII9Xx.js";import"./constants-BIpV3g0K.js";import"./client-CAS5PaPY.js";import"./inline-icon-AJRwMA4Z.js";import"./icon-paths-C3bPmxpL.js";import"./image-loader-CdkY-jNs.js";import"./lint-D0FI20JF.js";import"./index-Dd-cahjY.js";import"./tiny-invariant-CopsF_GD.js";const xr={title:"Perseus/Widgets/Interactive Graph Visual Regression Tests",component:Ns,parameters:{chromatic:{disableSnapshot:!1}},decorators:s=>r.jsx(Os,{style:{marginInlineStart:32},children:r.jsx(s,{})})};function Ys(s){return r.jsx("div",{className:"framework-perseus perseus-mobile",children:r.jsx(s,{})})}const i={args:{question:e().withAxisLabels("\\text{Custom $x$ label}","\\text{Custom $y$ label}").build()}},a={args:{question:e().withGridStep(2.571,3.123).build()}},t={args:{question:e().withTickStep(1.5,1.5).build()}},o={args:{question:e().withMarkings("axes").build()}},n={args:{question:e().withMarkings("grid").build()}},c={args:{question:e().withMarkings("none").build()}},u={args:{question:e().withXRange(-2,2).withYRange(-2,2).build()}},d={args:{question:e().withXRange(-50,50).withYRange(-50,50).build()}},p={args:{question:e().withXRange(0,20).addLockedLine([1,1],[5,2]).build()}},m={args:{question:e().withXRange(-1,20).addLockedLine([1,1],[5,2]).build()}},g={args:{question:e().withXRange(-3,20).addLockedLine([1,1],[5,2]).build()}},l={args:{question:e().withXRange(1,20).build()}},h={args:{question:e().withXRange(6,20).build()}},f={args:{question:e().withXRange(-20,0).build()}},b={args:{question:e().withXRange(-20,-1).build()}},w={args:{question:e().withXRange(-20,-6).build()}},M={args:{question:e().withYRange(0,20).build()}},R={args:{question:e().withYRange(-1,20).build()}},L={args:{question:e().withYRange(1,20).build()}},W={args:{question:e().withYRange(-3,20).addLockedLine([-3,2],[5,16]).build()}},q={args:{question:e().withYRange(-20,0).build()}},A={args:{question:e().withYRange(-20,-1).build()}},x={args:{question:e().withXRange(0,10).withYRange(0,10).withAxisLabels("Video Game Hours per Week","Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()}},S={args:{question:e().withXRange(-1,10).withYRange(-1,10).withAxisLabels("Video Game Hours per Week","Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()}},k={args:{question:e().withXRange(0,.5).withYRange(0,.5).withTickStep(.1,.1).withGridStep(.1,.1).withAxisLabels("Video Game Hours per Week","Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()}},G={args:{question:e().build()},decorators:[Ys]},v={args:{question:e().withSegments({numSegments:3}).build()}},B={args:{question:e().withCircle().withXRange(-10,10).withYRange(-5,5).build()},decorators:[Ys]},X={args:{question:e().addLockedLine([-3,-3],[3,3]).withXRange(-5,5).withYRange(-10,10).build()}},Y={args:{question:e().addLockedPointAt(3,2).addLockedPointAt(-1,1).addLockedPointAt(0,-4).build()}},Q={args:{question:e().addLockedLine([-1,1],[2,3]).build()}},O={args:{question:e().withAngle().withProtractor().build()}},T={args:{question:Es}},P={args:{question:Qs(e().build())}};function Ns(s){const{question:C}=s;return r.jsx(Ps,{strings:Cs,content:C.content,widgets:C.widgets,images:C.images,apiOptions:Ts.defaults})}var E,N,j;i.parameters={...i.parameters,docs:{...(E=i.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withAxisLabels("\\\\text{Custom $x$ label}", "\\\\text{Custom $y$ label}").build()
  }
}`,...(j=(N=i.parameters)==null?void 0:N.docs)==null?void 0:j.source}}};var F,V,y;a.parameters={...a.parameters,docs:{...(F=a.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withGridStep(2.571, 3.123).build()
  }
}`,...(y=(V=a.parameters)==null?void 0:V.docs)==null?void 0:y.source}}};var I,$,H;t.parameters={...t.parameters,docs:{...(I=t.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withTickStep(1.5, 1.5).build()
  }
}`,...(H=($=t.parameters)==null?void 0:$.docs)==null?void 0:H.source}}};var J,D,Z;o.parameters={...o.parameters,docs:{...(J=o.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withMarkings("axes").build()
  }
}`,...(Z=(D=o.parameters)==null?void 0:D.docs)==null?void 0:Z.source}}};var _,z,K;n.parameters={...n.parameters,docs:{...(_=n.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withMarkings("grid").build()
  }
}`,...(K=(z=n.parameters)==null?void 0:z.docs)==null?void 0:K.source}}};var U,ee,se;c.parameters={...c.parameters,docs:{...(U=c.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withMarkings("none").build()
  }
}`,...(se=(ee=c.parameters)==null?void 0:ee.docs)==null?void 0:se.source}}};var re,ie,ae;u.parameters={...u.parameters,docs:{...(re=u.parameters)==null?void 0:re.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-2, 2).withYRange(-2, 2).build()
  }
}`,...(ae=(ie=u.parameters)==null?void 0:ie.docs)==null?void 0:ae.source}}};var te,oe,ne;d.parameters={...d.parameters,docs:{...(te=d.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-50, 50).withYRange(-50, 50).build()
  }
}`,...(ne=(oe=d.parameters)==null?void 0:oe.docs)==null?void 0:ne.source}}};var ce,ue,de;p.parameters={...p.parameters,docs:{...(ce=p.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(0, 20).addLockedLine([1, 1], [5, 2]).build()
  }
}`,...(de=(ue=p.parameters)==null?void 0:ue.docs)==null?void 0:de.source}}};var pe,me,ge;m.parameters={...m.parameters,docs:{...(pe=m.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-1, 20).addLockedLine([1, 1], [5, 2]).build()
  }
}`,...(ge=(me=m.parameters)==null?void 0:me.docs)==null?void 0:ge.source}}};var le,he,fe;g.parameters={...g.parameters,docs:{...(le=g.parameters)==null?void 0:le.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-3, 20).addLockedLine([1, 1], [5, 2]).build()
  }
}`,...(fe=(he=g.parameters)==null?void 0:he.docs)==null?void 0:fe.source}}};var be,we,Me;l.parameters={...l.parameters,docs:{...(be=l.parameters)==null?void 0:be.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(1, 20).build()
  }
}`,...(Me=(we=l.parameters)==null?void 0:we.docs)==null?void 0:Me.source}}};var Re,Le,We;h.parameters={...h.parameters,docs:{...(Re=h.parameters)==null?void 0:Re.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(6, 20).build()
  }
}`,...(We=(Le=h.parameters)==null?void 0:Le.docs)==null?void 0:We.source}}};var qe,Ae,xe;f.parameters={...f.parameters,docs:{...(qe=f.parameters)==null?void 0:qe.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-20, 0).build()
  }
}`,...(xe=(Ae=f.parameters)==null?void 0:Ae.docs)==null?void 0:xe.source}}};var Se,ke,Ge;b.parameters={...b.parameters,docs:{...(Se=b.parameters)==null?void 0:Se.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-20, -1).build()
  }
}`,...(Ge=(ke=b.parameters)==null?void 0:ke.docs)==null?void 0:Ge.source}}};var ve,Be,Xe;w.parameters={...w.parameters,docs:{...(ve=w.parameters)==null?void 0:ve.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-20, -6).build()
  }
}`,...(Xe=(Be=w.parameters)==null?void 0:Be.docs)==null?void 0:Xe.source}}};var Ye,Qe,Oe;M.parameters={...M.parameters,docs:{...(Ye=M.parameters)==null?void 0:Ye.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(0, 20).build()
  }
}`,...(Oe=(Qe=M.parameters)==null?void 0:Qe.docs)==null?void 0:Oe.source}}};var Te,Pe,Ce;R.parameters={...R.parameters,docs:{...(Te=R.parameters)==null?void 0:Te.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-1, 20).build()
  }
}`,...(Ce=(Pe=R.parameters)==null?void 0:Pe.docs)==null?void 0:Ce.source}}};var Ee,Ne,je;L.parameters={...L.parameters,docs:{...(Ee=L.parameters)==null?void 0:Ee.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(1, 20).build()
  }
}`,...(je=(Ne=L.parameters)==null?void 0:Ne.docs)==null?void 0:je.source}}};var Fe,Ve,ye;W.parameters={...W.parameters,docs:{...(Fe=W.parameters)==null?void 0:Fe.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-3, 20).addLockedLine([-3, 2], [5, 16]).build()
  }
}`,...(ye=(Ve=W.parameters)==null?void 0:Ve.docs)==null?void 0:ye.source}}};var Ie,$e,He;q.parameters={...q.parameters,docs:{...(Ie=q.parameters)==null?void 0:Ie.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-20, 0).build()
  }
}`,...(He=($e=q.parameters)==null?void 0:$e.docs)==null?void 0:He.source}}};var Je,De,Ze;A.parameters={...A.parameters,docs:{...(Je=A.parameters)==null?void 0:Je.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-20, -1).build()
  }
}`,...(Ze=(De=A.parameters)==null?void 0:De.docs)==null?void 0:Ze.source}}};var _e,ze,Ke;x.parameters={...x.parameters,docs:{...(_e=x.parameters)==null?void 0:_e.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(0, 10).withYRange(0, 10).withAxisLabels("Video Game Hours per Week", "Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()
  }
}`,...(Ke=(ze=x.parameters)==null?void 0:ze.docs)==null?void 0:Ke.source}}};var Ue,es,ss;S.parameters={...S.parameters,docs:{...(Ue=S.parameters)==null?void 0:Ue.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-1, 10).withYRange(-1, 10).withAxisLabels("Video Game Hours per Week", "Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()
  }
}`,...(ss=(es=S.parameters)==null?void 0:es.docs)==null?void 0:ss.source}}};var rs,is,as;k.parameters={...k.parameters,docs:{...(rs=k.parameters)==null?void 0:rs.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(0, 0.5).withYRange(0, 0.5).withTickStep(0.1, 0.1).withGridStep(0.1, 0.1).withAxisLabels("Video Game Hours per Week", "Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()
  }
}`,...(as=(is=k.parameters)==null?void 0:is.docs)==null?void 0:as.source}}};var ts,os,ns;G.parameters={...G.parameters,docs:{...(ts=G.parameters)==null?void 0:ts.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().build()
  },
  decorators: [MobileContainerDecorator]
}`,...(ns=(os=G.parameters)==null?void 0:os.docs)==null?void 0:ns.source}}};var cs,us,ds;v.parameters={...v.parameters,docs:{...(cs=v.parameters)==null?void 0:cs.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withSegments({
      numSegments: 3
    }).build()
  }
}`,...(ds=(us=v.parameters)==null?void 0:us.docs)==null?void 0:ds.source}}};var ps,ms,gs;B.parameters={...B.parameters,docs:{...(ps=B.parameters)==null?void 0:ps.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withCircle().withXRange(-10, 10).withYRange(-5, 5).build()
  },
  // NOTE(jeremy): I migrated these stories to the v3 CSF story format, but
  // I'm unclear why this one story forces mobile when none of the others do,
  // and this story doesn't look mobile-specific. :thinking:
  decorators: [MobileContainerDecorator]
}`,...(gs=(ms=B.parameters)==null?void 0:ms.docs)==null?void 0:gs.source}}};var ls,hs,fs;X.parameters={...X.parameters,docs:{...(ls=X.parameters)==null?void 0:ls.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().addLockedLine([-3, -3], [3, 3]).withXRange(-5, 5).withYRange(-10, 10).build()
  }
}`,...(fs=(hs=X.parameters)==null?void 0:hs.docs)==null?void 0:fs.source}}};var bs,ws,Ms;Y.parameters={...Y.parameters,docs:{...(bs=Y.parameters)==null?void 0:bs.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().addLockedPointAt(3, 2).addLockedPointAt(-1, 1).addLockedPointAt(0, -4).build()
  }
}`,...(Ms=(ws=Y.parameters)==null?void 0:ws.docs)==null?void 0:Ms.source}}};var Rs,Ls,Ws;Q.parameters={...Q.parameters,docs:{...(Rs=Q.parameters)==null?void 0:Rs.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().addLockedLine([-1, 1], [2, 3]).build()
  }
}`,...(Ws=(Ls=Q.parameters)==null?void 0:Ls.docs)==null?void 0:Ws.source}}};var qs,As,xs;O.parameters={...O.parameters,docs:{...(qs=O.parameters)==null?void 0:qs.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withAngle().withProtractor().build()
  }
}`,...(xs=(As=O.parameters)==null?void 0:As.docs)==null?void 0:xs.source}}};var Ss,ks,Gs;T.parameters={...T.parameters,docs:{...(Ss=T.parameters)==null?void 0:Ss.docs,source:{originalSource:`{
  args: {
    question: sinusoidWithPiTicks
  }
}`,...(Gs=(ks=T.parameters)==null?void 0:ks.docs)==null?void 0:Gs.source}}};var vs,Bs,Xs;P.parameters={...P.parameters,docs:{...(vs=P.parameters)==null?void 0:vs.docs,source:{originalSource:`{
  args: {
    question: splitPerseusItem(interactiveGraphQuestionBuilder().build())
  }
}`,...(Xs=(Bs=P.parameters)==null?void 0:Bs.docs)==null?void 0:Xs.source}}};const Sr=["MafsWithCustomAxisLabels","MafsWithFractionalGridStep","MafsWithFractionalAxisTicks","MafsWithAxesMarkings","MafsWithGridMarkings","MafsWithNoMarkings","MafsWithSmallRange","MafsWithLargeRange","MafsWithYAxisAtLeft","MafsWithYAxisNearLeft","MafsWithYAxisJustOverLeft","MafsWithYAxisOffLeft","MafsWithYAxisOffFarLeft","MafsWithYAxisAtRight","MafsWithYAxisOffRight","MafsWithYAxisOffFarRight","MafsWithXAxisAtBottom","MafsWithXAxisNearBottom","MafsWithXAxisOffBottom","MafsWithXAxisJustOverBottom","MafsWithXAxisAtTop","MafsWithXAxisOffTop","MafsWithLabelsAlongEdge","MafsWithLabelsAlongEdgeJustOverLeft","MafsWithLabelsAlongEdgeZoomed","MafsInMobileContainer","MafsWithMultipleSegments","MafsCircleGraphWithNonsquareRange","MafsLineGraphWithNonsquareRange","MafsWithLockedPoints","MafsWithLockedLine","MafsWithProtractor","MafsWithPiTicks","MafsWithAnswerlessData"];export{B as MafsCircleGraphWithNonsquareRange,G as MafsInMobileContainer,X as MafsLineGraphWithNonsquareRange,P as MafsWithAnswerlessData,o as MafsWithAxesMarkings,i as MafsWithCustomAxisLabels,t as MafsWithFractionalAxisTicks,a as MafsWithFractionalGridStep,n as MafsWithGridMarkings,x as MafsWithLabelsAlongEdge,S as MafsWithLabelsAlongEdgeJustOverLeft,k as MafsWithLabelsAlongEdgeZoomed,d as MafsWithLargeRange,Q as MafsWithLockedLine,Y as MafsWithLockedPoints,v as MafsWithMultipleSegments,c as MafsWithNoMarkings,T as MafsWithPiTicks,O as MafsWithProtractor,u as MafsWithSmallRange,M as MafsWithXAxisAtBottom,q as MafsWithXAxisAtTop,W as MafsWithXAxisJustOverBottom,R as MafsWithXAxisNearBottom,L as MafsWithXAxisOffBottom,A as MafsWithXAxisOffTop,p as MafsWithYAxisAtLeft,f as MafsWithYAxisAtRight,g as MafsWithYAxisJustOverLeft,m as MafsWithYAxisNearLeft,h as MafsWithYAxisOffFarLeft,w as MafsWithYAxisOffFarRight,l as MafsWithYAxisOffLeft,b as MafsWithYAxisOffRight,Sr as __namedExportsOrder,xr as default};
