/**
 * 地区配置，通过regex匹配代理节点名称
 * regex会有一定概率误判，自己调整一下吧
 * excludeHighPercentage是排除高倍率节点的开关，只对地区分组有效
 * 倍率大于regions里的ratioLimit值的代理节点会被排除
 */
const options = {
  excludeHighPercentage: true,
  regions: [{
    name: "HK香港",
    regex: /港|🇭🇰|hk|hongkong|hong kong|HK/i,
    ratioLimit: 6,
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/hk.svg",
  },
  {
    name: "US美国",
    regex: /美|🇺🇸|us|united state|america/i,
    ratioLimit: 6,
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/us.svg",
  },
  {
    name: "JP日本",
    regex: /日本|🇯🇵|jp|japan/i,
    ratioLimit: 6,
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/jp.svg",
  },
  {
    name: "KR韩国",
    regex: /韩|🇰🇷|kr|korea/i,
    ratioLimit: 6,
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/kr.svg",
  },
  {
    name: "SG新加坡",
    regex: /新加坡|🇸🇬|sg|singapore|狮城/i,
    ratioLimit: 6,
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/sg.svg",
  },
  {
    name: "CN中国大陆",
    regex: /中国|🇨🇳|cn|china/i,
    ratioLimit: 6,
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/cn.svg",
  },
  {
    name: "TW台湾省",
    regex: /台湾|🇨🇳|tw|taiwan|tai wan/i,
    ratioLimit: 6,
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/cn.svg",
  },
  {
    name: "GB英国",
    regex: /英|🇬🇧|uk|united kingdom|great britain/i,
    ratioLimit: 6,
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/gb.svg",
  },
  {
    name: "RU俄罗斯",
    regex: /俄|🇷🇺|ru|russia|moscow|莫斯科/i,
    ratioLimit: 6,
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/ru.svg",
  },
  {
    name: "DE德国",
    regex: /德|🇩🇪|de|germany|frankfurt|法兰克福/i,
    ratioLimit: 6,
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/de.svg",
  },
  {
    name: "AU澳大利亚",
    regex: /澳|🇦🇺|au|australia|sydney|悉尼|melbourne|墨尔本/i,
    ratioLimit: 6,
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/au.svg",
  },
  {
    name: "CA加拿大",
    regex: /加|🇨🇦|ca|canada|toronto|温哥华|vancouver/i,
    ratioLimit: 6,
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/ca.svg",
  },
  ],
};


