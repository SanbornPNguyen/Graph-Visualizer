(this["webpackJsonpGraph-Visualizer"]=this["webpackJsonpGraph-Visualizer"]||[]).push([[0],{14:function(e,t,n){"use strict";n.r(t);var i=n(0),c=n.n(i),r=n(3),o=n.n(r),d=n(4),l=n(2),u=n(1),s={background:"black",color:"white",padding:10,borderRadius:"50%"},a={borderRadius:10,transform:"translate(0px, 25px)",visibility:"hidden"},b={special:function(e){var t=e.data;return Object(u.jsxs)("div",{style:s,children:[Object(u.jsx)(l.a,{type:"source",position:"top",style:a}),Object(u.jsx)("div",{children:t.text}),Object(u.jsx)(l.a,{type:"target",position:"top",style:a})]})}},j={height:500,width:500,borderStyle:"solid"},h=0,f=function(){var e=Object(i.useState)("Welcome to Graph Visualizer!"),t=Object(d.a)(e,2),n=t[0],c=t[1],r=Object(i.useState)([]),o=Object(d.a)(r,2),s=o[0],a=o[1],f=Object(i.useState)(null),p=Object(d.a)(f,2),g=p[0],O=p[1],v=Object(i.useState)(null),x=Object(d.a)(v,2),y=x[0],k=x[1];return Object(u.jsxs)("div",{children:[Object(u.jsx)("div",{children:Object(u.jsx)("h1",{children:n})}),Object(u.jsxs)("div",{children:[Object(u.jsx)("button",{onClick:function(){var e=h.toString(),t={id:e,data:{label:e,text:e},type:"special",position:{x:0,y:0}};a(s.concat(t)),h+=1},children:"Add Vertex"}),Object(u.jsx)("button",{onClick:function(){h=0,a([]),O(null),k(null)},children:"Clear"})]}),Object(u.jsx)("div",{style:j,children:Object(u.jsx)(l.c,{elements:s,nodeTypes:b,onNodeDoubleClick:function(e,t){if(null===y)return k(t),void c("Node ".concat(t.id.toString()," is currently selected. Double click on another node to create an edge"));if(t.id===y.id)return k(null),void c("Adding edge failed. You can not add loops");if(s.filter((function(e){return e.source===y.id&&e.target===t.id})).length>0)return k(null),void c("Adding edge failed. You can not have multiple edges between vertices");if(s.filter((function(e){return e.source===t.id&&e.target===y.id})).length>0)return k(null),void c("Adding edge failed. You can not have multiple edges between vertices");var n={source:y.id,target:t.id,type:"straight",style:{stroke:"rgb(0, 0, 0)",strokeWidth:3}};k(null),c("Edge successfully added!"),a((function(e){return Object(l.b)(n,e)}))},onNodeContextMenu:function(e,t){e.preventDefault(),a((function(e){return Object(l.d)([t],e)}))},onClick:function(e){null!=g&&(a((function(e){return Object(l.d)([g],e)})),O(null))},onEdgeMouseEnter:function(e,t){O(t)},onEdgeMouseLeave:function(e,t){O(null)}})})]})};o.a.render(Object(u.jsx)(c.a.StrictMode,{children:Object(u.jsx)(f,{})}),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.fa6b74cd.chunk.js.map