
var Module = (() => {
  var _scriptDir = import.meta.url;
  
  return (
function(Module) {
  Module = Module || {};


var a;a||(a=typeof Module !== 'undefined' ? Module : {});var q,r;a.ready=new Promise(function(b,d){q=b;r=d});var v=Object.assign({},a),w="";"undefined"!=typeof document&&document.currentScript&&(w=document.currentScript.src);_scriptDir&&(w=_scriptDir);0!==w.indexOf("blob:")?w=w.substr(0,w.replace(/[?#].*/,"").lastIndexOf("/")+1):w="";var x=a.printErr||console.warn.bind(console);Object.assign(a,v);v=null;var y;a.wasmBinary&&(y=a.wasmBinary);var noExitRuntime=a.noExitRuntime||!0;
"object"!=typeof WebAssembly&&z("no native wasm support detected");var B,C=!1;
function aa(b,d,h,p){var e={string:function(c){var m=0;if(null!==c&&void 0!==c&&0!==c){var l=(c.length<<2)+1;m=D(l);var g=m,f=E;if(0<l){l=g+l-1;for(var t=0;t<c.length;++t){var k=c.charCodeAt(t);if(55296<=k&&57343>=k){var ba=c.charCodeAt(++t);k=65536+((k&1023)<<10)|ba&1023}if(127>=k){if(g>=l)break;f[g++]=k}else{if(2047>=k){if(g+1>=l)break;f[g++]=192|k>>6}else{if(65535>=k){if(g+2>=l)break;f[g++]=224|k>>12}else{if(g+3>=l)break;f[g++]=240|k>>18;f[g++]=128|k>>12&63}f[g++]=128|k>>6&63}f[g++]=128|k&63}}f[g]=
0}}return m},array:function(c){var m=D(c.length);F.set(c,m);return m}};b=a["_"+b];var n=[],A=0;if(p)for(var u=0;u<p.length;u++){var O=e[h[u]];O?(0===A&&(A=G()),n[u]=O(p[u])):n[u]=p[u]}h=b.apply(null,n);return h=function(c){0!==A&&H(A);if("string"===d)if(c){for(var m=E,l=c+NaN,g=c;m[g]&&!(g>=l);)++g;if(16<g-c&&m.buffer&&I)c=I.decode(m.subarray(c,g));else{for(l="";c<g;){var f=m[c++];if(f&128){var t=m[c++]&63;if(192==(f&224))l+=String.fromCharCode((f&31)<<6|t);else{var k=m[c++]&63;f=224==(f&240)?(f&
15)<<12|t<<6|k:(f&7)<<18|t<<12|k<<6|m[c++]&63;65536>f?l+=String.fromCharCode(f):(f-=65536,l+=String.fromCharCode(55296|f>>10,56320|f&1023))}}else l+=String.fromCharCode(f)}c=l}}else c="";else c="boolean"===d?!!c:c;return c}(h)}var I="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):void 0,F,E,J,K=[],L=[],M=[];function ca(){var b=a.preRun.shift();K.unshift(b)}var N=0,P=null,Q=null;
function z(b){if(a.onAbort)a.onAbort(b);b="Aborted("+b+")";x(b);C=!0;b=new WebAssembly.RuntimeError(b+". Build with -sASSERTIONS for more info.");r(b);throw b;}function R(){return S.startsWith("data:application/octet-stream;base64,")}var S;if(a.locateFile){if(S="lib.wasm",!R()){var T=S;S=a.locateFile?a.locateFile(T,w):w+T}}else S=(new URL("lib.wasm",import.meta.url)).toString();
function U(){var b=S;try{if(b==S&&y)return new Uint8Array(y);throw"both async and sync fetching of the wasm failed";}catch(d){z(d)}}function da(){return y||"function"!=typeof fetch?Promise.resolve().then(function(){return U()}):fetch(S,{credentials:"same-origin"}).then(function(b){if(!b.ok)throw"failed to load wasm binary file at '"+S+"'";return b.arrayBuffer()}).catch(function(){return U()})}
function V(b){for(;0<b.length;){var d=b.shift();if("function"==typeof d)d(a);else{var h=d.l;"number"==typeof h?void 0===d.j?W(h)():W(h)(d.j):h(void 0===d.j?null:d.j)}}}var X=[];function W(b){var d=X[b];d||(b>=X.length&&(X.length=b+1),X[b]=d=J.get(b));return d}var ea={b:function(){z("")},a:function(){z("OOM")}};
(function(){function b(e){a.asm=e.exports;B=a.asm.c;e=B.buffer;a.HEAP8=F=new Int8Array(e);a.HEAP16=new Int16Array(e);a.HEAP32=new Int32Array(e);a.HEAPU8=E=new Uint8Array(e);a.HEAPU16=new Uint16Array(e);a.HEAPU32=new Uint32Array(e);a.HEAPF32=new Float32Array(e);a.HEAPF64=new Float64Array(e);J=a.asm.i;L.unshift(a.asm.d);N--;a.monitorRunDependencies&&a.monitorRunDependencies(N);0==N&&(null!==P&&(clearInterval(P),P=null),Q&&(e=Q,Q=null,e()))}function d(e){b(e.instance)}function h(e){return da().then(function(n){return WebAssembly.instantiate(n,
p)}).then(function(n){return n}).then(e,function(n){x("failed to asynchronously prepare wasm: "+n);z(n)})}var p={a:ea};N++;a.monitorRunDependencies&&a.monitorRunDependencies(N);if(a.instantiateWasm)try{return a.instantiateWasm(p,b)}catch(e){return x("Module.instantiateWasm callback failed with error: "+e),!1}(function(){return y||"function"!=typeof WebAssembly.instantiateStreaming||R()||"function"!=typeof fetch?h(d):fetch(S,{credentials:"same-origin"}).then(function(e){return WebAssembly.instantiateStreaming(e,
p).then(d,function(n){x("wasm streaming compile failed: "+n);x("falling back to ArrayBuffer instantiation");return h(d)})})})().catch(r);return{}})();a.___wasm_call_ctors=function(){return(a.___wasm_call_ctors=a.asm.d).apply(null,arguments)};a._calculateNetwork=function(){return(a._calculateNetwork=a.asm.e).apply(null,arguments)};
var G=a.stackSave=function(){return(G=a.stackSave=a.asm.f).apply(null,arguments)},H=a.stackRestore=function(){return(H=a.stackRestore=a.asm.g).apply(null,arguments)},D=a.stackAlloc=function(){return(D=a.stackAlloc=a.asm.h).apply(null,arguments)};a.cwrap=function(b,d,h,p){h=h||[];var e=h.every(function(n){return"number"===n});return"string"!==d&&e&&!p?a["_"+b]:function(){return aa(b,d,h,arguments)}};var Y;Q=function fa(){Y||Z();Y||(Q=fa)};
function Z(){function b(){if(!Y&&(Y=!0,a.calledRun=!0,!C)){V(L);q(a);if(a.onRuntimeInitialized)a.onRuntimeInitialized();if(a.postRun)for("function"==typeof a.postRun&&(a.postRun=[a.postRun]);a.postRun.length;){var d=a.postRun.shift();M.unshift(d)}V(M)}}if(!(0<N)){if(a.preRun)for("function"==typeof a.preRun&&(a.preRun=[a.preRun]);a.preRun.length;)ca();V(K);0<N||(a.setStatus?(a.setStatus("Running..."),setTimeout(function(){setTimeout(function(){a.setStatus("")},1);b()},1)):b())}}a.run=Z;
if(a.preInit)for("function"==typeof a.preInit&&(a.preInit=[a.preInit]);0<a.preInit.length;)a.preInit.pop()();Z();


  return Module.ready
}
);
})();
export default Module;