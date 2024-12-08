import{_ as n,p as s,q as a,Y as p}from"./framework-2e061c0b.js";const t={},o=p(`<h2 id="生成器是什么" tabindex="-1"><a class="header-anchor" href="#生成器是什么" aria-hidden="true">#</a> 生成器是什么?</h2><p>生成器拥有在一个函数内暂停和恢复代码执行的能力,这里值得一说,我们熟悉的异步解决方案<code>async</code>,<code>await</code>就是基于生成器实现的.</p><h2 id="一个简单的生成器实例" tabindex="-1"><a class="header-anchor" href="#一个简单的生成器实例" aria-hidden="true">#</a> 一个简单的生成器实例</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">g</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在function关键词之后跟上一个<code>*</code>号之后,那么这个函数就变成了一个生成器函数,在调用这个函数后,会得到一个生成器对象,这个对象实现了Iterator接口,所以具有迭代器的特性.</p><p>好的,接下来我们来看一个相对完整的生成器案例.</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">g</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">yield</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token keyword">return</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">yield</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">22</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token keyword">return</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">yield</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">33</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token keyword">return</span> <span class="token number">3</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> gn <span class="token operator">=</span> <span class="token function">g</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> timer <span class="token operator">=</span> <span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> val <span class="token operator">=</span> gn<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>val<span class="token punctuation">.</span>done<span class="token punctuation">)</span> <span class="token function">clearInterval</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>总的来看,可以这样理解,生成器内遇到yield会暂停函数的执行,直到你调用next方法函数才会恢复执行,在遇到下一个yield时又会暂停执行,然后就是循环这个操作了.</p><h2 id="yield关键字还可以作为输入输出" tabindex="-1"><a class="header-anchor" href="#yield关键字还可以作为输入输出" aria-hidden="true">#</a> yield关键字还可以作为输入输出</h2><p>这个关键字可以让你每一次调用next时的入参在外部传入,而且next的返回值也可以有yield指定,使用方式也很简单.</p><p>来看输入</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 输入</span>
<span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">gen</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;start&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">yield</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">yield</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">yield</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> g <span class="token operator">=</span> <span class="token function">gen</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
g<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
g<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
g<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
g<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样我们就可以在外部传入参数来执行函数,这里注意第一次调用next不会获取你的入参,它的作用是让你的生成器函数开始执行.</p><p>接下来是输出:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 输出</span>
<span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">gen</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">yield</span> <span class="token string">&quot;嘿嘿嘿1&quot;</span>
  <span class="token keyword">yield</span> <span class="token string">&quot;嘿嘿嘿2&quot;</span>
  <span class="token keyword">yield</span> <span class="token string">&quot;嘿嘿嘿3&quot;</span>
  <span class="token keyword">yield</span><span class="token operator">*</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> g <span class="token operator">=</span> <span class="token function">gen</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>g<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>g<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>g<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>g<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>g<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>g<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>g<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这就是yield输入输出的功能了;你可能注意到了,在上边的案例中,我们使用*来增强yield,这种方式可以让yield产生出可迭代对象,其实这和多写几行yield没什么区别.</p><h2 id="使用生成器来改写迭代器" tabindex="-1"><a class="header-anchor" href="#使用生成器来改写迭代器" aria-hidden="true">#</a> 使用生成器来改写迭代器</h2><p>我们可以使用生成器来配合迭代器</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">P</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>values<span class="token operator">=</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
  <span class="token operator">*</span><span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">yield</span><span class="token operator">*</span> <span class="token keyword">this</span><span class="token punctuation">.</span>values
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>wow,如此的简洁</p><h2 id="提前终止生成器" tabindex="-1"><a class="header-anchor" href="#提前终止生成器" aria-hidden="true">#</a> 提前终止生成器</h2><p>你可以直接在生成器对象上调用<code>return</code>这个api来提前终止,每个生成器对象上都会有这个api</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">gen</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">yield</span> <span class="token string">&quot;嘿嘿嘿1&quot;</span>
  <span class="token keyword">yield</span> <span class="token string">&quot;嘿嘿嘿2&quot;</span>
  <span class="token keyword">yield</span> <span class="token string">&quot;嘿嘿嘿3&quot;</span>
  <span class="token keyword">yield</span><span class="token operator">*</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> g<span class="token operator">=</span><span class="token function">gen</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
g<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
g<span class="token punctuation">.</span><span class="token function">return</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// g.next() 一旦生成器进入关闭状态是不能恢复的</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>生成器具有暂停代码执行的神奇功能,我们可以用它来满足一些特殊的场景.</p>`,25),e=[o];function c(u,l){return s(),a("div",null,e)}const k=n(t,[["render",c],["__file","dainiduhongbaoshuzhishengchengqi.html.vue"]]);export{k as default};