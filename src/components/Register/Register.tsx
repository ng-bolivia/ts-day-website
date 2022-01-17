import { useState } from 'react';
import './Register.css';

const MAILCHIMP_URL = import.meta.env.MAILCHIMP_URL;

const Register = () => {

  const [status, setStatus] = useState('init');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('loading');
    const { email } = event.target;
    try {
      await fetch(`${MAILCHIMP_URL}&EMAIL=${email.value}`, {
        method: 'POST',
        headers:{'content-type': 'application/json; charset=utf-8'},
        mode: 'no-cors',
      });
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  }

  return (
    <>
      <form className="register" onSubmit={handleSubmit}>
        {status}
        <input name='email' type="email" placeholder="Tu correo" />
        <button type='submit'>
          Registraté
        </button>
      </form>
    </>
  );
};


export default Register;
