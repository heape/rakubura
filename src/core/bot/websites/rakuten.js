const util = window.util;
const cheerio = require("cheerio");

class Rakuten {
  constructor(taskData) {
    this.taskData = taskData;
    this.dataStore = {
      cookie: '',
      vars: {

      },
    };
  }

  log(...args) {
    const d = new Date();
    const hh = d.getHours();
    const mm = d.getMinutes();
    const ss = d.getSeconds();
    const dd = d.getMilliseconds();

    const fmtd = ('00' + hh).slice(-2) + ":" + ('00' + mm).slice(-2) + ":" + ('00' + ss).slice(-2) + ":" + ('000' + dd).slice(-3);
    
    args.push(fmtd);
    console.log.apply(this, args);
  }
  // charset: 楽天はeuc-jp
  async redirect(_response, _headers, _charset = 'utf8') {
    if(_response.headers['location'] === undefined)
      return _response;

    const response = await util.request({
      url: _response.headers['location'],
      method: 'GET',
      headers: _headers,
      data: '',
    }, _charset);

    return response;
  }

  // ログイン
  async source() {
    let res = await util.request({
      url:
        'https://www.rakute.co.jp/',
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36",
        "Accept-Encoding": "gzip, deflate",
        Accept: "application/json",
        "Accept-Language": "fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3",
        "X-Requested-With": "XMLHttpRequest"
      },
      data: ""
    });
    
    let $ = cheerio.load(res.body);

