import{s as le,n as se,r as Ee,o as ye,i as ee}from"../chunks/scheduler.802f7c56.js";import{S as re,i as ie,g as h,s as P,m as ge,h as p,j as g,f as u,c as R,n as ve,k as m,a as Z,x as o,d as O,p as $e,b as we,t as U,A as be,r as K,u as Q,v as W,w as Y,y as te,l as ke,C as G,z as B}from"../chunks/index.d2a17b03.js";import{e as he}from"../chunks/each.e59479a4.js";function Se(e){let t,s;return{c(){t=h("div"),s=ge(e[1]),this.h()},l(a){t=p(a,"DIV",{class:!0});var l=g(t);s=ve(l,e[1]),l.forEach(u),this.h()},h(){m(t,"class","common-name svelte-1hq49mp")},m(a,l){Z(a,t,l),o(t,s)},p:se,d(a){a&&u(t)}}}function Ie(e){let t,s,a,l,c,r,i,n,d,v=e[1]&&Se(e);return{c(){t=h("div"),s=h("div"),a=P(),l=h("div"),c=h("a"),v&&v.c(),r=P(),i=h("div"),n=ge(e[2]),this.h()},l($){t=p($,"DIV",{class:!0});var f=g(t);s=p(f,"DIV",{class:!0,style:!0}),g(s).forEach(u),a=R(f),l=p(f,"DIV",{class:!0});var j=g(l);c=p(j,"A",{href:!0,class:!0});var T=g(c);v&&v.l(T),r=R(T),i=p(T,"DIV",{class:!0});var I=g(i);n=ve(I,e[2]),I.forEach(u),T.forEach(u),j.forEach(u),f.forEach(u),this.h()},h(){m(s,"class","card-img svelte-1hq49mp"),m(s,"style",`background-image: url(${e[3]});`),m(i,"class","scientific-name svelte-1hq49mp"),m(c,"href",d=`https://www.inaturalist.org/taxa/${e[0].taxon.id}`),m(c,"class","svelte-1hq49mp"),m(l,"class","name svelte-1hq49mp"),m(t,"class","card svelte-1hq49mp")},m($,f){Z($,t,f),o(t,s),o(t,a),o(t,l),o(l,c),v&&v.m(c,null),o(c,r),o(c,i),o(i,n)},p($,[f]){$[1]&&v.p($,f),f&1&&d!==(d=`https://www.inaturalist.org/taxa/${$[0].taxon.id}`)&&m(c,"href",d)},i:se,o:se,d($){$&&u(t),v&&v.d()}}}function Ce(e,t,s){var i;let{data:a}=t,l=a.taxon.preferred_common_name,c=a.taxon.name,r=(i=a.taxon.default_photo)==null?void 0:i.medium_url;return e.$$set=n=>{"data"in n&&s(0,a=n.data)},[a,l,c,r]}class De extends re{constructor(t){super(),ie(this,t,Ce,Ie,le,{data:0})}}function pe(e,t,s){const a=e.slice();return a[1]=t[s],a}function _e(e){let t,s;return t=new De({props:{data:e[1]}}),{c(){K(t.$$.fragment)},l(a){Q(t.$$.fragment,a)},m(a,l){W(t,a,l),s=!0},p(a,l){const c={};l&1&&(c.data=a[1]),t.$set(c)},i(a){s||(O(t.$$.fragment,a),s=!0)},o(a){U(t.$$.fragment,a),s=!1},d(a){Y(t,a)}}}function Te(e){let t,s,a=he(e[0]),l=[];for(let r=0;r<a.length;r+=1)l[r]=_e(pe(e,a,r));const c=r=>U(l[r],1,1,()=>{l[r]=null});return{c(){t=h("div");for(let r=0;r<l.length;r+=1)l[r].c();this.h()},l(r){t=p(r,"DIV",{class:!0});var i=g(t);for(let n=0;n<l.length;n+=1)l[n].l(i);i.forEach(u),this.h()},h(){m(t,"class","species-grid svelte-1ic7wvw")},m(r,i){Z(r,t,i);for(let n=0;n<l.length;n+=1)l[n]&&l[n].m(t,null);s=!0},p(r,[i]){if(i&1){a=he(r[0]);let n;for(n=0;n<a.length;n+=1){const d=pe(r,a,n);l[n]?(l[n].p(d,i),O(l[n],1)):(l[n]=_e(d),l[n].c(),O(l[n],1),l[n].m(t,null))}for($e(),n=a.length;n<l.length;n+=1)c(n);we()}},i(r){if(!s){for(let i=0;i<a.length;i+=1)O(l[i]);s=!0}},o(r){l=l.filter(Boolean);for(let i=0;i<l.length;i+=1)U(l[i]);s=!1},d(r){r&&u(t),be(l,r)}}}function Ve(e,t,s){let{data:a}=t;return e.$$set=l=>{"data"in l&&s(0,a=l.data)},[a]}class ae extends re{constructor(t){super(),ie(this,t,Ve,Te,le,{data:0})}}function me(e){let t,s;return t=new ae({props:{data:e[7].slice(0,e[3])}}),{c(){K(t.$$.fragment)},l(a){Q(t.$$.fragment,a)},m(a,l){W(t,a,l),s=!0},p(a,l){const c={};l&136&&(c.data=a[7].slice(0,a[3])),t.$set(c)},i(a){s||(O(t.$$.fragment,a),s=!0)},o(a){U(t.$$.fragment,a),s=!1},d(a){Y(t,a)}}}function Fe(e){let t,s,a,l,c,r,i,n,d,v="Ö",$,f,j="Ä",T,I,q,z,L,A,H,V,C,w,F,E,k,M,D,ne="show more",N,x,oe;A=new ae({props:{data:e[5].slice(0,e[3])}});let _=e[4]&&me(e);return E=new ae({props:{data:e[6].slice(0,e[3])}}),{c(){t=h("div"),s=h("div"),a=h("div"),l=h("textarea"),c=P(),r=h("div"),i=h("textarea"),n=P(),d=h("button"),d.textContent=v,$=P(),f=h("button"),f.textContent=j,T=P(),I=h("div"),q=h("textarea"),z=P(),L=h("div"),K(A.$$.fragment),H=P(),V=h("div"),_&&_.c(),w=P(),F=h("div"),K(E.$$.fragment),M=P(),D=h("button"),D.textContent=ne,this.h()},l(S){t=p(S,"DIV",{});var y=g(t);s=p(y,"DIV",{style:!0});var b=g(s);a=p(b,"DIV",{class:!0});var J=g(a);l=p(J,"TEXTAREA",{}),g(l).forEach(u),J.forEach(u),c=R(b),r=p(b,"DIV",{class:!0});var X=g(r);i=p(X,"TEXTAREA",{style:!0}),g(i).forEach(u),n=R(X),d=p(X,"BUTTON",{"data-svelte-h":!0}),te(d)!=="svelte-v8lje8"&&(d.textContent=v),$=R(X),f=p(X,"BUTTON",{"data-svelte-h":!0}),te(f)!=="svelte-171a0hv"&&(f.textContent=j),X.forEach(u),T=R(b),I=p(b,"DIV",{class:!0});var ce=g(I);q=p(ce,"TEXTAREA",{}),g(q).forEach(u),ce.forEach(u),z=R(b),L=p(b,"DIV",{class:!0});var fe=g(L);Q(A.$$.fragment,fe),fe.forEach(u),H=R(b),V=p(b,"DIV",{class:!0,style:!0});var de=g(V);_&&_.l(de),de.forEach(u),w=R(b),F=p(b,"DIV",{class:!0});var ue=g(F);Q(E.$$.fragment,ue),ue.forEach(u),b.forEach(u),M=R(y),D=p(y,"BUTTON",{"data-svelte-h":!0}),te(D)!=="svelte-11q8o8a"&&(D.textContent=ne),y.forEach(u),this.h()},h(){m(a,"class","grid-cell svelte-18ih0ll"),ke(i,"max-width","100%"),m(r,"class","grid-cell svelte-18ih0ll"),m(I,"class","grid-cell svelte-18ih0ll"),m(L,"class","grid-cell svelte-18ih0ll"),m(V,"class","grid-cell svelte-18ih0ll"),m(V,"style",C=e[4]?"":"width:100px;"),m(F,"class","grid-cell svelte-18ih0ll"),m(s,"style",k=`display: grid; grid-template-columns: 5fr ${e[4]?"4fr":"100px"} 5fr;`)},m(S,y){Z(S,t,y),o(t,s),o(s,a),o(a,l),G(l,e[0]),o(s,c),o(s,r),o(r,i),G(i,e[2]),o(r,n),o(r,d),o(r,$),o(r,f),o(s,T),o(s,I),o(I,q),G(q,e[1]),o(s,z),o(s,L),W(A,L,null),o(s,H),o(s,V),_&&_.m(V,null),o(s,w),o(s,F),W(E,F,null),o(t,M),o(t,D),N=!0,x||(oe=[B(l,"input",e[10]),B(l,"change",function(){ee(e[9]("LField",e[0]))&&e[9]("LField",e[0]).apply(this,arguments)}),B(i,"input",e[11]),B(i,"change",function(){ee(e[9]("MField",e[2]))&&e[9]("MField",e[2]).apply(this,arguments)}),B(d,"click",e[8]),B(f,"click",e[12]),B(q,"input",e[13]),B(q,"change",function(){ee(e[9]("RField",e[1]))&&e[9]("RField",e[1]).apply(this,arguments)}),B(D,"click",e[14])],x=!0)},p(S,[y]){e=S,y&1&&G(l,e[0]),y&4&&G(i,e[2]),y&2&&G(q,e[1]);const b={};y&40&&(b.data=e[5].slice(0,e[3])),A.$set(b),e[4]?_?(_.p(e,y),y&16&&O(_,1)):(_=me(e),_.c(),O(_,1),_.m(V,null)):_&&($e(),U(_,1,1,()=>{_=null}),we()),(!N||y&16&&C!==(C=e[4]?"":"width:100px;"))&&m(V,"style",C);const J={};y&72&&(J.data=e[6].slice(0,e[3])),E.$set(J),(!N||y&16&&k!==(k=`display: grid; grid-template-columns: 5fr ${e[4]?"4fr":"100px"} 5fr;`))&&m(s,"style",k)},i(S){N||(O(A.$$.fragment,S),O(_),O(E.$$.fragment,S),N=!0)},o(S){U(A.$$.fragment,S),U(_),U(E.$$.fragment,S),N=!1},d(S){S&&u(t),Y(A),_&&_.d(),Y(E),x=!1,Ee(oe)}}}const qe="https://api.inaturalist.org/v1";function Ae(e,t,s){let a,l,c=500,r=!1,i="",n="",d="",v=[],$=[],f=[];const j=async()=>{s(5,v=[]),s(6,$=[]),s(7,f=[]);let C=await T(a),w=await T(l);for(const[F,E]of C.entries()){let k=!1;for(const[M,D]of w.entries())if(E.taxon.id===D.taxon.id){w.splice(M,1),f.push(E),k=!0;break}else if(I(E,D)){w.splice(M,1),f.push(D);break}else if(I(D,E)){f.push(E),k=!0;break}k||v.push(E)}s(6,$=w),s(7,f),s(5,v)},T=async C=>{let w=[],F=1;for(;F;){const k=await(await fetch(`${qe}/observations/species_counts?${C}&page=${F}`)).json();if(w=w.concat(k.results),k.page*k.per_page>=k.total_results)break;F+=1,await new Promise(M=>setTimeout(M,1e3))}return w},I=(C,w)=>C.taxon.ancestor_ids.includes(w.taxon.id),q=(C,w)=>()=>{localStorage.setItem(C,w)};ye(()=>{s(0,i=localStorage.getItem("LField")),s(2,d=localStorage.getItem("MField")),s(1,n=localStorage.getItem("RField"))});function z(){i=this.value,s(0,i)}function L(){d=this.value,s(2,d)}const A=()=>{s(4,r=!r)};function H(){n=this.value,s(1,n)}const V=()=>{s(3,c+=500)};return e.$$.update=()=>{e.$$.dirty&5&&(a=(i+"&"+d).replace(/^[\n&]|[\n&]$/g,"").replace(/[\n&]+/g,"&")),e.$$.dirty&6&&(l=(n+"&"+d).replace(/^[\n&]|[\n&]$/g,"").replace(/[\n&]+/g,"&"))},[i,n,d,c,r,v,$,f,j,q,z,L,A,H,V]}class Be extends re{constructor(t){super(),ie(this,t,Ae,Fe,le,{})}}export{Be as component};
