
# buildfont


Convert several svg files to one single font file formatted as .ttf, .svg, .woff, eot.

Demo html , css and map json files are also generated. Easy to be integrated in web or react native environment.

Supports colorful svg fonts. (svg sprites)

自动合并svg文件，生成.ttf, .svg, .woff, .eot多种字体文件，并同时生成css、html和map文件，方便用于web和react-native(如react-native-vector-icons)等多种场合。

支持合成svg sprites形式的多色图标。

## install

```
npm install -g buildfont

```

## usage

Put svgs into directory ./svgs. Svgs' filename should be meaningful. Css classnames will be based on svg' filename.

Run buildfont at the parent directory of './svgs', font file and demo html/css will be generated in ./font.

将svg文件放入./svgs文件夹，文件名与字体含义相同


在./svgs的父级目录运行buildfont 即可生成 ./font文件夹，内有各种文件


```
$ buildfont
```

### 参数：

-F, 配置font-family的名字, 默认是iconfont

```
$ buildfont -F dunhuangFont  
```
-p 配置svgs的文件夹路径, 默认'./svgs'

```
buildfont -p ~/svgs/ 
```

### example

```
cd example

```
build font icons 生成单色字体图标

```
buildfont

```


build colorful svg icons 生成多色svg图标（svg sprites)

```
buildfont -p ./examples/csvgs -c

```

在react中使用svg sprites：
```
import React, {Component} from 'react'
import getSvg from './svgsymbol/svgsymbol_cjs';

class ReactSvg extends Component {
  render () {
    const {svg} = this.props
    return (
      <div dangerouslySetInnerHTML={{__html: svg}} style={{display:'none'}}/>
    )
  }
}

const defaultStyle = {
  width: '1em',
  height: '1em',
  verticalAlign: '-0.15em',
  fill: 'currentColor',
  overflow: 'hidden'
}
class IconSvg extends Component {
  render () {
    const {name, style = {}, className = ''} = this.props
    return (
      <svg className={className} style={Object.assign({}, defaultStyle,style)} aria-hidden="true">
        <use xlinkHref={'#icon-' + name}></use>
      </svg>
    )
  }
}


const App = () => (
  <div>
    <ReactSvg svg={getSvg()}/>
    <p style={{fontSize: 20}}><IconSvg name="design"/></p>
    <p style={{fontSize: 20}}><IconSvg name="football"/></p>
    <p style={{fontSize: 20}}><IconSvg name="reading"/></p>
  </div>
);
```

