import{P as x,a as k}from"./index-kzHyWCTU.js";import{s as g,c as F}from"./index-C9RM_t1w.js";import{r as e}from"./index-C6mWTJJr.js";import{m as K}from"./button-assets-CICggd4J.js";import{C as b,K as v}from"./mobile-keypad-CyWweNsY.js";import{c as E,g as M,a as p}from"./key-translator-Dv1F1EEG.js";import"./index-CskvhqFA.js";import"./no-important-DlFk8a1I.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-Xl5L4rvz.js";import"./index-CjqMeO8x.js";import"./index-r7GwIklR.js";import"./index-CfqIx-dS.js";import"./index-DN4d7MfU.js";import"./tiny-invariant-CopsF_GD.js";import"./index-CIHqsnLr.js";import"./index-CbNKSLRm.js";import"./index-3H81sEQ1.js";import"./index-B-CZbs2J.js";import"./Popper-Dy4DMz1_.js";import"./underscore-U-AHniOr.js";import"./get-decimal-separator-B2cicA45.js";import"./core-widget-registry-2tCIH_GM.js";import"./index-BzwLglMS.js";import"./assertThisInitialized-B9jnkVVz.js";import"./tabbar-B0Mnsvv7.js";import"./item-73m9Uma6.js";import"./keypad-button-DuisPKWg.js";import"./operators-page-D-ejvmyb.js";import"./navigation-pad-DoSm_5u8.js";const oe={title:"math-input/components/v2 Keypad With Mathquill"};function o(){const r=e.useRef(null),[n,u]=e.useState(),[i,s]=e.useState(!0),[h,l]=e.useState(b.NONE);e.useEffect(()=>{if(!n&&r.current){const t=E(r.current,"en",K,a=>({...a,handlers:{edit:C=>{l(p(C))}}}));u(t)}},[n]);const y=M("en",{sin:"sin",cos:"cos",tan:"tan"});function f(t){if(!n)return;t==="DISMISS"&&s(!1);const a=y[t];a?(a(n,t),l(p(n))):console.warn(`No translation to Mathquill for: ${t}`)}return e.createElement("div",{style:{maxWidth:"400px",margin:"2em"}},e.createElement(x,{content:e.createElement(k,{style:{padding:0,paddingBottom:g.xxSmall_6,maxWidth:"initial"}},e.createElement(v,{extraKeys:["x","y","PI","THETA"],onClickKey:f,cursorContext:h,advancedRelations:!0,basicRelations:!0,divisionKey:!0,logarithms:!0,convertDotToTimes:!0,preAlgebra:!0,trigonometry:!0,onAnalyticsEvent:async()=>{},showDismiss:!0})),dismissEnabled:!0,opened:i},e.createElement("div",{style:{width:"100%",marginBottom:"1em",border:`1px solid ${F.offBlack16}`},ref:r})),e.createElement("button",{onClick:()=>s(!i)},i?"close keypad":"open keypad"))}o.__docgenInfo={description:"",methods:[],displayName:"V2KeypadWithMathquill"};var d,m,c;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`function V2KeypadWithMathquill() {
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
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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
      padding: 0,
      paddingBottom: spacing.xxSmall_6,
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
}`,...(c=(m=o.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};const ae=["V2KeypadWithMathquill"];export{o as V2KeypadWithMathquill,ae as __namedExportsOrder,oe as default};
