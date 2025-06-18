import{cL as e}from"./iframe-BrZ1H8ZK.js";import{S as re}from"./server-item-renderer-with-debug-ui-B7XsYGdl.js";import{L as t,M as oe}from"./interactive-graph.testdata-Yl7xksb8.js";import"./server-item-renderer-BFvp-8bw.js";import"./hints-renderer-CIxBRI6H.js";import"./main-CiUM6vVz.js";import"./test-keypad-context-wrapper-1mEkMmQG.js";import"./Popper-El47U0sO.js";import"./interactive-graph-question-builder-C7uZo63C.js";const xe={title:"Perseus/Widgets/Interactive Graph/Locked Functions",component:re},s={args:{item:e({question:t()})}},n={args:{item:e({question:t("x^2",{color:"green",strokeStyle:"dashed"})})}},r={args:{item:e({question:t("y^2",{directionalAxis:"y"})})}},o={args:{item:e({question:oe("y/2",{directionalAxis:"y"})})}},a={args:{item:e({question:t("sin(x)",{domain:[-5,1/0]})})}},i={args:{item:e({question:t("sin(x)",{domain:[-1/0,5]})})}},c={args:{item:e({question:t("sin(x)",{domain:[-5,5]})})}},m={args:{item:e({question:t("x^2 + 2x + 3")})}},u={args:{item:e({question:t("(1/3)x^3 - 2x^2 + 3x - 4")})}},g={args:{item:e({question:t("tan(x)")})}},d={args:{item:e({question:t("arctan(x)")})}},p={args:{item:e({question:t("log(x)")})}},l={args:{item:e({question:t("e^x")})}},x={args:{item:e({question:t("abs(x)")})}};var q,h,S;s.parameters={...s.parameters,docs:{...(q=s.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentWithLockedFunction()
    })
  }
}`,...(S=(h=s.parameters)==null?void 0:h.docs)==null?void 0:S.source}}};var y,I,F;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentWithLockedFunction("x^2", {
        color: "green",
        strokeStyle: "dashed"
      })
    })
  }
}`,...(F=(I=n.parameters)==null?void 0:I.docs)==null?void 0:F.source}}};var L,k,T;r.parameters={...r.parameters,docs:{...(L=r.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentWithLockedFunction("y^2", {
        directionalAxis: "y"
      })
    })
  }
}`,...(T=(k=r.parameters)==null?void 0:k.docs)==null?void 0:T.source}}};var P,W,f;o.parameters={...o.parameters,docs:{...(P=o.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentWithLockedFunctionAndAsymmetricRange("y/2", {
        directionalAxis: "y"
      })
    })
  }
}`,...(f=(W=o.parameters)==null?void 0:W.docs)==null?void 0:f.source}}};var A,R,D;a.parameters={...a.parameters,docs:{...(A=a.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentWithLockedFunction("sin(x)", {
        domain: [-5, Infinity]
      })
    })
  }
}`,...(D=(R=a.parameters)==null?void 0:R.docs)==null?void 0:D.source}}};var b,M,O;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentWithLockedFunction("sin(x)", {
        domain: [-Infinity, 5]
      })
    })
  }
}`,...(O=(M=i.parameters)==null?void 0:M.docs)==null?void 0:O.source}}};var Y,E,v;c.parameters={...c.parameters,docs:{...(Y=c.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentWithLockedFunction("sin(x)", {
        domain: [-5, 5]
      })
    })
  }
}`,...(v=(E=c.parameters)==null?void 0:E.docs)==null?void 0:v.source}}};var B,C,Q;m.parameters={...m.parameters,docs:{...(B=m.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentWithLockedFunction("x^2 + 2x + 3")
    })
  }
}`,...(Q=(C=m.parameters)==null?void 0:C.docs)==null?void 0:Q.source}}};var V,_,G;u.parameters={...u.parameters,docs:{...(V=u.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentWithLockedFunction("(1/3)x^3 - 2x^2 + 3x - 4")
    })
  }
}`,...(G=(_=u.parameters)==null?void 0:_.docs)==null?void 0:G.source}}};var U,j,w;g.parameters={...g.parameters,docs:{...(U=g.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentWithLockedFunction("tan(x)")
    })
  }
}`,...(w=(j=g.parameters)==null?void 0:j.docs)==null?void 0:w.source}}};var z,H,J;d.parameters={...d.parameters,docs:{...(z=d.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentWithLockedFunction("arctan(x)")
    })
  }
}`,...(J=(H=d.parameters)==null?void 0:H.docs)==null?void 0:J.source}}};var K,N,X;p.parameters={...p.parameters,docs:{...(K=p.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentWithLockedFunction("log(x)")
    })
  }
}`,...(X=(N=p.parameters)==null?void 0:N.docs)==null?void 0:X.source}}};var Z,$,ee;l.parameters={...l.parameters,docs:{...(Z=l.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentWithLockedFunction("e^x")
    })
  }
}`,...(ee=($=l.parameters)==null?void 0:$.docs)==null?void 0:ee.source}}};var te,se,ne;x.parameters={...x.parameters,docs:{...(te=x.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentWithLockedFunction("abs(x)")
    })
  }
}`,...(ne=(se=x.parameters)==null?void 0:se.docs)==null?void 0:ne.source}}};const qe=["DefaultSettings","StyledSettings","FunctionOfY","FunctionOfYAsymmetricRange","DomainRestrictedMin","DomainRestrictedMax","DomainRestrictedBoth","Quadratic","CubicPolynomial","Tangent","ArcTangent","Logarithmic","Exponent","AbsoluteValue"];export{x as AbsoluteValue,d as ArcTangent,u as CubicPolynomial,s as DefaultSettings,c as DomainRestrictedBoth,i as DomainRestrictedMax,a as DomainRestrictedMin,l as Exponent,r as FunctionOfY,o as FunctionOfYAsymmetricRange,p as Logarithmic,m as Quadratic,n as StyledSettings,g as Tangent,qe as __namedExportsOrder,xe as default};
