import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
  } from "@material-tailwind/react";
  import hieu from "/src/assets/img/hieucho.png";
  import { TiStar } from "react-icons/ti";
const FeedbackCard = () => {
  return (
    <div>
        <div className="flex justify-center mt-10 hover:-translate-y-4 transition-all duration-300">
            <Card className="max-w overflow-hidden shadow-3xl">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 rounded-none"
              >
                <img
                  src={hieu}
                  alt="ui/ux review check"
                />
              </CardHeader>
              <CardBody className="m-4">
                <div className="flex justify-between items-center">
                  <div>
                    <Typography
                      variant="h5"
                      className="text-primary font-semibold"
                    >
                      Anh Trương Minh Hiếu
                    </Typography>
                    <Typography
                      variant="h6"
                      className="text-primary font-semibold"
                    >
                      Khách hàng Hà Nội
                    </Typography>
                  </div>
                  <div className="flex items-center">
                    <TiStar />
                    <TiStar />
                    <TiStar />
                    <TiStar />
                    <TiStar />
                  </div>
                </div>

                <Typography
                  variant="h6"
                  color="gray"
                  className="mt-4 font-normal"
                >
                  Anh kinh doanh và hay mua bán online lắm. Từ ngày dịch dã đến
                  lại càng phải dùng tới dịch vụ của Magic Post nhiều hơn. Cảm
                  ơn các đồng chí Magic Post rất nhiều, anh thấy hài lòng về
                  dịch vụ bên mình.
                </Typography>
              </CardBody>
              <CardFooter className="flex items-center justify-end m-4">
                <Typography className="font-semibold">January 10</Typography>
              </CardFooter>
            </Card>
          </div>
    </div>
  )
}

export default FeedbackCard