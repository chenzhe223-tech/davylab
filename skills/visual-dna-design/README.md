# Visual DNA Design Skill

通用前端视觉设计、配色、布局、导航与字体定制技能，适用于其他 Web 应用和 Dashboard。

## 文件结构

    skills/visual-dna-design/
    ├── SKILL.md
    ├── README.md
    ├── assets/
    │   ├── visual-dna.css
    │   └── visual-dna.js
    └── references/
        ├── typography-fonts.md
        ├── acceptance-checklist.md
        └── agent-prompt.md

## 如何在其他应用中使用

1. 将本目录放进目标 Agent 的 skills 目录，或让 Agent 直接读取 SKILL.md。
2. 在任务说明中写明“使用 visual-dna-design skill”，再描述目标应用、用户主要任务、现有页面和不能修改的范围。
3. 先审计现有结构，确认业务模块和冻结页面，再套用 assets 中的 CSS/JS 基础模式。
4. 为目标应用的导航与模块添加对应 data 属性。若已有组件结构不同，应映射属性而不是强行重写整个页面。
5. 按项目情况启用六种布局、六种导航、主题色和字体选择。未使用的可选项可以关闭。
6. 将 references/agent-prompt.md 作为任务书贴给目标 Agent；按 references/acceptance-checklist.md 验收，实际测量页面宽度、卡片对齐、移动端和设置持久化。

## 设计系统覆盖内容

- Anti-template / 反模板化：由业务决定布局与视觉语言。
- 90%+ 内容铺满：工作台占用可用主画布至少 90%。
- 六种布局：Editorial、Balanced、Vertical、Compact、Bento、Split。
- 六种导航：Top、Left、Right、Bottom、Floating、Hidden。
- 六套颜色方向 + 七项自定义 Token。
- 英文 8 款主字体 + Liberation Sans/Serif 兼容选项；中文 8 款字体。
- 同行模块自然等高、空状态伸展、响应式与回归测试。

## 重要边界

- CSS 和 JS 是可映射的参考实现，不能取代对目标项目 DOM、路由与既有状态管理的审计。
- 页面字体选择器不表示所有字体二进制均已内置；自托管字体需要实际资源文件与授权检查。
- 不把 Arial / Times New Roman 字体文件打包。
- 不在未核验授权时自动转码或分发阿里巴巴普惠体、优设标题黑等字体。
- 不修改与任务无关的页面；必须保留用户明确指定的冻结基线。
