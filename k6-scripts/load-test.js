import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  // represents total of virtual users that concurently access the endpoint
  duration: '30s',
  // test duration
};
// gracefulStop: 30s by default
// k6 will wait for 30 seconds for all virtual users to finish their iterations before stopping

export default function () {
  let getAllBooks = http.get('http://localhost:3000/books');
  //fetch the local endpoint

  check(getAllBooks, {
    'Get all books with response code 200': res => res.status === 200,
  });
  sleep(1);

  // Sun 14/07/24:
  // checks: 100%,
  // http_req_connecting: avg=14.82µs min=0s    med=0s     max=795µs  p(90)=0s     p(95)=0s
  // vus............................: 10
  // iteorations : 300
}
