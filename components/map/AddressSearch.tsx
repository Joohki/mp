import DaumPostcodeEmbed from "react-daum-postcode";
import { useState } from "react";

const AddressSearch = (props) => {
  const { product, handleInputChange } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    handleInputChange({ target: { name: "address", value: fullAddress } });
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div>
        <label>설비업체 주소:</label>
        <input
          type="text"
          placeholder="업체 주소를 검색해주세요"
          required
          readOnly
          name="address"
          value={product.address}
          onChange={(e) => handleInputChange(e)}
          onClick={() => {
            setIsOpen(true);
          }}
        />
      </div>
      {isOpen && (
        <div>
          <DaumPostcodeEmbed
            onComplete={handleComplete}
            onClose={handleClose}
          />
        </div>
      )}
    </>
  );
};

export default AddressSearch;
