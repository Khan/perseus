import{P as x,a as k}from"./index-yKRLgHQQ.js";import{c as F}from"./index-zRqVZh6A.js";import{r as e}from"./index-6oxdNXpR.js";import{m as g}from"./button-assets-L8ov_9cF.js";import{C as K,K as v}from"./mobile-keypad-93uTT56G.js";import{c as b,g as p,a as E}from"./key-translator-cGhRJTC6.js";import"./index-hw7d7wq0.js";import"./no-important-xCWWYXQR.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-9gkyvru-.js";import"./index-X6BFiFsH.js";import"./index-sTgrFwmj.js";import"./index-Y1DiWZsM.js";import"./index-OMSOgf8r.js";import"./tiny-invariant-bHgPayXn.js";import"./index-6pF6CjBQ.js";import"./index-jek-Xksa.js";import"./index-OQMtW1Q1.js";import"./index-v_a-r9JG.js";import"./Popper-Y5KDXl-P.js";import"./underscore-885MUNGo.js";import"./get-decimal-separator-C5N_K9o2.js";import"./core-widget-registry-lKD0wS3Q.js";import"./index-J2t_5nK1.js";import"./assertThisInitialized-4q6YPdh3.js";import"./tabbar-B0kYgJj9.js";import"./item-Ztp2GOp4.js";import"./keypad-button-SQB6sX9u.js";import"./operators-page-LLpnvJeI.js";import"./navigation-pad-mlqM3fWh.js";const ne={title:"math-input/components/v2 Keypad With Mathquill"};function o(){const r=e.useRef(null),[n,u]=e.useState(),[i,s]=e.useState(!0),[h,l]=e.useState(K.NONE);e.useEffect(()=>{if(!n&&r.current){const t=b(r.current,"en",g,a=>({...a,handlers:{edit:C=>{l(p(C))}}}));u(t)}},[n]);const y=E("en",{sin:"sin",cos:"cos",tan:"tan"});function f(t){if(!n)return;t==="DISMISS"&&s(!1);const a=y[t];a?(a(n,t),l(p(n))):console.warn(`No translation to Mathquill for: ${t}`)}return e.createElement("div",{style:{maxWidth:"400px",margin:"2em"}},e.createElement(x,{content:e.createElement(k,{style:{padding:10,maxWidth:"initial"}},e.createElement(v,{extraKeys:["x","y","PI","THETA"],onClickKey:f,cursorContext:h,advancedRelations:!0,basicRelations:!0,divisionKey:!0,logarithms:!0,convertDotToTimes:!0,preAlgebra:!0,trigonometry:!0,onAnalyticsEvent:async()=>{},showDismiss:!0})),dismissEnabled:!0,opened:i},e.createElement("div",{style:{width:"100%",marginBottom:"1em",border:`1px solid ${F.offBlack16}`},ref:r})),e.createElement("button",{onClick:()=>s(!i)},i?"close keypad":"open keypad"))}o.__docgenInfo={description:"",methods:[],displayName:"V2KeypadWithMathquill"};var d,m,c;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`function V2KeypadWithMathquill() {
  const mathFieldWrapperRef = React.useRef<HTMLDivElement>(null);
  const [mathField, setMathField] = React.useState<MathFieldInterface>();
  const [keypadOpen, setKeypadOpen] = React.useState<boolean>(true);
  const [cursorContext, setCursorContext] = React.useState<(typeof CursorContext)[keyof typeof CursorContext]>(CursorContext.NONE);
  React.useEffect(() => {
    if (!mathField && mathFieldWrapperRef.current) {
      const mathFieldInstance = createMathField(mathFieldWrapperRef.current, "en", mockStrings,
      // TODO(LEMS-2656): remove TS suppression
      // @ts-expect-error: Type 'EditableMathQuill' is not assignable to type 'MathFieldInterface'.
      baseConfig => ({
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
  const keyTranslator = getKeyTranslator("en", {
    sin: "sin",
    cos: "cos",
    tan: "tan"
  });
  function handleClickKey(key: KeypadKey) {
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
                        <Keypad extraKeys={["x", "y", "PI", "THETA"]} onClickKey={handleClickKey} cursorContext={cursorContext} advancedRelations basicRelations divisionKey logarithms convertDotToTimes preAlgebra trigonometry onAnalyticsEvent={async () => {}} showDismiss />
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
}`,...(c=(m=o.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};const oe=["V2KeypadWithMathquill"];export{o as V2KeypadWithMathquill,oe as __namedExportsOrder,ne as default};
