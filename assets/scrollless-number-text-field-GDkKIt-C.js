import{j as a}from"./jsx-runtime-5BUNAZ9W.js";import{T as l}from"./index-YQYcT5qz.js";import{r as s}from"./index-4g5l5LRQ.js";const r=i=>{const t=s.useRef(null);return s.useEffect(()=>{const e=t.current,o=n=>{n.stopPropagation()};return e==null||e.addEventListener("wheel",o),()=>{e==null||e.removeEventListener("wheel",o)}},[t]),a(l,{type:"number",...i,ref:t})},p=r;r.__docgenInfo={description:`This is a custom text field of type="number" for use in Perseus Editors.

This makes it so that the text field's input number updates on scroll
without scrolling the page.

NOTE 1: Native HTML number inputs do not update the number value on scroll,
they only scroll the page. Inputs in React do NOT work this way (explanation
here: https://stackoverflow.com/a/68266494). By default, scrolling on a
focused number input in React causes BOTH the input value to change AND
the page to scroll. The behavior in this component is an improvement on
the React behavior, but it's the opposite of the native HTML behavior.

NOTE 2: Firefox seems to have a custom override for this. Even with this
stopPropogation, Firefox matches the native HTML behavior.`,methods:[],displayName:"ScrolllessNumberTextField"};export{p as S};
