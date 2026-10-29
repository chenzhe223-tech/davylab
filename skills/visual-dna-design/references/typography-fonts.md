# Visual DNA 字体库与授权实施说明

本文件将字体选择、字体栈、资源加载和构建验收统一成可复用规则。字体授权可能随着版本、分发渠道和供应商政策改变，部署前须再次核对该版本官方许可证；此文不是法律意见。

## 英文字体：8 款主字体 + 2 款兼容选项

| 选择器 | 字体 | 角色 | 许可与部署 |
|---|---|---|---|
| en-ui | Inter | 默认 UI / 正文 | SIL OFL 1.1；保留 LICENSE。 |
| en-reading | Source Sans 3 | 长文阅读 | SIL OFL；保留许可文件。 |
| en-product | DM Sans | 产品 / 营销 | SIL OFL；保留许可文件。 |
| en-display | Space Grotesk | 现代标题 | SIL OFL；保留许可文件。 |
| en-editorial | Playfair Display | 编辑式衬线标题 | SIL OFL；保留许可文件。 |
| en-saas | Manrope | SaaS UI | SIL OFL；保留许可文件。 |
| en-brand | Plus Jakarta Sans | 品牌 / SaaS | SIL OFL；保留许可文件。 |
| en-code | JetBrains Mono | 代码 / 技术数据 | SIL OFL；保留许可文件。 |
| en-arial | Liberation Sans | Arial 度量兼容替代 | 仅使用 Liberation Fonts v2.x 的 OFL 版本；Arial 仅作系统回退，不打包 Arial 文件。 |
| en-times | Liberation Serif | Times New Roman 度量兼容替代 | 仅使用 Liberation Fonts v2.x 的 OFL 版本；Times New Roman 仅作系统回退，不打包其字体文件。 |

## 中文字体：8 款

| 选择器 | 字体 | 角色 | 许可与部署 |
|---|---|---|---|
| cn-sans | 思源黑体 Noto Sans SC | 正文 / UI / 表格 | Google Noto 项目许可；按该字体包附带的 OFL 条款分发和保留许可。 |
| cn-serif | 思源宋体 Noto Serif SC | 编辑标题 / 宋体正文 | 同上；保留许可文件。 |
| cn-kai | 霞鹜文楷 LXGW WenKai | 文艺排版 / 阅读 | 官方仓库声明采用 OFL 1.1，并对网页用途子集/格式转换给出具体条件：限网页渲染优化，不作为可安装桌面字体向公众提供下载；若自行托管方式不属于认可范围，联系作者确认。 |
| cn-display | 得意黑 Smiley Sans | 潮流标题 / 海报 | 官方仓库使用 OFL 1.1；官方 Releases 提供 WOFF2 网页字体。推荐标题使用，不建议作 UI 正文或代码字体。 |
| cn-data | 阿里巴巴普惠体 Alibaba PuHuiTi | 数据 / 商务 / 后台 | 商用与“网页嵌入、自托管”的许可不是同一件事。阿里/字体服务商的许可条款可能区分设计稿使用、Web Project 与 Self-hosting；除非已取得适用于目标网站的嵌入许可或官方文件明确允许，否则通过官方托管服务或改用 OFL 字体，不把本地下载文件自动打包。 |
| cn-rounded | 站酷快乐体 ZCOOL KuaiLe | 圆润标题 | Google Fonts 官方仓库采用 OFL 1.1；保留许可文件。 |
| cn-banner | 优设标题黑 YouShe BiaoTiHei | Banner / 品牌短标题 | 官方发布说明支持免费商用设计应用，但字体文件嵌入 Web/App 属于独立的嵌入授权场景。除非许可明确覆盖网页自托管和转换，否则使用官方授权的 Webfont / 嵌入渠道，不将桌面字体直接打包。 |
| cn-brand | 昭源环方 Chiron GoRound TC | 圆润品牌标题 | 官方仓库采用 OFL 1.1 并提供 WOFF2；字体主要面向繁体中文，官方说明不支持简化字，不作简体界面默认正文。 |

## CSS 字体栈与命名

