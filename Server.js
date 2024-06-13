const { resolve } = require('path');
let unirest = require('unirest');
let key = 'GXVXdmAolMQOW6oIEl8kSG2gkI4n3kA10V0kGe0K1SARlUxG';
let secret = 'mFbhEAJiDwiDZfqUABjBTEfDgIkZWNch89SLJCcAfVfyAsGEigjJA8el2A7c7Ee7';
let string = `${key}:${secret}`
let encoded = btoa(string);
let token = '';
let s = ''

let getToken=()=>{

    return new Promise((resolve,reject)=>{
        unirest('GET', 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials')
        .headers({ 'Authorization': `Basic ${encoded}` })
        .send()
        .end(res => {
            if (res.error) throw new Error(res.error);
            console.log(res.raw_body);
            
            resolve(res.raw_body)
        })

        
    })

    
}


getToken().then(res=> {
    console.log(JSON.parse(res).access_token)
    token = JSON.parse(res).access_token

        let req = unirest('POST', 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest')
            .headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
            .send(JSON.stringify({
                "BusinessShortCode": 174379,
                "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjQwNjEzMTExNDA1",
                "Timestamp": "20240613111405",
                "TransactionType": "CustomerPayBillOnline",
                "Amount": 1,
                "PartyA": 254701759744,
                "PartyB": 174379,
                "PhoneNumber": 254701759744,
                "CallBackURL": "https://mydomain.com/path",
                "AccountReference": "CompanyXLTD",
                "TransactionDesc": "Payment of X" 
            }))
            .end(res => {
                if (res.error) throw new Error(res.error);
                console.log(res.raw_body);
            });


});
