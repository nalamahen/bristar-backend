module.exports = (name, message) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
          <html xmlns="http://www.w3.org/1999/xhtml">
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title>Bristar Online Liquor Store</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <style>        
          </style>
          </head>
          <body style="margin: 0; padding: 0;">
          <div style="border: 1px solid #cccccc; width:600px; margin: 0 auto; padding-bottom: 50px">
          <div style="padding:10px 10px; box-sizing: border-box; height: 50px; margin: 0 auto; background-color:#a23f25; color:#ffffff; text-align:center"> Customer query to Bristar Liquor Store</div>
          <div style="width:520px; margin: 0 auto;"><p>Name: ${name},</p>
        <p><b>Query: </b><br/>${message}</p>                
          </div>       
          </div>
          </body>
          </html>
    `;
};
