define(function(require, exports, module) {
    /* format string value with arguments */
    String.prototype.format = String.prototype.f = function() {
        var s = this,
            i = arguments.length;

        while (i--) {
            s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
        }
        return s;
    };

    /* if a string ends with a given suffix */
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };

    /* if a string starts with a given prefix */
    String.prototype.startsWith = function (str){
        return this.indexOf(str) == 0;
    };

    /**
    * @function check Network Connections, only support ETHERNET,WIFI, CELL 3|4 G
    */
    function _getNetwork(){
        var connDeferred = $.Deferred();
        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';

        // https://github.com/apache/cordova-plugin-network-information/blob/master/doc/index.md
        // iOS Quirks to support iPhone 5S, 
        // iOS does not have specific info like WIFI, 3G ... just cellular or not
        if(device.platform == 'iOS'){
            if($.inArray(navigator.connection.type, 
                         [Connection.CELL,Connection.WIFI]) !== -1){
                connDeferred.resolve(navigator.connection.type);
            }else{
                connDeferred.reject("unknown");
            }
        }else if (device.platform == 'Android'){
            // check for android
            var androidServeNetwork = [Connection.WIFI,
                                Connection.CELL_3G,
                                Connection.CELL_4G];
            if($.inArray(navigator.connection.type, androidServeNetwork) !== -1){
                connDeferred.resolve(navigator.connection.type);
            }else{
                connDeferred.reject("unknown");
            }
        }else{
            connDeferred.reject({error: "unsupported platform"});
        }
        return connDeferred.promise();
    }


    return { 
        getDate : function(){
            var curr = new Date();
            var dd = curr.getDate();
            var mm = curr.getMonth()+1; //January is 0!
            var min = curr.getMinutes();
            var sec = curr.getSeconds();

            var yyyy = curr.getFullYear();
            if(dd<10){
                dd='0'+dd
            } 
            if(mm<10){
                mm='0'+mm
            } 
            if(min<10){
                min='0'+min
            } 
            if(sec<10){
                sec='0'+sec
            } 
            return yyyy+'/'+ mm + '/' + dd + ' ' + min + ':' + sec;
        },
        getNetwork : _getNetwork
    };
})
