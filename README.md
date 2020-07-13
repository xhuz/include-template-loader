# include-template-loader

Handle the conflict between html webpack plugin and html loader

### Upload

[1.1.3] Fix modify the absolute path of img src in the template to be a relative path, because on some Linux systems, url-loader does not process the img resource of absolute path

[1.1.2] Fix the image path of the included template to be an absolute path based on the current template path

### Install

`npm install include-template-loader -D`

### Usage

```js
  ...
    {
      test: /\.html/,
      use: [
        'html-loader',
        'include-template-loader'
      ]
    }
  ...
```

In html template

parent
`{{@include('./xxx.html', {"name": "xxx"})}}`
params is a Json string

sub
`{{name}}` // xxx

### Customize options

```js
  ...
    {
      test: /\.html/,
      use: [
        'html-loader',
        {
          loader: 'include-template-loader',
          options: {
            sign: ['{{', '}}'],
            deep: 5
          }
        }
      ]
    }
  ...
```

### Options

**_sign_**: template parsing mark, default `['{{', '}}']`

**_deep_**: the depth of recursive analysis, default 5, value range 0-5
