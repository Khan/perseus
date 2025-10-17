import{bw as c,bx as h,by as g,bz as p,ab as u,_ as r,h as d,E as b,aq as y}from"./iframe-BPwAIjyA.js";const f="@khanacademy/perseus",_="__lib_version__";c(f,_);h(g);p();const x=`Usage:
  this.change({propName: 5}, callback);
  this.change("propName", 5, callback);
  this.change("propName")`,o=function(s,n,e){const i=y(s.props),t=r.extend(i,n);s.props.onChange(t,e)},a=function(s,n,e,i){if(e===void 0)return r.partial(a,s,n);const t={};t[n]=e,o(s,t,i)},E=function(s,n,e){if(r.isObject(s)&&e===void 0)return e=n,o(this,s,e);if(typeof s=="string")return a(this,s,n,e);throw new d("Invalid types sent to this.change(): "+r.toArray(arguments).join()+`
`+x,b.Internal)},v={onChange:u.func.isRequired};export{E as c,v as p};
