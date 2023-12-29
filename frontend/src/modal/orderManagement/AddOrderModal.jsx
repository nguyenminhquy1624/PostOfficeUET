import { PropTypes } from "prop-types";
// import map_img from "../assets/img/tmp_map.png"
import close_img from "../../assets/img/close.png";
import { useRef, useState, useEffect} from "react";
// import uuid from 'uuid'
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';

const AddOrderModal = (props) => {
  const addOrder = props.addOrderFunc;
  const closePage = props.closePageFunc;
  let showAddForm = props.addFormProps;
  const MaKhachHangProps = props.MaKhachHangProps;

  const MaDonHang = uuidv4();
  // const transactionList = JSON.parse(
  //   localStorage.getItem("TransactionStation")
  // );


  

  const [transactionList, setTransactionList] = useState(null)
  const [order, setorder] = useState("");
  const [orderToLocation, setOrderToLocation] = useState("");
  const [orderToHotline, setOrderToHotline] = useState("");
  const [orderFromLocation, setOrderFromLocation] = useState("");
  const [storageHotlineError, setStorageHotlineError] = useState(true);
  const [weight, setOrderWeight] = useState("");
  const [typeOrder, setTypeOrder] = useState("");
  const [fee, setOrderFee] = useState("");
  const [describeOrder, setdescribeOrder] = useState("");
  const [COD, setOrderCOD] = useState("");
  const [nameReceive, setNameReceive] = useState("");
  const [transactionName, setTransactionName] = useState("");
  const [transactionCode, setTransactionCode] = useState(null);
  // lay thơi gian hôm nay
  const [currentDate, setCurrentDate] = useState(new Date());

  const orderRef = useRef(null);
  const orderToLocationRef = useRef(null);
  const orderToHotlineRef = useRef(null);
  const weightRef = useRef(null);
  const typeOrderRef = useRef(null);
  const feeRef = useRef(null);
  const CODRef = useRef(null);
  const nameReceiveRef = useRef(null);
  const describeOrderRef = useRef(null);
  const confirmRef = useRef(null);
  const transactionNameRef = useRef(null);
  const transactionCodeRef = useRef(null);
  const orderFromLocationRef = useRef(null);

  useEffect(() => {

    const getData= async () => {
      try {
          const res = await axios.get("http://127.0.0.1:8000/api/diemgiaodich/all/")
          setTransactionList(res.data['Diem Giao Dich'])
      } catch (error) {
          console.log("error: ", error.message);
      }
    }
    getData();
    // Lấy thời gian hiện tại khi component được mount
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Cập nhật mỗi giây
    // Hủy interval khi component unmount
    return () => clearInterval(intervalId);



  }, []); // Thực hiện chỉ một lần khi component được mount

  // const changeorder = (event) => {
  //   event.preventDefault();
  //   setorder(event.target.value);
  // };
  // const handleorderDown = (event) => {
  //   if (event.key === "Enter") {
  //     event.preventDefault();
  //     if (order.trim() !== "") orderToLocationRef.current.focus();
  //   }
  // };

  
  const ChangeOrderToLocation = (event) => {
    event.preventDefault();
    setOrderToLocation(event.target.value);
  };

  const handleOrderToLocationDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (orderToLocation.trim() !== "") orderToLocationRef.current.focus();
    }
  };

  const ChangeOrderFromLocation = (event) => {
    event.preventDefault();
    setOrderFromLocation(event.target.value);
  }

  const handleOrderFromLocationDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (orderFromLocation.trim() !== "") orderFromLocationRef.current.focus();
    }
  }
  const hotlineRegex = /^\d{4,10}$/;
  const changeOrderToHotline = (event) => {
    event.preventDefault();
    setOrderToHotline(event.target.value);
  };
  const handleOrderToHotlineDown = (event) => {
    if (orderToHotline.trim() !== "" && !hotlineRegex.test(orderToHotline)) {
      setStorageHotlineError(false);
    } else {
      setStorageHotlineError(true);
    }
    if (event.key === "Enter") {
      event.preventDefault();
      if (orderToHotline.trim() != "" && storageHotlineError)
        confirmRef.current.focus();
    }
  };

  const changeWeight = (event) => {
    event.preventDefault();
    setOrderWeight(event.target.value);
  };

  const handleOrderWeight = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (weight.trim() !== "") weight.current.focus();
    }
  };

  const ChangeNameReceive = (event) => {
    event.preventDefault();
    setNameReceive(event.target.value);
  };

  const handleNameReceive = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (nameReceive.trim() !== "") nameReceive.current.focus();
    }
  };

  const ChangeTypeOrder = (event) => {
    event.preventDefault();
    setTypeOrder(event.target.value);
  };

  const handleTypeOrder = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (typeOrder.trim() !== "") typeOrder.current.focus();
    }
  };

  const changeTransactionName = (event) => {
    event.preventDefault();
    setTransactionName(event.target.value);
    setTransactionCode(null);
  };
  const handleTransactionNameDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (transactionName.trim() !== "" && transactionCode !== null)
        confirmRef.current.focus();
    }
  };
  const handleTransactionInfoClick = (event, transactionInfo) => {
    event.preventDefault();
    setTransactionName(transactionInfo.TenDiaDiemGiaoDich);
    setTransactionCode(transactionInfo.MaDiemGiaoDich);
  };

  const getFilterTransactionList = (transactionList) => {
    if (transactionList !== null) {
      const filteredTransactionList = transactionList.filter(
      (transactionInfo) =>
        transactionInfo.DiaDiem.toLowerCase().includes(
          transactionName.toLowerCase()
        ) ||
        transactionInfo.TenDiaDiemGiaoDich.toLowerCase().includes(
          transactionName.toLowerCase()
        )
      ) 
      return filteredTransactionList;
    }else {
      console.log("Transactionlis Null")
    }
  }
  const filteredTransactionList = getFilterTransactionList(transactionList)
  

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      orderToLocation.trim() !== "" &&
      orderFromLocation.trim() !== "" &&
      orderToHotline.trim() !== "" &&
      storageHotlineError === true &&
      transactionName.trim() !== "" &&
      typeOrder.trim() !== "" &&
      describeOrder.trim() !== "" &&
      weight.trim() != ""
    ) {
      addOrder({
        MaKhachHang: MaKhachHangProps,
        // MaTaiKhoan: null,
        NgayGuiHang: currentDate,
        // NgayNhanHang: null,
        TrangThai: 1,
        LoaiHang: typeOrder,
        KhoiLuong: weight,
        Tien: 10000,
        MoTaDonHang: describeOrder,
        HoVaTenNguoiNhan: nameReceive,
        DiaChiNhanHang: orderToLocation,
        SoDienThoaiNguoiNhan: orderToHotline,
        MaDiemGiaoDich: transactionCode,
        // DiemTapKet: null,
        DiaChiNguoiGui:orderFromLocation,
      });
      closePage();
      handleReset();
    } else {
      alert("Dữ liệu nhập vào không hợp lệ hoặc bị thiếu");
    }
  };

  const changeDescribeOrder = (event) => {
    event.preventDefault();
    setdescribeOrder(event.target.value);
  };

  const handleDescribeOrder = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (describeOrder.trim() !== "") describeOrder.current.focus();
    }
  };
  // const handleConfirmDown = event => {
  //     if (event.key === 'Enter') {
  //         event.preventDefault();
  //         handleSubmit(event)
  //     }
  // }
  const handleReset = (event) => {
    event.preventDefault();
    setorder("");
    setTypeOrder("");
    setNameReceive("");
    setOrderWeight("");
    setdescribeOrder("");
    setOrderToLocation("");
    setOrderToHotline("");
    setTransactionName("");
    setTransactionCode(null);
    setCurrentDate("")
    setOrderFromLocation("");
  };
  const handleClosePage = (event) => {
    event.preventDefault();
    closePage();
    handleReset();
  };
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        showAddForm ? "bg-black/20" : "hidden"
      } z-50`}
    >
      {/* AddPage Modal */}
      <div
        className={`bg-white round-lg shadow p-6 translate-all max-w  rounded-xl gap-4 ${
          showAddForm ? "scale-100 opacity-100" : "scale-100 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClosePage}
          className="absolute top-2 right-2 py-1 px-1 h-10 w-10"
        >
          <img src={close_img} />
        </button>
        <h1 className="font-bold text-3xl text-primary flex justify-center my-2">
          TẠO ĐƠN HÀNG CHUYỂN PHÁT
        </h1>
        <form className="" onSubmit={handleSubmit}>
          <div className=" mx-2 my-2 text-primary py-0 space-y-1">
            <div className="flex  justify-between">
              <div className="m-5">
                <ul>
                  <li>
                    <p>Loại Hàng</p>
                    <input
                      className="w-full rounded-lg px-3 py-3 border-black text-primary shadow-md"
                      type="text"
                      value={typeOrder}
                      onChange={ChangeTypeOrder}
                      ref={typeOrderRef}
                      onKeyDown={handleTypeOrder}
                      placeholder="Điền loại hàng..."
                    />
                  </li>
                  <li>
                    <p>Địa chỉ người gửi</p>
                    <input
                      className="w-full rounded-lg px-3 py-3 border-black text-primary shadow-md"
                      type="text"
                      value={orderFromLocation}
                      onChange={ChangeOrderFromLocation}
                      ref={orderFromLocationRef}
                      onKeyDown={handleOrderFromLocationDown}
                      placeholder="Điền địa chỉ người gửi..."
                    />
                  </li>
                  <li>
                    <p>Địa chỉ người nhận</p>
                    <input
                      className="w-full rounded-lg px-3 py-3 border-black text-primary shadow-md"
                      type="text"
                      value={orderToLocation}
                      onChange={ChangeOrderToLocation}
                      ref={orderToLocationRef}
                      onKeyDown={handleOrderToLocationDown}
                      placeholder="Điền địa chỉ người nhận..."
                    />
                  </li>
                  <li>
                    <p>Họ và tên người nhận</p>
                    <input
                      className="w-full rounded-lg px-3 py-3 border-black text-primary shadow-md"
                      type="text"
                      value={nameReceive}
                      onChange={ChangeNameReceive}
                      ref={nameReceiveRef}
                      onKeyDown={handleNameReceive}
                      placeholder="Điền họ và tên người nhận..."
                    />
                  </li>

                  <li>
                    <p>Khối lượng</p>
                    <input
                      className="w-full rounded-lg px-3 py-3 border-black text-primary shadow-md"
                      type="text"
                      value={weight}
                      onChange={changeWeight}
                      ref={weightRef}
                      onKeyDown={handleOrderWeight}
                      placeholder="Điền khối lượng..."
                    />
                  </li>

                  <li>
                    <p>Mô tả</p>
                    <input
                      className="w-full rounded-lg px-3 py-3 border-black text-primary shadow-md"
                      type="text"
                      value={describeOrder}
                      onChange={changeDescribeOrder}
                      ref={describeOrderRef}
                      onKeyDown={handleDescribeOrder}
                      placeholder="Điền mô tả..."
                    />
                  </li>
                </ul>
              </div>

              <div className="m-5">
                <ul>
                  <li>
                    <p>Số điện thoại người nhận</p>
                    <input
                      className="w-full rounded-lg px-3 py-3 border-black text-primary shadow-md"
                      type="text"
                      value={orderToHotline}
                      onChange={changeOrderToHotline}
                      ref={orderToHotlineRef}
                      onKeyDown={handleOrderToHotlineDown}
                      placeholder="Điền số điện thoại người nhận..."
                    />
                    {!storageHotlineError && (
                      <p className="text-red-600">
                        Cần nhập số điện thoại chứa từ 4 đến 10 chữ số
                      </p>
                    )}
                  </li>

                  <li>
                    <p>Chọn điểm giao dịch</p>
                    <input
                      className="w-full rounded-lg px-1 py-2 border-black text-black shadow-md"
                      type="text"
                      value={transactionName}
                      onChange={changeTransactionName}
                      ref={transactionNameRef}
                      onKeyDown={handleTransactionNameDown}
                      placeholder="Điền dịa chỉ hoặc tên của điểm giao dịch..."
                    />
                    <div
                      className="border-2 rounded-lg "
                      style={{ height: "160px", overflowY: "auto" }}
                    >
                      {filteredTransactionList ? (
                        <ul>
                          {filteredTransactionList.map((transactionInfo) => (
                            <div
                              key={transactionInfo.MaDiemGiaoDich}
                              className="m-1 rounded-md text-primary justify-start p-1 w-full border-b-2 cursor-pointer"
                              onClick={(e) =>
                                handleTransactionInfoClick(e, transactionInfo)
                              }
                            >
                              <p className="">
                                {transactionInfo.TenDiaDiemGiaoDich}
                              </p>
                              <p className="italic text-[10px]">
                                {transactionInfo.DiaDiem}
                              </p>
                            </div>
                          ))}
                        </ul>
                      ) : (
                        <p>Không tìm thấy điểm giao dịch phù hợp</p>
                      )}
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex justify-around gap-4 text-primary text-xl">
              <button
                className="w-fit rounded-sm px-2 py-2 hover:scale-125 transition ease-out duration-500 "
                onClick={handleReset}
              >
                Reset
              </button>
              <button
                className="w-fit rounded-sm px-2 py-2 hover:scale-125 transition ease-out duration-500 "
                ref={confirmRef}
                type="submit"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

AddOrderModal.propTypes = {
  addOrderFunc: PropTypes.func.isRequired,
  closePageFunc: PropTypes.func.isRequired,
  addFormProps: PropTypes.object.isRequired,
  MaKhachHangProps: PropTypes.object.isRequired,
};
export default AddOrderModal;
