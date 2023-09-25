import{_ as r,n as l,p as d,q as t,s as n,R as s,t as e,Y as i}from"./framework-2e061c0b.js";const c={},o=n("h2",{id:"这是一个零散的笔记汇总",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#这是一个零散的笔记汇总","aria-hidden":"true"},"#"),s(" 这是一个零散的笔记汇总")],-1),p=n("p",null,"好记性不如烂笔头,记一些杂乱的东西,避免了每次都要去百度的尴尬境地",-1),m=n("h2",{id:"地址收集-避免每次都要找半天",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#地址收集-避免每次都要找半天","aria-hidden":"true"},"#"),s(" 地址收集(避免每次都要找半天)")],-1),u={href:"https://github.com/coreybutler/nvm-windows",target:"_blank",rel:"noopener noreferrer"},v={href:"https://learn.microsoft.com/zh-cn/windows/wsl/about",target:"_blank",rel:"noopener noreferrer"},b={href:"https://msdn.itellyou.cn/",target:"_blank",rel:"noopener noreferrer"},h=i(`<h2 id="设置淘宝镜像-不建议-建议使用下面的方式" tabindex="-1"><a class="header-anchor" href="#设置淘宝镜像-不建议-建议使用下面的方式" aria-hidden="true">#</a> 设置淘宝镜像(不建议,建议使用下面的方式)</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 已经废弃</span>
<span class="token function">npm</span> config <span class="token builtin class-name">set</span> registry https://registry.npm.taobao.org
<span class="token comment"># 最新的taobao镜像地址</span>
<span class="token function">npm</span> config <span class="token builtin class-name">set</span> registry http://registry.npmmirror.com
<span class="token comment"># 恢复到npm官方镜像地址</span>
<span class="token function">npm</span> config <span class="token builtin class-name">set</span> registry https://registry.npmjs.org
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nrm-牛肉面-设置npm的镜像地址" tabindex="-1"><a class="header-anchor" href="#nrm-牛肉面-设置npm的镜像地址" aria-hidden="true">#</a> NRM(牛肉面)设置NPM的镜像地址</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> i nrm <span class="token parameter variable">-g</span>
<span class="token comment"># 列出镜像地址</span>
nrm <span class="token function">ls</span> 
<span class="token comment"># 使用镜像地址</span>
nrm use taobao
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="删除整个依赖库node-modules" tabindex="-1"><a class="header-anchor" href="#删除整个依赖库node-modules" aria-hidden="true">#</a> 删除整个依赖库node_modules</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 如果没有安装需要先安装这个</span>
<span class="token function">npm</span> <span class="token function">install</span> rimraf <span class="token parameter variable">-g</span>

<span class="token comment"># 执行删除</span>
rimraf node_modules

<span class="token comment"># 清空npm缓存</span>
<span class="token function">npm</span> cache clean <span class="token parameter variable">--force</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="vmware-虚拟机固定ip" tabindex="-1"><a class="header-anchor" href="#vmware-虚拟机固定ip" aria-hidden="true">#</a> VMware 虚拟机固定IP</h2><p>1.先将虚拟机网络连接模式改为NAT 2.设置NAT网关 3.设置DHCP 4.将虚拟机系统设置为静态ip,ip要对应前边设置的网关</p><p>centos示例:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> /etc/sysconfig/network-scripts/ifcfg-ens33

<span class="token assign-left variable">TYPE</span><span class="token operator">=</span>Ethernet
<span class="token assign-left variable">PROXY_METHOD</span><span class="token operator">=</span>none
<span class="token assign-left variable">BROWSER_ONLY</span><span class="token operator">=</span>no
<span class="token assign-left variable">BOOTPROTO</span><span class="token operator">=</span>static
<span class="token assign-left variable">DEFROUTE</span><span class="token operator">=</span>yes
<span class="token assign-left variable">IPV4_FAILURE_FATAL</span><span class="token operator">=</span>no
<span class="token assign-left variable">IPV6INIT</span><span class="token operator">=</span>yes
<span class="token assign-left variable">IPV6_AUTOCONF</span><span class="token operator">=</span>yes
<span class="token assign-left variable">IPV6_DEFROUTE</span><span class="token operator">=</span>yes
<span class="token assign-left variable">IPV6_FAILURE_FATAL</span><span class="token operator">=</span>no
<span class="token assign-left variable">IPV6_ADDR_GEN_MODE</span><span class="token operator">=</span>stable-privacy
<span class="token assign-left variable">NAME</span><span class="token operator">=</span>ens33
<span class="token assign-left variable">UUID</span><span class="token operator">=</span>1f6d2414-12b7-40ef-8fb1-d2e6db9c739b
<span class="token assign-left variable">DEVICE</span><span class="token operator">=</span>ens33
<span class="token assign-left variable">ONBOOT</span><span class="token operator">=</span>yes
<span class="token assign-left variable">IPADDR</span><span class="token operator">=</span><span class="token number">192.168</span>.13.130
<span class="token assign-left variable">NETMASK</span><span class="token operator">=</span><span class="token number">255.255</span>.255.0
<span class="token assign-left variable">GATEWAY</span><span class="token operator">=</span><span class="token number">192.168</span>.13.254
<span class="token assign-left variable">DNS1</span><span class="token operator">=</span><span class="token number">114.114</span>.114.114
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ubuntu22-04换源" tabindex="-1"><a class="header-anchor" href="#ubuntu22-04换源" aria-hidden="true">#</a> ubuntu22.04换源</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /etc/apt/
<span class="token function">cp</span> sources.list sources.list_bak
<span class="token function">vim</span> sources.list <span class="token comment">#用下边内容覆盖</span>

deb http://mirrors.aliyun.com/ubuntu/ jammy main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ jammy main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ jammy-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ jammy-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ jammy-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ jammy-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ jammy-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ jammy-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ jammy-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ jammy-backports main restricted universe multiverse

<span class="token function">apt</span> update
<span class="token function">apt</span> upgrade
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="linux将目录设置为所有人都能读写" tabindex="-1"><a class="header-anchor" href="#linux将目录设置为所有人都能读写" aria-hidden="true">#</a> Linux将目录设置为所有人都能读写</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># &lt;!-- 用chmod命令, 先进入要修改权限的目录abc的上一级目录 , --&gt;</span>
<span class="token comment"># &lt;!-- 然后运行 --&gt;</span>
<span class="token function">chmod</span> <span class="token parameter variable">-R</span> o+r+w abc
<span class="token comment"># &lt;!-- 再运行 --&gt;</span>
<span class="token function">chmod</span> o+x+w abc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="乌班图防火墙开关" tabindex="-1"><a class="header-anchor" href="#乌班图防火墙开关" aria-hidden="true">#</a> 乌班图防火墙开关</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 开启</span>
ufw <span class="token builtin class-name">enable</span>
<span class="token comment"># 关闭</span>
ufw disable
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="生成ssh-key" tabindex="-1"><a class="header-anchor" href="#生成ssh-key" aria-hidden="true">#</a> 生成ssh key</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ssh-keygen <span class="token parameter variable">-t</span> rsa <span class="token parameter variable">-C</span> <span class="token string">&quot;919401990@qq.com&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="debian11-一些常见的编译环境" tabindex="-1"><a class="header-anchor" href="#debian11-一些常见的编译环境" aria-hidden="true">#</a> debian11 一些常见的编译环境</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> pkg-config <span class="token function">make</span> libpng-dev gcc patch <span class="token parameter variable">-y</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="创建react-typescript项目" tabindex="-1"><a class="header-anchor" href="#创建react-typescript项目" aria-hidden="true">#</a> 创建react typescript项目</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">pnpm</span> dlx create-react-app pd-project <span class="token parameter variable">--template</span> typescript
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="解决npm下载二进制巨慢的问题" tabindex="-1"><a class="header-anchor" href="#解决npm下载二进制巨慢的问题" aria-hidden="true">#</a> 解决NPM下载二进制巨慢的问题</h2>`,23),g=n("code",null,".npmrc",-1),k=n("code",null,"antfu",-1),f={href:"https://antfu.me/posts/npm-binary-mirrors",target:"_blank",rel:"noopener noreferrer"},_=i(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>NODEJS_ORG_MIRROR=https://cdn.npmmirror.com/binaries/node
NVM_NODEJS_ORG_MIRROR=https://cdn.npmmirror.com/binaries/node
PHANTOMJS_CDNURL=https://cdn.npmmirror.com/binaries/phantomjs
CHROMEDRIVER_CDNURL=https://cdn.npmmirror.com/binaries/chromedriver
OPERADRIVER_CDNURL=https://cdn.npmmirror.com/binaries/operadriver
ELECTRON_MIRROR=https://cdn.npmmirror.com/binaries/electron/
ELECTRON_BUILDER_BINARIES_MIRROR=https://cdn.npmmirror.com/binaries/electron-builder-binaries/
SASS_BINARY_SITE=https://cdn.npmmirror.com/binaries/node-sass
SWC_BINARY_SITE=https://cdn.npmmirror.com/binaries/node-swc
NWJS_URLBASE=https://cdn.npmmirror.com/binaries/nwjs/v
PUPPETEER_DOWNLOAD_HOST=https://cdn.npmmirror.com/binaries
SENTRYCLI_CDNURL=https://cdn.npmmirror.com/binaries/sentry-cli
SAUCECTL_INSTALL_BINARY_MIRROR=https://cdn.npmmirror.com/binaries/saucectl
npm_config_sharp_binary_host=https://cdn.npmmirror.com/binaries/sharp
npm_config_sharp_libvips_binary_host=https://cdn.npmmirror.com/binaries/sharp-libvips
npm_config_robotjs_binary_host=https://cdn.npmmirror.com/binaries/robotj
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="win-ltsc激活" tabindex="-1"><a class="header-anchor" href="#win-ltsc激活" aria-hidden="true">#</a> win ltsc激活</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>slmgr <span class="token parameter variable">-ipk</span> M7XTQ-FN8P6-TTKYV-9D4CC-J462D

slmgr <span class="token parameter variable">-skms</span> kms.03k.org

slmgr <span class="token parameter variable">-ato</span>

slmgr <span class="token parameter variable">-dlv</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="git-追踪文件名大小写" tabindex="-1"><a class="header-anchor" href="#git-追踪文件名大小写" aria-hidden="true">#</a> git 追踪文件名大小写</h2><p>由于默认的git不会追踪文件大小写,这会导致一些问题,白白浪费我们的时间来排查问题,我们可以防患于未然,执行以下命令在未来杜绝这个问题</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 全局</span>
<span class="token function">git</span> config <span class="token parameter variable">--global</span> core.ignorecase <span class="token boolean">false</span>
<span class="token comment"># 项目 </span>
<span class="token function">git</span> config core.ignorecase <span class="token boolean">false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="给linux文件添加可执行权限" tabindex="-1"><a class="header-anchor" href="#给linux文件添加可执行权限" aria-hidden="true">#</a> 给linux文件添加可执行权限</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>
<span class="token function">chmod</span> u+x xxx.sh

./xxx.sh

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="git-只拉取最新的提交-git-clone速度拉满" tabindex="-1"><a class="header-anchor" href="#git-只拉取最新的提交-git-clone速度拉满" aria-hidden="true">#</a> git 只拉取最新的提交,git clone速度拉满</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> clone <span class="token parameter variable">-b</span> develop git@xxx.org:username/repo.git <span class="token parameter variable">--depth</span><span class="token operator">=</span><span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="禁用ts检查" tabindex="-1"><a class="header-anchor" href="#禁用ts检查" aria-hidden="true">#</a> 禁用ts检查</h2><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token function">单行忽略</span><span class="token punctuation">(</span>添加到特定行的行前来忽略这一行的错误<span class="token punctuation">)</span>
<span class="token comment">// @ts-ignore</span>

<span class="token function">跳过对某些文件的检查</span> <span class="token punctuation">(</span>添加到该文件的首行才起作用<span class="token punctuation">)</span>
<span class="token comment">// @ts-nocheck</span>

对某些文件的检查
<span class="token comment">// @ts-check</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="adb连接设备" tabindex="-1"><a class="header-anchor" href="#adb连接设备" aria-hidden="true">#</a> adb连接设备</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>adb connect <span class="token punctuation">[</span>ip<span class="token punctuation">]</span>:<span class="token punctuation">[</span>port<span class="token punctuation">]</span>
<span class="token comment"># 比如</span>
adb connect <span class="token number">100.78</span>.252.21:5555
<span class="token comment"># 断开</span>
adb disconnect <span class="token punctuation">[</span>ip<span class="token punctuation">]</span>:<span class="token punctuation">[</span>port<span class="token punctuation">]</span>
<span class="token comment"># 使用adb远程控制手机</span>
scrcpy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置bash终端代理" tabindex="-1"><a class="header-anchor" href="#配置bash终端代理" aria-hidden="true">#</a> 配置bash终端代理</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 端口一般指向你本地的代理服务器</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">http_proxy</span><span class="token operator">=</span>http://127.0.0.1:7890<span class="token punctuation">;</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">https_proxy</span><span class="token operator">=</span>http://127.0.0.1:7890<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="收集到的测试资源" tabindex="-1"><a class="header-anchor" href="#收集到的测试资源" aria-hidden="true">#</a> 收集到的测试资源</h2><h3 id="视频链接" tabindex="-1"><a class="header-anchor" href="#视频链接" aria-hidden="true">#</a> 视频链接</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>3秒
https://www.w3school.com.cn/i/movie.ogg
mp4

10秒
https://www.runoob.com/try/demo_source/mov_bbb.mp4

10秒
https://www.runoob.com/try/demo_source/movie.mp4

1分钟
http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4

46秒
http://vjs.zencdn.net/v/oceans.mp4

52秒
http://vjs.zencdn.net/v/oceans.mp4

小米 mix fold3
https://cdn.cnbj1.fds.api.mi-img.com/product-images/xiaomimixfold3k3zux1/video-1-1.mp4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="图片上传接口url" tabindex="-1"><a class="header-anchor" href="#图片上传接口url" aria-hidden="true">#</a> 图片上传接口url</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>none;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="直播流" tabindex="-1"><a class="header-anchor" href="#直播流" aria-hidden="true">#</a> 直播流</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http://live-uat.nrbvc.com/chicken/main.flv
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,23);function x(y,R){const a=l("ExternalLinkIcon");return d(),t("div",null,[o,p,m,n("ul",null,[n("li",null,[n("a",u,[s("nvm win地址"),e(a)])]),n("li",null,[n("a",v,[s("微软wsl2"),e(a)])]),n("li",null,[n("a",b,[s("win镜像地址"),e(a)])])]),h,n("p",null,[s("在"),g,s("文件内加入以下内容,从"),k,s("博客上看来的,经过测试过相当快~ 原文链接:"),n("a",f,[s("https://antfu.me/posts/npm-binary-mirrors"),e(a)])]),_])}const N=r(c,[["render",x],["__file","zaxiangbijihuizong.html.vue"]]);export{N as default};
