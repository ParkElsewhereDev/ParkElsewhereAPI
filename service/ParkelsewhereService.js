'use strict';


var database = require('./database');
var errApi = require('../utils/error')


/**
 * Deletes an incident
 *
 * incidentid String Identifier of the Incident
 * no response value expected for this operation
 **/
exports.deleteIncidentsIncidentid = function (incidentid) {
  return new Promise(function (resolve, reject) {
    database.deleteIncident(incidentid)
      .then(function (result) {
        if (result) { // truthy row count > 0
          resolve(result);
        } else {
          reject(errApi.create404Error("Couldn't find anthing matching the request URI."));
        }
      })
      .catch(function (e) {
        switch (e.statusCode) {
          case database.errors.DATABASE_ERROR:
            // remove database specific error - will leak information.
            reject(errApi.create500Error("something terrible happened with the database. Sorry..."));
            break;
          case database.errors.INTERNAL_ERROR:
            reject(errApi.create500Error(e.message));
            break;
          case database.errors.PARAMETER_ERROR:
            reject(errApi.create400Error(e.message));
            break;
        }
      })
  });
}


/**
 * Deletes a sticker
 *
 * stickerid String Identifier of the sticker
 * no response value expected for this operation
 **/
exports.deleteStickersStickerid = function (stickerid) {
  return new Promise(function (resolve, reject) {
    database.deleteSticker(stickerid)
      .then(function (result) {
        if (result) { // truthy row count > 0
          resolve(result);
        } else {
          reject(errApi.create404Error("Couldn't find anthing matching the request URI."));
        }
      })
      .catch(function (e) {
        switch (e.statusCode) {
          case database.errors.DATABASE_ERROR:
            // remove database specific error - will leak information.
            reject(errApi.create500Error("something terrible happened with the database. Sorry..."));
            break;
          case database.errors.INTERNAL_ERROR:
            reject(errApi.create500Error(e.message));
            break;
          case database.errors.PARAMETER_ERROR:
            reject(errApi.create400Error(e.message));
            break;
        }
      })
  });
}


/**
 * Loads a list of incidents
 *
 * $page String Number of the page to retrieve. Integer value. (optional)
 * lat String Allows to filter the collections of result by the value of field lat (optional)
 * lon String Allows to filter the collections of result by the value of field lon (optional)
 * date String Allows to filter the collections of result by the value of field date (optional)
 * id String Allows to filter the collections of result by the value of field id (optional)
 * $size String Size of the page to retrieve. Integer value (optional)
 * postcode String Allows to filter the collections of result by the value of field postcode (optional)
 * sticker String Allows to filter the collections of result by the value of field sticker (optional)
 * $sort String Order in which to retrieve the results. Multiple sort criteria can be passed. Example: sort=age ASC,height DESC (optional)
 * returns List
 **/
exports.getIncidents = function ($page, lat, lon, date, id, $size, postcode, sticker, $sort) {

  return new Promise(function (resolve, reject) {
    database.getIncident(id, date, lat, lon, postcode, sticker, $page, $size, $sort)
      .then(resolve)
      .catch(function (e) {
        switch (e.statusCode) {
          case database.errors.DATABASE_ERROR:
            // remove database specific error - will leak information.
            reject(errApi.create500Error("something terrible happened with the database. Sorry..."));
            break;
          case database.errors.INTERNAL_ERROR:
            reject(errApi.create500Error(e.message));
            break;
          case database.errors.PARAMETER_ERROR:
            reject(errApi.create400Error(e.message));
            break;
        }
      })
  });
}


/**
 * Loads a incident
 *
 * incident String Identifier of the incident
 * returns incident
 **/
exports.getIncidentsIncidentid = function (incidentid) {
  return new Promise(function (resolve, reject) {
    database.getIncident(incidentid)
      .then(resolve)
      .catch(function (e) {
        switch (e.statusCode) {
          case database.errors.DATABASE_ERROR:
            // remove database specific error - will leak information.
            reject(errApi.create500Error("something terrible happened with the database. Sorry..."));
            break;
          case database.errors.INTERNAL_ERROR:
            reject(errApi.create500Error(e.message));
            break;
          case database.errors.PARAMETER_ERROR:
            reject(errApi.create400Error(e.message));
            break;
        }
      })
  });
}


/**
 * Loads a list of sticker
 *
 * $size String Size of the page to retrieve. Integer value (optional)
 * id String Allows to filter the collections of result by the value of field id (optional)
 * $sort String Order in which to retrieve the results. Multiple sort criteria can be passed. Example: sort=age ASC,height DESC (optional)
 * reference String Allows to filter the collections of result by the value of field reference (optional)
 * $page String Number of the page to retrieve. Integer value. (optional)
 * returns List
 **/
