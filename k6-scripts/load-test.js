import http from 'k6/http';
import { check, sleep } from 'k6';

const LOCAL_SERVER = 'http://localhost:3000';

export const options = {
  vus: 10,
  // represents total of virtual users that concurently access the endpoint
  duration: '30s',
  // test duration
};
// gracefulStop: 30s by default
// k6 will wait for 30 seconds for all virtual users to finish their iterations before stopping

export default function () {
  // GET all books
  const getAllBooks = http.get(`${LOCAL_SERVER}/books`);
  //fetch the local endpoint

  check(getAllBooks, {
    'Get all books with response code 200': res => res.status === 200,
  });
  sleep(1);

  // Sun 14/07/24:
  // checks: 100%,
  // http_req_connecting: avg=14.82µs min=0s    med=0s     max=795µs  p(90)=0s     p(95)=0s
  // vus............................: 10
  // iterations : 300

  // POST Book
  const bookFormData = {
    title: 'Book A',
    author: 'Author A',
  };

  const postData = http.post(
    `${LOCAL_SERVER}/books`,
    JSON.stringify(bookFormData),
    { headers: { 'Content-Type': 'application/json' } }
  );

  check(postData, {
    'Post book with response code 201': res => res.status === 201,
  });

  // Sun 14/07/24:
  // checks: 100%,
  // http_req_connecting: avg=139ns   min=0s       med=0s      max=765µs   p(90)=0s      p(95)=0s
  // vus............................: 10
  // iterations : 15364
}
