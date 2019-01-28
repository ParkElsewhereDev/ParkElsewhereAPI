'use strict';

var utils = require('../utils/writer.js');
var Parkelsewhere = require('../service/ParkelsewhereService');

module.exports.deleteIncidentsIncidentid = function deleteIncidentsIncidentid (req, res, next) {
  var incidentid = req.swagger.params['incidentid'].value;
  Parkelsewhere.deleteIncidentsIncidentid(incidentid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, utils.respondWithCode(response.statusCode, response));
    });
};

module.exports.deleteStickersStickerid = function deleteStickersStickerid (req, res, next) {
  var stickerid = req.swagger.params['stickerid'].value;
  Parkelsewhere.deleteStickersStickerid(stickerid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, utils.respondWithCode(response.statusCode, response));
    });
};

module.exports.getIncidents =  function getIncidents (req, res, next) {
  var $page = req.swagger.params['$page'].value || null;
  var lat = req.swagger.params['lat'].value || null;
  var lon = req.swagger.params['lon'].value || null;
  var date = req.swagger.params['date'].value || null;
  var id = req.swagger.params['id'].value || null;
  var $size = req.swagger.params['$size'].value || null;
  var postcode = req.swagger.params['postcode'].value || null;
  var sticker = req.swagger.params['sticker'].value || null;
  var $sort = req.swagger.params['$sort'].value || null;

  
  var response =  Parkelsewhere.getIncidents($page,lat,lon,date,id,$size,postcode,sticker,$sort)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, utils.respondWithCode(response.statusCode, response));
    });

};

module.exports.getIncidentsIncidentid = function getIncidentsIncidentid (req, res, next) {
  var incidentid = req.swagger.params['incidentid'].value;
  Parkelsewhere.getIncidentsIncidentid(incidentid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, utils.respondWithCode(response.statusCode, response));
    });
};

module.exports.getStickers = function getStickers (req, res, next) {
  var $size = req.swagger.params['$size'].value || null;
  var id = req.swagger.params['id'].value || null;
  var $sort = req.swagger.params['$sort'].value || null;
  var reference = req.swagger.params['reference'].value || null;
  var $page = req.swagger.params['$page'].value || null;
  Parkelsewhere.getStickers($size,id,$sort,reference,$page)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, utils.respondWithCode(response.statusCode, response));
    });
};

module.exports.getStickersStickerid = function getStickersStickerid (req, res, next) {
  var stickerid = req.swagger.params['stickerid'].value;
  Parkelsewhere.getStickersStickerid(stickerid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, utils.respondWithCode(response.statusCode, response));
    });
};

module.exports.postIncidents = function postIncidents (req, res, next) {
  var body = req.swagger.params['body'].value;

  var date = body.date || null;
  var lat = body.lat || null;
  var lon = body.lon || null;
  var postcode = body.postcode || null;
  var sticker = body.sticker || null;


  Parkelsewhere.postIncidents(date, lat, lon, postcode, sticker)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, utils.respondWithCode(response.statusCode, response));
    });
};

module.exports.postStickers = function postStickers (req, res, next) {
  var body = req.swagger.params['body'].value;
  var reference = body.reference || null;

  Parkelsewhere.postStickers(reference)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, utils.respondWithCode(response.statusCode, response));
    });
};

module.exports.putIncidentsIncidentid = function putIncidentsIncidentid (req, res, next) {
  var id = req.swagger.params['incidentidd'].value;
  var body = req.swagger.params['body'].value;

  var date = body.date || null;
  var lat = body.lat || null;
  var lon = body.lon || null;
  var postcode = body.postcode || null;
  var sticker = body.sticker || null;


  Parkelsewhere.putIncidentsIncidentid(id, date, lat, lon, postcode, sticker)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, utils.respondWithCode(response.statusCode, response));
    });
};

module.exports.putStickersStickerid = function putStickersStickerid (req, res, next) {
  var id = req.swagger.params['stickerid'].value;
  var body = req.swagger.params['body'].value;
  var reference = body.reference || null;

  Parkelsewhere.putStickersStickerid(id,reference)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, utils.respondWithCode(response.statusCode, response));
    });
};
