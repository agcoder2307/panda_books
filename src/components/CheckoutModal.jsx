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
  console.log({ orderId });
  const createLink = async () => {
    try {
      paymentService.paymePurchase(orderId).then((res) => {
        console.log({ res });
        setUrl(res.data);
      });
    } catch (error) {
      notification.error({
        message: "Something went wrong",
        placement: "topRight",
      });
    }
  };
  console.log({ url });
  return (
    <Modal
      title={<p>Choose the payment type</p>}
      loading={loading}
      open={open}
      onCancel={() => setOpen(false)}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <div className="flex flex-col gap-15 mt-15">
        <div className="flex gap-15 items-center">
          {types.map((item) => (
            <div
              key={item.type}
              className="flex items-center justify-center cursor-pointer bg-[#fafafa] w-[250px] h-[100px] p-[10px] rounded-lg transition-ease duration-300"
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
          onClick={createLink}
        >
          Make a purchase
        </button>
      </div>
      <div className="flex flex-col gap-5 items-center">
        {url && (
          <QRCodeCanvas value={url} size={200} level="H" includeMargin={true} />
        )}
        {url && <a href={url}>or puchase from here</a>}
      </div>
    </Modal>
  );
};

export default CheckoutModal;
