# DAVYLAB 内容类型与素材交付规范

## 统一原则
content_type 是内容分流依据：article、image_post、video、podcast。四种形式共用状态、安全和审核流程，但素材要求不能混用。不能只改标题就把一种内容冒充成另一种形式。

## 文章 article
主文件 article.md。交付标题、摘要、作者、正文、来源和封面。检查事实引用、标题/摘要一致性、手机端富文本排版、图片版权和外链。

## 贴图 image_post
主文件 image-post.md。交付配文、图片数组、顺序、每张图的 caption/alt text、素材来源和授权。图片顺序由 publish.json 的 assets.images 数组确定，不能依赖文件夹顺序。检查手机端文字可读性、裁切、错字和版权。后台若要求封面，只用指定封面。

## 视频 video
主文件 video.md。交付标题/简介、开场、分镜、旁白/屏幕文字、最终成片、封面/缩略图、来源与授权，可附字幕。assets.video 必须指向最终成片，不是脚本。记录真实时长、画幅、版本、字幕语言。核查画音同步、字体、音乐/音效、视频片段和出镜者授权。没有成片则不能设为 ready-for-workbuddy。

## 播客 podcast
主文件 podcast.md。交付节目/单集标题、简介、主持人/嘉宾、章节时间码、shownotes、最终音频、封面、文字稿/转写和授权记录。assets.audio 必须指向最终音频，不是提纲。核查声音质量、文字稿准确性、嘉宾录制/声音授权及音乐版权。没有最终音频或当前公众号后台不提供播客入口时暂停，不得伪装成视频。

## 媒体存储
小型图片、封面、字幕和文字稿可提交 GitHub。大视频/音频文件使用用户批准的受控存储；manifest 中注明 HTTPS 地址、权限/有效期、文件版本和核验结果。不得将密码、Cookie、AppSecret、API Token 或临时认证链接写入仓库。外部链接需实际验证能访问，不能只凭 URL 外观判定成功。

## 人工审批
publish.json 必须保持 human_approval_required=true、auto_publish_allowed=false、publish_mode=save_draft_only。WorkBuddy 只保存草稿；正式发布由用户本人手动确认。
