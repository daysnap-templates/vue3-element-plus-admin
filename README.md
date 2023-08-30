# vue3-element-plus-admin

基于vue3 、element-plus 、vite 后台管理系统模板项目

## 使用

1. 全局安装 `@daysnap/cli` 脚手架

```bash
npm install @daysnap/cli
```

2. 在你的项目目录下执行

```bash 
dsc create my-project -t vue3-element-plus-admin
```

3. 更多命令可以执行 `dsc -h` 查看

```bash
dsc -h
```

## 搭建

```
# 初始化项目
npm init vue@latest

# 安装依赖包
npm install element-plus -S

npm install @element-plus/icons-vue -S

npm install unplugin-vue-components unplugin-auto-import -D

npm install sass -D

npm install pinia-plugin-persistedstate -S

npm install axios -S

npm install nprogress -S

npm install @types/nprogress -D

npm install @daysnap/define-sass -D

npm install @daysnap/banana -S

npm install @daysnap/utils -S

npm install path-to-regexp -S

npm install screenfull -S
```

## 知识点

ts type 

`verbatimModuleSyntax`


## Pro组件设计

### ProQueryForm

- 支持配置 `form` 表单
- 传递值可以修改 form 值
- 点了查询才会抛出查询填写的值