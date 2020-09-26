const Reqy = require('request');
const exp = require('express');

var app = exp();

app.get('/', function(req,res) {
  out='<p>Click to add text:<\p><ul>';
  Reqy('http://andysbuses.com/Services/JSONPRelay.svc/GetMapVehiclePoints?ApiKey=8882812681', (err,resp,body) => {
    shuttle_info=JSON.parse(body)
    console.log(shuttle_info);
    for (i=0;i<shuttle_info.length;i++) {
      out+="<li>Bus #"+JSON.stringify(i+1)+":<ul>";
      for (j=0;j<Object.keys(shuttle_info[i]).length;j++) {
        if (Object.keys(shuttle_info[i])[j]=="TimeStamp") {
          console.log(Object.values(shuttle_info[i])[j].substring(6,19));
          var dt = new Date(JSON.parse(Object.values(shuttle_info[i])[j].substring(6,19)));
          out+="<li>"+Object.keys(shuttle_info[i])[j]+": "+dt.toGMTString()+"</li>";
          continue;
        }
        out+="<li>"+Object.keys(shuttle_info[i])[j]+": "+Object.values(shuttle_info[i])[j]+"</li>";
      }
      out+="</ul></li>"
    }
    out+="</ul>"
    res.send(out);
  });
});

var server = app.listen(8081, () => {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})
