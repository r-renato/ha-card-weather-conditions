function t(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o}const e="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,i=(t,e,i=null)=>{for(;e!==i;){const i=e.nextSibling;t.removeChild(e),e=i}},s=`{{lit-${String(Math.random()).slice(2)}}}`,n=`\x3c!--${s}--\x3e`,r=new RegExp(`${s}|${n}`),o="$lit$";class a{constructor(t,e){this.parts=[],this.element=e;const i=[],n=[],a=document.createTreeWalker(e.content,133,null,!1);let d=0,p=-1,u=0;const{strings:m,values:{length:g}}=t;for(;u<g;){const t=a.nextNode();if(null!==t){if(p++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:i}=e;let s=0;for(let t=0;t<i;t++)l(e[t].name,o)&&s++;for(;s-- >0;){const e=m[u],i=h.exec(e)[2],s=i.toLowerCase()+o,n=t.getAttribute(s);t.removeAttribute(s);const a=n.split(r);this.parts.push({type:"attribute",index:p,name:i,strings:a}),u+=a.length-1}}"TEMPLATE"===t.tagName&&(n.push(t),a.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(s)>=0){const s=t.parentNode,n=e.split(r),a=n.length-1;for(let e=0;e<a;e++){let i,r=n[e];if(""===r)i=c();else{const t=h.exec(r);null!==t&&l(t[2],o)&&(r=r.slice(0,t.index)+t[1]+t[2].slice(0,-o.length)+t[3]),i=document.createTextNode(r)}s.insertBefore(i,t),this.parts.push({type:"node",index:++p})}""===n[a]?(s.insertBefore(c(),t),i.push(t)):t.data=n[a],u+=a}}else if(8===t.nodeType)if(t.data===s){const e=t.parentNode;null!==t.previousSibling&&p!==d||(p++,e.insertBefore(c(),t)),d=p,this.parts.push({type:"node",index:p}),null===t.nextSibling?t.data="":(i.push(t),p--),u++}else{let e=-1;for(;-1!==(e=t.data.indexOf(s,e+1));)this.parts.push({type:"node",index:-1}),u++}}else a.currentNode=n.pop()}for(const t of i)t.parentNode.removeChild(t)}}const l=(t,e)=>{const i=t.length-e.length;return i>=0&&t.slice(i)===e},d=t=>-1!==t.index,c=()=>document.createComment(""),h=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/,p=133;function u(t,e){const{element:{content:i},parts:s}=t,n=document.createTreeWalker(i,p,null,!1);let r=g(s),o=s[r],a=-1,l=0;const d=[];let c=null;for(;n.nextNode();){a++;const t=n.currentNode;for(t.previousSibling===c&&(c=null),e.has(t)&&(d.push(t),null===c&&(c=t)),null!==c&&l++;void 0!==o&&o.index===a;)o.index=null!==c?-1:o.index-l,o=s[r=g(s,r)]}d.forEach(t=>t.parentNode.removeChild(t))}const m=t=>{let e=11===t.nodeType?0:1;const i=document.createTreeWalker(t,p,null,!1);for(;i.nextNode();)e++;return e},g=(t,e=-1)=>{for(let i=e+1;i<t.length;i++){const e=t[i];if(d(e))return i}return-1};const _=new WeakMap,y=t=>"function"==typeof t&&_.has(t),f={},v={};class w{constructor(t,e,i){this.__parts=[],this.template=t,this.processor=e,this.options=i}update(t){let e=0;for(const i of this.__parts)void 0!==i&&i.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=e?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),i=[],s=this.template.parts,n=document.createTreeWalker(t,133,null,!1);let r,o=0,a=0,l=n.nextNode();for(;o<s.length;)if(r=s[o],d(r)){for(;a<r.index;)a++,"TEMPLATE"===l.nodeName&&(i.push(l),n.currentNode=l.content),null===(l=n.nextNode())&&(n.currentNode=i.pop(),l=n.nextNode());if("node"===r.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(l.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,r.name,r.strings,this.options));o++}else this.__parts.push(void 0),o++;return e&&(document.adoptNode(t),customElements.upgrade(t)),t}}const b=` ${s} `;class S{constructor(t,e,i,s){this.strings=t,this.values=e,this.type=i,this.processor=s}getHTML(){const t=this.strings.length-1;let e="",i=!1;for(let r=0;r<t;r++){const t=this.strings[r],a=t.lastIndexOf("\x3c!--");i=(a>-1||i)&&-1===t.indexOf("--\x3e",a+1);const l=h.exec(t);e+=null===l?t+(i?b:n):t.substr(0,l.index)+l[1]+l[2]+o+l[3]+s}return e+=this.strings[t]}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}const x=t=>null===t||!("object"==typeof t||"function"==typeof t),N=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class C{constructor(t,e,i){this.dirty=!0,this.element=t,this.name=e,this.strings=i,this.parts=[];for(let t=0;t<i.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new E(this)}_getValue(){const t=this.strings,e=t.length-1;let i="";for(let s=0;s<e;s++){i+=t[s];const e=this.parts[s];if(void 0!==e){const t=e.value;if(x(t)||!N(t))i+="string"==typeof t?t:String(t);else for(const e of t)i+="string"==typeof e?e:String(e)}}return i+=t[e]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class E{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===f||x(t)&&t===this.value||(this.value=t,y(t)||(this.committer.dirty=!0))}commit(){for(;y(this.value);){const t=this.value;this.value=f,t(this)}this.value!==f&&this.committer.commit()}}class P{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(c()),this.endNode=t.appendChild(c())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=c()),t.__insert(this.endNode=c())}insertAfterPart(t){t.__insert(this.startNode=c()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;y(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=f,t(this)}const t=this.__pendingValue;t!==f&&(x(t)?t!==this.value&&this.__commitText(t):t instanceof S?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):N(t)?this.__commitIterable(t):t===v?(this.value=v,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,i="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=i:this.__commitNode(document.createTextNode(i)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof w&&this.value.template===e)this.value.update(t.values);else{const i=new w(e,t.processor,this.options),s=i._clone();i.update(t.values),this.__commitNode(s),this.value=i}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let i,s=0;for(const n of t)void 0===(i=e[s])&&(i=new P(this.options),e.push(i),0===s?i.appendIntoPart(this):i.insertAfterPart(e[s-1])),i.setValue(n),i.commit(),s++;s<e.length&&(e.length=s,this.clear(i&&i.endNode))}clear(t=this.startNode){i(this.startNode.parentNode,t.nextSibling,this.endNode)}}class ${constructor(t,e,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=i}setValue(t){this.__pendingValue=t}commit(){for(;y(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=f,t(this)}if(this.__pendingValue===f)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=f}}class k extends C{constructor(t,e,i){super(t,e,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new T(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class T extends E{}let O=!1;(()=>{try{const t={get capture(){return O=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class A{constructor(t,e,i){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=i,this.__boundHandleEvent=(t=>this.handleEvent(t))}setValue(t){this.__pendingValue=t}commit(){for(;y(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=f,t(this)}if(this.__pendingValue===f)return;const t=this.__pendingValue,e=this.value,i=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),s=null!=t&&(null==e||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),s&&(this.__options=z(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=f}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const z=t=>t&&(O?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);function V(t){let e=M.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},M.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const n=t.strings.join(s);return void 0===(i=e.keyString.get(n))&&(i=new a(t,t.getTemplateElement()),e.keyString.set(n,i)),e.stringsArray.set(t.strings,i),i}const M=new Map,W=new WeakMap;const F=new class{handleAttributeExpressions(t,e,i,s){const n=e[0];return"."===n?new k(t,e.slice(1),i).parts:"@"===n?[new A(t,e.slice(1),s.eventContext)]:"?"===n?[new $(t,e.slice(1),i)]:new C(t,e,i).parts}handleTextExpression(t){return new P(t)}};"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.2.1");const j=(t,...e)=>new S(t,e,"html",F),U=(t,e)=>`${t}--${e}`;let R=!0;void 0===window.ShadyCSS?R=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),R=!1);const D=t=>e=>{const i=U(e.type,t);let n=M.get(i);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},M.set(i,n));let r=n.stringsArray.get(e.strings);if(void 0!==r)return r;const o=e.strings.join(s);if(void 0===(r=n.keyString.get(o))){const i=e.getTemplateElement();R&&window.ShadyCSS.prepareTemplateDom(i,t),r=new a(e,i),n.keyString.set(o,r)}return n.stringsArray.set(e.strings,r),r},I=["html","svg"],L=new Set,q=(t,e,i)=>{L.add(t);const s=i?i.element:document.createElement("template"),n=e.querySelectorAll("style"),{length:r}=n;if(0===r)return void window.ShadyCSS.prepareTemplateStyles(s,t);const o=document.createElement("style");for(let t=0;t<r;t++){const e=n[t];e.parentNode.removeChild(e),o.textContent+=e.textContent}(t=>{I.forEach(e=>{const i=M.get(U(e,t));void 0!==i&&i.keyString.forEach(t=>{const{element:{content:e}}=t,i=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{i.add(t)}),u(t,i)})})})(t);const a=s.content;i?function(t,e,i=null){const{element:{content:s},parts:n}=t;if(null==i)return void s.appendChild(e);const r=document.createTreeWalker(s,p,null,!1);let o=g(n),a=0,l=-1;for(;r.nextNode();)for(l++,r.currentNode===i&&(a=m(e),i.parentNode.insertBefore(e,i));-1!==o&&n[o].index===l;){if(a>0){for(;-1!==o;)n[o].index+=a,o=g(n,o);return}o=g(n,o)}}(i,o,a.firstChild):a.insertBefore(o,a.firstChild),window.ShadyCSS.prepareTemplateStyles(s,t);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)e.insertBefore(l.cloneNode(!0),e.firstChild);else if(i){a.insertBefore(o,a.firstChild);const t=new Set;t.add(o),u(i,t)}};window.JSCompiler_renameProperty=((t,e)=>t);const H={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},B=(t,e)=>e!==t&&(e==e||t==t),J={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:B},G=1,Q=4,K=8,X=16,Y="finalized";class Z extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=new Promise(t=>this._enableUpdatingResolver=t),this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,i)=>{const s=this._attributeNameForProperty(i,e);void 0!==s&&(this._attributeToPropertyMap.set(s,i),t.push(s))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=J){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const i="symbol"==typeof t?Symbol():`__${t}`,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(i){const s=this[t];this[e]=i,this._requestUpdate(t,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||J}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty(Y)||t.finalize(),this[Y]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const i of e)this.createProperty(i,t[i])}}static _attributeNameForProperty(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,i=B){return i(t,e)}static _propertyValueFromAttribute(t,e){const i=e.type,s=e.converter||H,n="function"==typeof s?s:s.fromAttribute;return n?n(t,i):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const i=e.type,s=e.converter;return(s&&s.toAttribute||H.toAttribute)(t,i)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,i){e!==i&&this._attributeToProperty(t,i)}_propertyToAttribute(t,e,i=J){const s=this.constructor,n=s._attributeNameForProperty(t,i);if(void 0!==n){const t=s._propertyValueToAttribute(e,i);if(void 0===t)return;this._updateState=this._updateState|K,null==t?this.removeAttribute(n):this.setAttribute(n,t),this._updateState=this._updateState&~K}}_attributeToProperty(t,e){if(this._updateState&K)return;const i=this.constructor,s=i._attributeToPropertyMap.get(t);if(void 0!==s){const t=i.getPropertyOptions(s);this._updateState=this._updateState|X,this[s]=i._propertyValueFromAttribute(e,t),this._updateState=this._updateState&~X}}_requestUpdate(t,e){let i=!0;if(void 0!==t){const s=this.constructor,n=s.getPropertyOptions(t);s._valueHasChanged(this[t],e,n.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==n.reflect||this._updateState&X||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,n))):i=!1}!this._hasRequestedUpdate&&i&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this._requestUpdate(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=this._updateState|Q;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return this._updateState&Q}get hasUpdated(){return this._updateState&G}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{(t=this.shouldUpdate(e))?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(this._updateState&G||(this._updateState=this._updateState|G,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~Q}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}Z[Y]=!0;const tt=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){window.customElements.define(t,e)}}})(t,e),et=(t,e)=>"method"!==e.kind||!e.descriptor||"value"in e.descriptor?{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}}:Object.assign(Object.assign({},e),{finisher(i){i.createProperty(e.key,t)}}),it=(t,e,i)=>{e.constructor.createProperty(i,t)};function st(t){return(e,i)=>void 0!==i?it(t,e,i):et(t,e)}const nt="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,rt=Symbol();class ot{constructor(t,e){if(e!==rt)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(nt?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}(window.litElementVersions||(window.litElementVersions=[])).push("2.3.1");const at={};class lt extends Z{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(void 0===t)this._styles=[];else if(Array.isArray(t)){const e=(t,i)=>t.reduceRight((t,i)=>Array.isArray(i)?e(i,t):(t.add(i),t),i),i=e(t,new Set),s=[];i.forEach(t=>s.unshift(t)),this._styles=s}else this._styles=[t]}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?nt?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==at&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){return at}}lt.finalized=!0,lt.render=((t,e,s)=>{if(!s||"object"!=typeof s||!s.scopeName)throw new Error("The `scopeName` option is required.");const n=s.scopeName,r=W.has(e),o=R&&11===e.nodeType&&!!e.host,a=o&&!L.has(n),l=a?document.createDocumentFragment():e;if(((t,e,s)=>{let n=W.get(e);void 0===n&&(i(e,e.firstChild),W.set(e,n=new P(Object.assign({templateFactory:V},s))),n.appendInto(e)),n.setValue(t),n.commit()})(t,l,Object.assign({templateFactory:D(n)},s)),a){const t=W.get(l);W.delete(l);const s=t.value instanceof w?t.value.template:void 0;q(n,l,s),i(e,e.firstChild),e.appendChild(l),W.set(e,t)}!r&&o&&window.ShadyCSS.styleElement(e.host)});const dt={freezing_rain_heavy:"rainy-3",freezing_rain:"rainy-2",freezing_rain_light:"rainy-1",freezing_drizzle:"rain-and-sleet-mix",ice_pellets_heavy:"rain-and-snow-mix",ice_pellets:"rain-and-snow-mix",ice_pellets_light:"rain-and-snow-mix",snow_heavy:"snowy-3",snow:"snowy-2",snow_light:"snowy-1",flurries:"wind",tstorm:"tropical-storm",rain_heavy:"rainy-3",rain_light:"rainy-1",rain:"rainy-2",drizzle:"rainy-1",fog_light:"haze",fog:"fog",cloudy:"cloudy-original",mostly_cloudy:"cloudy-day-3",partly_cloudy:"cloudy-day-2",mostly_clear:"cloudy-day-1",clear:"day"},ct=Object.assign(Object.assign({},dt),{freezing_rain_heavy:"rainy-6",freezing_rain:"rainy-5",freezing_rain_light:"rainy-4",snow_heavy:"snowy-6",snow:"nowy-5",snow_light:"nowy-4",rain_heavy:"rainy-6",rain_light:"rainy-4",rain:"rainy-5",drizzle:"rainy-4",mostly_cloudy:"cloudy-night-3",partly_cloudy:"cloudy-night-2",mostly_clear:"cloudy-night-1",clear:"night"}),ht={"clear-day":"day",rain:"rainy-2",snow:"nowy-2",sleet:"rain-and-sleet-mix",wind:"cloudy-day-1",fog:"fog",cloudy:"cloudy-original","partly-cloudy-day":"cloudy-day-2"},pt=Object.assign(Object.assign({},ht),{"clear-night":"day-night",wind:"cloudy-night-1","partly-cloudy-night":"cloudy-night-2"}),ut={"clear sky":"day","few clouds":"cloudy-day-1","scattered clouds":"cloudy-day-2","broken clouds":"cloudy-day-3","shower rain":"rainy-3",rain:"rainy-2",thunderstorm:"tropical-storm",snow:"nowy-2",mist:"fog"},mt=Object.assign(Object.assign({},ut),{"clear sky":"day-night","few clouds":"cloudy-night-1","scattered clouds":"cloudy-night-2","broken clouds":"cloudy-night-3"});let gt={en:0,it:1},_t={N:["N","N"],NNE:["NNE","NNE"],NE:["NE","NE"],ENE:["ENE","ENE"],E:["E","E"],ESE:["ESE","ESE"],SE:["SE","SE"],SSE:["SSE","SSE"],S:["S","S"],SSW:["SSW","SSO"],SW:["SW","SO"],WSW:["WSW","OSO"],W:["W","O"],WNW:["WNW","ONO"],NW:["NW","NO"],NNW:["NNW","NNO"]};const yt=(t,e,i)=>{let s=i&&"below_horizon"==i;return null==e.path&&console.info("Image path not found."),`${e.path}/${e.iconType}/${s?e.iconsNight[t]:e.iconsDay[t]}.svg`},ft=(t,e)=>{const i=t.config.unit_system.length;switch(e){case"air_pressure":return"km"===i?"hPa":"inHg";case"length":return i;case"precipitation":return"km"===i?"mm":"in";default:return t.config.unit_system[e]||""}},vt=(t,e,i,s,n)=>void 0!==t||void 0!==i?j`
    <li>
      <ha-icon icon="${n}"></ha-icon>${void 0!==t?t:"Na"} ${e} /
          <b>${void 0!==i?i:"Na"} ${s}</b>
    </li>
  `:"",wt=(t,e,i)=>j`
    <li>
      <ha-icon icon="${i}"></ha-icon>${void 0!==t?t:"Na"} ${e}
    </li>
  `,bt=(t,e,i,s)=>{let n,r,o,a,l,d;const c=s||t.selectedLanguage||t.language;let h=e.sun?t.states[e.sun]:void 0;if(h&&(l=new Date(h.attributes.next_rising),d=new Date(h.attributes.next_setting)),e.forecast){let e=i.temperature_high?Object.entries(i.temperature_high):void 0,s=i.temperature_low?Object.entries(i.temperature_low):void 0,l=i.precipitation_probability?Object.entries(i.precipitation_probability):void 0,d=i.precipitation_intensity?Object.entries(i.precipitation_intensity):void 0;n=e?Math.round(parseFloat(t.states[e[0][1]].state)):void 0,r=s?Math.round(parseFloat(t.states[s[0][1]].state)):void 0,o=l?Math.round(parseFloat(t.states[l[0][1]].state)):void 0,a=d?Math.round(parseFloat(t.states[d[0][1]].state)):void 0}let p=e.precipitation?Math.round(parseFloat(t.states[e.precipitation].state)):void 0,u=e.humidity?parseFloat(t.states[e.humidity].state):void 0,m=e.wind_bearing?parseFloat(t.states[e.wind_bearing].state):void 0,g=e.wind_speed?Math.round(10*parseFloat(t.states[e.wind_speed].state))/10:void 0,_=e.pressure?Math.round(parseFloat(t.states[e.pressure].state)):void 0,y=e.visibility?Math.round(parseFloat(t.states[e.visibility].state)):void 0;return j`
    <ul class="variations">
        ${!e.forecast||void 0===o&&void 0===a?"":vt(o,"%",a,ft(t,"precipitation")+"/h","mdi:weather-rainy")}
        ${!e.forecast||void 0===r&&void 0===n?"":vt(r,"",n,ft(t,"temperature"),"mdi:thermometer")}
        ${void 0!==p&&p>0?j`
          <li>
            <ha-icon icon="mdi:weather-rainy"></ha-icon>${p}
            <span class="unit"> ${ft(t,"precipitation")}/h</span>
          </li>
          <li><ha-icon icon="none"></ha-icon><span class="unit"></span></li>
        `:""}            
        ${void 0!==_?wt(_,ft(t,"air_pressure"),"mdi:gauge"):""}
        ${void 0!==u?wt(u,"%","mdi:water-percent"):""}
        ${void 0!==y?wt(y,ft(t,"length"),"mdi:weather-fog"):""}
        ${g||m?j`
          <li>
            <ha-icon icon="mdi:weather-windy"></ha-icon> ${((t,e)=>t<0||t>360?(console.log("Enter a degree between 0 and 360 degrees."),null):t>=0&&t<=11.25?_t.N[gt[e]]:t>348.75&&t<=360?_t.N[gt[e]]:t>11.25&&t<=33.75?_t.NNE[gt[e]]:t>33.75&&t<=56.25?_t.NE[gt[e]]:t>56.25&&t<=78.75?_t.ENE[gt[e]]:t>78.75&&t<=101.25?_t.E[gt[e]]:t>101.25&&t<=123.75?_t.ESE[gt[e]]:t>123.75&&t<=146.25?_t.SE[gt[e]]:t>146.25&&t<=168.75?_t.SSE[gt[e]]:t>168.75&&t<=191.25?_t.S[gt[e]]:t>191.25&&t<=213.75?_t.SSW[gt[e]]:t>213.75&&t<=236.25?_t.SW[gt[e]]:t>236.25&&t<=258.75?_t.WSW[gt[e]]:t>258.75&&t<=281.25?_t.W[gt[e]]:t>281.25&&t<=303.75?_t.WNW[gt[e]]:t>303.75&&t<=326.25?_t.NW[gt[e]]:t>326.25&&t<=348.75?_t.NNW[gt[e]]:null)(m,c)} ${g}
            <span class="unit">${ft(t,"length")}/h</span>
          </li>
        `:""}        
        ${void 0!==l?wt(l.toLocaleTimeString(),"","mdi:weather-sunset-up"):""}               
        ${void 0!==d?wt(d.toLocaleTimeString(),"","mdi:weather-sunset-down"):""}           
    </ul>
  `},St=(t,e,i,s)=>null==t&&null==i?j``:null==t?j`
            <div class="highTemp">
              <b>${i}</b> ${s}
            </div>   
      `:null==i?j`
            <div class="lowTemp">
              ${t} ${e}
            </div>  
      `:j`
            <div class="highTemp">
              ${t} ${e} / <b>${i} ${s}</b>
            </div>
      `,xt=(t,e)=>{let i=t.states[e.entity],s=void 0!==e.min?e.min:0,n=void 0!==e.max?e.max:5,r=void 0!==e.low?e.low:s,o=void 0!==e.high?e.high:n,a=0==s?1:0;return i?j`
     <li>
       <ha-icon icon="${i.attributes.icon}"></ha-icon>
       <meter class="meter" value="${parseInt(i.state)+a}" optimum="${(o-r)/2}"
            min="${s}" max="${n+a}" low="${r+a}" high="${o+a}">${i.state}/${n}</meter>
     </li>
  `:""};const Nt=(t,e)=>t?j`
    <li>
      <svg viewBox="0 0 24 15" width="24" height="15" xmlns="http://www.w3.org/2000/svg">
        <style>.small {font: 8px sans-serif;}</style>
        <text x="0" y="14" class="small">${e}</text>
      </svg>${t.state} ${t.attributes.unit_of_measurement?t.attributes.unit_of_measurement:""}
    </li>    
  `:"",Ct=((t,...e)=>{const i=e.reduce((e,i,s)=>e+(t=>{if(t instanceof ot)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+t[s+1],t[0]);return new ot(i,rt)})`
      ha-card {
        cursor: pointer;
        margin: auto;
        padding-top: 1.3em;
        padding-bottom: 1.3em;
        padding-left: 1em;
        padding-right: 1em;
        position: relative;
      }

      .current {
        padding-top: 1.2em;
        margin-bottom: 3.5em;
      }
            
      .spacer {
        padding-top: 1em;
      }
      
      .icon.bigger {
        width: 10em;
        height: 10em;
        margin-top: -4em;
        position: absolute;
        left: 0em;
      }
      
      .icon {
        width: 50px;
        height: 50px;
        margin-right: 5px;
        display: inline-block;
        vertical-align: middle;
        background-size: contain;
        background-position: center center;
        background-repeat: no-repeat;
        text-indent: -9999px;
      }    
      
      .temp {
        font-weight: 300;
        font-size: calc(56px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
        color: var(--primary-text-color);
        position: absolute;
        right: 1em;
        top: 0.3em;
      }

      .tempc {
        font-weight: 300;
        font-size: 1.5em;
        vertical-align: super;
        color: var(--primary-text-color);
        position: absolute;
        right: 1em;
        margin-top: -14px;
        margin-right: 7px;
      }      
      
      .title {
        position: absolute;
        left: calc(140px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
        top: 0.6em;
        font-weight: 300;
        font-size: calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
        color: var(--primary-text-color);
      }
      
      .variations {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        font-weight: 300;
        color: var(--primary-text-color);
        list-style: none;
        padding: 3px 1em;
        margin: 0;
        
        border-top: solid 1px var(--primary-text-color);
      }

      .variations ha-icon {
        height: 22px;
        margin-right: 5px;
        color: var(--paper-item-icon-color);
      }
      
      .variations svg {
        height: 15px;
        margin-right: 5px;
        fill: var(--paper-item-icon-color);
      }
      
      .variations li {
        flex-basis: auto;
        width: 50%;
      }

      .variations li:nth-child(2n) {
        text-align: right;
      }

      .variations li:nth-child(2n) ha-icon {
        margin-right: 0;
        margin-left: 8px;
        float: right;
      }    
      
      .variations li:nth-child(2n) svg {
        margin-right: 0;
        margin-left: 8px;
        float: right;
      }    
      
      .forecast {
        width: 100%;
        margin: 0 auto;
        display: flex;
      }

      .day {
        flex: 1;
        display: block;
        text-align: center;
        color: var(--primary-text-color);
        border-right: 0.1em solid #d9d9d9;
        line-height: 2;
        box-sizing: border-box;
      }

      .dayname {
        text-transform: uppercase;
      }

      .forecast .day:first-child {
        margin-left: 0;
      }

      .forecast .day:nth-last-child(1) {
        border-right: none;
        margin-right: 0;
      }      
      .container {
        margin-top: 10px;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: stretch;
        // position: absolute;
        // background: #000;
      } 
      .mainImage {
        flex: 3;
        height: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
      .mainImage > img {
        display: inline-block;
        max-width: 100%;
        max-height: 100%;
      }

      .meter {
        background: #efefef; /* Grigio */
        border-radius: 8px;
        border: 1px solid transparent; /* 2 */
        box-shadow:
          0 1px 3px 1px rgba(0,0,0,0.15) inset,
          0 0 0 1px #333; /* 1 */
        height: .75em;
        max-width: 10em;
        overflow: hidden;
        width: 100%;
      }

      /* WebKit */
      .meter::-webkit-meter-bar {
        background: #efefef; /* Grigio */
        border: 1px solid transparent; /* 2 */
        border-radius: 8px;
      }

      .meter::-webkit-meter-optimum-value,
      .meter::-webkit-meter-suboptimum-value,
      .meter::-webkit-meter-even-less-good-value {
        border-radius: 8px;
      }

      .meter::-webkit-meter-optimum-value {
        background: #85cc00; /* verde #3C5C00; */
      }
      
      .meter::-webkit-meter-suboptimum-value {
        background: #F5D000;
      }
      
      .meter::-webkit-meter-even-less-good-value  {
        background: #e65000 ; /* Rosso #D14900; */
      }

      // .meter::-webkit-meter-optimum-value {
      //     background: #87C7DE;
      //     background: -moz-linear-gradient(top, #a1d4e6 0%, #6bb4d1 100%);
      //     background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #a1d4e6), color-stop(100%, #6bb4d1));
      //     background: -webkit-linear-gradient(top, #a1d4e6 0%, #6bb4d1 100%);
      //     background: -o-linear-gradient(top, #a1d4e6 0%, #6bb4d1 100%);
      //     background: -ms-linear-gradient(top, #a1d4e6 0%, #6bb4d1 100%);
      //     background: linear-gradient(to bottom, #a1d4e6 0%, #6bb4d1 100%);
      //     filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#a1d4e6', endColorstr='#6bb4d1',GradientType=0);
      // }

/* Firefox */
.meter::-moz-meter-bar {
  border-radius: 8px;
}

.meter:-moz-meter-optimum::-moz-meter-bar {
  background: #3C5C00;
}

.meter:-moz-meter-sub-optimum::-moz-meter-bar {
  background: #F5D000;
}

.meter:-moz-meter-sub-sub-optimum::-moz-meter-bar {
  background: #D14900;
}



`,Et="/local/community/ha-card-weather-conditions/icons",Pt="/local/ha-card-weather-conditions/icons";let $t=!1,kt=!1;function Tt(t,e,i){let s=new Image;s.onload=e,s.onerror=i,s.src=t}Tt(Et+"/weather/cloudy.svg",function(){$t=!0},function(){$t=!1}),Tt(Pt+"/icons/static/cloudy.svg",function(){kt=!0},function(){kt=!1}),console.info("%c WEATHER-CONDITION-CARD %c 1.0.0 ","color: white; background: green; font-weight: 700;","color: coral; background: white; font-weight: 700;"),setTimeout(function(){let e=class extends lt{constructor(){super(...arguments),this._iconsConfig=new class{},this.invalidConfig=!1,this.numberElements=0,this._header=!0,this._name="",this._hasCurrent=!1,this._hasForecast=!1,this._hasMeteogram=!1,this._hasAirQuality=!1,this._hasPollen=!1,this._displayTop=!0,this._displayCurrent=!0,this._displayForecast=!0}setConfig(t){if(console.log({card_config:t}),!t)throw this.invalidConfig=!0,new Error("Invalid configuration");if(t.name&&t.name.length>0&&(this._name=t.name),t.language&&t.language.length>0?this._language=t.language.toLowerCase():this._language="en",void 0!==t.display&&(this._displayTop=t.display.findIndex(t=>"top"===t.toLowerCase())>=0,this._displayCurrent=t.display.findIndex(t=>"current"===t.toLowerCase())>=0,this._displayForecast=t.display.findIndex(t=>"forecast"===t.toLowerCase())>=0),this._hasCurrent=!!t.weather&&!!t.weather.current,this._hasForecast=!!t.weather&&!!t.weather.forecast,this._hasMeteogram=this._hasForecast&&!!t.weather.forecast.meteogram,this._hasAirQuality=!!t.air_quality,this._hasPollen=!(!t.pollen||!t.pollen.tree&&!t.pollen.weed&&!t.pollen.grass),this._iconsConfig.path=$t?Et:kt?Pt:null,this._iconsConfig.iconType=t.animation?"animated":"static",this._iconsConfig.iconsDay=dt,this._iconsConfig.iconsNight=ct,t.weather&&t.weather.icons_model)switch(t.weather.icons_model.toLowerCase()){case"darksky":this._iconsConfig.iconsDay=ht,this._iconsConfig.iconsNight=pt;break;case"openweathermap":this._iconsConfig.iconsDay=ut,this._iconsConfig.iconsNight=mt}this._config=t}getCardSize(){return 1}static get styles(){return Ct}render(){return this._iconsConfig.path=$t?Et:kt?Pt:null,this.invalidConfig?j`
            <ha-card class="ha-card-weather-conditions">
                <div class='banner'>
                    <div class="header">ha-card-weather-conditions</div>
                </div>
                <div class='content'>
                    Configuration ERROR!
                </div>
            </ha-card>
        `:this._render()}_render(){return this.numberElements=0,j`
      <ha-card class="ha-card-weather-conditions">
        ${this._header?j`
            ${this._hasCurrent&&this._displayTop?((t,e,i,s)=>{let n=t.states[e.sun].state,r=e.current_conditions?t.states[e.current_conditions].state:"",o=parseFloat(t.states[e.temperature].state);return j`
      <div class="current">
        <span class="icon bigger" style="background: none,
            url('${yt(r.toLowerCase(),s,n)}') no-repeat ; 
            background-size: contain;">${r}</span>
        ${i?j`<span class="title"> ${i} </span>`:""}
        <span class="temp">${"°F"==ft(t,"temperature")?Math.round(o):o}</span>
        <span class="tempc"> ${ft(t,"temperature")}</span>
      </div>
      `})(this.hass,this._config.weather.current,this._config.name,this._iconsConfig):""}
            ${this._hasCurrent&&this._displayCurrent?bt(this.hass,this._config.weather.current,this._config.weather.forecast,this._language):""}
            ${this._hasAirQuality?((t,e)=>{let i=void 0!==e.pm25?Nt(t.states[e.pm25],"pm25"):void 0,s=void 0!==e.pm10?Nt(t.states[e.pm10],"pm10"):void 0,n=void 0!==e.o3?Nt(t.states[e.o3],"o3"):void 0,r=void 0!==e.no2?Nt(t.states[e.no2],"no2"):void 0,o=void 0!==e.co?Nt(t.states[e.co],"co"):void 0,a=void 0!==e.so2?Nt(t.states[e.so2],"so2"):void 0,l=void 0!==e.epa_aqi?Nt(t.states[e.epa_aqi],"aqi"):void 0,d=void 0!==e.epa_health_concern?Nt(t.states[e.epa_health_concern],"aqi"):void 0;return j`
    <ul class="variations polles">
        ${l||""}${d||""}
        ${i||""}${s||""}${n||""}${r||""}${o||""}${a||""}
    </ul>
  `})(this.hass,this._config.air_quality):""}
            ${this._hasPollen?function(t,e){let i=e.tree&&e.tree.entity?xt(t,e.tree):void 0,s=e.weed&&e.weed.entity?xt(t,e.weed):void 0,n=e.grass&&e.grass.entity?xt(t,e.grass):void 0;return j`
    <ul class="variations polles">
        ${i||""}${s||""}${n||""}
    </ul>
  `}(this.hass,this._config.pollen):""}
            ${this._hasForecast?((t,e,i,s,n)=>{let r=new Date,o=t.states[e.sun].state,a=i.icons?Object.entries(i.icons):void 0,l=i.temperature_high?Object.entries(i.temperature_high):void 0,d=i.temperature_low?Object.entries(i.temperature_low):void 0,c=i.precipitation_probability?Object.entries(i.precipitation_probability):void 0,h=i.precipitation_intensity?Object.entries(i.precipitation_intensity):void 0,p=Math.max(a?a.length:0,l?l.length:0,d?d.length:0,c?c.length:0,h?h.length:0),u=1,m=p>0?Array(p-u).fill(1,0,p-u).map(()=>u++):Array();return p>1?j`
      <div class="forecast clear">
        ${m.map(e=>{let i=new Date(r.setDate(r.getDate()+1)).toLocaleDateString(n,{weekday:"short"}),p=a?t.states[a[e][1]].state.toLowerCase():void 0,u=d?Math.round(parseFloat(t.states[d[e][1]].state)):void 0,m=l?Math.round(parseFloat(t.states[l[e][1]].state)):void 0,g=c?Math.round(parseFloat(t.states[c[e][1]].state)):void 0,_=h?Math.round(parseFloat(t.states[h[e][1]].state)):void 0;return j`
          <div class="day ${e}">
              <div class="dayname">${i}</div>
              ${p?j`
              <i class="icon" style="background: none, url('${yt(p,s,o)}') no-repeat; 
                    background-size: contain"></i>                
              `:""}
              ${St(u,"",m,ft(t,"temperature"))} 
              ${St(g,"%",_,ft(t,"precipitation")+"/h")}                       
          </div>
          `})}
      </div>
    `:j``})(this.hass,this._config.weather.current,this._config.weather.forecast,this._iconsConfig,this._language):""}
            ${this._hasMeteogram?this.renderCamera(this.hass,this._config.weather.forecast.meteogram):""}
            ${this._config.camera?this.renderCamera(this.hass,this._config.camera):""}
        `:j``}
      </ha-card>
    `}renderCamera(t,e){let i=t.states[e],s=i?i.attributes.entity_picture:void 0;return s?j`
        <div @click=${t=>this.handlePopup(t,e)} class="container">
          <div class="mainImage">
            <img src="${s}" alt="${i.attributes.friendly_name}"/>
          </div>
        </div>
      `:j``}handlePopup(t,e){t.stopPropagation();let i=new Event("hass-more-info",{composed:!0});i.detail={entityId:e},this.dispatchEvent(i)}};t([st()],e.prototype,"hass",void 0),t([st()],e.prototype,"_config",void 0),e=t([tt("ha-card-weather-conditions")],e)},2e3);