在 Tailwind 中只能扩展 theme.extend.fontFamily，不要覆盖整个 theme.fontFamily。字符串中的字体名要正确保留引号。

    :root {
      --font-en-ui: "Inter", Arial, sans-serif;
      --font-en-reading: "Source Sans 3", "Inter", sans-serif;
      --font-en-product: "DM Sans", "Inter", sans-serif;
      --font-en-display: "Space Grotesk", "Inter", sans-serif;
      --font-en-editorial: "Playfair Display", Georgia, serif;
      --font-en-saas: "Manrope", "Inter", sans-serif;
      --font-en-brand: "Plus Jakarta Sans", "Inter", sans-serif;
      --font-en-code: "JetBrains Mono", ui-monospace, monospace;
      --font-en-arial: "Liberation Sans", Arial, sans-serif;
      --font-en-times: "Liberation Serif", "Times New Roman", serif;

      --font-cn-sans: "Noto Sans SC", "Inter", "PingFang SC",
                      "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
      --font-cn-serif: "Noto Serif SC", "Source Sans 3", "Songti SC",
                       "SimSun", serif;
      --font-cn-kai: "LXGW WenKai", "Noto Serif SC",
                     "Kaiti SC", "KaiTi", serif;
      --font-cn-display: "Smiley Sans", "Noto Sans SC",
                         "Microsoft YaHei", sans-serif;
      --font-cn-data: "Alibaba PuHuiTi", "Noto Sans SC",
                      "PingFang SC", "Microsoft YaHei", sans-serif;
      --font-cn-rounded: "ZCOOL KuaiLe", "Noto Sans SC",
                         "Microsoft YaHei", sans-serif;
      --font-cn-banner: "YouShe BiaoTiHei", "Noto Sans SC",
                        "Microsoft YaHei", sans-serif;
      --font-cn-brand: "Chiron GoRound TC WS", "Noto Sans SC",
                       "PingFang TC", "Microsoft JhengHei", sans-serif;
    }

混合中英文段落可使用中文优先的页面栈；但如果英文标题、代码、产品 ID 必须严格使用选定英文设计，应给元素加专属类名，例如：

    .page-copy { font-family: var(--font-cn-sans); }
    .latin-title, code, pre, .sku { font-family: var(--font-en-display); }

不要假定同一个字体栈会自动把中文和拉丁字符拆给两个不同字体。字体栈是按字形覆盖顺序匹配；需要严格分工时用专属元素类或 unicode-range 分片。

## CSS @font-face 模板

路径只是构建产物示例。不要因为配置写了路径就声称字体已经存在；实际发布时必须检查文件是否存在、HTTP 是否成功、浏览器是否使用该字体、字符覆盖是否完整。

    @font-face {
      font-family: "Inter";
      src: url("/assets/fonts/en/inter-latin-400.woff2") format("woff2");
      font-style: normal;
      font-weight: 400;
      font-display: swap;
    }

    @font-face {
      font-family: "Liberation Sans";
      src: url("/assets/fonts/en/liberation-sans-latin-400.woff2") format("woff2");
      font-style: normal;
      font-weight: 400;
      font-display: swap;
    }

    @font-face {
      font-family: "Noto Sans SC";
      src: url("/assets/fonts/cn/noto-sans-sc/noto-sans-sc-subset-01.woff2") format("woff2");
      font-style: normal;
      font-weight: 400 700;
      font-display: swap;
      unicode-range: U+0020-007E, U+00A0-00FF, U+2000-206F,
                     U+3000-303F, U+3400-4DBF, U+4E00-4EFF, U+FF00-FFEF;
    }

中文 unicode-range 上面的范围只是语法示例，不是完整 CJK 字符覆盖。正式分片范围必须由已授权的字体构建流程生成，不能照抄这个小范围作为完整中文子集。

