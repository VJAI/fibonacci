![Screen Shot](https://github.com/VJAI/fibonacci/blob/master/fibonacci.png)

A simplistic read-friendly blog template built with golden ratio.

## Demo

[https://vjai.github.io/fibonacci/index.html](https://vjai.github.io/fibonacci/index.html)

## Supported Browsers

- Chrome
- Safari
- Firefox

## Download

Available in npm as "fibonacci-blog-template". You can also fork the repo or download the source-code from Git.

## Development

Use the below command to run the project. It'll kickstart a small server running in port 4200. Also, everytime you update the 
SCSS file, it'll automatically compile them into "fibonacci.css" file.

```
npm start
```

Use the below command to only compile the SCSS files.

```
npm build
```

## Customization

You can customize the theme by re-defining the variables in `_variables.scss` file under "scss" folder.

Important SCSS variables.

`$brand-color`
`$body-font-family`
`$heading-font-family`

## Icons

Icons are downloaded from (bootstrap)[https://icons.getbootstrap.com/]. Once the svg image is downloaded from the site 
you need to update the `width` and `height` to `100%` and then run the below command to re-generate the sprite image.

```
npm run sprites
```

The above command will create a `sprite.scss` file and `sprites.svg` image under the "assets" folder.

## License

MIT

## Questions & Feedback

Please send email to vijay.prideparrot AT gmail.com.

## Screenshots

![Screen Shot](https://github.com/VJAI/fibonacci/blob/master/docs/home.png)

![Screen Shot](https://github.com/VJAI/fibonacci/blob/master/docs/detail.png)

![Screen Shot](https://github.com/VJAI/fibonacci/blob/master/docs/contact.png)

![Screen Shot](https://github.com/VJAI/fibonacci/blob/master/docs/about.png)