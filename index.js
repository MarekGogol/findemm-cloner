require('dotenv').config();

var clonePaths = {
    '/qpe/getProjectInfo?version=2' : 15000,
    '/qpe/getTagPosition?version=2' : 1000,
};

var axios = require('axios'),
    qs = require('qs');

var config = {
   headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
   }
};

var cloneData = async (path) => {
    console.log('cloning: '+path);

    var url = process.env.QUUPPA_API+path;

    try {
        let response = await axios.get(url).then(response => response.data);

        try {
            let receiverResponse = await axios.post(process.env.API_SERVER, qs.stringify({
                url : path,
                data : response,
            }), config).then(response => response.data);
        } catch (e){
            console.error('error sending data');
        }
    } catch (e){
        console.error('error receiving data:', e);
    }
};


let receiver = async (path, interval) => {
    await cloneData(path);

    setTimeout(() => {
        receiver(path, interval);
    }, interval);
}

for ( var path in clonePaths ){
    receiver(path, clonePaths[path]);
}