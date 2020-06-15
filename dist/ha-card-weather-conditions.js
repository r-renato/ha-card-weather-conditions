function t(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r}const e="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,i=(t,e,i=null)=>{for(;e!==i;){const i=e.nextSibling;t.removeChild(e),e=i}},s=`{{lit-${String(Math.random()).slice(2)}}}`,n=`\x3c!--${s}--\x3e`,o=new RegExp(`${s}|${n}`),r="$lit$";class a{constructor(t,e){this.parts=[],this.element=e;const i=[],n=[],a=document.createTreeWalker(e.content,133,null,!1);let c=0,p=-1,u=0;const{strings:m,values:{length:g}}=t;for(;u<g;){const t=a.nextNode();if(null!==t){if(p++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:i}=e;let s=0;for(let t=0;t<i;t++)l(e[t].name,r)&&s++;for(;s-- >0;){const e=m[u],i=h.exec(e)[2],s=i.toLowerCase()+r,n=t.getAttribute(s);t.removeAttribute(s);const a=n.split(o);this.parts.push({type:"attribute",index:p,name:i,strings:a}),u+=a.length-1}}"TEMPLATE"===t.tagName&&(n.push(t),a.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(s)>=0){const s=t.parentNode,n=e.split(o),a=n.length-1;for(let e=0;e<a;e++){let i,o=n[e];if(""===o)i=d();else{const t=h.exec(o);null!==t&&l(t[2],r)&&(o=o.slice(0,t.index)+t[1]+t[2].slice(0,-r.length)+t[3]),i=document.createTextNode(o)}s.insertBefore(i,t),this.parts.push({type:"node",index:++p})}""===n[a]?(s.insertBefore(d(),t),i.push(t)):t.data=n[a],u+=a}}else if(8===t.nodeType)if(t.data===s){const e=t.parentNode;null!==t.previousSibling&&p!==c||(p++,e.insertBefore(d(),t)),c=p,this.parts.push({type:"node",index:p}),null===t.nextSibling?t.data="":(i.push(t),p--),u++}else{let e=-1;for(;-1!==(e=t.data.indexOf(s,e+1));)this.parts.push({type:"node",index:-1}),u++}}else a.currentNode=n.pop()}for(const t of i)t.parentNode.removeChild(t)}}const l=(t,e)=>{const i=t.length-e.length;return i>=0&&t.slice(i)===e},c=t=>-1!==t.index,d=()=>document.createComment(""),h=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/,p=133;function u(t,e){const{element:{content:i},parts:s}=t,n=document.createTreeWalker(i,p,null,!1);let o=g(s),r=s[o],a=-1,l=0;const c=[];let d=null;for(;n.nextNode();){a++;const t=n.currentNode;for(t.previousSibling===d&&(d=null),e.has(t)&&(c.push(t),null===d&&(d=t)),null!==d&&l++;void 0!==r&&r.index===a;)r.index=null!==d?-1:r.index-l,r=s[o=g(s,o)]}c.forEach(t=>t.parentNode.removeChild(t))}const m=t=>{let e=11===t.nodeType?0:1;const i=document.createTreeWalker(t,p,null,!1);for(;i.nextNode();)e++;return e},g=(t,e=-1)=>{for(let i=e+1;i<t.length;i++){const e=t[i];if(c(e))return i}return-1};const _=new WeakMap,y=t=>"function"==typeof t&&_.has(t),f={},v={};class w{constructor(t,e,i){this.__parts=[],this.template=t,this.processor=e,this.options=i}update(t){let e=0;for(const i of this.__parts)void 0!==i&&i.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=e?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),i=[],s=this.template.parts,n=document.createTreeWalker(t,133,null,!1);let o,r=0,a=0,l=n.nextNode();for(;r<s.length;)if(o=s[r],c(o)){for(;a<o.index;)a++,"TEMPLATE"===l.nodeName&&(i.push(l),n.currentNode=l.content),null===(l=n.nextNode())&&(n.currentNode=i.pop(),l=n.nextNode());if("node"===o.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(l.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,o.name,o.strings,this.options));r++}else this.__parts.push(void 0),r++;return e&&(document.adoptNode(t),customElements.upgrade(t)),t}}const b=` ${s} `;class x{constructor(t,e,i,s){this.strings=t,this.values=e,this.type=i,this.processor=s}getHTML(){const t=this.strings.length-1;let e="",i=!1;for(let o=0;o<t;o++){const t=this.strings[o],a=t.lastIndexOf("\x3c!--");i=(a>-1||i)&&-1===t.indexOf("--\x3e",a+1);const l=h.exec(t);e+=null===l?t+(i?b:n):t.substr(0,l.index)+l[1]+l[2]+r+l[3]+s}return e+=this.strings[t]}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}const S=t=>null===t||!("object"==typeof t||"function"==typeof t),$=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class C{constructor(t,e,i){this.dirty=!0,this.element=t,this.name=e,this.strings=i,this.parts=[];for(let t=0;t<i.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new P(this)}_getValue(){const t=this.strings,e=t.length-1;let i="";for(let s=0;s<e;s++){i+=t[s];const e=this.parts[s];if(void 0!==e){const t=e.value;if(S(t)||!$(t))i+="string"==typeof t?t:String(t);else for(const e of t)i+="string"==typeof e?e:String(e)}}return i+=t[e]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class P{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===f||S(t)&&t===this.value||(this.value=t,y(t)||(this.committer.dirty=!0))}commit(){for(;y(this.value);){const t=this.value;this.value=f,t(this)}this.value!==f&&this.committer.commit()}}class k{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(d()),this.endNode=t.appendChild(d())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=d()),t.__insert(this.endNode=d())}insertAfterPart(t){t.__insert(this.startNode=d()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;y(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=f,t(this)}const t=this.__pendingValue;t!==f&&(S(t)?t!==this.value&&this.__commitText(t):t instanceof x?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):$(t)?this.__commitIterable(t):t===v?(this.value=v,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,i="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=i:this.__commitNode(document.createTextNode(i)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof w&&this.value.template===e)this.value.update(t.values);else{const i=new w(e,t.processor,this.options),s=i._clone();i.update(t.values),this.__commitNode(s),this.value=i}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let i,s=0;for(const n of t)void 0===(i=e[s])&&(i=new k(this.options),e.push(i),0===s?i.appendIntoPart(this):i.insertAfterPart(e[s-1])),i.setValue(n),i.commit(),s++;s<e.length&&(e.length=s,this.clear(i&&i.endNode))}clear(t=this.startNode){i(this.startNode.parentNode,t.nextSibling,this.endNode)}}class N{constructor(t,e,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=i}setValue(t){this.__pendingValue=t}commit(){for(;y(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=f,t(this)}if(this.__pendingValue===f)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=f}}class E extends C{constructor(t,e,i){super(t,e,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new T(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class T extends P{}let A=!1;(()=>{try{const t={get capture(){return A=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class z{constructor(t,e,i){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=i,this.__boundHandleEvent=(t=>this.handleEvent(t))}setValue(t){this.__pendingValue=t}commit(){for(;y(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=f,t(this)}if(this.__pendingValue===f)return;const t=this.__pendingValue,e=this.value,i=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),s=null!=t&&(null==e||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),s&&(this.__options=O(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=f}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const O=t=>t&&(A?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);function j(t){let e=V.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},V.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const n=t.strings.join(s);return void 0===(i=e.keyString.get(n))&&(i=new a(t,t.getTemplateElement()),e.keyString.set(n,i)),e.stringsArray.set(t.strings,i),i}const V=new Map,F=new WeakMap;const I=new class{handleAttributeExpressions(t,e,i,s){const n=e[0];return"."===n?new E(t,e.slice(1),i).parts:"@"===n?[new z(t,e.slice(1),s.eventContext)]:"?"===n?[new N(t,e.slice(1),i)]:new C(t,e,i).parts}handleTextExpression(t){return new k(t)}};"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.2.1");const U=(t,...e)=>new x(t,e,"html",I),M=(t,e)=>`${t}--${e}`;let R=!0;void 0===window.ShadyCSS?R=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),R=!1);const D=t=>e=>{const i=M(e.type,t);let n=V.get(i);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},V.set(i,n));let o=n.stringsArray.get(e.strings);if(void 0!==o)return o;const r=e.strings.join(s);if(void 0===(o=n.keyString.get(r))){const i=e.getTemplateElement();R&&window.ShadyCSS.prepareTemplateDom(i,t),o=new a(e,i),n.keyString.set(r,o)}return n.stringsArray.set(e.strings,o),o},q=["html","svg"],L=new Set,W=(t,e,i)=>{L.add(t);const s=i?i.element:document.createElement("template"),n=e.querySelectorAll("style"),{length:o}=n;if(0===o)return void window.ShadyCSS.prepareTemplateStyles(s,t);const r=document.createElement("style");for(let t=0;t<o;t++){const e=n[t];e.parentNode.removeChild(e),r.textContent+=e.textContent}(t=>{q.forEach(e=>{const i=V.get(M(e,t));void 0!==i&&i.keyString.forEach(t=>{const{element:{content:e}}=t,i=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{i.add(t)}),u(t,i)})})})(t);const a=s.content;i?function(t,e,i=null){const{element:{content:s},parts:n}=t;if(null==i)return void s.appendChild(e);const o=document.createTreeWalker(s,p,null,!1);let r=g(n),a=0,l=-1;for(;o.nextNode();)for(l++,o.currentNode===i&&(a=m(e),i.parentNode.insertBefore(e,i));-1!==r&&n[r].index===l;){if(a>0){for(;-1!==r;)n[r].index+=a,r=g(n,r);return}r=g(n,r)}}(i,r,a.firstChild):a.insertBefore(r,a.firstChild),window.ShadyCSS.prepareTemplateStyles(s,t);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)e.insertBefore(l.cloneNode(!0),e.firstChild);else if(i){a.insertBefore(r,a.firstChild);const t=new Set;t.add(r),u(i,t)}};window.JSCompiler_renameProperty=((t,e)=>t);const B={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},H=(t,e)=>e!==t&&(e==e||t==t),J={attribute:!0,type:String,converter:B,reflect:!1,hasChanged:H},Q=1,G=4,K=8,X=16,Y="finalized";class Z extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=new Promise(t=>this._enableUpdatingResolver=t),this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,i)=>{const s=this._attributeNameForProperty(i,e);void 0!==s&&(this._attributeToPropertyMap.set(s,i),t.push(s))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=J){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const i="symbol"==typeof t?Symbol():`__${t}`,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(i){const s=this[t];this[e]=i,this._requestUpdate(t,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||J}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty(Y)||t.finalize(),this[Y]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const i of e)this.createProperty(i,t[i])}}static _attributeNameForProperty(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,i=H){return i(t,e)}static _propertyValueFromAttribute(t,e){const i=e.type,s=e.converter||B,n="function"==typeof s?s:s.fromAttribute;return n?n(t,i):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const i=e.type,s=e.converter;return(s&&s.toAttribute||B.toAttribute)(t,i)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,i){e!==i&&this._attributeToProperty(t,i)}_propertyToAttribute(t,e,i=J){const s=this.constructor,n=s._attributeNameForProperty(t,i);if(void 0!==n){const t=s._propertyValueToAttribute(e,i);if(void 0===t)return;this._updateState=this._updateState|K,null==t?this.removeAttribute(n):this.setAttribute(n,t),this._updateState=this._updateState&~K}}_attributeToProperty(t,e){if(this._updateState&K)return;const i=this.constructor,s=i._attributeToPropertyMap.get(t);if(void 0!==s){const t=i.getPropertyOptions(s);this._updateState=this._updateState|X,this[s]=i._propertyValueFromAttribute(e,t),this._updateState=this._updateState&~X}}_requestUpdate(t,e){let i=!0;if(void 0!==t){const s=this.constructor,n=s.getPropertyOptions(t);s._valueHasChanged(this[t],e,n.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==n.reflect||this._updateState&X||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,n))):i=!1}!this._hasRequestedUpdate&&i&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this._requestUpdate(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=this._updateState|G;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return this._updateState&G}get hasUpdated(){return this._updateState&Q}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{(t=this.shouldUpdate(e))?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(this._updateState&Q||(this._updateState=this._updateState|Q,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~G}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}Z[Y]=!0;const tt=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){window.customElements.define(t,e)}}})(t,e),et=(t,e)=>"method"!==e.kind||!e.descriptor||"value"in e.descriptor?{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}}:Object.assign(Object.assign({},e),{finisher(i){i.createProperty(e.key,t)}}),it=(t,e,i)=>{e.constructor.createProperty(i,t)};function st(t){return(e,i)=>void 0!==i?it(t,e,i):et(t,e)}const nt="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ot=Symbol();class rt{constructor(t,e){if(e!==ot)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(nt?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const at=(t,...e)=>{const i=e.reduce((e,i,s)=>e+(t=>{if(t instanceof rt)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+t[s+1],t[0]);return new rt(i,ot)};(window.litElementVersions||(window.litElementVersions=[])).push("2.3.1");const lt={};class ct extends Z{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(void 0===t)this._styles=[];else if(Array.isArray(t)){const e=(t,i)=>t.reduceRight((t,i)=>Array.isArray(i)?e(i,t):(t.add(i),t),i),i=e(t,new Set),s=[];i.forEach(t=>s.unshift(t)),this._styles=s}else this._styles=[t]}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?nt?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==lt&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){return lt}}ct.finalized=!0,ct.render=((t,e,s)=>{if(!s||"object"!=typeof s||!s.scopeName)throw new Error("The `scopeName` option is required.");const n=s.scopeName,o=F.has(e),r=R&&11===e.nodeType&&!!e.host,a=r&&!L.has(n),l=a?document.createDocumentFragment():e;if(((t,e,s)=>{let n=F.get(e);void 0===n&&(i(e,e.firstChild),F.set(e,n=new k(Object.assign({templateFactory:j},s))),n.appendInto(e)),n.setValue(t),n.commit()})(t,l,Object.assign({templateFactory:D(n)},s)),a){const t=F.get(l);F.delete(l);const s=t.value instanceof w?t.value.template:void 0;W(n,l,s),i(e,e.firstChild),e.appendChild(l),F.set(e,t)}!o&&r&&window.ShadyCSS.styleElement(e.host)});const dt=at`
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
      
