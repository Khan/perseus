import{r as m,j as e}from"./iframe-Bn4eIUvs.js";import{I as p}from"./choice-indicator.new-X7hqlhHp.js";import"./minus-circle-bold-jRcNnagP.js";const S="_choice_1q2g4_1",g="_is-correct_1q2g4_33",k="_is-wrong_1q2g4_33",o={choice:S,"is-correct":"_is-correct_1q2g4_33",isCorrect:g,"is-wrong":"_is-wrong_1q2g4_33",isWrong:k},c=t=>{const i=t.showCorrectness,r=m.useRef(null),h=t.isMultiSelect?"square":"circle",C=i?void 0:()=>{var a;(a=r.current)==null||a.click()},u=[o.choice].concat(i?[o["is-"+i]]:[]).join(" ");return e.jsxs("li",{className:u,onClick:C,children:[e.jsx(p,{buttonRef:r,checked:t.checked,content:t.indicatorContent,shape:h,showCorrectness:i,updateChecked:t.updateChecked}),t.children]})};c.__docgenInfo={description:"",methods:[],displayName:"Choice",props:{checked:{required:!0,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"union",raw:"React.ReactNode | React.ReactNode[]",elements:[{name:"ReactReactNode",raw:"React.ReactNode"},{name:"Array",elements:[{name:"ReactReactNode",raw:"React.ReactNode"}],raw:"React.ReactNode[]"}]},description:""},indicatorContent:{required:!0,tsType:{name:"string"},description:""},isMultiSelect:{required:!0,tsType:{name:"boolean"},description:""},showCorrectness:{required:!1,tsType:{name:"union",raw:'"correct" | "wrong"',elements:[{name:"literal",value:'"correct"'},{name:"literal",value:'"wrong"'}]},description:""},updateChecked:{required:!0,tsType:{name:"signature",type:"function",raw:"(isChecked: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"isChecked"}],return:{name:"void"}}},description:""}}};const f=t=>e.jsx("ul",{style:{margin:"10px",width:"672px"},children:t.children}),j={title:"Widgets/RadioNew/Widget Internal Components/Choice",tags:["!dev"]},n=()=>e.jsxs(f,{children:[e.jsx(c,{checked:!1,indicatorContent:"A",isMultiSelect:!1,updateChecked:()=>{},children:"USS Sarajevo - NCC-38529"}),e.jsx(c,{checked:!1,indicatorContent:"B",isMultiSelect:!1,updateChecked:()=>{},children:"USS Yangtzee Kiang - NCC-72453 - Hijacked by Bajoran terrorist Tahna Los. Became the first DS9 runabout to be destroyed when it crashed on a moon in the Gamma Quadrant."}),e.jsx(c,{checked:!1,indicatorContent:"C",isMultiSelect:!1,updateChecked:()=>{},children:e.jsx("img",{alt:"triangle",src:"https://cdn.kastatic.org/ka-content-images/9cb2cf618c16501d01abf97036deb355d9393949.png"})}),e.jsx(c,{checked:!0,indicatorContent:"D",isMultiSelect:!1,showCorrectness:"wrong",updateChecked:()=>{},children:"ISS Enterprise - NCC-1701 (Mirror Universe)"}),e.jsx(c,{checked:!1,indicatorContent:"E",isMultiSelect:!1,updateChecked:()=>{},children:"USS Yamaguchi - NCC-26510"}),e.jsx(c,{checked:!0,indicatorContent:"F",isMultiSelect:!1,showCorrectness:"correct",updateChecked:()=>{},children:"USS Enterprise - NCC-1701"})]});n.__docgenInfo={description:"",methods:[],displayName:"SingleSelect"};var s,d,l;n.parameters={...n.parameters,docs:{...(s=n.parameters)==null?void 0:s.docs,source:{originalSource:`(): React.ReactElement => {
  return <Container>
            <Choice checked={false} indicatorContent="A" isMultiSelect={false} updateChecked={() => {}}>
                USS Sarajevo - NCC-38529
            </Choice>
            <Choice checked={false} indicatorContent="B" isMultiSelect={false} updateChecked={() => {}}>
                USS Yangtzee Kiang - NCC-72453 - Hijacked by Bajoran terrorist
                Tahna Los. Became the first DS9 runabout to be destroyed when it
                crashed on a moon in the Gamma Quadrant.
            </Choice>
            <Choice checked={false} indicatorContent="C" isMultiSelect={false} updateChecked={() => {}}>
                <img alt="triangle" src="https://cdn.kastatic.org/ka-content-images/9cb2cf618c16501d01abf97036deb355d9393949.png" />
            </Choice>
            <Choice checked={true} indicatorContent="D" isMultiSelect={false} showCorrectness="wrong" updateChecked={() => {}}>
                ISS Enterprise - NCC-1701 (Mirror Universe)
            </Choice>
            <Choice checked={false} indicatorContent="E" isMultiSelect={false} updateChecked={() => {}}>
                USS Yamaguchi - NCC-26510
            </Choice>
            <Choice checked={true} indicatorContent="F" isMultiSelect={false} showCorrectness="correct" updateChecked={() => {}}>
                USS Enterprise - NCC-1701
            </Choice>
        </Container>;
}`,...(l=(d=n.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};const R=["SingleSelect"];export{n as SingleSelect,R as __namedExportsOrder,j as default};
