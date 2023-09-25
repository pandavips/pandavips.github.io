import{_ as n,p as s,q as a,Y as e}from"./framework-2e061c0b.js";const t={},p=e(`<h2 id="开局" tabindex="-1"><a class="header-anchor" href="#开局" aria-hidden="true">#</a> 开局</h2><p>不按分类顺序排放,我是持续加进去的,想到一个写一个属于是~</p><h2 id="浅拷贝和深拷贝-来源于某次面试的思考" tabindex="-1"><a class="header-anchor" href="#浅拷贝和深拷贝-来源于某次面试的思考" aria-hidden="true">#</a> 浅拷贝和深拷贝(来源于某次面试的思考)</h2><p>首先拷贝需要创建一个新的对象,浅拷贝即指把对象的属性拷贝一份,如果属性是基础类型,那么拷贝的是基础类型的值,如果属性是引用类型(对象),那么拷贝的是引用地址;而深拷贝与浅拷贝的区别是如果属性是引用类型,那么拷贝的是这个引用类型的浅拷贝,深拷贝的作用是创建对象完全的副本,互不影响! 其中浅拷贝需要考虑的东西相对比较简单,只需要判断一下类型即可;但是深度拷贝还需要考虑循环引用等情况</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>const isObject = (target) =&gt; {
  return target !== null &amp;&amp; typeof target === &quot;object&quot;;
};

// 浅拷贝
const shallowCopy = (original) =&gt; {
  /**
   * 判断类型
   *  基础类型 &gt; 直接返回
   *  引用类型 &gt; copy
   *  */
  if (!isObject(original)) return original;
  const result = Array.isArray(original) ? [] : {};
  for (const key in original) {
    if (original.hasOwnProperty(key)) {
      result[key] = original[key];
    }
  }
  return result;
};


// 深拷贝
const deepCopy = (original) =&gt; {
  // 用一个缓存来解决循环依赖的问题
  const map = new Map();
  const nestedCopy = () =&gt; {
    if (!isObject(original)) return original;
    const result = Array.isArray(original) ? [] : {};
    // 设置缓存
    map.set(original, result);
    for (const key in original) {
      if (original.hasOwnProperty(key)) {
        const val = original[key];
        if (isObject(val)) {
          // TODO 还需要判断原生对象类型,比如Date,你需要new一个Date;这里就不实现了
          if (map.has(val)) {
            const cacheVal = map.get(val);
            result[key] = cacheVal;
          } else {
            const copyVal = nestedCopy(val);
            result[key] = copyVal;
          }
        } else {
          result[key] = original[key];
        }
      }
    }
    return result;
  };
  const result = nestedCopy();
  // 置空缓存
  map.clear();
  return result;
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="apply" tabindex="-1"><a class="header-anchor" href="#apply" aria-hidden="true">#</a> apply</h2><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>// 我们先准备一个对象以及一个函数
const _t = {
  name: &#39;panda&#39;
}
function sayName(age, sex) {
  console.log(this.name)
  console.log(age)
  console.log(sex)
}
Function.prototype.myApply = function (context, args) {
  var t_obj = context || window;
  // 将fn作为对象的一个属性
  t_obj.fn = this;
  // 然后从这个对象去访问这个方法并执行
  const result = t_obj.fn(...args)
  delete t_obj.fn;
  // 别忘记返回函数返回的返回值
  return result;
};

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="call" tabindex="-1"><a class="header-anchor" href="#call" aria-hidden="true">#</a> call</h2><h2 id="bind" tabindex="-1"><a class="header-anchor" href="#bind" aria-hidden="true">#</a> bind</h2><p>这三个实现一个基本就都能实现了,bind相比于上边两个,实现起来相对比较麻烦,因为需要考虑的东西要多一些</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code></code></pre><div class="line-numbers" aria-hidden="true"></div></div><h2 id="数组去重" tabindex="-1"><a class="header-anchor" href="#数组去重" aria-hidden="true">#</a> 数组去重</h2><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>// 第一种 利用set的特性
const duplicateRemoval=(arr)=&gt;{
  // 另外一种写法:Array.from(new Set(arr))
 return [...new Set(arr)]
}
// 第二种 双重循环,最笨方法(for+findIndex,for+find,filter+indexOf,for+includes是一样的原理)
const duplicateRemoval=(arr)=&gt;{
  const resultArr=[]
  for(let i=0;i&lt;arr.length;i++){
    const node=arr[i]
    let flag=false
    for(let j=0;j&lt;resultArr.length;j++){
      const node2=resultArr[j]
      if(node===node2){
        flag=true
        break;
      }
    }
    if(!flag)resultArr.push(node)
  }
  return resultArr
}
// for + object(也可以用map) 
const duplicateRemoval =(arr)=&gt;{
  // 利用对象属性名不能重复这一特点
  const resultArr = []
  const obj = {}
  for(let i = 0;i&lt;arr.length;i++){
    if (!obj[arr[i]]) {
      resultArr.push(arr[i])
      obj[arr[i]] = 1
    } else {
      obj[arr[i]] ++
    }
  };
  return resultArr
}
// 利用reduce
function duplicateRemoval (arr) {
  let resultArr = []
  return  arr.reduce((prev, next,index, arr) =&gt; {
    // 如果包含，就返回原数据，不包含，就把新数据追加进去 
    return newArr.includes(next) ? newArr :  newArr.push(next)
  }, 0)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="数组打平-多维数组转换为一维数组" tabindex="-1"><a class="header-anchor" href="#数组打平-多维数组转换为一维数组" aria-hidden="true">#</a> 数组打平,多维数组转换为一维数组</h2><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>// 原生已经实现了
const expandArray=(array)=&gt;{
 return array.flat(Infinity);
}
// 递归实现,可设置层级
const expandArray = (array, level = Infinity) =&gt; {
  const resultArr = []
  let dep = 0
  const run = (arr) =&gt; {
    // 每当需要递归调用说明层级+1了
    dep++
    arr.forEach((node) =&gt; {
      if (Array.isArray(node) &amp;&amp; dep &lt; level) {
        run(node)
      } else {
        resultArr.push(node)
      }
    })
    // 一轮执行完毕,应该将层级减去1,恢复到上一层级
    dep--
  }
  run(array)
  return resultArr
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="instanceof" tabindex="-1"><a class="header-anchor" href="#instanceof" aria-hidden="true">#</a> instanceof</h2><p>这个操作符用来判断该对象是否在某一条原型链上,通常用来判断是不是某个对象的子集</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>const myInstanceof = (obj, { prototype }) =&gt; {
  let p = Object.getPrototypeOf(obj)
  while (true) {
    if (p === null) {
      return false
    } else if (p === prototype) {
      return true
    }
    p = Object.getPrototypeOf(p)
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="解析url参数" tabindex="-1"><a class="header-anchor" href="#解析url参数" aria-hidden="true">#</a> 解析url参数</h2><p>这块熟悉正则的话应该能玩的6一点</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>const getUrlParams = (url) =&gt; {
  const params = {}
  const paramsString = url.split(&#39;?&#39;)[1]
  const kvArray = paramsString.split(&#39;&amp;&#39;)
  kvArray.forEach((kv) =&gt; {
    const lr = kv.split(&#39;=&#39;)
    params[lr[0]] = lr[1]
  })
  return params
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="object-create" tabindex="-1"><a class="header-anchor" href="#object-create" aria-hidden="true">#</a> Object.create</h2><p>该函数用来创建一个干净的对象</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>function createObj(obj){
  function Fn(){}
  Fn.prototype = obj
  return new Fn()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="实现简易hash路由系统" tabindex="-1"><a class="header-anchor" href="#实现简易hash路由系统" aria-hidden="true">#</a> 实现简易hash路由系统</h2><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>class myRoute {
  constructor() {
    // 路由映射关系
    this.routes = {}
    // 当前hash值
    this.currentHash = &#39;&#39;
    window.addEventListener(&#39;load&#39;, this.updateRoute, false)
    window.addEventListener(&#39;hashchange&#39;, this.updateRoute, false)
  }
  addRoute(path, cb) {
    this.routes[path] = cb || function () { }
  }
  // 更新
  updateRoute = () =&gt; {
    this.currentHash = location.hash.slice(1) || &#39;/&#39;
    this.routes[this.currentHash]()
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="节流" tabindex="-1"><a class="header-anchor" href="#节流" aria-hidden="true">#</a> 节流</h2><p>通常用来稀释函数执行的次数</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">d</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span> delay</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> timer <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>timer<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
    timer <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token function">fn</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
      timer <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> delay<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="防抖" tabindex="-1"><a class="header-anchor" href="#防抖" aria-hidden="true">#</a> 防抖</h2><p>在一段时间内只会执行最后一次调用</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">t</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span> delay</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> timer <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    timer <span class="token operator">&amp;&amp;</span> <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span><span class="token punctuation">;</span>
    timer <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token function">fn</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> delay<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="当防抖函数遇到先发起的请求响应巨慢的问题-其实这里防不防抖无所谓-主要是前边响应慢的问题" tabindex="-1"><a class="header-anchor" href="#当防抖函数遇到先发起的请求响应巨慢的问题-其实这里防不防抖无所谓-主要是前边响应慢的问题" aria-hidden="true">#</a> 当防抖函数遇到先发起的请求响应巨慢的问题(其实这里防不防抖无所谓,主要是前边响应慢的问题)</h2><p>来源于朋友某次面试题的思考,不废话,直接模拟场景</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>const t = (fn, delay) =&gt; {
  let timer = null;
  return (...args) =&gt; {
    timer &amp;&amp; clearTimeout(timer);
    timer = setTimeout(() =&gt; {
      fn(...args);
    }, delay);
  };
};

const req = () =&gt; {
  // 请求发起时间戳
  const now = Date.now();
  setTimeout(
    () =&gt; {
      console.log(\`请求响应了,本次预计返回的数据:\${now}\`);
      // 假设返回的就是时间戳
      data.count = now;
    },
    // 模拟第一次请求慢一点,第二次立即返回
    i === 1 ? 2000 : 0
  );
};

const data = {
  count: 0,
};

// 防抖函数,间隔500
const reqT = t(req, 500);
// 分别发送两次请求,必须满足防抖下执行两次的时间间隔
let i = 0;
const timer = setInterval(() =&gt; {
  i++;
  reqT();
  i === 2 &amp;&amp; clearInterval(timer);
}, 700);

setTimeout(
  () =&gt; {
    console.log(&quot;最终结果:&quot; + data.count);
  },
  // 最短需要700*2+2000才能看到最终结果
  700 * 2 + 2000 + 1
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过上边的例子可以得出结果总是得到第一次响应慢的结果,而我们希望得到的最新发起请求的结果;怎么办呢?我想的是通过时间戳来判断,如果发起时间早于完成时间,就是无效请求.下边是解决方案:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">t</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span> delay</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> timer <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    timer <span class="token operator">&amp;&amp;</span> <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span><span class="token punctuation">;</span>
    timer <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token function">fn</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> delay<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * 请求函数
 * 需求:期望总是以最后发起请求后的响应为准,前边响应慢的请求为无效请求
 */</span>
<span class="token keyword">const</span> req <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> requestDoneTime <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// 请求发起时间戳</span>
    <span class="token keyword">const</span> now <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span>
      <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">请求响应了,本次预计返回的数据:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>now<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 如果发起时间早于完成时间,就说明是过期请求;说明一下,如果要适应不同的请求,还需要一定的封装处理,使它们相互隔离.</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>now <span class="token operator">&lt;</span> requestDoneTime<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token comment">// 假设返回的就是时间戳</span>
        data<span class="token punctuation">.</span>count <span class="token operator">=</span> now<span class="token punctuation">;</span>
        <span class="token comment">// 重新设置请求成功时间</span>
        requestDoneTime <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">// 模拟第一次请求慢一点,第二次立即返回</span>
      i <span class="token operator">===</span> <span class="token number">1</span> <span class="token operator">?</span> <span class="token number">2000</span> <span class="token operator">:</span> <span class="token number">0</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 防抖函数,间隔500</span>
<span class="token keyword">const</span> reqT <span class="token operator">=</span> <span class="token function">t</span><span class="token punctuation">(</span>req<span class="token punctuation">,</span> <span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 分别发送两次请求,必须满足防抖下执行两次的时间间隔</span>
<span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> timer <span class="token operator">=</span> <span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  i<span class="token operator">++</span><span class="token punctuation">;</span>
  <span class="token function">reqT</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  i <span class="token operator">===</span> <span class="token number">2</span> <span class="token operator">&amp;&amp;</span> <span class="token function">clearInterval</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">700</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">setTimeout</span><span class="token punctuation">(</span>
  <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;最终结果:&quot;</span> <span class="token operator">+</span> data<span class="token punctuation">.</span>count<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 再次发送请求,查看是否影响后续请求</span>
    <span class="token function">reqT</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;最终结果2:&quot;</span> <span class="token operator">+</span> data<span class="token punctuation">.</span>count<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">700</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// 最短需要700*2+2000才能看到最终结果</span>
  <span class="token number">700</span> <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">2000</span> <span class="token operator">+</span> <span class="token number">1</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="发布订阅" tabindex="-1"><a class="header-anchor" href="#发布订阅" aria-hidden="true">#</a> 发布订阅</h2><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>class EventBus {
  constructor() {
    this._map = new Map();
    this.$on = this.on;
    this.$once = this.once;
    this.$off = this.off;
    this.$emit = this.emit;
  }
  on(event, handler) {
    const eventHandlers = this._map.get(event);
    if (!eventHandlers || eventHandlers.length === 0) {
      this._map.set(event, [handler]);
    } else {
      eventHandlers.push(handler);
    }
  }
  once(event, handler) {
    this.on(event, (..args) =&gt; {
      handler(args);
      this.off(event, handler);
    });
  }
  emit(event, ...args) {
    const eventHandlers = this._map.get(event);
    if (!eventHandlers || eventHandlers.length === 0) return;
    eventHandlers.forEach((node) =&gt; {
      node(args);
    });
  }
  off(event, handler) {
    const eventHandlers = this._map.get(event);
    if (!eventHandlers || eventHandlers.length === 0) return;
    this._map.set(
      event,
      eventHandlers.filter((node) =&gt; {
        return node !== handler;
      })
    );
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="async和await的手写模拟实现" tabindex="-1"><a class="header-anchor" href="#async和await的手写模拟实现" aria-hidden="true">#</a> async和await的手写模拟实现</h2><p>async其实是帮我们自动的去调用生成器的next方法来实现像同步代码一样的风格,知道这个原理来手写一个其实也并不难,await你可以理解为用yeild包裹了一下异步函数(受限于js的特性,无法真正的手写实现)</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>const myAsync = (fn) =&gt; {
  const g = fn();
  const run = (data) =&gt; {
    // 第一次next传参是无效的,他只用于启动
    const result = g.next(data);
    if (result.done) return result.value;
    result.value.then((res) =&gt; {
      run(res);
    });
  };
  return run();
};
// 一个异步函数,需要返回一个promise对象
const handler = (val = 0) =&gt; {
  return new Promise((reslove) =&gt; {
    setTimeout(() =&gt; {
      console.log(val + 1);
      reslove(val + 1);
    }, 1000);
  });
};
myAsync(function* () {
  // yield只能用于生成器内部,否则可以完美实现手写
  const val1 = yield handler();
  const val2 = yield handler(val1);
  const val3 = yield handler(val2);
  console.log({ val1, val2, val3 });
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mini版本的vuex" tabindex="-1"><a class="header-anchor" href="#mini版本的vuex" aria-hidden="true">#</a> mini版本的vuex</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> inject<span class="token punctuation">,</span> reactive <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token comment">// 注入时候的key,可以做当一个命名空间来理解,用户可以自行传入name做区分</span>
<span class="token keyword">const</span> <span class="token constant">STORE_KEY</span> <span class="token operator">=</span> <span class="token string">&#39;__store__&#39;</span>
<span class="token comment">// hooks</span>
<span class="token keyword">function</span> <span class="token function">useStore</span><span class="token punctuation">(</span><span class="token parameter">name <span class="token operator">=</span> <span class="token constant">STORE_KEY</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">inject</span><span class="token punctuation">(</span><span class="token constant">STORE_KEY</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">// 创建实例</span>
<span class="token keyword">function</span> <span class="token function">createStore</span><span class="token punctuation">(</span><span class="token parameter">options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Store</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Store</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>$options <span class="token operator">=</span> options
    <span class="token keyword">this</span><span class="token punctuation">.</span>_state <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">data</span><span class="token operator">:</span> options<span class="token punctuation">.</span>state
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_name <span class="token operator">=</span> options<span class="token punctuation">.</span>name <span class="token operator">||</span> <span class="token constant">STORE_KEY</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_mutations <span class="token operator">=</span> options<span class="token punctuation">.</span>mutations
    <span class="token keyword">this</span><span class="token punctuation">.</span>_actions <span class="token operator">=</span> options<span class="token punctuation">.</span>actions
  <span class="token punctuation">}</span>
  <span class="token keyword">get</span> <span class="token function">state</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_state<span class="token punctuation">.</span>data
  <span class="token punctuation">}</span>
  <span class="token comment">// 触发mutation</span>
  <span class="token function-variable function">commit</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">type<span class="token punctuation">,</span> payload</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> mutation <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_mutations<span class="token punctuation">[</span>type<span class="token punctuation">]</span>
    mutation <span class="token operator">&amp;&amp;</span> <span class="token function">mutation</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">,</span> payload<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 触发action</span>
  <span class="token function-variable function">dispatch</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">type<span class="token punctuation">,</span> payload</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> action <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_actions<span class="token punctuation">[</span>type<span class="token punctuation">]</span>
    action <span class="token operator">&amp;&amp;</span> <span class="token function">action</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> payload<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 注册的时候,vue会自动调用这个方法</span>
  <span class="token function">install</span><span class="token punctuation">(</span><span class="token parameter">app</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 这里的app就是vue的实例,将状态注入</span>
    app<span class="token punctuation">.</span><span class="token function">provide</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_name<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span> createStore<span class="token punctuation">,</span> useStore <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="封装一个最大请求数的请求函数" tabindex="-1"><a class="header-anchor" href="#封装一个最大请求数的请求函数" aria-hidden="true">#</a> 封装一个最大请求数的请求函数</h2><p>来源于<code>成都博智信息</code>的面试问题,他想要得是你封装一个函数,参数是一堆请求列表,然后可以设置最大同时请求数目,等待所有请求完成后返回这些列表的响应请求</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 模拟请求函数,响应时间随机,抛错随机</span>
<span class="token keyword">const</span> <span class="token function-variable function">req</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">url<span class="token punctuation">,</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> time <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0.5</span> <span class="token operator">?</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        url<span class="token punctuation">,</span>
        time<span class="token punctuation">,</span>
        <span class="token literal-property property">done_time</span><span class="token operator">:</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">reject</span><span class="token punctuation">(</span>
        <span class="token punctuation">{</span>
          url<span class="token punctuation">,</span>
          time<span class="token punctuation">,</span>
          <span class="token literal-property property">done_time</span><span class="token operator">:</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

        <span class="token punctuation">}</span>
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
      Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">3000</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token doc-comment comment">/**
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">}</span></span> <span class="token parameter">urls</span> 请求列表
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">}</span></span> <span class="token parameter">max</span> 同时请求数目
 */</span>
<span class="token keyword">const</span> <span class="token function-variable function">maxReq</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">urls <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> max <span class="token operator">=</span> <span class="token number">3</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token comment">//请求完成数目,当前操作的索引</span>
  <span class="token keyword">let</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> index <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> len <span class="token operator">=</span> urls<span class="token punctuation">.</span>length
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token function-variable function">next</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> index2 <span class="token operator">=</span> <span class="token operator">++</span>index
      <span class="token keyword">if</span> <span class="token punctuation">(</span>index2 <span class="token operator">&gt;=</span> len<span class="token punctuation">)</span> <span class="token keyword">return</span>
      <span class="token keyword">const</span> url <span class="token operator">=</span> urls<span class="token punctuation">[</span>index2<span class="token punctuation">]</span>
      <span class="token function">req</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        result<span class="token punctuation">[</span>index2<span class="token punctuation">]</span> <span class="token operator">=</span> res
        <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        result<span class="token punctuation">[</span>index2<span class="token punctuation">]</span> <span class="token operator">=</span> err
        <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">finally</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">++</span>count <span class="token operator">&gt;=</span> len<span class="token punctuation">)</span> <span class="token function">resolve</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token punctuation">(</span>max <span class="token operator">&lt;</span> len <span class="token operator">?</span> max <span class="token operator">:</span> len<span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> urls <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;url1&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;url2&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;url3&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;url4&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;url5&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;url6&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;url7&#39;</span><span class="token punctuation">]</span>
<span class="token comment">// test</span>
<span class="token function">maxReq</span><span class="token punctuation">(</span>urls<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">debugger</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其实可以封装一个调度的类,那么代码就可以改为下面的方式:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Scheduler</span> <span class="token punctuation">{</span>
  <span class="token comment">// 用于判断是否是一个promise,灵感来源于vue源码</span>
  <span class="token keyword">static</span> <span class="token function">isPromise</span><span class="token punctuation">(</span><span class="token parameter">val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
      val <span class="token operator">!==</span> <span class="token keyword">undefined</span> <span class="token operator">&amp;&amp;</span> val <span class="token operator">!==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span>
      <span class="token keyword">typeof</span> val<span class="token punctuation">.</span>then <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span> <span class="token operator">&amp;&amp;</span>
      <span class="token keyword">typeof</span> val<span class="token punctuation">.</span>catch <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span>limit <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token function-variable function">callback</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 任务编号索引</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>index <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token comment">// 任务队列</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>queue <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token comment">// 完成数目</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>doneCount <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token comment">// 限制并发数</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>limit <span class="token operator">=</span> limit<span class="token punctuation">;</span>
    <span class="token comment">// 结果数组</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>resultArray <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token comment">// 所有请求完成之后的回调</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>callback <span class="token operator">=</span> callback
  <span class="token punctuation">}</span>
  <span class="token comment">// 添加任务</span>
  <span class="token function-variable function">add</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">task</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>index<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Scheduler<span class="token punctuation">.</span><span class="token function">isPromise</span><span class="token punctuation">(</span>task<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;任务是promise类型&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>queue<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">decoratTask</span><span class="token punctuation">(</span>task<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> task <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">&#39;你似乎传入的不是一个promise,这种情况请查看下使用方式.&#39;</span><span class="token punctuation">)</span>
      <span class="token comment">// 这里需要遵循一定的规范去使用,需要提前告知使用者,实际上还不如强制告诉使用者必须传入promise</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>queue<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">decoratTask</span><span class="token punctuation">(</span>
          <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">task</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 开始任务</span>
  <span class="token function-variable function">start</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> count <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>limit <span class="token operator">&gt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>queue<span class="token punctuation">.</span>length <span class="token operator">?</span> <span class="token keyword">this</span><span class="token punctuation">.</span>queue<span class="token punctuation">.</span>length <span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>limit<span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> count<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 下一个</span>
  <span class="token function-variable function">next</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>queue<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> task <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>queue<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span>task<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 装饰任务对象,其实这里的作用是为了保存结果数组的有序性</span>
  <span class="token function-variable function">decoratTask</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">task</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">index</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>index<span class="token punctuation">,</span>
      <span class="token literal-property property">p</span><span class="token operator">:</span> task
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 执行单次任务</span>
  <span class="token function-variable function">run</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">task</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;run&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> index<span class="token punctuation">,</span> p <span class="token punctuation">}</span> <span class="token operator">=</span> task<span class="token punctuation">;</span>
    p<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>resultArray<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">=</span> res<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>resultArray<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">=</span> err<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">finally</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;will next&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>doneCount<span class="token operator">++</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>index <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">===</span> <span class="token keyword">this</span><span class="token punctuation">.</span>doneCount<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">callback</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>resultArray<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> <span class="token function-variable function">req</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">url<span class="token punctuation">,</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> time <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        url<span class="token punctuation">,</span>
        time<span class="token punctuation">,</span>
        <span class="token literal-property property">done_time</span><span class="token operator">:</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">3000</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> scheduler <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scheduler</span><span class="token punctuation">(</span><span class="token number">99</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> urls <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;url1&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;url2&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;url3&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;url4&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;url5&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;url6&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;url7&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
urls<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">url</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  scheduler<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token function">req</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
scheduler<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="封装一个管道函数-上海通办服务面试题" tabindex="-1"><a class="header-anchor" href="#封装一个管道函数-上海通办服务面试题" aria-hidden="true">#</a> 封装一个管道函数(上海通办服务面试题)</h2><p>实现一个高阶函数<code>pipe</code>,让传递的函数依次执行,上一个函数的返回值是下一个函数的参数;形如这样调用:pipe(fn,fn,fn,fn,fn)(params)</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">pipe</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>fns</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token parameter">params</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> result <span class="token operator">=</span> params<span class="token punctuation">;</span>
    <span class="token punctuation">[</span><span class="token operator">...</span>fns<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      result <span class="token operator">=</span> <span class="token function">fn</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> result<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token function">pipe</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">a</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> a <span class="token operator">+</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">a</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> a <span class="token operator">+</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果函数内有异步行为的话，那么返回的结果也会是一个promise,稍加改造即可。</p><h2 id="手写promise" tabindex="-1"><a class="header-anchor" href="#手写promise" aria-hidden="true">#</a> 手写Promise</h2><p>Promise在我们日常的工作中，已经运用得非常广泛了，它配合async和await将js从回调地狱中拉到了人间。好，我们一步一步来实现一个符合A+规范的Promise。</p><p>首先我们都知道promise会有三个状态，那么我们先来定义三个状态，他们分别表示了‘等待’，‘解决’，‘拒绝’。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">MyPromise</span> <span class="token punctuation">{</span>
  #<span class="token constant">PENDING</span> <span class="token operator">=</span> <span class="token string">&#39;pending&#39;</span><span class="token punctuation">;</span>
  #<span class="token constant">FULFILLED</span> <span class="token operator">=</span> <span class="token string">&#39;fulfilled&#39;</span><span class="token punctuation">;</span>
  #<span class="token constant">REJECTED</span> <span class="token operator">=</span> <span class="token string">&#39;rejected&#39;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>好，接下来是构造器</p>`,58),i=[p];function o(c,l){return s(),a("div",null,i)}const r=n(t,[["render",o],["__file","yixieJavaScriptshouxietimushouji.html.vue"]]);export{r as default};
