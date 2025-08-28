import{r as h,j as e,aT as d,aU as t}from"./iframe-BnSSG4sW.js";const c={visible:"A",screenReader:"Choice A"},r=n=>e.jsx("div",{style:{padding:"10px",display:"flex",flexDirection:"column",gap:"10px",marginBlockEnd:"25px"},children:n.children}),l={title:"Widgets/RadioNew/Widget Internal Components/Indicator",tags:["!dev"]},s=()=>{const n=h.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsxs(r,{children:[e.jsx(d,{tag:"h2",children:"Single Select"}),e.jsxs("div",{children:[e.jsx(t,{buttonRef:n,checked:!1,shape:"circle",content:c,updateChecked:()=>{}})," Selectable"]}),e.jsxs("div",{children:[e.jsx(t,{buttonRef:n,checked:!0,shape:"circle",content:c,updateChecked:()=>{}})," Checked/Selected"]}),e.jsxs("div",{children:[e.jsx(t,{buttonRef:n,checked:!1,shape:"circle",content:c,showCorrectness:"correct",updateChecked:()=>{}})," Is correct & Not Checked"]}),e.jsxs("div",{children:[e.jsx(t,{buttonRef:n,checked:!0,shape:"circle",content:c,showCorrectness:"correct",updateChecked:()=>{}})," Is correct & Checked"]}),e.jsxs("div",{children:[e.jsx(t,{buttonRef:n,checked:!0,shape:"circle",content:c,showCorrectness:"wrong",updateChecked:()=>{}})," Is wrong & Checked"]}),e.jsxs("div",{children:[e.jsx(t,{buttonRef:n,checked:!1,shape:"circle",content:c,showCorrectness:"wrong",updateChecked:()=>{}})," Is wrong & Not Checked"]})]}),e.jsxs(r,{children:[e.jsx(d,{tag:"h2",children:"Multiple Select"}),e.jsxs("div",{children:[e.jsx(t,{buttonRef:n,checked:!1,shape:"square",content:c,updateChecked:()=>{}})," Selectable"]}),e.jsxs("div",{children:[e.jsx(t,{buttonRef:n,checked:!0,shape:"square",content:c,updateChecked:()=>{}})," Checked/Selected"]}),e.jsxs("div",{children:[e.jsx(t,{buttonRef:n,checked:!1,shape:"square",content:c,showCorrectness:"correct",updateChecked:()=>{}})," Is correct & Not Checked"]}),e.jsxs("div",{children:[e.jsx(t,{buttonRef:n,checked:!0,shape:"square",content:c,showCorrectness:"correct",updateChecked:()=>{}})," Is correct & Checked"]}),e.jsxs("div",{children:[e.jsx(t,{buttonRef:n,checked:!0,shape:"square",content:c,showCorrectness:"wrong",updateChecked:()=>{}})," Is wrong & Checked"]}),e.jsxs("div",{children:[e.jsx(t,{buttonRef:n,checked:!1,shape:"square",content:c,showCorrectness:"wrong",updateChecked:()=>{}})," Is wrong & Not Checked"]})]})]})};s.__docgenInfo={description:"",methods:[],displayName:"AllSettings"};var o,a,i;s.parameters={...s.parameters,docs:{...(o=s.parameters)==null?void 0:o.docs,source:{originalSource:`(): React.ReactElement => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  return <>
            <Container>
                <HeadingMedium tag="h2">Single Select</HeadingMedium>
                <div>
                    <Indicator buttonRef={buttonRef} checked={false} shape="circle" content={indicatorContent} updateChecked={() => {}} />
                    &nbsp;Selectable
                </div>
                <div>
                    <Indicator buttonRef={buttonRef} checked={true} shape="circle" content={indicatorContent} updateChecked={() => {}} />
                    &nbsp;Checked/Selected
                </div>
                <div>
                    <Indicator buttonRef={buttonRef} checked={false} shape="circle" content={indicatorContent} showCorrectness="correct" updateChecked={() => {}} />
                    &nbsp;Is correct &amp; Not Checked
                </div>
                <div>
                    <Indicator buttonRef={buttonRef} checked={true} shape="circle" content={indicatorContent} showCorrectness="correct" updateChecked={() => {}} />
                    &nbsp;Is correct &amp; Checked
                </div>
                <div>
                    <Indicator buttonRef={buttonRef} checked={true} shape="circle" content={indicatorContent} showCorrectness="wrong" updateChecked={() => {}} />
                    &nbsp;Is wrong &amp; Checked
                </div>
                <div>
                    <Indicator buttonRef={buttonRef} checked={false} shape="circle" content={indicatorContent} showCorrectness="wrong" updateChecked={() => {}} />
                    &nbsp;Is wrong &amp; Not Checked
                </div>
            </Container>
            <Container>
                <HeadingMedium tag="h2">Multiple Select</HeadingMedium>
                <div>
                    <Indicator buttonRef={buttonRef} checked={false} shape="square" content={indicatorContent} updateChecked={() => {}} />
                    &nbsp;Selectable
                </div>
                <div>
                    <Indicator buttonRef={buttonRef} checked={true} shape="square" content={indicatorContent} updateChecked={() => {}} />
                    &nbsp;Checked/Selected
                </div>
                <div>
                    <Indicator buttonRef={buttonRef} checked={false} shape="square" content={indicatorContent} showCorrectness="correct" updateChecked={() => {}} />
                    &nbsp;Is correct &amp; Not Checked
                </div>
                <div>
                    <Indicator buttonRef={buttonRef} checked={true} shape="square" content={indicatorContent} showCorrectness="correct" updateChecked={() => {}} />
                    &nbsp;Is correct &amp; Checked
                </div>
                <div>
                    <Indicator buttonRef={buttonRef} checked={true} shape="square" content={indicatorContent} showCorrectness="wrong" updateChecked={() => {}} />
                    &nbsp;Is wrong &amp; Checked
                </div>
                <div>
                    <Indicator buttonRef={buttonRef} checked={false} shape="square" content={indicatorContent} showCorrectness="wrong" updateChecked={() => {}} />
                    &nbsp;Is wrong &amp; Not Checked
                </div>
            </Container>
        </>;
}`,...(i=(a=s.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};const p=["AllSettings"];export{s as AllSettings,p as __namedExportsOrder,l as default};
