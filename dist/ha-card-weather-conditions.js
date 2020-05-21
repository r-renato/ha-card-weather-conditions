function e(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r}const t="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,i=(e,t,i=null)=>{for(;t!==i;){const i=t.nextSibling;e.removeChild(t),t=i}},s=`{{lit-${String(Math.random()).slice(2)}}}`,n=`\x3c!--${s}--\x3e`,o=new RegExp(`${s}|${n}`),r="$lit$";class a{constructor(e,t){this.parts=[],this.element=t;const i=[],n=[],a=document.createTreeWalker(t.content,133,null,!1);let c=0,p=-1,u=0;const{strings:m,values:{length:g}}=e;for(;u<g;){const e=a.nextNode();if(null!==e){if(p++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:i}=t;let s=0;for(let e=0;e<i;e++)l(t[e].name,r)&&s++;for(;s-- >0;){const t=m[u],i=h.exec(t)[2],s=i.toLowerCase()+r,n=e.getAttribute(s);e.removeAttribute(s);const a=n.split(o);this.parts.push({type:"attribute",index:p,name:i,strings:a}),u+=a.length-1}}"TEMPLATE"===e.tagName&&(n.push(e),a.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(s)>=0){const s=e.parentNode,n=t.split(o),a=n.length-1;for(let t=0;t<a;t++){let i,o=n[t];if(""===o)i=d();else{const e=h.exec(o);null!==e&&l(e[2],r)&&(o=o.slice(0,e.index)+e[1]+e[2].slice(0,-r.length)+e[3]),i=document.createTextNode(o)}s.insertBefore(i,e),this.parts.push({type:"node",index:++p})}""===n[a]?(s.insertBefore(d(),e),i.push(e)):e.data=n[a],u+=a}}else if(8===e.nodeType)if(e.data===s){const t=e.parentNode;null!==e.previousSibling&&p!==c||(p++,t.insertBefore(d(),e)),c=p,this.parts.push({type:"node",index:p}),null===e.nextSibling?e.data="":(i.push(e),p--),u++}else{let t=-1;for(;-1!==(t=e.data.indexOf(s,t+1));)this.parts.push({type:"node",index:-1}),u++}}else a.currentNode=n.pop()}for(const e of i)e.parentNode.removeChild(e)}}const l=(e,t)=>{const i=e.length-t.length;return i>=0&&e.slice(i)===t},c=e=>-1!==e.index,d=()=>document.createComment(""),h=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/,p=133;function u(e,t){const{element:{content:i},parts:s}=e,n=document.createTreeWalker(i,p,null,!1);let o=g(s),r=s[o],a=-1,l=0;const c=[];let d=null;for(;n.nextNode();){a++;const e=n.currentNode;for(e.previousSibling===d&&(d=null),t.has(e)&&(c.push(e),null===d&&(d=e)),null!==d&&l++;void 0!==r&&r.index===a;)r.index=null!==d?-1:r.index-l,r=s[o=g(s,o)]}c.forEach(e=>e.parentNode.removeChild(e))}const m=e=>{let t=11===e.nodeType?0:1;const i=document.createTreeWalker(e,p,null,!1);for(;i.nextNode();)t++;return t},g=(e,t=-1)=>{for(let i=t+1;i<e.length;i++){const t=e[i];if(c(t))return i}return-1};const _=new WeakMap,y=e=>"function"==typeof e&&_.has(e),f={},v={};class w{constructor(e,t,i){this.__parts=[],this.template=e,this.processor=t,this.options=i}update(e){let t=0;for(const i of this.__parts)void 0!==i&&i.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=t?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),i=[],s=this.template.parts,n=document.createTreeWalker(e,133,null,!1);let o,r=0,a=0,l=n.nextNode();for(;r<s.length;)if(o=s[r],c(o)){for(;a<o.index;)a++,"TEMPLATE"===l.nodeName&&(i.push(l),n.currentNode=l.content),null===(l=n.nextNode())&&(n.currentNode=i.pop(),l=n.nextNode());if("node"===o.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(l.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,o.name,o.strings,this.options));r++}else this.__parts.push(void 0),r++;return t&&(document.adoptNode(e),customElements.upgrade(e)),e}}const b=` ${s} `;class x{constructor(e,t,i,s){this.strings=e,this.values=t,this.type=i,this.processor=s}getHTML(){const e=this.strings.length-1;let t="",i=!1;for(let o=0;o<e;o++){const e=this.strings[o],a=e.lastIndexOf("\x3c!--");i=(a>-1||i)&&-1===e.indexOf("--\x3e",a+1);const l=h.exec(e);t+=null===l?e+(i?b:n):e.substr(0,l.index)+l[1]+l[2]+r+l[3]+s}return t+=this.strings[e]}getTemplateElement(){const e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}const S=e=>null===e||!("object"==typeof e||"function"==typeof e),N=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class ${constructor(e,t,i){this.dirty=!0,this.element=e,this.name=t,this.strings=i,this.parts=[];for(let e=0;e<i.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new C(this)}_getValue(){const e=this.strings,t=e.length-1;let i="";for(let s=0;s<t;s++){i+=e[s];const t=this.parts[s];if(void 0!==t){const e=t.value;if(S(e)||!N(e))i+="string"==typeof e?e:String(e);else for(const t of e)i+="string"==typeof t?t:String(t)}}return i+=e[t]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class C{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===f||S(e)&&e===this.value||(this.value=e,y(e)||(this.committer.dirty=!0))}commit(){for(;y(this.value);){const e=this.value;this.value=f,e(this)}this.value!==f&&this.committer.commit()}}class E{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(d()),this.endNode=e.appendChild(d())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=d()),e.__insert(this.endNode=d())}insertAfterPart(e){e.__insert(this.startNode=d()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;y(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=f,e(this)}const e=this.__pendingValue;e!==f&&(S(e)?e!==this.value&&this.__commitText(e):e instanceof x?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):N(e)?this.__commitIterable(e):e===v?(this.value=v,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,i="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=i:this.__commitNode(document.createTextNode(i)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof w&&this.value.template===t)this.value.update(e.values);else{const i=new w(t,e.processor,this.options),s=i._clone();i.update(e.values),this.__commitNode(s),this.value=i}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let i,s=0;for(const n of e)void 0===(i=t[s])&&(i=new E(this.options),t.push(i),0===s?i.appendIntoPart(this):i.insertAfterPart(t[s-1])),i.setValue(n),i.commit(),s++;s<t.length&&(t.length=s,this.clear(i&&i.endNode))}clear(e=this.startNode){i(this.startNode.parentNode,e.nextSibling,this.endNode)}}class k{constructor(e,t,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=i}setValue(e){this.__pendingValue=e}commit(){for(;y(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=f,e(this)}if(this.__pendingValue===f)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=f}}class P extends ${constructor(e,t,i){super(e,t,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new O(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class O extends C{}let z=!1;(()=>{try{const e={get capture(){return z=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class T{constructor(e,t,i){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=i,this.__boundHandleEvent=(e=>this.handleEvent(e))}setValue(e){this.__pendingValue=e}commit(){for(;y(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=f,e(this)}if(this.__pendingValue===f)return;const e=this.__pendingValue,t=this.value,i=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),s=null!=e&&(null==t||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),s&&(this.__options=A(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=f}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const A=e=>e&&(z?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);function F(e){let t=W.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},W.set(e.type,t));let i=t.stringsArray.get(e.strings);if(void 0!==i)return i;const n=e.strings.join(s);return void 0===(i=t.keyString.get(n))&&(i=new a(e,e.getTemplateElement()),t.keyString.set(n,i)),t.stringsArray.set(e.strings,i),i}const W=new Map,V=new WeakMap;const M=new class{handleAttributeExpressions(e,t,i,s){const n=t[0];return"."===n?new P(e,t.slice(1),i).parts:"@"===n?[new T(e,t.slice(1),s.eventContext)]:"?"===n?[new k(e,t.slice(1),i)]:new $(e,t,i).parts}handleTextExpression(e){return new E(e)}};"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.2.1");const j=(e,...t)=>new x(e,t,"html",M),U=(e,t)=>`${e}--${t}`;let q=!0;void 0===window.ShadyCSS?q=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),q=!1);const I=e=>t=>{const i=U(t.type,e);let n=W.get(i);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},W.set(i,n));let o=n.stringsArray.get(t.strings);if(void 0!==o)return o;const r=t.strings.join(s);if(void 0===(o=n.keyString.get(r))){const i=t.getTemplateElement();q&&window.ShadyCSS.prepareTemplateDom(i,e),o=new a(t,i),n.keyString.set(r,o)}return n.stringsArray.set(t.strings,o),o},L=["html","svg"],R=new Set,D=(e,t,i)=>{R.add(e);const s=i?i.element:document.createElement("template"),n=t.querySelectorAll("style"),{length:o}=n;if(0===o)return void window.ShadyCSS.prepareTemplateStyles(s,e);const r=document.createElement("style");for(let e=0;e<o;e++){const t=n[e];t.parentNode.removeChild(t),r.textContent+=t.textContent}(e=>{L.forEach(t=>{const i=W.get(U(t,e));void 0!==i&&i.keyString.forEach(e=>{const{element:{content:t}}=e,i=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{i.add(e)}),u(e,i)})})})(e);const a=s.content;i?function(e,t,i=null){const{element:{content:s},parts:n}=e;if(null==i)return void s.appendChild(t);const o=document.createTreeWalker(s,p,null,!1);let r=g(n),a=0,l=-1;for(;o.nextNode();)for(l++,o.currentNode===i&&(a=m(t),i.parentNode.insertBefore(t,i));-1!==r&&n[r].index===l;){if(a>0){for(;-1!==r;)n[r].index+=a,r=g(n,r);return}r=g(n,r)}}(i,r,a.firstChild):a.insertBefore(r,a.firstChild),window.ShadyCSS.prepareTemplateStyles(s,e);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)t.insertBefore(l.cloneNode(!0),t.firstChild);else if(i){a.insertBefore(r,a.firstChild);const e=new Set;e.add(r),u(i,e)}};window.JSCompiler_renameProperty=((e,t)=>e);const B={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},H=(e,t)=>t!==e&&(t==t||e==e),Z={attribute:!0,type:String,converter:B,reflect:!1,hasChanged:H},G=1,Q=4,J=8,K=16,X="finalized";class Y extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=new Promise(e=>this._enableUpdatingResolver=e),this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((t,i)=>{const s=this._attributeNameForProperty(i,t);void 0!==s&&(this._attributeToPropertyMap.set(s,i),e.push(s))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}}static createProperty(e,t=Z){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const i="symbol"==typeof e?Symbol():`__${e}`,s=this.getPropertyDescriptor(e,i,t);void 0!==s&&Object.defineProperty(this.prototype,e,s)}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(i){const s=this[e];this[t]=i,this._requestUpdate(e,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||Z}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty(X)||e.finalize(),this[X]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const i of t)this.createProperty(i,e[i])}}static _attributeNameForProperty(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,i=H){return i(e,t)}static _propertyValueFromAttribute(e,t){const i=t.type,s=t.converter||B,n="function"==typeof s?s:s.fromAttribute;return n?n(e,i):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const i=t.type,s=t.converter;return(s&&s.toAttribute||B.toAttribute)(e,i)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,i){t!==i&&this._attributeToProperty(e,i)}_propertyToAttribute(e,t,i=Z){const s=this.constructor,n=s._attributeNameForProperty(e,i);if(void 0!==n){const e=s._propertyValueToAttribute(t,i);if(void 0===e)return;this._updateState=this._updateState|J,null==e?this.removeAttribute(n):this.setAttribute(n,e),this._updateState=this._updateState&~J}}_attributeToProperty(e,t){if(this._updateState&J)return;const i=this.constructor,s=i._attributeToPropertyMap.get(e);if(void 0!==s){const e=i.getPropertyOptions(s);this._updateState=this._updateState|K,this[s]=i._propertyValueFromAttribute(t,e),this._updateState=this._updateState&~K}}_requestUpdate(e,t){let i=!0;if(void 0!==e){const s=this.constructor,n=s.getPropertyOptions(e);s._valueHasChanged(this[e],t,n.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==n.reflect||this._updateState&K||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,n))):i=!1}!this._hasRequestedUpdate&&i&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this._requestUpdate(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=this._updateState|Q;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return this._updateState&Q}get hasUpdated(){return this._updateState&G}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{(e=this.shouldUpdate(t))?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(this._updateState&G||(this._updateState=this._updateState|G,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~Q}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((e,t)=>this._propertyToAttribute(t,this[t],e)),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}Y[X]=!0;const ee=e=>t=>"function"==typeof t?((e,t)=>(window.customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:i,elements:s}=t;return{kind:i,elements:s,finisher(t){window.customElements.define(e,t)}}})(e,t),te=(e,t)=>"method"!==t.kind||!t.descriptor||"value"in t.descriptor?{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}}:Object.assign(Object.assign({},t),{finisher(i){i.createProperty(t.key,e)}}),ie=(e,t,i)=>{t.constructor.createProperty(i,e)};function se(e){return(t,i)=>void 0!==i?ie(e,t,i):te(e,t)}const ne="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,oe=Symbol();class re{constructor(e,t){if(t!==oe)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(ne?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const ae=(e,...t)=>{const i=t.reduce((t,i,s)=>t+(e=>{if(e instanceof re)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+e[s+1],e[0]);return new re(i,oe)};(window.litElementVersions||(window.litElementVersions=[])).push("2.3.1");const le={};class ce extends Y{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(void 0===e)this._styles=[];else if(Array.isArray(e)){const t=(e,i)=>e.reduceRight((e,i)=>Array.isArray(i)?t(i,e):(e.add(i),e),i),i=t(e,new Set),s=[];i.forEach(e=>s.unshift(e)),this._styles=s}else this._styles=[e]}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?ne?this.renderRoot.adoptedStyleSheets=e.map(e=>e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==le&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){return le}}ce.finalized=!0,ce.render=((e,t,s)=>{if(!s||"object"!=typeof s||!s.scopeName)throw new Error("The `scopeName` option is required.");const n=s.scopeName,o=V.has(t),r=q&&11===t.nodeType&&!!t.host,a=r&&!R.has(n),l=a?document.createDocumentFragment():t;if(((e,t,s)=>{let n=V.get(t);void 0===n&&(i(t,t.firstChild),V.set(t,n=new E(Object.assign({templateFactory:F},s))),n.appendInto(t)),n.setValue(e),n.commit()})(e,l,Object.assign({templateFactory:I(n)},s)),a){const e=V.get(l);V.delete(l);const s=e.value instanceof w?e.value.template:void 0;D(n,l,s),i(t,t.firstChild),t.appendChild(l),V.set(t,e)}!o&&r&&window.ShadyCSS.styleElement(t.host)});const de=ae`
  ha-card {
    cursor: pointer;
    position: relative;
  }
            
