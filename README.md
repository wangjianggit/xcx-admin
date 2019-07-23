# SAdmin

> big shit

**


## Build Setup

```bash
# Clone project
暂无

# Install dependencies
npm install

# Serve with hot reload at localhost:9528
npm run dev

# Build for production with minification
npm run build

# Build for production and view the bundle analyzer report
npm run build --report
```

## Demo

暂无

## Extra




## Related Project

### Element-Ui using cdn tutorial


Import css and js of `Element`, and then import vue. Because `Element` is vue-dependent, vue must be import before it.

Add `externals` to make webpack not package vue and element.

```
externals: {
  vue: 'Vue',
  'element-ui':'ELEMENT'
}
```

## Browsers support

Modern browsers and Internet Explorer 10+.

| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions

## License

