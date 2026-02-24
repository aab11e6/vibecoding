# 爱心网页发布（GitHub Pages）

这个目录已经可以直接作为静态网页发布。

## 访问地址（发布成功后）

如果仓库是 `https://github.com/aab11e6/vibecoding`，通常访问地址会是：

`https://aab11e6.github.io/vibecoding/`

## 发布步骤

1. 把 `爱心` 文件夹和 `.github/workflows/deploy-heart-web.yml` 推送到 GitHub `main` 分支。
2. 打开仓库 GitHub 页面 -> `Settings` -> `Pages`。
3. `Source` 选择 `GitHub Actions`。
4. 等待 `Actions` 里的 `Deploy Heart Web` 运行完成。
5. 打开上面的网址。

## 说明

- 这是纯静态网页，不需要服务器运行环境。
- 别人只需要浏览器即可访问。
- 你后续改 `爱心/index.html` 并推送，网页会自动更新。
