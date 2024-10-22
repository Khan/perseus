import{a as k,j as n}from"./jsx-runtime-FVsy8kgq.js";import{P as F,a as g}from"./index-BPSWBbj5.js";import{c as K}from"./index-deFLJwr4.js";import{r as o}from"./index-TT1qJ6UJ.js";import{m as v}from"./button-assets-txIojR3b.js";import{C as b,K as M}from"./mobile-keypad-3f7ONcH2.js";import{c as R,g as p,a as S}from"./key-translator-g-rPb6Kc.js";import"./index-6h5t6F0w.js";import"./index-awljIyHI.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-7vsPyIck.js";import"./index-YCTzZMik.js";import"./index-rfN0X25E.js";import"./react-router-dom-W_e8xVUu.js";import"./index-tvtfaFq4.js";import"./index-o3wWn3Y5.js";import"./index-CkAxGj88.js";import"./Popper-kGnKOid7.js";import"./index-h_CiYGGb.js";import"./index-J2t_5nK1.js";import"./tabbar-WYCYDof0.js";import"./item-X9tjzx12.js";import"./index-2dmvOE3q.js";import"./keypad-button-rKskH7oM.js";import"./operators-page-C_EsmjPW.js";import"./navigation-pad-ss7r0FKW.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";const te={title:"math-input/components/v2 Keypad With Mathquill"};function a(){const i=o.useRef(null),[t,h]=o.useState(),[s,l]=o.useState(!0),[y,d]=o.useState(b.NONE);o.useEffect(()=>{if(!t&&i.current){const e=R(i.current,"en",v,r=>({...r,handlers:{edit:x=>{d(p(x))}}}));h(e)}},[t]);const f=S("en",{sin:"sin",cos:"cos",tan:"tan"});function C(e){if(!t)return;e==="DISMISS"&&l(!1);const r=f[e];r?(r(t,e),d(p(t))):console.warn(`No translation to Mathquill for: ${e}`)}return k("div",{style:{maxWidth:"400px",margin:"2em"},children:[n(F,{content:n(g,{style:{padding:10,maxWidth:"initial"},children:n(M,{extraKeys:["x","y","PI","THETA"],onClickKey:C,cursorContext:y,advancedRelations:!0,basicRelations:!0,divisionKey:!0,logarithms:!0,convertDotToTimes:!0,preAlgebra:!0,trigonometry:!0,onAnalyticsEvent:async()=>{},showDismiss:!0})}),dismissEnabled:!0,opened:s,children:n("div",{style:{width:"100%",marginBottom:"1em",border:`1px solid ${K.offBlack16}`},ref:i})}),n("button",{onClick:()=>l(!s),children:s?"close keypad":"open keypad"})]})}a.__docgenInfo={description:"",methods:[],displayName:"V2KeypadWithMathquill"};var c,m,u;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`function V2KeypadWithMathquill() {
  const mathFieldWrapperRef = React.useRef<HTMLDivElement>(null);
  const [mathField, setMathField] = React.useState<MathFieldInterface>();
  const [keypadOpen, setKeypadOpen] = React.useState<boolean>(true);
  const [cursorContext, setCursorContext] = React.useState<(typeof CursorContext)[keyof typeof CursorContext]>(CursorContext.NONE);
  React.useEffect(() => {
    if (!mathField && mathFieldWrapperRef.current) {
      const mathFieldInstance = createMathField(mathFieldWrapperRef.current, "en", mockStrings, baseConfig => ({
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
}`,...(u=(m=a.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};const ne=["V2KeypadWithMathquill"];export{a as V2KeypadWithMathquill,ne as __namedExportsOrder,te as default};
