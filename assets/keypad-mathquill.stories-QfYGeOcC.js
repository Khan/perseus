import{a as k,j as n}from"./jsx-runtime-5BUNAZ9W.js";import{P as F,a as g}from"./index-uYl2mQzu.js";import{c as v}from"./index-lUErx3pE.js";import{r as o}from"./index-4g5l5LRQ.js";import{m as K}from"./button-assets-W0P3gTHH.js";import{C as b,K as M}from"./mobile-keypad-IrtOMiuu.js";import{c as S,g as p,a as R}from"./key-translator-j0G40g1J.js";import"./index-jmm5gWkb.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-e4P84RkC.js";import"./index-awljIyHI.js";import"./index-Kk6-WMea.js";import"./index-88hrcj9K.js";import"./index-Nvrg7yVC.js";import"./index-FsYHUvK_.js";import"./index-AFG5vh6r.js";import"./index-tvtfaFq4.js";import"./index-zE8cp1oq.js";import"./index-wjVcXLkf.js";import"./Popper-D86xJ3go.js";import"./index-J2t_5nK1.js";import"./tabbar-OVWr7z9R.js";import"./item-CLHwlFVV.js";import"./keypad-button-SJOhniA6.js";import"./operators-page-a7wm5EfR.js";import"./navigation-pad-mFs-A8pL.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";const te={title:"math-input/components/v2 Keypad With Mathquill"};function r(){const i=o.useRef(null),[t,h]=o.useState(),[s,l]=o.useState(!0),[y,d]=o.useState(b.NONE);o.useEffect(()=>{if(!t&&i.current){const e=S(i.current,"en",K,a=>({...a,handlers:{edit:x=>{d(p(x))}}}));h(e)}},[t]);const f=R("en");function C(e){if(!t)return;e==="DISMISS"&&l(!1);const a=f[e];a?(a(t,e),d(p(t))):console.warn(`No translation to Mathquill for: ${e}`)}return k("div",{style:{maxWidth:"400px",margin:"2em"},children:[n(F,{content:n(g,{style:{padding:10,maxWidth:"initial"},children:n(M,{extraKeys:["x","y","PI","THETA"],onClickKey:C,cursorContext:y,advancedRelations:!0,basicRelations:!0,divisionKey:!0,logarithms:!0,convertDotToTimes:!0,preAlgebra:!0,trigonometry:!0,onAnalyticsEvent:async e=>{console.log("Send Event:",e)},showDismiss:!0})}),dismissEnabled:!0,opened:s,children:n("div",{style:{width:"100%",marginBottom:"1em",border:`1px solid ${v.offBlack16}`},ref:i})}),n("button",{onClick:()=>l(!s),children:s?"close keypad":"open keypad"})]})}r.__docgenInfo={description:"",methods:[],displayName:"V2KeypadWithMathquill"};var c,m,u;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`function V2KeypadWithMathquill() {
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
  const keyTranslator = getKeyTranslator("en");
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
                        <Keypad extraKeys={["x", "y", "PI", "THETA"]} onClickKey={handleClickKey} cursorContext={cursorContext} advancedRelations basicRelations divisionKey logarithms convertDotToTimes preAlgebra trigonometry onAnalyticsEvent={async event => {
        // eslint-disable-next-line no-console
        console.log("Send Event:", event);
      }} showDismiss />
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
}`,...(u=(m=r.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};const ne=["V2KeypadWithMathquill"];export{r as V2KeypadWithMathquill,ne as __namedExportsOrder,te as default};
