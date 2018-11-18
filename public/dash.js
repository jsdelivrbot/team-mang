(function(){
        var history =[];
	var historyTable = document.getElementById('balance');
        
        axios.get('http://localhost:3000/api/dash')
   	  .then(function(res){
                //alert(res.data);
                // console.log(res.data);
                var self = this;
                history = res.data;
                renderHistory(history);
        })
        .catch(function(err) {
        	
        });

        function renderHistory(history) {
                // console.log(history);
                historyTable.innerHTML = '';
                //var headers = ['ID', 'Title', 'Description'];
                //var thead = document.createElement('tr');
                var headers = ['Transaction ID', 'Transaction Type', 'Date', 'Recipient', 'Amount', 'Mosaic'];
                var thead = document.createElement('tr');
                        headers.forEach(function(header) {
                        var td = document.createElement('th',scope="col");
                        td.textContent = header;
                thead.append(td);
                });

                historyTable.append(thead);
                history.forEach(function(histo){
                var tr = document.createElement('tr');
                var tdID = document.createElement('td');
                var tdType = document.createElement('td');
                var tdDate = document.createElement('td');
                var tdRecipient = document.createElement('td');
                var tdAmount = document.createElement('td');
                var tdMosaic = document.createElement('td');

                tdID.textContent = histo.transID;
                tdType.textContent = histo.type;
                tdDate.textContent = histo.date;
                tdRecipient.textContent = histo.recipient;
                tdAmount.textContent = histo.amount;
                tdMosaic.textContent = histo.mosaic;

                tr.append(tdID);
                tr.append(tdType);
                tr.append(tdDate);
                tr.append(tdRecipient);
                tr.append(tdAmount);
                tr.append(tdMosaic);
                historyTable.append(tr);
                });
        }

})();