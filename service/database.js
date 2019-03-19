'use strict';

var { Pool } = require('pg');

var createError = require('../utils/error').createError;
var stall = require('../utils/stall').stall;

var thePool = null;
var theConfig = null;
var theStickerConfig = null;

const errors = {
  PARAMETER_ERROR:-1,
  DATABASE_ERROR:-2,
  INTERNAL_ERROR:-3
}

var types = require('pg').types;
// see https://github.com/brianc/node-pg-types#pg-types
// pg is returning our bigint date type as a string instead of a number.
types.setTypeParser(20, function(val) {
  return parseInt(val);
});

var initialise = function (url, config, needsSSL) {
    if (needsSSL == true) {
      url += "?sslmode=require"
    }
    
    if (thePool) {
      thePool.end();
    };
  
    theConfig = null;
  
    theConfig = {
      connectionString: url,
      ssl: needsSSL
    };
    theStickerConfig = config;
    thePool = new Pool(theConfig);
    console.log("the pool: "+thePool!= null);
    console.log(theStickerConfig);
  };
  


  var test = async function(arg){

    await stall(500, createError(errors.PARAMETER_ERROR,"bad parameter!"));
    
  }

  function equals(arg1, arg2){
    var result = false;
    if(typeof(arg1) == 'string' && typeof(arg2) == 'string' ){
      result =  (new String(arg1).valueOf() == new String(arg2).valueOf());
    }
    return result;
  }


var getIncidents = async function(id, date, lat, lon, postcode, sticker, $page, $size, $sort){
  var result = null;

  var stem = 'select * from incidents where';
  var id_comp = '($1::text is null or id = $1) and ';
  var date_comp = '($2::bigint is null or date = $2) and ';
  var lat_comp = '($3::real is null or lat = $3) and '; // practically useless. Included for completeness
  var lon_comp = '($4::real is null or lon = $4) and '; // practically useless. Included for completeness
  var postcode_comp = "($5::text is null or postcode ilike $5) and ";
  var sticker_comp = '($6::text is null or sticker = $6) ';
  

  var page = 0;
  var size = 0;
  var sort = "";

  if(postcode){
    postcode = "%" + postcode + "%"; //wildcards addition
  }


  if($page){
    try{
      page = parseInt($page);
    }catch(e){}

  }
  if($size){
    try{
      size = parseInt($size);
    }catch(e){}
  }
  if($sort){
    sort = ' order by ' + $sort; // expecting something like "postcode ASC, date DESC". Will throw on error. 
  }

  var pagination_comp = "";
  if(page && size){
    var offset = (page-1) * size;
    pagination_comp = " OFFSET " + offset + " LIMIT " + size; 
  }


  var query = 
    stem + 
    id_comp +
    date_comp +
    lat_comp +
    lon_comp +
    postcode_comp +
    sticker_comp +
    sort + 
    pagination_comp + ";"; 
    

  var parameters = [id, date, lat, lon, postcode, sticker];
  try{
    var response = await thePool.query(query,parameters);
    result = response.rows;
  }catch(e){
    throw(createError(errors.PARAMETER_ERROR,e.message));
  }

  return result;
}


var getIncident = async function(id){
  var result = null;

  var stem = 'select * from incidents where';
  var id_comp = '($1::text is null or id = $1)';
  
  

  var query = 
    stem + 
    id_comp + ";"; 
    

  var parameters = [id];
  try{
    var response = await thePool.query(query,parameters);
    result = response.rows;
  }catch(e){
    throw(createError(errors.PARAMETER_ERROR,e.message));
  }

  return result;
}

var deleteIncident = async function(id){
  var result = null;

  var stem = 'delete from incidents where';
  var id_comp = ' id = $1';
  
  var query = 
    stem + 
    id_comp + ";"; 
    

  var parameters = [id];
  try{
    var response = await thePool.query(query,parameters);
    result = response.rowCount;
  }catch(e){
    throw(createError(errors.PARAMETER_ERROR,e.message));
  }

  return result;
}



var getStickers = async function(id, reference, $page, $size, $sort){
  var result = null;

  var stem = 'select * from stickers where';
  var id_comp = '($1::text is null or id = $1) and ';
  var reference_comp = '($2::text is null or reference ilike $2)';


  var page = 0;
  var size = 0;
  var sort = "";

  if(reference){
    reference = "%" + reference + "%"; //wildcards addition
  }


  if($page){
    try{
      page = parseInt($page);
    }catch(e){}

  }
  if($size){
    try{
      size = parseInt($size);
    }catch(e){}
  }
  if($sort){
    sort = ' order by ' + $sort; // expecting something like "name ASC". Will throw on error. 
  }

  var pagination_comp = "";
  
  if(page && size){
    var offset = (page-1) * size;
    pagination_comp = " OFFSET " + offset + " LIMIT " + size; 
  }


  var query = 
    stem + 
    id_comp +
    reference_comp +
    sort + 
    pagination_comp + ";"; 
    

  var parameters = [id, reference];
  try{
    var response = await thePool.query(query,parameters);
    result = response.rows;
  }catch(e){
    throw(createError(errors.PARAMETER_ERROR,e.message));
  }

  return result;
}

