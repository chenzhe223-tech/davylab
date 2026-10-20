# DAVYLAB 多形态公众号工作流验收清单

## 1. 内容包
- [ ] publish.json 可解析，content_type 是 article / image_post / video / podcast 之一。
- [ ] status 为 ready-for-workbuddy 且 review_blockers 为空。
- [ ] body_file、review_file、sources_file 路径有效且文件存在。
- [ ] human_approval_required=true、auto_publish_allowed=false、publish_mode=save_draft_only。
- [ ] 必需素材真实存在或已验证 HTTPS 地址可访问，无凭证或未经授权素材。

## 2. 按形式检查

### 文章
- [ ] 标题、作者、摘要、正文、封面与内容包一致。
- [ ] 事实、引用、链接已核验，手机端排版清晰。

### 贴图
- [ ] 图片数量与清单一致，排序正确。
- [ ] 图片文字、裁切、说明/替代文本、来源和版权检查完成。

### 视频
- [ ] 上传最终成片而不是脚本/分镜。
- [ ] 标题、简介、封面、画幅/时长、音画同步、字幕（如有）与授权已核对。

### 播客
- [ ] 上传最终音频而不是提纲/文字稿。
- [ ] 标题、简介、封面、shownotes、文字稿、嘉宾及音乐授权已核对。

## 3. WorkBuddy
- [ ] 用户本人登录的后台，账号确认为 DAVYLAB。
- [ ] 后台入口与 content_type 匹配。
- [ ] 草稿已保存，列表可见，重新打开后内容仍完整。
- [ ] 没有点击发表、群发、发布或定时发布。

## 4. 人工审核
- [ ] 用户本人检查手机预览、事实、版权、外链和媒体播放。
- [ ] 用户本人决定是否正式发布。

关键素材缺失、入口不存在或状态未验证时必须记录待处理，不得把“已尝试”写成“成功”。
