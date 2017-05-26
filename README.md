
# buildfont


Convert several svg files to one single font file formatted as .ttf, .svg, .woff.

Demo html and css are also generated.

自动合并svg文件，生成.ttf, .svg, .woff, .eot多种字体文件，并同时生成css和html

## install

```
npm install -g buildfont

```

## usage

Put svgs into directory ./svgs. Svgs' filename should be meaningful. Css classnames will be based on svg' filename.

Run buildfont at the parent directory of './svgs', font file and demo html/css will be generated in ./font.

```
$ buildfont

```


将svg文件放入./svgs文件夹，文件名与字体含义相同


在./svgs的父级目录运行buildfont 即可生成 ./font文件夹，内有各种文件