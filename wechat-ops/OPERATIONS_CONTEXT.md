# DAVYLAB 运营上下文（精简交接版）

此文件用于新对话或工作流交接时快速恢复关键事实，避免重复读取长聊天记录。优先参考本文件和链接的现行规范；若与聊天中的旧说法冲突，以用户最近明确要求和仓库最新版本为准。

## 品牌与内容方向
- 品牌：DAVYLAB；主张：把想法，做成能用的工具。
- 核心风格：高级、克制、科技感；深海军蓝/蓝灰为主，少量品牌蓝紫或暖金点缀，避免颜色堆叠。
- 主要栏目方向：从念头到产品、AI 实战手记、AI 创造机会雷达、普通人的 AI 创造力、产品复盘与实验室。
- 文章要真实、自然、有过程和证据；不虚构项目成果、用户反馈、功能状态或外部事实。

## 首篇文章
- 唯一正式标题：**我用 AI 做了几个应用后，才发现：能生成，不等于能用**
- 核心叙事：作者从 AI 小白起步；起初急于让 AI 生成，边看结果边频繁修改、消耗时间和 Token；后来学习先与 AI 对话澄清需求、目标与用户场景，提前规划架构与开发方法，再把多端同步、隐私安全、视觉、易用性和验收纳入考虑；通过持续测试与迭代提高产品质量。
- 案例/素材：念头盒 NianBox、Dashboard Studio、Link-R World、AI 前沿简报、随调 SipSpark、暖间地图、DAVYLAB 网站。根据作者实际状态区分已上线、在开发、方案或概念，不宣称全部完成。
- 架构设计图不等同安全能力已通过生产验证；真实产品截图优先于 AI 臆造 UI。

## 发布流程
1. ChatGPT 准备选题、正文、核查与配图。
2. 稿件交付 GitHub。
3. WorkBuddy 通过浏览器读取稿件，核对账号 DAVYLAB，将内容录入公众号。
4. 保存草稿，重新打开核验，再做手机预览。
5. 正式发布由作者本人确认并手动完成，不自动发表/群发/定时发布。

## 强制发布规范
- 公众号标题字段只放正式标题一次。
- 封面只放封面字段，不插入正文。
- 正文清除旧版品牌开场图和标题海报；不重复主标题，不把完整 HTML 网站预览整体粘贴进正文。
- 正文从引导语/首段文字开始。
- 正文图必须实际上传到公众号编辑器；不得依赖本地 file URL。
- 头条封面 1800×766 px，约 2.35:1，JPG/PNG，≤2 MB；如果编辑器要求 1:1 分享卡，单独准备方图。
- 视觉保持克制；保留有意义的发光路径设计。中文标题必须逐字核对；图像生成模型可能写错文字或臆造界面。
- 手机预览检查首屏、字体、行距、对比度、图序、图片比例、尾段。旧临时预览链接可能失效，应重新生成。
- 不能把“准备完成”“已保存草稿”“预览通过”“正式发布”混为一谈；没有证据就标记未验证。
- 二维码只能用用户给出的真实官方二维码原图，不生成、不伪造。

## 当前状态与待办
- 首篇文章内容、元数据、review、sources、asset manifest 均在 GitHub 仓库 chenzhe223-tech/davylab。
- 首篇内容目录：wechat-ops/drafts/2026-10-20-ai-can-generate-not-equal-usable/
- 正文：https://github.com/chenzhe223-tech/davylab/blob/main/wechat-ops/drafts/2026-10-20-ai-can-generate-not-equal-usable/article.md
- 发布信息：https://github.com/chenzhe223-tech/davylab/blob/main/wechat-ops/drafts/2026-10-20-ai-can-generate-not-equal-usable/publish.json
- 排版 Skill：https://github.com/chenzhe223-tech/davylab/blob/main/skills/davylab-wechat-draft-sync/SKILL.md
- 复盘规则：wechat-ops/POSTMORTEM_FIRST_PUBLISH.md
- 操作手册：wechat-ops/WORKBUDDY_RUNBOOK.md
- 之前手机预览发现正文旧品牌图与大标题图片重复占据首屏。下一次操作必须备份后清空旧正文，再按正文专用排版文件重新录入。
- 已建立本地排版修复包 ZIP，但公众号后台是否重录、图片是否上传、手机预览是否通过、文章是否正式发布均未核实。不能声称已发布。
- 素材 ZIP 中的图片是否已提交为 GitHub 二进制资源须逐一检查。文本 manifest 不代表图片已经上传。

## 推荐新对话开场
“请先读取 DAVYLAB 仓库的 wechat-ops/OPERATIONS_CONTEXT.md 与 wechat-ops/POSTMORTEM_FIRST_PUBLISH.md，按最新状态继续首篇公众号文章的排版修复和草稿验收。不要重复生成已完成内容；先核查素材文件是否真实存在，先清除旧正文再录入，不正式发布。”