.spacer {
  padding-top: 1em;
  border-top: solid 1px var(--primary-text-color);
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
  // border-top: solid 1px var(--primary-text-color);
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
        z-index: 200 ;
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
      
`,he=ae`
  .current {
    padding-top: 1.2em;
    margin-bottom: 3.5em;
  }
  
  .icon.bigger {
    width: 10em;
    height: 10em;
    margin-top: -4em;
    position: absolute;
    left: 0em;
  }
  
  .title {
    position: absolute;
    left: calc(140px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
    top: 0.6em;
    font-weight: 300;
    font-size: calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
    color: var(--primary-text-color);
  }
  .moon {
    position: absolute;
    left: calc(115px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
    top: calc(63px - (26 - 14) * ((100vw - 300px) / (1600 - 300)));
    font-weight: 300;
    font-size: calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
    color: var(--primary-text-color);
    line-height:20px;
    display: inline-block;
  }
            
  .temp {
    position: absolute;
    // top: 0.65em;
    font-weight: 300;
    font-size: calc(49px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
    color: var(--primary-text-color);
    right: 1em;
    margin-top: 2px;
  }

  .tempc {
    position: absolute;
    font-weight: 300;
    font-size: calc(12px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
    // font-size: 1.5em;
    vertical-align: super;
    color: var(--primary-text-color);
    right: 1em;
    margin-top: -11px;
    margin-right: 7px;
  }      
     
`,pe=ae`
  .meter {
    background: #efefef; /* Grigio */
    border-radius: 8px;
    border: 1px solid transparent; /* 2 */
    box-shadow:
      0 1px 3px 1px rgba(0,0,0,0.15) inset,
      0 0 0 1px #333; /* 1 */
    height: .75em;
    max-width: 5.5em;
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

`,ue=ae`
  .day {
    flex: 1;
    display: block;
    text-align: center;
    color: var(--primary-text-color);
    border-right: 0.1em solid #d9d9d9;
    line-height: 2;
    box-sizing: border-box;
        z-index: 200;
  }
  
  .dayname {
    text-transform: uppercase;
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
      
  .forecast {
    width: 100%;
    margin: 0 auto;
    display: flex;
    z-index: 200;
  }
  
  .forecast .day:first-child {
    margin-left: 0;
        z-index: 200;
  }
  
  .forecast .day:nth-last-child(1) {
    border-right: none;
    margin-right: 0;
        z-index: 200;
  }  
`,me=ae`
      .camera-container {
        margin-top: 10px;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: stretch;
        // position: absolute;
        // background: #000;
      } 
      .camera-image {
        flex: 3;
        height: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
      .camera-image > img {
        display: inline-block;
        max-width: 100%;
        max-height: 100%;
      }
`,ge=ae`
  .nd-container {
    margin: auto;
    padding-top: 1.3em;
    padding-bottom: 1.3em;
    padding-left: 1em;
    padding-right: 1em;
    
    position: relative;
    // background: #5C97FF;
    overflow: hidden;
  }
// .ha-card-night:before {
//   content: ' ';
//   display: block;
//   position: absolute;
//   left: 0;
//   top: 0;
//   width: 100%;
//   height: 100%;
//   z-index: 0;
//   opacity: calc(attr(data-opacity));
//   background-image: url('https://raw.githubusercontent.com/tingletech/moon-phase/gh-pages/background.jpg');
//   background-repeat: no-repeat;
//   background-position: 50% 0;
//  
//   -ms-background-size: cover;
//   -o-background-size: cover;
//   -moz-background-size: cover;
//   -webkit-background-size: cover;
//   background-size: cover;
// }
`,_e={freezing_rain_heavy:"rainy-3",freezing_rain:"rainy-2",freezing_rain_light:"rainy-1",freezing_drizzle:"rain-and-sleet-mix",ice_pellets_heavy:"rain-and-snow-mix",ice_pellets:"rain-and-snow-mix",ice_pellets_light:"rain-and-snow-mix",snow_heavy:"snowy-3",snow:"snowy-2",snow_light:"snowy-1",flurries:"wind",tstorm:"tropical-storm",rain_heavy:"rainy-3",rain_light:"rainy-1",rain:"rainy-2",drizzle:"rainy-1",fog_light:"haze",fog:"fog",cloudy:"cloudy-original",mostly_cloudy:"cloudy-day-3",partly_cloudy:"cloudy-day-2",mostly_clear:"cloudy-day-1",clear:"day"},ye=Object.assign(Object.assign({},_e),{freezing_rain_heavy:"rainy-6",freezing_rain:"rainy-5",freezing_rain_light:"rainy-4",snow_heavy:"snowy-6",snow:"nowy-5",snow_light:"nowy-4",rain_heavy:"rainy-6",rain_light:"rainy-4",rain:"rainy-5",drizzle:"rainy-4",mostly_cloudy:"cloudy-night-3",partly_cloudy:"cloudy-night-2",mostly_clear:"cloudy-night-1",clear:"night"}),fe={freezing_rain_heavy:"rainy-3",freezing_rain:"rainy-2",freezing_rain_light:"rainy-1",freezing_drizzle:"rain-and-sleet-mix",ice_pellets_heavy:"rain-and-snow-mix",ice_pellets:"rain-and-snow-mix",ice_pellets_light:"rain-and-snow-mix",snow_heavy:"snowy-3",snow:"snowy-2",snow_light:"snowy-1",flurries:"wind",tstorm:"tropical-storm",rain_heavy:"rainy-3",rain_light:"rainy-1",rain:"rainy-2",drizzle:"rainy-1",fog_light:"haze",fog:"fog",cloudy:"cloudy-original",mostly_cloudy:"day-cloud-3.jpg",partly_cloudy:"day-cloud-2.jpg",mostly_clear:"day-cloud-1.jpg",clear:"day-clear.jpg"},ve={clear:"day","clear-day":"day",rain:"rainy-2",snow:"nowy-2",sleet:"rain-and-sleet-mix",wind:"cloudy-day-1",fog:"fog",cloudy:"cloudy-original","partly-cloudy-day":"cloudy-day-2"},we=Object.assign(Object.assign({},ve),{clear:"night","clear-night":"night",wind:"cloudy-night-1","partly-cloudy-day":"cloudy-night-2","partly-cloudy-night":"cloudy-night-2"}),be={"clear sky":"day","few clouds":"cloudy-day-1","scattered clouds":"cloudy-day-2","broken clouds":"cloudy-day-3","shower rain":"rainy-3",rain:"rainy-2",thunderstorm:"tropical-storm",snow:"nowy-2",mist:"fog"},xe=Object.assign(Object.assign({},be),{"clear sky":"day-night","few clouds":"cloudy-night-1","scattered clouds":"cloudy-night-2","broken clouds":"cloudy-night-3"});let Se={en:0,it:1,nl:2,es:3},Ne={N:["N","N","N","N"],NNE:["NNE","NNE","NNO","NNE"],NE:["NE","NE","NO","NE"],ENE:["ENE","ENE","ONO","ENE"],E:["E","E","O","E"],ESE:["ESE","ESE","OZO","ESE"],SE:["SE","SE","ZO","SE"],SSE:["SSE","SSE","ZZO","SSE"],S:["S","S","Z","S"],SSW:["SSW","SSO","ZZW","SSO"],SW:["SW","SO","ZW","SO"],WSW:["WSW","OSO","WZW","OSO"],W:["W","O","W","O"],WNW:["WNW","ONO","WNW","ONO"],NW:["NW","NO","NW","NO"],NNW:["NNW","NNO","NNW","NNO"]},$e={"Feels Like":["Feels Like","Percepita","Voelt Als","Parece que"],new_moon:["New moon","Novilunio","Nieuwe maan","Luna nueva"],new:["New moon","Novilunio","Nieuwe maan","Luna nueva"],waxing_crescent:["Waxing crescent","Luna crescente","Wassende sikkel","Media luna de cera"],first_quarter:["First quarter","Primo Quarto","Eerste kwartaal","Primer trimestre"],waxing_gibbous:["Waxing Gibbous","Gibbosa crescente","Wassen Gibbous","Encerado Gibbous"],full:["Full","Luna piena","Volledig","Completo"],waning_gibbous:["Waning Gibbous","Gibbosa calante","Zwemmende Gibbous","Waning Gibbous"],third_quarter:["Third Quarter","Ultimo quarto","Derde Kwartier","Tercer cuarto"],last_quarter:["Last Quarter","Ultimo quarto","Laatste Kwartier","Último cuarto"],waning_crescent:["Waning Crescent","Luna calante","Zwemmende sikkel","Waning Crescent"]},Ce={new_moon:"🌑",new:"🌑",waxing_crescent:"🌒",first_quarter:"🌓",waxing_gibbous:"🌔",full:"🌕",waning_gibbous:"🌖",third_quarter:"🌗",last_quarter:"🌗",waning_crescent:"🌘"};function Ee(e){return new Promise(t=>{setTimeout(()=>{let i=new Image;i.onload=(()=>{t(!0)}),i.onerror=(()=>{t(!1)}),i.src=e},100)})}const ke=(e,t)=>$e[e]?$e[e][Se[t]]:"ERR",Pe=(e,t,i)=>{let s=i&&"below_horizon"==i,n=s?t.iconsNight[e]:t.iconsDay[e];return null==t.path&&console.info("Image path not found. (hacsImagePathExist="+De+")(manImagePathExist="+Be),void 0===n&&console.info("Icons issue. States: icons_model="+t.icons_model+" - isDay="+!s+" - condition: "+e+"."),`${t.path}/${t.iconType}/${n}.svg`},Oe=(e,t)=>{const i=e.config.unit_system.length;switch(t){case"air_pressure":return"km"===i?"hPa":"inHg";case"length":return i;case"precipitation":return"km"===i?"mm":"in";default:return e.config.unit_system[t]||""}};const ze=(e,t,i,s,n)=>{let o,r,a=t.sun&&e.states[t.sun]?e.states[t.sun].state:void 0,l=t.moon_phase&&e.states[t.moon_phase]?e.states[t.moon_phase].state:void 0,c=l?function(e){return Ce[e.toLowerCase()]}(l):void 0,d=t.current_conditions&&e.states[t.current_conditions]?e.states[t.current_conditions].state:"Na";return o=t.temperature&&e.states[t.temperature]?"°F"==Oe(e,"temperature")?Math.round(parseFloat(e.states[t.temperature].state)):parseFloat(e.states[t.temperature].state):"Na",r=t.feels_like&&e.states[t.feels_like]?"F"==e.states[t.feels_like].attributes.unit_of_measurement?Math.round(parseFloat(e.states[t.feels_like].state)):parseFloat(e.states[t.feels_like].state):"Na",j`
      <div class="current">
        <span class="icon bigger" style="background: none,
            url('${Pe(d.toLowerCase(),s,a)}') no-repeat ; 
            background-size: contain;">${d}</span>
        ${i?j`<span class="title"> ${i} </span>`:""}
        ${l?j`<span class="moon"> ${c} <span style="font-size: 70%">${ke(l,n)}</span></spa>`:""}
        ${"Na"!==o?j`
          <span class="temp">${o}</span>
          <span class="tempc"> ${Oe(e,"temperature")}</span>
        `:""}
      </div>
      ${"Na"!==r?j`
        <ul class="variations polles" style="border: 0;margin-top: 4px;">
          <li><ha-icon icon="none"></ha-icon><span class="unit"></span></li>
          <li>
            <ha-icon icon="${e.states[t.feels_like].attributes.icon}"></ha-icon>${ke("Feels Like",n)} ${r}
            <span class="unit"> ${Oe(e,"temperature")}</span>
          </li>
        </ul>      
      `:""}
   `},Te=(e,t,i,s,n)=>void 0!==e||void 0!==i?j`
    <li>
      <ha-icon icon="${n}"></ha-icon>${void 0!==e?e:"Na"} ${t} /
          <b>${void 0!==i?i:"Na"} ${s}</b>
    </li>
  `:"",Ae=(e,t,i)=>j`
    <li>
      <ha-icon icon="${i}"></ha-icon>${void 0!==e?e:"Na"} ${t}
    </li>
  `,Fe=(e,t,i,s,n)=>{let o,r,a,l,c,d;const h=s||e.selectedLanguage||e.language;let p=t.sun?e.states[t.sun]:void 0;if(p&&(c=new Date(p.attributes.next_rising),d=new Date(p.attributes.next_setting)),t.forecast){let t=i.temperature_high?Object.entries(i.temperature_high):void 0,s=i.temperature_low?Object.entries(i.temperature_low):void 0,n=i.precipitation_probability?Object.entries(i.precipitation_probability):void 0,c=i.precipitation_intensity?Object.entries(i.precipitation_intensity):void 0;o=t?Math.round(parseFloat(e.states[t[0][1]].state)):void 0,r=s?Math.round(parseFloat(e.states[s[0][1]].state)):void 0,a=n?Math.round(parseFloat(e.states[n[0][1]].state)):void 0,l=c?Math.round(parseFloat(e.states[c[0][1]].state)):void 0}let u=t.precipitation?Math.round(parseFloat(e.states[t.precipitation].state)):void 0,m=t.humidity?parseFloat(e.states[t.humidity].state):void 0,g=t.wind_bearing?parseFloat(e.states[t.wind_bearing].state):void 0,_=t.wind_speed?Math.round(10*parseFloat(e.states[t.wind_speed].state))/10:void 0,y=t.pressure?Math.round(parseFloat(e.states[t.pressure].state)):void 0,f=t.visibility?Math.round(parseFloat(e.states[t.visibility].state)):void 0;return j`
    <ul class="variations ${n?"spacer":""}">
        ${void 0!==typeof a||void 0!==typeof l?Te(a,"%",l,Oe(e,"precipitation")+"/h","mdi:weather-rainy"):""}
        ${!t.forecast||void 0===r&&void 0===o?"":Te(r,"",o,Oe(e,"temperature"),"mdi:thermometer")}
        ${void 0!==u&&u>0?j`
          <li>
            <ha-icon icon="mdi:weather-rainy"></ha-icon>${u}
            <span class="unit"> ${Oe(e,"precipitation")}/h</span>
          </li>
          <li><ha-icon icon="none"></ha-icon><span class="unit"></span></li>
        `:""}            
        ${void 0!==y?Ae(y,Oe(e,"air_pressure"),"mdi:gauge"):""}
        ${void 0!==m?Ae(m,"%","mdi:water-percent"):""}
        ${void 0!==f?Ae(f,Oe(e,"length"),"mdi:weather-fog"):""}
        ${_||g?j`
          <li>
            <ha-icon icon="mdi:weather-windy"></ha-icon> ${((e,t)=>e<0||e>360?(console.log("Enter a degree between 0 and 360 degrees."),null):e>=0&&e<=11.25?Ne.N[Se[t]]:e>348.75&&e<=360?Ne.N[Se[t]]:e>11.25&&e<=33.75?Ne.NNE[Se[t]]:e>33.75&&e<=56.25?Ne.NE[Se[t]]:e>56.25&&e<=78.75?Ne.ENE[Se[t]]:e>78.75&&e<=101.25?Ne.E[Se[t]]:e>101.25&&e<=123.75?Ne.ESE[Se[t]]:e>123.75&&e<=146.25?Ne.SE[Se[t]]:e>146.25&&e<=168.75?Ne.SSE[Se[t]]:e>168.75&&e<=191.25?Ne.S[Se[t]]:e>191.25&&e<=213.75?Ne.SSW[Se[t]]:e>213.75&&e<=236.25?Ne.SW[Se[t]]:e>236.25&&e<=258.75?Ne.WSW[Se[t]]:e>258.75&&e<=281.25?Ne.W[Se[t]]:e>281.25&&e<=303.75?Ne.WNW[Se[t]]:e>303.75&&e<=326.25?Ne.NW[Se[t]]:e>326.25&&e<=348.75?Ne.NNW[Se[t]]:null)(g,h)} ${_}
            <span class="unit">${Oe(e,"length")}/h</span>
          </li>
        `:""}        
        ${void 0!==c?Ae(c.toLocaleTimeString(),"","mdi:weather-sunset-up"):""}               
        ${void 0!==d?Ae(d.toLocaleTimeString(),"","mdi:weather-sunset-down"):""}           
    </ul>
  `},We=(e,t,i,s)=>null==e&&null==i?j``:null==e?j`
            <div class="highTemp">
              <b>${i}</b> ${s}
            </div>   
      `:null==i?j`
            <div class="lowTemp">
              ${e} ${t}
            </div>  
      `:j`
            <div class="highTemp">
              ${e} ${t} / <b>${i} ${s}</b>
            </div>
      `,Ve=(e,t)=>{let i=e.states[t.entity],s=void 0!==t.min?t.min:0,n=void 0!==t.max?t.max:5,o=void 0!==t.low?t.low:s,r=void 0!==t.high?t.high:n,a=0==s?1:0;return i?j`
     <li>
       <ha-icon icon="${i.attributes.icon}"></ha-icon>
       <meter class="meter" value="${parseInt(i.state)+a}" optimum="${(r-o)/2}"
            min="${s}" max="${n+a}" low="${o+a}" high="${r+a}">${i.state}/${n}</meter>
     </li>
  `:""};const Me=(e,t)=>e?j`
    <li>
      <svg viewBox="0 0 24 15" width="24" height="15" xmlns="http://www.w3.org/2000/svg">
        <style>.small {font: 8px sans-serif;}</style>
        <text x="0" y="14" class="small">${t}</text>
      </svg>${e.state} ${e.attributes.unit_of_measurement?e.attributes.unit_of_measurement:""}
    </li>    
  `:"",je=["I","II","III","IV","V","VI"],Ue=["#F1D1B1","#E4B590","#CF9F7D","#B67851","#A15E2D","#513938"],qe=(e,t,i)=>{let s=i?Math.round(parseFloat(e.state)):e.state;return e?j`
    <li>
        <ha-icon icon="${t}"></ha-icon>${s} ${e.attributes.unit_of_measurement?e.attributes.unit_of_measurement:""}
    </li>    
  `:""},Ie=(e,t,i)=>{let s=void 0!==t.protection_window&&e.states[t.protection_window]?qe(e.states[t.protection_window],"mdi:sunglasses",!1):void 0,n=void 0!==t.uv_level&&e.states[t.uv_level]?qe(e.states[t.uv_level],"mdi:weather-sunny",!1):void 0,o=((e,t,i)=>{let s=Math.round(10*parseFloat(e.state))/10,n=Math.round(10*parseFloat(t.state))/10;return e||t?j`
    <li>
        <ha-icon icon="${i}"></ha-icon>${s} / <b>${n}</b>
        ${e.attributes.unit_of_measurement?e.attributes.unit_of_measurement:""}
    </li>    
  `:""})(e.states[t.uv_index],e.states[t.max_uv_index],"mdi:weather-sunny"),r=void 0!==t.ozone_level&&e.states[t.ozone_level]?qe(e.states[t.ozone_level],"mdi:vector-triangle",!0):void 0;return j`
    <ul class="variations ${i?"spacer":""}">
        ${n||""}${s||""}
        ${o||""}${r||""}
    </ul>
    <div class="forecast clear" style="margin-top:  4px; margin-bottom: 4px;">
    ${[1,2,3,4,5,6].map(i=>{let s=t["set_skin_type_"+i],n=s&&e.states[s]?e.states[s]:void 0;return n?j`
        <div class="day ${i}">
            <div id="rectangle" style="color: black; background: ${Ue[i-1]};width:32px;height:32px;display: table;margin: 0 auto;">${je[i-1]}</div>
            <div class="lowTemp">
              ${Math.trunc(parseInt(n.state)/60)} h
            </div>  
        </div>
      `:""})}
    </div>
  `},Le="/local/community/ha-card-weather-conditions/icons",Re="/local/ha-card-weather-conditions/icons";let De=!1,Be=!1,He="%c WEATHER-CONDITION-CARD %c 1.5.1",Ze="color: white; background: green; font-weight: 700;",Ge="color: green; background: white; font-weight: 700;",Qe="color: black; background: white; font-weight: 700;";console.info(He,Ze,Ge),Promise.all([Ee(Le+"/static/cloudy.svg"),Ee(Re+"/static/cloudy.svg")]).then(t=>{let i,s;i=De=t[0],s=Be=t[1],i?console.info(He+"%c use HACS path to retrieve icons.",Ze,Ge,Qe):s?console.info(He+"%c use www root path to retrieve icons.",Ze,Ge,Qe):console.info(He+"%c error setting right icons path.",Ze,Ge,Qe);let n=class extends ce{constructor(){super(...arguments),this._iconsConfig=new class{},this._bgConfig=new class{},this.invalidConfig=!1,this.numberElements=0,this._header=!0,this._name="",this._hasCurrent=!1,this._hasForecast=!1,this._hasMeteogram=!1,this._hasAirQuality=!1,this._hasPollen=!1,this._hasUv=!1,this._displayTop=!0,this._displayCurrent=!0,this._displayForecast=!0,this._showSummary=!0,this._showPresent=!0,this._showUv=!0,this._showAirQuality=!0,this._showPollen=!0,this._showForecast=!0}setConfig(e){if(console.log({card_config:e}),!e)throw this.invalidConfig=!0,new Error("Invalid configuration");if(e.name&&e.name.length>0&&(this._name=e.name),e.language&&e.language.length>0?this._language=e.language.toLowerCase():this._language="en",void 0!==e.display&&(this._displayTop=e.display.findIndex(e=>"top"===e.toLowerCase())>=0,this._displayCurrent=e.display.findIndex(e=>"current"===e.toLowerCase())>=0,this._displayForecast=e.display.findIndex(e=>"forecast"===e.toLowerCase())>=0),this._hasCurrent=!!e.weather&&!!e.weather.current,this._hasForecast=!!e.weather&&!!e.weather.forecast,this._hasMeteogram=this._hasForecast&&!!e.weather.forecast.meteogram,this._hasAirQuality=!!e.air_quality,this._hasPollen=!(!e.pollen||!e.pollen.tree&&!e.pollen.weed&&!e.pollen.grass),this._hasUv=!!e.uv,this._bgConfig.path=i?Le:s?Re:null,this._bgConfig.iconsDay=fe,this._bgConfig.icons_model="climacell",this._iconsConfig.path=i?Le:s?Re:null,this._iconsConfig.iconType=e.animation?"animated":"static",this._iconsConfig.iconsDay=_e,this._iconsConfig.iconsNight=ye,this._iconsConfig.icons_model="climacell",e.weather&&e.weather.icons_model)switch(e.weather.icons_model.toLowerCase()){case"darksky":this._iconsConfig.iconsDay=ve,this._iconsConfig.iconsNight=we,this._iconsConfig.icons_model="darksky";break;case"openweathermap":this._iconsConfig.iconsDay=be,this._iconsConfig.iconsNight=xe,this._iconsConfig.icons_model="openweathermap"}this._config=e}getCardSize(){return 1}static get styles(){return ae`${de}${he}${ue}${pe}${me}${ge}`}render(){return this.invalidConfig?j`
            <ha-card class="ha-card-weather-conditions">
                <div class='banner'>
                    <div class="header">ha-card-weather-conditions</div>
                </div>
                <div class='content'>
                    Configuration ERROR!
                </div>
            </ha-card>
        `:this._render()}_render(){let e,t,i,s,n,o,r=0,a=this.hass.states;if(this._showSummary&&this._hasCurrent){let t=this._config.weather.current;t.current_conditions&&void 0!==typeof a[t.current_conditions]||t.temperature&&void 0!==typeof a[t.temperature]?(e=ze(this.hass,this._config.weather.current,this._config.name,this._iconsConfig,this._language),r++):e=""}else e="";if(this._showPresent&&this._hasCurrent){let e=this._config.weather.current;if(e.sun&&void 0!==typeof a[e.sun]||e.humidity&&void 0!==typeof a[e.humidity]||e.pressure&&void 0!==typeof a[e.pressure]||e.visibility&&void 0!==typeof a[e.visibility]||e.wind_bearing&&void 0!==typeof a[e.wind_bearing]||e.wind_speed&&void 0!==typeof a[e.wind_speed])t=Fe(this.hass,this._config.weather.current,this._config.weather.forecast,this._language,r>0),r++;else if(e.forecast&&this._hasForecast){let e=this._config.weather.forecast;e.temperature_low&&e.temperature_low.day_1&&void 0!==typeof a[e.temperature_low.day_1]||e.temperature_high&&e.temperature_high.day_1&&void 0!==typeof a[e.temperature_high.day_1]||e.precipitation_intensity&&e.precipitation_intensity.day_1&&void 0!==typeof a[e.precipitation_intensity.day_1]||e.precipitation_probability&&e.precipitation_probability.day_1&&void 0!==typeof a[e.precipitation_probability.day_1]?(t=Fe(this.hass,this._config.weather.current,this._config.weather.forecast,this._language,r>0),r++):t=""}else t=""}else t="";if(this._showAirQuality&&this._hasAirQuality){let e=this._config.air_quality;e.co&&void 0!==typeof a[e.co]||e.epa_aqi&&void 0!==typeof a[e.epa_aqi]||e.epa_health_concern&&void 0!==typeof a[e.epa_health_concern]||e.no2&&void 0!==typeof a[e.no2]||e.o3&&void 0!==typeof a[e.o3]||e.pm10&&void 0!==typeof a[e.pm10]||e.pm25&&void 0!==typeof a[e.pm25]||e.so2&&void 0!==typeof a[e.so2]?(s=((e,t,i)=>{let s=void 0!==t.pm25?Me(e.states[t.pm25],"pm25"):void 0,n=void 0!==t.pm10?Me(e.states[t.pm10],"pm10"):void 0,o=void 0!==t.o3?Me(e.states[t.o3],"o3"):void 0,r=void 0!==t.no2?Me(e.states[t.no2],"no2"):void 0,a=void 0!==t.co?Me(e.states[t.co],"co"):void 0,l=void 0!==t.so2?Me(e.states[t.so2],"so2"):void 0,c=void 0!==t.epa_aqi?Me(e.states[t.epa_aqi],"aqi"):void 0,d=void 0!==t.epa_health_concern?Me(e.states[t.epa_health_concern],"aqi"):void 0;return j`
    <ul class="variations ${i?"spacer":""}">
        ${c||""}${d||""}
        ${s||""}${n||""}${o||""}${r||""}${a||""}${l||""}
    </ul>
  `})(this.hass,this._config.air_quality,r>0),r++):s=""}else s="";if(this._showUv&&this._hasUv){let e=this._config.uv;e.protection_window&&void 0!==typeof a[e.protection_window]||e.ozone_level&&void 0!==typeof a[e.ozone_level]||e.uv_index&&void 0!==typeof a[e.uv_index]||e.uv_level&&void 0!==typeof a[e.uv_level]||e.max_uv_index&&void 0!==typeof a[e.max_uv_index]?(i=Ie(this.hass,this._config.uv,r>0),r++):i=""}else i="";if(this._showPollen&&this._hasPollen){let e=this._config.pollen;e.grass&&e.grass.entity&&void 0!==typeof a[e.grass.entity]||e.tree&&e.tree.entity&&void 0!==typeof a[e.tree.entity]||e.weed&&e.weed.entity&&void 0!==typeof a[e.weed.entity]?(n=function(e,t,i){let s=t.tree&&t.tree.entity?Ve(e,t.tree):void 0,n=t.weed&&t.weed.entity?Ve(e,t.weed):void 0,o=t.grass&&t.grass.entity?Ve(e,t.grass):void 0;return j`
    <ul class="variations polles ${i?"spacer":""}">
        ${s||""}${n||""}${o||""}
    </ul>
  `}(this.hass,this._config.pollen,r>0),r++):n=""}else n="";if(this._showForecast&&this._hasForecast){let e=this._config.weather.forecast;o=((e,t,i,s,n,o)=>{let r=new Date,a=t.sun&&e.states[t.sun]?e.states[t.sun].state:void 0,l=i.icons?Object.entries(i.icons):void 0,c=i.temperature_high?Object.entries(i.temperature_high):void 0,d=i.temperature_low?Object.entries(i.temperature_low):void 0,h=i.precipitation_probability?Object.entries(i.precipitation_probability):void 0,p=i.precipitation_intensity?Object.entries(i.precipitation_intensity):void 0,u=Math.max(l?l.length:0,c?c.length:0,d?d.length:0,h?h.length:0,p?p.length:0),m=1,g=u>0?Array(u-m).fill(1,0,u-m).map(()=>m++):Array();return u>1?j`
      <div class="forecast clear ${o?"spacer":""}">
        ${g.map(t=>{let i,o,u,m,g,_=new Date(r.setDate(r.getDate()+1)).toLocaleDateString(n,{weekday:"short"});return l&&l[t]&&e.states[l[t][1]]&&(i=e.states[l[t][1]].state.toLowerCase()),d&&d[t]&&e.states[d[t][1]]&&(o=Math.round(parseFloat(e.states[d[t][1]].state))),c&&c[t]&&e.states[c[t][1]]&&(u=Math.round(parseFloat(e.states[c[t][1]].state))),h&&h[t]&&e.states[h[t][1]]&&(m=Math.round(parseFloat(e.states[h[t][1]].state))),p&&p[t]&&e.states[p[t][1]]&&(g=Math.round(parseFloat(e.states[p[t][1]].state))),j`
          <div class="day ${t}">
              <div class="dayname">${_}</div>
              ${i?j`
              <i class="icon" style="background: none, url('${Pe(i,s,a)}') no-repeat; 
                    background-size: contain"></i>                
              `:""}
              ${We(o,"",u,Oe(e,"temperature"))} 
              ${We(m,"%",g,Oe(e,"precipitation")+"/h")}                       
          </div>
          `})}
      </div>
    `:j``})(this.hass,this._config.weather.current,e,this._iconsConfig,this._language,r>0),r++}else o="";return j`
      ${""}
      
      <ha-card class="ha-card-weather-conditions ">
        <div class="nd-container ${""}">
        ${this._header?j`
            ${e}
            ${t}
            ${i}
            ${s}
            ${n}
            ${o}
            ${this._hasMeteogram?this.renderCamera(this.hass,this._config.weather.forecast.meteogram):""}
            ${this._config.camera?this.renderCamera(this.hass,this._config.camera):""}
        `:j``}
        </div>
      </ha-card>
    `}renderCamera(e,t){let i=e.states[t],s=i?i.attributes.entity_picture:void 0;return s?j`
        <div @click=${e=>this.handlePopup(e,t)} class="camera-container">
          <div class="camera-image">
            <img src="${s}" alt="${i.attributes.friendly_name}"/>
          </div>
        </div>
      `:j``}handlePopup(e,t){e.stopPropagation();let i=new Event("hass-more-info",{composed:!0});i.detail={entityId:t},this.dispatchEvent(i)}};e([se()],n.prototype,"hass",void 0),e([se()],n.prototype,"_config",void 0),n=e([ee("ha-card-weather-conditions")],n)});export{De as hacsImagePathExist,Be as manImagePathExist};
