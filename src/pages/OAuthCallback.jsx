import { useEffect } from 'react'
import reactLogo from '../assets/react.svg'
import './GuestHome.css'
import { LS_OAUTH_DATA } from '../const';
import { useNavigate } from 'react-router';

function OAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const oauthData = window.location.hash.slice(1);
    if (oauthData) {
      window.localStorage.setItem(LS_OAUTH_DATA, oauthData);
      console.log(LS_OAUTH_DATA, oauthData);
      navigate("/app");
    }
  }, []);

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="card">
        <p>
          Signing in...
        </p>
      </div>
      <p className="read-the-docs">
        Created for learning purpose
      </p>
    </>
  )
}

export default OAuthCallback;
