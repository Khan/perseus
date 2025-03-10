import{T as f}from"./index-F5uqTDBi.js";import{r as s}from"./index-6oxdNXpR.js";const l=o=>{const{value:i,onChange:u,...c}=o,[h,a]=s.useState(!1),[m,r]=s.useState(""),n=s.useRef(null);return s.useEffect(()=>{const e=n.current,t=d=>{d.stopPropagation()};return e==null||e.addEventListener("wheel",t),()=>{e==null||e.removeEventListener("wheel",t)}},[n]),s.createElement(f,{...c,type:"number",value:h?m:i,onChange:e=>{r(e),u(e)},onFocus:e=>{var t;r(i),a(!0),(t=o.onFocus)==null||t.call(o,e)},onBlur:e=>{var t;a(!1),(t=o.onBlur)==null||t.call(o,e)},ref:n})},b=l;l.__docgenInfo={description:`This is a custom text field of type="number" for use in Perseus Editors.

This component makes it so that
1. the text field's input number updates on scroll without
   scrolling the page.
2. the input is controlled as long as it does not have focus.
   While it is focused, it becomes editable and emits onChange
   events. This is useful to make sure that input behavior
   remains predictable, rather than possibly having the cursor
   jump around uenxpectedly.

NOTE 1: Native HTML number inputs do not update the number value on scroll,
they only scroll the page. Inputs in React do NOT work this way (explanation
here: https://stackoverflow.com/a/68266494). By default, scrolling on a
focused number input in React causes BOTH the input value to change AND
the page to scroll. The behavior in this component is an improvement on
the React behavior, but it's the opposite of the native HTML behavior.

NOTE 2: Firefox seems to have a custom override for input scroll. Even
with this stopPropogation, Firefox matches the native HTML behavior.`,methods:[],displayName:"ScrolllessNumberTextField"};export{b as S};
