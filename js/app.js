"use strict";

  //After DOM Loaded

    //On initial load to check connectivity

  const  initializer = () => {


    let toastContainer = document.querySelector('.toast__container');
 
    //To show notification
    const toast = (msg) =>{
      if (!msg) return;
  
      let toastMsg = document.createElement('div');
      
      toastMsg.className = 'toast__msg';
      toastMsg.textContent = msg;
  
      toastContainer.appendChild(toastMsg);
  
      //Show toast for 3secs and hide it
      setTimeout( () => {
        toastMsg.classList.add('toast__msg--hide');
      }, 3000);
  
      //Remove the element after hiding
      toastMsg.addEventListener('transitionend', (event) => {
        event.target.parentNode.removeChild(event.target);
      });
    }
       //To update network status
   const updateNetworkStatus = () =>{
    if (navigator.onLine) {
    /*   nav.classList.remove('.offline_mode');
      footer.classList.remove('.offline_mode'); */
    }
    else {
      toast('You are now offline..');
     /*  nav.classList.add('.offline_mode');
      footer.classList.add('.offline_mode'); */
    }
  }

    
    if (!navigator.onLine) {
      updateNetworkStatus();
    } 

    fetch("https://free.currencyconverterapi.com/api/v5/currencies")
    .then(response => response.json())
    .then(data => {
  
      for(let currency of Object.values(data.results)){
      
        let option = document.createElement('option');
        option.value = `${currency.id}`;
        option.text = `${currency.currencyName}`;

        let option2 = document.createElement('option');
        option2.value = `${currency.id}`;
        option2.text = `${currency.currencyName}`;
        
        document.getElementById("mySelect").appendChild(option);
      document.getElementById("mySelect2").appendChild(option2);
       
      }
  }).catch((err) => {
    console.log(err)
  });


    window.addEventListener('online', updateNetworkStatus, false);
    window.addEventListener('offline', updateNetworkStatus, false);
  



  

}

         
          



// document.querySelector(".btn-extend").addEventListener("click", 
const converter = () => {


   
            let from = document.getElementById('mySelect').value;
            let to = document.getElementById('mySelect2').value;
            let query = from + "_" + to;
            //let query2 = to + "_" + from;
            let url = 'https://free.currencyconverterapi.com/api/v5/convert?q=' + query + '&compact=y'
            //check if inputed amount is a number
            //let amount = document.querySelector('.amount').value;


            const dbPromise = ()  => idb.open('currencies', 1, (upgradeDB) => {
              switch (upgradeDB.oldVersion){
                case 0:
                upgradeDB.createObjectStore('rates', {keyPath: 'id'});
               
              } 
            }, false); 

// if(amount%1==0){
  if(navigator.onLine){
    fetch(url)
    .then((response) => {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          
        }
  
        // Examine the text in the response
        response.json().then((data) => {
      

          console.log(query)
          dbPromise().then(db => {
            const tx = db.transaction('rates', 'readwrite');
            tx.objectStore('rates').put({
              id: `${query}` ,
              data:`${data[query].val}` 
            });
            return tx.complete;
          });
  
          //console.log(data);
          let rate = data[query].val;
          console.log(rate);
          let amount = document.querySelector('.amount').value;
          let result = (amount * rate);
  
          document.getElementById('result').value = result.toFixed(2);
          
  
        
        });
    }).catch((err)=>{
    
      console.log(err);

    }); 



   } else {
   console.log("didnt create indexedDB")

   /*      dbPromise().then(db => {
           if(!db) return;
           let tx = db.transaction("currencies", 'readonly');
           let store = tx.objectStore('rates')
           store.getAll().then(dbRate => {
               if(dbRate.lengh === 0) return;
               dbRate.forEach(retrivedRate =>{
                   if(retrivedRate.id === `${query}`){
                       console.log(`${retrivedRate.id}`)
                   }
               });
           })
       });  */

      
   }      

/* }else{
  document.getElementById('result').value = "Please enter a Number";
} */
     
          
         
          
          
      


        


};


