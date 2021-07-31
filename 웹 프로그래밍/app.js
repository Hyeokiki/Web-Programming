var express = require('express'),http=require('http'),path=require('path');
var static = require('serve-static');
var app = express();
var router = express.Router();
app.set('port',process.env.PORT||8080);
app.set('host','127.0.0.1');
app.use(static(__dirname));
/*app.use(function(req,res,next){
	console.log('첫 번째 미들웨어에서 요청을 처리함.');

	req.user = 'mike';
	next();
});

app.use('/',function(req,res,next){
	console.log('두 번째 미들웨어에서 요청을 처리함.');

	res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
	res.end('<h1>Express 서버에서 '+req.user+'가 응답한 결과입니다.</h1>');
});*/

router.route('/').get(function(req,res){
	res.redirect('http://localhost:8080/source/jquery.html');
});
app.use('/',router);

router.route('/routetest').get(function(req,res){

	res.redirect('http://www.google.com');
});
app.use('/',router);

router.route('/rss').get(function(req, res){
	console.log("rss data requested");
	var feed = "http://rss.joins.com/sonagi/joins_sonagi_star_list.xml";
	http.get(feed, function(httpres){
		var rss_res ="";
		httpres.on('data', function(chunk){
			rss_res += chunk;
		})
		httpres.on('end', function(){
			res.send(rss_res);
			console.log("rss response completed");
			res.end();
		})
	})
})

app.use(express.urlencoded());
app.use(express.json()); 
http.createServer(app).listen(app.get('port'),app.get('host'),()=>{
	console.log('Express server running at'+app.get('port')+app.get('host'));
});