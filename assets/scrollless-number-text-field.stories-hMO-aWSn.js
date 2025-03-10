import{V as c}from"./index-hw7d7wq0.js";import{L as i}from"./index-jek-Xksa.js";import{r as e}from"./index-6oxdNXpR.js";import{S as o}from"./scrollless-number-text-field-rQL1rvNx.js";import"./no-important-xCWWYXQR.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-F5uqTDBi.js";import"./index-v_a-r9JG.js";import"./index-zRqVZh6A.js";import"./index-6pF6CjBQ.js";const k={title:"PerseusEditor/Components/Scrollless Number Text Field",component:o},t=s=>e.createElement(o,{...s}),V={value:"",onChange:()=>{}};t.args=V;const r={render:function(){const[a,l]=e.useState("");return e.createElement(o,{value:a,onChange:l})}};r.parameters={chromatic:{disableSnapshot:!0}};const n={render:function(){const[a,l]=e.useState("");return e.createElement(e.Fragment,null,e.createElement(i,null,"Scroll down to see the input."),e.createElement(c,{style:{height:"100vh"}}),e.createElement(i,null,"Observe that scrolling on the input field with a mouse wheel changes the number, but does not scroll the page."),e.createElement(o,{value:a,onChange:l}),e.createElement(c,{style:{height:"100vh"}}))}};n.parameters={chromatic:{disableSnapshot:!0}};t.__docgenInfo={description:`Uncontrolled story. Interact with the control panel to see the component
reflect the props.`,methods:[],displayName:"Default"};var u,p,d,m,h;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`(args): React.ReactElement => {
  return <ScrolllessNumberTextField {...args} />;
}`,...(d=(p=t.parameters)==null?void 0:p.docs)==null?void 0:d.source},description:{story:`Uncontrolled story. Interact with the control panel to see the component
reflect the props.`,...(h=(m=t.parameters)==null?void 0:m.docs)==null?void 0:h.description}}};var g,b,f,S,w;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: function Render() {
    const [value, setValue] = React.useState("");
    return <ScrolllessNumberTextField value={value} onChange={setValue} />;
  }
}`,...(f=(b=r.parameters)==null?void 0:b.docs)==null?void 0:f.source},description:{story:`Controlled story. The text field's state is managed by its parent.
Typing in the input field should work as expected.`,...(w=(S=r.parameters)==null?void 0:S.docs)==null?void 0:w.description}}};var v,y,L,x,E;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(L=(y=n.parameters)==null?void 0:y.docs)==null?void 0:L.source},description:{story:`In this example, we can see how the input field behaves when it is placed
in a long page. Scrolling on the input field with a mouse wheel or trackpad
changes the number, but does not scroll the page.`,...(E=(x=n.parameters)==null?void 0:x.docs)==null?void 0:E.description}}};const U=["Default","Controlled","LongPageScroll"];export{r as Controlled,t as Default,n as LongPageScroll,U as __namedExportsOrder,k as default};