    return $('body').html
  }

  async login(user, password) {
    let url, ck, cookie, getHeaders, postHeaders, params, postData, res, $ = null;

    ck = util.createCookieStore();
    cookie =  ''; 

    getHeaders = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
      'Cookie': cookie,
    };

    postHeaders = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36',
      'Content-Length': '',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
      'Cookie': cookie,
    };

    // 次回、ヘッダーの定義が多すぎるので一つにオブジェクトを定義して(postHeaders)それを書き換える
    // 初回ログイン　これは購入前に実行する必要があります。

    url = 'https://grp01.id.rakuten.co.jp/rms/nid/vc?__event=login&service_id=top';
    getHeaders['Cookie'] = cookie;
    res = await util.request({
        method: 'GET',
        url: url,
        headers: getHeaders,
        data: '',
    }, 'euc-jp');

    ck = util.updateCookieStore(ck, cookie, res);
    cookie = ck.getAll();

    $ = cheerio.load(res.body);
    params = new URLSearchParams('service_id=top&u=&p=&submit=Login&pp_version=20170213&&time_zone=-540&os_info=Win32');
    params.set('u', this.taskData['accounts'][0]['user']);
    params.set('p', this.taskData['accounts'][0]['password']);
    postData = params.toString();

    postHeaders['Content-Length'] = postData.length;
    postHeaders['Cookie'] = cookie; 
    res = await util.request({
        method: 'POST',
        url: 'https://grp01.id.rakuten.co.jp/rms/nid/logini',
        headers: postHeaders,
        data: postData,
    }, 'euc-jp');

    this.log(res.headers, params.toString());
    ck = util.updateCookieStore(ck, cookie, res);
    cookie = ck.getAll();

  
    this.dataStore['cookie'] = cookie;
    return cookie;
  }

  // 再ログインの回避（水をカートに入れて再ログイン実行し、水をカートから消す）
  // 追記：BOTの機能としてユーザー指定でテスト商品のURLを指定できるようにする。
  async skipReLogin() {
    this.log('login()', 'done');
    let url, ck, cookie, getHeaders, postHeaders, params, postData, res, $ = null;

    ck = util.createCookieStore();
    cookie =  this.dataStore['cookie']; 
    getHeaders = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
      'Cookie': cookie,
    };

    postHeaders = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36',
      'Content-Length': '',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
      'Cookie': cookie,
    };

    // 初回購入のログイン要求を回避するため、テストで水をカートに入れ、購入はしないが、テストモードで決済を進める。
    const shop_bid = '306273', item_id = '10000912';
    let item_key = '';
     
    // unitsが1なので修正する必要がある。
    url = `https://direct.step.rakuten.co.jp/rms/mall/cartAdd/?callback=jQuery11155902848729&shopid=${shop_bid}&itemid=${item_id}&units=1`;
    getHeaders['Cookie'] = cookie;
    res = await util.request({
        method: 'GET',
        url: url,
        headers: getHeaders,
        data: '',
    });
    ck = util.updateCookieStore(ck, cookie, res);
    cookie = ck.getAll();

    url = `https://basket.step.rakuten.co.jp/rms/mall/bs/cartall/?shop_bid=${shop_bid}&l2-id=shop_header_cart`;
    getHeaders['Cookie'] = cookie;
    res = await util.request({
        method: 'GET',
        url: url,
        headers: getHeaders,
        data: '',
    }, 'euc-jp');
    ck = util.updateCookieStore(ck, cookie, res);
    cookie = ck.getAll();

    $ = cheerio.load(res.body);

    params = new URLSearchParams('check_item%5B0%5D=true&item_key%5B0%5D=&units%5B0%5D=1&shop_bid=&short_flag=1&quickNormalize_flag=true&quickNormalizeUnification_flag=true&ssl=on&isNewUi=true');
    params.set('item_key[0]', $('[name="item_key[0]"]').val());
    params.set('shop_bid', shop_bid);
    postData = params.toString();

    item_key = params.get('item_key[0]');

    this.log(url, postData, 'done');
    url = 'https://basket.step.rakuten.co.jp/rms/mall/bs/cart/set/?l2-id=step0_pc_purchase_top_1';
    postHeaders['Cookie'] = cookie;
    postHeaders['Content-Length'] = postData.length;
    res = await util.request({
        method: 'POST',
        url: url,
        headers: postHeaders,
        data: postData,
    }, 'euc-jp');
    ck = util.updateCookieStore(ck, cookie, res);
    cookie = ck.getAll();

    getHeaders['Cookie'] = cookie;
    url = res.headers['location'];

    while(true) {
      this.log(url, 'redirection');
      res = await this.redirect(res, getHeaders);
      ck = util.updateCookieStore(ck, cookie, res);
      cookie = ck.getAll();
      getHeaders['Cookie'] = cookie;

      if(res.headers['location'] === undefined) {
        break;
      } else {
        url = res.headers['location'];
      }
    }

    $ = cheerio.load(res.body);

    params = new URLSearchParams('pp_version=20170213&tokenSeed=&u=&p=&__event=ID01_001_001&login_submit=%A5%ED%A5%B0%A5%A4%A5%F3&service_id=s227&return_url=%2Fmorderfromquick%2Fset&sbId=1');
    params.set('u', this.taskData['accounts'][0]['user']);
    params.set('p', this.taskData['accounts'][0]['password']);
    params.set('tokenSeed', $('[name="tokenSeed"]').val());
    postData = params.toString();

    url = 'https://grp01.id.rakuten.co.jp/rms/nid/vc?l2-id=step1_pc_next_top';
    postHeaders['Cookie'] = cookie;
    postHeaders['Content-Length'] = postData.length;
    res = await util.request({
        method: 'POST',
        url: url,
        headers: postHeaders,
        data: postData,
    }, 'euc-jp');
    ck = util.updateCookieStore(ck, cookie, res);
    cookie = ck.getAll();

    getHeaders['Cookie'] = cookie;
    url = res.headers['location'];

    while(true) {
      this.log(url, 'redirection');
      res = await this.redirect(res, getHeaders);
      ck = util.updateCookieStore(ck, cookie, res);
      cookie = ck.getAll();
      getHeaders['Cookie'] = cookie;

      if(res.headers['location'] === undefined) {
        break;
      } else {
        url = res.headers['location'];
      }
    }

    params = new URLSearchParams('command=delete&shop_id=231322&current_shop_id=231322&item_key=9865c3e2a17932f361dd21745c5889a7&later_item_keys=');
    params.set('shop_id', shop_bid);
    params.set('current_shop_id', shop_bid);
    params.set('item_key', item_key);
    postData = params.toString();

    url = 'https://basket.step.rakuten.co.jp/rms/mall/bs/cartchangeajax/';
    postHeaders['Cookie'] = cookie;
    postHeaders['Content-Length'] = postData.length;
    res = await util.request({
        method: 'POST',
        url: url,
        headers: postHeaders,
        data: postData,
    });
    ck = util.updateCookieStore(ck, cookie, res);
    cookie = ck.getAll();


    this.dataStore['cookie'] = cookie;
    this.log(postData, res.body);
  }

  // カートイン
  async cartIn() {
    let url, ck, cookie, getHeaders, postHeaders, params, postData, res, $ = null;

    ck = util.createCookieStore();
    cookie =  this.dataStore['cookie']; 

    getHeaders = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
      'Cookie': cookie,
    };

    postHeaders = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36',
      'Content-Length': '',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
      'Cookie': cookie,
    };

    /*
      itemid や shopidなどの情報は発売前でも取得できるので、商品ページのhtmlソースを前もって準備しておく (購入速度を上げるため)    
    */
    // 商品リンク
    // テスト: カルビー(calbee) フルグラ(800g*6コセット)【3brnd-6】
    url = 'https://item.rakuten.co.jp/rakuten24/a001249924039/';
    getHeaders['Cookie'] = cookie;
    res = await util.request({
        method: 'GET',
        url: url,
        headers: getHeaders,
        data: '',
    });

    ck = util.updateCookieStore(ck, cookie, res);
    cookie = ck.getAll();

    // dbasket_choice_select%5B%5D = selector('[name="choice"] > option');
    $ = cheerio.load(res.body);

    // カート追加のURL
    let urlObj = new URL('https://ts.direct.step.rakuten.co.jp/rms/mall/cartAdd/?callback=jQuery112209693765685194131_1573344700962&shopid=231322&itemid=10025197&dbasket_choice_select%5B%5D=%25A5%25AB%25A1%25BC%25A5%25C8%25C6%25E2%25A4%25CE%25BE%25A6%25C9%25CA%25A4%25CF%3A%25C1%25B4%25A4%25C6%25B0%25EC%25BD%25EF%25A4%25CB%25C7%25DB%25C1%25F7%25A4%25B7%25A4%25DE%25A4%25B9&units=1&device=pc&userid=itempage&inventory_id=343927&_=1573344700966');
    
    urlObj.searchParams.set('shopid', $('[name="shop_id"]').val());
    urlObj.searchParams.set('itemid', $('[name="item_id"]').val());
    urlObj.searchParams.set('units', 1); // 注文個数   $('[name="units"]').val()
    urlObj.searchParams.set('inventory_id', $('[name="inventory_id"]').val());
    urlObj.searchParams.set('dbasket_choice_select[]', encodeURIComponent($('[name="choice"] > option').eq(0).val()));
    
    this.dataStore['vars']['shopid'] = urlObj.searchParams.get('shopid');

    url = urlObj.href;
    getHeaders['Cookie'] = cookie;
    res = await util.request({
        method: 'GET',
        url: url,
        headers: getHeaders,
        data: '',
    });

    ck = util.updateCookieStore(ck, cookie, res);
    cookie = ck.getAll();

    this.dataStore['cookie'] = cookie;

    return res.body;
  }

  // 購入する
  async buy() {
    let url, ck, cookie, getHeaders, postHeaders, params, postData, res, $ = null;

    ck = util.createCookieStore();
    cookie =  this.dataStore['cookie']; 

    getHeaders = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
      'Cookie': cookie,
    };

    postHeaders = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36',
      'Content-Length': '',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
      'Cookie': cookie,
    };

    const shop_bid = this.dataStore['vars']['shopid'], item_id = '10000912';
    let item_key = '';

    url = `https://basket.step.rakuten.co.jp/rms/mall/bs/cartall/?shop_bid=${shop_bid}&l2-id=shop_header_cart`;
    getHeaders['Cookie'] = cookie;
    res = await util.request({
        method: 'GET',
        url: url,
        headers: getHeaders,
        data: '',
    });

    ck = util.updateCookieStore(ck, cookie, res);
    cookie = ck.getAll();

    $ = cheerio.load(res.body);

    params = new URLSearchParams('check_item%5B0%5D=true&item_key%5B0%5D=&units%5B0%5D=1&shop_bid=&short_flag=1&quickNormalize_flag=true&quickNormalizeUnification_flag=true&ssl=on&isNewUi=true');
    params.set('item_key[0]', $('[name="item_key[0]"]').val());
    params.set('shop_bid', shop_bid);
    postData = params.toString();

    item_key = params.get('item_key[0]');

    // console.log(url, postData, 'done');
    url = 'https://basket.step.rakuten.co.jp/rms/mall/bs/cart/set/?l2-id=step0_pc_purchase_top_1';
    postHeaders['Cookie'] = cookie;
    postHeaders['Content-Length'] = postData.length;
    res = await util.request({
        method: 'POST',
        url: url,
        headers: postHeaders,
        data: postData,
    });
    ck = util.updateCookieStore(ck, cookie, res);
    cookie = ck.getAll();

    getHeaders['Cookie'] = cookie;
    url = res.headers['location'];

    while(true) {
      break;
      
      console.log(url, 'redirection');
      res = await this.redirect(res, getHeaders);
      ck = util.updateCookieStore(ck, cookie, res);
      cookie = ck.getAll();
      getHeaders['Cookie'] = cookie;

      // 多分要らない？
      if(url === 'https://grp01.id.rakuten.co.jp/rms/nid/vc?service_id=s222&__event=ID01_001_001&return_url=%2Fmorderfromquick%2Fset&l2-id=step0_pc_purchase_top_1') {
        break;
      }

      if(res.headers['location'] === undefined) {
        break;
      } else {
        url = res.headers['location'];
      }
    }

    url = 'https://basket.step.rakuten.co.jp/rms/mall/bs/morderfromquick/set?l2-id=step0_pc_purchase_top_1';
    getHeaders['Cookie'] = cookie;
    res = await util.request({
        method: 'GET',
        url: url,
        headers: getHeaders,
        data: '',
    });

    ck = util.updateCookieStore(ck, cookie, res);
    cookie = ck.getAll();
    
    url = 'https://basket.step.rakuten.co.jp/rms/mall/bs/mdlvpay/?l2-id=step0_pc_purchase_top_1';    
    getHeaders['Cookie'] = cookie;
    res = await util.request({
        method: 'GET',
        url: url,
        headers: getHeaders,
        data: '',
    });

    ck = util.updateCookieStore(ck, cookie, res);
    cookie = ck.getAll();

    // https://basket.step.rakuten.co.jp/rms/mall/bs/mdlvpay/?l2-id=step0_pc_purchase_top_1
    $ = cheerio.load(res.body);

    /*
      select_payment_map(261122)=10000  <- カード
      select_payment_map(261122)=20000  <- 代引き

      select_delivery_map(261122)=100 <- 宅配便

      下のリクエストは、宅配の場合！
    */
    let paramsStr = 'tokenSeed=&add_card_shop=&success_regist_card=false&dlvPaySubmit=%BC%A1%A4%D8&card_brand_id=&select_payment_map%28261122%29=20000&selectedShopId=261122&select_delivery_map%28261122%29=100&appdlvMap%28261122%29=true&dlv_day_type_map%28261122%29=day&isNewUi=true';
    paramsStr = paramsStr.replace(/261122/g, shop_bid);

    params = new URLSearchParams(paramsStr);
    params.set('tokenSeed', $('[name="tokenSeed"]').val());
    /*
    params.forEach((v, k) => {
      params.set(k, $(`[name="${k}"]`).val())
    });
    */
    postData = params.toString();

    url = 'https://basket.step.rakuten.co.jp/rms/mall/bs/mdlvpay/set?l2-id=step3_pc_next';
    postHeaders['Cookie'] = cookie;
    postHeaders['Content-Length'] = postData.length;
    res = await util.request({
        method: 'POST',
        url: url,
        headers: postHeaders,
        data: postData,
    });
    ck = util.updateCookieStore(ck, cookie, res);
    cookie = ck.getAll();

    getHeaders['Cookie'] = cookie;
    url = res.headers['location'];

    while(true) {
      console.log(url, 'redirection');
      res = await this.redirect(res, getHeaders, 'utf8');
      ck = util.updateCookieStore(ck, cookie, res);
      cookie = ck.getAll();
      getHeaders['Cookie'] = cookie;

      if(res.headers['location'] === undefined) {
        break;
      } else {
        url = res.headers['location'];
      }
    }

    // https://basket.step.rakuten.co.jp/rms/mall/bs/mconfirmorderquicknormalize/?l2-id=step3_pc_next
    $ = cheerio.load(res.body);

    paramsStr = 'displayOldCommit=&tokenSeed=&giftUsageMap%28261122%29=00000&commit=%C3%ED%CA%B8%A4%F2%B3%CE%C4%EA%A4%B9%A4%EB&ac=';
    paramsStr = paramsStr.replace(/261122/g, shop_bid);
    params = new URLSearchParams(paramsStr);
    params.set('tokenSeed', $('[name="tokenSeed"]').val());
    
    let elems = $('[name^="newsIdAllList["]');
    for(var i = 0; i < elems.length; i++) {
      let elem = elems.eq(i);
      params.set(elem.attr('name'), elem.val());
    }

    elems = $('[name^="units("]');
    params.set(elems.eq(0).attr('name'), elems.eq(0).val());
    postData = params.toString();

    //console.log(postData, 'done');

    console.log('購入防止 +100ms');
    return; // 購入防止
    url = 'https://basket.step.rakuten.co.jp/rms/mall/bs/mconfirmorderquicknormalize/set?l2-id=step4_pc_purchase';
    postHeaders['Cookie'] = cookie;
    postHeaders['Content-Length'] = postData.length;
    res = await util.request({
        method: 'POST',
        url: url,
        headers: postHeaders,
        data: postData,
    }, 'euc-jp');
    ck = util.updateCookieStore(ck, cookie, res);
    cookie = ck.getAll();

    getHeaders['Cookie'] = cookie;
    url = res.headers['location'];

    while(true) {
      this.log(url, 'redirection');
      res = await this.redirect(res, getHeaders);
      ck = util.updateCookieStore(ck, cookie, res);
      cookie = ck.getAll();
      getHeaders['Cookie'] = cookie;

      if(res.headers['location'] === undefined) {
        break;
      } else {
        url = res.headers['location'];
      }
    }

    this.dataStore['cookie'] = cookie;

    return res.body;
  }
}
export default Rakuten;
