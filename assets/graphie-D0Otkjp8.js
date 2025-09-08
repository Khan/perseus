import{bm as x,F as w,j as e,V as j,s as S,bB as A}from"./iframe-DQKhkWRL.js";import{useMDXComponents as b}from"./index-CpD8rcdb.js";import{M as v,f as i,h as y}from"./blocks-DYycK1_1.js";import{S as C}from"./server-item-renderer-with-debug-ui-B5OeH1DK.js";const G={answerArea:x(),hints:[],question:{content:"[[☃ image 1]]",images:{},widgets:{"image 1":{alignment:"block",graded:!0,options:{alt:"This chart presents a pie graph divided into 2 sectors: 28 percent are unsuccessful and 72 percent are successful.",backgroundImage:{height:210,url:"web+graphie://cdn.kastatic.org/ka-perseus-graphie/7c0a5afb8670fad738df800ffe16c5e516b48777",width:210},box:[210,210],caption:"Source: NASA “Current and Past Missions”",labels:[],range:[[0,10],[0,10]],static:!1,title:"Percentage of Successful Cometary Missions (1978-2014)"},static:!1,type:"image",version:{major:0,minor:0}}}}},n=200,_={title:"Components/Graphie",component:w,parameters:{docs:{page:f}}},a={args:{box:[n,n],setup:()=>{},setDrawingAreaAvailable:()=>{}},render:t=>e.jsx(C,{item:G})},s={args:{box:[n,n],setup:()=>{},setDrawingAreaAvailable:()=>{}}};var c,d,p,l,h;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    box: [size, size],
    setup: () => {},
    setDrawingAreaAvailable: () => {}
  },
  render: args => <ServerItemRendererWithDebugUI item={itemWithPieChart} />
}`,...(p=(d=a.parameters)==null?void 0:d.docs)==null?void 0:p.source},description:{story:"A demonstration of a Graphie rendered using the Perseus `Renderer` complete\nwith overlaid labels and an image caption below.",...(h=(l=a.parameters)==null?void 0:l.docs)==null?void 0:h.description}}};var m,u,g;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    box: [size, size],
    setup: () => {},
    setDrawingAreaAvailable: () => {}
  }
}`,...(g=(u=s.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};const z=["PieChartGraphieLabels","SquareBoxSizeAndOtherwiseEmpty"],P=Object.freeze(Object.defineProperty({__proto__:null,PieChartGraphieLabels:a,SquareBoxSizeAndOtherwiseEmpty:s,__namedExportsOrder:z,default:_},Symbol.toStringTag,{value:"Module"}));function o(t){const r={code:"code",h1:"h1",h3:"h3",p:"p",...b(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(v,{of:P}),`
`,e.jsx(r.h1,{id:"graphie",children:"Graphie"}),`
`,e.jsx(j,{style:{marginBlock:S.medium_16},children:e.jsx(A,{kind:"warning",layout:"full-width",text:`Graphie usage for graphing is deprecated at Khan Academy. For new graphs, please use the interactive-graph
widget instead (see Widgets/Interactive Graph docs). For translated illustrations with labels, use the Graphie 2000 editor.`})}),`
`,e.jsx(r.h3,{id:"pie-chart-graphie-labels",children:"Pie Chart Graphie Labels"}),`
`,e.jsx("p",{children:e.jsxs(r.p,{children:["A demonstration of a Graphie rendered using the Perseus ",e.jsx(r.code,{children:"Renderer"}),` complete
with overlaid labels and an image caption below.`]})}),`
`,e.jsx(i,{of:a}),`
`,e.jsx(y,{of:a}),`
`,e.jsx(r.h3,{id:"square-box-size-and-otherwise-empty",children:"Square Box Size and Otherwise Empty"}),`
`,e.jsx(i,{of:s})]})}function f(t={}){const{wrapper:r}={...b(),...t.components};return r?e.jsx(r,{...t,children:e.jsx(o,{...t})}):o(t)}const B=Object.freeze(Object.defineProperty({__proto__:null,default:f},Symbol.toStringTag,{value:"Module"}));export{P as G,B as g};
