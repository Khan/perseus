import{j as t}from"./jsx-runtime-BT65X5dW.js";import"./underscore-U-AHniOr.js";import"./core-widget-registry-BDqK5cn0.js";import{g as Qs}from"./test-utils-gBIzEBZJ.js";import{s as Ts}from"./split-perseus-item-DPq5gkED.js";import{V as Os}from"./index-CskvhqFA.js";import{A as Ps}from"./perseus-api-Ty_QvlNi.js";import{R as Is}from"./renderer-C_wlR0qd.js";import{m as Cs}from"./i18n-context-3AkWzTTj.js";import{i as e}from"./interactive-graph-question-builder-ICjdvGjt.js";import{j as Es}from"./interactive-graph.testdata-z73YBaXN.js";import"./index-C6mWTJJr.js";import"./_commonjsHelpers-BosuxZz1.js";import"./util-CqRduJsD.js";import"./perseus-error-CSETqePQ.js";import"./jquery-CkHB0_Mt.js";import"./get-decimal-separator-B2cicA45.js";import"./no-important-DlFk8a1I.js";import"./index-CrGd2QqM.js";import"./stub-tag-editor-B8lH250S.js";import"./text-list-editor-HcP7oGoC.js";import"./index-B1Gws05u.js";import"./index-BzwLglMS.js";import"./index-D7h-teXI.js";import"./zoomable-tex-Dy-nElJT.js";import"./tex-BONImhZG.js";import"./dependencies-BsVPGK1s.js";import"./zoomable-C_CCSKDG.js";import"./svg-image-DTeGfHiV.js";import"./index-fj4wzhGb.js";import"./index-CjnMbH_2.js";import"./fixed-to-responsive-CTsII9Xx.js";import"./constants-BIpV3g0K.js";import"./client-CAS5PaPY.js";import"./inline-icon-AJRwMA4Z.js";import"./icon-paths-C3bPmxpL.js";import"./image-loader-CdkY-jNs.js";import"./lint-D0FI20JF.js";import"./index-Dd-cahjY.js";import"./tiny-invariant-CopsF_GD.js";const Gr={title:"Perseus/Widgets/Interactive Graph Visual Regression Tests",component:Ns,parameters:{chromatic:{disableSnapshot:!1}},decorators:s=>t.jsx(Os,{style:{marginInlineStart:32},children:t.jsx(s,{})})};function Ys(s){return t.jsx("div",{className:"framework-perseus perseus-mobile",children:t.jsx(s,{})})}const i={args:{question:e().withAxisLabels("\\text{Custom $x$ label}","\\text{Custom $y$ label}").build()}},a={args:{question:e().withGridStep(2.571,3.123).build()}},o={args:{question:e().withTickStep(1.5,1.5).build()}},n={args:{question:e().withMarkings("axes").build()}},c={args:{question:e().withMarkings("grid").build()}},u={args:{question:e().withMarkings("none").build()}},d={args:{question:e().withXRange(-2,2).withYRange(-2,2).build()}},m={args:{question:e().withXRange(-50,50).withYRange(-50,50).build()}},p={args:{question:e().withXRange(0,20).addLockedLine([1,1],[5,2]).build()}},l={args:{question:e().withXRange(-1,20).addLockedLine([1,1],[5,2]).build()}},g={args:{question:e().withXRange(-3,20).addLockedLine([1,1],[5,2]).build()}},h={args:{question:e().withXRange(1,20).build()}},f={args:{question:e().withXRange(6,20).build()}},w={args:{question:e().withXRange(-20,0).build()}},b={args:{question:e().withXRange(-20,-1).build()}},M={args:{question:e().withXRange(-20,-6).build()}},R={args:{question:e().withYRange(0,20).build()}},L={args:{question:e().withYRange(-1,20).build()}},q={args:{question:e().withYRange(1,20).build()}},W={args:{question:e().withYRange(-3,20).addLockedLine([-3,2],[5,16]).build()}},A={args:{question:e().withYRange(-20,0).build()}},x={args:{question:e().withYRange(-20,-1).build()}},S={args:{question:e().withXRange(0,10).withYRange(0,10).withAxisLabels("Video Game Hours per Week","Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()}},k={args:{question:e().withXRange(-1,10).withYRange(-1,10).withAxisLabels("Video Game Hours per Week","Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()}},G={args:{question:e().withXRange(0,.5).withYRange(0,.5).withTickStep(.1,.1).withGridStep(.1,.1).withAxisLabels("Video Game Hours per Week","Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()}},v={args:{question:e().build()},decorators:[Ys]},B={args:{question:e().withSegments({numSegments:3}).build()}},X={args:{question:e().withCircle().withXRange(-10,10).withYRange(-5,5).build()},decorators:[Ys]},Y={args:{question:e().addLockedLine([-3,-3],[3,3]).withXRange(-5,5).withYRange(-10,10).build()}},Q={args:{question:e().addLockedPointAt(3,2).addLockedPointAt(-1,1).addLockedPointAt(0,-4).build()}},T={args:{question:e().addLockedLine([-1,1],[2,3]).build()}},O={args:{question:e().withAngle().withProtractor().build()}},P={args:{question:Es}},I={args:{question:(()=>{const s=e().build(),r=Qs({question:s});return Ts(r).question})()}};function Ns(s){const{question:r}=s;return t.jsx(Is,{strings:Cs,content:r.content,widgets:r.widgets,images:r.images,apiOptions:Ps.defaults})}var C,E,N;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withAxisLabels("\\\\text{Custom $x$ label}", "\\\\text{Custom $y$ label}").build()
  }
}`,...(N=(E=i.parameters)==null?void 0:E.docs)==null?void 0:N.source}}};var j,F,V;a.parameters={...a.parameters,docs:{...(j=a.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withGridStep(2.571, 3.123).build()
  }
}`,...(V=(F=a.parameters)==null?void 0:F.docs)==null?void 0:V.source}}};var y,$,H;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withTickStep(1.5, 1.5).build()
  }
}`,...(H=($=o.parameters)==null?void 0:$.docs)==null?void 0:H.source}}};var J,D,Z;n.parameters={...n.parameters,docs:{...(J=n.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withMarkings("axes").build()
  }
}`,...(Z=(D=n.parameters)==null?void 0:D.docs)==null?void 0:Z.source}}};var _,z,K;c.parameters={...c.parameters,docs:{...(_=c.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withMarkings("grid").build()
  }
}`,...(K=(z=c.parameters)==null?void 0:z.docs)==null?void 0:K.source}}};var U,ee,se;u.parameters={...u.parameters,docs:{...(U=u.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withMarkings("none").build()
  }
}`,...(se=(ee=u.parameters)==null?void 0:ee.docs)==null?void 0:se.source}}};var re,te,ie;d.parameters={...d.parameters,docs:{...(re=d.parameters)==null?void 0:re.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-2, 2).withYRange(-2, 2).build()
  }
}`,...(ie=(te=d.parameters)==null?void 0:te.docs)==null?void 0:ie.source}}};var ae,oe,ne;m.parameters={...m.parameters,docs:{...(ae=m.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-50, 50).withYRange(-50, 50).build()
  }
}`,...(ne=(oe=m.parameters)==null?void 0:oe.docs)==null?void 0:ne.source}}};var ce,ue,de;p.parameters={...p.parameters,docs:{...(ce=p.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(0, 20).addLockedLine([1, 1], [5, 2]).build()
  }
}`,...(de=(ue=p.parameters)==null?void 0:ue.docs)==null?void 0:de.source}}};var me,pe,le;l.parameters={...l.parameters,docs:{...(me=l.parameters)==null?void 0:me.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-1, 20).addLockedLine([1, 1], [5, 2]).build()
  }
}`,...(le=(pe=l.parameters)==null?void 0:pe.docs)==null?void 0:le.source}}};var ge,he,fe;g.parameters={...g.parameters,docs:{...(ge=g.parameters)==null?void 0:ge.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-3, 20).addLockedLine([1, 1], [5, 2]).build()
  }
}`,...(fe=(he=g.parameters)==null?void 0:he.docs)==null?void 0:fe.source}}};var we,be,Me;h.parameters={...h.parameters,docs:{...(we=h.parameters)==null?void 0:we.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(1, 20).build()
  }
}`,...(Me=(be=h.parameters)==null?void 0:be.docs)==null?void 0:Me.source}}};var Re,Le,qe;f.parameters={...f.parameters,docs:{...(Re=f.parameters)==null?void 0:Re.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(6, 20).build()
  }
}`,...(qe=(Le=f.parameters)==null?void 0:Le.docs)==null?void 0:qe.source}}};var We,Ae,xe;w.parameters={...w.parameters,docs:{...(We=w.parameters)==null?void 0:We.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-20, 0).build()
  }
}`,...(xe=(Ae=w.parameters)==null?void 0:Ae.docs)==null?void 0:xe.source}}};var Se,ke,Ge;b.parameters={...b.parameters,docs:{...(Se=b.parameters)==null?void 0:Se.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-20, -1).build()
  }
}`,...(Ge=(ke=b.parameters)==null?void 0:ke.docs)==null?void 0:Ge.source}}};var ve,Be,Xe;M.parameters={...M.parameters,docs:{...(ve=M.parameters)==null?void 0:ve.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-20, -6).build()
  }
}`,...(Xe=(Be=M.parameters)==null?void 0:Be.docs)==null?void 0:Xe.source}}};var Ye,Qe,Te;R.parameters={...R.parameters,docs:{...(Ye=R.parameters)==null?void 0:Ye.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(0, 20).build()
  }
}`,...(Te=(Qe=R.parameters)==null?void 0:Qe.docs)==null?void 0:Te.source}}};var Oe,Pe,Ie;L.parameters={...L.parameters,docs:{...(Oe=L.parameters)==null?void 0:Oe.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-1, 20).build()
  }
}`,...(Ie=(Pe=L.parameters)==null?void 0:Pe.docs)==null?void 0:Ie.source}}};var Ce,Ee,Ne;q.parameters={...q.parameters,docs:{...(Ce=q.parameters)==null?void 0:Ce.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(1, 20).build()
  }
}`,...(Ne=(Ee=q.parameters)==null?void 0:Ee.docs)==null?void 0:Ne.source}}};var je,Fe,Ve;W.parameters={...W.parameters,docs:{...(je=W.parameters)==null?void 0:je.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-3, 20).addLockedLine([-3, 2], [5, 16]).build()
  }
}`,...(Ve=(Fe=W.parameters)==null?void 0:Fe.docs)==null?void 0:Ve.source}}};var ye,$e,He;A.parameters={...A.parameters,docs:{...(ye=A.parameters)==null?void 0:ye.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-20, 0).build()
  }
}`,...(He=($e=A.parameters)==null?void 0:$e.docs)==null?void 0:He.source}}};var Je,De,Ze;x.parameters={...x.parameters,docs:{...(Je=x.parameters)==null?void 0:Je.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-20, -1).build()
  }
}`,...(Ze=(De=x.parameters)==null?void 0:De.docs)==null?void 0:Ze.source}}};var _e,ze,Ke;S.parameters={...S.parameters,docs:{...(_e=S.parameters)==null?void 0:_e.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(0, 10).withYRange(0, 10).withAxisLabels("Video Game Hours per Week", "Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()
  }
}`,...(Ke=(ze=S.parameters)==null?void 0:ze.docs)==null?void 0:Ke.source}}};var Ue,es,ss;k.parameters={...k.parameters,docs:{...(Ue=k.parameters)==null?void 0:Ue.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-1, 10).withYRange(-1, 10).withAxisLabels("Video Game Hours per Week", "Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()
  }
}`,...(ss=(es=k.parameters)==null?void 0:es.docs)==null?void 0:ss.source}}};var rs,ts,is;G.parameters={...G.parameters,docs:{...(rs=G.parameters)==null?void 0:rs.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(0, 0.5).withYRange(0, 0.5).withTickStep(0.1, 0.1).withGridStep(0.1, 0.1).withAxisLabels("Video Game Hours per Week", "Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()
  }
}`,...(is=(ts=G.parameters)==null?void 0:ts.docs)==null?void 0:is.source}}};var as,os,ns;v.parameters={...v.parameters,docs:{...(as=v.parameters)==null?void 0:as.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().build()
  },
  decorators: [MobileContainerDecorator]
}`,...(ns=(os=v.parameters)==null?void 0:os.docs)==null?void 0:ns.source}}};var cs,us,ds;B.parameters={...B.parameters,docs:{...(cs=B.parameters)==null?void 0:cs.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withSegments({
      numSegments: 3
    }).build()
  }
}`,...(ds=(us=B.parameters)==null?void 0:us.docs)==null?void 0:ds.source}}};var ms,ps,ls;X.parameters={...X.parameters,docs:{...(ms=X.parameters)==null?void 0:ms.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withCircle().withXRange(-10, 10).withYRange(-5, 5).build()
  },
  // NOTE(jeremy): I migrated these stories to the v3 CSF story format, but
  // I'm unclear why this one story forces mobile when none of the others do,
  // and this story doesn't look mobile-specific. :thinking:
  decorators: [MobileContainerDecorator]
}`,...(ls=(ps=X.parameters)==null?void 0:ps.docs)==null?void 0:ls.source}}};var gs,hs,fs;Y.parameters={...Y.parameters,docs:{...(gs=Y.parameters)==null?void 0:gs.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().addLockedLine([-3, -3], [3, 3]).withXRange(-5, 5).withYRange(-10, 10).build()
  }
}`,...(fs=(hs=Y.parameters)==null?void 0:hs.docs)==null?void 0:fs.source}}};var ws,bs,Ms;Q.parameters={...Q.parameters,docs:{...(ws=Q.parameters)==null?void 0:ws.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().addLockedPointAt(3, 2).addLockedPointAt(-1, 1).addLockedPointAt(0, -4).build()
  }
}`,...(Ms=(bs=Q.parameters)==null?void 0:bs.docs)==null?void 0:Ms.source}}};var Rs,Ls,qs;T.parameters={...T.parameters,docs:{...(Rs=T.parameters)==null?void 0:Rs.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().addLockedLine([-1, 1], [2, 3]).build()
  }
}`,...(qs=(Ls=T.parameters)==null?void 0:Ls.docs)==null?void 0:qs.source}}};var Ws,As,xs;O.parameters={...O.parameters,docs:{...(Ws=O.parameters)==null?void 0:Ws.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withAngle().withProtractor().build()
  }
}`,...(xs=(As=O.parameters)==null?void 0:As.docs)==null?void 0:xs.source}}};var Ss,ks,Gs;P.parameters={...P.parameters,docs:{...(Ss=P.parameters)==null?void 0:Ss.docs,source:{originalSource:`{
  args: {
    question: sinusoidWithPiTicks
  }
}`,...(Gs=(ks=P.parameters)==null?void 0:ks.docs)==null?void 0:Gs.source}}};var vs,Bs,Xs;I.parameters={...I.parameters,docs:{...(vs=I.parameters)==null?void 0:vs.docs,source:{originalSource:`{
  args: {
    question: (() => {
      const question = interactiveGraphQuestionBuilder().build();
      const answerfulItem = generateTestPerseusItem({
        question
      });
      const answerlessItem = splitPerseusItem(answerfulItem);
      return answerlessItem.question;
    })()
  }
}`,...(Xs=(Bs=I.parameters)==null?void 0:Bs.docs)==null?void 0:Xs.source}}};const vr=["MafsWithCustomAxisLabels","MafsWithFractionalGridStep","MafsWithFractionalAxisTicks","MafsWithAxesMarkings","MafsWithGridMarkings","MafsWithNoMarkings","MafsWithSmallRange","MafsWithLargeRange","MafsWithYAxisAtLeft","MafsWithYAxisNearLeft","MafsWithYAxisJustOverLeft","MafsWithYAxisOffLeft","MafsWithYAxisOffFarLeft","MafsWithYAxisAtRight","MafsWithYAxisOffRight","MafsWithYAxisOffFarRight","MafsWithXAxisAtBottom","MafsWithXAxisNearBottom","MafsWithXAxisOffBottom","MafsWithXAxisJustOverBottom","MafsWithXAxisAtTop","MafsWithXAxisOffTop","MafsWithLabelsAlongEdge","MafsWithLabelsAlongEdgeJustOverLeft","MafsWithLabelsAlongEdgeZoomed","MafsInMobileContainer","MafsWithMultipleSegments","MafsCircleGraphWithNonsquareRange","MafsLineGraphWithNonsquareRange","MafsWithLockedPoints","MafsWithLockedLine","MafsWithProtractor","MafsWithPiTicks","MafsWithAnswerlessData"];export{X as MafsCircleGraphWithNonsquareRange,v as MafsInMobileContainer,Y as MafsLineGraphWithNonsquareRange,I as MafsWithAnswerlessData,n as MafsWithAxesMarkings,i as MafsWithCustomAxisLabels,o as MafsWithFractionalAxisTicks,a as MafsWithFractionalGridStep,c as MafsWithGridMarkings,S as MafsWithLabelsAlongEdge,k as MafsWithLabelsAlongEdgeJustOverLeft,G as MafsWithLabelsAlongEdgeZoomed,m as MafsWithLargeRange,T as MafsWithLockedLine,Q as MafsWithLockedPoints,B as MafsWithMultipleSegments,u as MafsWithNoMarkings,P as MafsWithPiTicks,O as MafsWithProtractor,d as MafsWithSmallRange,R as MafsWithXAxisAtBottom,A as MafsWithXAxisAtTop,W as MafsWithXAxisJustOverBottom,L as MafsWithXAxisNearBottom,q as MafsWithXAxisOffBottom,x as MafsWithXAxisOffTop,p as MafsWithYAxisAtLeft,w as MafsWithYAxisAtRight,g as MafsWithYAxisJustOverLeft,l as MafsWithYAxisNearLeft,f as MafsWithYAxisOffFarLeft,M as MafsWithYAxisOffFarRight,h as MafsWithYAxisOffLeft,b as MafsWithYAxisOffRight,vr as __namedExportsOrder,Gr as default};
