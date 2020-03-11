import React, { useEffect, useRef } from "react";
import cheerio from 'cheerio';
import { BrowserRouter as Router, useHistory, Switch, Route, Link } from 'react-router-dom';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@mdi/react';
import { mdiCartPlus, mdiArrowLeft, mdiArrowRight, mdiReload, mdiHome, mdiMagnify, mdiCarTireAlert, } from '@mdi/js';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '80%',
    height: 'calc(100% - 50px)'
  },
  webview: {
    height: 'calc(100vh - 194px)' // 144px + 50px
  },
  form: {
    marginLeft: 10,
    padding: theme.spacing(1),
  },
  inputBoxRoot: {
    padding: '0 10px 0 8px',
    borderRadius: 5,
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    display: 'inline-block',
    top: 1,
    position: 'relative',
  },
  inputBox: {
    borderRadius: 6,
    width: '96%',
    fontWeight: 400,
    color: 'rgba(10, 10, 10, 1)',
    top: 1,
    position: 'relative',
  },
  iconRoot: {
    display: 'inline-block'
  },
  icon: {

  },
  iconCartIn: {
    padding: 12,
    boxShadow: '0px 2px 6px 1px #000',
    backgroundColor: 'rgba(175, 234, 9, 1)',
    '&:hover': {
      backgroundColor: 'rgba(141, 186, 7, 1)'
    }
  },
  cartInButtonRoot: {
    left: '88%',
    bottom: 10,
    zIndex: 1,
    borderRadius: '50%',
    position: 'fixed'
  },
  orderBoxRoot: {
    float: 'right',
    width: 100,
    backgroundColor: 'rgba(255, 255, 255, 1)'
  },
  green: {
    backgroundColor: 'rgba(175, 234, 9, 1)'
  }
}));

const theme = createMuiTheme({
  overrides: {
    MuiInputBase: {
      input: {

      },
    },
  },
});

const evaluate = (webview, script) => {
  return new Promise(resolve => {
    script = `(${ script.toString() })();`;
    webview.executeJavaScript(script).then((res) => { resolve(res); });
  });
};

const regsiterEvents = () => {
  const webview = document.querySelector('webview');

  const didload = async () => {
    const url = webview.getURL();

    if(window.core.system.functions['browserNav']['update'] !== null) {
      window.core.system.functions['browserNav']['update']({ url: url });
    }
  };

  if(webview === null)
    return;

  webview.addEventListener('page-title-updated', didload);
  // console.log('events registered!');
};

export default function BrowserContent() {
  const classes = useStyles();
  const history = useHistory();
  const [values, setValues] = React.useState({
    url: 'https://www.rakuten.co.jp',
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClick = async (prop, ...args) => {
    if(prop === 'cartIn') {
      const webview = document.querySelector('webview');

      const url = webview.getURL();
      const html = await evaluate(webview, () => {
        return document.documentElement.innerHTML;
      });

      const queue = {
        type: 'prop',
        route: '/item/new',
        item: {
          url: '',
          shopName: '',
          name: '',
          imageUrl: '',
          price: 0,
          salesDateTime: '',
        },
      };

      const $ = cheerio.load(html);
      let shopName, name, imageUrl, price, salesDateTime;
      
      let found = $('title').text().match(/：(..*)$/i);
      if(found === null) {
        shopName = 'ショップ名取得エラー';
      } else {
        shopName = found[1];
      }

      name = $('span.item_name').text();
      imageUrl = $('meta[property="og:image"]').attr('content');
      price = parseInt($('span[itemprop="price"]').attr('content'));
      salesDateTime = $('span.time_sale').eq(1).text();

      queue.item.url= url;
      queue.item.shopName = shopName;
      queue.item.name = name;
      queue.item.imageUrl = imageUrl;
      queue.item.price = price;
      queue.item.salesDateTime = salesDateTime;
      
      window.core.queues.pop();
      window.core.queues.push(queue);

      history.push('/item/new');
    }
  };
  const inputRef = useRef();
  useEffect(() => {
    regsiterEvents();
  },
  // 副作用はinputRefに依存する
  [inputRef]
  );

  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
        <webview
          className={classes.webview}
          id="webview"
          src='https://item.rakuten.co.jp/project1-6/4530956584355/'>
          Browser Content
        </webview>
        <div className={classes.cartInButtonRoot}>
          <IconButton color="inherit" className={classes.iconCartIn} onClick={handleClick.bind(this, 'cartIn')}>
            <Icon path={mdiCartPlus}
              size={1.1}
              horizontal
              vertical
              rotate={180}
              color="#222"/>
          </IconButton>
        </div>
      </MuiThemeProvider>
    </div>
  );
}