var re = re || {};

re.serviceHost = "";//This will cause the host to default to the current host
//re.serviceHost = "http://www.youngevity.reurgency.com";
re.ApplicationVersionId = '00000000-0000-0000-0000-000000000001';
re.isMobile = false;//By default, hide PhoneGap Functionality

re.dBug = function(target,msg,isError,showToUser){

    try{
        var m = '';
        m = m + msg + '\n';
        if(target)m = m + JSON.stringify(target);
        if(isError){
            console.error(m);
        }else{
            console.log(m);
        }
        if(showToUser){
            alert(m);
        }
    }catch(error){
        console.log(error);
    }
}