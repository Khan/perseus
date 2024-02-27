import{j as r,a as p,F as f}from"./jsx-runtime-BGVbfQ2Z.js";import{Z as m}from"./zoomable-tex-LJgLrbXQ.js";import"./index-qhcEwEpg.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./asset-context-pmjKTqqL.js";import"./tex-SwZEYYPF.js";import"./dependencies-fnqF3NiV.js";import"./zoomable-QW77xrsT.js";import"./index-E09jvG0x.js";const T={title:"Perseus/Components/Zoomable Tex"},d=({children:o})=>p(f,{children:[r("h1",{children:"Click on equation to zoom/unzoom"}),r("div",{style:{width:"50px"},children:o})]}),e=o=>r(d,{children:r(m,{children:"\\sum_{i=1}^\\infty\\frac{1}{n^2} =\\frac{\\pi^2}{6}"})}),a=o=>p(d,{children:[" ",r(m,{children:"\\begin{aligned}h\\blueE{v_1} \\left(\\dfrac{\\partial f}{\\partial x}(x_0, y_0) \\right) + h\\greenE{v_2}\\left( \\dfrac{\\partial f}{\\partial y}(x_0 \\redD{+ h\\blueE{v_1}}, y_0)\\right)\\end{aligned}"})]});var t,i,n;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <ForceZoomWrapper>
            <ZoomableTex children="\\sum_{i=1}^\\infty\\frac{1}{n^2} =\\frac{\\pi^2}{6}" />
        </ForceZoomWrapper>;
}`,...(n=(i=e.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};var s,c,l;a.parameters={...a.parameters,docs:{...(s=a.parameters)==null?void 0:s.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <ForceZoomWrapper>
            {" "}
            <ZoomableTex children="\\begin{aligned}h\\blueE{v_1} \\left(\\dfrac{\\partial f}{\\partial x}(x_0, y_0) \\right) + h\\greenE{v_2}\\left( \\dfrac{\\partial f}{\\partial y}(x_0 \\redD{+ h\\blueE{v_1}}, y_0)\\right)\\end{aligned}" />
        </ForceZoomWrapper>;
}`,...(l=(c=a.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const v=["KaTeX","ComplexKaTeX"];export{a as ComplexKaTeX,e as KaTeX,v as __namedExportsOrder,T as default};
