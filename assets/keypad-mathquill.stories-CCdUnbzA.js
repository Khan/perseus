import{j as t}from"./jsx-runtime-BT65X5dW.js";import{P as k,a as g}from"./index-CCUx4bp6.js";import{c as F,s as K}from"./index-C9RM_t1w.js";import{r as o}from"./index-C6mWTJJr.js";import{m as b}from"./button-assets-qUGjw7KS.js";import{C as v,K as M}from"./mobile-keypad-DFoeLE4Y.js";import{c as S,g as R,a as d}from"./key-translator-CtlI53Cl.js";import"./index-CskvhqFA.js";import"./no-important-DlFk8a1I.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-B1Gws05u.js";import"./index-LbDnW-cL.js";import"./index-gKND8Itv.js";import"./index-CfqIx-dS.js";import"./index-DN4d7MfU.js";import"./tiny-invariant-CopsF_GD.js";import"./index-CIHqsnLr.js";import"./index-CbNKSLRm.js";import"./index-3H81sEQ1.js";import"./index-B-CZbs2J.js";import"./Popper-Bj3TCzZA.js";import"./underscore-U-AHniOr.js";import"./get-decimal-separator-B2cicA45.js";import"./core-widget-registry-2eRuEUfZ.js";import"./index-BzwLglMS.js";import"./assertThisInitialized-B9jnkVVz.js";import"./tabbar-BmTZy4vx.js";import"./item-DEo0REHz.js";import"./keypad-button-D1iDSTcu.js";import"./operators-page-C0OAgvtK.js";import"./navigation-pad-Bc2f4g4G.js";const re={title:"math-input/components/v2 Keypad With Mathquill"};function a(){const i=o.useRef(null),[n,h]=o.useState(),[s,l]=o.useState(!0),[y,p]=o.useState(v.NONE);o.useEffect(()=>{if(!n&&i.current){const e=S(i.current,"en",b,r=>({...r,handlers:{edit:C=>{p(d(C))}}}));h(e)}},[n]);const f=R("en",{sin:"sin",cos:"cos",tan:"tan"});function x(e){if(!n)return;e==="DISMISS"&&l(!1);const r=f[e];r?(r(n,e),p(d(n))):console.warn(`No translation to Mathquill for: ${e}`)}return t.jsxs("div",{style:{maxWidth:"400px",margin:"2em"},children:[t.jsx(k,{content:t.jsx(g,{style:{padding:0,paddingBottom:K.xxSmall_6,maxWidth:"initial"},children:t.jsx(M,{extraKeys:["x","y","PI","THETA"],onClickKey:x,cursorContext:y,advancedRelations:!0,basicRelations:!0,divisionKey:!0,logarithms:!0,convertDotToTimes:!0,preAlgebra:!0,trigonometry:!0,onAnalyticsEvent:async()=>{},showDismiss:!0})}),dismissEnabled:!0,opened:s,children:t.jsx("div",{style:{width:"100%",marginBottom:"1em",border:`1px solid ${F.offBlack16}`},ref:i})}),t.jsx("button",{onClick:()=>l(!s),children:s?"close keypad":"open keypad"})]})}a.__docgenInfo={description:"",methods:[],displayName:"V2KeypadWithMathquill"};var c,m,u;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`function V2KeypadWithMathquill() {
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
}`,...(u=(m=a.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};const ie=["V2KeypadWithMathquill"];export{a as V2KeypadWithMathquill,ie as __namedExportsOrder,re as default};