// 国内DNS服务器
const domesticNameservers = [
  "https://223.5.5.5/dns-query", // 阿里DoH
  "https://doh.pub/dns-query" // 腾讯DoH，因腾讯云即将关闭免费版IP访问，故用域名
];
// 国外DNS服务器
const foreignNameservers = [
  "https://cloudflare-dns.com/dns-query", // CloudflareDNS
  "https://77.88.8.8/dns-query", //YandexDNS
  "https://8.8.4.4/dns-query#ecs=1.1.1.1/24&ecs-override=true", // GoogleDNS
  "https://208.67.222.222/dns-query#ecs=1.1.1.1/24&ecs-override=true", // OpenDNS
  "https://9.9.9.9/dns-query", //Quad9DNS
];
// DNS配置
const dnsConfig = {
  "enable": true,
  "listen": "0.0.0.0:1053",
  "ipv6": true,
  "prefer-h3": false,
  "respect-rules": true,
  "use-system-hosts": false,
  "cache-algorithm": "arc",
  "enhanced-mode": "fake-ip",
  "fake-ip-range": "198.18.0.1/16",
  "fake-ip-filter": [
    // 本地主机/设备
    "+.lan",
    "+.local",
    // // Windows网络出现小地球图标
    "+.msftconnecttest.com",
    "+.msftncsi.com",
    // QQ快速登录检测失败
    "localhost.ptlogin2.qq.com",
    "localhost.sec.qq.com",
    // 微信快速登录检测失败
    "localhost.work.weixin.qq.com"
  ],
  "default-nameserver": ["223.5.5.5", "1.2.4.8"],
  "nameserver": [...foreignNameservers],
  "proxy-server-nameserver": [...domesticNameservers],
  "direct-nameserver": [...domesticNameservers],
  "direct-nameserver-follow-policy": false,
  "nameserver-policy": {
    "geosite:cn": domesticNameservers
  }
};
// 规则集通用配置
const ruleProviderCommon = {
  "type": "http",
  "format": "yaml",
  "interval": 86400
};
// 规则集配置
const ruleProviders = {
  "reject": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt",
    "path": "./ruleset/loyalsoldier/reject.yaml"
  },
  "icloud": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/icloud.txt",
    "path": "./ruleset/loyalsoldier/icloud.yaml"
  },
  "apple": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/apple.txt",
    "path": "./ruleset/loyalsoldier/apple.yaml"
  },
  "google": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/google.txt",
    "path": "./ruleset/loyalsoldier/google.yaml"
  },
  "proxy": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt",
    "path": "./ruleset/loyalsoldier/proxy.yaml"
  },
  "direct": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt",
    "path": "./ruleset/loyalsoldier/direct.yaml"
  },
  "private": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt",
    "path": "./ruleset/loyalsoldier/private.yaml"
  },
  "gfw": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt",
    "path": "./ruleset/loyalsoldier/gfw.yaml"
  },
  "tld-not-cn": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt",
    "path": "./ruleset/loyalsoldier/tld-not-cn.yaml"
  },
  "telegramcidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt",
    "path": "./ruleset/loyalsoldier/telegramcidr.yaml"
  },
  "cncidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt",
    "path": "./ruleset/loyalsoldier/cncidr.yaml"
  },
  "lancidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt",
    "path": "./ruleset/loyalsoldier/lancidr.yaml"
  },
  "applications": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt",
    "path": "./ruleset/loyalsoldier/applications.yaml"
  },
  "openai": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/openai.yaml",
    "path": "./ruleset/MetaCubeX/openai.yaml"
  },
  "bybit": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/bybit.yaml",
    "path": "./ruleset/MetaCubeX/bybit.yaml"
  },
  "pikpak": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/pikpak.yaml",
    "path": "./ruleset/MetaCubeX/pikpak.yaml"
  },
  "anthropic": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/anthropic.yaml",
    "path": "./ruleset/MetaCubeX/anthropic.yaml"
  },
  "google-gemini": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/google-gemini.yaml",
    "path": "./ruleset/MetaCubeX/google-gemini.yaml"
  },
  "xai": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/xai.yaml",
    "path": "./ruleset/MetaCubeX/xai.yaml"
  },
  "perplexity": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/perplexity.yaml",
    "path": "./ruleset/MetaCubeX/perplexity.yaml"
  },
  "microsoft": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/microsoft.yaml",
    "path": "./ruleset/MetaCubeX/microsoft.yaml"
  },
};
// 规则
const rules = [
  // 额外自定义规则       //在此添加你想要的规则
  "PROCESS-NAME,steam.exe,🐬 自定义直连",
  "DOMAIN-SUFFIX,immersivetranslate.com,🐳 自定义代理",
  // "DOMAIN-SUFFIX,bing.com,🐳 自定义代理",
  // 自定义规则
  "DOMAIN-SUFFIX,googleapis.cn,⚙️ 节点选择", // Google服务
  "DOMAIN-SUFFIX,gstatic.com,⚙️ 节点选择", // Google静态资源
  "DOMAIN-SUFFIX,xn--ngstr-lra8j.com,⚙️ 节点选择", // Google Play下载服务
  "DOMAIN-SUFFIX,github.io,⚙️ 节点选择", // Github Pages
  "DOMAIN,v2rayse.com,⚙️ 节点选择", // V2rayse节点工具
  // blackmatrix7 规则集

  // MetaCubeX 规则集
  "RULE-SET,openai,💸 ChatGPT-Gemini-XAI-Perplexity",
  "RULE-SET,pikpak,🅿️ PikPak",
  "RULE-SET,bybit,🪙 Bybit",
  "RULE-SET,anthropic,💵 Claude",
  "RULE-SET,google-gemini,💸 ChatGPT-Gemini-XAI-Perplexity",
  "RULE-SET,xai,💸 ChatGPT-Gemini-XAI-Perplexity",
  "RULE-SET,perplexity,💸 ChatGPT-Gemini-XAI-Perplexity",
  // Loyalsoldier 规则集
  "RULE-SET,applications,🔗 全局直连",
  "RULE-SET,private,🔗 全局直连",
  "RULE-SET,reject,🥰 广告过滤",
  "RULE-SET,microsoft,Ⓜ️ 微软服务",
  "RULE-SET,icloud,🍎 苹果服务",
  "RULE-SET,apple,🍎 苹果服务",
  "RULE-SET,google,📢 谷歌服务",
  "RULE-SET,proxy,⚙️ 节点选择",
  "RULE-SET,gfw,⚙️ 节点选择",
  "RULE-SET,tld-not-cn,⚙️ 节点选择",
  "RULE-SET,direct,🔗 全局直连",
  "RULE-SET,lancidr,🔗 全局直连,no-resolve",
  "RULE-SET,cncidr,🔗 全局直连,no-resolve",
  "RULE-SET,telegramcidr,📲 电报消息,no-resolve",
  // 其他规则
  "GEOIP,LAN,🔗 全局直连,no-resolve",
  "GEOIP,CN,🔗 全局直连,no-resolve",
  "MATCH,🐟 漏网之鱼"
];
// 代理组通用配置
const groupBaseOption = {
  "interval": 300,  //降低测试间隔提高响应速度
  "timeout": 3000,  //超时时间
  "url": "https://www.gstatic.com/generate_204",// 使用稳定节点测试
  "lazy": true,
  "max-failed-times": 3,
  "hidden": false
};


