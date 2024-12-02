import{j as t}from"./jsx-runtime-63Ea5SlK.js";import{P as k,a as F}from"./index-zFNZn_u0.js";import{c as g}from"./index-deFLJwr4.js";import{r as o}from"./index-6oxdNXpR.js";import{m as K}from"./button-assets-ozecF1qE.js";import{C as v,K as b}from"./mobile-keypad-Muuas9zV.js";import{c as M,g as p,a as R}from"./key-translator-hixns6dh.js";import"./index-0DbkllkJ.js";import"./index-awljIyHI.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-9gkyvru-.js";import"./index-jxhLXBHb.js";import"./index-f-3iKkZU.js";import"./react-router-dom-VIBHfbW6.js";import"./index-i1pBWAmI.js";import"./index-7-BESUpx.js";import"./Popper-Y5KDXl-P.js";import"./index-18qWGOW7.js";import"./index-J2t_5nK1.js";import"./tabbar-WEwAggnz.js";import"./item-ct0mKlsr.js";import"./index-xfryX26Z.js";import"./keypad-button-BlFICMi6.js";import"./operators-page-pCrK11a-.js";import"./navigation-pad-29vyLJ52.js";const Y={title:"math-input/components/v2 Keypad With Mathquill"};function a(){const i=o.useRef(null),[n,h]=o.useState(),[s,l]=o.useState(!0),[y,d]=o.useState(v.NONE);o.useEffect(()=>{if(!n&&i.current){const e=M(i.current,"en",K,r=>({...r,handlers:{edit:x=>{d(p(x))}}}));h(e)}},[n]);const f=R("en",{sin:"sin",cos:"cos",tan:"tan"});function C(e){if(!n)return;e==="DISMISS"&&l(!1);const r=f[e];r?(r(n,e),d(p(n))):console.warn(`No translation to Mathquill for: ${e}`)}return t.jsxs("div",{style:{maxWidth:"400px",margin:"2em"},children:[t.jsx(k,{content:t.jsx(F,{style:{padding:10,maxWidth:"initial"},children:t.jsx(b,{extraKeys:["x","y","PI","THETA"],onClickKey:C,cursorContext:y,advancedRelations:!0,basicRelations:!0,divisionKey:!0,logarithms:!0,convertDotToTimes:!0,preAlgebra:!0,trigonometry:!0,onAnalyticsEvent:async()=>{},showDismiss:!0})}),dismissEnabled:!0,opened:s,children:t.jsx("div",{style:{width:"100%",marginBottom:"1em",border:`1px solid ${g.offBlack16}`},ref:i})}),t.jsx("button",{onClick:()=>l(!s),children:s?"close keypad":"open keypad"})]})}a.__docgenInfo={description:"",methods:[],displayName:"V2KeypadWithMathquill"};var c,m,u;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`function V2KeypadWithMathquill() {
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
}`,...(u=(m=a.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};const Z=["V2KeypadWithMathquill"];export{a as V2KeypadWithMathquill,Z as __namedExportsOrder,Y as default};
