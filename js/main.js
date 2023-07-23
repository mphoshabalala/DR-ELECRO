
/*
 *
 *  DOM SELECTORS
 * 
 */
const body = document.querySelector('#index-body');
const login_first = document.querySelectorAll('#login-first');
const login = document.querySelector('#login');
const sign_up = document.querySelector('#sign-up');
const main_container = document.querySelector('.main-container');
const imagery = document.querySelector('.imagery');
const back_arrow = document.querySelector('#rotate');
const foward_arrow = document.querySelector('#foward');
const icon = document.querySelector('.icon');
const primary_cards = document.querySelectorAll('.primary-card');
const primary_card = document.querySelectorAll('.primary-card');
const available_parts = document.querySelector('#available-parts');
const flick = document.querySelector('#flick');
const cart_button = document.querySelector('#cart-button');
const number_of_items = document.querySelector('.number-of-items');
const menuBar = document.querySelector('#menu');
const paymentButton = document.querySelector('#payment-process');






if(paymentButton){
  paymentButton.addEventListener('click', (e) => {
    let customerID;
    let itemID;
    fetch('http://localhost:5000/detailed/customer_id_and_item_id')
    .then(res => {
      if (!res.ok) {
        throw new Error('Error fetching data');
      }  
      return res.json();
      })
      .then(data => {
        customerID = data.customer_id;
        itemID = data.item_id;
        console.log(customerID, itemID);
  
        return fetch('http://localhost:5000/purchaseItem', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ customerID, itemID }),
        });
      });
  });
}


/*
 *
 *  LOGIN 
 *  LOGIN ELEMENTS
 */


//login container header
const h2 = document.createElement('h2');
h2.innerHTML = `Login`;
//login container icon
const img = document.createElement('img');
img.src = 'images/user.png';
img.classList = 'icon';
//gmail text field

let gmail = createInputElement('gmail','input', 'Gmail...', 'customer_gmail', 'email');
//password text field
let password = createInputElement('password','input', 'Password...', 'customer_password', 'password');
//form submit button
const login_btn = createButtonElement('login_btn', 'submit', 'login');
// const login_btn = document.createElement('button');
login_btn.className = `btn-primary`;
//create acc and forgot credentials

const acc_container = document.createElement('div');
acc_container.classList.add('forgot-details');
const acc_ul = document.createElement('ul');
const acc_li1 = document.createElement('li');
const acc_li2 = document.createElement('li');
const create_account = document.createElement('a');
create_account.href = '/main-create-account';
create_account.classList.add('acc_auth');
create_account.innerText = 'Create account';
const forgot_credentials = document.createElement('a');
forgot_credentials.classList.add('acc_auth');
forgot_credentials.innerText = 'Forgot credentials?';
acc_li1.appendChild(create_account);
acc_li2.appendChild(forgot_credentials);
acc_ul.append(acc_li1, acc_li2);
acc_container.appendChild(acc_ul);
//exterior login container
let login_form  = createFormElement('login_form', '/login_auth', 'post'); //form for submission
login_form.classList.add('div-login');
//append all the contaier element to the main login container
//background dimmer
const dim = document.createElement('div');
dim.classList.add('dim');
//error message
const errorMessage = document.createElement('p');
const cancel = document.createElement('a');
const cancel_img = document.createElement('img');
cancel_img.src = '/images/cancel.png';
cancel_img.classList.add('icon');
cancel.appendChild(cancel_img);
cancel.classList.add('cancel-a');
errorMessage.innerText = getError();
// errorMessage.textContent = '<%= errorMessage %>'
//listen to a login link click on the exterior
if(login){
  login.addEventListener('click', (e) => {
  login_form.append(cancel, h2, img, gmail, password, login_btn, acc_container);
    e.preventDefault();
  if (login_form.style.display === 'flex') {
    
    login_form.classList.remove('fade-in');
    login_form.classList.add('fade-out');

  } else {
    login_form.style.display = 'flex';
    dim.style.display = 'flex';
    // cancel.style.display = 'flex';

    login_form.classList.remove('fade-out');
    login_form.classList.add('fade-in');

    main_container.append(dim, login_form);
  }


  });
}

