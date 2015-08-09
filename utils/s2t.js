(function(){
  fs = require('fs');

  fs.readFile('dist/index.html', 'utf-8', function (err, data){
    var OpenCC = require('opencc');
    var opencc = new OpenCC('hk2s.json');
    var simplifiedText = opencc.convertSync(data);

    simplifiedText = simplifiedText.replace('zh-hant', 'zh-hans');

    fs.writeFile("dist/index_hans.html", simplifiedText, function(err) {
      if(err) {
        return console.log(err);
      }
      console.log("index_hans.html created.");
    });
  });

}());
