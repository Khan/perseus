import{bu as c,bv as h,bw as g,bx as u,a9 as p,_ as r,P as d,E as b,ao as f}from"./iframe-BRRXc9Qf.js";const y="@khanacademy/perseus",_="__lib_version__";c(y,_);h(g);u();const x=`Usage:
  this.change({propName: 5}, callback);
  this.change("propName", 5, callback);
  this.change("propName")`,o=function(s,n,e){const i=f(s.props),t=r.extend(i,n);s.props.onChange(t,e)},a=function(s,n,e,i){if(e===void 0)return r.partial(a,s,n);const t={};t[n]=e,o(s,t,i)},v=function(s,n,e){if(r.isObject(s)&&e===void 0)return e=n,o(this,s,e);if(typeof s=="string")return a(this,s,n,e);throw new d("Invalid types sent to this.change(): "+r.toArray(arguments).join()+`
`+x,b.Internal)},E={onChange:p.func.isRequired};export{v as c,E as p};
