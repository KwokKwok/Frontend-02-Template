# 持续集成

Build相关：

1. daily build，每天晚上进行一次全局build
1. BVT，构建验证测试。冒烟测试。提交之前进行验证。

课程介绍了在Git Hooks中，在提交时进行ESLint检查。该hook更好的处理方式是在服务端进行。也介绍了git stash配合ESLint如何自动操作。

另外介绍了Chrome的headless模式，以及对应的[pupperteer](https://github.com/puppeteer/puppeteer)模块的使用方式。


实际使用中：

1. Git Hooks在用，会在服务端写脚本，主分支提交后自动打包部署
1. ESLint可以配合VS Code使用，不需要到提交的时候才检查