if(menuBar){
  const menuDiv = document.createElement('div');
  menuDiv.classList.add('menu-div');
  const cross = document.createElement('a');
  const crossImg = document.createElement('img');
  cross.classList.add('cancelMenu');
  crossImg.src ='/images/cross.png';
  cross.appendChild(crossImg);

  const loginLink = document.createElement('a');
  loginLink.href = '/main-login';
  loginLink.innerText = 'Login';
  const signupLink = document.createElement('a');
  signupLink.href = '/sign-in';
  signupLink.innerText = 'Sign up';
  menuDiv.append(cross, loginLink, signupLink);
  menuBar.addEventListener('click', (e) => {
    if(menuDiv.style.display === 'flex'){
      menuDiv.style.display = 'none';
    } else {
      menuDiv.style.display = 'flex';
    }
    body.append( menuDiv);
  })
}

if(login_first){
  login_first.forEach(log_first => {
    log_first.addEventListener('click', (e) => {
      login_form.append(cancel, h2, img, gmail, password, login_btn, acc_container);
        e.preventDefault();
      if (login_form.style.display === 'flex') {
        
        login_form.classList.remove('fade-in');
        login_form.classList.add('fade-out');
    
      } else {
        login_form.style.display = 'flex';
        dim.style.display = 'flex';
        // cancel.style.display = 'flex';
    
        login_form.classList.remove('fade-out');
        login_form.classList.add('fade-in');
    
        main_container.append(dim, login_form);
      }
      });
  });
 
}


/*
 *
 *  SIGNUP 
 *  CREATE SIGNUP ELEMENTS TO BE ADDED TO THE SIGNUP PAGE
 */
//sign up header
const h2_signup = document.createElement('h2');
h2_signup.innerHTML = `Register`;
//sigup name
const signup_name = createInputElement('signup_name', 'input', 'Name...', 'customer_name', 'text');
//signup password
const sign_password = createInputElement('password', 'input', 'Password...', 'customer_password', 'password');
//confirm
const confirm_password = createInputElement('confirm_password', 'input', 'Confirm password...', 'customer_confirm_password', 'password');
//gmail
const sign_up_gmail = createInputElement('sign_up_gmail', 'input', 'Gmail...', 'customer_gmail', 'gmail');
//signup form
const sign_up_form = createFormElement('sign_up_form', '/signup', 'POST');
sign_up_form.classList.add('form-signUp');
const sign_dim = document.createElement('div');
sign_dim.classList.add('dim');
//sign-in button
const sign_up_btn = createButtonElement('sign_up_btn', 'submit', 'Sign Up');
sign_up_btn.className = `btn-primary`;
//cancel 
const cancel_signup = document.createElement('a');
const cancel_img_signup = document.createElement('img');
cancel_img_signup.src = '/images/cancel.png';
cancel_img_signup.classList.add('icon');
cancel_signup.appendChild(cancel_img_signup);
cancel_signup.classList.add('cancel-a');


  //LISTEN TO A CLICK ON THE SIGNUP PAGE
  if(sign_up){
    sign_up.addEventListener('click', (e) => {
      sign_up_form.append(cancel_signup, h2_signup, img, signup_name, sign_password, confirm_password,  sign_up_gmail, sign_up_btn);
      e.preventDefault();
      if (sign_up_form.style.display === 'flex') {
        sign_up_form.classList.remove('fade-in');
        sign_up_form.classList.add('fade-out');
      } else {
        sign_up_form.style.display = 'flex';
        sign_dim.style.display = 'flex';
        sign_up_form.classList.remove('fade-out');
        sign_up_form.classList.add('fade-in');
        main_container.append(sign_dim, sign_up_form);
      }
    });
  }


