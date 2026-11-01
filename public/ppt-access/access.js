const form=document.querySelector('form');
form.addEventListener('submit',async event=>{
 event.preventDefault();const button=form.querySelector('button'),error=document.querySelector('#access-error');
 button.disabled=true;error.textContent='';
 try{const response=await fetch(form.action,{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/x-www-form-urlencoded','Accept':'application/json'},body:new URLSearchParams(new FormData(form))});
 if(response.ok){location.reload();return;}
 error.textContent=response.status===429?'Too many attempts. Try again in five minutes.':response.status===401?'That password is incorrect. Please try again.':'Could not open the presentation. Please try again.';
 }catch{error.textContent='Check your connection and try again.';}
 button.disabled=false;
});
