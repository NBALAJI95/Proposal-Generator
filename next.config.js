const withImages = require('next-images');
const withCSS = require('@zeit/next-css');

module.exports = withImages(withCSS({
    webpack(config, options) {
      // Further custom configuration here
	  config.node = {
		  fs: 'empty',
		  xlsx: 'empty'
	  }
      return config
    }
  }));