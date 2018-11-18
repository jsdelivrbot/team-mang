(function(){
        // var balance = document.getElementById('balance');
        // axios.post('http://localhost:3000/api/dash', { recipient: recipient.value })
        //          .then(function(res){
        //     //alert(res.data);
        //     balance.textContent = res.data.recipient;
        //   })
        //   .catch(function(err) {
        //                     //user = [];
        //   });
        
        var balance = document.getElementById('balance');
        var recipient = '';
        axios.post('http://localhost:3000/api/dash', { recipient: recipient.value })
                 .then(function(res){
            //alert(res.data);
            balance.textContent = res.data.recipient;
          })
          .catch(function(err) {
                            //user = [];
          });
    
  })();