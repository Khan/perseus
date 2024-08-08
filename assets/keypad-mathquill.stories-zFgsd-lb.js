import{a as k,j as n}from"./jsx-runtime-5BUNAZ9W.js";import{P as F,a as g}from"./index-GPnNv0mI.js";import{c as v}from"./index-lUErx3pE.js";import{r as o}from"./index-4g5l5LRQ.js";import{m as K}from"./button-assets-gSR_ngpH.js";import{C as b,K as M}from"./mobile-keypad-fIN5N6sB.js";import{c as S,g as c,a as R}from"./key-translator-uJhRSksH.js";import"./index-jmm5gWkb.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-awljIyHI.js";import"./x-6ZxseNgc.js";import"./index-Cz55-Vre.js";import"./index-tvtfaFq4.js";import"./index-e4P84RkC.js";import"./Popper-D86xJ3go.js";import"./index-FsYHUvK_.js";import"./index-J2t_5nK1.js";import"./tabbar-tY-vWj59.js";import"./item-kdyp1JvI.js";import"./keypad-button-i3yjQmDW.js";import"./operators-page-AY25AXJ7.js";import"./navigation-pad-Z2fVjJac.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";const X={title:"math-input/components/v2 Keypad With Mathquill"};function a(){const i=o.useRef(null),[t,h]=o.useState(),[s,l]=o.useState(!0),[y,d]=o.useState(b.NONE);o.useEffect(()=>{if(!t&&i.current){const e=S(i.current,"en",K,r=>({...r,handlers:{edit:x=>{d(c(x))}}}));h(e)}},[t]);const f=R("en");function C(e){if(!t)return;e==="DISMISS"&&l(!1);const r=f[e];r?(r(t,e),d(c(t))):console.warn(`No translation to Mathquill for: ${e}`)}return k("div",{style:{maxWidth:"400px",margin:"2em"},children:[n(F,{content:n(g,{style:{padding:10,maxWidth:"initial"},children:n(M,{extraKeys:["x","y","PI","THETA"],onClickKey:C,cursorContext:y,advancedRelations:!0,basicRelations:!0,divisionKey:!0,logarithms:!0,convertDotToTimes:!0,preAlgebra:!0,trigonometry:!0,onAnalyticsEvent:async e=>{console.log("Send Event:",e)},showDismiss:!0})}),dismissEnabled:!0,opened:s,children:n("div",{style:{width:"100%",marginBottom:"1em",border:`1px solid ${v.offBlack16}`},ref:i})}),n("button",{onClick:()=>l(!s),children:s?"close keypad":"open keypad"})]})}a.__docgenInfo={description:"",methods:[],displayName:"V2KeypadWithMathquill"};var p,m,u;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`function V2KeypadWithMathquill() {
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
}`,...(u=(m=a.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};const Y=["V2KeypadWithMathquill"];export{a as V2KeypadWithMathquill,Y as __namedExportsOrder,X as default};
