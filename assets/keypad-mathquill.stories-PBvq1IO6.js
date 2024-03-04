import{a as x,j as n}from"./jsx-runtime-BGVbfQ2Z.js";import{C as k}from"./index-mdqImiHB.js";import{P as F,a as v}from"./index-BH4Zx_EU.js";import{r as o}from"./index-qhcEwEpg.js";import{C as g,K}from"./index-WaOzG1Ar.js";import{c as b,g as p,k as M}from"./key-translator-gjyZqQ7K.js";import"./index-E09jvG0x.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-eZ2N530f.js";import"./index-awljIyHI.js";import"./index-ObSi-eBV.js";import"./Popper-FSPFYGkT.js";import"./index-SM3muJE2.js";import"./index-ouXaYoW-.js";import"./index-uu39Elyn.js";import"./index-FNX3GwpG.js";import"./index-tvtfaFq4.js";import"./index-K7FSCCGN.js";import"./tabbar-mLybaP46.js";import"./item-q5VEoFtv.js";import"./button-assets-K2ZoY3Yc.js";import"./index-V35CFGao.js";import"./keypad-button-rYY5VIp2.js";import"./operators-page-pgHIcrjU.js";import"./navigation-pad-nnktsHUY.js";import"./index-sjmtTzi4.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";const Z={title:"math-input/components/v2 Keypad With Mathquill"};function a(){const i=o.useRef(null),[t,h]=o.useState(),[s,l]=o.useState(!0),[y,d]=o.useState(g.NONE);o.useEffect(()=>{if(!t&&i.current){const e=b(i.current,r=>({...r,handlers:{edit:f=>{d(p(f))}}}));h(e)}},[t]);function C(e){if(!t)return;e==="DISMISS"&&l(!1);const r=M[e];r?(r(t,e),d(p(t))):console.warn(`No translation to Mathquill for: ${e}`)}return x("div",{style:{maxWidth:"400px",margin:"2em"},children:[n(F,{content:n(v,{style:{padding:10,maxWidth:"initial"},children:n(K,{extraKeys:["x","y","PI","THETA"],onClickKey:C,cursorContext:y,advancedRelations:!0,basicRelations:!0,divisionKey:!0,logarithms:!0,convertDotToTimes:!0,preAlgebra:!0,trigonometry:!0,onAnalyticsEvent:async e=>{console.log("Send Event:",e)},showDismiss:!0})}),dismissEnabled:!0,opened:s,children:n("div",{style:{width:"100%",marginBottom:"1em",border:`1px solid ${k.offBlack16}`},ref:i})}),n("button",{onClick:()=>l(!s),children:s?"close keypad":"open keypad"})]})}var c,m,u;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`function V2KeypadWithMathquill() {
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
        border: \`1px solid \${Color.offBlack16}\`
      }} ref={mathFieldWrapperRef} />
            </Popover>
            <button onClick={() => setKeypadOpen(!keypadOpen)}>
                {keypadOpen ? "close keypad" : "open keypad"}
            </button>
        </div>;
}`,...(u=(m=a.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};const ee=["V2KeypadWithMathquill"];export{a as V2KeypadWithMathquill,ee as __namedExportsOrder,Z as default};
