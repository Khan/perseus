import{j as t}from"./jsx-runtime-63Ea5SlK.js";import{P as k,a as F}from"./index-NO-eDzXE.js";import{c as g}from"./index-dmcq622U.js";import{r as o}from"./index-6oxdNXpR.js";import{m as K}from"./button-assets-ozecF1qE.js";import{C as v,K as b}from"./mobile-keypad-3j_jDObR.js";import{c as M,g as p,a as R}from"./key-translator-Q9R1HFoU.js";import"./index-9gkyvru-.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-45GODDwG.js";import"./index-awljIyHI.js";import"./index-hEE6rY0q.js";import"./index-vJavIKvF.js";import"./index-MIAtMmGo.js";import"./index-YSsViXVq.js";import"./index-_qTNMX3t.js";import"./index-HGk1BWh5.js";import"./index-7-BESUpx.js";import"./index-bkG41yOS.js";import"./Popper-Y5KDXl-P.js";import"./index-J2t_5nK1.js";import"./assertThisInitialized-4q6YPdh3.js";import"./tabbar-ppG_I3QY.js";import"./item-iGCpbtfH.js";import"./keypad-button-SoYuvIyM.js";import"./operators-page-xozuM2Ug.js";import"./navigation-pad-Sl0Gk1Rv.js";const ee={title:"math-input/components/v2 Keypad With Mathquill"};function r(){const i=o.useRef(null),[n,h]=o.useState(),[s,l]=o.useState(!0),[y,d]=o.useState(v.NONE);o.useEffect(()=>{if(!n&&i.current){const e=M(i.current,"en",K,a=>({...a,handlers:{edit:x=>{d(p(x))}}}));h(e)}},[n]);const f=R("en",{sin:"sin",cos:"cos",tan:"tan"});function C(e){if(!n)return;e==="DISMISS"&&l(!1);const a=f[e];a?(a(n,e),d(p(n))):console.warn(`No translation to Mathquill for: ${e}`)}return t.jsxs("div",{style:{maxWidth:"400px",margin:"2em"},children:[t.jsx(k,{content:t.jsx(F,{style:{padding:10,maxWidth:"initial"},children:t.jsx(b,{extraKeys:["x","y","PI","THETA"],onClickKey:C,cursorContext:y,advancedRelations:!0,basicRelations:!0,divisionKey:!0,logarithms:!0,convertDotToTimes:!0,preAlgebra:!0,trigonometry:!0,onAnalyticsEvent:async()=>{},showDismiss:!0})}),dismissEnabled:!0,opened:s,children:t.jsx("div",{style:{width:"100%",marginBottom:"1em",border:`1px solid ${g.offBlack16}`},ref:i})}),t.jsx("button",{onClick:()=>l(!s),children:s?"close keypad":"open keypad"})]})}r.__docgenInfo={description:"",methods:[],displayName:"V2KeypadWithMathquill"};var c,m,u;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`function V2KeypadWithMathquill() {
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
}`,...(u=(m=r.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};const te=["V2KeypadWithMathquill"];export{r as V2KeypadWithMathquill,te as __namedExportsOrder,ee as default};