exports.getStickers = function ($size, id, $sort, reference, $page) {
  return new Promise(function (resolve, reject) {
    database.getStickers(id, reference, $page, $size, $sort)
      .then(resolve)
      .catch(function (e) {
        switch (e.statusCode) {
          case database.errors.DATABASE_ERROR:
            // remove database specific error - will leak information.
            reject(errApi.create500Error("something terrible happened with the database. Sorry..."));
            break;
          case database.errors.INTERNAL_ERROR:
            reject(errApi.create500Error(e.message));
            break;
          case database.errors.PARAMETER_ERROR:
            reject(errApi.create400Error(e.message));
            break;
        }
      })
  });
}


/**
 * Loads a sticker
 *
 * stickerid String Identifier of the sticker
 * returns sticker
 **/
exports.getStickersStickerid = function (stickerid) {
  return new Promise(function (resolve, reject) {
    database.getSticker(stickerid)
      .then(resolve)
      .catch(function (e) {
        switch (e.statusCode) {
          case database.errors.DATABASE_ERROR:
            // remove database specific error - will leak information.
            reject(errApi.create500Error("something terrible happened with the database. Sorry..."));
            break;
          case database.errors.INTERNAL_ERROR:
            reject(errApi.create500Error(e.message));
            break;
          case database.errors.PARAMETER_ERROR:
            reject(errApi.create400Error(e.message));
            break;
        }
      })
  });
}


/**
 * Adds a incident
 *
 * body incident 
 * returns incident
 **/
exports.postIncidents = function (date, lat, lon, postcode, sticker) {
  return new Promise(function (resolve, reject) {
    database.postIncident(date, lat, lon, postcode, sticker)
      .then(resolve)
      .catch(function (e) {
        switch (e.statusCode) {
          case database.errors.DATABASE_ERROR:
            // remove database specific error - will leak information.
            reject(errApi.create500Error("something terrible happened with the database. Sorry..."));
            break;
          case database.errors.INTERNAL_ERROR:
            reject(errApi.create500Error(e.message));
            break;
          case database.errors.PARAMETER_ERROR:
            reject(errApi.create400Error(e.message));
            break;
        }
      })
  });
}


/**
 * Adds a sticker
 *
 * body sticker 
 * returns sticker
 **/
exports.postStickers = function (reference) {
  return new Promise(function (resolve, reject) {
    database.postSticker(reference)
      .then(resolve)
      .catch(function (e) {
        switch (e.statusCode) {
          case database.errors.DATABASE_ERROR:
            // remove database specific error - will leak information.
            reject(errApi.create500Error("something terrible happened with the database. Sorry..."));
            break;
          case database.errors.INTERNAL_ERROR:
            reject(errApi.create500Error(e.message));
            break;
          case database.errors.PARAMETER_ERROR:
            reject(errApi.create400Error(e.message));
            break;
        }
      })
  });
}


/**
 * Stores a incident
 *
 * incidentid String Identifier of the incident
 * body incident 
 * returns incident
 **/
exports.putIncidentsIncidentid = function (id, date, lat, lon, postcode, sticker) {
  return new Promise(function (resolve, reject) {
    database.putIncident(id,date, lat, lon, postcode, sticker)
      .then(resolve)
      .catch(function (e) {
        switch (e.statusCode) {
          case database.errors.DATABASE_ERROR:
            // remove database specific error - will leak information.
            reject(errApi.create500Error("something terrible happened with the database. Sorry..."));
            break;
          case database.errors.INTERNAL_ERROR:
            reject(errApi.create500Error(e.message));
            break;
          case database.errors.PARAMETER_ERROR:
            reject(errApi.create400Error(e.message));
            break;
        }
      })
  });
}


/**
 * Stores a sticker
 *
 * stickerid String Identifier of the sticker
 * body sticker 
 * returns sticker
 **/
exports.putStickersStickerid = function (id, reference) {
  return new Promise(function (resolve, reject) {
    database.putSticker(id,reference)
      .then(resolve)
      .catch(function (e) {
        switch (e.statusCode) {
          case database.errors.DATABASE_ERROR:
            // remove database specific error - will leak information.
            reject(errApi.create500Error("something terrible happened with the database. Sorry..."));
            break;
          case database.errors.INTERNAL_ERROR:
            reject(errApi.create500Error(e.message));
            break;
          case database.errors.PARAMETER_ERROR:
            reject(errApi.create400Error(e.message));
            break;
        }
      })
  });
}

