import{a as k,j as n}from"./jsx-runtime-5BUNAZ9W.js";import{P as F,a as g}from"./index-hidQ9sN4.js";import{c as K}from"./index-eVQtxZE-.js";import{r as o}from"./index-4g5l5LRQ.js";import{m as v}from"./button-assets-Z9EPvaqZ.js";import{C as b,K as M}from"./mobile-keypad-T1d2bs9b.js";import{c as R,g as c,a as S}from"./key-translator-kn3_Wzj0.js";import"./index-jmm5gWkb.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-awljIyHI.js";import"./x-6ZxseNgc.js";import"./react-router-dom-hVaNq8bQ.js";import"./index-tvtfaFq4.js";import"./Popper-D86xJ3go.js";import"./index-FsYHUvK_.js";import"./index-J2t_5nK1.js";import"./index-e4P84RkC.js";import"./tabbar-byZ4rx2R.js";import"./item-zU8_EECn.js";import"./index-EhcO8HWm.js";import"./index-lUErx3pE.js";import"./keypad-button-oI-0wQJh.js";import"./operators-page-kMjadO4r.js";import"./navigation-pad-WmROt01e.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";const Z={title:"math-input/components/v2 Keypad With Mathquill"};function a(){const i=o.useRef(null),[t,h]=o.useState(),[s,l]=o.useState(!0),[y,d]=o.useState(b.NONE);o.useEffect(()=>{if(!t&&i.current){const e=R(i.current,"en",v,r=>({...r,handlers:{edit:x=>{d(c(x))}}}));h(e)}},[t]);const f=S("en",{sin:"sin",cos:"cos",tan:"tan"});function C(e){if(!t)return;e==="DISMISS"&&l(!1);const r=f[e];r?(r(t,e),d(c(t))):console.warn(`No translation to Mathquill for: ${e}`)}return k("div",{style:{maxWidth:"400px",margin:"2em"},children:[n(F,{content:n(g,{style:{padding:10,maxWidth:"initial"},children:n(M,{extraKeys:["x","y","PI","THETA"],onClickKey:C,cursorContext:y,advancedRelations:!0,basicRelations:!0,divisionKey:!0,logarithms:!0,convertDotToTimes:!0,preAlgebra:!0,trigonometry:!0,onAnalyticsEvent:async()=>{},showDismiss:!0})}),dismissEnabled:!0,opened:s,children:n("div",{style:{width:"100%",marginBottom:"1em",border:`1px solid ${K.offBlack16}`},ref:i})}),n("button",{onClick:()=>l(!s),children:s?"close keypad":"open keypad"})]})}a.__docgenInfo={description:"",methods:[],displayName:"V2KeypadWithMathquill"};var p,m,u;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`function V2KeypadWithMathquill() {
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
}`,...(u=(m=a.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};const ee=["V2KeypadWithMathquill"];export{a as V2KeypadWithMathquill,ee as __namedExportsOrder,Z as default};
