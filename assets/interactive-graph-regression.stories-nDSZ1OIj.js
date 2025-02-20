import{j as O}from"./jsx-runtime-63Ea5SlK.js";import{_ as Ls}from"./index-default-4_ZsnO94.js";import{o as As}from"./random-util-SPl7f2gt.js";import{g as xs}from"./util-nmML-gwR.js";import{A as ks}from"./perseus-api-DO0X8arb.js";import{R as Ss}from"./renderer-uejWNbLH.js";import{m as Gs}from"./i18n-context-GVCAGr7t.js";import{i as e}from"./interactive-graph-question-builder-00J3MhwK.js";import{k as Bs}from"./interactive-graph.testdata-9EX2z4G5.js";import"./index-6oxdNXpR.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./perseus-error-l3K_anoI.js";import"./jquery-5v7aFUvu.js";import"./get-decimal-separator-c07pHhM9.js";import"./index-o42urCig.js";import"./stub-tag-editor-3VEaZ-53.js";import"./text-list-editor-ND6Qift6.js";import"./index-9gkyvru-.js";import"./index-J2t_5nK1.js";import"./index-dnMhQZ-1.js";import"./zoomable-tex-OTkyDBc-.js";import"./tex-MX5FPdQh.js";import"./dependencies-CP7Uh8Kq.js";import"./zoomable-pOEbOEqK.js";import"./svg-image-cdZc2Rc_.js";import"./index-oE4Tpxqm.js";import"./no-important-xCWWYXQR.js";import"./index-_3CKOwHy.js";import"./index-QHkT31Yt.js";import"./fixed-to-responsive-I_PLOgi8.js";import"./constants-qvNmarDy.js";import"./client-Rb4DelHy.js";import"./inline-icon-6fh0Wu1y.js";import"./icon-paths-5JCXzGsq.js";import"./image-loader-cBoFrbCq.js";import"./lint-r_VdOcfh.js";import"./index-smZ6iCr_.js";import"./tiny-invariant-bHgPayXn.js";function vs(r){const s=Ls.clone(r),ws=s.widgets??{},Ws=xs(ws),P={};for(const[qs,Q]of Object.entries(Ws)){const Rs=As(Q.type);P[qs]={...Q,options:Rs(Q.options)}}return{...s,widgets:P}}const fr={title:"Perseus/Widgets/Interactive Graph Visual Regression Tests",component:Xs,parameters:{chromatic:{disableSnapshot:!1}}};function bs(r){return O.jsx("div",{className:"framework-perseus perseus-mobile",children:O.jsx(r,{})})}const t={args:{question:e().withAxisLabels("\\text{Custom $x$ label}","\\text{Custom $y$ label}").build()}},i={args:{question:e().withGridStep(2.571,3.123).build()}},a={args:{question:e().withTickStep(1.5,1.5).build()}},o={args:{question:e().withMarkings("axes").build()}},n={args:{question:e().withMarkings("grid").build()}},c={args:{question:e().withMarkings("none").build()}},u={args:{question:e().withXRange(-2,2).withYRange(-2,2).build()}},d={args:{question:e().withXRange(-50,50).withYRange(-50,50).build()}},p={args:{question:e().withXRange(0,20).addLockedLine([1,1],[5,2]).build()}},m={args:{question:e().withXRange(-1,20).addLockedLine([1,1],[5,2]).build()}},g={args:{question:e().withXRange(-3,20).addLockedLine([1,1],[5,2]).build()}},l={args:{question:e().withXRange(1,20).build()}},h={args:{question:e().withXRange(6,20).build()}},f={args:{question:e().withXRange(-20,0).build()}},M={args:{question:e().withXRange(-20,-1).build()}},b={args:{question:e().withYRange(0,20).build()}},w={args:{question:e().withYRange(-1,20).build()}},W={args:{question:e().withYRange(1,20).build()}},q={args:{question:e().withYRange(-3,20).addLockedLine([-3,2],[5,16]).build()}},R={args:{question:e().withYRange(-20,0).build()}},L={args:{question:e().withYRange(-20,-1).build()}},A={args:{question:e().build()},decorators:[bs]},x={args:{question:e().withSegments({numSegments:3}).build()}},k={args:{question:e().withCircle().withXRange(-10,10).withYRange(-5,5).build()},decorators:[bs]},S={args:{question:e().addLockedLine([-3,-3],[3,3]).withXRange(-5,5).withYRange(-10,10).build()}},G={args:{question:e().addLockedPointAt(3,2).addLockedPointAt(-1,1).addLockedPointAt(0,-4).build()}},B={args:{question:e().addLockedLine([-1,1],[2,3]).build()}},v={args:{question:e().withProtractor().build()}},X={args:{question:Bs}},Y={args:{question:vs(e().build())}};function Xs(r){const{question:s}=r;return O.jsx(Ss,{strings:Gs,content:s.content,widgets:s.widgets,images:s.images,apiOptions:ks.defaults})}var C,T,N;t.parameters={...t.parameters,docs:{...(C=t.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withAxisLabels("\\\\text{Custom $x$ label}", "\\\\text{Custom $y$ label}").build()
  }
}`,...(N=(T=t.parameters)==null?void 0:T.docs)==null?void 0:N.source}}};var F,y,$;i.parameters={...i.parameters,docs:{...(F=i.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withGridStep(2.571, 3.123).build()
  }
}`,...($=(y=i.parameters)==null?void 0:y.docs)==null?void 0:$.source}}};var j,I,D;a.parameters={...a.parameters,docs:{...(j=a.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withTickStep(1.5, 1.5).build()
  }
}`,...(D=(I=a.parameters)==null?void 0:I.docs)==null?void 0:D.source}}};var J,E,_;o.parameters={...o.parameters,docs:{...(J=o.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withMarkings("axes").build()
  }
}`,...(_=(E=o.parameters)==null?void 0:E.docs)==null?void 0:_.source}}};var U,V,z;n.parameters={...n.parameters,docs:{...(U=n.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withMarkings("grid").build()
  }
}`,...(z=(V=n.parameters)==null?void 0:V.docs)==null?void 0:z.source}}};var H,K,Z;c.parameters={...c.parameters,docs:{...(H=c.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withMarkings("none").build()
  }
}`,...(Z=(K=c.parameters)==null?void 0:K.docs)==null?void 0:Z.source}}};var ee,se,re;u.parameters={...u.parameters,docs:{...(ee=u.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-2, 2).withYRange(-2, 2).build()
  }
}`,...(re=(se=u.parameters)==null?void 0:se.docs)==null?void 0:re.source}}};var te,ie,ae;d.parameters={...d.parameters,docs:{...(te=d.parameters)==null?void 0:te.docs,source:{originalSource:`{
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
}`,...(Le=(Re=f.parameters)==null?void 0:Re.docs)==null?void 0:Le.source}}};var Ae,xe,ke;M.parameters={...M.parameters,docs:{...(Ae=M.parameters)==null?void 0:Ae.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withXRange(-20, -1).build()
  }
}`,...(ke=(xe=M.parameters)==null?void 0:xe.docs)==null?void 0:ke.source}}};var Se,Ge,Be;b.parameters={...b.parameters,docs:{...(Se=b.parameters)==null?void 0:Se.docs,source:{originalSource:`{
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
}`,...($e=(ye=R.parameters)==null?void 0:ye.docs)==null?void 0:$e.source}}};var je,Ie,De;L.parameters={...L.parameters,docs:{...(je=L.parameters)==null?void 0:je.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withYRange(-20, -1).build()
  }
}`,...(De=(Ie=L.parameters)==null?void 0:Ie.docs)==null?void 0:De.source}}};var Je,Ee,_e;A.parameters={...A.parameters,docs:{...(Je=A.parameters)==null?void 0:Je.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().build()
  },
  decorators: [MobileContainerDecorator]
}`,...(_e=(Ee=A.parameters)==null?void 0:Ee.docs)==null?void 0:_e.source}}};var Ue,Ve,ze;x.parameters={...x.parameters,docs:{...(Ue=x.parameters)==null?void 0:Ue.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withSegments({
      numSegments: 3
    }).build()
  }
}`,...(ze=(Ve=x.parameters)==null?void 0:Ve.docs)==null?void 0:ze.source}}};var He,Ke,Ze;k.parameters={...k.parameters,docs:{...(He=k.parameters)==null?void 0:He.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withCircle().withXRange(-10, 10).withYRange(-5, 5).build()
  },
  // NOTE(jeremy): I migrated these stories to the v3 CSF story format, but
  // I'm unclear why this one story forces mobile when none of the others do,
  // and this story doesn't look mobile-specific. :thinking:
  decorators: [MobileContainerDecorator]
}`,...(Ze=(Ke=k.parameters)==null?void 0:Ke.docs)==null?void 0:Ze.source}}};var es,ss,rs;S.parameters={...S.parameters,docs:{...(es=S.parameters)==null?void 0:es.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().addLockedLine([-3, -3], [3, 3]).withXRange(-5, 5).withYRange(-10, 10).build()
  }
}`,...(rs=(ss=S.parameters)==null?void 0:ss.docs)==null?void 0:rs.source}}};var ts,is,as;G.parameters={...G.parameters,docs:{...(ts=G.parameters)==null?void 0:ts.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().addLockedPointAt(3, 2).addLockedPointAt(-1, 1).addLockedPointAt(0, -4).build()
  }
}`,...(as=(is=G.parameters)==null?void 0:is.docs)==null?void 0:as.source}}};var os,ns,cs;B.parameters={...B.parameters,docs:{...(os=B.parameters)==null?void 0:os.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().addLockedLine([-1, 1], [2, 3]).build()
  }
}`,...(cs=(ns=B.parameters)==null?void 0:ns.docs)==null?void 0:cs.source}}};var us,ds,ps;v.parameters={...v.parameters,docs:{...(us=v.parameters)==null?void 0:us.docs,source:{originalSource:`{
  args: {
    question: interactiveGraphQuestionBuilder().withProtractor().build()
  }
}`,...(ps=(ds=v.parameters)==null?void 0:ds.docs)==null?void 0:ps.source}}};var ms,gs,ls;X.parameters={...X.parameters,docs:{...(ms=X.parameters)==null?void 0:ms.docs,source:{originalSource:`{
  args: {
    question: sinusoidWithPiTicks
  }
}`,...(ls=(gs=X.parameters)==null?void 0:gs.docs)==null?void 0:ls.source}}};var hs,fs,Ms;Y.parameters={...Y.parameters,docs:{...(hs=Y.parameters)==null?void 0:hs.docs,source:{originalSource:`{
  args: {
    question: splitPerseusItem(interactiveGraphQuestionBuilder().build())
  }
}`,...(Ms=(fs=Y.parameters)==null?void 0:fs.docs)==null?void 0:Ms.source}}};const Mr=["MafsWithCustomAxisLabels","MafsWithFractionalGridStep","MafsWithFractionalAxisTicks","MafsWithAxesMarkings","MafsWithGridMarkings","MafsWithNoMarkings","MafsWithSmallRange","MafsWithLargeRange","MafsWithYAxisAtLeft","MafsWithYAxisNearLeft","MafsWithYAxisJustOverLeft","MafsWithYAxisOffLeft","MafsWithYAxisOffFarLeft","MafsWithYAxisAtRight","MafsWithYAxisOffRight","MafsWithXAxisAtBottom","MafsWithXAxisNearBottom","MafsWithXAxisOffBottom","MafsWithXAxisJustOverBottom","MafsWithXAxisAtTop","MafsWithXAxisOffTop","MafsInMobileContainer","MafsWithMultipleSegments","MafsCircleGraphWithNonsquareRange","MafsLineGraphWithNonsquareRange","MafsWithLockedPoints","MafsWithLockedLine","MafsWithProtractor","MafsWithPiTicks","MafsWithAnswerlessData"];export{k as MafsCircleGraphWithNonsquareRange,A as MafsInMobileContainer,S as MafsLineGraphWithNonsquareRange,Y as MafsWithAnswerlessData,o as MafsWithAxesMarkings,t as MafsWithCustomAxisLabels,a as MafsWithFractionalAxisTicks,i as MafsWithFractionalGridStep,n as MafsWithGridMarkings,d as MafsWithLargeRange,B as MafsWithLockedLine,G as MafsWithLockedPoints,x as MafsWithMultipleSegments,c as MafsWithNoMarkings,X as MafsWithPiTicks,v as MafsWithProtractor,u as MafsWithSmallRange,b as MafsWithXAxisAtBottom,R as MafsWithXAxisAtTop,q as MafsWithXAxisJustOverBottom,w as MafsWithXAxisNearBottom,W as MafsWithXAxisOffBottom,L as MafsWithXAxisOffTop,p as MafsWithYAxisAtLeft,f as MafsWithYAxisAtRight,g as MafsWithYAxisJustOverLeft,m as MafsWithYAxisNearLeft,h as MafsWithYAxisOffFarLeft,l as MafsWithYAxisOffLeft,M as MafsWithYAxisOffRight,Mr as __namedExportsOrder,fr as default};
