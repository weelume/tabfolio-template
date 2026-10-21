# Tabfolio 独立模板

中英文响应式官网，11 个注册页面。中文 /，英文 /en。Git：https://github.com/weelume/tabfolio-template

Node 22+，pnpm 12.10.1。pnpm install --frozen-lockfile；pnpm dev（默认端口 43306）；pnpm build 后 pnpm start。Ctrl+C 停止本工程服务。不需要数据库或密钥。

检查：pnpm typecheck、pnpm lint、pnpm test、pnpm build、pnpm tpl:check。pnpm bundle 生成共享运行包。

源码 src/features/site-templates/catalog/tabfolio，品牌 config/brand.ts；内容 data.ts；主题 theme.css；组件 components/；页面 pages/ 与 meta.ts 注册；host.tsx 提供可选 Logo、市场入口和备案插槽。运行素材 public/templates/tabfolio，展示图 .tpl/assets。新增页面同步运行注册与 .tpl/template.json。

表单仅本地演示，不发送或保存。参考案例不代表本品牌真实客户或业绩。原作者素材商用及再分发授权待确认；公开仓库不等于素材授权。详见 docs/LICENSE.md。
