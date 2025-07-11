import{r as k,j as e,a3 as g,ct as b,dq as i}from"./iframe-Cm8NUS_Y.js";const v=""+new URL("minus-circle-bold-jzm4v3NL.svg",import.meta.url).href,x="_base_1tekw_1",I="_is-correct_1tekw_33",R="_is-wrong_1tekw_33",_="_icon_1tekw_52",j="_circle-shape_1tekw_110",A="_square-shape_1tekw_125",o={base:x,"is-correct":"_is-correct_1tekw_33",isCorrect:I,"is-wrong":"_is-wrong_1tekw_33",isWrong:R,icon:_,"circle-shape":"_circle-shape_1tekw_110",circleShape:j,"square-shape":"_square-shape_1tekw_125",squareShape:A},n=t=>{const c=t.showCorrectness,[s,C]=k.useState(t.checked),d=s&&c==="correct"?b:s&&c==="wrong"?v:void 0,m=d?e.jsx(g,{"aria-hidden":!0,className:o.icon,icon:d,role:"img"}):void 0,a=[o.base,o[t.shape+"-shape"]];c&&a.push(o["is-"+c]);const w=c?void 0:f=>{f.stopPropagation(),C(!s),t.updateChecked(!s)};return e.jsxs("button",{"aria-pressed":s,className:a.join(" "),ref:t.buttonRef,onClick:w,children:[m,t.content]})};n.__docgenInfo={description:"",methods:[],displayName:"Indicator",props:{buttonRef:{required:!0,tsType:{name:"ReactRef",raw:"React.Ref<HTMLButtonElement>",elements:[{name:"HTMLButtonElement"}]},description:""},checked:{required:!0,tsType:{name:"boolean"},description:""},content:{required:!0,tsType:{name:"string"},description:""},shape:{required:!0,tsType:{name:"union",raw:'"circle" | "square"',elements:[{name:"literal",value:'"circle"'},{name:"literal",value:'"square"'}]},description:""},showCorrectness:{required:!1,tsType:{name:"union",raw:'"correct" | "wrong"',elements:[{name:"literal",value:'"correct"'},{name:"literal",value:'"wrong"'}]},description:""},updateChecked:{required:!0,tsType:{name:"signature",type:"function",raw:"(isChecked: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"isChecked"}],return:{name:"void"}}},description:""}}};const h=t=>e.jsx("div",{style:{padding:"10px",display:"flex",flexDirection:"column",gap:"10px",marginBlockEnd:"25px"},children:t.children}),S={title:"Perseus/Widgets/Radio/Widget Internal Components/Indicator"},r=()=>{const t=k.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsxs(h,{children:[e.jsx(i,{tag:"h2",children:"Single Select"}),e.jsxs("div",{children:[e.jsx(n,{buttonRef:t,checked:!1,shape:"circle",content:"A",updateChecked:()=>{}})," Selectable"]}),e.jsxs("div",{children:[e.jsx(n,{buttonRef:t,checked:!0,shape:"circle",content:"A",updateChecked:()=>{}})," Checked/Selected"]}),e.jsxs("div",{children:[e.jsx(n,{buttonRef:t,checked:!1,shape:"circle",content:"A",showCorrectness:"correct",updateChecked:()=>{}})," Is correct & Not Checked"]}),e.jsxs("div",{children:[e.jsx(n,{buttonRef:t,checked:!0,shape:"circle",content:"A",showCorrectness:"correct",updateChecked:()=>{}})," Is correct & Checked"]}),e.jsxs("div",{children:[e.jsx(n,{buttonRef:t,checked:!0,shape:"circle",content:"A",showCorrectness:"wrong",updateChecked:()=>{}})," Is wrong & Checked"]}),e.jsxs("div",{children:[e.jsx(n,{buttonRef:t,checked:!1,shape:"circle",content:"A",showCorrectness:"wrong",updateChecked:()=>{}})," Is wrong & Not Checked"]})]}),e.jsxs(h,{children:[e.jsx(i,{tag:"h2",children:"Multiple Select"}),e.jsxs("div",{children:[e.jsx(n,{buttonRef:t,checked:!1,shape:"square",content:"A",updateChecked:()=>{}})," Selectable"]}),e.jsxs("div",{children:[e.jsx(n,{buttonRef:t,checked:!0,shape:"square",content:"A",updateChecked:()=>{}})," Checked/Selected"]}),e.jsxs("div",{children:[e.jsx(n,{buttonRef:t,checked:!1,shape:"square",content:"A",showCorrectness:"correct",updateChecked:()=>{}})," Is correct & Not Checked"]}),e.jsxs("div",{children:[e.jsx(n,{buttonRef:t,checked:!0,shape:"square",content:"A",showCorrectness:"correct",updateChecked:()=>{}})," Is correct & Checked"]}),e.jsxs("div",{children:[e.jsx(n,{buttonRef:t,checked:!0,shape:"square",content:"A",showCorrectness:"wrong",updateChecked:()=>{}})," Is wrong & Checked"]}),e.jsxs("div",{children:[e.jsx(n,{buttonRef:t,checked:!1,shape:"square",content:"A",showCorrectness:"wrong",updateChecked:()=>{}})," Is wrong & Not Checked"]})]})]})};r.__docgenInfo={description:"",methods:[],displayName:"AllSettings"};var u,l,p;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`(): React.ReactElement => {
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
}`,...(p=(l=r.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};const y=["AllSettings"];export{r as AllSettings,y as __namedExportsOrder,S as default};
