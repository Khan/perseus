import{j as t}from"./jsx-runtime-63Ea5SlK.js";import{P as k,a as F}from"./index-8_CLcrTy.js";import{c as g}from"./index-QHkT31Yt.js";import{r as o}from"./index-6oxdNXpR.js";import{m as K}from"./button-assets-xw_2ofjr.js";import{C as v,K as b}from"./mobile-keypad-x_sPNRWp.js";import{c as M,g as d,a as R}from"./key-translator-_oUwkeCP.js";import"./index-_3CKOwHy.js";import"./no-important-xCWWYXQR.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-9gkyvru-.js";import"./index-rXO3OHs_.js";import"./index-wvJr82a4.js";import"./index-ZdJtI3z8.js";import"./index-0pCajwWr.js";import"./index-7Z-R4z4z.js";import"./index-4dAUYsag.js";import"./index-OQMtW1Q1.js";import"./index-o999uk82.js";import"./Popper-Y5KDXl-P.js";import"./index-default-4_ZsnO94.js";import"./get-decimal-separator-c07pHhM9.js";import"./core-widget-registry-uiKfW1Am.js";import"./index-J2t_5nK1.js";import"./assertThisInitialized-4q6YPdh3.js";import"./tabbar-UtkI9pTR.js";import"./item-YVSph9Dw.js";import"./keypad-button-3-HlG2U_.js";import"./operators-page-FmoBJvSk.js";import"./navigation-pad-xmFR7wJI.js";const oe={title:"math-input/components/v2 Keypad With Mathquill"};function r(){const i=o.useRef(null),[n,h]=o.useState(),[s,l]=o.useState(!0),[y,p]=o.useState(v.NONE);o.useEffect(()=>{if(!n&&i.current){const e=M(i.current,"en",K,a=>({...a,handlers:{edit:x=>{p(d(x))}}}));h(e)}},[n]);const f=R("en",{sin:"sin",cos:"cos",tan:"tan"});function C(e){if(!n)return;e==="DISMISS"&&l(!1);const a=f[e];a?(a(n,e),p(d(n))):console.warn(`No translation to Mathquill for: ${e}`)}return t.jsxs("div",{style:{maxWidth:"400px",margin:"2em"},children:[t.jsx(k,{content:t.jsx(F,{style:{padding:10,maxWidth:"initial"},children:t.jsx(b,{extraKeys:["x","y","PI","THETA"],onClickKey:C,cursorContext:y,advancedRelations:!0,basicRelations:!0,divisionKey:!0,logarithms:!0,convertDotToTimes:!0,preAlgebra:!0,trigonometry:!0,onAnalyticsEvent:async()=>{},showDismiss:!0})}),dismissEnabled:!0,opened:s,children:t.jsx("div",{style:{width:"100%",marginBottom:"1em",border:`1px solid ${g.offBlack16}`},ref:i})}),t.jsx("button",{onClick:()=>l(!s),children:s?"close keypad":"open keypad"})]})}r.__docgenInfo={description:"",methods:[],displayName:"V2KeypadWithMathquill"};var c,m,u;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`function V2KeypadWithMathquill() {
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
}`,...(u=(m=r.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};const re=["V2KeypadWithMathquill"];export{r as V2KeypadWithMathquill,re as __namedExportsOrder,oe as default};
