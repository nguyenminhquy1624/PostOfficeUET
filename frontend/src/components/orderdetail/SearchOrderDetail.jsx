import { Button, Timeline } from "flowbite-react";
import { useState } from "react";
import { CardSearch } from "../searchcards/CardSearch";

const SearchOrderDetail = () => {
  const [isBack, setIsBack] = useState(false);
  const goBack = () => {
    setIsBack(true);
  };

  const status = [
    {
      timeline: "20/12/2023",
      statusOrder: "Đã nhận đơn hàng và bàn giao cho nhân viên giao hàng.",
    },

    {
      timeline: "21/12/2023",
      statusOrder: "Đơn hàng đã đến điểm tập kết.",
    },

    {
      timeline: "22/12/2023",
      statusOrder: "Đơn hàng đã được giao cho nhân viên giao hàng.",
    },

    {
      timeline: "23/12/2023",
      statusOrder: "Đơn hàng đã chuyển đến điểm giao dịch.",
    },

    {
      timeline: "24/12/2023",
      statusOrder: "Đơn hàng đã giao thành công.",
    },
  ];
  return (
    <div>
      {isBack ? (
        <CardSearch />
      ) : (
        <div className="p-10">
          <div>
            <Timeline >
            {status.map((stt, index) => (
                <Timeline.Item key={index} > 
                  <Timeline.Point/>
                  <Timeline.Content>
                    <Timeline.Time>{stt.timeline}</Timeline.Time>
                    <Timeline.Body>{stt.statusOrder}</Timeline.Body>
                  </Timeline.Content>
                </Timeline.Item>
            ))}
            </Timeline>
          </div>

          <div>
            <Button onClick={goBack}>Trở lại</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchOrderDetail;
