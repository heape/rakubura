import Rakuten from './bot/websites/rakuten';

(async () => {
  async function system() {
    window.core = {
      api: {
        create: (name, data) => {
          window.core[name].push(data);
        },
        call: (name, inst) => {
          window.core.system.functions[name][inst]();
        }
      },
      system: {
        functions: {
          'orderList': {
            update: null,
          },
          'browserNav': {
            update: null,
          }
        },
      },

      tasks: [
        {
          id: 1,
          item: {
            url: 'https://item.rakuten.co.jp/project1-6/4530956586687/',
            shopName: 'project1-6',
            name: 'PINK NOBITA',
            imageUrl: 'https://shop.r10s.jp/project1-6/cabinet/04377348/05851182/imgrc0072668965.jpg',
            price: 19993,
            salesDateTime: '2020年01月24日00時00分～2020年02月10日23時59分',
          },
          state: 'idle',
        }
      ],
      accounts: [],

      queues: [],
    };
  }

  async function rakuten() {
    let site, result;
    const taskData = {
      accounts: [{
        user: 'bun001@gmail.com',
        password: 'manko123',
      }],
    };

    site = new Rakuten(taskData);
    result = await site.login();
    result = await site.skipReLogin();

    let time = Date.now();
    result = await site.cartIn();
    result = await site.buy();
    console.log((Date.now() - time) + 160, 'ms');
  }
  
  async function init() {
    await system();

    window.rakuten = rakuten;
  }
  await init();
})();