var getSticker = async function(id){
  var result = null;

  var stem = 'select * from stickers where';
  var id_comp = '($1::text is null or id = $1)';
  
  

  var query = 
    stem + 
    id_comp + ";"; 
    

  var parameters = [id];
  try{
    var response = await thePool.query(query,parameters);
    result = response.rows;
  }catch(e){
    throw(createError(errors.PARAMETER_ERROR,e.message));
  }

  return result;
}


var deleteSticker = async function(id){ 
  var result = null;

  var stem = 'delete from stickers where';
  var id_comp = ' id = $1';
  
  var query = 
    stem + 
    id_comp + ";"; 
    

  var parameters = [id];
  try{
    // the foreign key set-up in the DB ensures we delete all associated incidents.
    var response = await thePool.query(query,parameters);
    result = response.rowCount;
  }catch(e){
    throw(createError(errors.PARAMETER_ERROR,e.message));
  }

  return result;
}

var postSticker = async function(reference){ 
  var result = null;
  var queryResult = null;
  var uuid = null;
  console.log(theStickerConfig);
//insert sticker based on number of stickers
  var query = 'INSERT INTO stickers("reference") VALUES($1) RETURNING "id", "reference";';
    
  var parameters = [reference];
  try{
    // the foreign key set-up in the DB ensures we delete all associated incidents.
    //var response = await thePool.query(query,parameters);
    var response = {rows:[{id:"8764a104-8ef3-46ca-8230-4d3eeca6b0a8", reference: "Alice"}]};

    queryResult = response.rows[0];
    uuid = queryResult.id;
  }catch(e){
    throw(createError(errors.PARAMETER_ERROR,e.message));
  }
  try{
    if(queryResult){
      var url = theStickerConfig.SPWA_URL+"?"+"park="+theStickerConfig.PARK_DOMAIN+"&"+"push="+theStickerConfig.PUSH_DOMAIN+"&"+"uuid="+uuid;
      var id = uuid;
      result = {
        url:url,
        id:id
      };
    }
  }catch(e){
    throw(createError(errors.INTERNAL_ERROR,e.message));
  }

  return result;
}

var postIncident = async function(date, lat, lon, postcode, sticker){ 
  var result = null;
  var query = null;
  var parameters = null;

  if (postcode != null && lat != null && lon != null){
    query = 'INSERT INTO incidents("date","lat","lon","postcode","sticker") VALUES($1, $2 , $3, $4, $5) RETURNING "id", "date","lat","lon","postcode","sticker";';
    parameters = [date,lat,lon,postcode,sticker];
  }
  else{
    query = 'INSERT INTO incidents("date","sticker") VALUES($1, $2) RETURNING "id", "date","lat","lon","postcode","sticker";';
    parameters = [date,sticker];
  }

  try{
    // the foreign key set-up in the DB ensures we delete all associated incidents.
    var response = await thePool.query(query,parameters);
    result = response.rows[0];
  }catch(e){
    throw(createError(errors.PARAMETER_ERROR,e.message));
  }
  return result;
}


var putSticker = async function(id, reference){ 
  var result = null;

  var query = 'UPDATE stickers SET "reference"= $2::text WHERE "id"= $1::text RETURNING "id", "reference";';

  var parameters = [id,reference];
  try{
    // the foreign key set-up in the DB ensures we delete all associated incidents.
    var response = await thePool.query(query,parameters);
    result = response.rows[0];

  }catch(e){
    throw(createError(errors.PARAMETER_ERROR,e.message));
  }
  if(!result){
    throw(createError(errors.PARAMETER_ERROR,"no result: perhaps the id was incorrect."));
  }
  return result;
}



var putIncident = async function(id, date, lat, lon, postcode, sticker){ 
  var result = null;

  var query = 'UPDATE incidents SET "date"= $2::bigint, "lat"= $3::real, "lon"= $4::real, "postcode"= $5::text, "sticker"= $6::text WHERE "id"= $1::text RETURNING "id", "date", "lat", "lon", "postcode", "stickers";';  
  var parameters = [id,date,lat,lon,postcode,sticker];
  try{
    // the foreign key set-up in the DB ensures we delete all associated incidents.
    var response = await thePool.query(query,parameters);
    result = response.rows[0];

  }catch(e){
    throw(createError(errors.PARAMETER_ERROR,e.message));
  }
  if(!result){
    throw(createError(errors.PARAMETER_ERROR,"no result: perhaps the id was incorrect."));
  }
  return result;
}

  module.exports = {
    errors:errors,
    initialise: initialise,
    getIncidents:getIncidents,
    getIncident:getIncident,
    getStickers:getStickers,
    getSticker,getSticker,
    deleteIncident:deleteIncident,
    deleteSticker:deleteSticker,
    postIncident:postIncident,
    postSticker:postSticker,
    putIncident: putIncident,
    putSticker: putSticker
  };