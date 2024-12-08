import{_ as p,n as i,p as o,q as r,s as n,R as s,t as a,Y as t}from"./framework-2e061c0b.js";const l={},c=t('<h2 id="今天碰到一个不大不小的问题" tabindex="-1"><a class="header-anchor" href="#今天碰到一个不大不小的问题" aria-hidden="true">#</a> 今天碰到一个不大不小的问题</h2><p>前排提示：本片文章内容较为浅显，只适合作为一个抛砖引玉的作用，如果你希望得到一个较为详细的指南，那么本文可能不适合。</p><p>在平时工作中，如果大家的代码风格不统一，那么会出现的一个问题是，git记录会出现混乱的情况，导致合并代码变得较为困难，其难度呈指数型上升。所以，在日常工作中我们都会进行一些工程化配置来约束我们的代码风格，进而避免出现上述情况。</p><h2 id="话不多说-直接上方案" tabindex="-1"><a class="header-anchor" href="#话不多说-直接上方案" aria-hidden="true">#</a> 话不多说,直接上方案</h2><p>目前在前端主流方案中,通常是<code>prettier</code>和<code>eslint</code>,以及<code>editorconfig</code>三剑客来约束代码风格</p><h2 id="prettier" tabindex="-1"><a class="header-anchor" href="#prettier" aria-hidden="true">#</a> prettier</h2><p>它是一个代码格式化工具,在一致的配置下,使用它格式化可以获得统一的代码风格.</p>',7),d={href:"https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode",target:"_blank",rel:"noopener noreferrer"},u=t(`<p>然后在根目录创建<code>prettier.config.js</code>配置文件,将编辑器的默认格式化工具设置为prettier(这个总不用教吧 =.=)</p><p>简单的配置方案示例:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// https://www.prettier.cn/docs/install.html</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
 <span class="token comment">// 一行最多多少个字符</span>
 <span class="token literal-property property">printWidth</span><span class="token operator">:</span> <span class="token number">150</span><span class="token punctuation">,</span>
 <span class="token comment">// 指定每个缩进级别的空格数</span>
 <span class="token literal-property property">tabWidth</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
 <span class="token comment">// 使用制表符而不是空格缩进行</span>
 <span class="token literal-property property">useTabs</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
 <span class="token comment">// 在语句末尾打印分号</span>
 <span class="token literal-property property">semi</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
 <span class="token comment">// 使用单引号而不是双引号</span>
 <span class="token comment">// 在对象文字中的括号之间打印空格</span>
 <span class="token literal-property property">bracketSpacing</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
 <span class="token comment">// jsx 标签的反尖括号需要换行</span>
 <span class="token literal-property property">jsxBracketSameLine</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
 <span class="token comment">// 在单独的箭头函数参数周围包括括号 always：(x) =&gt; x \\ avoid：x =&gt; x</span>
 <span class="token literal-property property">arrowParens</span><span class="token operator">:</span> <span class="token string">&#39;always&#39;</span><span class="token punctuation">,</span>
 <span class="token comment">// 这两个选项可用于格式化以给定字符偏移量（分别包括和不包括）开始和结束的代码</span>
 <span class="token literal-property property">rangeStart</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
 <span class="token literal-property property">rangeEnd</span><span class="token operator">:</span> <span class="token number">Infinity</span><span class="token punctuation">,</span>
 <span class="token comment">// 指定要使用的解析器，不需要写文件开头的 @prettier</span>
 <span class="token literal-property property">requirePragma</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
 <span class="token comment">// 不需要自动在文件开头插入 @prettier</span>
 <span class="token literal-property property">insertPragma</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
 <span class="token comment">// 使用默认的折行标准 always\\never\\preserve</span>
 <span class="token literal-property property">proseWrap</span><span class="token operator">:</span> <span class="token string">&#39;preserve&#39;</span><span class="token punctuation">,</span>
 <span class="token comment">// 指定HTML文件的全局空格敏感度 css\\strict\\ignore</span>
 <span class="token literal-property property">htmlWhitespaceSensitivity</span><span class="token operator">:</span> <span class="token string">&#39;css&#39;</span><span class="token punctuation">,</span>
 <span class="token literal-property property">singleQuote</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
 <span class="token comment">// 更改引用对象属性的时间 可选值&quot;&lt;as-needed|consistent|preserve&gt;&quot;</span>
 <span class="token literal-property property">quoteProps</span><span class="token operator">:</span> <span class="token string">&#39;as-needed&#39;</span><span class="token punctuation">,</span>
 <span class="token comment">// 在JSX中使用单引号而不是双引号</span>
 <span class="token literal-property property">jsxSingleQuote</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
 <span class="token comment">// 多行时尽可能打印尾随逗号。（例如，单行数组永远不会出现逗号结尾。） 可选值&quot;&lt;none|es5|all&gt;&quot;，默认none</span>
 <span class="token literal-property property">trailingComma</span><span class="token operator">:</span> <span class="token string">&#39;none&#39;</span><span class="token punctuation">,</span>
 <span class="token comment">// Vue文件脚本和样式标签缩进</span>
 <span class="token literal-property property">vueIndentScriptAndStyle</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
 <span class="token comment">// 换行符使用 lf 结尾是 可选值&quot;&lt;auto|lf|crlf|cr&gt;&quot;</span>
 <span class="token literal-property property">endOfLine</span><span class="token operator">:</span> <span class="token string">&#39;lf&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="eslint" tabindex="-1"><a class="header-anchor" href="#eslint" aria-hidden="true">#</a> eslint</h2><p>通常我们不会自己去配置这个工具,因为规则实在是太多了,所以我们一般是直接使用社区的配置。 而在我们日常的开发中,一般脚手架都会默认帮我们创建这些内容,所以此处略过。</p>`,5),m={href:"https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint",target:"_blank",rel:"noopener noreferrer"},v=n("h2",{id:"editorconfig",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#editorconfig","aria-hidden":"true"},"#"),s(" editorconfig")],-1),k=n("p",null,"有人喜欢用vscode，有人喜欢用webstorm，那怎么保持代码风格统一呢？那就要祭出这个大杀器",-1),b=n("p",null,"使用也很简单",-1),h=n("p",null,"安装拓展（webstorm插件商店也会有它，放心~）",-1),f={href:"https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig",target:"_blank",rel:"noopener noreferrer"},g=t(`<p>在项目根目录创建<code>.editorconfig</code>文件，下边是一个简单的配置方案</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># Editor configuration, see http://editorconfig.org

# 表示是最顶层的 EditorConfig 配置文件
root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行首的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="有了这三剑客" tabindex="-1"><a class="header-anchor" href="#有了这三剑客" aria-hidden="true">#</a> 有了这三剑客</h2><p>不用关心代码风格问题了,可以专心编码了！</p>`,4);function _(y,x){const e=i("ExternalLinkIcon");return o(),r("div",null,[c,n("p",null,[s("使用也很简单,vscode安装它 "),n("a",d,[s("https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode"),a(e)])]),u,n("p",null,[s("通常我们也会安装它的vscode拓展来更好的支持它 "),n("a",m,[s("https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint"),a(e)])]),v,k,b,h,n("p",null,[n("a",f,[s("https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig"),a(e)])]),g])}const E=p(l,[["render",_],["__file","tuanduidaimafenggetongyifangan.html.vue"]]);export{E as default};
