import{a as x,j as n}from"./jsx-runtime-BGVbfQ2Z.js";import{P as k,a as F}from"./index-cRKslbtI.js";import{c as v}from"./index-fuyzzUuV.js";import{r as o}from"./index-qhcEwEpg.js";import{C as g,K}from"./index-2LjNjJpa.js";import{c as b,g as p,k as M}from"./key-translator-e7mZtIzr.js";import"./index-E09jvG0x.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-4c2J3ov1.js";import"./index-awljIyHI.js";import"./index-fdRf1OJX.js";import"./index-Fg8WJp4t.js";import"./index-uu39Elyn.js";import"./index-1P5txiDe.js";import"./index-tvtfaFq4.js";import"./index-_15Y2y0p.js";import"./index-RrkX9P05.js";import"./Popper-2p8US95Y.js";import"./tabbar-4UDQk7cN.js";import"./item-P3WrK4af.js";import"./button-assets-_Am9ApvA.js";import"./index-V35CFGao.js";import"./keypad-button-Yf_O0DZf.js";import"./operators-page-jaQPWpBb.js";import"./navigation-pad-JIlZRGXW.js";import"./index-J2t_5nK1.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";const Z={title:"math-input/components/v2 Keypad With Mathquill"};function a(){const i=o.useRef(null),[t,h]=o.useState(),[s,l]=o.useState(!0),[y,d]=o.useState(g.NONE);o.useEffect(()=>{if(!t&&i.current){const e=b(i.current,r=>({...r,handlers:{edit:C=>{d(p(C))}}}));h(e)}},[t]);function f(e){if(!t)return;e==="DISMISS"&&l(!1);const r=M[e];r?(r(t,e),d(p(t))):console.warn(`No translation to Mathquill for: ${e}`)}return x("div",{style:{maxWidth:"400px",margin:"2em"},children:[n(k,{content:n(F,{style:{padding:10,maxWidth:"initial"},children:n(K,{extraKeys:["x","y","PI","THETA"],onClickKey:f,cursorContext:y,advancedRelations:!0,basicRelations:!0,divisionKey:!0,logarithms:!0,convertDotToTimes:!0,preAlgebra:!0,trigonometry:!0,onAnalyticsEvent:async e=>{console.log("Send Event:",e)},showDismiss:!0})}),dismissEnabled:!0,opened:s,children:n("div",{style:{width:"100%",marginBottom:"1em",border:`1px solid ${v.offBlack16}`},ref:i})}),n("button",{onClick:()=>l(!s),children:s?"close keypad":"open keypad"})]})}var c,m,u;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`function V2KeypadWithMathquill() {
  const mathFieldWrapperRef = React.useRef<HTMLDivElement>(null);
  const [mathField, setMathField] = React.useState<MathFieldInterface>();
  const [keypadOpen, setKeypadOpen] = React.useState<boolean>(true);
  const [cursorContext, setCursorContext] = React.useState<(typeof CursorContext)[keyof typeof CursorContext]>(CursorContext.NONE);
  React.useEffect(() => {
    if (!mathField && mathFieldWrapperRef.current) {
      const mathFieldInstance = createMathField(mathFieldWrapperRef.current, baseConfig => ({
        ...baseConfig,
        handlers: {
          edit: (_mathField: MathFieldInterface) => {
            setCursorContext(getCursorContext(_mathField));
          }
        }
      }));
      setMathField(mathFieldInstance);
    }
  }, [mathField]);
  function handleClickKey(key: Key) {
    if (!mathField) {
      return;
    }
    if (key === "DISMISS") {
      setKeypadOpen(false);
    }
    const mathFieldCallback = keyTranslator[key];
    if (mathFieldCallback) {
      mathFieldCallback(mathField, key);
      setCursorContext(getCursorContext(mathField));
    } else {
      // eslint-disable-next-line no-console
      console.warn(\`No translation to Mathquill for: \${key}\`);
    }
  }
  return <div style={{
    maxWidth: "400px",
    margin: "2em"
  }}>
            <Popover content={<PopoverContentCore style={{
      padding: 10,
      maxWidth: "initial"
    }}>
                        <Keypad extraKeys={["x", "y", "PI", "THETA"]} onClickKey={handleClickKey} cursorContext={cursorContext} advancedRelations basicRelations divisionKey logarithms convertDotToTimes preAlgebra trigonometry onAnalyticsEvent={async event => {
        // eslint-disable-next-line no-console
        console.log("Send Event:", event);
      }} showDismiss />
                    </PopoverContentCore>} dismissEnabled opened={keypadOpen}>
                <div style={{
        width: "100%",
        marginBottom: "1em",
        border: \`1px solid \${color.offBlack16}\`
      }} ref={mathFieldWrapperRef} />
            </Popover>
            <button onClick={() => setKeypadOpen(!keypadOpen)}>
                {keypadOpen ? "close keypad" : "open keypad"}
            </button>
        </div>;
}`,...(u=(m=a.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};const ee=["V2KeypadWithMathquill"];export{a as V2KeypadWithMathquill,ee as __namedExportsOrder,Z as default};
