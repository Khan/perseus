import{_ as S}from"./iframe-lzcHvcqH.js";import"../sb-preview/runtime.js";const{addons:f}=__STORYBOOK_MODULE_PREVIEW_API__,{global:U}=__STORYBOOK_MODULE_GLOBAL__;var o="storybook/a11y",y=`${o}/result`,L=`${o}/request`,d=`${o}/running`,A=`${o}/error`,T=`${o}/manual`,r={RESULT:y,REQUEST:L,RUNNING:d,ERROR:A,MANUAL:T},{document:g}=U,a=f.getChannel(),l=!1,_,R={config:{},options:{}},v=async(n,e)=>{e!=null&&e.manual||await i(n,e??R)},i=async(n,e=R)=>{_=n;try{if(!l){l=!0,a.emit(r.RUNNING);let{default:t}=await S(()=>import("./axe-5GIt4bd5.js").then(N=>N.a),__vite__mapDeps([0,1]),import.meta.url),{element:m="#storybook-root",config:s,options:O={}}=e,E=g.querySelector(m);if(!E)return;t.reset(),s&&t.configure(s);let c=await t.run(E,O),u=JSON.parse(JSON.stringify(c));_===n?a.emit(r.RESULT,u):(l=!1,i(_))}}catch(t){a.emit(r.ERROR,t)}finally{l=!1}};a.on(r.REQUEST,v);a.on(r.MANUAL,i);
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["./axe-5GIt4bd5.js","./_commonjsHelpers-4gQjN7DL.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
