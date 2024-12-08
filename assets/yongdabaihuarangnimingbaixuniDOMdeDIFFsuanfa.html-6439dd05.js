import{_ as a,n as p,p as e,q as t,s as n,R as o,t as c,Y as l}from"./framework-2e061c0b.js";const i={},u=l(`<h2 id="前文" tabindex="-1"><a class="header-anchor" href="#前文" aria-hidden="true">#</a> 前文</h2><p>我们先来了解一些前置的必要知识.</p><h3 id="首先什么是虚拟dom" tabindex="-1"><a class="header-anchor" href="#首先什么是虚拟dom" aria-hidden="true">#</a> 首先什么是虚拟dom?</h3><p>虚拟DOM（Virtual DOM）其实就是一种存在于内存中的用来描述真实DOM的数据结构.其本质就是一堆对象,你可以通过渲染器将其渲染成真实DOM,它相比于真实的DOM数据来说更加轻量.下边用一个简单的例子来说明:</p><p>比如你有一个这样的真实DOM</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>app<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么,使用虚拟DOM来表示,他就是一个这样的对象</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> vdom <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&quot;div&quot;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">attr</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">&quot;app&quot;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&quot;div&quot;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">attr</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&quot;div&quot;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">attr</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token string">&quot;2&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一般来说,这两者的转换的关系是单向的,即虚拟DOM转换为真实DOM;我们怎么实现这个转换呢?答案是通过渲染器,下边是一个简易的渲染器来帮助你理解:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token parameter">vdom</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> el <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span>vdom<span class="token punctuation">.</span>type<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">in</span> vdom<span class="token punctuation">.</span>attr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    el<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> vdom<span class="token punctuation">.</span>attr<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> vdom<span class="token punctuation">.</span>children <span class="token operator">===</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    el<span class="token punctuation">.</span>textContent <span class="token operator">=</span> vdom<span class="token punctuation">.</span>children<span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    vdom<span class="token punctuation">.</span>children<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">child</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      el<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span><span class="token function">render</span><span class="token punctuation">(</span>child<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> el<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们通过这个渲染器,可以很轻松的将虚拟DOM转换为真实DOM,然后将其添加到正确的挂载位置,页面可以正常显示了.这就是虚拟DOM,真实DOM,渲染器,三者的关系.虚拟DOM是更加抽象的存在,它的抽象程度脱离了渲染的平台,具体的转换后的输出内容要看你怎么实现的渲染器.</p><h3 id="我们为什么需要虚拟dom" tabindex="-1"><a class="header-anchor" href="#我们为什么需要虚拟dom" aria-hidden="true">#</a> 我们为什么需要虚拟DOM?</h3><p>好了,差不多说明了虚拟DOM之后,我们就要来说明一下为什么我们需要虚拟DOM了.它给我们带来了什么好处,解决了什么问题? 虚拟DOM主要解决了一个问题,避免了频繁的操作真实DOM,进而提高了性能.因为我们使用vue,react等框架时,我们更改和视图有关的数据后,直接反应到视图层面的其实就是虚拟DOM,操作内存中的虚拟DOM成本是比较低的,而操作真实DOM成本是比较高的.如果我们每次更改数据后,都从头到尾的重新生成一次真实DOM,那无疑成本是巨大的,所以我们可以在数据更改后生成新的虚拟DOM,然后与上一次生成的虚拟DOM来对比,进而找出实际需要更新的部分,然后复用没有更改的真实DOM,那么是不是性能就更高了呢?答案是几乎肯定的.</p><p>为什么说<code>几乎是肯定的</code>?其实如果你的页面实在是太简单,你会发现直接操作真实DOM性能更高,我们通常所说的虚拟DOM性能更高是指你的应用具一定体量,因为虚拟DOM在初始渲染需要做一些操作,以及在更新过程中需要保存一份副本来进行对比,内存占用会更高,所以你的应用如果实在太简单,而直接操作真实DOM可以直接跳过这些环节,根本享受不到虚拟DOM带来的好处哦.但是另一方面来说,从跨平台以及可维护性上来讲,没有理由不上虚拟DOM.</p><h2 id="diff算法" tabindex="-1"><a class="header-anchor" href="#diff算法" aria-hidden="true">#</a> DIFF算法</h2><p>前文我们已经提到过了,我们通过对比新旧虚拟DOM来找出实际需要更新的部分来提高性能.那么这个过程是如何实现的呢?这就是我们接下来要讨论的重点:DIFF算法.我们过程中会根据vue3源码来解释这一过程.</p><p>我们先来总结一下可能出现的情况(n1表示旧节点,n2表示新节点):</p><ul><li>!n1&amp;&amp;n2 初始挂载</li><li>n1&amp;&amp;!n2 卸载</li><li>n1&amp;&amp;n2 都存在,就需要进行对比了 <ul><li>n1.type!==n2.type 如果是不同类型,需要先卸载旧节点,然后挂载新节点</li><li>n1.type===n2.type 如果是相同类型,进行patch,然后就是对比children了</li></ul></li></ul><p>接下来就是节点孩子的对比部分了, 本文重点要将的也是相同节点类型下children的对比,抛开框架本身的逻辑,那么children的类型只会出现这几种类型[text,&#39;array&#39;],所以大体又会出现下面这几类情况</p><ul><li>!n1.children&amp;&amp;n2 挂载孩子节点</li><li>n1.children&amp;&amp;!n2.children 卸载孩子节点</li><li>n1.children&amp;&amp;n2.children 都存在,就需要进行对比了 <ul><li>n2.children.type===&#39;text&#39; 新节点孩子节点是文本,就需要先卸载旧的孩子节点,然后直接设置文本内容</li><li>n1.children.type===&#39;text&#39;&amp;&amp;n1.children.type!==&#39;text&#39; 如果旧节点孩子节点是文本节点,新节点孩子节点不是文本节点,那么说明是一个数组,先将文本内容情况,然后将新节点的孩子节点进行挂载</li><li>n1.children.type!==&#39;text&#39;&amp;&amp;n1.children.type!==&#39;text&#39; 都是数组类型,开启diff!</li></ul></li></ul><p>终于来到重点了,其实这部分才是主角,前边再多的情况无非是多开几个代码行进的分支,这部分才是最具含金量的~ 那么children同样是数组的情况下,我们又来思考,会出现几种情况呢,大致会分为以下几类情况(我们只会讨论绑定了key值的孩子节点哈,没有绑定key值的节点可以使用简单粗暴的方式来解决):</p><p>尾部新增节点,那么这种我们就可以将左侧范围缩减</p><ul><li>(a b c d)</li><li>(a b c d) e f</li></ul><p>头部新增节点,那这种我们可以将右侧范围缩减</p><ul><li>(a b c d)</li><li>x y (a b c d)</li></ul><p>缩减之后,就是中间乱序的部分了,可能是新增,也可能是删除,还可能是交换了顺序,我们使用一个将所有情况都包含的例子</p><ul><li>(a b ) c d e f (g)</li><li>(a b ) d c x y f (g) 这个例子中我们交换了 c d 节点的位置,并添加了 x y两个节点,还删除掉了e节点</li></ul><p>接下来就是diff流程了,直接开始解读源代码哈(这一块的源码在patchKeyedChildren这个函数下,你可以自行搜索)</p><p>我们会定义个三个指针变量(问:为什么不是四个指针呢?因为左侧就算定义两个指针,也总是从0开始,而右侧则是不固定的.)</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span>
<span class="token keyword">const</span> l2 <span class="token operator">=</span> c2<span class="token punctuation">.</span>length
<span class="token keyword">let</span> e1 <span class="token operator">=</span> c1<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span>
<span class="token keyword">let</span> e2 <span class="token operator">=</span> l2 <span class="token operator">-</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>先通过左侧和右侧对比来压缩我们需要diff的范围,这块直接贴源代码可能会更好理解哈,我会将源码做一定修改,只关注核心逻辑</p><p>左侧的对比,通过对比是否是同一个节点,来通过将i指针项右推动来压缩范围</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;=</span> e1 <span class="token operator">&amp;&amp;</span> i <span class="token operator">&lt;=</span> e2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> n1 <span class="token operator">=</span> c1<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
  <span class="token keyword">const</span> n2 <span class="token operator">=</span> c2<span class="token punctuation">[</span>i<span class="token punctuation">]</span> 
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isSameVNodeType</span><span class="token punctuation">(</span>n1<span class="token punctuation">,</span> n2<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">patch</span><span class="token punctuation">(</span>
      n1<span class="token punctuation">,</span>
      n2<span class="token punctuation">,</span>
      container<span class="token punctuation">,</span>
      <span class="token keyword">null</span><span class="token punctuation">,</span>
      parentComponent
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">break</span>
  <span class="token punctuation">}</span>
  i<span class="token operator">++</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>右侧是同理的</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;=</span> e1 <span class="token operator">&amp;&amp;</span> i <span class="token operator">&lt;=</span> e2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> n1 <span class="token operator">=</span> c1<span class="token punctuation">[</span>e1<span class="token punctuation">]</span>
  <span class="token keyword">const</span> n2 <span class="token operator">=</span>c2<span class="token punctuation">[</span>e2<span class="token punctuation">]</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isSameVNodeType</span><span class="token punctuation">(</span>n1<span class="token punctuation">,</span> n2<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">patch</span><span class="token punctuation">(</span>
      n1<span class="token punctuation">,</span>
      n2<span class="token punctuation">,</span>
      container<span class="token punctuation">,</span>
      <span class="token keyword">null</span><span class="token punctuation">,</span>
      parentComponent
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">break</span>
  <span class="token punctuation">}</span>
  e1<span class="token operator">--</span>
  e2<span class="token operator">--</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>到这里双端对比就结束了,接下来我们需要根据三个指针的比较来判断现在是哪一种情况</p><ul><li>i &gt; e1 &amp;&amp; i &lt;= e2 i指针超过了e1指针,这种情况说明只是尾部添加了新节点,那我们只需要按顺序将节点进行挂载就可以了</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&gt;</span> e1<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;=</span> e2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> nextPos <span class="token operator">=</span> e2 <span class="token operator">+</span> <span class="token number">1</span>
    <span class="token keyword">const</span> anchor <span class="token operator">=</span> nextPos <span class="token operator">&lt;</span> l2 <span class="token operator">?</span> <span class="token punctuation">(</span>c2<span class="token punctuation">[</span>nextPos<span class="token punctuation">]</span> <span class="token keyword">as</span> VNode<span class="token punctuation">)</span><span class="token punctuation">.</span>el <span class="token operator">:</span> parentAnchor
    <span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;=</span> e2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">patch</span><span class="token punctuation">(</span>
        <span class="token keyword">null</span><span class="token punctuation">,</span>
        c2<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span>
        container<span class="token punctuation">,</span>
        anchor<span class="token punctuation">,</span>
        parentComponent
      <span class="token punctuation">)</span>
      i<span class="token operator">++</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>i &gt; e2 &amp;&amp; i &lt;= e1 i大于e2却小于等于e1,说明有节点被删除掉了,那我们需要删除掉这些节点</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&gt;</span> e2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;=</span> e1<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">unmount</span><span class="token punctuation">(</span>c1<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> parentComponent<span class="token punctuation">,</span> parentSuspense<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
    i<span class="token operator">++</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>最后一种情况,i没有与右端任何指针相交,就是情况最复杂的时候了,这部分直接上源码吧,我会在源码中加入自己的见解说明,最后再大致说一下这之间的流程</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">else</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> s1 <span class="token operator">=</span> i <span class="token comment">// 旧列表开始索引</span>
  <span class="token keyword">const</span> s2 <span class="token operator">=</span> i <span class="token comment">// 新列表开始索引</span>

  <span class="token comment">// 构建一个新的索引表，用于记录新节点的key和索引的对应关系</span>
  <span class="token keyword">const</span> <span class="token literal-property property">keyToNewIndexMap</span><span class="token operator">:</span> Map<span class="token operator">&lt;</span>string <span class="token operator">|</span> number <span class="token operator">|</span> symbol<span class="token punctuation">,</span> number<span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> s2<span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> e2<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> nextChild <span class="token operator">=</span> c2<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>nextChild<span class="token punctuation">.</span>key <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      keyToNewIndexMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>nextChild<span class="token punctuation">.</span>key<span class="token punctuation">,</span> i<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">let</span> j
  <span class="token comment">// 用于记录已经被patch的节点的数量</span>
  <span class="token keyword">let</span> patched <span class="token operator">=</span> <span class="token number">0</span>
  <span class="token comment">// 用于记录新节点中需要处理的数量,这里其实就是新节点的数量</span>
  <span class="token keyword">const</span> toBePatched <span class="token operator">=</span> e2 <span class="token operator">-</span> s2 <span class="token operator">+</span> <span class="token number">1</span>
  <span class="token comment">// 这个主要是用来检测旧节点可复用时,在新节点列表中索引是否是升序,如果是升序说明不需要移动</span>
  <span class="token keyword">let</span> maxNewIndexSoFar <span class="token operator">=</span> <span class="token number">0</span>
  <span class="token comment">// 用于记录是否有节点被移动过</span>
  <span class="token keyword">let</span> moved <span class="token operator">=</span> <span class="token boolean">false</span>

  <span class="token comment">// 构建一个新的索引表,用于记录可复用新旧节点的索引的对应关系</span>
  <span class="token keyword">const</span> newIndexToOldIndexMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span>toBePatched<span class="token punctuation">)</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> toBePatched<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> newIndexToOldIndexMap<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0</span>

  <span class="token comment">// 遍历旧节点</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> s1<span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> e1<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> prevChild <span class="token operator">=</span> c1<span class="token punctuation">[</span>i<span class="token punctuation">]</span>

    <span class="token comment">// 如果已经处理的节点数量大于等于需要处理的节点数量，说明已经处理完毕，直接跳出循环,这种情况是旧节点的数量大于新节点的数量时才会出现</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>patched <span class="token operator">&gt;=</span> toBePatched<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// all new children have been patched so this can only be a removal</span>
      <span class="token function">unmount</span><span class="token punctuation">(</span>prevChild<span class="token punctuation">,</span> parentComponent<span class="token punctuation">,</span> parentSuspense<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
      <span class="token keyword">continue</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">let</span> newIndex
    <span class="token comment">// 如果旧节点存在key，那么就根据key去新节点中查找对应的索引</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>prevChild<span class="token punctuation">.</span>key <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      newIndex <span class="token operator">=</span> keyToNewIndexMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>prevChild<span class="token punctuation">.</span>key<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// 如果旧节点不存在key，那么就从新节点的最左侧开始查找与旧节点相同的节点</span>
      <span class="token keyword">for</span> <span class="token punctuation">(</span>j <span class="token operator">=</span> s2<span class="token punctuation">;</span> j <span class="token operator">&lt;=</span> e2<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>
          newIndexToOldIndexMap<span class="token punctuation">[</span>j <span class="token operator">-</span> s2<span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span>
          <span class="token function">isSameVNodeType</span><span class="token punctuation">(</span>prevChild<span class="token punctuation">,</span> c2<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token keyword">as</span> VNode<span class="token punctuation">)</span>
        <span class="token punctuation">)</span> <span class="token punctuation">{</span>
          newIndex <span class="token operator">=</span> j
          <span class="token keyword">break</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 如果没有找到相同的节点，说明旧节点已经被移除了，直接卸载</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>newIndex <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">unmount</span><span class="token punctuation">(</span>prevChild<span class="token punctuation">,</span> parentComponent<span class="token punctuation">,</span> parentSuspense<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// 如果找到了相同的节点，那么就将新节点的索引记录到索引表中,这里+1是避开索引为0的情况,因为我们初始值是0嘛</span>
      newIndexToOldIndexMap<span class="token punctuation">[</span>newIndex <span class="token operator">-</span> s2<span class="token punctuation">]</span> <span class="token operator">=</span> i <span class="token operator">+</span> <span class="token number">1</span>
      <span class="token comment">// 这里我们主要是判断节点是否需要移动,如果说新节点一直是升序排列的,那么说明节点是不需要移动的,否则就是移动过的,方便后续进行优化</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>newIndex <span class="token operator">&gt;=</span> maxNewIndexSoFar<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        maxNewIndexSoFar <span class="token operator">=</span> newIndex
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        moved <span class="token operator">=</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span>

      <span class="token function">patch</span><span class="token punctuation">(</span>
        prevChild<span class="token punctuation">,</span>
        c2<span class="token punctuation">[</span>newIndex<span class="token punctuation">]</span> <span class="token keyword">as</span> VNode<span class="token punctuation">,</span>
        container<span class="token punctuation">,</span>
        <span class="token keyword">null</span><span class="token punctuation">,</span>
        parentComponent<span class="token punctuation">,</span>
        parentSuspense<span class="token punctuation">,</span>
        isSVG<span class="token punctuation">,</span>
        slotScopeIds<span class="token punctuation">,</span>
        optimized
      <span class="token punctuation">)</span>

      patched<span class="token operator">++</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 构建一个最长递增子序列的索引表,如果列表没有被移动过,那么说明根本不需要进行计算</span>
  <span class="token comment">// 构建这个列表的目的是尽可能多的找出不需要移动的节点,反之也就是说尽可能最少的移动节点来完成更新操作</span>
  <span class="token keyword">const</span> increasingNewIndexSequence <span class="token operator">=</span> moved
    <span class="token operator">?</span> <span class="token function">getSequence</span><span class="token punctuation">(</span>newIndexToOldIndexMap<span class="token punctuation">)</span>
    <span class="token operator">:</span> <span class="token constant">EMPTY_ARR</span>

  j <span class="token operator">=</span> increasingNewIndexSequence<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span>

  <span class="token comment">// 接下来的思路是:遍历整个新节点,如果这个新节点在旧节点中不存在,那么我们会执行挂载操作,如果存在,我们就直接进行移动操作以达到复用的目的</span>

  <span class="token comment">// 这里倒序循环是因为锚点的问题</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> toBePatched <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> nextIndex <span class="token operator">=</span> s2 <span class="token operator">+</span> i
    <span class="token keyword">const</span> nextChild <span class="token operator">=</span> c2<span class="token punctuation">[</span>nextIndex<span class="token punctuation">]</span> <span class="token keyword">as</span> VNode
    <span class="token comment">// 对应的锚点一定要找准</span>
    <span class="token keyword">const</span> anchor <span class="token operator">=</span>
      nextIndex <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">&lt;</span> l2 <span class="token operator">?</span> <span class="token punctuation">(</span>c2<span class="token punctuation">[</span>nextIndex <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token keyword">as</span> VNode<span class="token punctuation">)</span><span class="token punctuation">.</span>el <span class="token operator">:</span> parentAnchor

    <span class="token comment">// 如果索引表中的索引为0,说明这个节点在旧节点中不存在,那么我们就执行创建挂载操作</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>newIndexToOldIndexMap<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">patch</span><span class="token punctuation">(</span>
        <span class="token keyword">null</span><span class="token punctuation">,</span>
        nextChild<span class="token punctuation">,</span>
        container<span class="token punctuation">,</span>
        anchor<span class="token punctuation">,</span>
        parentComponent<span class="token punctuation">,</span>
        parentSuspense<span class="token punctuation">,</span>
        isSVG<span class="token punctuation">,</span>
        slotScopeIds<span class="token punctuation">,</span>
        optimized
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>moved<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 然后是移动操作</span>
      <span class="token comment">// 判断一:如果j小于0,说明最长递增子序列已经遍历完了,那么剩下的都是需要移动的节点,可以不用判断这个,但这是个优化点</span>
      <span class="token comment">// 判断二:看一下当前索引是否能匹配到最长递增子序列中的索引,如果能匹配上,说明这个节点不需要移动,否则就需要移动</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>j <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> i <span class="token operator">!==</span> increasingNewIndexSequence<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">move</span><span class="token punctuation">(</span>nextChild<span class="token punctuation">,</span> container<span class="token punctuation">,</span> anchor<span class="token punctuation">,</span> MoveType<span class="token punctuation">.</span><span class="token constant">REORDER</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果能匹配上,说明我们就不需要进行移动操作了,直接跳过即可,由于我们是倒序,而且j初始值是最长递增子序列的长度-1,所以每次匹配上索引时j都会减1,直到小于0时,说明最长递增子序列已经遍历完了</span>
        j<span class="token operator">--</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>好了源码注释已经写完了,我们再来梳理以下这个步骤和流程:</p><ul><li>我们首先构建了一个新节点列表上的<code>key&gt;index</code>的map映射集,方便后续通过key来快速获取该节点在新列表中的索引</li><li>然后我们通过需要处理的新列表的长度来创建了一个数组,并全部填充为0,在将来能在旧列表中找到可复用节点是,索引上的值会被改变为在旧列表中的索引,后续如果索引上的值是0表示未找到复用的节点,即是一个新出现的节点,则需要创建进行挂载;依照这个逻辑我们对旧列表进行了遍历,通过绑定的key值来查找是否有对应key值的节点在新列表中,如果有就会进行记录,如果没有,说明这个节点需要被卸载(在这个遍历过程中,我们顺手将其卸载掉了)</li><li>然后我们通过新旧节点索引的数组构建出了一个最长递增子序列的数组,使用它能帮我们确定最长的不需要的移动的节点列表,关于最长递增子序列可自行去了解一下哦</li><li>数据都已经构建完毕了,开始干活吧,接下来我们就需要遍历新节点列表,我们进行了倒序遍历,这是因为锚点的缘故,根据前边构建数据时的逻辑,当新旧列表索引映射表中在当前索引为0时,表示需要创建挂载,然后就是在在旧列表中找到了对应节点,就看需不需要移动了,如果需要移动就移动,不需要移动就直接下一个.</li></ul><p>至此,整个diff过程就完成啦!</p><h2 id="wow-终于结束了" tabindex="-1"><a class="header-anchor" href="#wow-终于结束了" aria-hidden="true">#</a> wow,终于结束了~</h2><p>可以很明显的感受到,最需要思考的一部分也即是我们讨论的最后一部分了,这个过程值得细细回味,太经典了~</p><p>结束,拜拜~</p><p>这部分内容在vue3源码位置</p>`,49),r={href:"https://github.com/vuejs/core/blob/main/packages/runtime-core/src/renderer.ts",target:"_blank",rel:"noopener noreferrer"};function d(k,v){const s=p("ExternalLinkIcon");return e(),t("div",null,[u,n("p",null,[n("a",r,[o("diff源码位置"),c(s)])])])}const b=a(i,[["render",d],["__file","yongdabaihuarangnimingbaixuniDOMdeDIFFsuanfa.html.vue"]]);export{b as default};
