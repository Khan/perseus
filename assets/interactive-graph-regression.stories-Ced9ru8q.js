import{j as a,V as $s,R as Hs,A as Js,w as Ds,cL as Zs,d0 as _s}from"./iframe-Bcg17xLF.js";import{i as e}from"./interactive-graph-question-builder-BsPW7GnI.js";import{j as zs}from"./interactive-graph.testdata-8jibImGS.js";const ar={title:"Perseus/Widgets/Interactive Graph Visual Regression Tests",component:Ks,parameters:{chromatic:{disableSnapshot:!1}},decorators:s=>a.jsx($s,{style:{marginInlineStart:32},children:a.jsx(s,{})})};function Vs(s){return a.jsx("div",{className:"framework-perseus perseus-mobile",children:a.jsx(s,{})})}const i={args:{question:e().withAxisLabels("\\text{Custom $x$ label}","\\text{Custom $y$ label}").build()}},t={args:{question:e().withGridStep(2.571,3.123).build()}},o={args:{question:e().withTickStep(1.5,1.5).build()}},n={args:{question:e().withMarkings("axes").build()}},c={args:{question:e().withMarkings("grid").build()}},u={args:{question:e().withMarkings("none").build()}},d={args:{question:e().withXRange(-2,2).withYRange(-2,2).build()}},g={args:{question:e().withXRange(-50,50).withYRange(-50,50).build()}},l={args:{question:e().withXRange(0,20).addLockedLine([1,1],[5,2]).build()}},h={args:{question:e().withXRange(-1,20).addLockedLine([1,1],[5,2]).build()}},p={args:{question:e().withXRange(-3,20).addLockedLine([1,1],[5,2]).build()}},m={args:{question:e().withXRange(1,20).build()}},f={args:{question:e().withXRange(6,20).build()}},w={args:{question:e().withXRange(-20,0).build()}},b={args:{question:e().withXRange(-20,-1).build()}},L={args:{question:e().withXRange(-20,-6).build()}},M={args:{question:e().withYRange(0,20).build()}},W={args:{question:e().withYRange(-1,20).build()}},q={args:{question:e().withYRange(1,20).build()}},R={args:{question:e().withYRange(-3,20).addLockedLine([-3,2],[5,16]).build()}},k={args:{question:e().withYRange(-20,0).build()}},A={args:{question:e().withYRange(-20,-1).build()}},x={args:{question:e().withXRange(0,10).withYRange(0,10).withAxisLabels("Video Game Hours per Week","Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()}},S={args:{question:e().withXRange(-1,10).withYRange(-1,10).withAxisLabels("Video Game Hours per Week","Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()}},G={args:{question:e().withXRange(0,.5).withYRange(0,.5).withTickStep(.1,.1).withGridStep(.1,.1).withAxisLabels("Video Game Hours per Week","Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()}},v={args:{question:e().build()},decorators:[Vs]},B={args:{question:e().withSegments({numSegments:3}).build()}},X={args:{question:e().withCircle().withXRange(-10,10).withYRange(-5,5).build()},decorators:[Vs]},Y={args:{question:e().addLockedLine([-3,-3],[3,3]).withXRange(-5,5).withYRange(-10,10).build()}},Q={args:{question:e().addLockedPointAt(3,2).addLockedPointAt(-1,1).addLockedPointAt(0,-4).build()}},T={args:{question:e().addLockedLine([-1,1],[2,3]).build()}},P={args:{question:e().withAngle().withProtractor().build()}},O={args:{question:zs}},I={args:{question:(()=>{const s=e().build(),r=Zs({question:s});return _s(r).question})()}},C={args:{question:e().addLockedPolygon([[.5,3.5],[1.5,4.5],[2.5,3.5],[1.5,2.5]],{weight:"thin",color:"pink"}).build()}},E={args:{question:e().addLockedPolygon([[.5,3.5],[1.5,4.5],[2.5,3.5],[1.5,2.5]],{weight:"medium",color:"pink"}).build()}},F={args:{question:e().addLockedPolygon([[.5,3.5],[1.5,4.5],[2.5,3.5],[1.5,2.5]],{weight:"thick",color:"pink"}).build()}};function Ks(s){const{question:r}=s;return a.jsx(Hs,{strings:Ds,content:r.content,widgets:r.widgets,images:r.images,apiOptions:Js.defaults})}var y,N,j;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withAxisLabels("\\\\text{Custom $x$ label}", "\\\\text{Custom $y$ label}").build()
  }
}`,...(j=(N=i.parameters)==null?void 0:N.docs)==null?void 0:j.source}}};var V,$,H;t.parameters={...t.parameters,docs:{...(V=t.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withGridStep(2.571, 3.123).build()
  }
}`,...(H=($=t.parameters)==null?void 0:$.docs)==null?void 0:H.source}}};var J,D,Z;o.parameters={...o.parameters,docs:{...(J=o.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withTickStep(1.5, 1.5).build()
  }
}`,...(Z=(D=o.parameters)==null?void 0:D.docs)==null?void 0:Z.source}}};var _,z,K;n.parameters={...n.parameters,docs:{...(_=n.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withMarkings("axes").build()
  }
}`,...(K=(z=n.parameters)==null?void 0:z.docs)==null?void 0:K.source}}};var U,ee,se;c.parameters={...c.parameters,docs:{...(U=c.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withMarkings("grid").build()
  }
}`,...(se=(ee=c.parameters)==null?void 0:ee.docs)==null?void 0:se.source}}};var re,ae,ie;u.parameters={...u.parameters,docs:{...(re=u.parameters)==null?void 0:re.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withMarkings("none").build()
  }
}`,...(ie=(ae=u.parameters)==null?void 0:ae.docs)==null?void 0:ie.source}}};var te,oe,ne;d.parameters={...d.parameters,docs:{...(te=d.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-2, 2).withYRange(-2, 2).build()
  }
}`,...(ne=(oe=d.parameters)==null?void 0:oe.docs)==null?void 0:ne.source}}};var ce,ue,de;g.parameters={...g.parameters,docs:{...(ce=g.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-50, 50).withYRange(-50, 50).build()
  }
}`,...(de=(ue=g.parameters)==null?void 0:ue.docs)==null?void 0:de.source}}};var ge,le,he;l.parameters={...l.parameters,docs:{...(ge=l.parameters)==null?void 0:ge.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(0, 20).addLockedLine([1, 1], [5, 2]).build()
  }
}`,...(he=(le=l.parameters)==null?void 0:le.docs)==null?void 0:he.source}}};var pe,me,fe;h.parameters={...h.parameters,docs:{...(pe=h.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-1, 20).addLockedLine([1, 1], [5, 2]).build()
  }
}`,...(fe=(me=h.parameters)==null?void 0:me.docs)==null?void 0:fe.source}}};var we,be,Le;p.parameters={...p.parameters,docs:{...(we=p.parameters)==null?void 0:we.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-3, 20).addLockedLine([1, 1], [5, 2]).build()
  }
}`,...(Le=(be=p.parameters)==null?void 0:be.docs)==null?void 0:Le.source}}};var Me,We,qe;m.parameters={...m.parameters,docs:{...(Me=m.parameters)==null?void 0:Me.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(1, 20).build()
  }
}`,...(qe=(We=m.parameters)==null?void 0:We.docs)==null?void 0:qe.source}}};var Re,ke,Ae;f.parameters={...f.parameters,docs:{...(Re=f.parameters)==null?void 0:Re.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(6, 20).build()
  }
}`,...(Ae=(ke=f.parameters)==null?void 0:ke.docs)==null?void 0:Ae.source}}};var xe,Se,Ge;w.parameters={...w.parameters,docs:{...(xe=w.parameters)==null?void 0:xe.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-20, 0).build()
  }
}`,...(Ge=(Se=w.parameters)==null?void 0:Se.docs)==null?void 0:Ge.source}}};var ve,Be,Xe;b.parameters={...b.parameters,docs:{...(ve=b.parameters)==null?void 0:ve.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-20, -1).build()
  }
}`,...(Xe=(Be=b.parameters)==null?void 0:Be.docs)==null?void 0:Xe.source}}};var Ye,Qe,Te;L.parameters={...L.parameters,docs:{...(Ye=L.parameters)==null?void 0:Ye.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-20, -6).build()
  }
}`,...(Te=(Qe=L.parameters)==null?void 0:Qe.docs)==null?void 0:Te.source}}};var Pe,Oe,Ie;M.parameters={...M.parameters,docs:{...(Pe=M.parameters)==null?void 0:Pe.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(0, 20).build()
  }
}`,...(Ie=(Oe=M.parameters)==null?void 0:Oe.docs)==null?void 0:Ie.source}}};var Ce,Ee,Fe;W.parameters={...W.parameters,docs:{...(Ce=W.parameters)==null?void 0:Ce.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-1, 20).build()
  }
}`,...(Fe=(Ee=W.parameters)==null?void 0:Ee.docs)==null?void 0:Fe.source}}};var ye,Ne,je;q.parameters={...q.parameters,docs:{...(ye=q.parameters)==null?void 0:ye.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(1, 20).build()
  }
}`,...(je=(Ne=q.parameters)==null?void 0:Ne.docs)==null?void 0:je.source}}};var Ve,$e,He;R.parameters={...R.parameters,docs:{...(Ve=R.parameters)==null?void 0:Ve.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-3, 20).addLockedLine([-3, 2], [5, 16]).build()
  }
}`,...(He=($e=R.parameters)==null?void 0:$e.docs)==null?void 0:He.source}}};var Je,De,Ze;k.parameters={...k.parameters,docs:{...(Je=k.parameters)==null?void 0:Je.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-20, 0).build()
  }
}`,...(Ze=(De=k.parameters)==null?void 0:De.docs)==null?void 0:Ze.source}}};var _e,ze,Ke;A.parameters={...A.parameters,docs:{...(_e=A.parameters)==null?void 0:_e.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-20, -1).build()
  }
}`,...(Ke=(ze=A.parameters)==null?void 0:ze.docs)==null?void 0:Ke.source}}};var Ue,es,ss;x.parameters={...x.parameters,docs:{...(Ue=x.parameters)==null?void 0:Ue.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(0, 10).withYRange(0, 10).withAxisLabels("Video Game Hours per Week", "Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()
  }
}`,...(ss=(es=x.parameters)==null?void 0:es.docs)==null?void 0:ss.source}}};var rs,as,is;S.parameters={...S.parameters,docs:{...(rs=S.parameters)==null?void 0:rs.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-1, 10).withYRange(-1, 10).withAxisLabels("Video Game Hours per Week", "Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()
  }
}`,...(is=(as=S.parameters)==null?void 0:as.docs)==null?void 0:is.source}}};var ts,os,ns;G.parameters={...G.parameters,docs:{...(ts=G.parameters)==null?void 0:ts.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(0, 0.5).withYRange(0, 0.5).withTickStep(0.1, 0.1).withGridStep(0.1, 0.1).withAxisLabels("Video Game Hours per Week", "Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()
  }
}`,...(ns=(os=G.parameters)==null?void 0:os.docs)==null?void 0:ns.source}}};var cs,us,ds;v.parameters={...v.parameters,docs:{...(cs=v.parameters)==null?void 0:cs.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().build()
  },
  decorators: [MobileContainerDecorator]
}`,...(ds=(us=v.parameters)==null?void 0:us.docs)==null?void 0:ds.source}}};var gs,ls,hs;B.parameters={...B.parameters,docs:{...(gs=B.parameters)==null?void 0:gs.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withSegments({
      numSegments: 3
    }).build()
  }
}`,...(hs=(ls=B.parameters)==null?void 0:ls.docs)==null?void 0:hs.source}}};var ps,ms,fs;X.parameters={...X.parameters,docs:{...(ps=X.parameters)==null?void 0:ps.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withCircle().withXRange(-10, 10).withYRange(-5, 5).build()
  },
  // NOTE(jeremy): I migrated these stories to the v3 CSF story format, but
  // I'm unclear why this one story forces mobile when none of the others do,
  // and this story doesn't look mobile-specific. :thinking:
  decorators: [MobileContainerDecorator]
}`,...(fs=(ms=X.parameters)==null?void 0:ms.docs)==null?void 0:fs.source}}};var ws,bs,Ls;Y.parameters={...Y.parameters,docs:{...(ws=Y.parameters)==null?void 0:ws.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().addLockedLine([-3, -3], [3, 3]).withXRange(-5, 5).withYRange(-10, 10).build()
  }
}`,...(Ls=(bs=Y.parameters)==null?void 0:bs.docs)==null?void 0:Ls.source}}};var Ms,Ws,qs;Q.parameters={...Q.parameters,docs:{...(Ms=Q.parameters)==null?void 0:Ms.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().addLockedPointAt(3, 2).addLockedPointAt(-1, 1).addLockedPointAt(0, -4).build()
  }
}`,...(qs=(Ws=Q.parameters)==null?void 0:Ws.docs)==null?void 0:qs.source}}};var Rs,ks,As;T.parameters={...T.parameters,docs:{...(Rs=T.parameters)==null?void 0:Rs.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().addLockedLine([-1, 1], [2, 3]).build()
  }
}`,...(As=(ks=T.parameters)==null?void 0:ks.docs)==null?void 0:As.source}}};var xs,Ss,Gs;P.parameters={...P.parameters,docs:{...(xs=P.parameters)==null?void 0:xs.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withAngle().withProtractor().build()
  }
}`,...(Gs=(Ss=P.parameters)==null?void 0:Ss.docs)==null?void 0:Gs.source}}};var vs,Bs,Xs;O.parameters={...O.parameters,docs:{...(vs=O.parameters)==null?void 0:vs.docs,source:{originalSource:`{
  args: {
    question: sinusoidWithPiTicks
  }
}`,...(Xs=(Bs=O.parameters)==null?void 0:Bs.docs)==null?void 0:Xs.source}}};var Ys,Qs,Ts;I.parameters={...I.parameters,docs:{...(Ys=I.parameters)==null?void 0:Ys.docs,source:{originalSource:`{
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
}`,...(Ts=(Qs=I.parameters)==null?void 0:Qs.docs)==null?void 0:Ts.source}}};var Ps,Os,Is;C.parameters={...C.parameters,docs:{...(Ps=C.parameters)==null?void 0:Ps.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().addLockedPolygon([[0.5, 3.5], [1.5, 4.5], [2.5, 3.5], [1.5, 2.5]], {
      weight: "thin",
      color: "pink"
    }).build()
  }
}`,...(Is=(Os=C.parameters)==null?void 0:Os.docs)==null?void 0:Is.source}}};var Cs,Es,Fs;E.parameters={...E.parameters,docs:{...(Cs=E.parameters)==null?void 0:Cs.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().addLockedPolygon([[0.5, 3.5], [1.5, 4.5], [2.5, 3.5], [1.5, 2.5]], {
      weight: "medium",
      color: "pink"
    }).build()
  }
}`,...(Fs=(Es=E.parameters)==null?void 0:Es.docs)==null?void 0:Fs.source}}};var ys,Ns,js;F.parameters={...F.parameters,docs:{...(ys=F.parameters)==null?void 0:ys.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().addLockedPolygon([[0.5, 3.5], [1.5, 4.5], [2.5, 3.5], [1.5, 2.5]], {
      weight: "thick",
      color: "pink"
    }).build()
  }
}`,...(js=(Ns=F.parameters)==null?void 0:Ns.docs)==null?void 0:js.source}}};const ir=["MafsWithCustomAxisLabels","MafsWithFractionalGridStep","MafsWithFractionalAxisTicks","MafsWithAxesMarkings","MafsWithGridMarkings","MafsWithNoMarkings","MafsWithSmallRange","MafsWithLargeRange","MafsWithYAxisAtLeft","MafsWithYAxisNearLeft","MafsWithYAxisJustOverLeft","MafsWithYAxisOffLeft","MafsWithYAxisOffFarLeft","MafsWithYAxisAtRight","MafsWithYAxisOffRight","MafsWithYAxisOffFarRight","MafsWithXAxisAtBottom","MafsWithXAxisNearBottom","MafsWithXAxisOffBottom","MafsWithXAxisJustOverBottom","MafsWithXAxisAtTop","MafsWithXAxisOffTop","MafsWithLabelsAlongEdge","MafsWithLabelsAlongEdgeJustOverLeft","MafsWithLabelsAlongEdgeZoomed","MafsInMobileContainer","MafsWithMultipleSegments","MafsCircleGraphWithNonsquareRange","MafsLineGraphWithNonsquareRange","MafsWithLockedPoints","MafsWithLockedLine","MafsWithProtractor","MafsWithPiTicks","MafsWithAnswerlessData","LockedFiguresWithThinWeight","LockedFiguresWithMediumWeight","LockedFiguresWithThickWeight"];export{E as LockedFiguresWithMediumWeight,F as LockedFiguresWithThickWeight,C as LockedFiguresWithThinWeight,X as MafsCircleGraphWithNonsquareRange,v as MafsInMobileContainer,Y as MafsLineGraphWithNonsquareRange,I as MafsWithAnswerlessData,n as MafsWithAxesMarkings,i as MafsWithCustomAxisLabels,o as MafsWithFractionalAxisTicks,t as MafsWithFractionalGridStep,c as MafsWithGridMarkings,x as MafsWithLabelsAlongEdge,S as MafsWithLabelsAlongEdgeJustOverLeft,G as MafsWithLabelsAlongEdgeZoomed,g as MafsWithLargeRange,T as MafsWithLockedLine,Q as MafsWithLockedPoints,B as MafsWithMultipleSegments,u as MafsWithNoMarkings,O as MafsWithPiTicks,P as MafsWithProtractor,d as MafsWithSmallRange,M as MafsWithXAxisAtBottom,k as MafsWithXAxisAtTop,R as MafsWithXAxisJustOverBottom,W as MafsWithXAxisNearBottom,q as MafsWithXAxisOffBottom,A as MafsWithXAxisOffTop,l as MafsWithYAxisAtLeft,w as MafsWithYAxisAtRight,p as MafsWithYAxisJustOverLeft,h as MafsWithYAxisNearLeft,f as MafsWithYAxisOffFarLeft,L as MafsWithYAxisOffFarRight,m as MafsWithYAxisOffLeft,b as MafsWithYAxisOffRight,ir as __namedExportsOrder,ar as default};
