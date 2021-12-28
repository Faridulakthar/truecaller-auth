import { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';

export default function Home() {
  const [hasTruecaller, setHasTruecaller] = useState(undefined);
  const [requestId] = useState(randomInt());
  const [userData, setUserData] = useState({});

  const url = `truecallersdk://truesdk/web_verify?requestNonce=${requestId}&partnerKey=mcfZSc5418a92840940c288d249d0fe915435&partnerName=Truecaller-auth&lang=en&title=Fieldproxy`;

  function randomInt() {
    const max = 999999;
    const min = 0;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const signUp = () => {
    window.location = url;

    setTimeout(function () {
      if (document.hasFocus()) {
        setHasTruecaller(false);
        setTimeout(() => {
          checkFile();
        }, 3000);
      } else {
        setHasTruecaller(true);
      }
    }, 600);
  };

  const checkFile = () => {
    if (hasTruecaller) {
      const users = require('../data/users.json');
      alert(JSON.stringify(users));
      const currentUser = users.filter(
        (x) => x.requestId.toString() === requestId.toString()
      );
      alert(currentUser.length ? 'USER FOUND' : 'NOT FOUND');
      if (currentUser.length) {
        getUserData(currentUser.accessToken, currentUser.endpoint);
      }

      // const res = usersRepo.getById(requestId);
      // if (!res) {
      //   return;
      // }
      // getUserData(res.accessToken, res.endpoint);
    }
  };

  const checkDetails = async () => {
    const res = await fetch('/api/checkUser', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*',
      },
      body: JSON.stringify({
        requestId,
      }),
    });
    const data = await res.json();
    console.log(data, 'data');
    alert(JSON.stringify(data));
    if (data?.url) {
      getUserData(data.url, data.token);
    }
  };

  const getUserData = async (url, token) => {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*',
      },
    });
    const data = await res.json();
    setUserData(data);
  };

  // Truecaller
  const callApi = async () => {
    const res = await fetch(`http://192.168.0.103:3000/api/callback`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*',
      },
      body: JSON.stringify({
        requestId: requestId,
        accessToken: 'a1asX--8_yw-OF--E6Gj_DPyKelJIGUUeYB9U9MJhyeu4hOCbrl',
        endpoint: 'https://profile4-noneu.truecaller.com/v1/default',
      }),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <Wrapper>
      <Container>
        <Title>Fieldproxy Task</Title>
        <SubTitle>To get started send a verify request.</SubTitle>
        <Button onClick={() => signUp()}>Send Verification</Button>
        {/* <Button onClick={() => callApi()}>API call</Button> */}
      </Container>
      <Container>
        {hasTruecaller ? (
          <>
            <p>
              {userData?.requestId
                ? JSON.stringify(userData)
                : 'Getting Data...'}
            </p>
            <Button onClick={() => checkFile()}>Check file</Button>
            <Button onClick={() => checkDetails()}>Check your details</Button>
          </>
        ) : null}
      </Container>
    </Wrapper>
  );
}

const Wrapper = tw.div`
  flex flex-col items-center bg-gray-200 h-screen p-4 
`;

const Container = tw.div`
  flex flex-col text-center
`;

const Title = tw.div`
  text-5xl text-black-300 pt-10 mb-10
`;

const SubTitle = tw.div`
  mb-5
`;

const Button = tw.button`
  bg-blue-500 rounded-xl py-5 text-white cursor-pointer active:bg-blue-600 mb-5
`;
