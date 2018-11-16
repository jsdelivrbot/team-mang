(function(){
    var signinForm = document.getElementById('LogIn');
    console.log("aa");
       signinForm.addEventListener('click',function(event){
          //event.preventDefault();
      console.log("ew");
           var nameArea = document.getElementById('user');
       var passwordArea = document.getElementById('pass');
              axios.post('http://localhost:3000/api/signIn', {user: nameArea.value, pass : passwordArea.value})
                  .then(function(res) {
            if(res.data === true){
              alert("Sucessfully Login");  
            }
            else
              alert("Invlid ID or Pin");
            
            global.ID = nameArea.value;
                console.log(res.data);
            })
            .catch(function(err) {
                  //user = [];
            });
    }); 	
  
  })();