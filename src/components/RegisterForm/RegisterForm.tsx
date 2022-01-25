import { useState } from 'react';
import './RegisterForm.css';
import data from '../../data/data.json';

const MAILCHIMP_URL = import.meta.env.PUBLIC_MAILCHIMP_URL;
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const RegisterForm = () => {

  const [status, setStatus] = useState('init');
  const [message, setMessage] = useState('..');
  const [classMessage, setClassMessage] = useState('feedback-message');

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setStatus('loading');
    const target = event.target as typeof event.target & {
      email: { value: string };
    };
    const email = target.email.value;
    if (!EMAIL_REGEX.test(email)) {
      setStatus('error');
      setMessage(data.RegisterForm.emailInvalid);
      setClassMessage(state => `${state} show`);
      return;
    }
    try {
      await fetch(`${MAILCHIMP_URL}&EMAIL=${email}`, {
        method: 'POST',
        headers:{'content-type': 'application/json; charset=utf-8'},
        mode: 'no-cors',
      });
      setStatus('success');
      setMessage(data.RegisterForm.emailSuccess);
      setClassMessage(state => `${state} show`);
    } catch (error) {
      setStatus('error');
      setMessage(data.RegisterForm.emailError);
      setClassMessage(state => `${state} show`);
    }
  }

  return (
    <div className='RegisterForm'>
      <form onSubmit={handleSubmit} noValidate>
        <input name='email' type="email" placeholder={data.RegisterForm.emailPlaceholder} />
        <button type='submit' disabled={status === 'loading'}>
          {status !== 'loading' && <span>{data.RegisterForm.button}</span>}
          {status === 'loading' && <span>...</span>}
        </button>
      </form>
      <p className={classMessage}>{message}</p>
    </div>
  );
};


export default RegisterForm;