if(cart_button){
  cart_button.addEventListener('click', () => {
    let customerID;
    let itemID;
    fetch('http://localhost:5000/detailed/customer_id_and_item_id')
    .then(res => {
      if (!res.ok) {
        throw new Error('Error fetching data');
      }  
      return res.json();
      })
      .then(data => {
        customerID = data.customer_id;
        itemID = data.item_id;
        console.log(customerID, itemID);
  
        return fetch('http://localhost:5000/detailed/customer_id_and_item_id/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ customerID, itemID }),
        });
      });

      
      // .then((res) => {
      //   if(!res.ok){
      //     throw new Error('Error submitting data');
      //   }
      //   return fetch('http://localhost:5000/detailed/cart/id')
      // })
      // .then(res => {
      //       if (!res.ok) {
      //         throw new Error('Error fetching data');
      //       }
      //       return res.json();
      //     })
      //     .then(data => {
      //       number_of_items.innerText = data;
      //       console.log(data);
      //     }).catch(err => {
      //       console.error(err);
      //     })
        
      

    
    

  });
}

function  fetch_Session_Customer_id(){

}

function post_session_customer_id_and_item_id(customerID, itemID){
 
    
}



//ARROWS FOR CHANGING IMAGES IN THE HOME PAGE
//listen to a click on hero image icons
let i = 1;

//backwards arrow in the hme page
if(back_arrow){
  back_arrow.style.display = 'none';
  back_arrow.addEventListener('click', () => {
    i--;
    imagery.style.background = `url('images/software-sol-${i}.png') center/cover no-repeat`;
    foward_arrow.style.display = 'block';
    if( i < 2){
      back_arrow.style.display = 'none';
    }
  });
}

//foward arrow in the home page
if(foward_arrow){
  foward_arrow.addEventListener('click', () => {

    if( i >= 2){
      foward_arrow.style.display = 'none';
    }
    i++;
    imagery.style.background = `url('images/software-sol-${i}.png') center/cover no-repeat`;
    back_arrow.style.display = 'block';
  });
}


//INTERVALS
//set interval to randomly change the hero image
if(imagery){
  setInterval(() => {
    let i = Math.floor(Math.random() * 4);
    if(i === 0) i++;
    imagery.style.background = `url('images/software-sol-${i}.png') center/cover no-repeat`;
  }, 5000);
}



//set interval to flick the '_' underscore sign in the home page
if(flick){
  setInterval(() => {
    if(flick.style.display === 'none'){
      flick.style.display = 'flex';
      return;
    }
    flick.style.display = 'none';
  },500);
}

if(cancel){
  cancel.addEventListener('click', e => {
      login_form.style.display = 'none';
      dim.style.display = 'none';
  });
}

if(cancel_signup){
  cancel_signup.addEventListener('click', e => {
    sign_up_form.style.display = 'none';
    sign_dim.style.display = 'none';
});
}





//listen to a click on the screen
// document.addEventListener('click', (e) => {
//   if(e.target !== login && !login_form.contains(e.target)){
//     login_form.style.display = 'none';
//     dim.style.display = 'none';
//   } else if(e.target !== sign_up && !sign_up_form.contains(e.target)){
//     sign_up_form.style.display = 'none';
//     sign_dim.style.display = 'none';
//     sign_up_cancel_block.style.display = 'none';
//   }
// });

//utilities
function createInputElement(element, elementType, placeholder, name, type){
  element = document.createElement(elementType);
  element.placeholder = placeholder;
  element.name = name;
  element.type = type;
  element.setAttribute('required', 'required');
  return element;
}

function createButtonElement(buttonName, buttonType, buttonInnerText){
    buttonName = document.createElement('button');
    buttonName.type = buttonType;
    buttonName.innerText = buttonInnerText;
    return buttonName;
}

function createFormElement(formName, action, method){
  formName = document.createElement('form');
  formName.action = action;
  formName.method = method;
  return formName;
}

//retrieve data from my api (endpoint: /login)
function getError(){
  fetch('http://localhost:5000/details')
  .then(response => {return response.json()})
  .then(data => {return data});
}


