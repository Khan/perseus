import{j as a,V as li,y as gi,R as hi,A as pi,as as mi,aI as wi,aK as bi}from"./iframe-CrThTwIf.js";import{i as e}from"./interactive-graph-question-builder-DmWX2Fcw.js";import{s as fi}from"./interactive-graph.testdata-9BsNNJ9w.js";const qi={title:"Widgets/Interactive Graph/Visual Regression Tests",component:Li,tags:["!dev"],parameters:{chromatic:{disableSnapshot:!1}},decorators:s=>a.jsx(li,{style:{marginInlineStart:32},children:a.jsx(s,{})})};function ci(s){return a.jsx("div",{className:"framework-perseus perseus-mobile",children:a.jsx(s,{})})}const t={args:{question:e().withAxisLabels("\\text{Custom $x$ label}","\\text{Custom $y$ label}").build()}},r={args:{question:e().withGridStep(2.571,3.123).build()}},o={args:{question:e().withTickStep(1.5,1.5).build()}},n={args:{question:e().withMarkings("axes").build()}},c={args:{question:e().withMarkings("grid").build()}},u={args:{question:e().withMarkings("none").build()}},d={args:{question:e().withXRange(-2,2).withYRange(-2,2).build()}},l={args:{question:e().withXRange(-50,50).withYRange(-50,50).build()}},g={args:{question:e().withXRange(0,20).addLockedLine([1,1],[5,2]).build()}},h={args:{question:e().withXRange(-1,20).addLockedLine([1,1],[5,2]).build()}},p={args:{question:e().withXRange(-3,20).addLockedLine([1,1],[5,2]).build()}},m={args:{question:e().withXRange(1,20).build()}},w={args:{question:e().withXRange(6,20).build()}},b={args:{question:e().withXRange(-20,0).build()}},f={args:{question:e().withXRange(-20,-1).build()}},L={args:{question:e().withXRange(-20,-6).build()}},W={args:{question:e().withYRange(0,20).build()}},M={args:{question:e().withYRange(-1,20).build()}},R={args:{question:e().withYRange(1,20).build()}},q={args:{question:e().withYRange(-3,20).addLockedLine([-3,2],[5,16]).build()}},k={args:{question:e().withYRange(-20,0).build()}},A={args:{question:e().withYRange(-20,-1).build()}},S={args:{question:e().withXRange(-10,10).withYRange(-10,10).withAxisLabels("Video Game Hours per Week","Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()}},x={args:{question:e().withXRange(0,10).withYRange(0,10).withAxisLabels("Video Game Hours per Week","Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()}},G={args:{question:e().withXRange(-1,10).withYRange(-1,10).withAxisLabels("Video Game Hours per Week","Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()}},X={args:{question:e().withXRange(0,.01).withYRange(0,.01).withTickStep(.001,.001).withGridStep(.001,.001).withAxisLabels("Video Game Hours per Week","Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()}},Y={args:{question:e().withXRange(-.03,.84).withYRange(-2.8,63).withTickStep(.2,10).withGridStep(.05,5).withSnapStep(.025,2).withAxisLabels("Time (seconds)","Distance (meters)").withLabelLocation("alongEdge").build()}},v={args:{question:e().withXRange(-30,840).withYRange(-2.8,63).withTickStep(200,10).withGridStep(50,5).withSnapStep(25,2).withAxisLabels("Time (seconds)","Distance (meters)").withLabelLocation("alongEdge").build()}},B={args:{question:e().withXRange(0,.5).withYRange(0,.5).withTickStep(.1,.1).withGridStep(.1,.1).withAxisLabels("Video Game Hours per Week","Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()}},T={args:{question:e().build()},decorators:[ci]},Q={args:{question:e().withSegments({numSegments:3}).build()}},E={args:{question:e().withCircle().withXRange(-10,10).withYRange(-5,5).build()},decorators:[ci]},O={args:{question:e().addLockedLine([-3,-3],[3,3]).withXRange(-5,5).withYRange(-10,10).build()}},F={args:{question:e().addLockedPointAt(3,2).addLockedPointAt(-1,1).addLockedPointAt(0,-4).build()}},P={args:{question:e().addLockedLine([-1,1],[2,3]).build()}},C={args:{question:e().withAngle().withProtractor().build()}},I={args:{question:fi}},N={args:{question:(()=>{const s=e().build(),i=wi({question:s});return bi(i).question})()}};function j(s){return e().withNoInteractiveFigure().addLockedLine([2,2],[9,9],{kind:"segment",weight:s}).addLockedLine([2,1],[9,8],{kind:"ray",weight:s}).addLockedLine([2,0],[9,7],{kind:"line",weight:s}).addLockedVector([4,-7],[7,-4],{weight:s,color:"green"}).addLockedEllipse([-5,5],[1,1],{weight:s,color:"blue"}).addLockedPolygon([[-7.5,-3.5],[-6.5,-2.5],[-5.5,-3.5],[-6.5,-4.5]],{weight:s,color:"pink"}).addLockedFunction("x^2",{weight:s,color:"red"}).build()}const V={args:{question:j("thin")}},y={args:{question:j("medium")}},H={args:{question:j("thick")}};function Li(s){const{question:i}=s;return a.jsx(gi,{widgets:i.widgets,problemNum:0,children:({userInput:D,handleUserInput:ui,initializeUserInput:di})=>a.jsx(hi,{userInput:D,handleUserInput:ui,initializeUserInput:di,strings:mi,content:i.content,widgets:i.widgets,images:i.images,apiOptions:pi.defaults})})}var $,J,Z;t.parameters={...t.parameters,docs:{...($=t.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withAxisLabels("\\\\text{Custom $x$ label}", "\\\\text{Custom $y$ label}").build()
  }
}`,...(Z=(J=t.parameters)==null?void 0:J.docs)==null?void 0:Z.source}}};var _,K,U;r.parameters={...r.parameters,docs:{...(_=r.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withGridStep(2.571, 3.123).build()
  }
}`,...(U=(K=r.parameters)==null?void 0:K.docs)==null?void 0:U.source}}};var z,ee,se;o.parameters={...o.parameters,docs:{...(z=o.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withTickStep(1.5, 1.5).build()
  }
}`,...(se=(ee=o.parameters)==null?void 0:ee.docs)==null?void 0:se.source}}};var ie,ae,te;n.parameters={...n.parameters,docs:{...(ie=n.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withMarkings("axes").build()
  }
}`,...(te=(ae=n.parameters)==null?void 0:ae.docs)==null?void 0:te.source}}};var re,oe,ne;c.parameters={...c.parameters,docs:{...(re=c.parameters)==null?void 0:re.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withMarkings("grid").build()
  }
}`,...(ne=(oe=c.parameters)==null?void 0:oe.docs)==null?void 0:ne.source}}};var ce,ue,de;u.parameters={...u.parameters,docs:{...(ce=u.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withMarkings("none").build()
  }
}`,...(de=(ue=u.parameters)==null?void 0:ue.docs)==null?void 0:de.source}}};var le,ge,he;d.parameters={...d.parameters,docs:{...(le=d.parameters)==null?void 0:le.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-2, 2).withYRange(-2, 2).build()
  }
}`,...(he=(ge=d.parameters)==null?void 0:ge.docs)==null?void 0:he.source}}};var pe,me,we;l.parameters={...l.parameters,docs:{...(pe=l.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-50, 50).withYRange(-50, 50).build()
  }
}`,...(we=(me=l.parameters)==null?void 0:me.docs)==null?void 0:we.source}}};var be,fe,Le;g.parameters={...g.parameters,docs:{...(be=g.parameters)==null?void 0:be.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(0, 20).addLockedLine([1, 1], [5, 2]).build()
  }
}`,...(Le=(fe=g.parameters)==null?void 0:fe.docs)==null?void 0:Le.source}}};var We,Me,Re;h.parameters={...h.parameters,docs:{...(We=h.parameters)==null?void 0:We.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-1, 20).addLockedLine([1, 1], [5, 2]).build()
  }
}`,...(Re=(Me=h.parameters)==null?void 0:Me.docs)==null?void 0:Re.source}}};var qe,ke,Ae;p.parameters={...p.parameters,docs:{...(qe=p.parameters)==null?void 0:qe.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-3, 20).addLockedLine([1, 1], [5, 2]).build()
  }
}`,...(Ae=(ke=p.parameters)==null?void 0:ke.docs)==null?void 0:Ae.source}}};var Se,xe,Ge;m.parameters={...m.parameters,docs:{...(Se=m.parameters)==null?void 0:Se.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(1, 20).build()
  }
}`,...(Ge=(xe=m.parameters)==null?void 0:xe.docs)==null?void 0:Ge.source}}};var Xe,Ye,ve;w.parameters={...w.parameters,docs:{...(Xe=w.parameters)==null?void 0:Xe.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(6, 20).build()
  }
}`,...(ve=(Ye=w.parameters)==null?void 0:Ye.docs)==null?void 0:ve.source}}};var Be,Te,Qe;b.parameters={...b.parameters,docs:{...(Be=b.parameters)==null?void 0:Be.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-20, 0).build()
  }
}`,...(Qe=(Te=b.parameters)==null?void 0:Te.docs)==null?void 0:Qe.source}}};var Ee,Oe,Fe;f.parameters={...f.parameters,docs:{...(Ee=f.parameters)==null?void 0:Ee.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-20, -1).build()
  }
}`,...(Fe=(Oe=f.parameters)==null?void 0:Oe.docs)==null?void 0:Fe.source}}};var Pe,Ce,Ie;L.parameters={...L.parameters,docs:{...(Pe=L.parameters)==null?void 0:Pe.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-20, -6).build()
  }
}`,...(Ie=(Ce=L.parameters)==null?void 0:Ce.docs)==null?void 0:Ie.source}}};var Ne,Ve,ye;W.parameters={...W.parameters,docs:{...(Ne=W.parameters)==null?void 0:Ne.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(0, 20).build()
  }
}`,...(ye=(Ve=W.parameters)==null?void 0:Ve.docs)==null?void 0:ye.source}}};var He,je,De;M.parameters={...M.parameters,docs:{...(He=M.parameters)==null?void 0:He.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-1, 20).build()
  }
}`,...(De=(je=M.parameters)==null?void 0:je.docs)==null?void 0:De.source}}};var $e,Je,Ze;R.parameters={...R.parameters,docs:{...($e=R.parameters)==null?void 0:$e.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(1, 20).build()
  }
}`,...(Ze=(Je=R.parameters)==null?void 0:Je.docs)==null?void 0:Ze.source}}};var _e,Ke,Ue;q.parameters={...q.parameters,docs:{...(_e=q.parameters)==null?void 0:_e.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-3, 20).addLockedLine([-3, 2], [5, 16]).build()
  }
}`,...(Ue=(Ke=q.parameters)==null?void 0:Ke.docs)==null?void 0:Ue.source}}};var ze,es,ss;k.parameters={...k.parameters,docs:{...(ze=k.parameters)==null?void 0:ze.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-20, 0).build()
  }
}`,...(ss=(es=k.parameters)==null?void 0:es.docs)==null?void 0:ss.source}}};var is,as,ts;A.parameters={...A.parameters,docs:{...(is=A.parameters)==null?void 0:is.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-20, -1).build()
  }
}`,...(ts=(as=A.parameters)==null?void 0:as.docs)==null?void 0:ts.source}}};var rs,os,ns;S.parameters={...S.parameters,docs:{...(rs=S.parameters)==null?void 0:rs.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-10, 10).withYRange(-10, 10).withAxisLabels("Video Game Hours per Week", "Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()
  }
}`,...(ns=(os=S.parameters)==null?void 0:os.docs)==null?void 0:ns.source}}};var cs,us,ds;x.parameters={...x.parameters,docs:{...(cs=x.parameters)==null?void 0:cs.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(0, 10).withYRange(0, 10).withAxisLabels("Video Game Hours per Week", "Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()
  }
}`,...(ds=(us=x.parameters)==null?void 0:us.docs)==null?void 0:ds.source}}};var ls,gs,hs;G.parameters={...G.parameters,docs:{...(ls=G.parameters)==null?void 0:ls.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-1, 10).withYRange(-1, 10).withAxisLabels("Video Game Hours per Week", "Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()
  }
}`,...(hs=(gs=G.parameters)==null?void 0:gs.docs)==null?void 0:hs.source}}};var ps,ms,ws;X.parameters={...X.parameters,docs:{...(ps=X.parameters)==null?void 0:ps.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(0, 0.01).withYRange(0, 0.01).withTickStep(0.001, 0.001).withGridStep(0.001, 0.001).withAxisLabels("Video Game Hours per Week", "Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()
  }
}`,...(ws=(ms=X.parameters)==null?void 0:ms.docs)==null?void 0:ws.source}}};var bs,fs,Ls;Y.parameters={...Y.parameters,docs:{...(bs=Y.parameters)==null?void 0:bs.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-0.03, 0.84).withYRange(-2.8, 63).withTickStep(0.2, 10).withGridStep(0.05, 5).withSnapStep(0.025, 2).withAxisLabels("Time (seconds)", "Distance (meters)").withLabelLocation("alongEdge").build()
  }
}`,...(Ls=(fs=Y.parameters)==null?void 0:fs.docs)==null?void 0:Ls.source}}};var Ws,Ms,Rs;v.parameters={...v.parameters,docs:{...(Ws=v.parameters)==null?void 0:Ws.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-30, 840).withYRange(-2.8, 63).withTickStep(200, 10).withGridStep(50, 5).withSnapStep(25, 2).withAxisLabels("Time (seconds)", "Distance (meters)").withLabelLocation("alongEdge").build()
  }
}`,...(Rs=(Ms=v.parameters)==null?void 0:Ms.docs)==null?void 0:Rs.source}}};var qs,ks,As;B.parameters={...B.parameters,docs:{...(qs=B.parameters)==null?void 0:qs.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(0, 0.5).withYRange(0, 0.5).withTickStep(0.1, 0.1).withGridStep(0.1, 0.1).withAxisLabels("Video Game Hours per Week", "Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()
  }
}`,...(As=(ks=B.parameters)==null?void 0:ks.docs)==null?void 0:As.source}}};var Ss,xs,Gs;T.parameters={...T.parameters,docs:{...(Ss=T.parameters)==null?void 0:Ss.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().build()
  },
  decorators: [MobileContainerDecorator]
}`,...(Gs=(xs=T.parameters)==null?void 0:xs.docs)==null?void 0:Gs.source}}};var Xs,Ys,vs;Q.parameters={...Q.parameters,docs:{...(Xs=Q.parameters)==null?void 0:Xs.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withSegments({
      numSegments: 3
    }).build()
  }
}`,...(vs=(Ys=Q.parameters)==null?void 0:Ys.docs)==null?void 0:vs.source}}};var Bs,Ts,Qs;E.parameters={...E.parameters,docs:{...(Bs=E.parameters)==null?void 0:Bs.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withCircle().withXRange(-10, 10).withYRange(-5, 5).build()
  },
  // NOTE(jeremy): I migrated these stories to the v3 CSF story format, but
  // I'm unclear why this one story forces mobile when none of the others do,
  // and this story doesn't look mobile-specific. :thinking:
  decorators: [MobileContainerDecorator]
}`,...(Qs=(Ts=E.parameters)==null?void 0:Ts.docs)==null?void 0:Qs.source}}};var Es,Os,Fs;O.parameters={...O.parameters,docs:{...(Es=O.parameters)==null?void 0:Es.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().addLockedLine([-3, -3], [3, 3]).withXRange(-5, 5).withYRange(-10, 10).build()
  }
}`,...(Fs=(Os=O.parameters)==null?void 0:Os.docs)==null?void 0:Fs.source}}};var Ps,Cs,Is;F.parameters={...F.parameters,docs:{...(Ps=F.parameters)==null?void 0:Ps.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().addLockedPointAt(3, 2).addLockedPointAt(-1, 1).addLockedPointAt(0, -4).build()
  }
}`,...(Is=(Cs=F.parameters)==null?void 0:Cs.docs)==null?void 0:Is.source}}};var Ns,Vs,ys;P.parameters={...P.parameters,docs:{...(Ns=P.parameters)==null?void 0:Ns.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().addLockedLine([-1, 1], [2, 3]).build()
  }
}`,...(ys=(Vs=P.parameters)==null?void 0:Vs.docs)==null?void 0:ys.source}}};var Hs,js,Ds;C.parameters={...C.parameters,docs:{...(Hs=C.parameters)==null?void 0:Hs.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withAngle().withProtractor().build()
  }
}`,...(Ds=(js=C.parameters)==null?void 0:js.docs)==null?void 0:Ds.source}}};var $s,Js,Zs;I.parameters={...I.parameters,docs:{...($s=I.parameters)==null?void 0:$s.docs,source:{originalSource:`{
  args: {
    question: sinusoidWithPiTicks
  }
}`,...(Zs=(Js=I.parameters)==null?void 0:Js.docs)==null?void 0:Zs.source}}};var _s,Ks,Us;N.parameters={...N.parameters,docs:{...(_s=N.parameters)==null?void 0:_s.docs,source:{originalSource:`{
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
}`,...(Us=(Ks=N.parameters)==null?void 0:Ks.docs)==null?void 0:Us.source}}};var zs,ei,si;V.parameters={...V.parameters,docs:{...(zs=V.parameters)==null?void 0:zs.docs,source:{originalSource:`{
  args: {
    question: lockedFiguresQuestionWithWeight("thin")
  }
}`,...(si=(ei=V.parameters)==null?void 0:ei.docs)==null?void 0:si.source}}};var ii,ai,ti;y.parameters={...y.parameters,docs:{...(ii=y.parameters)==null?void 0:ii.docs,source:{originalSource:`{
  args: {
    question: lockedFiguresQuestionWithWeight("medium")
  }
}`,...(ti=(ai=y.parameters)==null?void 0:ai.docs)==null?void 0:ti.source}}};var ri,oi,ni;H.parameters={...H.parameters,docs:{...(ri=H.parameters)==null?void 0:ri.docs,source:{originalSource:`{
  args: {
    question: lockedFiguresQuestionWithWeight("thick")
  }
}`,...(ni=(oi=H.parameters)==null?void 0:oi.docs)==null?void 0:ni.source}}};const ki=["MafsWithCustomAxisLabels","MafsWithFractionalGridStep","MafsWithFractionalAxisTicks","MafsWithAxesMarkings","MafsWithGridMarkings","MafsWithNoMarkings","MafsWithSmallRange","MafsWithLargeRange","MafsWithYAxisAtLeft","MafsWithYAxisNearLeft","MafsWithYAxisJustOverLeft","MafsWithYAxisOffLeft","MafsWithYAxisOffFarLeft","MafsWithYAxisAtRight","MafsWithYAxisOffRight","MafsWithYAxisOffFarRight","MafsWithXAxisAtBottom","MafsWithXAxisNearBottom","MafsWithXAxisOffBottom","MafsWithXAxisJustOverBottom","MafsWithXAxisAtTop","MafsWithXAxisOffTop","MafsWithLabelsAlongEdge","MafsWithLabelsAlongEdgeAtLeft","MafsWithLabelsAlongEdgeJustOverLeft","MafsWithLabelsAlongEdgeAtRight","MafsWithLabelsAlongEdgeWithCloseToZeroXMin","MafsWithLabelsAlongEdgeWithCloseToZeroXMinMultipliedBy1000","MafsWithLabelsAlongEdgeZoomed","MafsInMobileContainer","MafsWithMultipleSegments","MafsCircleGraphWithNonsquareRange","MafsLineGraphWithNonsquareRange","MafsWithLockedPoints","MafsWithLockedLine","MafsWithProtractor","MafsWithPiTicks","MafsWithAnswerlessData","LockedFiguresWithThinWeight","LockedFiguresWithMediumWeight","LockedFiguresWithThickWeight"];export{y as LockedFiguresWithMediumWeight,H as LockedFiguresWithThickWeight,V as LockedFiguresWithThinWeight,E as MafsCircleGraphWithNonsquareRange,T as MafsInMobileContainer,O as MafsLineGraphWithNonsquareRange,N as MafsWithAnswerlessData,n as MafsWithAxesMarkings,t as MafsWithCustomAxisLabels,o as MafsWithFractionalAxisTicks,r as MafsWithFractionalGridStep,c as MafsWithGridMarkings,S as MafsWithLabelsAlongEdge,x as MafsWithLabelsAlongEdgeAtLeft,X as MafsWithLabelsAlongEdgeAtRight,G as MafsWithLabelsAlongEdgeJustOverLeft,Y as MafsWithLabelsAlongEdgeWithCloseToZeroXMin,v as MafsWithLabelsAlongEdgeWithCloseToZeroXMinMultipliedBy1000,B as MafsWithLabelsAlongEdgeZoomed,l as MafsWithLargeRange,P as MafsWithLockedLine,F as MafsWithLockedPoints,Q as MafsWithMultipleSegments,u as MafsWithNoMarkings,I as MafsWithPiTicks,C as MafsWithProtractor,d as MafsWithSmallRange,W as MafsWithXAxisAtBottom,k as MafsWithXAxisAtTop,q as MafsWithXAxisJustOverBottom,M as MafsWithXAxisNearBottom,R as MafsWithXAxisOffBottom,A as MafsWithXAxisOffTop,g as MafsWithYAxisAtLeft,b as MafsWithYAxisAtRight,p as MafsWithYAxisJustOverLeft,h as MafsWithYAxisNearLeft,w as MafsWithYAxisOffFarLeft,L as MafsWithYAxisOffFarRight,m as MafsWithYAxisOffLeft,f as MafsWithYAxisOffRight,ki as __namedExportsOrder,qi as default};
