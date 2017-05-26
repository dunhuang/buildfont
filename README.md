
# buildfont


Convert several svg files to one single font file formatted as .ttf, .svg, .woff.

Demo html , css and map json files are also generated. Easy to be integrated in web or react native environment.

自动合并svg文件，生成.ttf, .svg, .woff, .eot多种字体文件，并同时生成css、html和map文件，方便用于web和react-native(如react-native-vector-icons)等多种场合。

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
-s 配置svgs的文件夹路径, 默认'./svgs'

```
buildfont -s ~/svgs/ 
```
 