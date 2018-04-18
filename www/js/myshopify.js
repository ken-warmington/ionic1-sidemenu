/* Shopify script to add shopifyProductId */

// echo function while we are developing
function echoProductId(shopifyProductId) {
  if (shopifyProductId) {
	console.log('index.html echoProductId(), shopifyProductId=',shopifyProductId);	  
  }		
  else {
	console.log('index.html echoProductId(), NO_shopifyProductId');	  
  }	  
}  

// load MyShopify script
function loadMyShopify(shopifyProductId, shopifyDomain, shopifyApiKey, appId, discountCode, currencyCode, note) {
  console.log('index.html loadMyShopify() shopifyProductId=',shopifyProductId);	
  console.log('index.html loadMyShopify() shopifyDomain=',shopifyDomain);	
  console.log('index.html loadMyShopify() shopifyApiKey=',shopifyApiKey);	
  console.log('index.html loadMyShopify() appId=',appId);	
  console.log('index.html loadMyShopify() discountCode=',discountCode);	
  console.log('index.html loadMyShopify() currencyCode=',currencyCode);	
  
  var scriptURL = '/assets/js/buy-button-storefront.min.js';
  if (window.ShopifyBuy) {
    if (window.ShopifyBuy.UI) {
      ShopifyBuyInit();
    } else {
      loadScript();
    }
  } else {
    loadScript();
  }

  function loadScript() {
    var script = document.createElement('script');
    script.async = true;
    script.src = scriptURL;
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
    script.onload = ShopifyBuyInit;
  }

  function ShopifyBuyInit() {
	// console.log('index.html ShopifyBuyInit() start note='+note);
	  
    var client = ShopifyBuy.buildClient({
      domain: shopifyDomain,
      apiKey: shopifyApiKey,
      appId: appId,
	  discount: discountCode,
	  currency: currencyCode,
	  note: note
    });
    
 // pass shopifyProductId and create product component in ShopifyBuy
    ShopifyBuy.UI.onReady(client).then(function (ui) {
      ui.createComponent('product', {
        id: [shopifyProductId],
        node: document.getElementById('product-component-ad3dc269427'),
        moneyFormat: currencyCode+' %7B%7Bamount%7D%7D',
        options: {
  "product": {
    "variantId": "all",
    "width": "240px",
    "contents": {
      "img": false,
      "imgWithCarousel": false,
      "title": false,
      "variantTitle": false,
      "price": false,
      "description": false,
      "buttonWithQuantity": false,
      "quantity": false
    },
    "styles": {
      "product": {
        "text-align": "left",
        "@media (min-width: 601px)": {
          "max-width": "100%",
          "margin-left": "0",
          "margin-bottom": "50px"
        }
      },
      "compareAt": {
        "font-size": "12px"
      }
    }
  },
  "cart": {
    "contents": {
      "button": true
    },
    "styles": {
      "footer": {
        "background-color": "#ffffff"
      }
    }
  },
  "modalProduct": {
    "contents": {
      "img": false,
      "imgWithCarousel": true,
      "variantTitle": false,
      "buttonWithQuantity": true,
      "button": false,
      "quantity": false
    },
    "styles": {
      "product": {
        "@media (min-width: 601px)": {
          "max-width": "100%",
          "margin-left": "0px",
          "margin-bottom": "0px"
        }
      }
    }
  },
  "productSet": {
    "styles": {
      "products": {
        "@media (min-width: 601px)": {
          "margin-left": "-20px"
        }
      }
    }
  }
}
      });
    });
  }
}
