# wechat-js-sdk-beautify

人肉反编译 http://res.wx.qq.com/open/js/jweixin-1.0.0.js

# with asserts!

微信的错误提示简直 (╯°□°)╯︵ ┻━┻

所以在开发环境请使用 jweixin-1.0.0.beautify.js ┬─┬ ノ(°_°ノ)

# last keepup

2017.FEB.03

# how to

1. 运行 `npm run keepup`，会同步最新的 sdk 文件
2. 然后执行 `git diff jsbeautifier.org.js`，即可查看这期间微信偷偷摸摸改了些什么
3. 然后到 `jweixin-1.0.0.beautify.js` 把这些 `diff` 更新进去；如果尚未反编译，则直接覆盖；如果已经反编译，则需人肉升级

# MIT License
