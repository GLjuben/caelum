const request = require("postman-request");

const geo_key = process.env.POSITIONSTACK_API_KEY;

//callback abstraction
const geocode = (address, callback) => {
  const positionstackUrl = `http://api.positionstack.com/v1/forward?access_key=${geo_key}&query=${encodeURIComponent(
    address
  )}&limit=1`;
  request({ url: positionstackUrl, json: true }, (error, { body }) => {
    // console.log(body);
    if (error) {
      callback("Unable to connect to location services.", undefined);
    } else if (body.error) {
      callback("Unable to find position. Try another search.", undefined);
    } else {
      // console.log(body.data);
      let geoinfo = body.data[0];
      console.log(geoinfo);
      callback(undefined, {
        latitude: geoinfo.latitude,
        longitude: geoinfo.longitude,
        label: geoinfo.label,
      });
    }
  });
};

module.exports = geocode;
