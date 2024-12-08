import{_ as t,n as p,p as o,q as e,s,R as n,t as c,Y as i}from"./framework-2e061c0b.js";const l={},u=s("h2",{id:"为什么要封装一个命令式弹窗",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#为什么要封装一个命令式弹窗","aria-hidden":"true"},"#"),n(" 为什么要封装一个命令式弹窗?")],-1),r={href:"https://www.zhihu.com/question/35820643/answer/64646527",target:"_blank",rel:"noopener noreferrer"},k=i(`<h2 id="那么-该如何开始呢" tabindex="-1"><a class="header-anchor" href="#那么-该如何开始呢" aria-hidden="true">#</a> 那么，该如何开始呢？</h2><p>相信你们应该有使用过elementui的messageBox组件，他就是典型的命令式弹窗，而且也可以支持自定义内容，他这种交互方式不正是我们需要的吗？那么我们可以借鉴一下它是如何实现的。这里就不去一一细看它的源代码了，大致说一下它的实现思路</p><ul><li>创建组件容器</li><li>在容器内将自定义组件创建为一个Vnode</li><li>将容器挂载到挂载点</li><li>执行后续操作</li></ul><h2 id="于是" tabindex="-1"><a class="header-anchor" href="#于是" aria-hidden="true">#</a> 于是</h2><p>我仿照messageBox实现了一个，以下是完整代码</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> app <span class="token keyword">as</span> mainApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@/main&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> DialogProps<span class="token punctuation">,</span> ElDialog <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;element-plus&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> h<span class="token punctuation">,</span> InjectionKey<span class="token punctuation">,</span> nextTick<span class="token punctuation">,</span> provide<span class="token punctuation">,</span> ref<span class="token punctuation">,</span> render<span class="token punctuation">,</span> VNode <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> HideInject<span class="token operator">:</span> InjectionKey<span class="token operator">&lt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">&quot;CommandDialogHide&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> ShowInject<span class="token operator">:</span> InjectionKey<span class="token operator">&lt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">&quot;CommandDialogShow&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> DestroyInject<span class="token operator">:</span> InjectionKey<span class="token operator">&lt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">&quot;CommandDialogDestroy&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> ResolveDestroyInject<span class="token operator">:</span> InjectionKey<span class="token operator">&lt;</span><span class="token punctuation">(</span>data<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">&quot;CommandDialogPromiseResolve&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> RejectDestroyInject<span class="token operator">:</span> InjectionKey<span class="token operator">&lt;</span><span class="token punctuation">(</span>err<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">&quot;CommandDialogPromiseReject&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// TODO 嵌套式弹窗还未实现,后续用到再说~</span>

<span class="token comment">// 解决继承主线应用上下文之后热更新报错的问题,暂时没有找到更好的解决方案</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">DEV</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> errorLog <span class="token operator">=</span> <span class="token builtin">console</span><span class="token punctuation">.</span>error<span class="token punctuation">;</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function-variable function">error</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">TypeError: Cannot read properties of null (reading &#39;nextSibling&#39;)</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      window<span class="token punctuation">.</span>location<span class="token punctuation">.</span><span class="token function">reload</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">errorLog</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 弹窗默认属性</span>
<span class="token keyword">const</span> defaultDialogProps <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 可拖拽</span>
  draggable<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token comment">// 是否点击遮罩关闭</span>
  closeOnClickModal<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token comment">// 弹出时body锁定</span>
  lockScroll<span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> visible <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token function-variable function">hideFn</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  visible<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token function-variable function">showFn</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  visible<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token function-variable function">unmount</span> <span class="token operator">=</span> <span class="token punctuation">(</span>container<span class="token operator">:</span> HTMLElement<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">hideFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> container<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token function-variable function">destroyContainer</span> <span class="token operator">=</span> <span class="token punctuation">(</span>container<span class="token operator">:</span> HTMLElement<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">unmount</span><span class="token punctuation">(</span>container<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">nextTick</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    container<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">(</span>
  CustomComponent<span class="token operator">:</span> VNode<span class="token punctuation">,</span>
  options<span class="token operator">:</span> Partial<span class="token operator">&lt;</span>DialogProps <span class="token operator">&amp;</span> <span class="token punctuation">{</span> isProvideAppContext<span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token punctuation">}</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span> isProvideAppContext<span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token operator">&gt;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  visible<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> isProvideAppContext <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token operator">...</span>dialogOptions <span class="token punctuation">}</span> <span class="token operator">=</span> options<span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token builtin">Promise</span></span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// 创建容器</span>
    <span class="token keyword">const</span> container <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&quot;div&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 单纯调用这个方法会导致promise的状态永远为pending,外部组件将无法获得后续代码的执行权</span>
    <span class="token keyword">const</span> <span class="token function-variable function">destroy</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token function">destroyContainer</span><span class="token punctuation">(</span>container<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> <span class="token function-variable function">destroyOnResolve</span> <span class="token operator">=</span> <span class="token punctuation">(</span>data<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">resolve</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token function-variable function">destroyOnReject</span> <span class="token operator">=</span> <span class="token punctuation">(</span>reason<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">reject</span><span class="token punctuation">(</span>reason<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token comment">// 弹窗主体</span>
    <span class="token keyword">const</span> vnode <span class="token operator">=</span> <span class="token function">h</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 将方法注入到子孙组件内</span>
        <span class="token function">provide</span><span class="token punctuation">(</span>ShowInject<span class="token punctuation">,</span> showFn<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">provide</span><span class="token punctuation">(</span>HideInject<span class="token punctuation">,</span> hideFn<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">provide</span><span class="token punctuation">(</span>DestroyInject<span class="token punctuation">,</span> destroy<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">provide</span><span class="token punctuation">(</span>ResolveDestroyInject<span class="token punctuation">,</span> destroyOnResolve<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">provide</span><span class="token punctuation">(</span>RejectDestroyInject<span class="token punctuation">,</span> destroyOnReject<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span>
          <span class="token operator">&lt;</span>ElDialog modelValue<span class="token operator">=</span><span class="token punctuation">{</span>visible<span class="token punctuation">.</span>value<span class="token punctuation">}</span> <span class="token punctuation">{</span><span class="token operator">...</span><span class="token punctuation">{</span> <span class="token operator">...</span>defaultDialogProps<span class="token punctuation">,</span> <span class="token operator">...</span>dialogOptions <span class="token punctuation">}</span><span class="token punctuation">}</span> onClosed<span class="token operator">=</span><span class="token punctuation">{</span>destroy<span class="token punctuation">}</span><span class="token operator">&gt;</span>
            <span class="token punctuation">{</span>CustomComponent<span class="token punctuation">}</span>
          <span class="token operator">&lt;</span><span class="token operator">/</span>ElDialog<span class="token operator">&gt;</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    isProvideAppContext <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>appContext <span class="token operator">=</span> mainApp<span class="token punctuation">.</span>_context<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token function">render</span><span class="token punctuation">(</span>vnode<span class="token punctuation">,</span> container<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>container<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="说以下开发过程中遇到的问题" tabindex="-1"><a class="header-anchor" href="#说以下开发过程中遇到的问题" aria-hidden="true">#</a> 说以下开发过程中遇到的问题</h2><p>开发过程并不是想象种的那么顺利。。。</p><h3 id="控制显隐" tabindex="-1"><a class="header-anchor" href="#控制显隐" aria-hidden="true">#</a> 控制显隐</h3><p>首先，我们在外部没有声明控制弹窗显隐的状态，那么应该如何控制弹窗的显隐呢？答案是将控制的方法注入到子组件内，我们使用vue的api<code>provide</code>和<code>inject</code>来实现，那么这个问题就很好的被解决了</p><h3 id="上下文" tabindex="-1"><a class="header-anchor" href="#上下文" aria-hidden="true">#</a> 上下文</h3><p>你可以发现我们是使用<code>render</code>方法来挂载的组件,这会有一个严重的问题,那就是意味着,在我们的组件内显示的所有内容都脱离主应用的上下文,比如我们无法接收到来自主应用顶部注入的的变量,无法访问状态管理以及路由等信息.我中间尝试过将主应用的上下文复制过来给到组件,但是发现是不可行的. 这个时候,我又想起了messageBox,它是怎么解决的呢?我发现它是直接把主应用的上下文拿过来直接给到了组件的上下文.</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>isProvideAppContext <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>appContext <span class="token operator">=</span> mainApp<span class="token punctuation">.</span>_context<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>直接引用了上下文,我发现组件内的内容也能拿到上下文了,甚好.</p><p>但是新的问题出现了,在经过这一步之后热更新会报错,由于错误是直接被热更新插件消费了,只是用console.error打印出来了.这也导致我们无法捕获这个错误,那么没办法,我只能重写error方法了.</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 判断环境,这里我用的是vite</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">DEV</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> errorLog <span class="token operator">=</span> <span class="token builtin">console</span><span class="token punctuation">.</span>error<span class="token punctuation">;</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function-variable function">error</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">TypeError: Cannot read properties of null (reading &#39;nextSibling&#39;)</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      window<span class="token punctuation">.</span>location<span class="token punctuation">.</span><span class="token function">reload</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">errorLog</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样就成功解决了.</p><h3 id="支持promise" tabindex="-1"><a class="header-anchor" href="#支持promise" aria-hidden="true">#</a> 支持promise</h3><p>这个很简单,只需要我们调用的方法返回一个promise就好了,然后将resolve,reject都给到组件内的子孙组件,由他们来决定执行的时机</p><h3 id="todo-实现嵌套弹窗" tabindex="-1"><a class="header-anchor" href="#todo-实现嵌套弹窗" aria-hidden="true">#</a> TODO 实现嵌套弹窗</h3><p>这个暂时项目里还没有用到,等用到了再实现吧,大致思路是维护一个栈结构来实现</p><h2 id="命令式带来的好处" tabindex="-1"><a class="header-anchor" href="#命令式带来的好处" aria-hidden="true">#</a> 命令式带来的好处</h2><p>如果你的vue3应用配置了jsx支持,那么下边的是两个用例,代码就变成了下边的样子,变得如此简洁!开发弹窗也可以很舒服了</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> <span class="token function-variable function">add</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token keyword">await</span> <span class="token function">CommandDialog</span><span class="token punctuation">(</span><span class="token operator">&lt;</span>SysDictAddEdit <span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      title<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">添加字典</span><span class="token template-punctuation string">\`</span></span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    <span class="token function">getList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">edit</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>row<span class="token operator">:</span> IDictionaryResponseVo<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token keyword">await</span> <span class="token function">CommandDialog</span><span class="token punctuation">(</span><span class="token operator">&lt;</span>SysDictAddEdit raw<span class="token operator">=</span><span class="token punctuation">{</span>row<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      title<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">编辑字典</span><span class="token template-punctuation string">\`</span></span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    <span class="token function">getList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果出现报错,这里的报错等信息在内容组件内就被消费了,所以外部看起如此简洁,当然如果你希望抛出来处理也是没啥问题的</p><p>=.=,除非让我遇到不适用的场景,不然再也回不去声明式了.</p>`,26);function d(v,m){const a=p("ExternalLinkIcon");return o(),e("div",null,[u,s("p",null,[n("由于在项目中有很多弹窗,但是每次开发声明式弹窗内容的时候,内心总会有一种抵触感,因为在开发弹窗的时候给人一种很强的割裂感,如果你的弹窗内的内容是放在单独的组件内,就会有一种反复横跳的感觉,还要单独去关注维护弹窗显隐的状态,以及一些额外的操作。于是就萌生了要开发一个命令式弹窗组件的想法，在使用体验过后，尽管尤大大是反对命令式这种交互 》 "),s("a",r,[n("链接"),c(a)]),n("，但是我觉得都不是问题，用完真的回不去了。")]),k])}const g=t(l,[["render",d],["__file","shiyongTS_Vue3fengzhuangyigeminglingshidanchuangzujian.html.vue"]]);export{g as default};