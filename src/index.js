import getLodop from './LodopFuncs'

//绘制票据
const draw = (LODOP, options = {}) => {
  
  const {
    orderTime = '', //订单时间
    money = 0, //支付金额
    receiver = '', //收货人
    phone = '', //联系电话
    siteName = '', // 自提点,
    sitePhone = '', //自提点电话,
    shoppingList = [{}], //自提点
  } = options || {}

  LODOP.PRINT_INIT('打印出货票据')
  LODOP.SET_PRINT_PAGESIZE(3, 760, 150, "");
  LODOP.SET_PRINT_MODE("POS_BASEON_PAPER", true);
  LODOP.SET_PRINT_STYLE("FontSize", 24);
  LODOP.ADD_PRINT_TEXT(10, 0, 580, 40,"省的多");
  LODOP.SET_PRINT_STYLE("FontSize", 12);
  LODOP.ADD_PRINT_TEXT(60, 0, 580, 20,"下单时间：" + orderTime);  
  LODOP.ADD_PRINT_TEXT(80, 0, 580, 20,"支付金额：" + money);  
  LODOP.ADD_PRINT_TEXT(100, 0, 580, 20,"收货人：" + receiver);  
  LODOP.ADD_PRINT_TEXT(120, 0, 580, 20,"电话：" + phone);  
  LODOP.ADD_PRINT_TEXT(140, 0, 580, 20,"自提点：" + siteName);  
  LODOP.ADD_PRINT_TEXT(160, 0, 580, 20,"自提点电话：" + sitePhone);  
  LODOP.ADD_PRINT_LINE(190, 0, 190, 580)
  LODOP.ADD_PRINT_TEXT(200, 60, 580, 20,"----购物清单----");


  for(let [index, item] of shoppingList.entries()) {
    const {
      name = '', //商品名称
      num = 0, //数量
      money = 0 //金额
    } = item
    
    let top = 230 + index * 70
    let top2 = top + 10
    LODOP.ADD_PRINT_LINE(top, 0, top, 580, 2)
    LODOP.ADD_PRINT_TEXT(top2, 0, 350, 70, name);  
    LODOP.ADD_PRINT_TEXT(top2, 160, 80, 70, num);  
    LODOP.ADD_PRINT_TEXT(top2, 190, 150, 70, money);
  }

  let start = 230 + shoppingList.length *  70;
  LODOP.ADD_PRINT_LINE(start, 0, start, 580)
  LODOP.SET_PRINT_STYLE("Italic", 1);
  LODOP.ADD_PRINT_TEXT(start + 20, 89, 580, 20, "省的多");
  LODOP.SET_PRINT_STYLE("Italic", 0);
  LODOP.ADD_PRINT_TEXT(start + 40, 23, 580, 20, "平均价格比市场优惠25%以上");

}
const LodopPrinter = {
  PREVIEW: (options = {}) => {
    console.log('==== preivew ====')
    const LODOP = getLodop()
    draw(LODOP, options)
    LODOP.PREVIEW()
  },
  PRINT_DESIGN(options = {}) {
    console.log('==== print design ====')
    const LODOP = getLodop()
    draw(LODOP, options)
    LODOP.PRINT_DESIGN()
  },
  PRINT: (options = {}) => {
    console.log('==== print ====')
    const LODOP = getLodop()
    draw(LODOP, options)
    LODOP.PRINT()
  }
}

export default LodopPrinter