import{bu as c,bv as h,bw as g,bx as u,a8 as p,_ as r,P as d,E as b,an as f}from"./iframe-qGQC3xuz.js";const y="@khanacademy/perseus",_="__lib_version__";c(y,_);h(g);u();const x=`Usage:
  this.change({propName: 5}, callback);
  this.change("propName", 5, callback);
  this.change("propName")`,o=function(s,e,n){const i=f(s.props),t=r.extend(i,e);s.props.onChange(t,n)},a=function(s,e,n,i){if(n===void 0)return r.partial(a,s,e);const t={};t[e]=n,o(s,t,i)},v=function(s,e,n){if(r.isObject(s)&&n===void 0)return n=e,o(this,s,n);if(typeof s=="string")return a(this,s,e,n);throw new d("Invalid types sent to this.change(): "+r.toArray(arguments).join()+`
`+x,b.Internal)},E={onChange:p.func.isRequired};export{v as c,E as p};
