import{r as h,j as e,aR as s}from"./iframe-weGPgbT4.js";import{I as n}from"./choice-indicator.new-U3ipMNKG.js";import"./minus-circle-bold-jRcNnagP.js";const d=t=>e.jsx("div",{style:{padding:"10px",display:"flex",flexDirection:"column",gap:"10px",marginBlockEnd:"25px"},children:t.children}),l={title:"Widgets/Radio/Widget Internal Components/Indicator",tags:["!dev"]},c=()=>{const t=h.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsxs(d,{children:[e.jsx(s,{tag:"h2",children:"Single Select"}),e.jsxs("div",{children:[e.jsx(n,{buttonRef:t,checked:!1,shape:"circle",content:"A",updateChecked:()=>{}})," Selectable"]}),e.jsxs("div",{children:[e.jsx(n,{buttonRef:t,checked:!0,shape:"circle",content:"A",updateChecked:()=>{}})," Checked/Selected"]}),e.jsxs("div",{children:[e.jsx(n,{buttonRef:t,checked:!1,shape:"circle",content:"A",showCorrectness:"correct",updateChecked:()=>{}})," Is correct & Not Checked"]}),e.jsxs("div",{children:[e.jsx(n,{buttonRef:t,checked:!0,shape:"circle",content:"A",showCorrectness:"correct",updateChecked:()=>{}})," Is correct & Checked"]}),e.jsxs("div",{children:[e.jsx(n,{buttonRef:t,checked:!0,shape:"circle",content:"A",showCorrectness:"wrong",updateChecked:()=>{}})," Is wrong & Checked"]}),e.jsxs("div",{children:[e.jsx(n,{buttonRef:t,checked:!1,shape:"circle",content:"A",showCorrectness:"wrong",updateChecked:()=>{}})," Is wrong & Not Checked"]})]}),e.jsxs(d,{children:[e.jsx(s,{tag:"h2",children:"Multiple Select"}),e.jsxs("div",{children:[e.jsx(n,{buttonRef:t,checked:!1,shape:"square",content:"A",updateChecked:()=>{}})," Selectable"]}),e.jsxs("div",{children:[e.jsx(n,{buttonRef:t,checked:!0,shape:"square",content:"A",updateChecked:()=>{}})," Checked/Selected"]}),e.jsxs("div",{children:[e.jsx(n,{buttonRef:t,checked:!1,shape:"square",content:"A",showCorrectness:"correct",updateChecked:()=>{}})," Is correct & Not Checked"]}),e.jsxs("div",{children:[e.jsx(n,{buttonRef:t,checked:!0,shape:"square",content:"A",showCorrectness:"correct",updateChecked:()=>{}})," Is correct & Checked"]}),e.jsxs("div",{children:[e.jsx(n,{buttonRef:t,checked:!0,shape:"square",content:"A",showCorrectness:"wrong",updateChecked:()=>{}})," Is wrong & Checked"]}),e.jsxs("div",{children:[e.jsx(n,{buttonRef:t,checked:!1,shape:"square",content:"A",showCorrectness:"wrong",updateChecked:()=>{}})," Is wrong & Not Checked"]})]})]})};c.__docgenInfo={description:"",methods:[],displayName:"AllSettings"};var r,o,a;c.parameters={...c.parameters,docs:{...(r=c.parameters)==null?void 0:r.docs,source:{originalSource:`(): React.ReactElement => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  return <>
            <Container>
                <HeadingMedium tag="h2">Single Select</HeadingMedium>
                <div>
                    <Indicator buttonRef={buttonRef} checked={false} shape="circle" content="A" updateChecked={() => {}} />
                    &nbsp;Selectable
                </div>
                <div>
                    <Indicator buttonRef={buttonRef} checked={true} shape="circle" content="A" updateChecked={() => {}} />
                    &nbsp;Checked/Selected
                </div>
                <div>
                    <Indicator buttonRef={buttonRef} checked={false} shape="circle" content="A" showCorrectness="correct" updateChecked={() => {}} />
                    &nbsp;Is correct &amp; Not Checked
                </div>
                <div>
                    <Indicator buttonRef={buttonRef} checked={true} shape="circle" content="A" showCorrectness="correct" updateChecked={() => {}} />
                    &nbsp;Is correct &amp; Checked
                </div>
                <div>
                    <Indicator buttonRef={buttonRef} checked={true} shape="circle" content="A" showCorrectness="wrong" updateChecked={() => {}} />
                    &nbsp;Is wrong &amp; Checked
                </div>
                <div>
                    <Indicator buttonRef={buttonRef} checked={false} shape="circle" content="A" showCorrectness="wrong" updateChecked={() => {}} />
                    &nbsp;Is wrong &amp; Not Checked
                </div>
            </Container>
            <Container>
                <HeadingMedium tag="h2">Multiple Select</HeadingMedium>
                <div>
                    <Indicator buttonRef={buttonRef} checked={false} shape="square" content="A" updateChecked={() => {}} />
                    &nbsp;Selectable
                </div>
                <div>
                    <Indicator buttonRef={buttonRef} checked={true} shape="square" content="A" updateChecked={() => {}} />
                    &nbsp;Checked/Selected
                </div>
                <div>
                    <Indicator buttonRef={buttonRef} checked={false} shape="square" content="A" showCorrectness="correct" updateChecked={() => {}} />
                    &nbsp;Is correct &amp; Not Checked
                </div>
                <div>
                    <Indicator buttonRef={buttonRef} checked={true} shape="square" content="A" showCorrectness="correct" updateChecked={() => {}} />
                    &nbsp;Is correct &amp; Checked
                </div>
                <div>
                    <Indicator buttonRef={buttonRef} checked={true} shape="square" content="A" showCorrectness="wrong" updateChecked={() => {}} />
                    &nbsp;Is wrong &amp; Checked
                </div>
                <div>
                    <Indicator buttonRef={buttonRef} checked={false} shape="square" content="A" showCorrectness="wrong" updateChecked={() => {}} />
                    &nbsp;Is wrong &amp; Not Checked
                </div>
            </Container>
        </>;
}`,...(a=(o=c.parameters)==null?void 0:o.docs)==null?void 0:a.source}}};const k=["AllSettings"];export{c as AllSettings,k as __namedExportsOrder,l as default};
