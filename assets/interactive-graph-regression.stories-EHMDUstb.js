import{_ as Lr}from"./underscore-885MUNGo.js";import{o as Ar}from"./random-util-wZstT-Qs.js";import{g as kr}from"./util-pBxNglIl.js";import{r as O}from"./index-6oxdNXpR.js";import{A as Sr}from"./perseus-api-Y55S7ZPk.js";import{R as xr}from"./renderer-Kfrxosjs.js";import{m as Gr}from"./i18n-context-7Qj84tw8.js";import{i as e}from"./interactive-graph-question-builder-00J3MhwK.js";import{k as Br}from"./interactive-graph.testdata-9EX2z4G5.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./perseus-error-l3K_anoI.js";import"./jquery-5v7aFUvu.js";import"./get-decimal-separator-C5N_K9o2.js";import"./index-o42urCig.js";import"./stub-tag-editor--BF0WBUz.js";import"./text-list-editor-9dKImvgD.js";import"./index-9gkyvru-.js";import"./index-J2t_5nK1.js";import"./index-dnMhQZ-1.js";import"./zoomable-tex-vrUOkV3E.js";import"./tex-q_4hQMGs.js";import"./dependencies-CP7Uh8Kq.js";import"./zoomable-m_J-BBOg.js";import"./svg-image-Prev2-2p.js";import"./index-oeg-q71o.js";import"./no-important-xCWWYXQR.js";import"./index-iTGWTR8W.js";import"./index-QHkT31Yt.js";import"./fixed-to-responsive-8Rm8IBlT.js";import"./constants-vGHYchdS.js";import"./client-Rb4DelHy.js";import"./inline-icon-8e4u-lSW.js";import"./icon-paths-5JCXzGsq.js";import"./image-loader-qCu_dXQl.js";import"./lint-a43UkMJQ.js";import"./index-smZ6iCr_.js";import"./tiny-invariant-bHgPayXn.js";import"./jsx-runtime-63Ea5SlK.js";function vr(s){const r=Lr.clone(s),wr=r.widgets??{},Wr=kr(wr),P={};for(const[qr,Q]of Object.entries(Wr)){const Rr=Ar(Q.type);P[qr]={...Q,options:Rr(Q.options)}}return{...r,widgets:P}}const fs={title:"Perseus/Widgets/Interactive Graph Visual Regression Tests",component:Xr,parameters:{chromatic:{disableSnapshot:!1}}};function br(s){return O.createElement("div",{className:"framework-perseus perseus-mobile"},O.createElement(s,null))}const t={args:{question:e().withAxisLabels("\\text{Custom $x$ label}","\\text{Custom $y$ label}").build()}},i={args:{question:e().withGridStep(2.571,3.123).build()}},a={args:{question:e().withTickStep(1.5,1.5).build()}},o={args:{question:e().withMarkings("axes").build()}},n={args:{question:e().withMarkings("grid").build()}},c={args:{question:e().withMarkings("none").build()}},u={args:{question:e().withXRange(-2,2).withYRange(-2,2).build()}},d={args:{question:e().withXRange(-50,50).withYRange(-50,50).build()}},p={args:{question:e().withXRange(0,20).addLockedLine([1,1],[5,2]).build()}},m={args:{question:e().withXRange(-1,20).addLockedLine([1,1],[5,2]).build()}},g={args:{question:e().withXRange(-3,20).addLockedLine([1,1],[5,2]).build()}},l={args:{question:e().withXRange(1,20).build()}},h={args:{question:e().withXRange(6,20).build()}},f={args:{question:e().withXRange(-20,0).build()}},M={args:{question:e().withXRange(-20,-1).build()}},b={args:{question:e().withYRange(0,20).build()}},w={args:{question:e().withYRange(-1,20).build()}},W={args:{question:e().withYRange(1,20).build()}},q={args:{question:e().withYRange(-3,20).addLockedLine([-3,2],[5,16]).build()}},R={args:{question:e().withYRange(-20,0).build()}},L={args:{question:e().withYRange(-20,-1).build()}},A={args:{question:e().build()},decorators:[br]},k={args:{question:e().withSegments({numSegments:3}).build()}},S={args:{question:e().withCircle().withXRange(-10,10).withYRange(-5,5).build()},decorators:[br]},x={args:{question:e().addLockedLine([-3,-3],[3,3]).withXRange(-5,5).withYRange(-10,10).build()}},G={args:{question:e().addLockedPointAt(3,2).addLockedPointAt(-1,1).addLockedPointAt(0,-4).build()}},B={args:{question:e().addLockedLine([-1,1],[2,3]).build()}},v={args:{question:e().withProtractor().build()}},X={args:{question:Br}},Y={args:{question:vr(e().build())}};function Xr(s){const{question:r}=s;return O.createElement(xr,{strings:Gr,content:r.content,widgets:r.widgets,images:r.images,apiOptions:Sr.defaults})}var C,T,N;t.parameters={...t.parameters,docs:{...(C=t.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withAxisLabels("\\\\text{Custom $x$ label}", "\\\\text{Custom $y$ label}").build()
  }
}`,...(N=(T=t.parameters)==null?void 0:T.docs)==null?void 0:N.source}}};var F,y,$;i.parameters={...i.parameters,docs:{...(F=i.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withGridStep(2.571, 3.123).build()
  }
}`,...($=(y=i.parameters)==null?void 0:y.docs)==null?void 0:$.source}}};var I,E,D;a.parameters={...a.parameters,docs:{...(I=a.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withTickStep(1.5, 1.5).build()
  }
}`,...(D=(E=a.parameters)==null?void 0:E.docs)==null?void 0:D.source}}};var J,_,j;o.parameters={...o.parameters,docs:{...(J=o.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withMarkings("axes").build()
  }
}`,...(j=(_=o.parameters)==null?void 0:_.docs)==null?void 0:j.source}}};var U,V,z;n.parameters={...n.parameters,docs:{...(U=n.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withMarkings("grid").build()
  }
}`,...(z=(V=n.parameters)==null?void 0:V.docs)==null?void 0:z.source}}};var H,K,Z;c.parameters={...c.parameters,docs:{...(H=c.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withMarkings("none").build()
  }
}`,...(Z=(K=c.parameters)==null?void 0:K.docs)==null?void 0:Z.source}}};var ee,re,se;u.parameters={...u.parameters,docs:{...(ee=u.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-2, 2).withYRange(-2, 2).build()
  }
}`,...(se=(re=u.parameters)==null?void 0:re.docs)==null?void 0:se.source}}};var te,ie,ae;d.parameters={...d.parameters,docs:{...(te=d.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-50, 50).withYRange(-50, 50).build()
  }
}`,...(ae=(ie=d.parameters)==null?void 0:ie.docs)==null?void 0:ae.source}}};var oe,ne,ce;p.parameters={...p.parameters,docs:{...(oe=p.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(0, 20).addLockedLine([1, 1], [5, 2]).build()
  }
}`,...(ce=(ne=p.parameters)==null?void 0:ne.docs)==null?void 0:ce.source}}};var ue,de,pe;m.parameters={...m.parameters,docs:{...(ue=m.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-1, 20).addLockedLine([1, 1], [5, 2]).build()
  }
}`,...(pe=(de=m.parameters)==null?void 0:de.docs)==null?void 0:pe.source}}};var me,ge,le;g.parameters={...g.parameters,docs:{...(me=g.parameters)==null?void 0:me.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-3, 20).addLockedLine([1, 1], [5, 2]).build()
  }
}`,...(le=(ge=g.parameters)==null?void 0:ge.docs)==null?void 0:le.source}}};var he,fe,Me;l.parameters={...l.parameters,docs:{...(he=l.parameters)==null?void 0:he.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(1, 20).build()
  }
}`,...(Me=(fe=l.parameters)==null?void 0:fe.docs)==null?void 0:Me.source}}};var be,we,We;h.parameters={...h.parameters,docs:{...(be=h.parameters)==null?void 0:be.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(6, 20).build()
  }
}`,...(We=(we=h.parameters)==null?void 0:we.docs)==null?void 0:We.source}}};var qe,Re,Le;f.parameters={...f.parameters,docs:{...(qe=f.parameters)==null?void 0:qe.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-20, 0).build()
  }
}`,...(Le=(Re=f.parameters)==null?void 0:Re.docs)==null?void 0:Le.source}}};var Ae,ke,Se;M.parameters={...M.parameters,docs:{...(Ae=M.parameters)==null?void 0:Ae.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-20, -1).build()
  }
}`,...(Se=(ke=M.parameters)==null?void 0:ke.docs)==null?void 0:Se.source}}};var xe,Ge,Be;b.parameters={...b.parameters,docs:{...(xe=b.parameters)==null?void 0:xe.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(0, 20).build()
  }
}`,...(Be=(Ge=b.parameters)==null?void 0:Ge.docs)==null?void 0:Be.source}}};var ve,Xe,Ye;w.parameters={...w.parameters,docs:{...(ve=w.parameters)==null?void 0:ve.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-1, 20).build()
  }
}`,...(Ye=(Xe=w.parameters)==null?void 0:Xe.docs)==null?void 0:Ye.source}}};var Qe,Oe,Pe;W.parameters={...W.parameters,docs:{...(Qe=W.parameters)==null?void 0:Qe.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(1, 20).build()
  }
}`,...(Pe=(Oe=W.parameters)==null?void 0:Oe.docs)==null?void 0:Pe.source}}};var Ce,Te,Ne;q.parameters={...q.parameters,docs:{...(Ce=q.parameters)==null?void 0:Ce.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-3, 20).addLockedLine([-3, 2], [5, 16]).build()
  }
}`,...(Ne=(Te=q.parameters)==null?void 0:Te.docs)==null?void 0:Ne.source}}};var Fe,ye,$e;R.parameters={...R.parameters,docs:{...(Fe=R.parameters)==null?void 0:Fe.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-20, 0).build()
  }
}`,...($e=(ye=R.parameters)==null?void 0:ye.docs)==null?void 0:$e.source}}};var Ie,Ee,De;L.parameters={...L.parameters,docs:{...(Ie=L.parameters)==null?void 0:Ie.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-20, -1).build()
  }
}`,...(De=(Ee=L.parameters)==null?void 0:Ee.docs)==null?void 0:De.source}}};var Je,_e,je;A.parameters={...A.parameters,docs:{...(Je=A.parameters)==null?void 0:Je.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().build()
  },
  decorators: [MobileContainerDecorator]
}`,...(je=(_e=A.parameters)==null?void 0:_e.docs)==null?void 0:je.source}}};var Ue,Ve,ze;k.parameters={...k.parameters,docs:{...(Ue=k.parameters)==null?void 0:Ue.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withSegments({
      numSegments: 3
    }).build()
  }
}`,...(ze=(Ve=k.parameters)==null?void 0:Ve.docs)==null?void 0:ze.source}}};var He,Ke,Ze;S.parameters={...S.parameters,docs:{...(He=S.parameters)==null?void 0:He.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withCircle().withXRange(-10, 10).withYRange(-5, 5).build()
  },
  // NOTE(jeremy): I migrated these stories to the v3 CSF story format, but
  // I'm unclear why this one story forces mobile when none of the others do,
  // and this story doesn't look mobile-specific. :thinking:
  decorators: [MobileContainerDecorator]
}`,...(Ze=(Ke=S.parameters)==null?void 0:Ke.docs)==null?void 0:Ze.source}}};var er,rr,sr;x.parameters={...x.parameters,docs:{...(er=x.parameters)==null?void 0:er.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().addLockedLine([-3, -3], [3, 3]).withXRange(-5, 5).withYRange(-10, 10).build()
  }
}`,...(sr=(rr=x.parameters)==null?void 0:rr.docs)==null?void 0:sr.source}}};var tr,ir,ar;G.parameters={...G.parameters,docs:{...(tr=G.parameters)==null?void 0:tr.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().addLockedPointAt(3, 2).addLockedPointAt(-1, 1).addLockedPointAt(0, -4).build()
  }
}`,...(ar=(ir=G.parameters)==null?void 0:ir.docs)==null?void 0:ar.source}}};var or,nr,cr;B.parameters={...B.parameters,docs:{...(or=B.parameters)==null?void 0:or.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().addLockedLine([-1, 1], [2, 3]).build()
  }
}`,...(cr=(nr=B.parameters)==null?void 0:nr.docs)==null?void 0:cr.source}}};var ur,dr,pr;v.parameters={...v.parameters,docs:{...(ur=v.parameters)==null?void 0:ur.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withProtractor().build()
  }
}`,...(pr=(dr=v.parameters)==null?void 0:dr.docs)==null?void 0:pr.source}}};var mr,gr,lr;X.parameters={...X.parameters,docs:{...(mr=X.parameters)==null?void 0:mr.docs,source:{originalSource:`{
  args: {
    question: sinusoidWithPiTicks
  }
}`,...(lr=(gr=X.parameters)==null?void 0:gr.docs)==null?void 0:lr.source}}};var hr,fr,Mr;Y.parameters={...Y.parameters,docs:{...(hr=Y.parameters)==null?void 0:hr.docs,source:{originalSource:`{
  args: {
    question: splitPerseusItem(interactiveGraphQuestionBuilder().build())
  }
}`,...(Mr=(fr=Y.parameters)==null?void 0:fr.docs)==null?void 0:Mr.source}}};const Ms=["MafsWithCustomAxisLabels","MafsWithFractionalGridStep","MafsWithFractionalAxisTicks","MafsWithAxesMarkings","MafsWithGridMarkings","MafsWithNoMarkings","MafsWithSmallRange","MafsWithLargeRange","MafsWithYAxisAtLeft","MafsWithYAxisNearLeft","MafsWithYAxisJustOverLeft","MafsWithYAxisOffLeft","MafsWithYAxisOffFarLeft","MafsWithYAxisAtRight","MafsWithYAxisOffRight","MafsWithXAxisAtBottom","MafsWithXAxisNearBottom","MafsWithXAxisOffBottom","MafsWithXAxisJustOverBottom","MafsWithXAxisAtTop","MafsWithXAxisOffTop","MafsInMobileContainer","MafsWithMultipleSegments","MafsCircleGraphWithNonsquareRange","MafsLineGraphWithNonsquareRange","MafsWithLockedPoints","MafsWithLockedLine","MafsWithProtractor","MafsWithPiTicks","MafsWithAnswerlessData"];export{S as MafsCircleGraphWithNonsquareRange,A as MafsInMobileContainer,x as MafsLineGraphWithNonsquareRange,Y as MafsWithAnswerlessData,o as MafsWithAxesMarkings,t as MafsWithCustomAxisLabels,a as MafsWithFractionalAxisTicks,i as MafsWithFractionalGridStep,n as MafsWithGridMarkings,d as MafsWithLargeRange,B as MafsWithLockedLine,G as MafsWithLockedPoints,k as MafsWithMultipleSegments,c as MafsWithNoMarkings,X as MafsWithPiTicks,v as MafsWithProtractor,u as MafsWithSmallRange,b as MafsWithXAxisAtBottom,R as MafsWithXAxisAtTop,q as MafsWithXAxisJustOverBottom,w as MafsWithXAxisNearBottom,W as MafsWithXAxisOffBottom,L as MafsWithXAxisOffTop,p as MafsWithYAxisAtLeft,f as MafsWithYAxisAtRight,g as MafsWithYAxisJustOverLeft,m as MafsWithYAxisNearLeft,h as MafsWithYAxisOffFarLeft,l as MafsWithYAxisOffLeft,M as MafsWithYAxisOffRight,Ms as __namedExportsOrder,fs as default};