`,ht=at`
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
    font-size: calc(35px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
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
    right: 0.7em;
    margin-top: -11px;
    margin-right: 7px;
  }      
     
`,pt=at`
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

`,ut=at`
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
`,mt=at`
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
`,gt=at`
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
`,_t={freezing_rain_heavy:"rainy-3",freezing_rain:"rainy-2",freezing_rain_light:"rainy-1",freezing_drizzle:"rain-and-sleet-mix",ice_pellets_heavy:"rain-and-snow-mix",ice_pellets:"rain-and-snow-mix",ice_pellets_light:"rain-and-snow-mix",snow_heavy:"snowy-3",snow:"snowy-2",snow_light:"snowy-1",flurries:"wind",tstorm:"tropical-storm",rain_heavy:"rainy-3",rain_light:"rainy-1",rain:"rainy-2",drizzle:"rainy-1",fog_light:"haze",fog:"fog",cloudy:"cloudy-original",mostly_cloudy:"cloudy-day-3",partly_cloudy:"cloudy-day-2",mostly_clear:"cloudy-day-1",clear:"day"},yt=Object.assign(Object.assign({},_t),{freezing_rain_heavy:"rainy-6",freezing_rain:"rainy-5",freezing_rain_light:"rainy-4",snow_heavy:"snowy-6",snow:"nowy-5",snow_light:"nowy-4",rain_heavy:"rainy-6",rain_light:"rainy-4",rain:"rainy-5",drizzle:"rainy-4",mostly_cloudy:"cloudy-night-3",partly_cloudy:"cloudy-night-2",mostly_clear:"cloudy-night-1",clear:"night"}),ft={clear:"day","clear-day":"day",rain:"rainy-2",snow:"nowy-2",sleet:"rain-and-sleet-mix",wind:"cloudy-day-1",fog:"fog",cloudy:"cloudy-original","partly-cloudy-day":"cloudy-day-2"},vt=Object.assign(Object.assign({},ft),{clear:"night","clear-night":"night",wind:"cloudy-night-1","partly-cloudy-day":"cloudy-night-2","partly-cloudy-night":"cloudy-night-2"}),wt={"clear sky":"day","few clouds":"cloudy-day-1","scattered clouds":"cloudy-day-2","broken clouds":"cloudy-day-3","shower rain":"rainy-3",rain:"rainy-2",thunderstorm:"tropical-storm",snow:"nowy-2",mist:"fog"},bt=Object.assign(Object.assign({},wt),{"clear sky":"day-night","few clouds":"cloudy-night-1","scattered clouds":"cloudy-night-2","broken clouds":"cloudy-night-3"});let xt={en:0,it:1,nl:2,es:3,de:4,fr:5,"sr-latn":6,pt:7},St={new_moon:"🌑",new:"🌑",waxing_crescent:"🌒",first_quarter:"🌓",waxing_gibbous:"🌔",full:"🌕",waning_gibbous:"🌖",third_quarter:"🌗",last_quarter:"🌗",waning_crescent:"🌘"};function $t(t){return new Promise(e=>{setTimeout(()=>{let i=new Image;i.onload=(()=>{e(!0)}),i.onerror=(()=>{e(!1)}),i.src=t},100)})}const Ct=(t,e)=>e[t]?e[t]:"ERR",Pt=(t,e,i)=>{let s=i&&"below_horizon"==i,n=s?e.iconsNight[t]:e.iconsDay[t];return null==e.path&&console.info("Image path not found. (hacsImagePathExist="+Ht+")(manImagePathExist="+Jt),void 0===n&&console.info("Icons issue. States: icons_model="+e.icons_model+" - isDay="+!s+" - condition: "+t+"."),`${e.path}/${e.iconType}/${n}.svg`},kt=(t,e)=>{const i=t.config.unit_system.length;switch(e){case"air_pressure":return"km"===i?"hPa":"inHg";case"length":return i;case"precipitation":return"km"===i?"mm":"in";default:return t.config.unit_system[e]||""}};function Nt(t){return new Promise(e=>{setTimeout(()=>{let i=new XMLHttpRequest;i.overrideMimeType("application/json"),i.open("GET",t,!0),i.onreadystatechange=(()=>{4===i.readyState&&200===i.status&&e(i.responseText)}),i.send(null)},100)})}function Et(t,e=1){switch(e){case 0:return Yt.format(parseFloat(t));case 1:return Zt.format(parseFloat(t))}}const Tt=(t,e,i,s,n)=>{let o,r,a=e.sun&&t.states[e.sun]?t.states[e.sun].state:void 0,l=e.moon_phase&&t.states[e.moon_phase]?t.states[e.moon_phase].state:void 0,c=l?function(t){return St[t.toLowerCase()]}(l):void 0,d=e.current_conditions&&t.states[e.current_conditions]?t.states[e.current_conditions].state:"Na";return o=e.temperature&&t.states[e.temperature]?Et(t.states[e.temperature].state):"Na",r=e.feels_like&&t.states[e.feels_like]?Et(t.states[e.feels_like].state):"Na",U`
      <div class="current">
        <span class="icon bigger" style="background: none,
            url('${Pt(d.toLowerCase(),s,a)}') no-repeat ; 
            background-size: contain;">${d}</span>
        ${i?U`<span class="title"> ${i} </span>`:""}
        ${l?U`<span class="moon"> ${c} <span style="font-size: 70%">${Ct(l,n.words)}</span></spa>`:""}
        ${"Na"!==o?U`
          <span class="temp">${o}</span>
          <span class="tempc"> ${kt(t,"temperature")}</span>
        `:""}
      </div>
      ${"Na"!==r?U`
        <ul class="variations polles" style="border: 0;margin-top: 4px;">
          <li><ha-icon icon="none"></ha-icon><span class="unit"></span></li>
          <li>
            <ha-icon icon="${t.states[e.feels_like].attributes.icon}"></ha-icon>${Ct("Feels Like",n.words)} ${r}
            <span class="unit"> ${kt(t,"temperature")}</span>
          </li>
        </ul>      
      `:""}
   `},At=(t,e,i,s,n)=>void 0!==t||void 0!==i?U`
    <li>
      <ha-icon icon="${n}"></ha-icon>${void 0!==t?t:"Na"} ${e} /
          <b>${void 0!==i?i:"Na"} ${s}</b>
    </li>
  `:"",zt=(t,e,i)=>U`
    <li>
      <ha-icon icon="${i}"></ha-icon>${void 0!==t?t:"Na"} ${e}
    </li>
  `,Ot=(t,e,i,s,n,o)=>{let r,a,l,c,d,h;s||t.selectedLanguage||t.language;let p=e.sun?t.states[e.sun]:void 0;if(p&&(d=new Date(p.attributes.next_rising),h=new Date(p.attributes.next_setting)),e.forecast){let e=i.temperature_high?Object.entries(i.temperature_high):void 0,s=i.temperature_low?Object.entries(i.temperature_low):void 0,n=i.precipitation_probability?Object.entries(i.precipitation_probability):void 0,o=i.precipitation_intensity?Object.entries(i.precipitation_intensity):void 0;r=e?Et(t.states[e[0][1]].state,0):void 0,a=s?Et(t.states[s[0][1]].state,0):void 0,l=n?Et(t.states[n[0][1]].state,0):void 0,c=o?Et(t.states[o[0][1]].state,0):void 0}let u=e.precipitation?Et(t.states[e.precipitation].state,0):void 0,m=e.humidity?Et(t.states[e.humidity].state,0):void 0,g=e.wind_bearing?Et(t.states[e.wind_bearing].state):void 0,_=e.wind_speed?Et(t.states[e.wind_speed].state):void 0,y=e.pressure?Et(t.states[e.pressure].state,0):void 0,f=e.visibility?Et(t.states[e.visibility].state,0):void 0;return U`
    <ul class="variations ${o?"spacer":""}">
        ${void 0!==typeof l||void 0!==typeof c?At(l,"%",c,kt(t,"precipitation")+"/h","mdi:weather-rainy"):""}
        ${!e.forecast||void 0===a&&void 0===r?"":At(a,"",r,kt(t,"temperature"),"mdi:thermometer")}
        ${void 0!==u&&u>0?U`
          <li>
            <ha-icon icon="mdi:weather-rainy"></ha-icon>${u}
            <span class="unit"> ${kt(t,"precipitation")}/h</span>
          </li>
          <li><ha-icon icon="none"></ha-icon><span class="unit"></span></li>
        `:""}            
        ${void 0!==y?zt(y,kt(t,"air_pressure"),"mdi:gauge"):""}
        ${void 0!==m?zt(m,"%","mdi:water-percent"):""}
        ${void 0!==f?zt(f,kt(t,"length"),"mdi:weather-fog"):""}
        ${_||g?U`
          <li>
            <ha-icon icon="mdi:weather-windy"></ha-icon> ${((t,e)=>t<0||t>360?(console.log("Enter a degree between 0 and 360 degrees."),null):t>=0&&t<=11.25?e.N:t>348.75&&t<=360?e.N:t>11.25&&t<=33.75?e.NNE:t>33.75&&t<=56.25?e.NE:t>56.25&&t<=78.75?e.ENE:t>78.75&&t<=101.25?e.E:t>101.25&&t<=123.75?e.ESE:t>123.75&&t<=146.25?e.SE:t>146.25&&t<=168.75?e.SSE:t>168.75&&t<=191.25?e.S:t>191.25&&t<=213.75?e.SSW:t>213.75&&t<=236.25?e.SW:t>236.25&&t<=258.75?e.WSW:t>258.75&&t<=281.25?e.W:t>281.25&&t<=303.75?e.WNW:t>303.75&&t<=326.25?e.NW:t>326.25&&t<=348.75?e.NNW:null)(g,n.windDirections)} ${_}
            <span class="unit">${kt(t,"length")}/h</span>
          </li>
        `:""}        
        ${void 0!==d?zt(d.toLocaleTimeString(s),"","mdi:weather-sunset-up"):""}               
        ${void 0!==h?zt(h.toLocaleTimeString(s),"","mdi:weather-sunset-down"):""}           
    </ul>
  `},jt=(t,e,i,s)=>null==t&&null==i?U``:null==t?U`
            <div class="highTemp">
              <b>${i}</b> ${s}
            </div>   
      `:null==i?U`
            <div class="lowTemp">
              ${t} ${e}
            </div>  
      `:U`
            <div class="highTemp">
              ${t} ${e} / <b>${i} ${s}</b>
            </div>
      `,Vt=(t,e)=>{let i=t.states[e.entity],s=void 0!==e.min?e.min:0,n=void 0!==e.max?e.max:5,o=void 0!==e.low?e.low:s,r=void 0!==e.high?e.high:n,a=0==s?1:0;return i?U`
     <li>
       <ha-icon icon="${i.attributes.icon}"></ha-icon>
       <meter class="meter" value="${parseInt(i.state)+a}" optimum="${(r-o)/2}"
            min="${s}" max="${n+a}" low="${o+a}" high="${r+a}">${i.state}/${n}</meter>
     </li>
  `:""};const Ft=(t,e,i)=>t?U`
    <li>
      <svg viewBox="0 0 24 15" width="24" height="15" xmlns="http://www.w3.org/2000/svg">
        <style>.small {font: 8px sans-serif;}</style>
        <text x="0" y="14" class="small">${i}</text>
      </svg>${t} ${e.unit_of_measurement?e.unit_of_measurement:""}
    </li>    
  `:"",It=["I","II","III","IV","V","VI"],Ut=["#F1D1B1","#E4B590","#CF9F7D","#B67851","#A15E2D","#513938"],Mt=(t,e,i)=>{let s=i?Et(t.state,0):t.state;return t?U`
    <li>
        <ha-icon icon="${e}"></ha-icon>${s} ${t.attributes.unit_of_measurement?t.attributes.unit_of_measurement:""}
    </li>    
  `:""},Rt=(t,e,i)=>{let s=void 0!==e.protection_window&&t.states[e.protection_window]?Mt(t.states[e.protection_window],"mdi:sunglasses",!1):void 0,n=void 0!==e.uv_level&&t.states[e.uv_level]?Mt(t.states[e.uv_level],"mdi:weather-sunny",!1):void 0,o=void 0!==e.uv_index&&void 0!==e.max_uv_index?((t,e,i)=>{let s=void 0!==t?Et(t.state):"--",n=void 0!==e?Et(e.state):"--";return t||e?U`
    <li>
        <ha-icon icon="${i}"></ha-icon>${s} / <b>${n}</b>
        ${t.attributes.unit_of_measurement?t.attributes.unit_of_measurement:""}
    </li>    
  `:""})(t.states[e.uv_index],t.states[e.max_uv_index],"mdi:weather-sunny"):"",r=void 0!==e.ozone_level&&t.states[e.ozone_level]?Mt(t.states[e.ozone_level],"mdi:vector-triangle",!0):void 0;return U`
    <ul class="variations ${i?"spacer":""}">
        ${n||""}${s||""}
        ${o||""}${r||""}
    </ul>
    <div class="forecast clear" style="margin-top:  4px; margin-bottom: 4px;">
    ${[1,2,3,4,5,6].map(i=>{let s=e["set_skin_type_"+i],n=void 0!==typeof s&&void 0!==typeof t.states[s]?t.states[s]:void 0;return n?U`
        <div class="day ${i}">
            <div id="rectangle" style="color: black; background: ${Ut[i-1]};width:32px;height:32px;display: table;margin: 0 auto;">${It[i-1]}</div>
            <div class="lowTemp">
              ${n.state&&"unknown"!==n.state?Math.trunc(parseInt(n.state)/60)+" h":"- -"}
            </div>  
        </div>
      `:""})}
    </div>
  `},Dt=(t,e,i)=>{let s=Object.entries(e);return U`
    <div class="forecast clear" style="margin-top:  4px; margin-bottom: 4px;">
    ${s.map(e=>{e[0];let i=e[1],s=!0,n=t.states[i.entity];if(void 0!==n){let t,e="- -",o=0;n.state&&"unknown"!==n.state&&(t=void 0!==i.icon?i.icon:n.attributes.icon,void 0!==i.min&&void 0!==i.max?(e=Et(n.state),o=Math.abs(100*(parseFloat(e)-i.min)/(i.max-i.min))/100,void 0!==i.show_if_ge&&parseFloat(e)<i.show_if_ge&&(s=!1)):(o="on"==(e=n.state).toLowerCase()?1:0,i.show_if_on&&"off"==e.toLowerCase()&&(s=!1)));let r=function(t){let e=(120*(1-t)).toString(10);return{color:qt(Lt(e,100,50)),bgcolor:["hsl(",e,",100%,50%)"].join("")}}(o);return s?U`
        <div class="day">
            <div id="rectangle" style="color: ${r.color};background: ${r.bgcolor};width:32px;height:32px;display: table;margin: 0 auto;"><ha-icon icon="${t}"></ha-icon></div>
            <div class="lowTemp">${e}</div>  
        </div>
        `:""}return""})}
    </div>
  `};function qt(t){return t=t.replace("#",""),(299*parseInt(t.substr(0,2),16)+587*parseInt(t.substr(2,2),16)+114*parseInt(t.substr(4,2),16))/1e3>=128?"black":"white"}function Lt(t,e,i){e/=100,i/=100;let s=(1-Math.abs(2*i-1))*e,n=s*(1-Math.abs(t/60%2-1)),o=i-s/2,r=0,a=0,l=0;0<=t&&t<60?(r=s,a=n,l=0):60<=t&&t<120?(r=n,a=s,l=0):120<=t&&t<180?(r=0,a=s,l=n):180<=t&&t<240?(r=0,a=n,l=s):240<=t&&t<300?(r=n,a=0,l=s):300<=t&&t<360&&(r=s,a=0,l=n);let c=Math.round(255*(r+o)).toString(16),d=Math.round(255*(a+o)).toString(16),h=Math.round(255*(l+o)).toString(16);return 1==c.length&&(c="0"+c),1==d.length&&(d="0"+d),1==h.length&&(h="0"+h),"#"+c+d+h}const Wt="/local/community/ha-card-weather-conditions/icons",Bt="/local/ha-card-weather-conditions/icons";let Ht=!1,Jt=!1,Qt="%c WEATHER-CONDITION-CARD %c 1.8.0",Gt="color: white; background: green; font-weight: 700;",Kt="color: green; background: white; font-weight: 700;",Xt="color: black; background: white; font-weight: 700;",Yt=null,Zt=null;console.info(Qt,Gt,Kt);let te=[$t(Wt+"/static/cloudy.svg"),$t(Bt+"/static/cloudy.svg")];Promise.all(te).then(e=>{let i,s;i=Ht=e[0],s=Jt=e[1];let n=(i?Wt:s?Bt:null)+"/../transl/",o=[Nt(n+"en.json"),Nt(n+"it.json"),Nt(n+"nl.json"),Nt(n+"es.json"),Nt(n+"de.json"),Nt(n+"fr.json"),Nt(n+"sr-latn.json"),Nt(n+"pt.json")];i?console.info(Qt+"%c use HACS path to retrieve icons.",Gt,Kt,Xt):s?console.info(Qt+"%c use www root path to retrieve icons.",Gt,Kt,Xt):console.info(Qt+"%c error setting right icons path.",Gt,Kt,Xt),Promise.all(o).then(e=>{let n=class extends ct{constructor(){super(...arguments),this._iconsConfig=new class{},this._terms=new class{},this.invalidConfig=!1,this.numberElements=0,this._header=!0,this._name="",this._hasCurrent=!1,this._hasForecast=!1,this._hasMeteogram=!1,this._hasAirQuality=!1,this._hasPollen=!1,this._hasUv=!1,this._hasAlert=!1,this._displayTop=!0,this._displayCurrent=!0,this._displayForecast=!0,this._showSummary=!0,this._showPresent=!0,this._showUv=!0,this._showAirQuality=!0,this._showPollen=!0,this._showForecast=!0,this._showAlert=!0}setConfig(t){if(console.log({card_config:t}),!t)throw this.invalidConfig=!0,new Error("Invalid configuration");t.name&&t.name.length>0&&(this._name=t.name),t.language&&t.language.length>0?this._language=t.language.toLowerCase():this._language="en";let n=JSON.parse(e[xt[this._language]]);if(this._terms.windDirections=n.cwcLocWindDirections,this._terms.words=n.cwcTerms,Yt=new Intl.NumberFormat(this._language,{maximumFractionDigits:0}),Zt=new Intl.NumberFormat(this._language,{maximumFractionDigits:1}),void 0!==t.display&&(this._displayTop=t.display.findIndex(t=>"top"===t.toLowerCase())>=0,this._displayCurrent=t.display.findIndex(t=>"current"===t.toLowerCase())>=0,this._displayForecast=t.display.findIndex(t=>"forecast"===t.toLowerCase())>=0),this._hasCurrent=!!t.weather&&!!t.weather.current,this._hasForecast=!!t.weather&&!!t.weather.forecast,this._hasMeteogram=this._hasForecast&&!!t.weather.forecast.meteogram,this._hasAirQuality=!!t.air_quality,this._hasPollen=!(!t.pollen||!t.pollen.tree&&!t.pollen.weed&&!t.pollen.grass),this._hasUv=!!t.uv,this._hasAlert=!!t.alert,this._iconsConfig.path=i?Wt:s?Bt:null,this._iconsConfig.iconType=t.animation?"animated":"static",this._iconsConfig.iconsDay=_t,this._iconsConfig.iconsNight=yt,this._iconsConfig.icons_model="climacell",t.weather&&t.weather.icons_model)switch(t.weather.icons_model.toLowerCase()){case"darksky":this._iconsConfig.iconsDay=ft,this._iconsConfig.iconsNight=vt,this._iconsConfig.icons_model="darksky";break;case"openweathermap":this._iconsConfig.iconsDay=wt,this._iconsConfig.iconsNight=bt,this._iconsConfig.icons_model="openweathermap"}this._config=t}getCardSize(){return 1}static get styles(){return at`${dt}${ht}${ut}${pt}${mt}${gt}`}render(){return this.invalidConfig?U`
            <ha-card class="ha-card-weather-conditions">
                <div class='banner'>
                    <div class="header">ha-card-weather-conditions</div>
                </div>
                <div class='content'>
                    Configuration ERROR!
                </div>
            </ha-card>
        `:this._render()}_render(){let t,e,i,s,n,o,r,a=0,l=this.hass.states;if(this._showSummary&&this._hasCurrent){let e=this._config.weather.current;e.current_conditions&&void 0!==typeof l[e.current_conditions]||e.temperature&&void 0!==typeof l[e.temperature]?(t=Tt(this.hass,this._config.weather.current,this._config.name,this._iconsConfig,this._terms),a++):t=""}else t="";if(this._showPresent&&this._hasCurrent){let t=this._config.weather.current;if(t.sun&&void 0!==typeof l[t.sun]||t.humidity&&void 0!==typeof l[t.humidity]||t.pressure&&void 0!==typeof l[t.pressure]||t.visibility&&void 0!==typeof l[t.visibility]||t.wind_bearing&&void 0!==typeof l[t.wind_bearing]||t.wind_speed&&void 0!==typeof l[t.wind_speed])e=Ot(this.hass,this._config.weather.current,this._config.weather.forecast,this._language,this._terms,a>0),a++;else if(t.forecast&&this._hasForecast){let t=this._config.weather.forecast;t.temperature_low&&t.temperature_low.day_1&&void 0!==typeof l[t.temperature_low.day_1]||t.temperature_high&&t.temperature_high.day_1&&void 0!==typeof l[t.temperature_high.day_1]||t.precipitation_intensity&&t.precipitation_intensity.day_1&&void 0!==typeof l[t.precipitation_intensity.day_1]||t.precipitation_probability&&t.precipitation_probability.day_1&&void 0!==typeof l[t.precipitation_probability.day_1]?(e=Ot(this.hass,this._config.weather.current,this._config.weather.forecast,this._language,this._terms,a>0),a++):e=""}else e=""}else e="";if(this._showAirQuality&&this._hasAirQuality){let t=this._config.air_quality;t.co&&void 0!==typeof l[t.co]||t.epa_aqi&&void 0!==typeof l[t.epa_aqi]||t.epa_health_concern&&void 0!==typeof l[t.epa_health_concern]||t.no2&&void 0!==typeof l[t.no2]||t.o3&&void 0!==typeof l[t.o3]||t.pm10&&void 0!==typeof l[t.pm10]||t.pm25&&void 0!==typeof l[t.pm25]||t.so2&&void 0!==typeof l[t.so2]?(s=((t,e,i)=>{let s=void 0!==e.pm25&&void 0!==t.states[e.pm25]?Ft(Et(t.states[e.pm25].state),t.states[e.pm25].attributes,"pm25"):void 0,n=void 0!==e.pm10&&void 0!==t.states[e.pm10]?Ft(Et(t.states[e.pm10].state),t.states[e.pm10].attributes,"pm10"):void 0,o=void 0!==e.o3&&void 0!==t.states[e.o3]?Ft(Et(t.states[e.o3].state),t.states[e.o3].attributes,"o3"):void 0,r=void 0!==e.no2&&void 0!==t.states[e.no2]?Ft(Et(t.states[e.no2].state),t.states[e.no2].attributes,"no2"):void 0,a=void 0!==e.co&&void 0!==t.states[e.co]?Ft(Et(t.states[e.co].state),t.states[e.co].attributes,"co"):void 0,l=void 0!==e.so2&&void 0!==t.states[e.so2]?Ft(Et(t.states[e.so2].state),t.states[e.so2].attributes,"so2"):void 0,c=void 0!==e.epa_aqi&&void 0!==t.states[e.epa_aqi]?Ft(Et(t.states[e.epa_aqi].state),t.states[e.epa_aqi].attributes,"aqi"):void 0,d=void 0!==e.epa_health_concern&&void 0!==t.states[e.epa_health_concern]?Ft(t.states[e.epa_health_concern].state,t.states[e.epa_health_concern].attributes,"aqi"):void 0;return U`
    <ul class="variations ${i?"spacer":""}">
        ${c||""}${d||""}
        ${s||""}${n||""}${o||""}${r||""}${a||""}${l||""}
    </ul>
  `})(this.hass,this._config.air_quality,a>0),a++):s=""}else s="";if(this._showUv&&this._hasUv){let t=this._config.uv;t.protection_window&&void 0!==typeof l[t.protection_window]||t.ozone_level&&void 0!==typeof l[t.ozone_level]||t.uv_index&&void 0!==typeof l[t.uv_index]||t.uv_level&&void 0!==typeof l[t.uv_level]||t.max_uv_index&&void 0!==typeof l[t.max_uv_index]?(i=Rt(this.hass,this._config.uv,a>0),a++):i=""}else i="";if(this._showPollen&&this._hasPollen){let t=this._config.pollen;t.grass&&t.grass.entity&&void 0!==typeof l[t.grass.entity]||t.tree&&t.tree.entity&&void 0!==typeof l[t.tree.entity]||t.weed&&t.weed.entity&&void 0!==typeof l[t.weed.entity]?(n=function(t,e,i){let s=e.tree&&e.tree.entity?Vt(t,e.tree):void 0,n=e.weed&&e.weed.entity?Vt(t,e.weed):void 0,o=e.grass&&e.grass.entity?Vt(t,e.grass):void 0;return U`
    <ul class="variations polles ${i?"spacer":""}">
        ${s||""}${n||""}${o||""}
    </ul>
  `}(this.hass,this._config.pollen,a>0),a++):n=""}else n="";if(this._showForecast&&this._hasForecast){let t=this._config.weather.forecast;o=((t,e,i,s,n,o)=>{let r=new Date,a=e.sun&&t.states[e.sun]?t.states[e.sun].state:void 0,l=i.icons?Object.entries(i.icons):void 0,c=i.temperature_high?Object.entries(i.temperature_high):void 0,d=i.temperature_low?Object.entries(i.temperature_low):void 0,h=i.precipitation_probability?Object.entries(i.precipitation_probability):void 0,p=i.precipitation_intensity?Object.entries(i.precipitation_intensity):void 0,u=Math.max(l?l.length:0,c?c.length:0,d?d.length:0,h?h.length:0,p?p.length:0),m=1,g=u>0?Array(u-m).fill(1,0,u-m).map(()=>m++):Array();return u>1?U`
      <div class="forecast clear ${o?"spacer":""}">
        ${g.map(e=>{let i,o,u,m,g,_=new Date(r.setDate(r.getDate()+1)).toLocaleDateString(n,{weekday:"short"});return l&&l[e]&&t.states[l[e][1]]&&(i=t.states[l[e][1]].state.toLowerCase()),d&&d[e]&&t.states[d[e][1]]&&(o=Et(t.states[d[e][1]].state,0)),c&&c[e]&&t.states[c[e][1]]&&(u=Et(t.states[c[e][1]].state,0)),h&&h[e]&&t.states[h[e][1]]&&(m=Et(t.states[h[e][1]].state,0)),p&&p[e]&&t.states[p[e][1]]&&(g=Et(t.states[p[e][1]].state,0)),U`
          <div class="day ${e}">
              <div class="dayname">${_}</div>
              ${i?U`
              <i class="icon" style="background: none, url('${Pt(i,s,a)}') no-repeat; 
                    background-size: contain"></i>                
              `:""}
              ${jt(o,"",u,kt(t,"temperature"))} 
              ${jt(m,"%",g,kt(t,"precipitation")+"/h")}                       
          </div>
          `})}
      </div>
    `:U``})(this.hass,this._config.weather.current,t,this._iconsConfig,this._language,a>0),a++}else o="";if(this._showAlert&&this._hasAlert){let t=this._config.alert;r=Dt(this.hass,t),a++}else r="";return U`
      ${""}
      
      <ha-card class="ha-card-weather-conditions ">
        <div class="nd-container ${""}">
        ${this._header?U`
            ${t}
            ${r}
            ${e}
            ${i}
            ${s}
            ${n}
            ${o}
            ${this._hasMeteogram?this.renderCamera(this.hass,this._config.weather.forecast.meteogram):""}
            ${this._config.camera?this.renderCamera(this.hass,this._config.camera):""}
        `:U``}
        </div>
      </ha-card>
    `}renderCamera(t,e){let i=t.states[e],s=i?i.attributes.entity_picture:void 0;return s?U`
        <div @click=${t=>this.handlePopup(t,e)} class="camera-container">
          <div class="camera-image">
            <img src="${s}" alt="${i.attributes.friendly_name}"/>
          </div>
        </div>
      `:U``}handlePopup(t,e){t.stopPropagation();let i=new Event("hass-more-info",{composed:!0});i.detail={entityId:e},this.dispatchEvent(i)}};t([st()],n.prototype,"hass",void 0),t([st()],n.prototype,"_config",void 0),n=t([tt("ha-card-weather-conditions")],n)})});export{Ht as hacsImagePathExist,Jt as manImagePathExist,Yt as numberFormat_0dec,Zt as numberFormat_1dec};
