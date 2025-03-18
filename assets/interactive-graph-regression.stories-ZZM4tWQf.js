import{_ as Ts}from"./underscore-885MUNGo.js";import{q as Es}from"./random-util-9WQRKwFZ.js";import{g as Ps}from"./util-ghoLYzZ7.js";import{V as Cs}from"./index-hw7d7wq0.js";import{r as t}from"./index-6oxdNXpR.js";import{A as Ns}from"./perseus-api-Y55S7ZPk.js";import{R as ys}from"./renderer-Hg-eJGH1.js";import{m as Fs}from"./i18n-context-Q5gDzbF3.js";import{i as e}from"./interactive-graph-question-builder-t3NkJzMg.js";import{k as Vs}from"./interactive-graph.testdata-07nAiThW.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./perseus-error-l3K_anoI.js";import"./jquery-5v7aFUvu.js";import"./get-decimal-separator-C5N_K9o2.js";import"./no-important-xCWWYXQR.js";import"./index-o42urCig.js";import"./stub-tag-editor--BF0WBUz.js";import"./text-list-editor-9dKImvgD.js";import"./index-9gkyvru-.js";import"./index-J2t_5nK1.js";import"./index-dnMhQZ-1.js";import"./zoomable-tex-w6m6mqm2.js";import"./tex-q_4hQMGs.js";import"./dependencies-CP7Uh8Kq.js";import"./zoomable-m_J-BBOg.js";import"./svg-image-JxxWp2z_.js";import"./index--z92Kcj-.js";import"./index-zRqVZh6A.js";import"./fixed-to-responsive-8Rm8IBlT.js";import"./constants-vGHYchdS.js";import"./client-Rb4DelHy.js";import"./inline-icon-8e4u-lSW.js";import"./icon-paths-5JCXzGsq.js";import"./image-loader-qCu_dXQl.js";import"./lint-a43UkMJQ.js";import"./index-smZ6iCr_.js";import"./tiny-invariant-bHgPayXn.js";import"./jsx-runtime-63Ea5SlK.js";function Is(s){const r=Ts.clone(s),Xs=r.widgets??{},Ys=Ps(Xs),C={};for(const[Qs,P]of Object.entries(Ys)){const Os=Es(P.type);C[Qs]={...P,options:Os(P.options)}}return{...r,widgets:C}}const vr={title:"Perseus/Widgets/Interactive Graph Visual Regression Tests",component:$s,parameters:{chromatic:{disableSnapshot:!1}},decorators:s=>t.createElement(Cs,{style:{marginInlineStart:32}},t.createElement(s,null))};function Bs(s){return t.createElement("div",{className:"framework-perseus perseus-mobile"},t.createElement(s,null))}const i={args:{question:e().withAxisLabels("\\text{Custom $x$ label}","\\text{Custom $y$ label}").build()}},a={args:{question:e().withGridStep(2.571,3.123).build()}},o={args:{question:e().withTickStep(1.5,1.5).build()}},n={args:{question:e().withMarkings("axes").build()}},c={args:{question:e().withMarkings("grid").build()}},u={args:{question:e().withMarkings("none").build()}},d={args:{question:e().withXRange(-2,2).withYRange(-2,2).build()}},p={args:{question:e().withXRange(-50,50).withYRange(-50,50).build()}},m={args:{question:e().withXRange(0,20).addLockedLine([1,1],[5,2]).build()}},g={args:{question:e().withXRange(-1,20).addLockedLine([1,1],[5,2]).build()}},l={args:{question:e().withXRange(-3,20).addLockedLine([1,1],[5,2]).build()}},h={args:{question:e().withXRange(1,20).build()}},f={args:{question:e().withXRange(6,20).build()}},b={args:{question:e().withXRange(-20,0).build()}},w={args:{question:e().withXRange(-20,-1).build()}},M={args:{question:e().withYRange(0,20).build()}},L={args:{question:e().withYRange(-1,20).build()}},W={args:{question:e().withYRange(1,20).build()}},R={args:{question:e().withYRange(-3,20).addLockedLine([-3,2],[5,16]).build()}},q={args:{question:e().withYRange(-20,0).build()}},A={args:{question:e().withYRange(-20,-1).build()}},k={args:{question:e().withXRange(0,10).withYRange(0,10).withAxisLabels("Video Game Hours per Week","Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()}},S={args:{question:e().withXRange(-1,10).withYRange(-1,10).withAxisLabels("Video Game Hours per Week","Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()}},G={args:{question:e().withXRange(0,.5).withYRange(0,.5).withTickStep(.1,.1).withGridStep(.1,.1).withAxisLabels("Video Game Hours per Week","Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()}},x={args:{question:e().build()},decorators:[Bs]},v={args:{question:e().withSegments({numSegments:3}).build()}},B={args:{question:e().withCircle().withXRange(-10,10).withYRange(-5,5).build()},decorators:[Bs]},X={args:{question:e().addLockedLine([-3,-3],[3,3]).withXRange(-5,5).withYRange(-10,10).build()}},Y={args:{question:e().addLockedPointAt(3,2).addLockedPointAt(-1,1).addLockedPointAt(0,-4).build()}},Q={args:{question:e().addLockedLine([-1,1],[2,3]).build()}},O={args:{question:e().withAngle().withProtractor().build()}},T={args:{question:Vs}},E={args:{question:Is(e().build())}};function $s(s){const{question:r}=s;return t.createElement(ys,{strings:Fs,content:r.content,widgets:r.widgets,images:r.images,apiOptions:Ns.defaults})}var N,y,F;i.parameters={...i.parameters,docs:{...(N=i.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withAxisLabels("\\\\text{Custom $x$ label}", "\\\\text{Custom $y$ label}").build()
  }
}`,...(F=(y=i.parameters)==null?void 0:y.docs)==null?void 0:F.source}}};var V,I,$;a.parameters={...a.parameters,docs:{...(V=a.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withGridStep(2.571, 3.123).build()
  }
}`,...($=(I=a.parameters)==null?void 0:I.docs)==null?void 0:$.source}}};var H,J,D;o.parameters={...o.parameters,docs:{...(H=o.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withTickStep(1.5, 1.5).build()
  }
}`,...(D=(J=o.parameters)==null?void 0:J.docs)==null?void 0:D.source}}};var _,j,Z;n.parameters={...n.parameters,docs:{...(_=n.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withMarkings("axes").build()
  }
}`,...(Z=(j=n.parameters)==null?void 0:j.docs)==null?void 0:Z.source}}};var U,z,K;c.parameters={...c.parameters,docs:{...(U=c.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withMarkings("grid").build()
  }
}`,...(K=(z=c.parameters)==null?void 0:z.docs)==null?void 0:K.source}}};var ee,se,re;u.parameters={...u.parameters,docs:{...(ee=u.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withMarkings("none").build()
  }
}`,...(re=(se=u.parameters)==null?void 0:se.docs)==null?void 0:re.source}}};var te,ie,ae;d.parameters={...d.parameters,docs:{...(te=d.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-2, 2).withYRange(-2, 2).build()
  }
}`,...(ae=(ie=d.parameters)==null?void 0:ie.docs)==null?void 0:ae.source}}};var oe,ne,ce;p.parameters={...p.parameters,docs:{...(oe=p.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-50, 50).withYRange(-50, 50).build()
  }
}`,...(ce=(ne=p.parameters)==null?void 0:ne.docs)==null?void 0:ce.source}}};var ue,de,pe;m.parameters={...m.parameters,docs:{...(ue=m.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(0, 20).addLockedLine([1, 1], [5, 2]).build()
  }
}`,...(pe=(de=m.parameters)==null?void 0:de.docs)==null?void 0:pe.source}}};var me,ge,le;g.parameters={...g.parameters,docs:{...(me=g.parameters)==null?void 0:me.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-1, 20).addLockedLine([1, 1], [5, 2]).build()
  }
}`,...(le=(ge=g.parameters)==null?void 0:ge.docs)==null?void 0:le.source}}};var he,fe,be;l.parameters={...l.parameters,docs:{...(he=l.parameters)==null?void 0:he.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-3, 20).addLockedLine([1, 1], [5, 2]).build()
  }
}`,...(be=(fe=l.parameters)==null?void 0:fe.docs)==null?void 0:be.source}}};var we,Me,Le;h.parameters={...h.parameters,docs:{...(we=h.parameters)==null?void 0:we.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(1, 20).build()
  }
}`,...(Le=(Me=h.parameters)==null?void 0:Me.docs)==null?void 0:Le.source}}};var We,Re,qe;f.parameters={...f.parameters,docs:{...(We=f.parameters)==null?void 0:We.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(6, 20).build()
  }
}`,...(qe=(Re=f.parameters)==null?void 0:Re.docs)==null?void 0:qe.source}}};var Ae,ke,Se;b.parameters={...b.parameters,docs:{...(Ae=b.parameters)==null?void 0:Ae.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-20, 0).build()
  }
}`,...(Se=(ke=b.parameters)==null?void 0:ke.docs)==null?void 0:Se.source}}};var Ge,xe,ve;w.parameters={...w.parameters,docs:{...(Ge=w.parameters)==null?void 0:Ge.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-20, -1).build()
  }
}`,...(ve=(xe=w.parameters)==null?void 0:xe.docs)==null?void 0:ve.source}}};var Be,Xe,Ye;M.parameters={...M.parameters,docs:{...(Be=M.parameters)==null?void 0:Be.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(0, 20).build()
  }
}`,...(Ye=(Xe=M.parameters)==null?void 0:Xe.docs)==null?void 0:Ye.source}}};var Qe,Oe,Te;L.parameters={...L.parameters,docs:{...(Qe=L.parameters)==null?void 0:Qe.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-1, 20).build()
  }
}`,...(Te=(Oe=L.parameters)==null?void 0:Oe.docs)==null?void 0:Te.source}}};var Ee,Pe,Ce;W.parameters={...W.parameters,docs:{...(Ee=W.parameters)==null?void 0:Ee.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(1, 20).build()
  }
}`,...(Ce=(Pe=W.parameters)==null?void 0:Pe.docs)==null?void 0:Ce.source}}};var Ne,ye,Fe;R.parameters={...R.parameters,docs:{...(Ne=R.parameters)==null?void 0:Ne.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-3, 20).addLockedLine([-3, 2], [5, 16]).build()
  }
}`,...(Fe=(ye=R.parameters)==null?void 0:ye.docs)==null?void 0:Fe.source}}};var Ve,Ie,$e;q.parameters={...q.parameters,docs:{...(Ve=q.parameters)==null?void 0:Ve.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-20, 0).build()
  }
}`,...($e=(Ie=q.parameters)==null?void 0:Ie.docs)==null?void 0:$e.source}}};var He,Je,De;A.parameters={...A.parameters,docs:{...(He=A.parameters)==null?void 0:He.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-20, -1).build()
  }
}`,...(De=(Je=A.parameters)==null?void 0:Je.docs)==null?void 0:De.source}}};var _e,je,Ze;k.parameters={...k.parameters,docs:{...(_e=k.parameters)==null?void 0:_e.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(0, 10).withYRange(0, 10).withAxisLabels("Video Game Hours per Week", "Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()
  }
}`,...(Ze=(je=k.parameters)==null?void 0:je.docs)==null?void 0:Ze.source}}};var Ue,ze,Ke;S.parameters={...S.parameters,docs:{...(Ue=S.parameters)==null?void 0:Ue.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-1, 10).withYRange(-1, 10).withAxisLabels("Video Game Hours per Week", "Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()
  }
}`,...(Ke=(ze=S.parameters)==null?void 0:ze.docs)==null?void 0:Ke.source}}};var es,ss,rs;G.parameters={...G.parameters,docs:{...(es=G.parameters)==null?void 0:es.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(0, 0.5).withYRange(0, 0.5).withTickStep(0.1, 0.1).withGridStep(0.1, 0.1).withAxisLabels("Video Game Hours per Week", "Reaction Time (milliseconds)").withLabelLocation("alongEdge").build()
  }
}`,...(rs=(ss=G.parameters)==null?void 0:ss.docs)==null?void 0:rs.source}}};var ts,is,as;x.parameters={...x.parameters,docs:{...(ts=x.parameters)==null?void 0:ts.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().build()
  },
  decorators: [MobileContainerDecorator]
}`,...(as=(is=x.parameters)==null?void 0:is.docs)==null?void 0:as.source}}};var os,ns,cs;v.parameters={...v.parameters,docs:{...(os=v.parameters)==null?void 0:os.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withSegments({
      numSegments: 3
    }).build()
  }
}`,...(cs=(ns=v.parameters)==null?void 0:ns.docs)==null?void 0:cs.source}}};var us,ds,ps;B.parameters={...B.parameters,docs:{...(us=B.parameters)==null?void 0:us.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withCircle().withXRange(-10, 10).withYRange(-5, 5).build()
  },
  // NOTE(jeremy): I migrated these stories to the v3 CSF story format, but
  // I'm unclear why this one story forces mobile when none of the others do,
  // and this story doesn't look mobile-specific. :thinking:
  decorators: [MobileContainerDecorator]
}`,...(ps=(ds=B.parameters)==null?void 0:ds.docs)==null?void 0:ps.source}}};var ms,gs,ls;X.parameters={...X.parameters,docs:{...(ms=X.parameters)==null?void 0:ms.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().addLockedLine([-3, -3], [3, 3]).withXRange(-5, 5).withYRange(-10, 10).build()
  }
}`,...(ls=(gs=X.parameters)==null?void 0:gs.docs)==null?void 0:ls.source}}};var hs,fs,bs;Y.parameters={...Y.parameters,docs:{...(hs=Y.parameters)==null?void 0:hs.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().addLockedPointAt(3, 2).addLockedPointAt(-1, 1).addLockedPointAt(0, -4).build()
  }
}`,...(bs=(fs=Y.parameters)==null?void 0:fs.docs)==null?void 0:bs.source}}};var ws,Ms,Ls;Q.parameters={...Q.parameters,docs:{...(ws=Q.parameters)==null?void 0:ws.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().addLockedLine([-1, 1], [2, 3]).build()
  }
}`,...(Ls=(Ms=Q.parameters)==null?void 0:Ms.docs)==null?void 0:Ls.source}}};var Ws,Rs,qs;O.parameters={...O.parameters,docs:{...(Ws=O.parameters)==null?void 0:Ws.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withAngle().withProtractor().build()
  }
}`,...(qs=(Rs=O.parameters)==null?void 0:Rs.docs)==null?void 0:qs.source}}};var As,ks,Ss;T.parameters={...T.parameters,docs:{...(As=T.parameters)==null?void 0:As.docs,source:{originalSource:`{
  args: {
    question: sinusoidWithPiTicks
  }
}`,...(Ss=(ks=T.parameters)==null?void 0:ks.docs)==null?void 0:Ss.source}}};var Gs,xs,vs;E.parameters={...E.parameters,docs:{...(Gs=E.parameters)==null?void 0:Gs.docs,source:{originalSource:`{
  args: {
    question: splitPerseusItem(interactiveGraphQuestionBuilder().build())
  }
}`,...(vs=(xs=E.parameters)==null?void 0:xs.docs)==null?void 0:vs.source}}};const Br=["MafsWithCustomAxisLabels","MafsWithFractionalGridStep","MafsWithFractionalAxisTicks","MafsWithAxesMarkings","MafsWithGridMarkings","MafsWithNoMarkings","MafsWithSmallRange","MafsWithLargeRange","MafsWithYAxisAtLeft","MafsWithYAxisNearLeft","MafsWithYAxisJustOverLeft","MafsWithYAxisOffLeft","MafsWithYAxisOffFarLeft","MafsWithYAxisAtRight","MafsWithYAxisOffRight","MafsWithXAxisAtBottom","MafsWithXAxisNearBottom","MafsWithXAxisOffBottom","MafsWithXAxisJustOverBottom","MafsWithXAxisAtTop","MafsWithXAxisOffTop","MafsWithLabelsAlongEdge","MafsWithLabelsAlongEdgeJustOverLeft","MafsWithLabelsAlongEdgeZoomed","MafsInMobileContainer","MafsWithMultipleSegments","MafsCircleGraphWithNonsquareRange","MafsLineGraphWithNonsquareRange","MafsWithLockedPoints","MafsWithLockedLine","MafsWithProtractor","MafsWithPiTicks","MafsWithAnswerlessData"];export{B as MafsCircleGraphWithNonsquareRange,x as MafsInMobileContainer,X as MafsLineGraphWithNonsquareRange,E as MafsWithAnswerlessData,n as MafsWithAxesMarkings,i as MafsWithCustomAxisLabels,o as MafsWithFractionalAxisTicks,a as MafsWithFractionalGridStep,c as MafsWithGridMarkings,k as MafsWithLabelsAlongEdge,S as MafsWithLabelsAlongEdgeJustOverLeft,G as MafsWithLabelsAlongEdgeZoomed,p as MafsWithLargeRange,Q as MafsWithLockedLine,Y as MafsWithLockedPoints,v as MafsWithMultipleSegments,u as MafsWithNoMarkings,T as MafsWithPiTicks,O as MafsWithProtractor,d as MafsWithSmallRange,M as MafsWithXAxisAtBottom,q as MafsWithXAxisAtTop,R as MafsWithXAxisJustOverBottom,L as MafsWithXAxisNearBottom,W as MafsWithXAxisOffBottom,A as MafsWithXAxisOffTop,m as MafsWithYAxisAtLeft,b as MafsWithYAxisAtRight,l as MafsWithYAxisJustOverLeft,g as MafsWithYAxisNearLeft,f as MafsWithYAxisOffFarLeft,h as MafsWithYAxisOffLeft,w as MafsWithYAxisOffRight,Br as __namedExportsOrder,vr as default};
