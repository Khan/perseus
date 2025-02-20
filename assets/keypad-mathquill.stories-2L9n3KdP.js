import{P as x,a as k}from"./index-Z0DV6Rs4.js";import{c as F}from"./index-QHkT31Yt.js";import{r as e}from"./index-6oxdNXpR.js";import{m as g}from"./button-assets-EM7_DRcB.js";import{C as K,K as v}from"./mobile-keypad-Aug0c_8m.js";import{c as b,g as p,a as E}from"./key-translator-Jsz9R8wR.js";import"./index-iTGWTR8W.js";import"./no-important-xCWWYXQR.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-9gkyvru-.js";import"./index-oZ7IFo8m.js";import"./index-NdzxJoEP.js";import"./index-DQI2fDhH.js";import"./index-k8usAFZT.js";import"./tiny-invariant-bHgPayXn.js";import"./index-xxLWRBZ2.js";import"./index-OUR0CuKj.js";import"./index-OQMtW1Q1.js";import"./index-86cQASob.js";import"./Popper-Y5KDXl-P.js";import"./underscore-885MUNGo.js";import"./get-decimal-separator-c07pHhM9.js";import"./random-util-taBURWXy.js";import"./index-J2t_5nK1.js";import"./assertThisInitialized-4q6YPdh3.js";import"./tabbar-zpu-45Sc.js";import"./item-Q2jDffTR.js";import"./keypad-button-2XNiOZPV.js";import"./operators-page-Mdb6mtEZ.js";import"./navigation-pad-hurLKoEP.js";const ne={title:"math-input/components/v2 Keypad With Mathquill"};function o(){const r=e.useRef(null),[n,u]=e.useState(),[i,s]=e.useState(!0),[h,l]=e.useState(K.NONE);e.useEffect(()=>{if(!n&&r.current){const t=b(r.current,"en",g,a=>({...a,handlers:{edit:C=>{l(p(C))}}}));u(t)}},[n]);const y=E("en",{sin:"sin",cos:"cos",tan:"tan"});function f(t){if(!n)return;t==="DISMISS"&&s(!1);const a=y[t];a?(a(n,t),l(p(n))):console.warn(`No translation to Mathquill for: ${t}`)}return e.createElement("div",{style:{maxWidth:"400px",margin:"2em"}},e.createElement(x,{content:e.createElement(k,{style:{padding:10,maxWidth:"initial"}},e.createElement(v,{extraKeys:["x","y","PI","THETA"],onClickKey:f,cursorContext:h,advancedRelations:!0,basicRelations:!0,divisionKey:!0,logarithms:!0,convertDotToTimes:!0,preAlgebra:!0,trigonometry:!0,onAnalyticsEvent:async()=>{},showDismiss:!0})),dismissEnabled:!0,opened:i},e.createElement("div",{style:{width:"100%",marginBottom:"1em",border:`1px solid ${F.offBlack16}`},ref:r})),e.createElement("button",{onClick:()=>s(!i)},i?"close keypad":"open keypad"))}o.__docgenInfo={description:"",methods:[],displayName:"V2KeypadWithMathquill"};var m,c,d;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`function V2KeypadWithMathquill() {
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
}`,...(d=(c=o.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};const oe=["V2KeypadWithMathquill"];export{o as V2KeypadWithMathquill,oe as __namedExportsOrder,ne as default};
