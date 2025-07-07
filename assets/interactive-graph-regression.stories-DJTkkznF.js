import{j as a,V as ci,R as ui,A as di,w as gi,cT as li,c$ as hi}from"./iframe-Fv9__JIn.js";import{i as e}from"./interactive-graph-question-builder-yD5kKK-I.js";import{j as pi}from"./interactive-graph.testdata-Cv78II3E.js";const Wi={title:"Perseus/Widgets/Interactive Graph Visual Regression Tests",component:mi,parameters:{chromatic:{disableSnapshot:!1}},decorators:s=>a.jsx(ci,{style:{marginInlineStart:32},children:a.jsx(s,{})})};function ni(s){return a.jsx("div",{className:"framework-perseus perseus-mobile",children:a.jsx(s,{})})}const t={args:{question:e().withAxisLabels("\\text{Custom $x$ label}","\\text{Custom $y$ label}").build()}},r={args:{question:e().withGridStep(2.571,3.123).build()}},o={args:{question:e().withTickStep(1.5,1.5).build()}},n={args:{question:e().withMarkings("axes").build()}},c={args:{question:e().withMarkings("grid").build()}},u={args:{question:e().withMarkings("none").build()}},d={args:{question:e().withXRange(-2,2).withYRange(-2,2).build()}},g={args:{question:e().withXRange(-50,50).withYRange(-50,50).build()}},l={args:{question:e().withXRange(0,20).addLockedLine([1,1],[5,2]).build()}},h={args:{question:e().withXRange(-1,20).addLockedLine([1,1],[5,2]).build()}},p={args:{question:e().withXRange(-3,20).addLockedLine([1,1],[5,2]).build()}},m={args:{question:e().withXRange(1,20).build()}},w={args:{question:e().withXRange(6,20).build()}},b={args:{question:e().withXRange(-20,0).build()}},f={args:{question:e().withXRange(-20,-1).build()}},L={args:{question:e().withXRange(-20,-6).build()}},W={args:{question:e().withYRange(0,20).build()}},M={args:{question:e().withYRange(-1,20).build()}},R={args:{question:e().withYRange(1,20).build()}},q={args:{question:e().withYRange(-3,20).addLockedLine([-3,2],[5,16]).build()}},A={args:{question:e().withYRange(-20,0).build()}},k={args:{question:e().withYRange(-20,-1).build()}},S={args:{question:e().withXRange(-10,10).withYRange(-10,10).withAxisLabels("Video Game Hours per Week","Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()}},x={args:{question:e().withXRange(0,10).withYRange(0,10).withAxisLabels("Video Game Hours per Week","Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()}},G={args:{question:e().withXRange(-1,10).withYRange(-1,10).withAxisLabels("Video Game Hours per Week","Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()}},X={args:{question:e().withXRange(0,.01).withYRange(0,.01).withTickStep(.001,.001).withGridStep(.001,.001).withAxisLabels("Video Game Hours per Week","Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()}},Y={args:{question:e().withXRange(-.03,.84).withYRange(-2.8,63).withTickStep(.2,10).withGridStep(.05,5).withSnapStep(.025,2).withAxisLabels("Time (seconds)","Distance (meters)").withLabelLocation("alongEdge").build()}},v={args:{question:e().withXRange(-30,840).withYRange(-2.8,63).withTickStep(200,10).withGridStep(50,5).withSnapStep(25,2).withAxisLabels("Time (seconds)","Distance (meters)").withLabelLocation("alongEdge").build()}},B={args:{question:e().withXRange(0,.5).withYRange(0,.5).withTickStep(.1,.1).withGridStep(.1,.1).withAxisLabels("Video Game Hours per Week","Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()}},T={args:{question:e().build()},decorators:[ni]},Q={args:{question:e().withSegments({numSegments:3}).build()}},E={args:{question:e().withCircle().withXRange(-10,10).withYRange(-5,5).build()},decorators:[ni]},O={args:{question:e().addLockedLine([-3,-3],[3,3]).withXRange(-5,5).withYRange(-10,10).build()}},P={args:{question:e().addLockedPointAt(3,2).addLockedPointAt(-1,1).addLockedPointAt(0,-4).build()}},C={args:{question:e().addLockedLine([-1,1],[2,3]).build()}},F={args:{question:e().withAngle().withProtractor().build()}},I={args:{question:pi}},N={args:{question:(()=>{const s=e().build(),i=li({question:s});return hi(i).question})()}};function j(s){return e().withNoInteractiveFigure().addLockedLine([2,2],[9,9],{kind:"segment",weight:s}).addLockedLine([2,1],[9,8],{kind:"ray",weight:s}).addLockedLine([2,0],[9,7],{kind:"line",weight:s}).addLockedPolygon([[.5,3.5],[1.5,4.5],[2.5,3.5],[1.5,2.5]],{weight:s,color:"pink"}).build()}const V={args:{question:j("thin")}},y={args:{question:j("medium")}},H={args:{question:j("thick")}};function mi(s){const{question:i}=s;return a.jsx(ui,{strings:gi,content:i.content,widgets:i.widgets,images:i.images,apiOptions:di.defaults})}var D,$,J;t.parameters={...t.parameters,docs:{...(D=t.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withAxisLabels("\\\\text{Custom $x$ label}", "\\\\text{Custom $y$ label}").build()
  }
}`,...(J=($=t.parameters)==null?void 0:$.docs)==null?void 0:J.source}}};var Z,_,z;r.parameters={...r.parameters,docs:{...(Z=r.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withGridStep(2.571, 3.123).build()
  }
}`,...(z=(_=r.parameters)==null?void 0:_.docs)==null?void 0:z.source}}};var K,U,ee;o.parameters={...o.parameters,docs:{...(K=o.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withTickStep(1.5, 1.5).build()
  }
}`,...(ee=(U=o.parameters)==null?void 0:U.docs)==null?void 0:ee.source}}};var se,ie,ae;n.parameters={...n.parameters,docs:{...(se=n.parameters)==null?void 0:se.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withMarkings("axes").build()
  }
}`,...(ae=(ie=n.parameters)==null?void 0:ie.docs)==null?void 0:ae.source}}};var te,re,oe;c.parameters={...c.parameters,docs:{...(te=c.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withMarkings("grid").build()
  }
}`,...(oe=(re=c.parameters)==null?void 0:re.docs)==null?void 0:oe.source}}};var ne,ce,ue;u.parameters={...u.parameters,docs:{...(ne=u.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withMarkings("none").build()
  }
}`,...(ue=(ce=u.parameters)==null?void 0:ce.docs)==null?void 0:ue.source}}};var de,ge,le;d.parameters={...d.parameters,docs:{...(de=d.parameters)==null?void 0:de.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-2, 2).withYRange(-2, 2).build()
  }
}`,...(le=(ge=d.parameters)==null?void 0:ge.docs)==null?void 0:le.source}}};var he,pe,me;g.parameters={...g.parameters,docs:{...(he=g.parameters)==null?void 0:he.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-50, 50).withYRange(-50, 50).build()
  }
}`,...(me=(pe=g.parameters)==null?void 0:pe.docs)==null?void 0:me.source}}};var we,be,fe;l.parameters={...l.parameters,docs:{...(we=l.parameters)==null?void 0:we.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(0, 20).addLockedLine([1, 1], [5, 2]).build()
  }
}`,...(fe=(be=l.parameters)==null?void 0:be.docs)==null?void 0:fe.source}}};var Le,We,Me;h.parameters={...h.parameters,docs:{...(Le=h.parameters)==null?void 0:Le.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-1, 20).addLockedLine([1, 1], [5, 2]).build()
  }
}`,...(Me=(We=h.parameters)==null?void 0:We.docs)==null?void 0:Me.source}}};var Re,qe,Ae;p.parameters={...p.parameters,docs:{...(Re=p.parameters)==null?void 0:Re.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-3, 20).addLockedLine([1, 1], [5, 2]).build()
  }
}`,...(Ae=(qe=p.parameters)==null?void 0:qe.docs)==null?void 0:Ae.source}}};var ke,Se,xe;m.parameters={...m.parameters,docs:{...(ke=m.parameters)==null?void 0:ke.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(1, 20).build()
  }
}`,...(xe=(Se=m.parameters)==null?void 0:Se.docs)==null?void 0:xe.source}}};var Ge,Xe,Ye;w.parameters={...w.parameters,docs:{...(Ge=w.parameters)==null?void 0:Ge.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(6, 20).build()
  }
}`,...(Ye=(Xe=w.parameters)==null?void 0:Xe.docs)==null?void 0:Ye.source}}};var ve,Be,Te;b.parameters={...b.parameters,docs:{...(ve=b.parameters)==null?void 0:ve.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-20, 0).build()
  }
}`,...(Te=(Be=b.parameters)==null?void 0:Be.docs)==null?void 0:Te.source}}};var Qe,Ee,Oe;f.parameters={...f.parameters,docs:{...(Qe=f.parameters)==null?void 0:Qe.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-20, -1).build()
  }
}`,...(Oe=(Ee=f.parameters)==null?void 0:Ee.docs)==null?void 0:Oe.source}}};var Pe,Ce,Fe;L.parameters={...L.parameters,docs:{...(Pe=L.parameters)==null?void 0:Pe.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-20, -6).build()
  }
}`,...(Fe=(Ce=L.parameters)==null?void 0:Ce.docs)==null?void 0:Fe.source}}};var Ie,Ne,Ve;W.parameters={...W.parameters,docs:{...(Ie=W.parameters)==null?void 0:Ie.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(0, 20).build()
  }
}`,...(Ve=(Ne=W.parameters)==null?void 0:Ne.docs)==null?void 0:Ve.source}}};var ye,He,je;M.parameters={...M.parameters,docs:{...(ye=M.parameters)==null?void 0:ye.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-1, 20).build()
  }
}`,...(je=(He=M.parameters)==null?void 0:He.docs)==null?void 0:je.source}}};var De,$e,Je;R.parameters={...R.parameters,docs:{...(De=R.parameters)==null?void 0:De.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(1, 20).build()
  }
}`,...(Je=($e=R.parameters)==null?void 0:$e.docs)==null?void 0:Je.source}}};var Ze,_e,ze;q.parameters={...q.parameters,docs:{...(Ze=q.parameters)==null?void 0:Ze.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-3, 20).addLockedLine([-3, 2], [5, 16]).build()
  }
}`,...(ze=(_e=q.parameters)==null?void 0:_e.docs)==null?void 0:ze.source}}};var Ke,Ue,es;A.parameters={...A.parameters,docs:{...(Ke=A.parameters)==null?void 0:Ke.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-20, 0).build()
  }
}`,...(es=(Ue=A.parameters)==null?void 0:Ue.docs)==null?void 0:es.source}}};var ss,is,as;k.parameters={...k.parameters,docs:{...(ss=k.parameters)==null?void 0:ss.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-20, -1).build()
  }
}`,...(as=(is=k.parameters)==null?void 0:is.docs)==null?void 0:as.source}}};var ts,rs,os;S.parameters={...S.parameters,docs:{...(ts=S.parameters)==null?void 0:ts.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-10, 10).withYRange(-10, 10).withAxisLabels("Video Game Hours per Week", "Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()
  }
}`,...(os=(rs=S.parameters)==null?void 0:rs.docs)==null?void 0:os.source}}};var ns,cs,us;x.parameters={...x.parameters,docs:{...(ns=x.parameters)==null?void 0:ns.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(0, 10).withYRange(0, 10).withAxisLabels("Video Game Hours per Week", "Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()
  }
}`,...(us=(cs=x.parameters)==null?void 0:cs.docs)==null?void 0:us.source}}};var ds,gs,ls;G.parameters={...G.parameters,docs:{...(ds=G.parameters)==null?void 0:ds.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-1, 10).withYRange(-1, 10).withAxisLabels("Video Game Hours per Week", "Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()
  }
}`,...(ls=(gs=G.parameters)==null?void 0:gs.docs)==null?void 0:ls.source}}};var hs,ps,ms;X.parameters={...X.parameters,docs:{...(hs=X.parameters)==null?void 0:hs.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(0, 0.01).withYRange(0, 0.01).withTickStep(0.001, 0.001).withGridStep(0.001, 0.001).withAxisLabels("Video Game Hours per Week", "Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()
  }
}`,...(ms=(ps=X.parameters)==null?void 0:ps.docs)==null?void 0:ms.source}}};var ws,bs,fs;Y.parameters={...Y.parameters,docs:{...(ws=Y.parameters)==null?void 0:ws.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-0.03, 0.84).withYRange(-2.8, 63).withTickStep(0.2, 10).withGridStep(0.05, 5).withSnapStep(0.025, 2).withAxisLabels("Time (seconds)", "Distance (meters)").withLabelLocation("alongEdge").build()
  }
}`,...(fs=(bs=Y.parameters)==null?void 0:bs.docs)==null?void 0:fs.source}}};var Ls,Ws,Ms;v.parameters={...v.parameters,docs:{...(Ls=v.parameters)==null?void 0:Ls.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-30, 840).withYRange(-2.8, 63).withTickStep(200, 10).withGridStep(50, 5).withSnapStep(25, 2).withAxisLabels("Time (seconds)", "Distance (meters)").withLabelLocation("alongEdge").build()
  }
}`,...(Ms=(Ws=v.parameters)==null?void 0:Ws.docs)==null?void 0:Ms.source}}};var Rs,qs,As;B.parameters={...B.parameters,docs:{...(Rs=B.parameters)==null?void 0:Rs.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(0, 0.5).withYRange(0, 0.5).withTickStep(0.1, 0.1).withGridStep(0.1, 0.1).withAxisLabels("Video Game Hours per Week", "Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()
  }
}`,...(As=(qs=B.parameters)==null?void 0:qs.docs)==null?void 0:As.source}}};var ks,Ss,xs;T.parameters={...T.parameters,docs:{...(ks=T.parameters)==null?void 0:ks.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().build()
  },
  decorators: [MobileContainerDecorator]
}`,...(xs=(Ss=T.parameters)==null?void 0:Ss.docs)==null?void 0:xs.source}}};var Gs,Xs,Ys;Q.parameters={...Q.parameters,docs:{...(Gs=Q.parameters)==null?void 0:Gs.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withSegments({
      numSegments: 3
    }).build()
  }
}`,...(Ys=(Xs=Q.parameters)==null?void 0:Xs.docs)==null?void 0:Ys.source}}};var vs,Bs,Ts;E.parameters={...E.parameters,docs:{...(vs=E.parameters)==null?void 0:vs.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withCircle().withXRange(-10, 10).withYRange(-5, 5).build()
  },
  // NOTE(jeremy): I migrated these stories to the v3 CSF story format, but
  // I'm unclear why this one story forces mobile when none of the others do,
  // and this story doesn't look mobile-specific. :thinking:
  decorators: [MobileContainerDecorator]
}`,...(Ts=(Bs=E.parameters)==null?void 0:Bs.docs)==null?void 0:Ts.source}}};var Qs,Es,Os;O.parameters={...O.parameters,docs:{...(Qs=O.parameters)==null?void 0:Qs.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().addLockedLine([-3, -3], [3, 3]).withXRange(-5, 5).withYRange(-10, 10).build()
  }
}`,...(Os=(Es=O.parameters)==null?void 0:Es.docs)==null?void 0:Os.source}}};var Ps,Cs,Fs;P.parameters={...P.parameters,docs:{...(Ps=P.parameters)==null?void 0:Ps.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().addLockedPointAt(3, 2).addLockedPointAt(-1, 1).addLockedPointAt(0, -4).build()
  }
}`,...(Fs=(Cs=P.parameters)==null?void 0:Cs.docs)==null?void 0:Fs.source}}};var Is,Ns,Vs;C.parameters={...C.parameters,docs:{...(Is=C.parameters)==null?void 0:Is.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().addLockedLine([-1, 1], [2, 3]).build()
  }
}`,...(Vs=(Ns=C.parameters)==null?void 0:Ns.docs)==null?void 0:Vs.source}}};var ys,Hs,js;F.parameters={...F.parameters,docs:{...(ys=F.parameters)==null?void 0:ys.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withAngle().withProtractor().build()
  }
}`,...(js=(Hs=F.parameters)==null?void 0:Hs.docs)==null?void 0:js.source}}};var Ds,$s,Js;I.parameters={...I.parameters,docs:{...(Ds=I.parameters)==null?void 0:Ds.docs,source:{originalSource:`{
  args: {
    question: sinusoidWithPiTicks
  }
}`,...(Js=($s=I.parameters)==null?void 0:$s.docs)==null?void 0:Js.source}}};var Zs,_s,zs;N.parameters={...N.parameters,docs:{...(Zs=N.parameters)==null?void 0:Zs.docs,source:{originalSource:`{
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
}`,...(zs=(_s=N.parameters)==null?void 0:_s.docs)==null?void 0:zs.source}}};var Ks,Us,ei;V.parameters={...V.parameters,docs:{...(Ks=V.parameters)==null?void 0:Ks.docs,source:{originalSource:`{
  args: {
    question: lockedFiguresQuestionWithWeight("thin")
  }
}`,...(ei=(Us=V.parameters)==null?void 0:Us.docs)==null?void 0:ei.source}}};var si,ii,ai;y.parameters={...y.parameters,docs:{...(si=y.parameters)==null?void 0:si.docs,source:{originalSource:`{
  args: {
    question: lockedFiguresQuestionWithWeight("medium")
  }
}`,...(ai=(ii=y.parameters)==null?void 0:ii.docs)==null?void 0:ai.source}}};var ti,ri,oi;H.parameters={...H.parameters,docs:{...(ti=H.parameters)==null?void 0:ti.docs,source:{originalSource:`{
  args: {
    question: lockedFiguresQuestionWithWeight("thick")
  }
}`,...(oi=(ri=H.parameters)==null?void 0:ri.docs)==null?void 0:oi.source}}};const Mi=["MafsWithCustomAxisLabels","MafsWithFractionalGridStep","MafsWithFractionalAxisTicks","MafsWithAxesMarkings","MafsWithGridMarkings","MafsWithNoMarkings","MafsWithSmallRange","MafsWithLargeRange","MafsWithYAxisAtLeft","MafsWithYAxisNearLeft","MafsWithYAxisJustOverLeft","MafsWithYAxisOffLeft","MafsWithYAxisOffFarLeft","MafsWithYAxisAtRight","MafsWithYAxisOffRight","MafsWithYAxisOffFarRight","MafsWithXAxisAtBottom","MafsWithXAxisNearBottom","MafsWithXAxisOffBottom","MafsWithXAxisJustOverBottom","MafsWithXAxisAtTop","MafsWithXAxisOffTop","MafsWithLabelsAlongEdge","MafsWithLabelsAlongEdgeAtLeft","MafsWithLabelsAlongEdgeJustOverLeft","MafsWithLabelsAlongEdgeAtRight","MafsWithLabelsAlongEdgeWithCloseToZeroXMin","MafsWithLabelsAlongEdgeWithCloseToZeroXMinMultipliedBy1000","MafsWithLabelsAlongEdgeZoomed","MafsInMobileContainer","MafsWithMultipleSegments","MafsCircleGraphWithNonsquareRange","MafsLineGraphWithNonsquareRange","MafsWithLockedPoints","MafsWithLockedLine","MafsWithProtractor","MafsWithPiTicks","MafsWithAnswerlessData","LockedFiguresWithThinWeight","LockedFiguresWithMediumWeight","LockedFiguresWithThickWeight"];export{y as LockedFiguresWithMediumWeight,H as LockedFiguresWithThickWeight,V as LockedFiguresWithThinWeight,E as MafsCircleGraphWithNonsquareRange,T as MafsInMobileContainer,O as MafsLineGraphWithNonsquareRange,N as MafsWithAnswerlessData,n as MafsWithAxesMarkings,t as MafsWithCustomAxisLabels,o as MafsWithFractionalAxisTicks,r as MafsWithFractionalGridStep,c as MafsWithGridMarkings,S as MafsWithLabelsAlongEdge,x as MafsWithLabelsAlongEdgeAtLeft,X as MafsWithLabelsAlongEdgeAtRight,G as MafsWithLabelsAlongEdgeJustOverLeft,Y as MafsWithLabelsAlongEdgeWithCloseToZeroXMin,v as MafsWithLabelsAlongEdgeWithCloseToZeroXMinMultipliedBy1000,B as MafsWithLabelsAlongEdgeZoomed,g as MafsWithLargeRange,C as MafsWithLockedLine,P as MafsWithLockedPoints,Q as MafsWithMultipleSegments,u as MafsWithNoMarkings,I as MafsWithPiTicks,F as MafsWithProtractor,d as MafsWithSmallRange,W as MafsWithXAxisAtBottom,A as MafsWithXAxisAtTop,q as MafsWithXAxisJustOverBottom,M as MafsWithXAxisNearBottom,R as MafsWithXAxisOffBottom,k as MafsWithXAxisOffTop,l as MafsWithYAxisAtLeft,b as MafsWithYAxisAtRight,p as MafsWithYAxisJustOverLeft,h as MafsWithYAxisNearLeft,w as MafsWithYAxisOffFarLeft,L as MafsWithYAxisOffFarRight,m as MafsWithYAxisOffLeft,f as MafsWithYAxisOffRight,Mi as __namedExportsOrder,Wi as default};
