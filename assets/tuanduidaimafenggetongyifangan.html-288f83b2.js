import{_ as e,p as i,q as n,Y as s}from"./framework-2e061c0b.js";const d={},t=s(`<h2 id="今天碰到一个不大不小的问题" tabindex="-1"><a class="header-anchor" href="#今天碰到一个不大不小的问题" aria-hidden="true">#</a> 今天碰到一个不大不小的问题</h2><p>那就是大家的代码风格不一样，导致git的merge,以及阅读提交记录复杂度直线上升,所以统一大家的代码风格,势在必行!</p><h2 id="话不多说-直接上方案" tabindex="-1"><a class="header-anchor" href="#话不多说-直接上方案" aria-hidden="true">#</a> 话不多说,直接上方案</h2><p>目前在前端方案中,通常是<code>prettier</code>和<code>eslint</code>,以及<code>editorconfig</code>三剑客来约束代码风格</p><h2 id="prettier" tabindex="-1"><a class="header-anchor" href="#prettier" aria-hidden="true">#</a> prettier</h2><p>它是一个代码格式化工具,在一致的配置下,使用它格式化可以获得统一的代码风格.</p><p>使用也很简单,vscode安装它 https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode</p><p>然后在根目录创建<code>prettier.config.js</code>配置文件,将编辑器的默认格式化工具设置为prettier(这个总不用教吧 =.=)</p><p>简单的配置方案示例:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// https://www.prettier.cn/docs/install.html
module.exports = {
	// 一行最多多少个字符
	printWidth: 150,
	// 指定每个缩进级别的空格数
	tabWidth: 2,
	// 使用制表符而不是空格缩进行
	useTabs: true,
	// 在语句末尾打印分号
	semi: true,
	// 使用单引号而不是双引号
	// 在对象文字中的括号之间打印空格
	bracketSpacing: true,
	// jsx 标签的反尖括号需要换行
	jsxBracketSameLine: false,
	// 在单独的箭头函数参数周围包括括号 always：(x) =&gt; x \\ avoid：x =&gt; x
	arrowParens: &#39;always&#39;,
	// 这两个选项可用于格式化以给定字符偏移量（分别包括和不包括）开始和结束的代码
	rangeStart: 0,
	rangeEnd: Infinity,
	// 指定要使用的解析器，不需要写文件开头的 @prettier
	requirePragma: false,
	// 不需要自动在文件开头插入 @prettier
	insertPragma: false,
	// 使用默认的折行标准 always\\never\\preserve
	proseWrap: &#39;preserve&#39;,
	// 指定HTML文件的全局空格敏感度 css\\strict\\ignore
	htmlWhitespaceSensitivity: &#39;css&#39;,
	singleQuote: true,
	// 更改引用对象属性的时间 可选值&quot;&lt;as-needed|consistent|preserve&gt;&quot;
	quoteProps: &#39;as-needed&#39;,
	// 在JSX中使用单引号而不是双引号
	jsxSingleQuote: false,
	// 多行时尽可能打印尾随逗号。（例如，单行数组永远不会出现逗号结尾。） 可选值&quot;&lt;none|es5|all&gt;&quot;，默认none
	trailingComma: &#39;none&#39;,
	// Vue文件脚本和样式标签缩进
	vueIndentScriptAndStyle: false,
	// 换行符使用 lf 结尾是 可选值&quot;&lt;auto|lf|crlf|cr&gt;&quot;
	endOfLine: &#39;lf&#39;
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="eslint" tabindex="-1"><a class="header-anchor" href="#eslint" aria-hidden="true">#</a> eslint</h2><p>通常我们不会自己去配置这个工具,因为规则实在是太多了,所以我们一般是直接使用社区的配置。 而在我们日常的开发中,一般脚手架都会默认帮我们创建这些内容,所以此处略过。</p><p>通常我们也会安装它的vscode拓展来更好的支持它 https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint</p><h2 id="editorconfig" tabindex="-1"><a class="header-anchor" href="#editorconfig" aria-hidden="true">#</a> editorconfig</h2><p>有人喜欢用vscode，有人喜欢用webstorm，那怎么保持代码风格统一呢？那就要祭出这个大杀器</p><p>使用也很简单</p><p>安装拓展（webstorm插件商店也会有它，放心~）</p><p>https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig</p><p>在项目根目录创建<code>.editorconfig</code>文件，下边是一个简单的配置方案</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># Editor configuration, see http://editorconfig.org

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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="有了这三剑客" tabindex="-1"><a class="header-anchor" href="#有了这三剑客" aria-hidden="true">#</a> 有了这三剑客</h2><p>不用关心代码风格问题了,可以专心编码了！</p>`,22),a=[t];function r(l,c){return i(),n("div",null,a)}const u=e(d,[["render",r],["__file","tuanduidaimafenggetongyifangan.html.vue"]]);export{u as default};
