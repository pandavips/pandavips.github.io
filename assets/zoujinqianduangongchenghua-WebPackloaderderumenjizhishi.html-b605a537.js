import{_ as t,n as p,p as o,q as c,s,R as n,t as l,Y as a}from"./framework-2e061c0b.js";const i="/assets/20220924104436-f65662cd.png",u={},r=a(`<h2 id="什么是loader" tabindex="-1"><a class="header-anchor" href="#什么是loader" aria-hidden="true">#</a> 什么是loader?</h2><p>webpack原生只支持js,json等数据的解析,如果想要他支持其他资源的解析,那么就需要loader上场了,这也是loader的主要作用,它将资源解析成webpack能识别的形状~</p><p>通常遇到需要的loader,我们都会区社区直接找一些loader配置上去,但是你不好奇他们是怎么工作的吗?来手写一些loader,感受下吧~</p><h2 id="预先知识-分类以及优先级" tabindex="-1"><a class="header-anchor" href="#预先知识-分类以及优先级" aria-hidden="true">#</a> 预先知识-分类以及优先级</h2><p>按照流程分类,loader可分为下面四个类型:</p><ul><li>pre： 前置 loader</li><li>normal： 普通 loader</li><li>inline： 内联 loader</li><li>post： 后置 loader</li></ul><p>其执行的优先级:<code>pre &gt; normal &gt; inline &gt; post</code>,同等级的 loader 执行顺序为：<code>从右到左，从下到上</code>,可通过<code>enforce</code>来配置该loader属于哪种类型:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>  <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">enforce</span><span class="token operator">:</span> <span class="token string">&quot;pre&quot;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.js$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
      <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">&quot;loader1&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="inline-loader的前缀" tabindex="-1"><a class="header-anchor" href="#inline-loader的前缀" aria-hidden="true">#</a> inline loader的前缀</h3><ul><li><code>!</code> 跳过 normal loader。</li><li><code>-!</code> 跳过 pre 和 normal loader。</li><li><code>!!</code> 跳过 pre、 normal 和 post loader。</li></ul><p>示例:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> Styles <span class="token keyword">from</span> <span class="token string">&#39;-!style-loader!css-loader?modules!./styles.css&#39;</span><span class="token punctuation">;</span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="pitch-loader的执行流程" tabindex="-1"><a class="header-anchor" href="#pitch-loader的执行流程" aria-hidden="true">#</a> pitch loader的执行流程</h2><p>pitch是loader上的一个方法,可以更方便我们进行流程控制;如果pitch有返回值,那么将触发熔断机制;如果触发熔断机制,那么这个pitch执行完成之后,流程会返回到上一个loader的主函数,这样更利于在代码中来控制流程,而不是通过固定的配置</p><p>流程可以看下图 <img src="`+i+`"></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">source</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;normal excution&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   
    <span class="token keyword">return</span> source<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// loader上的pitch方法，非必须</span>
module<span class="token punctuation">.</span>exports<span class="token punctuation">.</span><span class="token function-variable function">pitch</span> <span class="token operator">=</span>  <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;pitching graph&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// todo</span>
    <span class="token keyword">return</span> <span class="token string">&quot;&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="异步loader" tabindex="-1"><a class="header-anchor" href="#异步loader" aria-hidden="true">#</a> 异步loader</h2><p>异步loader通过调用<code>async</code>方法返回一个回调,通过回调完成异步操作,后续loader会被该loader阻塞</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">source</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> cb <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">async</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 在异步回调中手动调用 cb 返回处理结果;第一个参数为错误信息</span>
      <span class="token function">cb</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> source<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="raw-loader" tabindex="-1"><a class="header-anchor" href="#raw-loader" aria-hidden="true">#</a> raw-loader</h2><p>其实与其他loader没有什么差异,只因为它的内容是Buffer流,特别适合处理静态资源,比如图片,视频等,需要通过raw属性来告知webpack,该loader进行接受的是二进制数据</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// loaders/simple-raw-loader.js</span>
module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">source</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 将输出 buffer 类型的二进制数据</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> source
<span class="token punctuation">}</span>
<span class="token comment">// 告诉 wepack 这个 loader 需要接收的是二进制格式的数据</span>
module<span class="token punctuation">.</span>exports<span class="token punctuation">.</span>raw <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="接下来-我们自己开发一个loader" tabindex="-1"><a class="header-anchor" href="#接下来-我们自己开发一个loader" aria-hidden="true">#</a> 接下来,我们自己开发一个loader</h2><p>我们来为每一个js文件前边加上一句<code>console.log(&#39;hello&#39;)</code></p><p>那么代码下面这样写,这个loader就完成了</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">}</span></span> <span class="token parameter">content</span> 文件内容
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">}</span></span> <span class="token parameter">map</span> sourcemap
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">}</span></span> <span class="token parameter">meta</span> 别的loader传递的参数
 */</span>
module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">loaderHello</span><span class="token punctuation">(</span><span class="token parameter">content<span class="token punctuation">,</span> map<span class="token punctuation">,</span> meta</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">[</span>content<span class="token punctuation">,</span> map<span class="token punctuation">,</span> meta<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> pre <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">console.log(&#39;hello&#39;)\\n</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> pre <span class="token operator">+</span> content<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置好就可以愉快打包啦~</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.js$</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">,</span>
    <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&quot;../loader/hello/index.js&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们这个前缀是硬编码,我们希望这部分内容是动态可选的,所以我们需要配置我们的loader,那我们需要<code>getOptions</code>这个api来帮助我们;开搞~</p><p>配置格式需要指定一个<code>JsonSchema</code>来固定配置的形状,那么我们可以这样写</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;object&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;properties&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;code&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;pre code content,allow null&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;string&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;additionalProperties&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来对loader进行改造</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">}</span></span> <span class="token parameter">content</span> 文件内容
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">}</span></span> <span class="token parameter">map</span> sourcemap
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">}</span></span> <span class="token parameter">meta</span> 别的loader传递的参数
 */</span>
<span class="token keyword">const</span> schema <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;./schema.json&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">loaderHello</span><span class="token punctuation">(</span><span class="token parameter">content<span class="token punctuation">,</span> map<span class="token punctuation">,</span> meta</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> option <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getOptions</span><span class="token punctuation">(</span>schema<span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">{</span> content<span class="token punctuation">,</span> map<span class="token punctuation">,</span> meta<span class="token punctuation">,</span> option <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> pre <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>option<span class="token punctuation">.</span>code<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
  </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> pre <span class="token operator">+</span> content<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置项</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.js$</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">,</span>
    <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&quot;../loader/hello/index.js&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">code</span><span class="token operator">:</span> <span class="token string">&quot;console.log(&#39;msg from config&#39;)&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样,一个<code>hello world</code>级别的loader就完成啦~</p><h2 id="其它loader示例" tabindex="-1"><a class="header-anchor" href="#其它loader示例" aria-hidden="true">#</a> 其它loader示例</h2><p>来手动创建一些loader感受下</p><h3 id="babel-loader" tabindex="-1"><a class="header-anchor" href="#babel-loader" aria-hidden="true">#</a> babel-loader</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> babel <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;@babel/core&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> schema <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;./schema.json&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">content</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> call <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">async</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> options <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getOptions</span><span class="token punctuation">(</span>schema<span class="token punctuation">)</span><span class="token punctuation">;</span>
  babel<span class="token punctuation">.</span><span class="token function">transform</span><span class="token punctuation">(</span>content<span class="token punctuation">,</span> options<span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> result</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">call</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> result<span class="token punctuation">.</span>code<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="file-loader" tabindex="-1"><a class="header-anchor" href="#file-loader" aria-hidden="true">#</a> file-loader</h3>`,41),d=s("code",null,"loader-utils",-1),k={href:"https://github.com/webpack/loader-utils",target:"_blank",rel:"noopener noreferrer"},v=a(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> loaderUtils <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;loader-utils&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">content</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 生成文件名</span>
  <span class="token keyword">const</span> filename <span class="token operator">=</span> loaderUtils<span class="token punctuation">.</span><span class="token function">interpolateName</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token string">&quot;[hash].[ext]&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    content<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 输出文件</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">emitFile</span><span class="token punctuation">(</span>filename<span class="token punctuation">,</span> content<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 暴露出去,众所周知webpack眼里所有资源都是模块</span>
  <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">export default &#39;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>filename<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&#39;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.(png|jpe?g|gif)$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
  <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">&quot;./loaders/file-loader.js&quot;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&quot;javascript/auto&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 解决图片重复打包问题,否则webpack会自己再去打包一次(如果不配置,你的输出目录将会出现双倍资源)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="结语" tabindex="-1"><a class="header-anchor" href="#结语" aria-hidden="true">#</a> 结语</h2><p>就使用上来说,还是挺简单的,但是这种东西挺注重实战的,只有在实战中才能真正有更深入的理解.</p>`,5);function m(b,g){const e=p("ExternalLinkIcon");return o(),c("div",null,[r,s("p",null,[n("这里用到的"),d,n("可以自行去看一下:"),s("a",k,[n("https://github.com/webpack/loader-utils"),l(e)])]),v])}const f=t(u,[["render",m],["__file","zoujinqianduangongchenghua-WebPackloaderderumenjizhishi.html.vue"]]);export{f as default};