## Tailwind 完整片段

    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
      theme: {
        extend: {
          fontFamily: {
            "en-ui": ['"Inter"', "Arial", "sans-serif"],
            "en-reading": ['"Source Sans 3"', '"Inter"', "sans-serif"],
            "en-product": ['"DM Sans"', '"Inter"', "sans-serif"],
            "en-display": ['"Space Grotesk"', '"Inter"', "sans-serif"],
            "en-editorial": ['"Playfair Display"', "Georgia", "serif"],
            "en-saas": ['"Manrope"', '"Inter"', "sans-serif"],
            "en-brand": ['"Plus Jakarta Sans"', '"Inter"', "sans-serif"],
            "en-code": ['"JetBrains Mono"', "ui-monospace", "monospace"],
            "en-arial": ['"Liberation Sans"', "Arial", "sans-serif"],
            "en-times": ['"Liberation Serif"', '"Times New Roman"', "serif"],
            "cn-sans": ['"Noto Sans SC"', '"Inter"', '"PingFang SC"', '"Microsoft YaHei"', "sans-serif"],
            "cn-serif": ['"Noto Serif SC"', '"Source Sans 3"', '"Songti SC"', "SimSun", "serif"],
            "cn-kai": ['"LXGW WenKai"', '"Noto Serif SC"', '"Kaiti SC"', "KaiTi", "serif"],
            "cn-display": ['"Smiley Sans"', '"Noto Sans SC"', '"Microsoft YaHei"', "sans-serif"],
            "cn-data": ['"Alibaba PuHuiTi"', '"Noto Sans SC"', '"Microsoft YaHei"', "sans-serif"],
            "cn-rounded": ['"ZCOOL KuaiLe"', '"Noto Sans SC"', '"Microsoft YaHei"', "sans-serif"],
            "cn-banner": ['"YouShe BiaoTiHei"', '"Noto Sans SC"', '"Microsoft YaHei"', "sans-serif"],
            "cn-brand": ['"Chiron GoRound TC WS"', '"Noto Sans SC"', '"PingFang TC"', '"Microsoft JhengHei"', "sans-serif"],
            "page-ui": ['"Noto Sans SC"', '"Inter"', '"PingFang SC"', '"Microsoft YaHei"', "sans-serif"],
            "page-title": ['"Noto Sans SC"', '"Space Grotesk"', '"Microsoft YaHei"', "sans-serif"]
          }
        }
      },
      plugins: []
    };

## 首屏字体预加载

只预加载首屏最关键的 1–2 个字体文件，例如 Inter Latin Regular 和 Noto Sans SC 的首屏分片：

    <link rel="preload" href="/assets/fonts/en/inter-latin-400.woff2"
          as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="/assets/fonts/cn/noto-sans-sc/noto-sans-sc-subset-01.woff2"
          as="font" type="font/woff2" crossorigin>

字体资源使用 CORS 模式获取；预加载应带 crossorigin，并确保字体响应允许当前源。否则浏览器可能不能复用预加载结果，或重复下载字体。不要预加载所有字体选项。

## 中文字体子集化：通过构建流程处理

禁止要求用户在本地运行 PowerShell 或手工转码。应让 Vite / Webpack / CI 负责以下流程：

1. 在构建前读取字体来源、版本、LICENSE 和允许的分发/子集化方式；授权不明确时失败关闭。
2. 从源码、翻译文件、静态 UI、错误提示、业务词典、常见动态字段中生成字符清单。
3. 在字符清单基础上加入数字 0–9、大小写拉丁、常见货币符号、中文标点、全角/半角标点、括号、引号、冒号、斜线、省略号、破折号、百分号、箭头、数学符号及空格。
4. 对许可允许的字体生成 WOFF2 子集；对不允许修改/自托管的字体，使用厂商批准的 Webfont 托管或取得明确嵌入授权，不要自动改格式。
5. 按字符覆盖和必要字重分片；在 CSS 中配置真实 unicode-range。不能只有首页标题的十几个汉字。
6. 构建后检查所有 CSS URL 的资源存在、HTTP 成功、许可证文件存在、WOFF2 可解码、关键文本字形完整。
7. 对未覆盖字符的回退需可预测；在 CI 报告中列出缺失字符，不能静默地声称选定字体已加载。
8. 保留所有字体包随附的许可与版权声明。不得单独销售 OFL 字体文件。

## 官方参考

- LXGW WenKai 官方仓库与网页子集条件：https://github.com/lxgw/LxgwWenKai
- Smiley Sans 得意黑官方仓库及 OFL：https://github.com/atelier-anchor/smiley-sans
- ZCOOL KuaiLe Google Fonts 官方仓库：https://github.com/googlefonts/zcool-kuaile
- Chiron GoRound TC 官方仓库、WOFF2 与 OFL：https://github.com/chiron-fonts/chiron-go-round-tc
- Liberation Fonts v2 与度量兼容性：https://github.com/liberationfonts/liberation-fonts
- Google Fonts 字体仓库：https://github.com/google/fonts
- Alibaba PuHuiTi 官方入口：https://www.alibabafonts.com/
- Adobe Fonts 的 Alibaba PuHuiTi 授权说明（用于区分服务托管与自托管）：https://fonts.adobe.com/fonts/alibaba-puhuiti
- 优设字体官方授权场景：https://www.uisdc.com/font-empower
- 优设标题黑官方发布：https://www.uisdc.com/uisdc-first-free-font
