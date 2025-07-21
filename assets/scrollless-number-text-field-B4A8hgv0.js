import{r as s,j as m,bq as v}from"./iframe-ClpJ2tSX.js";const f=o=>{const{value:i,onChange:r,...l}=o,[c,a]=s.useState(!1),[h,u]=s.useState(""),n=s.useRef(null);return s.useEffect(()=>{const e=n.current,t=d=>{d.stopPropagation()};return e==null||e.addEventListener("wheel",t),()=>{e==null||e.removeEventListener("wheel",t)}},[n]),m.jsx(v,{...l,type:"number",value:c?h:i,onChange:e=>{u(e),r(e)},onFocus:e=>{var t;u(i),a(!0),(t=o.onFocus)==null||t.call(o,e)},onBlur:e=>{var t;a(!1),(t=o.onBlur)==null||t.call(o,e)},ref:n})};f.__docgenInfo={description:`This is a custom text field of type="number" for use in Perseus Editors.

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
with this stopPropogation, Firefox matches the native HTML behavior.`,methods:[],displayName:"ScrolllessNumberTextField"};export{f as S};
