import{j as e,a as F,F as R}from"./jsx-runtime-5BUNAZ9W.js";import{V as c}from"./index-e4P84RkC.js";import{L as i}from"./index-1f9rdEBk.js";import{r as C}from"./index-4g5l5LRQ.js";import{S as n}from"./scrollless-number-text-field-q7O3_W5W.js";import"./index-awljIyHI.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-ZpoNcJZi.js";import"./objectWithoutPropertiesLoose-d0rO3Elc.js";import"./minus-bold-ONmDo3Ve.js";const q={title:"PerseusEditor/Components/Scrollless Number Text Field",component:n},t=s=>e(n,{...s}),T={value:"",onChange:()=>{}};t.args=T;const r={render:function(){const[a,l]=C.useState("");return e(n,{value:a,onChange:l})}};r.parameters={chromatic:{disable:!0}};const o={render:function(){const[a,l]=C.useState("");return F(R,{children:[e(i,{children:"Scroll down to see the input."}),e(c,{style:{height:"100vh"}}),e(i,{children:"Observe that scrolling on the input field with a mouse wheel changes the number, but does not scroll the page."}),e(n,{value:a,onChange:l}),e(c,{style:{height:"100vh"}})]})}};o.parameters={chromatic:{disable:!0}};t.__docgenInfo={description:`Uncontrolled story. Interact with the control panel to see the component
reflect the props.`,methods:[],displayName:"Default"};var u,d,p,h,m;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`(args): React.ReactElement => {
  return <ScrolllessNumberTextField {...args} />;
}`,...(p=(d=t.parameters)==null?void 0:d.docs)==null?void 0:p.source},description:{story:`Uncontrolled story. Interact with the control panel to see the component
reflect the props.`,...(m=(h=t.parameters)==null?void 0:h.docs)==null?void 0:m.description}}};var g,b,f,S,w;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: function Render() {
    const [value, setValue] = React.useState("");
    return <ScrolllessNumberTextField value={value} onChange={setValue} />;
  }
}`,...(f=(b=r.parameters)==null?void 0:b.docs)==null?void 0:f.source},description:{story:`Controlled story. The text field's state is managed by its parent.
Typing in the input field should work as expected.`,...(w=(S=r.parameters)==null?void 0:S.docs)==null?void 0:w.description}}};var v,x,y,L,V;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: function Render() {
    const [value, setValue] = React.useState("");
    return <>
                <LabelLarge>Scroll down to see the input.</LabelLarge>
                <View style={{
        height: "100vh"
      }} />
                <LabelLarge>
                    Observe that scrolling on the input field with a mouse wheel
                    changes the number, but does not scroll the page.
                </LabelLarge>
                <ScrolllessNumberTextField value={value} onChange={setValue} />
                <View style={{
        height: "100vh"
      }} />
            </>;
  }
}`,...(y=(x=o.parameters)==null?void 0:x.docs)==null?void 0:y.source},description:{story:`In this example, we can see how the input field behaves when it is placed
in a long page. Scrolling on the input field with a mouse wheel or trackpad
changes the number, but does not scroll the page.`,...(V=(L=o.parameters)==null?void 0:L.docs)==null?void 0:V.description}}};const z=["Default","Controlled","LongPageScroll"];export{r as Controlled,t as Default,o as LongPageScroll,z as __namedExportsOrder,q as default};
