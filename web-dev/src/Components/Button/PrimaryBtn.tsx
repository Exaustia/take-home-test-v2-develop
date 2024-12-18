import c from "classnames";
import Loading from "../Common/Loading";

import "./primaryBtn.css";

const PrimaryBtn = ({
  label,
  onClick,
  className,
  disabled,
  loading,
}: {
  label: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={c(
        className || "",
        {
          "primary-btn_not-allowed": disabled,
          "primary-btn_allowed": !disabled,
        },
        "primary-btn"
      )}
    >
      {loading ? <Loading size={12} /> : label}
    </button>
  );
};

export default PrimaryBtn;
