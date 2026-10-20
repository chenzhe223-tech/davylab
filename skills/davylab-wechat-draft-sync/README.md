# DAVYLAB 公众号草稿一键同步 Skill

安装一次，后续用一句固定口令触发同步。

## 安装
1. 下载并解压 Skill ZIP。
2. 在 WorkBuddy 的 Skills 管理页选择上传/导入 Skill，将压缩包导入并启用。
3. 由你本人在 WorkBuddy 可控制的浏览器中登录微信公众平台，确认账号名称为 DAVYLAB。

## 每次使用
在 WorkBuddy 聊天中发送：

> 调用 DAVYLAB 公众号草稿同步。同步当前首篇文章到公众号草稿，仅保存，不发布。

## 首次素材准备
当前 GitHub 已存有文章正文、元数据、审核清单和来源说明，但图片二进制仍在文章素材 ZIP 中，尚未进入 GitHub 稿件目录。首次执行前，请将素材 ZIP 解压并把 `assets/` 目录提供给 WorkBuddy，或把其中四张 JPG 上传到 GitHub 文章目录的 `assets/`。文件名必须与 `ASSET_MANIFEST.md` 一致。缺少图片时停止，不猜测。

## 边界
Skill 的执行终点是保存并验证公众号草稿。正式发表/群发永远由账号所有者本人完成。
