import{bv as c,bw as h,bx as g,by as p,aa as u,_ as r,P as d,E as y,ap as b}from"./iframe-DY2ryAtZ.js";const f="@khanacademy/perseus",_="__lib_version__";c(f,_);h(g);p();const x=`Usage:
  this.change({propName: 5}, callback);
  this.change("propName", 5, callback);
  this.change("propName")`,o=function(s,n,e){const i=b(s.props),t=r.extend(i,n);s.props.onChange(t,e)},a=function(s,n,e,i){if(e===void 0)return r.partial(a,s,n);const t={};t[n]=e,o(s,t,i)},v=function(s,n,e){if(r.isObject(s)&&e===void 0)return e=n,o(this,s,e);if(typeof s=="string")return a(this,s,n,e);throw new d("Invalid types sent to this.change(): "+r.toArray(arguments).join()+`
`+x,y.Internal)},E={onChange:u.func.isRequired};export{v as c,E as p};
