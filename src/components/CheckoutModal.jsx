import { Button, Modal, notification } from "antd";
import React, { useState } from "react";
import payme from "../assets/payme.png";
import click from "../assets/click.png";
import uzum from "../assets/uzum.png";
import { paymentService } from "../services/paymentService";
import { QRCodeCanvas } from "qrcode.react";
const CheckoutModal = ({ open, setOpen, loading, orderId }) => {
  const [type, setType] = useState("");
  const [url, setUrl] = useState(null);
  const types = [
    { image: payme, type: "payme" },
    { image: click, type: "click" },
    { image: uzum, type: "uzum" },
  ];

  const createLink = async (type) => {
    try {
      if (type === "click") {
        paymentService.clickPurchase(orderId).then((res) => {
          setUrl(res.data);
        });
      } else if (type === "uzum") {
        paymentService.uzumPurchase(orderId).then((res) => {
          setUrl(res.data);
        });
      } else {
        paymentService.paymePurchase(orderId).then((res) => {
          setUrl(res.data);
        });
      }
    } catch (error) {
      notification.error({
        message: "Something went wrong",
        placement: "topRight",
      });
    }
  };

  return (
    <Modal
      title={<h2>The Payment Type</h2>}
      loading={loading}
      open={open}
      onCancel={() => {
        setOpen(false);
        setUrl("");
        setType("");
      }}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <div className="flex flex-col gap-15 mt-15">
        <div className="flex gap-8 items-center ">
          {types.map((item) => (
            <div
              key={item.type}
              className="flex items-center justify-center cursor-pointer bg-[#fafafa] flex-1 h-[150px] p-[10px] rounded-lg transition-ease duration-300"
              style={{ border: item.type === type && "1px solid black" }}
              onClick={() => setType(item.type)}
            >
              <img src={item.image} alt={item.type} />
            </div>
          ))}
        </div>
        <button
          className={`bg-[#34b51c] flex justify-center rounded-md pt-2 pb-2 text-lg hover:bg-[#105110] transition-colors duration-300 checkout`}
          style={{ color: "#fff" }}
          disabled={type.length === 0}
          onClick={() => createLink(type)}
        >
          Choose payment type
        </button>
      </div>
      <div className="flex flex-col gap-5 items-center mt-5">
        {url && (
          <div className="flex flex-col gap-3 justify-center items-center">
            <QRCodeCanvas
              value={url}
              size={200}
              level="H"
              includeMargin={true}
            />
            <p className="text-lg">Отсканируйте QR код</p>
          </div>
        )}
        {url && (
          <a href={url} style={{ textDecoration: "underline" }}>
            или купите по этой ссылке
          </a>
        )}
      </div>
    </Modal>
  );
};

export default CheckoutModal;
