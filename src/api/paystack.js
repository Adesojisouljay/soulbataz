export const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  export const initializePaystack = (amount) => {
    return new Promise((resolve, reject) => {
      loadScript(process.env.REACT_APP_PAYSTACK_URL)
        .then(() => {
          const publicKey = process.env.REACT_APP_PAYSTACK_PUB_KEY;
  
          const handler = window.PaystackPop.setup({
            key: publicKey,
            email: 'adeomokolade@gmail.com',
            amount: amount * 100,
            currency: 'NGN',
            ref: `${Math.floor(Math.random() * 1000000000)}`,
            callback: (response) => {
              console.log('Payment successful', response);
              resolve(response);
            },
            onClose: () => {
              console.log('Payment modal closed');
              reject('Payment canceled or closed');
            }
          });
  
          handler.openIframe();
        })
        .catch((error) => {
          console.error('Error loading Paystack script:', error);
          reject('Error loading Paystack script');
        });
    });
  };
  