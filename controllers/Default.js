'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.stickersPOST = function stickersPOST (req, res, next) {
  var body = req.swagger.params['body'].value;
  Default.stickersPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
