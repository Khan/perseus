import{j as t}from"./jsx-runtime-BT65X5dW.js";import{P as k,a as g}from"./index-DMlccmQw.js";import{c as F,s as K}from"./index-BfjDPqC2.js";import{r as o}from"./index-C6mWTJJr.js";import{m as b}from"./button-assets-C9T5fNLz.js";import{C as v,K as M}from"./mobile-keypad-DvhXuqfO.js";import{c as S,g as R,a as d}from"./key-translator-qlXm3eZ0.js";import"./index-B1Gws05u.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-C0xJ1VDw.js";import"./no-important-DlFk8a1I.js";import"./index-DsTg7R03.js";import"./index-BsVzSXL3.js";import"./index-BDsoIsav.js";import"./index-BN1f3DJf.js";import"./index-BPL71wmx.js";import"./index-gdjMQqRz.js";import"./index-3H81sEQ1.js";import"./index-BWwc-H8c.js";import"./Popper-Bj3TCzZA.js";import"./get-decimal-separator-B2cicA45.js";import"./index-default-BcKQpA1a.js";import"./index-DktHmiAd.js";import"./index-BzwLglMS.js";import"./assertThisInitialized-B_E71Lmv.js";import"./index-DyG-XbLr.js";import"./tabbar-CdwZ7NtL.js";import"./item-CU19aERO.js";import"./keypad-button-CXqAcJRc.js";import"./operators-page-C3H2X4aA.js";import"./navigation-pad-i78wd4WL.js";const re={title:"math-input/components/v2 Keypad With Mathquill"};function a(){const i=o.useRef(null),[n,h]=o.useState(),[s,l]=o.useState(!0),[y,p]=o.useState(v.NONE);o.useEffect(()=>{if(!n&&i.current){const e=S(i.current,"en",b,r=>({...r,handlers:{edit:C=>{p(d(C))}}}));h(e)}},[n]);const f=R("en",{sin:"sin",cos:"cos",tan:"tan"});function x(e){if(!n)return;e==="DISMISS"&&l(!1);const r=f[e];r?(r(n,e),p(d(n))):console.warn(`No translation to Mathquill for: ${e}`)}return t.jsxs("div",{style:{maxWidth:"400px",margin:"2em"},children:[t.jsx(k,{content:t.jsx(g,{style:{padding:0,paddingBottom:K.xxSmall_6,maxWidth:"initial"},children:t.jsx(M,{extraKeys:["x","y","PI","THETA"],onClickKey:x,cursorContext:y,advancedRelations:!0,basicRelations:!0,divisionKey:!0,logarithms:!0,convertDotToTimes:!0,preAlgebra:!0,trigonometry:!0,onAnalyticsEvent:async()=>{},showDismiss:!0})}),dismissEnabled:!0,opened:s,children:t.jsx("div",{style:{width:"100%",marginBottom:"1em",border:`1px solid ${F.offBlack16}`},ref:i})}),t.jsx("button",{onClick:()=>l(!s),children:s?"close keypad":"open keypad"})]})}a.__docgenInfo={description:"",methods:[],displayName:"V2KeypadWithMathquill"};var c,m,u;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`function V2KeypadWithMathquill() {
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
