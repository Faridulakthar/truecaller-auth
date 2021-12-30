import { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import axios from 'axios';

export default function Home() {
  const [hasTruecaller, setHasTruecaller] = useState(undefined);
  const [requestId] = useState(randomInt());
  const [userData, setUserData] = useState({});

  const url = `truecallersdk://truesdk/web_verify?requestNonce=${requestId}&partnerKey=mcfZSc5418a92840940c288d249d0fe915435&partnerName=Truecaller-auth&lang=en&title=Fieldproxy`;

  function randomInt() {
    const max = 111111111111;
    const min = 11111111;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const signUp = () => {
    window.location = url;

    setTimeout(function () {
      if (document.hasFocus()) {
        setHasTruecaller(false);
      } else {
        setHasTruecaller(true);
      }
    }, 600);
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
    setUserData(data);
  };

  return (
    <Wrapper>
      <Container>
        <Title>Fieldproxy Task</Title>
        <SubTitle>To get started send a verify request.</SubTitle>
        <Button onClick={() => signUp()}>Send Verification</Button>
      </Container>
      <Container>
        <br />
        {hasTruecaller ? (
          <>
            {userData?.id ? null : (
              <Button onClick={() => checkDetails()}>Check your details</Button>
            )}
            <br />
            {userData?.id ? (
              <table>
                <tr>
                  <th>Item</th>
                  <th>Value</th>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>{userData.name.first + userData.name.last}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{userData.onlineIdentities.email}</td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td>{userData.phoneNumbers[0]}</td>
                </tr>
              </table>
            ) : null}
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
