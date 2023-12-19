import { Carousel } from 'flowbite-react';
// import FeedbackCard from '../searchcards/FeedbackCard';
export default function Feedback() {
  return (
    <div className="h-[500px]">
    <Carousel>
      <img className='' src="/src/assets/img/hieucho.png" alt="..." />
      <img src="/src/assets/img/landpage.png" alt="..." />
      <img src="/src/assets/img/highrate.png" alt="..." />
    </Carousel>
  </div>
  );
}
