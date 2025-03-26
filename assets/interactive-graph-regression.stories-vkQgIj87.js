import"./underscore-885MUNGo.js";import"./core-widget-registry-lKD0wS3Q.js";import{s as vs}from"./split-perseus-item-1aCvi3PH.js";import{V as Bs}from"./index-hw7d7wq0.js";import{r}from"./index-6oxdNXpR.js";import{A as Xs}from"./perseus-api-Y55S7ZPk.js";import{R as Ys}from"./renderer-eUz0grwg.js";import{m as Qs}from"./i18n-context-T9Cdk0dK.js";import{i as e}from"./interactive-graph-question-builder-kGxyU44H.js";import{j as Ts}from"./interactive-graph.testdata-O01DACB2.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./util-VofM5AGr.js";import"./perseus-error-l3K_anoI.js";import"./jquery-5v7aFUvu.js";import"./get-decimal-separator-C5N_K9o2.js";import"./no-important-xCWWYXQR.js";import"./index-o42urCig.js";import"./stub-tag-editor--BF0WBUz.js";import"./text-list-editor-9dKImvgD.js";import"./index-9gkyvru-.js";import"./index-J2t_5nK1.js";import"./index-dnMhQZ-1.js";import"./zoomable-tex-w6m6mqm2.js";import"./tex-q_4hQMGs.js";import"./dependencies-CP7Uh8Kq.js";import"./zoomable-m_J-BBOg.js";import"./svg-image-MCAn6Wke.js";import"./index--z92Kcj-.js";import"./index-zRqVZh6A.js";import"./fixed-to-responsive-8Rm8IBlT.js";import"./constants-vGHYchdS.js";import"./client-Rb4DelHy.js";import"./inline-icon-8e4u-lSW.js";import"./icon-paths-5JCXzGsq.js";import"./image-loader-qCu_dXQl.js";import"./lint-a43UkMJQ.js";import"./index-smZ6iCr_.js";import"./tiny-invariant-bHgPayXn.js";import"./jsx-runtime-63Ea5SlK.js";const Rr={title:"Perseus/Widgets/Interactive Graph Visual Regression Tests",component:Es,parameters:{chromatic:{disableSnapshot:!1}},decorators:s=>r.createElement(Bs,{style:{marginInlineStart:32}},r.createElement(s,null))};function xs(s){return r.createElement("div",{className:"framework-perseus perseus-mobile"},r.createElement(s,null))}const a={args:{question:e().withAxisLabels("\\text{Custom $x$ label}","\\text{Custom $y$ label}").build()}},t={args:{question:e().withGridStep(2.571,3.123).build()}},i={args:{question:e().withTickStep(1.5,1.5).build()}},o={args:{question:e().withMarkings("axes").build()}},n={args:{question:e().withMarkings("grid").build()}},c={args:{question:e().withMarkings("none").build()}},u={args:{question:e().withXRange(-2,2).withYRange(-2,2).build()}},d={args:{question:e().withXRange(-50,50).withYRange(-50,50).build()}},m={args:{question:e().withXRange(0,20).addLockedLine([1,1],[5,2]).build()}},p={args:{question:e().withXRange(-1,20).addLockedLine([1,1],[5,2]).build()}},l={args:{question:e().withXRange(-3,20).addLockedLine([1,1],[5,2]).build()}},g={args:{question:e().withXRange(1,20).build()}},h={args:{question:e().withXRange(6,20).build()}},f={args:{question:e().withXRange(-20,0).build()}},b={args:{question:e().withXRange(-20,-1).build()}},w={args:{question:e().withYRange(0,20).build()}},M={args:{question:e().withYRange(-1,20).build()}},L={args:{question:e().withYRange(1,20).build()}},R={args:{question:e().withYRange(-3,20).addLockedLine([-3,2],[5,16]).build()}},W={args:{question:e().withYRange(-20,0).build()}},q={args:{question:e().withYRange(-20,-1).build()}},A={args:{question:e().withXRange(0,10).withYRange(0,10).withAxisLabels("Video Game Hours per Week","Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()}},S={args:{question:e().withXRange(-1,10).withYRange(-1,10).withAxisLabels("Video Game Hours per Week","Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()}},k={args:{question:e().withXRange(0,.5).withYRange(0,.5).withTickStep(.1,.1).withGridStep(.1,.1).withAxisLabels("Video Game Hours per Week","Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()}},G={args:{question:e().build()},decorators:[xs]},x={args:{question:e().withSegments({numSegments:3}).build()}},v={args:{question:e().withCircle().withXRange(-10,10).withYRange(-5,5).build()},decorators:[xs]},B={args:{question:e().addLockedLine([-3,-3],[3,3]).withXRange(-5,5).withYRange(-10,10).build()}},X={args:{question:e().addLockedPointAt(3,2).addLockedPointAt(-1,1).addLockedPointAt(0,-4).build()}},Y={args:{question:e().addLockedLine([-1,1],[2,3]).build()}},Q={args:{question:e().withAngle().withProtractor().build()}},T={args:{question:Ts}},E={args:{question:vs(e().build())}};function Es(s){const{question:O}=s;return r.createElement(Ys,{strings:Qs,content:O.content,widgets:O.widgets,images:O.images,apiOptions:Xs.defaults})}var P,C,N;a.parameters={...a.parameters,docs:{...(P=a.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withAxisLabels("\\\\text{Custom $x$ label}", "\\\\text{Custom $y$ label}").build()
  }
}`,...(N=(C=a.parameters)==null?void 0:C.docs)==null?void 0:N.source}}};var V,y,I;t.parameters={...t.parameters,docs:{...(V=t.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withGridStep(2.571, 3.123).build()
  }
}`,...(I=(y=t.parameters)==null?void 0:y.docs)==null?void 0:I.source}}};var $,F,H;i.parameters={...i.parameters,docs:{...($=i.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withTickStep(1.5, 1.5).build()
  }
}`,...(H=(F=i.parameters)==null?void 0:F.docs)==null?void 0:H.source}}};var J,D,j;o.parameters={...o.parameters,docs:{...(J=o.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withMarkings("axes").build()
  }
}`,...(j=(D=o.parameters)==null?void 0:D.docs)==null?void 0:j.source}}};var Z,_,z;n.parameters={...n.parameters,docs:{...(Z=n.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withMarkings("grid").build()
  }
}`,...(z=(_=n.parameters)==null?void 0:_.docs)==null?void 0:z.source}}};var K,U,ee;c.parameters={...c.parameters,docs:{...(K=c.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withMarkings("none").build()
  }
}`,...(ee=(U=c.parameters)==null?void 0:U.docs)==null?void 0:ee.source}}};var se,re,ae;u.parameters={...u.parameters,docs:{...(se=u.parameters)==null?void 0:se.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-2, 2).withYRange(-2, 2).build()
  }
}`,...(ae=(re=u.parameters)==null?void 0:re.docs)==null?void 0:ae.source}}};var te,ie,oe;d.parameters={...d.parameters,docs:{...(te=d.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-50, 50).withYRange(-50, 50).build()
  }
}`,...(oe=(ie=d.parameters)==null?void 0:ie.docs)==null?void 0:oe.source}}};var ne,ce,ue;m.parameters={...m.parameters,docs:{...(ne=m.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(0, 20).addLockedLine([1, 1], [5, 2]).build()
  }
}`,...(ue=(ce=m.parameters)==null?void 0:ce.docs)==null?void 0:ue.source}}};var de,me,pe;p.parameters={...p.parameters,docs:{...(de=p.parameters)==null?void 0:de.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-1, 20).addLockedLine([1, 1], [5, 2]).build()
  }
}`,...(pe=(me=p.parameters)==null?void 0:me.docs)==null?void 0:pe.source}}};var le,ge,he;l.parameters={...l.parameters,docs:{...(le=l.parameters)==null?void 0:le.docs,source:{originalSource:`{
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
}`,...(Ae=(qe=f.parameters)==null?void 0:qe.docs)==null?void 0:Ae.source}}};var Se,ke,Ge;b.parameters={...b.parameters,docs:{...(Se=b.parameters)==null?void 0:Se.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-20, -1).build()
  }
}`,...(Ge=(ke=b.parameters)==null?void 0:ke.docs)==null?void 0:Ge.source}}};var xe,ve,Be;w.parameters={...w.parameters,docs:{...(xe=w.parameters)==null?void 0:xe.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(0, 20).build()
  }
}`,...(Be=(ve=w.parameters)==null?void 0:ve.docs)==null?void 0:Be.source}}};var Xe,Ye,Qe;M.parameters={...M.parameters,docs:{...(Xe=M.parameters)==null?void 0:Xe.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-1, 20).build()
  }
}`,...(Qe=(Ye=M.parameters)==null?void 0:Ye.docs)==null?void 0:Qe.source}}};var Te,Ee,Oe;L.parameters={...L.parameters,docs:{...(Te=L.parameters)==null?void 0:Te.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(1, 20).build()
  }
}`,...(Oe=(Ee=L.parameters)==null?void 0:Ee.docs)==null?void 0:Oe.source}}};var Pe,Ce,Ne;R.parameters={...R.parameters,docs:{...(Pe=R.parameters)==null?void 0:Pe.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-3, 20).addLockedLine([-3, 2], [5, 16]).build()
  }
}`,...(Ne=(Ce=R.parameters)==null?void 0:Ce.docs)==null?void 0:Ne.source}}};var Ve,ye,Ie;W.parameters={...W.parameters,docs:{...(Ve=W.parameters)==null?void 0:Ve.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-20, 0).build()
  }
}`,...(Ie=(ye=W.parameters)==null?void 0:ye.docs)==null?void 0:Ie.source}}};var $e,Fe,He;q.parameters={...q.parameters,docs:{...($e=q.parameters)==null?void 0:$e.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-20, -1).build()
  }
}`,...(He=(Fe=q.parameters)==null?void 0:Fe.docs)==null?void 0:He.source}}};var Je,De,je;A.parameters={...A.parameters,docs:{...(Je=A.parameters)==null?void 0:Je.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(0, 10).withYRange(0, 10).withAxisLabels("Video Game Hours per Week", "Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()
  }
}`,...(je=(De=A.parameters)==null?void 0:De.docs)==null?void 0:je.source}}};var Ze,_e,ze;S.parameters={...S.parameters,docs:{...(Ze=S.parameters)==null?void 0:Ze.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-1, 10).withYRange(-1, 10).withAxisLabels("Video Game Hours per Week", "Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()
  }
}`,...(ze=(_e=S.parameters)==null?void 0:_e.docs)==null?void 0:ze.source}}};var Ke,Ue,es;k.parameters={...k.parameters,docs:{...(Ke=k.parameters)==null?void 0:Ke.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(0, 0.5).withYRange(0, 0.5).withTickStep(0.1, 0.1).withGridStep(0.1, 0.1).withAxisLabels("Video Game Hours per Week", "Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()
  }
}`,...(es=(Ue=k.parameters)==null?void 0:Ue.docs)==null?void 0:es.source}}};var ss,rs,as;G.parameters={...G.parameters,docs:{...(ss=G.parameters)==null?void 0:ss.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().build()
  },
  decorators: [MobileContainerDecorator]
}`,...(as=(rs=G.parameters)==null?void 0:rs.docs)==null?void 0:as.source}}};var ts,is,os;x.parameters={...x.parameters,docs:{...(ts=x.parameters)==null?void 0:ts.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withSegments({
      numSegments: 3
    }).build()
  }
}`,...(os=(is=x.parameters)==null?void 0:is.docs)==null?void 0:os.source}}};var ns,cs,us;v.parameters={...v.parameters,docs:{...(ns=v.parameters)==null?void 0:ns.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withCircle().withXRange(-10, 10).withYRange(-5, 5).build()
  },
  // NOTE(jeremy): I migrated these stories to the v3 CSF story format, but
  // I'm unclear why this one story forces mobile when none of the others do,
  // and this story doesn't look mobile-specific. :thinking:
  decorators: [MobileContainerDecorator]
}`,...(us=(cs=v.parameters)==null?void 0:cs.docs)==null?void 0:us.source}}};var ds,ms,ps;B.parameters={...B.parameters,docs:{...(ds=B.parameters)==null?void 0:ds.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().addLockedLine([-3, -3], [3, 3]).withXRange(-5, 5).withYRange(-10, 10).build()
  }
}`,...(ps=(ms=B.parameters)==null?void 0:ms.docs)==null?void 0:ps.source}}};var ls,gs,hs;X.parameters={...X.parameters,docs:{...(ls=X.parameters)==null?void 0:ls.docs,source:{originalSource:`{
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
}`,...(As=(qs=T.parameters)==null?void 0:qs.docs)==null?void 0:As.source}}};var Ss,ks,Gs;E.parameters={...E.parameters,docs:{...(Ss=E.parameters)==null?void 0:Ss.docs,source:{originalSource:`{
  args: {
    question: splitPerseusItem(interactiveGraphQuestionBuilder().build())
  }
}`,...(Gs=(ks=E.parameters)==null?void 0:ks.docs)==null?void 0:Gs.source}}};const Wr=["MafsWithCustomAxisLabels","MafsWithFractionalGridStep","MafsWithFractionalAxisTicks","MafsWithAxesMarkings","MafsWithGridMarkings","MafsWithNoMarkings","MafsWithSmallRange","MafsWithLargeRange","MafsWithYAxisAtLeft","MafsWithYAxisNearLeft","MafsWithYAxisJustOverLeft","MafsWithYAxisOffLeft","MafsWithYAxisOffFarLeft","MafsWithYAxisAtRight","MafsWithYAxisOffRight","MafsWithXAxisAtBottom","MafsWithXAxisNearBottom","MafsWithXAxisOffBottom","MafsWithXAxisJustOverBottom","MafsWithXAxisAtTop","MafsWithXAxisOffTop","MafsWithLabelsAlongEdge","MafsWithLabelsAlongEdgeJustOverLeft","MafsWithLabelsAlongEdgeZoomed","MafsInMobileContainer","MafsWithMultipleSegments","MafsCircleGraphWithNonsquareRange","MafsLineGraphWithNonsquareRange","MafsWithLockedPoints","MafsWithLockedLine","MafsWithProtractor","MafsWithPiTicks","MafsWithAnswerlessData"];export{v as MafsCircleGraphWithNonsquareRange,G as MafsInMobileContainer,B as MafsLineGraphWithNonsquareRange,E as MafsWithAnswerlessData,o as MafsWithAxesMarkings,a as MafsWithCustomAxisLabels,i as MafsWithFractionalAxisTicks,t as MafsWithFractionalGridStep,n as MafsWithGridMarkings,A as MafsWithLabelsAlongEdge,S as MafsWithLabelsAlongEdgeJustOverLeft,k as MafsWithLabelsAlongEdgeZoomed,d as MafsWithLargeRange,Y as MafsWithLockedLine,X as MafsWithLockedPoints,x as MafsWithMultipleSegments,c as MafsWithNoMarkings,T as MafsWithPiTicks,Q as MafsWithProtractor,u as MafsWithSmallRange,w as MafsWithXAxisAtBottom,W as MafsWithXAxisAtTop,R as MafsWithXAxisJustOverBottom,M as MafsWithXAxisNearBottom,L as MafsWithXAxisOffBottom,q as MafsWithXAxisOffTop,m as MafsWithYAxisAtLeft,f as MafsWithYAxisAtRight,l as MafsWithYAxisJustOverLeft,p as MafsWithYAxisNearLeft,h as MafsWithYAxisOffFarLeft,g as MafsWithYAxisOffLeft,b as MafsWithYAxisOffRight,Wr as __namedExportsOrder,Rr as default};