// 程序入口
function main(config) {

  const originalProxies = config?.proxies ? [...config.proxies] : [];

  const proxyCount = originalProxies.length;

  const originalProviders = config?.["proxy-providers"] || {};

  const proxyProviderCount = originalProviders !== null && typeof originalProviders === 'object' ? Object.keys(originalProviders).length : 0;

  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }


  // 覆盖原配置中DNS配置
  config["dns"] = dnsConfig;
  config["rule-providers"] = ruleProviders;
  config["rules"] = rules; // Use the modified rules array defined above


  /**
   * 这个值设置大点能省电，笔记本和手机需要关注一下
   */
  config["keep-alive-interval"] = 300;

  //游戏可开
  config["find-process-mode"] =  "strict"; 

  /**
   * 适合小内存环境，如果在旁路由里运行可以改成standard
   */
  config["geodata-loader"] = "standard";
  config["geo-auto-update"] = true;
  config["geo-update-interval"] = 24;


  // Process original proxies (just ensure UDP)
  const processedProxies = originalProxies.map(proxy => {
    if (proxy && typeof proxy === 'object' && proxy.name) {
      proxy.udp = true;

      // 节点绑定的接口，从此接口发起连接，适用于部分vpn情况
      // proxy["interface-name"] = "WLAN"
      // proxy["interface-name"] = "以太网"
    } else {
      console.warn("警告：发现一个无效或缺少名称的原始代理配置:", proxy);
      return null;
    }
    return proxy;
  }).filter(p => p !== null);

  // Combine proxies
  config["proxies"] = [...processedProxies];
  config["proxy-providers"] = {
    ...originalProviders
  };



  let proxyGroupsRegion = [];

  /**
     * 下面就是整个脚本的核心部分了，前方低能！！！
     */
  options.regions.forEach((region) => {
    /**
     * 提取倍率符合要求的代理节点
     * 判断倍率有问题的话，大概率是这个正则的问题，可以自行修改
     * 自己改正则的话记得必须把倍率的number值提取出来
     */
    let proxies = config.proxies
      .filter((a) => {
        const multiplier =
          /(?<=[xX✕✖⨉倍率])([1-9]+(\.\d+)*|0{1}\.\d+)(?=[xX✕✖⨉倍率])*/i.exec(
            a.name,
          )?.[1];
        return (
          a.name.match(region.regex) &&
          parseFloat(multiplier || "0") <= region.ratioLimit
        );
      })
      .map((b) => {
        return b.name;
      });

    /**
     * 必须再判断一下有没有符合要求的代理节点
     * 没有的话，这个策略组就不应该存在
     * 我喜欢自动选择延迟最低的节点，喜欢轮询的可以自己修改
     */
    if (proxies.length > 0) {
      proxyGroupsRegion.push({
        ...groupBaseOption,
        name: region.name,
        type: "url-test",
        tolerance: 100,
        icon: region.icon,
        proxies: proxies,
      });
    }
  });

  /**
    * 当地区策略组存在是，再建立一个地区选择的策略组
    * 类型为手动选择，方便切换地区
    */
  if (proxyGroupsRegion.length > 0) {
    proxyGroupsRegion = [{
      ...groupBaseOption,
      name: "🌍 地区选择",
      type: "select",
      proxies: proxyGroupsRegion.map((item) => {
        return item.name;
      }),
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/un.svg",
    },
    ...proxyGroupsRegion,
    ];
  }

  //节点组
  const proxyGroupsConfig = [
    {
      ...groupBaseOption,
      "name": "⚙️ 节点选择",
      "type": "select",
      "proxies": [
        "♻️ 延迟选优",
        "🚑 故障转移",
        "⚖️ 负载均衡(散列)",
        "☁️ 负载均衡(轮询)",
        ...proxyGroupsRegion.map((value) => {
          return value.name;
        }),
      ],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg"
    },
    {
      ...groupBaseOption,
      "name": "♻️ 延迟选优",
      "type": "url-test",
      "tolerance": 50,
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/speed.svg"
    },
    {
      ...groupBaseOption,
      "name": "🚑 故障转移",
      "type": "fallback",
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/ambulance.svg"
    },
    {
      ...groupBaseOption,
      "name": "⚖️ 负载均衡(散列)",
      "type": "load-balance",
      "strategy": "consistent-hashing",
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/merry_go.svg"
    },
    {
      ...groupBaseOption,
      "name": "☁️ 负载均衡(轮询)",
      "type": "load-balance",
      "strategy": "round-robin",
      "proxies": [
        // 直接代理
        ...config.proxies.map(p => p.name)
      ],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/balance.svg"
    },
    ...proxyGroupsRegion,
    {
      ...groupBaseOption,
      "name": "🌍 国外媒体",
      "type": "select",
      "proxies": [
        "⚙️ 节点选择",
        "♻️ 延迟选优",
        "🚑 故障转移",
        "⚖️ 负载均衡(散列)",
        "☁️ 负载均衡(轮询)",
        "🔗 全局直连",
        ...proxyGroupsRegion.map((value) => {
          return value.name;
        })
      ],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/youtube.svg"
    },
    {
      ...groupBaseOption,
      "name": "💸 ChatGPT-Gemini-XAI-Perplexity",
      "type": "select",
      "proxies": [
        ...proxyGroupsRegion.map((value) => {
          return value.name;
        }),
        "🚑 故障转移",
        "🔗 全局直连"
      ],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/chatgpt.svg"
    },
    {
      ...groupBaseOption,
      "name": "💵 Claude",
      "type": "select",
      "proxies": [
        "⚙️ 节点选择",
        "♻️ 延迟选优",
        "🚑 故障转移",
        "⚖️ 负载均衡(散列)",
        "☁️ 负载均衡(轮询)",
        "🔗 全局直连",
        ...proxyGroupsRegion.map((value) => {
          return value.name;
        })
      ],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/claude.svg"
    },
    {
      ...groupBaseOption,
      "name": "🪙 Bybit",
      "type": "select",
      "proxies": [
        "⚙️ 节点选择",
        "♻️ 延迟选优",
        "🚑 故障转移",
        "⚖️ 负载均衡(散列)",
        "☁️ 负载均衡(轮询)",
        "🔗 全局直连",
        ...proxyGroupsRegion.map((value) => {
          return value.name;
        })
      ],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg"
    },
    {
      ...groupBaseOption,
      "name": "🅿️ PikPak",
      "type": "select",
      "proxies": [
        "⚙️ 节点选择",
        "♻️ 延迟选优",
        "🚑 故障转移",
        "⚖️ 负载均衡(散列)",
        "☁️ 负载均衡(轮询)",
        "🔗 全局直连",
        ...proxyGroupsRegion.map((value) => {
          return value.name;
        })
      ],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg"
    },
    {
      ...groupBaseOption,
      "name": "📲 电报消息",
      "type": "select",
      "proxies": [
        "⚙️ 节点选择",
        "♻️ 延迟选优",
        "🚑 故障转移",
        "⚖️ 负载均衡(散列)",
        "☁️ 负载均衡(轮询)",
        "🔗 全局直连",
        ...proxyGroupsRegion.map((value) => {
          return value.name;
        })
      ],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/telegram.svg"
    },
    {
      ...groupBaseOption,
      "name": "📢 谷歌服务",
      "type": "select",
      "proxies": [
        "⚙️ 节点选择",
        "♻️ 延迟选优",
        "🚑 故障转移",
        "⚖️ 负载均衡(散列)",
        "☁️ 负载均衡(轮询)",
        "🔗 全局直连",
        ...proxyGroupsRegion.map((value) => {
          return value.name;
        })
      ],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/google.svg"
    },
    {
      ...groupBaseOption,
      "name": "🍎 苹果服务",
      "type": "select",
      "proxies": [
        "⚙️ 节点选择",
        "♻️ 延迟选优",
        "🚑 故障转移",
        "⚖️ 负载均衡(散列)",
        "☁️ 负载均衡(轮询)",
        "🔗 全局直连",
        ...proxyGroupsRegion.map((value) => {
          return value.name;
        })
      ],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/apple.svg"
    },
    {
      ...groupBaseOption,
      "name": "Ⓜ️ 微软服务",
      "type": "select",
      "proxies": [
        "⚙️ 节点选择",
        "🔗 全局直连",
        "♻️ 延迟选优",
        "🚑 故障转移",
        "⚖️ 负载均衡(散列)",
        "☁️ 负载均衡(轮询)",
        ...proxyGroupsRegion.map((value) => {
          return value.name;
        }),
      ],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/microsoft.svg"
    },
    {
      ...groupBaseOption,
      "name": "🔗 全局直连",
      "type": "select",
      "proxies": [
        "DIRECT",
        "⚙️ 节点选择",
        "♻️ 延迟选优",
        "🚑 故障转移",
        "⚖️ 负载均衡(散列)",
        "☁️ 负载均衡(轮询)",
        ...proxyGroupsRegion.map((value) => {
          return value.name;
        }),
      ],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg"
    },
    {
      ...groupBaseOption,
      "name": "🐬 自定义直连",
      "type": "select",
      "proxies": [
        "🔗 全局直连",
        "⚙️ 节点选择",
        "♻️ 延迟选优",
        "🚑 故障转移",
        "⚖️ 负载均衡(散列)",
        "☁️ 负载均衡(轮询)",
        ...proxyGroupsRegion.map((value) => {
          return value.name;
        }),
      ],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/unknown.svg"
    },
    {
      ...groupBaseOption,
      "name": "🐳 自定义代理",
      "type": "select",
      "proxies": [
        "⚙️ 节点选择",
        "♻️ 延迟选优",
        "🚑 故障转移",
        "⚖️ 负载均衡(散列)",
        "☁️ 负载均衡(轮询)",
        ...proxyGroupsRegion.map((value) => {
          return value.name;
        }),
      ],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/openwrt.svg"
    },
    {
      ...groupBaseOption,
      "name": "🥰 广告过滤",
      "type": "select",
      "proxies": ["REJECT", "DIRECT", "⚙️ 节点选择"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/bug.svg"
    },
    {
      ...groupBaseOption,
      "name": "❌ 全局拦截",
      "type": "select",
      "proxies": ["REJECT", "DIRECT", "⚙️ 节点选择"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/block.svg"
    },
    {
      ...groupBaseOption,
      "name": "🐟 漏网之鱼",
      "type": "select",
      "proxies": [
        "🚑 故障转移",
        "⚖️ 负载均衡(散列)",
        "☁️ 负载均衡(轮询)",
        "🔗 全局直连",
        ...proxyGroupsRegion.map((value) => {
          return value.name;
        }),
      ],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg"
    }
  ];


  // 使用处理过的代理组
  config["proxy-groups"] = proxyGroupsConfig;

  return config;
}
